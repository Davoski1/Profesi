-- PROFESI - Sample Data for Testing

-- =====================
-- Sample Users
-- =====================
INSERT INTO users (username, email, hashed_password, full_name, country, city, is_active) VALUES
('admin', 'admin@profesi.local', '$2b$12$example_hash', 'Admin User', 'Nigeria', 'Lagos', TRUE),
('testuser', 'test@profesi.local', '$2b$12$example_hash', 'Test User', 'Ghana', 'Accra', TRUE),
('demo', 'demo@profesi.local', '$2b$12$example_hash', 'Demo User', 'Kenya', 'Nairobi', TRUE)
ON CONFLICT (email) DO NOTHING;

-- =====================
-- Sample Flood Predictions
-- =====================
INSERT INTO flood_predictions (location_name, latitude, longitude, water_depth, severity, probability, prediction_source) VALUES
('Lagos, Nigeria', 6.5244, 3.3792, 1.2, 'moderate', 0.75, 'database'),
('Accra, Ghana', 5.6037, -0.1870, 0.8, 'low', 0.65, 'database'),
('Nairobi, Kenya', -1.2921, 36.8219, 0.5, 'low', 0.55, 'database')
ON CONFLICT DO NOTHING;

-- =====================
-- Sample Tsunami Predictions
-- =====================
INSERT INTO tsunami_predictions (location_name, latitude, longitude, wave_height, magnitude, severity, probability, prediction_source) VALUES
('Port of Lagos', 6.4969, 3.3521, 0.5, 4.2, 'low', 0.45, 'database'),
('Accra Coast', 5.5527, -0.2038, 0.3, 3.8, 'low', 0.35, 'database')
ON CONFLICT DO NOTHING;

-- =====================
-- Sample Wildfire Predictions
-- =====================
INSERT INTO wildfire_predictions (location_name, latitude, longitude, fire_intensity, burn_area, severity, probability, prediction_source) VALUES
('Northern Nigeria', 13.5116, 2.1257, 0.6, 150.0, 'moderate', 0.68, 'database'),
('Sahel Region', 16.0000, 10.0000, 0.7, 200.0, 'high', 0.72, 'database')
ON CONFLICT DO NOTHING;

-- =====================
-- Sample Earthquake Predictions
-- =====================
INSERT INTO earthquake_predictions (location_name, latitude, longitude, magnitude, depth, severity, probability, prediction_source) VALUES
('East African Rift', -1.0, 36.0, 5.2, 15.0, 'moderate', 0.58, 'database'),
('Cameroon Volcanic Region', 3.8667, 11.5167, 4.8, 20.0, 'moderate', 0.52, 'database')
ON CONFLICT DO NOTHING;

-- =====================
-- Sample Hailstorm Predictions
-- =====================
INSERT INTO hailstorm_predictions (location_name, latitude, longitude, hail_size, storm_intensity, severity, probability, prediction_source) VALUES
('South African Highveld', -25.5, 28.0, 15.0, 0.7, 'high', 0.65, 'database'),
('Ethiopian Highlands', 9.0, 40.0, 12.0, 0.6, 'moderate', 0.58, 'database')
ON CONFLICT DO NOTHING;

-- =====================
-- Sample Whirlwind Predictions
-- =====================
INSERT INTO whirlwind_predictions (location_name, latitude, longitude, wind_speed, rotation_intensity, severity, probability, prediction_source) VALUES
('Central Nigeria Plains', 9.0, 8.0, 85.0, 0.65, 'high', 0.62, 'database'),
('Zimbabwe Basin', -19.0, 29.0, 95.0, 0.72, 'high', 0.68, 'database')
ON CONFLICT DO NOTHING;

COMMIT;
