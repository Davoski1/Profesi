import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/pages.css'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <motion.div 
      className="welcome-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="welcome-content">
        <motion.div 
          className="welcome-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="welcome-title">🌍 PROFESI</h1>
          <p className="welcome-subtitle">Professional Disaster Monitoring System</p>
          <p className="welcome-description">
            Real-time predictions, 7-day forecasts, and emergency guidance for multiple disaster types
          </p>
        </motion.div>

        <motion.div 
          className="welcome-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="feature-item">
            <span className="feature-icon">📍</span>
            <span className="feature-text">Precise Location Search</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span className="feature-text">7-Day Forecasts</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚠️</span>
            <span className="feature-text">Real-time Alerts</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📚</span>
            <span className="feature-text">Safety Guidance</span>
          </div>
        </motion.div>

        <motion.div 
          className="welcome-buttons"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </motion.div>

        <motion.div 
          className="welcome-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p>Monitoring: Flood • Tsunami • Wildfire • Earthquake • Hailstorm • Whirlwind</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
