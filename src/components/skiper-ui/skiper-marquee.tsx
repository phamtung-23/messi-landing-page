"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SkiperMarqueeProps {
  children: ReactNode
  speed?: number
  direction?: "left" | "right"
  className?: string
  gradient?: boolean
}

export function SkiperMarquee({ 
  children, 
  speed = 50, 
  direction = "left", 
  className,
  gradient = true 
}: SkiperMarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {gradient && (
        <>
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-slate-900 to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-slate-900 to-transparent" />
        </>
      )}
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <div className="flex items-center space-x-8 pr-8">
          {children}
        </div>
        <div className="flex items-center space-x-8 pr-8">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

interface MarqueeItemProps {
  children: ReactNode
  className?: string
}

export function MarqueeItem({ children, className }: MarqueeItemProps) {
  return (
    <div className={cn("flex-shrink-0", className)}>
      {children}
    </div>
  )
} 