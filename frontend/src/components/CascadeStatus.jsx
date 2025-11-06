import React from 'react'
import { motion } from 'framer-motion'
import '../styles/components.css'

const getSourceInfo = (source) => {
  const info = {
    database: {
      icon: '🗄️',
      label: 'Real Pipeline Data',
      color: '#22c55e'
    },
    model: {
      icon: '🤖',
      label: 'ML Model Prediction',
      color: '#3b82f6'
    },
    random: {
      icon: '🎲',
      label: 'Generated Forecast',
      color: '#eab308'
    }
  }
  return info[source] || info.random
}

export default function CascadeStatus({ source = 'database', confidence = 0.85 }) {
  const sourceInfo = getSourceInfo(source)

  return (
    <motion.div 
      className="cascade-status"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ borderColor: sourceInfo.color }}
    >
      <div className="status-badge" style={{ backgroundColor: sourceInfo.color }}>
        <span>{sourceInfo.icon}</span>
        <span>{sourceInfo.label}</span>
      </div>
      <div className="confidence-meter">
        <span className="label">Confidence:</span>
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${confidence * 100}%` }}
            transition={{ duration: 1 }}
            style={{ backgroundColor: sourceInfo.color }}
          />
        </div>
        <span className="percentage">{(confidence * 100).toFixed(0)}%</span>
      </div>
    </motion.div>
  )
}
