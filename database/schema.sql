-- PROFESI - Complete Database Schema
-- All tables for disaster monitoring system

-- =====================
-- Users Table
-- =====================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create index on users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- =====================
-- Flood Predictions Table
-- =====================
CREATE TABLE IF NOT EXISTS flood_predictions (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    water_depth FLOAT,
    water_level FLOAT,
    river_discharge FLOAT,
    severity VARCHAR(20),
    probability FLOAT,
    confidence_score FLOAT DEFAULT 0.85,
    seven_day_forecast JSON,
    prediction_source VARCHAR(20) DEFAULT 'database',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for flood predictions
CREATE INDEX IF NOT EXISTS idx_flood_location ON flood_predictions(location_name);
CREATE INDEX IF NOT EXISTS idx_flood_coordinates ON flood_predictions(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_flood_time ON flood_predictions(created_at);

-- =====================
-- Tsunami Predictions Table
-- =====================
CREATE TABLE IF NOT EXISTS tsunami_predictions (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    wave_height FLOAT,
    magnitude FLOAT,
    epicenter_depth FLOAT,
    time_to_arrival INT,
    severity VARCHAR(20),
    probability FLOAT,
    confidence_score FLOAT DEFAULT 0.85,
    seven_day_forecast JSON,
    prediction_source VARCHAR(20) DEFAULT 'database',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for tsunami predictions
CREATE INDEX IF NOT EXISTS idx_tsunami_location ON tsunami_predictions(location_name);
CREATE INDEX IF NOT EXISTS idx_tsunami_coordinates ON tsunami_predictions(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_tsunami_time ON tsunami_predictions(created_at);

-- =====================
-- Wildfire Predictions Table
-- =====================
CREATE TABLE IF NOT EXISTS wildfire_predictions (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    fire_intensity FLOAT,
    burn_area FLOAT,
    wind_speed FLOAT,
    spread_direction VARCHAR(20),
    severity VARCHAR(20),
    probability FLOAT,
    confidence_score FLOAT DEFAULT 0.85,
    seven_day_forecast JSON,
    prediction_source VARCHAR(20) DEFAULT 'database',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for wildfire predictions
CREATE INDEX IF NOT EXISTS idx_wildfire_location ON wildfire_predictions(location_name);
CREATE INDEX IF NOT EXISTS idx_wildfire_coordinates ON wildfire_predictions(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_wildfire_time ON wildfire_predictions(created_at);

-- =====================
-- Earthquake Predictions Table
-- =====================
CREATE TABLE IF NOT EXISTS earthquake_predictions (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    magnitude FLOAT,
    depth FLOAT,
    shaking_intensity VARCHAR(20),
    aftershock_probability FLOAT,
    severity VARCHAR(20),
    probability FLOAT,
    confidence_score FLOAT DEFAULT 0.85,
    seven_day_forecast JSON,
    prediction_source VARCHAR(20) DEFAULT 'database',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for earthquake predictions
CREATE INDEX IF NOT EXISTS idx_earthquake_location ON earthquake_predictions(location_name);
CREATE INDEX IF NOT EXISTS idx_earthquake_coordinates ON earthquake_predictions(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_earthquake_time ON earthquake_predictions(created_at);

-- =====================
-- Hailstorm Predictions Table
-- =====================
CREATE TABLE IF NOT EXISTS hailstorm_predictions (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    hail_size FLOAT,
    storm_intensity FLOAT,
    wind_gust_speed FLOAT,
    duration INT,
    severity VARCHAR(20),
    probability FLOAT,
    confidence_score FLOAT DEFAULT 0.85,
    seven_day_forecast JSON,
    prediction_source VARCHAR(20) DEFAULT 'database',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for hailstorm predictions
CREATE INDEX IF NOT EXISTS idx_hailstorm_location ON hailstorm_predictions(location_name);
CREATE INDEX IF NOT EXISTS idx_hailstorm_coordinates ON hailstorm_predictions(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_hailstorm_time ON hailstorm_predictions(created_at);

-- =====================
-- Whirlwind Predictions Table
-- =====================
CREATE TABLE IF NOT EXISTS whirlwind_predictions (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    wind_speed FLOAT,
    rotation_intensity FLOAT,
    path_width FLOAT,
    movement_direction VARCHAR(20),
    severity VARCHAR(20),
    probability FLOAT,
    confidence_score FLOAT DEFAULT 0.85,
    seven_day_forecast JSON,
    prediction_source VARCHAR(20) DEFAULT 'database',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for whirlwind predictions
CREATE INDEX IF NOT EXISTS idx_whirlwind_location ON whirlwind_predictions(location_name);
CREATE INDEX IF NOT EXISTS idx_whirlwind_coordinates ON whirlwind_predictions(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_whirlwind_time ON whirlwind_predictions(created_at);

-- =====================
-- Alerts Table
-- =====================
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    disaster_type VARCHAR(50),
    location VARCHAR(255),
    severity VARCHAR(20),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for alerts
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at);

-- =====================
-- User Locations (Saved Locations)
-- =====================
CREATE TABLE IF NOT EXISTS user_locations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    location_name VARCHAR(255),
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for user locations
CREATE INDEX IF NOT EXISTS idx_user_locations_user_id ON user_locations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_locations_favorite ON user_locations(is_favorite);

-- =====================
-- Grant Permissions to User
-- =====================
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO profesi_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO profesi_user;

-- =====================
-- Verify Schema
-- =====================
-- List all tables created:
-- SELECT tablename FROM pg_tables WHERE schemaname='public';

COMMIT;
