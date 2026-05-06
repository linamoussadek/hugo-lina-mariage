"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 text-background" style={{ background: "oklch(0.62 0.1 55)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Names */}
          <h3 className="text-3xl md:text-4xl font-light mb-4">
            Hugo <span style={{ color: "white" }}>&amp;</span> Lina
          </h3>
          
          {/* Date */}
          <p className="text-lg text-background/70 mb-6">
            13 Juin 2026
          </p>
          
          {/* Decorative heart */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center mb-8"
          >
            <Heart className="w-6 h-6 fill-white" style={{ color: "white" }} />
          </motion.div>
          
          {/* Contact info */}
          <div className="space-y-2 text-sm text-background/60">
            <p>Pour toute question, contactez</p>
            <p className="text-background/90 font-medium">Marianne Landry</p>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-background/10">
            <p className="text-xs text-background/40">
              Avec tout notre amour • Hugo <span style={{ color: "white" }}>&amp;</span> Lina 2026
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
