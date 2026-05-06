"use client"

import { motion } from "framer-motion"
import { Heart, Church, Utensils, Music, PartyPopper } from "lucide-react"

const timelineEvents = [
  {
    time: "14h00",
    title: "Cérémonie",
    description: "Cérémonie de mariage et échange des vœux",
    icon: Church,
  },
  {
    time: "15h30",
    title: "Vin d'honneur",
    description: "Cocktail et photos avec les mariés",
    icon: Heart,
  },
  {
    time: "18h00",
    title: "Dîner",
    description: "Repas de célébration et discours",
    icon: Utensils,
  },
  {
    time: "21h00",
    title: "Soirée dansante",
    description: "Ouverture de bal et fête",
    icon: Music,
  },
  {
    time: "23h00",
    title: "Festivités",
    description: "Continuation des célébrations",
    icon: PartyPopper,
  },
]

export function TimelineSection() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">Programme de la journée</h2>
          <p className="text-muted-foreground text-lg">13 Juin 2026</p>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </motion.div>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
          
          {/* Events */}
          <div className="space-y-8 md:space-y-0">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-card p-6 rounded-lg shadow-md border border-border/50"
                  >
                    <span className="text-primary font-semibold text-lg">{event.time}</span>
                    <h3 className="text-xl md:text-2xl font-medium mt-1 mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </motion.div>
                </div>
                
                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg">
                  <event.icon className="w-6 h-6" />
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
