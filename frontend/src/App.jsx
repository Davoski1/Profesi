import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import FloodMonitoring from './pages/FloodMonitoring'
import TsunamiMonitoring from './pages/TsunamiMonitoring'
import WildfireMonitoring from './pages/WildfireMonitoring'
import EarthquakeMonitoring from './pages/EarthquakeMonitoring'
import HailstormMonitoring from './pages/HailstormMonitoring'
import WhirlwindMonitoring from './pages/WhirlwindMonitoring'
import EmergencyGuidance from './pages/EmergencyGuidance'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/monitor/flood" element={<ProtectedRoute><FloodMonitoring /></ProtectedRoute>} />
          <Route path="/monitor/tsunami" element={<ProtectedRoute><TsunamiMonitoring /></ProtectedRoute>} />
          <Route path="/monitor/wildfire" element={<ProtectedRoute><WildfireMonitoring /></ProtectedRoute>} />
          <Route path="/monitor/earthquake" element={<ProtectedRoute><EarthquakeMonitoring /></ProtectedRoute>} />
          <Route path="/monitor/hailstorm" element={<ProtectedRoute><HailstormMonitoring /></ProtectedRoute>} />
          <Route path="/monitor/whirlwind" element={<ProtectedRoute><WhirlwindMonitoring /></ProtectedRoute>} />
          <Route path="/guidance" element={<ProtectedRoute><EmergencyGuidance /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
