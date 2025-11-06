from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx
import logging

app = FastAPI(title="PROFESI API Gateway")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Service URLs - Use service names for Docker networking
SERVICES = {
    "auth": "http://auth-service:8001",
    "flood": "http://flood-prediction:8002",
    "tsunami": "http://tsunami-prediction:8003",
    "wildfire": "http://wildfire-prediction:8004",
    "earthquake": "http://earthquake-prediction:8005",
    "hailstorm": "http://hailstorm-prediction:8006",
    "whirlwind": "http://whirlwind-prediction:8007",
    "data": "http://data-ingestion:8008",
}

async def forward_request(request: Request, service: str, path: str):
    """Forward request to appropriate service"""
    try:
        url = f"{SERVICES[service]}/{path}"
        headers = dict(request.headers)
        headers.pop("host", None)
        
        async with httpx.AsyncClient() as client:
            if request.method == "GET":
                response = await client.get(url, params=request.query_params, headers=headers)
            elif request.method == "POST":
                body = await request.body()
                response = await client.post(url, content=body, headers=headers)
            elif request.method == "PUT":
                body = await request.body()
                response = await client.put(url, content=body, headers=headers)
            elif request.method == "DELETE":
                response = await client.delete(url, headers=headers)
            else:
                return JSONResponse({"error": "Method not allowed"}, status_code=405)
            
            return JSONResponse(response.json(), status_code=response.status_code)
    except Exception as e:
        logger.error(f"Error forwarding request: {str(e)}")
        return JSONResponse({"error": "Service unavailable"}, status_code=503)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "api-gateway"}

@app.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def auth_routes(request: Request, path: str):
    return await forward_request(request, "auth", path)

@app.api_route("/predict/flood", methods=["GET", "POST"])
async def flood_routes(request: Request):
    return await forward_request(request, "flood", "predict")

@app.api_route("/predict/tsunami", methods=["GET", "POST"])
async def tsunami_routes(request: Request):
    return await forward_request(request, "tsunami", "predict")

@app.api_route("/predict/wildfire", methods=["GET", "POST"])
async def wildfire_routes(request: Request):
    return await forward_request(request, "wildfire", "predict")

@app.api_route("/predict/earthquake", methods=["GET", "POST"])
async def earthquake_routes(request: Request):
    return await forward_request(request, "earthquake", "predict")

@app.api_route("/predict/hailstorm", methods=["GET", "POST"])
async def hailstorm_routes(request: Request):
    return await forward_request(request, "hailstorm", "predict")

@app.api_route("/predict/whirlwind", methods=["GET", "POST"])
async def whirlwind_routes(request: Request):
    return await forward_request(request, "whirlwind", "predict")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
