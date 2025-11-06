-- PROFESI Database Initialization Script
-- Creates database and user

-- Create database
CREATE DATABASE profesi_db
    WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE = template0;

-- Connect to the database
\c profesi_db;

-- Create extension for UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create application user
CREATE USER profesi_user WITH PASSWORD 'profesi_password';

-- Grant privileges to user
ALTER ROLE profesi_user SET client_encoding TO 'utf8';
ALTER ROLE profesi_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE profesi_user SET default_transaction_deferrable TO on;
ALTER ROLE profesi_user SET default_transaction_readonly TO off;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE profesi_db TO profesi_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO profesi_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO profesi_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SCHEMAS TO profesi_user;

-- Create schema
CREATE SCHEMA IF NOT EXISTS public;
GRANT ALL ON SCHEMA public TO profesi_user;

COMMIT;
