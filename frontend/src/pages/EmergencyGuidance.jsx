import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import '../styles/guidance.css'

const GUIDANCE_CONTENT = {
  flood: {
    title: '🌊 Flood Safety Guide',
    immediate: [
      {
        title: 'Move to Higher Ground',
        steps: ['Go to 3rd floor or above', 'Never use elevators', 'Take emergency kit']
      },
      {
        title: 'Avoid Flood Water',
        steps: ['Don\'t walk through water', 'Don\'t drive through flooded areas', '6 inches can sweep you away']
      },
      {
        title: 'Turn Off Utilities',
        steps: ['Turn off electricity', 'Turn off gas at meter', 'Don\'t touch electrical equipment']
      }
    ],
    prepare: [
      'Gather emergency kit (water, food, first aid)',
      'Know evacuation routes',
      'Create communication plan',
      'Prepare important documents',
      'Have car fuel at half tank minimum'
    ],
    after: [
      'Wait for authorities to declare safe',
      'Document all damage with photos',
      'Contact insurance company',
      'Avoid contaminated water',
      'Check for structural damage'
    ]
  },
  tsunami: {
    title: '🌀 Tsunami Safety Guide',
    immediate: [
      {
        title: 'Move Inland Immediately',
        steps: ['Go away from coast', 'Move to high ground', 'Don\'t wait to see wave']
      }
    ],
    prepare: ['Know evacuation routes', 'Practice drills', 'Have emergency supplies'],
    after: ['Wait for all-clear signal', 'Document damage', 'Seek medical attention if needed']
  },
  wildfire: {
    title: '🔥 Wildfire Safety Guide',
    immediate: [
      {
        title: 'Evacuate Immediately',
        steps: ['Leave as soon as ordered', 'Close all windows', 'Take evacuation routes']
      }
    ],
    prepare: ['Clear defensible space', 'Have go-bag ready', 'Know escape routes'],
    after: ['Return only when cleared', 'Check property', 'Document damage']
  },
  earthquake: {
    title: '🌍 Earthquake Safety Guide',
    immediate: [
      {
        title: 'Drop-Cover-Hold',
        steps: ['Drop to hands/knees', 'Cover head/neck', 'Hold on until shaking stops']
      }
    ],
    prepare: ['Secure heavy furniture', 'Know safe spots', 'Practice drills'],
    after: ['Check for injuries', 'Exit building carefully', 'Expect aftershocks']
  },
  hailstorm: {
    title: '⛈️ Hailstorm Safety Guide',
    immediate: [
      {
        title: 'Move to Shelter',
        steps: ['Go indoors immediately', 'Avoid windows', 'Stay in interior room']
      }
    ],
    prepare: ['Have shelter planned', 'Stock supplies', 'Monitor weather'],
    after: ['Check for damage', 'Document photos', 'Contact insurance']
  },
  whirlwind: {
    title: '💨 Whirlwind/Tornado Safety Guide',
    immediate: [
      {
        title: 'Seek Shelter NOW',
        steps: ['Go to basement', 'Interior room on lowest floor', 'Away from windows']
      }
    ],
    prepare: ['Know shelter location', 'Have emergency kit', 'Monitor alerts'],
    after: ['Exit building carefully', 'Avoid debris', 'Call for help if trapped']
  }
}

export default function EmergencyGuidance() {
  const [activeTab, setActiveTab] = useState('flood')
  const guidance = GUIDANCE_CONTENT[activeTab]

  return (
    <motion.div 
      className="guidance-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar />

      <div className="guidance-page-content">
        <motion.h1 className="page-title">
          📚 Emergency Guidance & Safety Instructions
        </motion.h1>

        <div className="tabs">
          {Object.keys(GUIDANCE_CONTENT).map(type => (
            <motion.button
              key={type}
              className={`tab ${activeTab === type ? 'active' : ''}`}
              onClick={() => setActiveTab(type)}
              whileHover={{ scale: 1.05 }}
            >
              {GUIDANCE_CONTENT[type].title.split(' ')}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="guidance-content-section"
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2>{guidance.title}</h2>

          <div className="guidance-section">
            <h3>⚡ Immediate Actions</h3>
            {guidance.immediate.map((action, idx) => (
              <div key={idx} className="action-block">
                <h4>{action.title}</h4>
                <ul>
                  {action.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="guidance-section">
            <h3>📋 Preparation Checklist</h3>
            {guidance.prepare.map((item, idx) => (
              <label key={idx} className="checkbox-item">
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <div className="guidance-section">
            <h3>✅ After the Disaster</h3>
            {guidance.after.map((item, idx) => (
              <div key={idx} className="step-item">
                <span className="step-number">{idx + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
