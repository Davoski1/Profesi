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

export default function FloodMonitoring() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location)
    setLoading(true)
    setError('')

    try {
      // FIX 1: Pass location_name as third parameter
      const response = await ApiService.predictFlood(
        location.latitude,
        location.longitude,
        location.place_name // ADD THIS - the location name
      )
      setPredictions(response.data)
    } catch (err) {
      setError(ApiService.handleError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flood-monitoring-container">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="monitoring-content"
      >
        <h1>🌊 Flood Monitoring & Prediction</h1>

        {/* Location Search Component */}
        <LocationSearch onLocationSelect={handleLocationSelect} />

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-message"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Predictions and Charts Section */}
        {predictions && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="predictions-section"
          >
            {/* Current Status Card */}
            <motion.div className="current-status-card">
              <h2>Current Flood Status</h2>
              <div className="status-grid">
                <div className="status-item">
                  <span className="label">Location:</span>
                  <span className="value">{selectedLocation?.place_name}</span>
                </div>
                <div className="status-item">
                  <span className="label">Water Depth:</span>
                  <span className="value">{predictions.current_water_depth}m</span>
                </div>
                <div className="status-item">
                  <span className="label">Severity:</span>
                  <span className={`severity ${predictions.current_severity}`}>
                    {predictions.current_severity.toUpperCase()}
                  </span>
                </div>
                <div className="status-item">
                  <span className="label">Probability:</span>
                  <span className="value">{(predictions.probability * 100).toFixed(0)}%</span>
                </div>
              </div>
            </motion.div>

            {/* FIX 2: Add SevenDayForecast Chart Component */}
            {predictions.seven_day_forecast && (
              <SevenDayForecast data={predictions.seven_day_forecast} />
            )}

            {/* Safety Guidance */}
            <SafetyGuidancePanel severity={predictions.current_severity} />

            {/* Cascade Status */}
            <CascadeStatus location={selectedLocation?.place_name} />
          </motion.div>
        )}

        {/* No Location Selected Message */}
        {!selectedLocation && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="placeholder-message"
          >
            <p>🔍 Search for a location to see flood predictions and 7-day forecast</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
