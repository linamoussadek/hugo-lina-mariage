"use client"

import { motion } from "framer-motion"

interface HeroSectionProps {
  greeting?: string
  inviteText?: string
}

export function HeroSection({ 
  greeting = "Chère Famille Giguère",
  inviteText = "Vous êtes chaleureusement conviés au mariage de"
}: HeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Linen paper texture background */}
      <div
        className="absolute inset-0"
        style={{
          background: "oklch(0.965 0.012 80)",
        }}
      />
      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top text block — appears first, very elegant */}
      <div className="relative z-20 flex flex-col items-center pt-12 px-6 pb-0 text-center">
        {/* Ornamental top line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="h-px w-8 bg-primary/50" />
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="currentColor" className="text-primary/60" />
          </svg>
          <div className="h-px w-8 bg-primary/50" />
        </motion.div>

        {/* Greeting — "Chère Famille Giguère" */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs tracking-[0.25em] uppercase text-primary font-sans font-medium mb-4"
        >
          {greeting}
        </motion.p>

        {/* Invitation text — under the greeting */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-muted-foreground mb-4 max-w-[280px]"
          style={{ fontSize: "clamp(0.95rem, 4.5vw, 1.2rem)", lineHeight: 1.4 }}
        >
          {inviteText}
        </motion.p>

        {/* Names — Hugo & Lina */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3 flex items-baseline justify-center gap-2"
        >
          <span className="font-serif" style={{ fontSize: "clamp(2.6rem, 13vw, 4.2rem)", letterSpacing: "-0.02em", color: "oklch(0.25 0.02 60)" }}>Hugo</span>
          <span className="font-serif italic text-primary" style={{ fontSize: "clamp(1.1rem, 5vw, 1.6rem)" }}>&amp;</span>
          <span className="font-serif" style={{ fontSize: "clamp(2.6rem, 13vw, 4.2rem)", letterSpacing: "-0.02em", color: "oklch(0.25 0.02 60)" }}>Lina</span>
        </motion.div>

        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="px-5 py-1.5 rounded-full border border-primary/30"
          style={{ background: "oklch(0.96 0.03 75 / 0.5)" }}
        >
          <span className="text-xs tracking-[0.18em] uppercase text-primary font-sans">
            13 Juin 2026
          </span>
        </motion.div>
      </div>

      {/* Scene: house prominent, couple smaller at bottom looking at it */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-end mt-6 pb-4">
        {/* House — large and centered, the main visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full px-2"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iJ5cKaHYa9RMTwX40zkvYsoQpT5Wm6.png"
            alt="Lieu de la célébration"
            className="w-full object-contain"
            draggable={false}
          />
        </motion.div>

        {/* Couple — positioned to the left, bigger, overlapping with house */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-start pl-8 -mt-40 w-full"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1IvsQbz0zjihA30MspVOIsbOrrYBSJ.png"
            alt="Hugo et Lina"
            className="object-contain object-bottom"
            style={{
              width: "clamp(140px, 40vw, 240px)",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
            }}
            draggable={false}
          />
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to bottom, transparent, oklch(0.965 0.012 80))",
        }}
      />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/50" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
