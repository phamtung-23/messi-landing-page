"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIInputProps {
  placeholder?: string
  onSubmit?: (value: string) => void
  className?: string
}

export function AIInput({ placeholder = "Ask about Messi...", onSubmit, className }: AIInputProps) {
  const [value, setValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value.trim())
      setValue("")
    }
  }

  // Predefined sparkle movements to avoid hydration issues
  const sparkleMovements = [
    { x: [0, 5, -3], y: [0, -8, 4] },
    { x: [0, -7, 2], y: [0, 6, -5] },
    { x: [0, 3, -8], y: [0, -4, 7] },
  ]

  const sparkles = Array.from({ length: 3 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-blue-400 rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        x: sparkleMovements[i].x,
        y: sparkleMovements[i].y,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.2,
      }}
      style={{
        left: `${20 + i * 30}%`,
        top: "50%",
      }}
    />
  ))

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 transition-all duration-300 hover:border-blue-500/50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          {isFocused && sparkles}
          
          <div className="flex items-center px-6 py-4">
            <Sparkles className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
            
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setIsTyping(e.target.value.length > 0)
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
            />
            
            <AnimatePresence>
              {value.trim() && (
                <motion.button
                  type="submit"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-3 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: isFocused ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </form>
    </div>
  )
} 