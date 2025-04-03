"use client"

import { motion } from "framer-motion"
import { Thermometer, Droplets, Wind, CloudRain, Sun, Moon, Activity } from "lucide-react"

interface SensorCardProps {
  title: string
  value: string
  icon: "temperature" | "humidity" | "airQuality" | "rain" | "light" | "system"
  color: string
  status?: boolean
}

export default function SensorCard({ title, value, icon, color, status }: SensorCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "temperature":
        return <Thermometer className="h-8 w-8" />
      case "humidity":
        return <Droplets className="h-8 w-8" />
      case "airQuality":
        return <Wind className="h-8 w-8" />
      case "rain":
        return <CloudRain className="h-8 w-8" />
      case "light":
        return status ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />
      case "system":
        return <Activity className="h-8 w-8" />
      default:
        return <Activity className="h-8 w-8" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 hover:border-gray-600`}
    >
      <div className={`p-6 relative`}>
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-10 rounded-xl"
          style={{
            backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
            "--tw-gradient-from": color.split(" ")[0].split("-")[1],
            "--tw-gradient-to": color.split(" ")[1].split("-")[1],
          }}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <div className={`bg-gradient-to-r ${color} p-2 rounded-lg text-white`}>{getIcon()}</div>
        </div>

        <div className="flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-3xl font-bold text-white"
          >
            {value}
          </motion.div>
        </div>

        {(icon === "rain" || icon === "light" || icon === "system") && (
          <div className="mt-4 flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${status ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className="text-sm text-gray-300">{status ? "Active" : "Inactive"}</span>
          </div>
        )}
      </div>

      <div className={`h-1 bg-gradient-to-r ${color}`}></div>
    </motion.div>
  )
}

