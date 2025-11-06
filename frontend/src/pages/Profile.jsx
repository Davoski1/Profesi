import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import '../styles/profile.css'

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    full_name: user?.full_name || '',
    email: user?.email || '',
    country: user?.country || '',
    city: user?.city || ''
  })

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar />

      <div className="profile-content">
        <motion.div 
          className="profile-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1>👤 Your Profile</h1>

          <div className="profile-section">
            <h3>Account Information</h3>
            <div className="profile-item">
              <span className="label">Username:</span>
              <span className="value">{profileData.username}</span>
            </div>
            <div className="profile-item">
              <span className="label">Full Name:</span>
              <span className="value">{profileData.full_name}</span>
            </div>
            <div className="profile-item">
              <span className="label">Email:</span>
              <span className="value">{profileData.email}</span>
            </div>
            <div className="profile-item">
              <span className="label">Location:</span>
              <span className="value">{profileData.city}, {profileData.country}</span>
            </div>
          </div>

          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
          >
            ✏️ Edit Profile
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
