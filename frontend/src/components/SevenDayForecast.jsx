import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import '../styles/components.css'

export default function SevenDayForecast({ data }) {
  if (!data || data.length === 0) return null

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#22c55e',
      moderate: '#eab308',
      high: '#f97316',
      critical: '#ef4444'
    }
    return colors[severity] || '#888'
  }

  const chartData = data.map(day => ({
    day: `Day ${day.day}`,
    value: day.value,
    severity: day.severity,
    confidence: (day.confidence * 100).toFixed(0),
    fill: getSeverityColor(day.severity)
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="seven-day-forecast"
    >
      <h2>📊 7-Day Flood Forecast</h2>

      {/* Water Depth Trend Line Chart */}
      <div className="chart-container">
        <h3>Water Depth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
              formatter={(value) => [`${value}m`, 'Depth']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 7 }}
              name="Water Depth"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Severity by Day Bar Chart */}
      <div className="chart-container">
        <h3>Severity by Day</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Severity', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
              formatter={(value, name, props) => [
                props.payload.severity?.toUpperCase(),
                'Severity'
              ]}
            />
            <Legend />
            <Bar
              dataKey="value"
              fill="#8884d8"
              radius={[8, 8, 0, 0]}
              name="Severity Level"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="forecast-table">
        <h3>Detailed Forecast</h3>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Depth (m)</th>
              <th>Severity</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {data.map((day, index) => (
              <tr key={index}>
                <td>Day {day.day}</td>
                <td>{day.value ? day.value.toFixed(2) : 'N/A'}</td>
                <td>
                  <span
                    className={`severity-badge ${day.severity}`}
                    style={{ backgroundColor: getSeverityColor(day.severity) }}
                  >
                    {day.severity?.toUpperCase()}
                  </span>
                </td>
                <td>{(day.confidence * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
