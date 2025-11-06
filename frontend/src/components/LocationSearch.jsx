import React, { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import MapboxService from '../services/MapboxService'
import '../styles/components.css'

export default function LocationSearch({ onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(async (query) => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    setLoading(true)
    const results = await MapboxService.geocode(query)
    setSuggestions(results.slice(0, 5))
    setLoading(false)
  }, [])

  const handleSelect = (feature) => {
    const location = MapboxService.formatLocation(feature)
    setSearchQuery(feature.place_name)
    setSuggestions([])
    setShowSuggestions(false)
    onLocationSelect(location)
  }

  return (
    <div className="location-search">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search location (city, street, coordinates)..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch(e.target.value)
          }}
          onFocus={() => setShowSuggestions(true)}
          className="search-input"
        />
        {loading && <span className="search-loading">⟳</span>}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <motion.div 
          className="suggestions-dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              className="suggestion-item"
              whileHover={{ backgroundColor: '#f0f0f0' }}
              onClick={() => handleSelect(suggestion)}
            >
              📍 {suggestion.place_name}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
