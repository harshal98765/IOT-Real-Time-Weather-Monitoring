"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SensorCard from "@/components/sensor-card"
import { fetchSensorData } from "@/lib/api"

export default function WeatherDashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    airQuality: 0,
    rainDetected: false,
    lightPresent: true,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    fetchData()

    // Set up interval for real-time updates
    const interval = setInterval(fetchData, 2000)

    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const data = await fetchSensorData()
      setSensorData(data)
      if (loading) setLoading(false)
    } catch (error) {
      console.error("Error fetching sensor data:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">IoT Weather Monitoring</h1>
          <p className="text-gray-300 text-center mb-8">Real-time environmental data from your sensors</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SensorCard
              title="Temperature"
              value={`${sensorData.temperature}°C`}
              icon="temperature"
              color="from-orange-500 to-red-600"
            />
            <SensorCard
              title="Humidity"
              value={`${sensorData.humidity}%`}
              icon="humidity"
              color="from-blue-400 to-blue-600"
            />
            <SensorCard
              title="Air Quality"
              value={`${sensorData.airQuality} AQI`}
              icon="airQuality"
              color="from-green-400 to-teal-600"
            />
            <SensorCard
              title="Rain Detection"
              value={sensorData.rainDetected ? "Detected" : "Not Detected"}
              icon="rain"
              color="from-indigo-400 to-indigo-600"
              status={sensorData.rainDetected}
            />
            <SensorCard
              title="Light Presence"
              value={sensorData.lightPresent ? "Present" : "Not Present"}
              icon="light"
              color="from-yellow-400 to-amber-600"
              status={sensorData.lightPresent}
            />
            <SensorCard
              title="System Status"
              value="Online"
              icon="system"
              color="from-purple-400 to-purple-600"
              status={true}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

