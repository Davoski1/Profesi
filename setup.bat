@echo off
REM PROFESI - Windows 10 Automated Setup Script
REM Run this in CMD or PowerShell

echo.
echo ==========================================
echo 🚀 PROFESI - Automated Setup
echo ==========================================
echo.

REM Check if already in profesi directory
if not exist "frontend" (
    echo Creating project structure...
) else (
    echo Project already exists!
)

REM ========================
REM FRONTEND STRUCTURE
REM ========================
echo 📦 Setting up Frontend...

mkdir frontend\public
mkdir frontend\src\pages
mkdir frontend\src\components
mkdir frontend\src\context
mkdir frontend\src\services
mkdir frontend\src\styles
mkdir frontend\src\utils
mkdir frontend\src\hooks
mkdir frontend\src\config
mkdir frontend\dist

REM Frontend root files
type nul > frontend\package.json
type nul > frontend\vite.config.js
type nul > frontend\.env.example
type nul > frontend\index.html
type nul > frontend\tsconfig.json
type nul > frontend\.gitignore

REM Frontend src files
type nul > frontend\src\main.jsx
type nul > frontend\src\App.jsx

REM Frontend pages
type nul > frontend\src\pages\Welcome.jsx
type nul > frontend\src\pages\SignUp.jsx
type nul > frontend\src\pages\SignIn.jsx
type nul > frontend\src\pages\Home.jsx
type nul > frontend\src\pages\FloodMonitoring.jsx
type nul > frontend\src\pages\TsunamiMonitoring.jsx
type nul > frontend\src\pages\WildfireMonitoring.jsx
type nul > frontend\src\pages\EarthquakeMonitoring.jsx
type nul > frontend\src\pages\HailstormMonitoring.jsx
type nul > frontend\src\pages\WhirlwindMonitoring.jsx
type nul > frontend\src\pages\EmergencyGuidance.jsx
type nul > frontend\src\pages\Profile.jsx

REM Frontend components
type nul > frontend\src\components\LocationSearch.jsx
type nul > frontend\src\components\SevenDayForecast.jsx
type nul > frontend\src\components\SafetyGuidancePanel.jsx
type nul > frontend\src\components\CascadeStatus.jsx
type nul > frontend\src\components\LoadingSpinner.jsx
type nul > frontend\src\components\Modal.jsx
type nul > frontend\src\components\Navbar.jsx
type nul > frontend\src\components\ProtectedRoute.jsx
type nul > frontend\src\components\AlertCard.jsx

REM Frontend context
type nul > frontend\src\context\AuthContext.jsx

REM Frontend services
type nul > frontend\src\services\ApiService.js
type nul > frontend\src\services\MapboxService.js

REM Frontend styles
type nul > frontend\src\styles\index.css
type nul > frontend\src\styles\global.css
type nul > frontend\src\styles\animations.css
type nul > frontend\src\styles\pages.css
type nul > frontend\src\styles\components.css
type nul > frontend\src\styles\auth.css
type nul > frontend\src\styles\monitoring.css
type nul > frontend\src\styles\guidance.css
type nul > frontend\src\styles\profile.css

echo ✅ Frontend structure created

REM ========================
REM BACKEND STRUCTURE
REM ========================
echo 📦 Setting up Backend...

mkdir backend\gateway
mkdir backend\auth-service
mkdir backend\flood-prediction
mkdir backend\tsunami-prediction
mkdir backend\wildfire-prediction
mkdir backend\earthquake-prediction
mkdir backend\hailstorm-prediction
mkdir backend\whirlwind-prediction
mkdir backend\data-ingestion
mkdir backend\models

REM Gateway
type nul > backend\gateway\main.py
type nul > backend\gateway\requirements.txt
type nul > backend\gateway\Dockerfile
type nul > backend\gateway\.env.example

REM Auth service
type nul > backend\auth-service\main.py
type nul > backend\auth-service\database.py
type nul > backend\auth-service\models.py
type nul > backend\auth-service\schemas.py
type nul > backend\auth-service\auth.py
type nul > backend\auth-service\requirements.txt
type nul > backend\auth-service\Dockerfile
type nul > backend\auth-service\.env.example

REM Other services
for %%S in (flood-prediction tsunami-prediction wildfire-prediction earthquake-prediction hailstorm-prediction whirlwind-prediction data-ingestion) do (
    mkdir backend\%%S
    type nul > backend\%%S\main.py
    type nul > backend\%%S\requirements.txt
    type nul > backend\%%S\Dockerfile
    type nul > backend\%%S\.env.example
)

REM Backend root files
type nul > backend\requirements.txt
type nul > backend\.env.example
type nul > backend\docker-compose.yml

echo ✅ Backend structure created

REM ========================
REM DATABASE STRUCTURE
REM ========================
echo 📦 Setting up Database...

mkdir database\migrations
type nul > database\init.sql
type nul > database\schema.sql
type nul > database\seed.sql

echo ✅ Database structure created

REM ========================
REM ROOT FILES
REM ========================
echo 📦 Creating root files...

type nul > docker-compose.yml
type nul > .env.example
type nul > .gitignore
type nul > README.md
type nul > LICENSE
type nul > Makefile

echo.
echo ==========================================
echo ✅ PROJECT STRUCTURE CREATED!
echo ==========================================
echo.
echo 📋 Next steps:
echo 1. Copy code files from markdown into created files
echo 2. Update .env with your configuration
echo 3. Run: docker-compose up -d
echo.
pause
