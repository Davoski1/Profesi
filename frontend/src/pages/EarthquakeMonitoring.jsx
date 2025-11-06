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

export default function EarthquakeMonitoring() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location)
    setLoading(true)
    setError('')

    try {
      const response = await ApiService.predictEarthquake(location.latitude, location.longitude)
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
          🌍 Earthquake Monitoring & Prediction
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
                  <span className="label">Magnitude</span>
                  <span className="value">{predictions.magnitude?.toFixed(1)}</span>
                </div>
                <div className="status-item">
                  <span className="label">Depth</span>
                  <span className="value">{predictions.depth?.toFixed(1)} km</span>
                </div>
                <div className="status-item">
                  <span className="label">Shaking Intensity</span>
                  <span className="value">{predictions.shaking_intensity}</span>
                </div>
              </div>
            </div>

            <SevenDayForecast data={predictions.seven_day_forecast} />

            <SafetyGuidancePanel 
              severity={predictions.current_severity}
              disasterType="earthquake"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
