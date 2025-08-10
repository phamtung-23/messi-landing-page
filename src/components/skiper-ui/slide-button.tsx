"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SlideButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  icon?: ReactNode
  disabled?: boolean
}

export function SlideButton({ 
  children, 
  onClick, 
  className, 
  variant = "primary",
  size = "md",
  icon,
  disabled = false
}: SlideButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
    secondary: "bg-gradient-to-r from-slate-600 to-slate-700 text-white",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 group",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Sliding background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Button content */}
      <div className="relative z-10 flex items-center space-x-2">
        {icon && (
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="group-hover:animate-spin"
          >
            {icon}
          </motion.div>
        )}
        <span>{children}</span>
      </div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
        }}
      />
    </motion.button>
  )
} 