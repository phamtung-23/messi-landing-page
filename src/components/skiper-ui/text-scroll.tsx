"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface TextScrollProps {
  texts: string[]
  className?: string
  interval?: number
  direction?: "up" | "down"
}

export function TextScroll({ 
  texts, 
  className, 
  interval = 3000,
  direction = "up" 
}: TextScrollProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <div className={cn("relative overflow-hidden h-16 flex items-center", className)}>
      <motion.div
        key={currentIndex}
        initial={{ 
          y: direction === "up" ? "100%" : "-100%",
          opacity: 0 
        }}
        animate={{ 
          y: "0%",
          opacity: 1 
        }}
        exit={{ 
          y: direction === "up" ? "-100%" : "100%",
          opacity: 0 
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut" 
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {texts[currentIndex]}
        </motion.span>
      </motion.div>
      
      {/* Indicators */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {texts.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-1 rounded-full bg-white/30"
            animate={{
              backgroundColor: index === currentIndex ? "rgba(59, 130, 246, 0.8)" : "rgba(255, 255, 255, 0.3)",
              scale: index === currentIndex ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
} 