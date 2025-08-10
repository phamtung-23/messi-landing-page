"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useRef } from "react"

interface ImageRippleProps {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}

export function ImageRipple({ src, alt, className, onClick }: ImageRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const createRipple = (event: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) {
      onClick()
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl cursor-pointer group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={createRipple}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        animate={{
          filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)",
        }}
      />

      {/* Overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
        animate={{
          opacity: isHovered ? 0.7 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 border-white/50"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{
            width: 0,
            height: 0,
            opacity: 1,
          }}
          animate={{
            width: 400,
            height: 400,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 3D shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          width: "150%",
          marginLeft: "-25%",
        }}
      />

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
    </motion.div>
  )
} 