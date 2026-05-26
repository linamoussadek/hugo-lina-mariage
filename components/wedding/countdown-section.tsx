"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const weddingDate = new Date("2026-06-13T15:40:00")
  const now = new Date()
  const difference = weddingDate.getTime() - now.getTime()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <motion.div
        key={value}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <div className="w-20 h-20 md:w-28 md:h-28 bg-card border border-border/50 rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-3xl md:text-5xl font-light text-foreground">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
      </motion.div>
      <span className="mt-3 text-sm md:text-base text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  )
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  if (!mounted) {
    return (
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Le compte à rebours</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-12" />
          <div className="flex justify-center gap-4 md:gap-8">
            {["Jours", "Heures", "Minutes", "Secondes"].map((label) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-card border border-border/50 rounded-lg shadow-lg flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-light text-foreground">--</span>
                </div>
                <span className="mt-3 text-sm md:text-base text-muted-foreground uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">Le compte à rebours</h2>
          <p className="text-muted-foreground text-lg">Jusqu&apos;au grand jour</p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </motion.div>
        
        <div className="flex justify-center gap-4 md:gap-8">
          <CountdownUnit value={timeLeft.days} label="Jours" />
          <CountdownUnit value={timeLeft.hours} label="Heures" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Secondes" />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-xl md:text-2xl text-muted-foreground italic"
        >
          13 Juin 2026 à 15h40
        </motion.p>
      </div>
    </section>
  )
}
