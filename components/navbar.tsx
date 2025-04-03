"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Cloud, Settings, Bell, User } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Cloud className="h-8 w-8 text-purple-500 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              WeatherIoT
            </span>
          </motion.div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="#" text="Dashboard" isActive={true} />
            <NavLink href="#" text="Analytics" />
            <NavLink href="#" text="History" />
            <NavLink href="#" text="Settings" />

            <div className="ml-4 flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Bell className="h-5 w-5 text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Settings className="h-5 w-5 text-gray-300" />
              </button>
              <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
                <User className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-gray-900 border-b border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="#" text="Dashboard" isActive={true} />
            <MobileNavLink href="#" text="Analytics" />
            <MobileNavLink href="#" text="History" />
            <MobileNavLink href="#" text="Settings" />
          </div>
          <div className="px-4 py-3 border-t border-gray-800 flex justify-between">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Bell className="h-5 w-5 text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Settings className="h-5 w-5 text-gray-300" />
            </button>
            <button className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors">
              <User className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

function NavLink({ href, text, isActive = false }) {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? "text-white bg-gray-800" : "text-gray-300 hover:text-white hover:bg-gray-800"
      }`}
    >
      {text}
    </a>
  )
}

function MobileNavLink({ href, text, isActive = false }) {
  return (
    <a
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive ? "text-white bg-gray-800" : "text-gray-300 hover:text-white hover:bg-gray-800"
      }`}
    >
      {text}
    </a>
  )
}

