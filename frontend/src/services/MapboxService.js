const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

class MapboxService {
  static async geocode(query) {
    if (!query) return []

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}`
      )
      const data = await response.json()
      return data.features || []
    } catch (error) {
      console.error('Geocoding error:', error)
      return []
    }
  }

  static formatLocation(feature) {
    const [longitude, latitude] = feature.center
    return {
      latitude,
      longitude,
      locationName: feature.place_name,
      id: feature.id
    }
  }
}

export default MapboxService
