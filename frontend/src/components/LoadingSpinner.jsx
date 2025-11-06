import React from 'react'
import { motion } from 'framer-motion'
import '../styles/components.css'

export default function LoadingSpinner() {
  return (
    <motion.div 
      className="loading-spinner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p>Loading predictions...</p>
    </motion.div>
  )
}
