import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import '../styles/components.css'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/home')}
        >
          🌍 PROFESI
        </motion.div>

        <div className="nav-menu">
          <button className="nav-link" onClick={() => navigate('/home')}>
            Home
          </button>
          <button className="nav-link" onClick={() => navigate('/guidance')}>
            Guidance
          </button>
          <button className="nav-link" onClick={() => navigate('/profile')}>
            {user?.full_name}
          </button>
          <motion.button 
            className="btn btn-logout"
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
