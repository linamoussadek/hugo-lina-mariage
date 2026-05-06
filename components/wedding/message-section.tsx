"use client"

import { motion } from "framer-motion"

interface MessageSectionProps {
  greeting?: string
}

export function MessageSection({ greeting = "Chère famille Giguère" }: MessageSectionProps) {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-md mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-sans">Un mot des futurs mariés</p>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-border" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" fill="currentColor" className="text-primary/60" />
            </svg>
            <div className="h-px w-12 bg-border" />
          </div>
        </motion.div>

        {/* Photo gallery — two photos side by side */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-3 mb-10"
        >
          {/* Evening photo */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000115981%20%281%29-340kIs31kdISCyY8MIp4ICiJ6KutGf.jpg"
              alt="Hugo et Lina le soir"
              className="w-full h-48 object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
          </div>

          {/* Daytime photo */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000115984%20%282%29-jAxODQSInbS57Ng9yhwqgift5qCNHF.jpg"
              alt="Hugo et Lina le jour"
              className="w-full h-48 object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
          </div>
        </motion.div>

        {/* Message body */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4"
        >
          <p
            className="font-serif leading-relaxed text-foreground/85"
            style={{ fontSize: "clamp(1rem, 4.5vw, 1.15rem)" }}
          >
            {greeting},
          </p>
          <p
            className="font-serif leading-relaxed text-muted-foreground"
            style={{ fontSize: "clamp(0.95rem, 4.2vw, 1.05rem)" }}
          >
            Il paraît qu&apos;on s&apos;aime assez pour vouloir faire ça pour de vrai… et on est très (très) heureux de se dire oui, pour la vie !
          </p>
          <p
            className="font-serif leading-relaxed text-muted-foreground"
            style={{ fontSize: "clamp(0.95rem, 4.2vw, 1.05rem)" }}
          >
            Votre présence donnera tout son sens à cette journée.
          </p>
          <p
            className="font-serif leading-relaxed text-muted-foreground"
            style={{ fontSize: "clamp(0.95rem, 4.2vw, 1.05rem)" }}
          >
            On a vraiment hâte de vous voir et de partager ce moment avec vous
          </p>

          <div className="pt-3">
            <p className="font-serif italic text-primary mb-2" style={{ fontSize: "clamp(0.9rem, 4vw, 1rem)" }}>
              Avec tout notre amour,
            </p>
            <p
              className="font-serif font-light"
              style={{ fontSize: "clamp(1.5rem, 6.5vw, 1.8rem)" }}
            >
              Hugo &amp; Lina
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
