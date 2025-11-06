import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import LocationSearch from '../components/LocationSearch'
import SevenDayForecast from '../components/SevenDayForecast'
import SafetyGuidancePanel from '../components/SafetyGuidancePanel'
import CascadeStatus from '../components/CascadeStatus'
import LoadingSpinner from '../components/LoadingSpinner'
import ApiService from '../services/ApiService'
import '../styles/monitoring.css'

export default function TsunamiMonitoring() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location)
    setLoading(true)
    setError('')

    try {
      const response = await ApiService.predictTsunami(location.latitude, location.longitude)
      setPredictions(response.data)
    } catch (err) {
      setError(ApiService.handleError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      className="monitoring-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar />

      <div className="monitoring-content">
        <motion.h1 className="page-title">
          🌀 Tsunami Monitoring & Prediction
        </motion.h1>

        <LocationSearch onLocationSelect={handleLocationSelect} />

        {loading && <LoadingSpinner />}

        {error && (
          <motion.div 
            className="error-alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {predictions && (
          <motion.div 
            className="predictions-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CascadeStatus 
              source={predictions.prediction_source}
              confidence={predictions.confidence_score}
            />

            <div className="current-status">
              <h2>Current Status</h2>
              <div className="status-grid">
                <div className="status-item">
                  <span className="label">Location</span>
                  <span className="value">{predictions.location_name}</span>
                </div>
                <div className="status-item">
                  <span className="label">Wave Height</span>
                  <span className="value">{predictions.current_wave_height?.toFixed(2)}m</span>
                </div>
                <div className="status-item">
                  <span className="label">Magnitude</span>
                  <span className="value">{predictions.magnitude?.toFixed(1)}</span>
                </div>
                <div className="status-item">
                  <span className="label">Time to Arrival</span>
                  <span className="value">{predictions.time_to_arrival} mins</span>
                </div>
              </div>
            </div>

            <SevenDayForecast data={predictions.seven_day_forecast} />

            <SafetyGuidancePanel 
              severity={predictions.current_severity}
              disasterType="tsunami"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
