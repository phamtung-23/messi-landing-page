"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MinimalCardProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  image?: string
  onClick?: () => void
}

export function MinimalCard({ 
  children, 
  className, 
  title, 
  subtitle, 
  image, 
  onClick 
}: MinimalCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:border-white/20 hover:bg-white/10",
        className
      )}
    >
      {image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <motion.img
            src={image}
            alt={title || ""}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors"
        >
          {title}
        </motion.h3>
      )}
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-sm mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-100"
      >
        {children}
      </motion.div>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))",
            "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
          ],
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