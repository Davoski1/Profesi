import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete this.client.defaults.headers.common['Authorization']
    }
  }

  clearAuthToken() {
    delete this.client.defaults.headers.common['Authorization']
  }

  // ============ Auth endpoints ============
  async register(data) {
    return this.client.post('/auth/register', data)
  }

  async login(email, password) {
    return this.client.post('/auth/login', { email, password })
  }

  // ============ Prediction endpoints ============
  async predictFlood(latitude, longitude, locationName) {
    try {
      console.log('Predicting flood for:', { latitude, longitude, locationName })
      const response = await this.client.get('/predict/flood', {
        params: {
          latitude,
          longitude,
          location_name: locationName
        }
      })
      console.log('Flood prediction response:', response.data)
      return response
    } catch (error) {
      console.error('Flood prediction error:', error)
      throw error
    }
  }

  async predictTsunami(latitude, longitude, locationName) {
    try {
      const response = await this.client.get('/predict/tsunami', {
        params: {
          latitude,
          longitude,
          location_name: locationName
        }
      })
      return response
    } catch (error) {
      console.error('Tsunami prediction error:', error)
      throw error
    }
  }

  async predictWildfire(latitude, longitude, locationName) {
    try {
      const response = await this.client.get('/predict/wildfire', {
        params: {
          latitude,
          longitude,
          location_name: locationName
        }
      })
      return response
    } catch (error) {
      console.error('Wildfire prediction error:', error)
      throw error
    }
  }

  async predictEarthquake(latitude, longitude, locationName) {
    try {
      const response = await this.client.get('/predict/earthquake', {
        params: {
          latitude,
          longitude,
          location_name: locationName
        }
      })
      return response
    } catch (error) {
      console.error('Earthquake prediction error:', error)
      throw error
    }
  }

  async predictHailstorm(latitude, longitude, locationName) {
    try {
      const response = await this.client.get('/predict/hailstorm', {
        params: {
          latitude,
          longitude,
          location_name: locationName
        }
      })
      return response
    } catch (error) {
      console.error('Hailstorm prediction error:', error)
      throw error
    }
  }

  async predictWhirlwind(latitude, longitude, locationName) {
    try {
      const response = await this.client.get('/predict/whirlwind', {
        params: {
          latitude,
          longitude,
          location_name: locationName
        }
      })
      return response
    } catch (error) {
      console.error('Whirlwind prediction error:', error)
      throw error
    }
  }

  // ============ Health check ============
  async healthCheck() {
    return this.client.get('/health')
  }

  // ============ Generic methods ============
  get(url, config) {
    return this.client.get(url, config)
  }

  post(url, data, config) {
    return this.client.post(url, data, config)
  }

  put(url, data, config) {
    return this.client.put(url, data, config)
  }

  delete(url, config) {
    return this.client.delete(url, config)
  }

  // ============ Error handler (NOT STATIC) ============
  handleError(error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('profesi_token')
      window.location.href = '/signin'
    }
    return error.response?.data?.detail || error.message || 'An error occurred'
  }
}

export default new ApiService()
