"use client"

import { motion } from "framer-motion"

export function DateLocationSection() {
  return (
    <section className="py-16 px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-sm mx-auto"
      >
        {/* Card */}
        <div
          className="relative rounded-2xl px-8 pt-10 pb-16 text-center overflow-hidden"
          style={{
            background: "oklch(0.97 0.012 80)",
            border: "1px solid oklch(0.88 0.04 80 / 0.6)",
            boxShadow: "0 4px 40px oklch(0.7 0.08 80 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.8)",
          }}
        >
          {/* Top botanical illustration */}
          <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none" style={{ marginTop: "-1px" }}>
            <svg width="260" height="80" viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
              {/* Left branch */}
              <path d="M50 72 Q40 55 25 40" stroke="oklch(0.55 0.08 120)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M38 60 Q28 52 20 48" stroke="oklch(0.55 0.08 120)" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M46 66 Q34 62 28 58" stroke="oklch(0.55 0.08 120)" strokeWidth="1" strokeLinecap="round" fill="none"/>
              {/* Left leaves */}
              <ellipse cx="22" cy="46" rx="6" ry="3.5" transform="rotate(-30 22 46)" fill="oklch(0.62 0.1 130)" opacity="0.7"/>
              <ellipse cx="17" cy="39" rx="5" ry="3" transform="rotate(-50 17 39)" fill="oklch(0.58 0.09 125)" opacity="0.6"/>
              <ellipse cx="28" cy="56" rx="5.5" ry="3" transform="rotate(-15 28 56)" fill="oklch(0.64 0.1 135)" opacity="0.65"/>
              <ellipse cx="23" cy="65" rx="6" ry="3" transform="rotate(10 23 65)" fill="oklch(0.6 0.09 128)" opacity="0.6"/>
              {/* Left flowers */}
              <circle cx="25" cy="38" r="3.5" fill="oklch(0.88 0.07 60)" opacity="0.85"/>
              <circle cx="25" cy="38" r="1.5" fill="oklch(0.75 0.12 55)" opacity="0.9"/>
              <circle cx="14" cy="44" r="2.5" fill="oklch(0.9 0.06 50)" opacity="0.8"/>
              <circle cx="14" cy="44" r="1" fill="oklch(0.75 0.12 55)" opacity="0.9"/>
              {/* Small petals left */}
              <ellipse cx="21.5" cy="34.5" rx="2" ry="1.2" transform="rotate(-45 21.5 34.5)" fill="oklch(0.9 0.07 55)" opacity="0.7"/>
              <ellipse cx="28.5" cy="34.5" rx="2" ry="1.2" transform="rotate(45 28.5 34.5)" fill="oklch(0.9 0.07 55)" opacity="0.7"/>
              <ellipse cx="25" cy="32" rx="2" ry="1.2" fill="oklch(0.9 0.07 55)" opacity="0.7"/>

              {/* Center top stem */}
              <path d="M130 78 Q130 60 130 48" stroke="oklch(0.55 0.08 120)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <ellipse cx="122" cy="58" rx="6" ry="3" transform="rotate(-25 122 58)" fill="oklch(0.62 0.1 130)" opacity="0.65"/>
              <ellipse cx="138" cy="56" rx="6" ry="3" transform="rotate(25 138 56)" fill="oklch(0.62 0.1 130)" opacity="0.65"/>
              {/* Center flower */}
              <circle cx="130" cy="44" r="4.5" fill="oklch(0.88 0.07 60)" opacity="0.9"/>
              <circle cx="130" cy="44" r="2" fill="oklch(0.72 0.14 55)" opacity="0.95"/>
              <ellipse cx="124.5" cy="40" rx="2.2" ry="1.3" transform="rotate(-45 124.5 40)" fill="oklch(0.92 0.07 55)" opacity="0.75"/>
              <ellipse cx="135.5" cy="40" rx="2.2" ry="1.3" transform="rotate(45 135.5 40)" fill="oklch(0.92 0.07 55)" opacity="0.75"/>
              <ellipse cx="130" cy="37" rx="2.2" ry="1.3" fill="oklch(0.92 0.07 55)" opacity="0.75"/>
              <ellipse cx="124.5" cy="48" rx="2.2" ry="1.3" transform="rotate(45 124.5 48)" fill="oklch(0.92 0.07 55)" opacity="0.75"/>
              <ellipse cx="135.5" cy="48" rx="2.2" ry="1.3" transform="rotate(-45 135.5 48)" fill="oklch(0.92 0.07 55)" opacity="0.75"/>

              {/* Right branch */}
              <path d="M210 72 Q220 55 235 40" stroke="oklch(0.55 0.08 120)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              <path d="M222 60 Q232 52 240 48" stroke="oklch(0.55 0.08 120)" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M214 66 Q226 62 232 58" stroke="oklch(0.55 0.08 120)" strokeWidth="1" strokeLinecap="round" fill="none"/>
              {/* Right leaves */}
              <ellipse cx="238" cy="46" rx="6" ry="3.5" transform="rotate(30 238 46)" fill="oklch(0.62 0.1 130)" opacity="0.7"/>
              <ellipse cx="243" cy="39" rx="5" ry="3" transform="rotate(50 243 39)" fill="oklch(0.58 0.09 125)" opacity="0.6"/>
              <ellipse cx="232" cy="56" rx="5.5" ry="3" transform="rotate(15 232 56)" fill="oklch(0.64 0.1 135)" opacity="0.65"/>
              <ellipse cx="237" cy="65" rx="6" ry="3" transform="rotate(-10 237 65)" fill="oklch(0.6 0.09 128)" opacity="0.6"/>
              {/* Right flowers */}
              <circle cx="235" cy="38" r="3.5" fill="oklch(0.88 0.07 60)" opacity="0.85"/>
              <circle cx="235" cy="38" r="1.5" fill="oklch(0.75 0.12 55)" opacity="0.9"/>
              <circle cx="246" cy="44" r="2.5" fill="oklch(0.9 0.06 50)" opacity="0.8"/>
              <circle cx="246" cy="44" r="1" fill="oklch(0.75 0.12 55)" opacity="0.9"/>
              {/* Small petals right */}
              <ellipse cx="231.5" cy="34.5" rx="2" ry="1.2" transform="rotate(-45 231.5 34.5)" fill="oklch(0.9 0.07 55)" opacity="0.7"/>
              <ellipse cx="238.5" cy="34.5" rx="2" ry="1.2" transform="rotate(45 238.5 34.5)" fill="oklch(0.9 0.07 55)" opacity="0.7"/>
              <ellipse cx="235" cy="32" rx="2" ry="1.2" fill="oklch(0.9 0.07 55)" opacity="0.7"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 mt-10 space-y-7">
            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="space-y-1"
            >
              <p className="text-xs uppercase tracking-[0.2em] font-sans text-primary/70">Le</p>
              <p className="font-serif text-3xl" style={{ color: "oklch(0.28 0.04 60)" }}>
                Samedi 13 Juin
              </p>
              <p className="font-serif text-4xl font-light italic" style={{ color: "oklch(0.55 0.1 55)" }}>
                2026
              </p>
              <p className="text-sm font-sans tracking-widest uppercase mt-1" style={{ color: "oklch(0.5 0.05 60)" }}>
                à 15h40
              </p>
            </motion.div>

            {/* Thin divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="flex items-center gap-3 px-4"
            >
              <div className="h-px flex-1" style={{ background: "oklch(0.78 0.07 70 / 0.5)" }} />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z" fill="oklch(0.72 0.1 60)"/>
              </svg>
              <div className="h-px flex-1" style={{ background: "oklch(0.78 0.07 70 / 0.5)" }} />
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="space-y-3"
            >
              <p className="font-serif text-lg" style={{ color: "oklch(0.35 0.04 60)" }}>
                Chez les Blouin
              </p>
              <p className="text-xs font-sans leading-relaxed px-2" style={{ color: "oklch(0.52 0.04 60)" }}>
                45 Croissant Cambior<br />
                Ottawa
              </p>
            </motion.div>

            {/* Thin divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="flex items-center gap-3 px-4"
            >
              <div className="h-px flex-1" style={{ background: "oklch(0.78 0.07 70 / 0.5)" }} />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z" fill="oklch(0.72 0.1 60)"/>
              </svg>
              <div className="h-px flex-1" style={{ background: "oklch(0.78 0.07 70 / 0.5)" }} />
            </motion.div>

            {/* Dress code */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="space-y-1"
            >
              <p className="text-xs uppercase tracking-[0.2em] font-sans" style={{ color: "oklch(0.55 0.07 60)" }}>
                Tenue
              </p>
              <p className="font-serif text-sm italic" style={{ color: "oklch(0.38 0.05 60)" }}>
                Formelle, il n&apos;y a pas de code couleur particulier :)
              </p>
            </motion.div>
          </div>

          {/* Bottom botanical illustration */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none" style={{ marginBottom: "-1px" }}>
            <svg width="220" height="52" viewBox="0 0 220 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
              <path d="M40 0 Q50 18 65 30" stroke="oklch(0.55 0.08 120)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              <path d="M52 14 Q64 20 70 26" stroke="oklch(0.55 0.08 120)" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
              <ellipse cx="68" cy="28" rx="5.5" ry="3" transform="rotate(35 68 28)" fill="oklch(0.62 0.1 130)" opacity="0.65"/>
              <ellipse cx="73" cy="22" rx="5" ry="2.8" transform="rotate(55 73 22)" fill="oklch(0.58 0.09 125)" opacity="0.6"/>
              <circle cx="65" cy="16" r="3" fill="oklch(0.88 0.07 60)" opacity="0.8"/>
              <circle cx="65" cy="16" r="1.2" fill="oklch(0.75 0.12 55)" opacity="0.9"/>

              <path d="M180 0 Q170 18 155 30" stroke="oklch(0.55 0.08 120)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              <path d="M168 14 Q156 20 150 26" stroke="oklch(0.55 0.08 120)" strokeWidth="0.9" strokeLinecap="round" fill="none"/>
              <ellipse cx="152" cy="28" rx="5.5" ry="3" transform="rotate(-35 152 28)" fill="oklch(0.62 0.1 130)" opacity="0.65"/>
              <ellipse cx="147" cy="22" rx="5" ry="2.8" transform="rotate(-55 147 22)" fill="oklch(0.58 0.09 125)" opacity="0.6"/>
              <circle cx="155" cy="16" r="3" fill="oklch(0.88 0.07 60)" opacity="0.8"/>
              <circle cx="155" cy="16" r="1.2" fill="oklch(0.75 0.12 55)" opacity="0.9"/>

              <path d="M110 0 Q110 14 110 24" stroke="oklch(0.55 0.08 120)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
              <ellipse cx="103" cy="16" rx="5" ry="2.8" transform="rotate(-20 103 16)" fill="oklch(0.62 0.1 130)" opacity="0.6"/>
              <ellipse cx="117" cy="16" rx="5" ry="2.8" transform="rotate(20 117 16)" fill="oklch(0.62 0.1 130)" opacity="0.6"/>
              <circle cx="110" cy="26" r="3.5" fill="oklch(0.88 0.07 60)" opacity="0.85"/>
              <circle cx="110" cy="26" r="1.5" fill="oklch(0.72 0.14 55)" opacity="0.95"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
