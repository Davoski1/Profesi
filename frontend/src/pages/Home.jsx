import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import '../styles/pages.css'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const disasterTypes = [
    { id: 'flood', emoji: '🌊', name: 'Flood', path: '/monitor/flood' },
    { id: 'tsunami', emoji: '🌀', name: 'Tsunami', path: '/monitor/tsunami' },
    { id: 'wildfire', emoji: '🔥', name: 'Wildfire', path: '/monitor/wildfire' },
    { id: 'earthquake', emoji: '🌍', name: 'Earthquake', path: '/monitor/earthquake' },
    { id: 'hailstorm', emoji: '⛈️', name: 'Hailstorm', path: '/monitor/hailstorm' },
    { id: 'whirlwind', emoji: '💨', name: 'Whirlwind', path: '/monitor/whirlwind' }
  ]

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      <div className="home-content">
        <motion.div 
          className="home-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1>Welcome, {user?.full_name || user?.username}! 👋</h1>
          <p>Select a disaster type to monitor</p>
        </motion.div>

        <motion.div 
          className="disaster-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {disasterTypes.map((disaster, index) => (
            <motion.div
              key={disaster.id}
              className="disaster-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => navigate(disaster.path)}
            >
              <div className="disaster-emoji">{disaster.emoji}</div>
              <h3>{disaster.name}</h3>
              <p>Real-time monitoring & forecasts</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="guidance-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button 
            className="btn btn-guidance"
            onClick={() => navigate('/guidance')}
          >
            📚 Emergency Guidance & Resources
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
