"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SpecialCardProps {
  children: ReactNode
  className?: string
  gradient?: string
  title?: string
  description?: string
  icon?: ReactNode
}

export function SpecialCard({ 
  children, 
  className, 
  gradient = "from-blue-500 to-purple-600",
  title,
  description,
  icon
}: SpecialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={cn("relative group cursor-pointer", className)}
    >
      {/* Gradient border effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`} />
      
      {/* Main card with fixed height */}
      <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 h-64 flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          {icon && (
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">{icon}</div>
              {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
            </div>
          )}
          
          {description && (
            <p className="text-gray-300 mb-4 text-sm">{description}</p>
          )}
          
          <div className="text-white flex-1 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
} 