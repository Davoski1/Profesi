import React, { createContext, useContext, useState, useEffect } from 'react'
import ApiService from '../services/ApiService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore session from localStorage
    const storedToken = localStorage.getItem('profesi_token')
    const storedUser = localStorage.getItem('profesi_user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      ApiService.setAuthToken(storedToken)
    }
    setLoading(false)
  }, [])

  const register = async (userData) => {
    try {
      const response = await ApiService.post('/auth/register', userData)
      const { access_token, user } = response.data

      localStorage.setItem('profesi_token', access_token)
      localStorage.setItem('profesi_user', JSON.stringify(user))
      
      setToken(access_token)
      setUser(user)
      ApiService.setAuthToken(access_token)

      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Registration failed' }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await ApiService.post('/auth/login', { email, password })
      const { access_token, user } = response.data

      localStorage.setItem('profesi_token', access_token)
      localStorage.setItem('profesi_user', JSON.stringify(user))

      setToken(access_token)
      setUser(user)
      ApiService.setAuthToken(access_token)

      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.response?.data?.detail || 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('profesi_token')
    localStorage.removeItem('profesi_user')
    setToken(null)
    setUser(null)
    ApiService.clearAuthToken()
  }

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
