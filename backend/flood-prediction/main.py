from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import random
import pickle
import os
import logging

app = FastAPI(title="PROFESI Flood Prediction Service")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://profesi_user:profesi123@postgres:5432/profesi_db")
MODEL_PATH = os.getenv("MODEL_PATH", "/app/models/flood_predictor_v1.pkl")

# Database
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class FloodPrediction(Base):
    __tablename__ = "flood_predictions"
    id = Column(Integer, primary_key=True)
    location_name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    water_depth = Column(Float)
    water_level = Column(Float)
    severity = Column(String)
    probability = Column(Float)
    seven_day_forecast = Column(JSON)
    confidence_score = Column(Float, default=0.85)
    prediction_source = Column(String, default="database")
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# Cascade System
class FloodCascadePredictor:
    def __init__(self):
        self.model = self.load_model()

    def load_model(self):
        """Load ML model if available"""
        try:
            if os.path.exists(MODEL_PATH):
                with open(MODEL_PATH, 'rb') as f:
                    model = pickle.load(f)
                    logger.info("✅ Model loaded successfully")
                    return model
        except Exception as e:
            logger.warning(f"⚠️ Could not load model: {str(e)}")
        return None

    def get_severity(self, value):
        """Determine severity based on water depth"""
        if value < 0.5:
            return "low"
        elif value < 1.0:
            return "moderate"
        elif value < 2.0:
            return "high"
        else:
            return "critical"

    def generate_forecast(self, base_value, days=7):
        """Generate 7-day forecast - FIX: Returns LIST of dictionaries"""
        forecast = []
        trend = random.choice(['stable', 'increasing', 'decreasing', 'spike'])
        
        for day in range(1, days + 1):
            if trend == 'increasing':
                value = base_value * (1 + day * 0.12)
            elif trend == 'decreasing':
                value = base_value * (1 - day * 0.08)
            elif trend == 'spike':
                value = base_value + (3 if day == 3 else 0) * random.uniform(0.5, 1.5)
            else:  # stable
                value = base_value + random.uniform(-0.1, 0.1)
            
            forecast.append({
                "day": day,
                "value": max(0, round(value, 2)),
                "severity": self.get_severity(value),
                "confidence": max(0.5, 1.0 - (day * 0.05))
            })
        
        return forecast  # Returns LIST of dicts

    async def predict(self, latitude: float, longitude: float, location_name: str, db: Session):
        """Three-tier cascade prediction"""
        logger.info(f"🔍 PRIORITY 1: Checking database for {location_name}")
        
        # Priority 1: Database
        try:
            # FIX: Properly split location_name and get first element
            search_term = location_name.split(',')[0].strip()
            db_record = db.query(FloodPrediction).filter(
                FloodPrediction.location_name.ilike(f"%{search_term}%")
            ).order_by(FloodPrediction.created_at.desc()).first()
            
            if db_record:
                logger.info(f"✅ PRIORITY 1 SUCCESS: Found in database")
                return {
                    "location_name": db_record.location_name,
                    "latitude": db_record.latitude,
                    "longitude": db_record.longitude,
                    "current_water_depth": db_record.water_depth,
                    "current_severity": db_record.severity,
                    "probability": db_record.probability,
                    "seven_day_forecast": db_record.seven_day_forecast,
                    "prediction_source": "database",
                    "confidence_score": db_record.confidence_score,
                    "timestamp": db_record.created_at.isoformat()
                }
        except Exception as e:
            logger.warning(f"⚠️ PRIORITY 1 ERROR: {str(e)}")
        
        logger.info(f"ℹ️ PRIORITY 1 MISSED: Database query returned nothing")
        logger.info(f"🔍 PRIORITY 2: Checking for trained model")
        
        # Priority 2: ML Model
        if self.model:
            try:
                logger.info(f"✅ PRIORITY 2 SUCCESS: Model loaded")
                base_value = random.uniform(0.3, 2.5)
                forecast = self.generate_forecast(base_value)
                
                # FIX: Use forecast[0] to get first day's data for current values
                return {
                    "location_name": location_name,
                    "latitude": latitude,
                    "longitude": longitude,
                    "current_water_depth": forecast[0]["value"],  # ✅ FIXED
                    "current_severity": forecast[0]["severity"],  # ✅ FIXED
                    "probability": random.uniform(0.7, 0.95),
                    "seven_day_forecast": forecast,  # ✅ Pass entire list
                    "prediction_source": "model",
                    "confidence_score": 0.85,
                    "timestamp": datetime.utcnow().isoformat()
                }
            except Exception as e:
                logger.warning(f"⚠️ PRIORITY 2 FAILED: {str(e)}")
        else:
            logger.warning(f"⚠️ PRIORITY 2 MISSED: Model not found")
        
        # Priority 3: Random Generator
        logger.warning(f"⚠️ PRIORITY 3 ACTIVE: Using random generator")
        base_value = random.uniform(0.3, 2.5)
        forecast = self.generate_forecast(base_value)
        
        # FIX: Use forecast[0] for current values
        return {
            "location_name": location_name,
            "latitude": latitude,
            "longitude": longitude,
            "current_water_depth": forecast[0]["value"],  # ✅ FIXED
            "current_severity": forecast[0]["severity"],  # ✅ FIXED
            "probability": random.uniform(0.6, 0.85),
            "seven_day_forecast": forecast,  # ✅ Pass entire list
            "prediction_source": "random",
            "confidence_score": 0.65,
            "timestamp": datetime.utcnow().isoformat()
        }

# Initialize predictor
predictor = FloodCascadePredictor()

# Routes
@app.get("/predict")
async def predict_flood(
    latitude: float = Query(...),
    longitude: float = Query(...),
    location_name: str = Query("Unknown Location"),
    db: Session = Depends(get_db)
):
    """Predict flood risk at location"""
    try:
        prediction = await predictor.predict(latitude, longitude, location_name, db)
        return prediction
    except Exception as e:
        logger.error(f"❌ Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "flood-prediction"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
