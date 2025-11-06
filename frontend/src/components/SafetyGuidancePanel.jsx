import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/components.css'

const GUIDANCE_DATA = {
  flood: {
    critical: {
      title: '🚨 EVACUATE IMMEDIATELY',
      color: '#ef4444',
      actions: [
        'Move to higher ground NOW',
        'Do not wait for official order',
        'Call emergency: 911',
        'Take only essentials',
        'Leave immediately if instructed'
      ]
    },
    high: {
      title: '⚠️ ALERT - PREPARE TO EVACUATE',
      color: '#f97316',
      actions: [
        'Stay alert for evacuation order',
        'Move valuables to high areas',
        'Pack emergency bag',
        'Keep vehicle fueled',
        'Monitor weather updates'
      ]
    },
    moderate: {
      title: '⚡ CAUTION',
      color: '#eab308',
      actions: [
        'Monitor situation closely',
        'Avoid flooded areas',
        'Don\'t drive through water',
        'Stay indoors if possible',
        'Keep emergency kit ready'
      ]
    },
    low: {
      title: '✅ NORMAL',
      color: '#22c55e',
      actions: [
        'No immediate danger',
        'Stay informed',
        'Keep emergency supplies ready',
        'Know evacuation routes',
        'Regular monitoring recommended'
      ]
    }
  }
}

export default function SafetyGuidancePanel({ severity = 'moderate', disasterType = 'flood' }) {
  const guidance = GUIDANCE_DATA[disasterType]?.[severity] || GUIDANCE_DATA[disasterType]?.moderate
  const [expandedSection, setExpandedSection] = useState('immediate')

  return (
    <motion.div 
      className="safety-guidance"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      style={{ borderColor: guidance?.color }}
    >
      <div className="guidance-header" style={{ backgroundColor: guidance?.color }}>
        <h3>{guidance?.title}</h3>
      </div>

      <div className="guidance-content">
        <h4>Immediate Actions</h4>
        <ul className="actions-list">
          {guidance?.actions.map((action, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <span className="action-icon">•</span>
              <span>{action}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="guidance-buttons">
        <button className="btn btn-small">📚 Full Guidance</button>
        <button className="btn btn-small">📞 Emergency Contacts</button>
        <button className="btn btn-small">🗺️ Evacuation Routes</button>
      </div>
    </motion.div>
  )
}
