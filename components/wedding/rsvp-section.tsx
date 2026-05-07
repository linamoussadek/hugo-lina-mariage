"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Minus, Plus, Users, UtensilsCrossed } from "lucide-react"

interface RSVPSectionProps {
  guestName?: string
  maxGuests?: number
  isSolo?: boolean
}

export function RSVPSection({ guestName = "Giguère", maxGuests = 4, isSolo = false }: RSVPSectionProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [guestCount, setGuestCount] = useState(1)
  const [menu1Count, setMenu1Count] = useState(0)
  const [menu2Count, setMenu2Count] = useState(0)
  // For solo: which menu they picked (null = not chosen yet)
  const [soloMenu, setSoloMenu] = useState<1 | 2 | null>(null)

  const totalMenus = menu1Count + menu2Count
  const soloValid = isSolo && soloMenu !== null
  const groupValid = !isSolo && totalMenus === guestCount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSolo ? !soloValid : !groupValid) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestFamily: guestName,
          guestCount,
          menu1Count,
          menu2Count,
          isSolo,
          soloMenu,
        }),
      })

      if (response.ok) {
        const data = (await response.json()) as { emailSent?: boolean }
        if (data.emailSent === false) {
          console.warn(
            "RSVP enregistré côté serveur mais aucun courriel de notification n'a été envoyé (vérifiez SMTP_PASS / rollback Firebase).",
          )
        }
        setSubmitted(true)
      } else {
        console.error("RSVP submission failed")
      }
    } catch (error) {
      console.error("RSVP error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const incrementGuests = () => {
    if (guestCount < maxGuests) setGuestCount(prev => prev + 1)
  }

  const decrementGuests = () => {
    if (guestCount > 1) {
      const next = guestCount - 1
      setGuestCount(next)
      // Clamp menu counts to the new total
      const overflow = totalMenus - next
      if (overflow > 0) {
        const reduceFrom2 = Math.min(overflow, menu2Count)
        setMenu2Count(prev => prev - reduceFrom2)
        setMenu1Count(prev => prev - (overflow - reduceFrom2))
      }
    }
  }

  const incrementMenu1 = () => { if (totalMenus < guestCount) setMenu1Count(prev => prev + 1) }
  const decrementMenu1 = () => { if (menu1Count > 0) setMenu1Count(prev => prev - 1) }
  const incrementMenu2 = () => { if (totalMenus < guestCount) setMenu2Count(prev => prev + 1) }
  const decrementMenu2 = () => { if (menu2Count > 0) setMenu2Count(prev => prev - 1) }

  return (
    <section className="py-20 md:py-32 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Guest Count — only shown for non-solo guests */}
              {!isSolo && (
                <Card className="border-border/50 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-lg font-medium">Nombre de personnes</span>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Combien de personnes de votre famille seront présentes ? (Maximum {maxGuests})
                    </p>
                    <div className="flex items-center justify-center gap-6">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={decrementGuests}
                        disabled={guestCount <= 1}
                        className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-5 h-5" />
                      </motion.button>
                      <span className="text-4xl font-light w-16 text-center">{guestCount}</span>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={incrementGuests}
                        disabled={guestCount >= maxGuests}
                        className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Menu Selection */}
              <Card className="border-border/50 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    <span className="text-lg font-medium">Choix du menu (traiteur)</span>
                  </div>
                  <p className="text-muted-foreground mb-6 text-sm">
                    {isSolo
                      ? "Veuillez choisir votre menu pour le repas."
                      : "Parmi les personnes qui viennent, merci d'indiquer combien choisissent chaque menu. Cela aide le traiteur pour les préparations."}
                  </p>

                  {isSolo ? (
                    /* Solo mode: two big tap-to-select cards */
                    <div className="space-y-3">
                      {([
                        { id: 1, label: "Menu 1", desc: "Rôti de bœuf baron, sauce demi-glace" },
                        { id: 2, label: "Menu 2", desc: "Poitrine de bœuf farcie aux épinards, sauce suprême" },
                      ] as const).map(({ id, label, desc }) => (
                        <motion.button
                          key={id}
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSoloMenu(id)}
                          className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200"
                          style={{
                            borderColor: soloMenu === id ? "oklch(0.65 0.13 60)" : "oklch(0.88 0.04 80 / 0.6)",
                            background: soloMenu === id ? "oklch(0.96 0.04 75 / 0.5)" : "oklch(0.97 0.01 80 / 0.4)",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{label}</p>
                              <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                            </div>
                            <div
                              className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 transition-all duration-200"
                              style={{
                                borderColor: soloMenu === id ? "oklch(0.65 0.13 60)" : "oklch(0.75 0.04 80)",
                                background: soloMenu === id ? "oklch(0.65 0.13 60)" : "transparent",
                              }}
                            >
                              {soloMenu === id && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    /* Group mode: counter per menu */
                    <div className="space-y-4">
                      {/* Menu 1 */}
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-medium mb-1 text-foreground">
                          Menu 1 : Rôti de bœuf baron, sauce demi-glace
                        </h4>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-muted-foreground">Nombre de personnes</span>
                          <div className="flex items-center gap-4">
                            <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={decrementMenu1} disabled={menu1Count <= 0} className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="text-2xl font-light w-10 text-center">{menu1Count}</span>
                            <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={incrementMenu1} disabled={totalMenus >= guestCount} className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Menu 2 */}
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-medium mb-1 text-foreground">
                          Menu 2 : Poitrine de bœuf farcie aux épinards, sauce suprême
                        </h4>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-muted-foreground">Nombre de personnes</span>
                          <div className="flex items-center gap-4">
                            <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={decrementMenu2} disabled={menu2Count <= 0} className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="text-2xl font-light w-10 text-center">{menu2Count}</span>
                            <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={incrementMenu2} disabled={totalMenus >= guestCount} className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Validation hint */}
                      {totalMenus < guestCount && (
                        <p className="text-sm text-amber-600 mt-2">
                          Veuillez sélectionner un menu pour {guestCount - totalMenus} personne{guestCount - totalMenus > 1 ? "s" : ""} de plus.
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit */}
              <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSolo ? !soloValid : !groupValid || isSubmitting}
                  className="w-full py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi en cours..." : "Confirmer ma présence"}
                </Button>
              </motion.div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              {/* Animated botanical ring */}
              <div className="relative flex items-center justify-center mb-10 mt-4">
                {/* Rotating petals ring */}
                <motion.svg
                  width="160"
                  height="160"
                  viewBox="0 0 160 160"
                  initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute"
                >
                  {/* 8 petals around the ring */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.g
                      key={i}
                      transform={`rotate(${angle}, 80, 80)`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: "backOut" }}
                    >
                      <ellipse cx="80" cy="22" rx="7" ry="14" fill="oklch(0.88 0.08 55 / 0.7)" />
                      <circle cx="80" cy="36" r="3.5" fill="oklch(0.75 0.14 60 / 0.6)" />
                    </motion.g>
                  ))}
                  {/* Leaves between petals */}
                  {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => (
                    <motion.g
                      key={`leaf-${i}`}
                      transform={`rotate(${angle}, 80, 80)`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.04, duration: 0.4 }}
                    >
                      <ellipse cx="80" cy="30" rx="4" ry="9" fill="oklch(0.65 0.12 145 / 0.5)" />
                    </motion.g>
                  ))}
                </motion.svg>

                {/* Centre check circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.4 }}
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "oklch(0.65 0.13 60)" }}
                >
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Check className="w-9 h-9 text-white" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="mb-3"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-primary font-sans mb-3">
                  Confirmation reçue
                </p>
                <h3
                  className="font-serif font-light"
                  style={{ fontSize: "clamp(2rem, 10vw, 2.8rem)", color: "oklch(0.25 0.02 60)" }}
                >
                  Merci, {guestName} !
                </h3>
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="font-serif italic text-muted-foreground mb-8 max-w-xs leading-relaxed"
                style={{ fontSize: "clamp(1rem, 4.5vw, 1.15rem)" }}
              >
                Votre présence a bien été enregistrée. On a tellement hâte de vous voir le 13 juin !
              </motion.p>

              {/* Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="w-full rounded-2xl px-6 py-6 text-left space-y-4"
                style={{
                  background: "oklch(0.97 0.012 80)",
                  border: "1px solid oklch(0.88 0.04 80 / 0.6)",
                }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-2">
                  Recapitulatif
                </p>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "oklch(0.93 0.05 70)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-serif text-foreground">Samedi 13 juin 2026 a 16h00</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "oklch(0.93 0.05 70)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Lieu</p>
                    <p className="font-serif text-foreground">Chez les Blouin</p>
                    <p className="text-sm text-muted-foreground">45 Croissant Cambior, Ottawa</p>
                  </div>
                </div>

                {/* Menu summary */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "oklch(0.93 0.05 70)" }}>
                    <UtensilsCrossed className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Menu sélectionné</p>
                    {isSolo ? (
                      <p className="font-serif text-foreground">
                        {soloMenu === 1
                          ? "Menu 1 — Roti de boeuf baron, sauce demi-glace"
                          : "Menu 2 — Poitrine de boeuf farcie aux epinards, sauce supreme"}
                      </p>
                    ) : (
                      <div className="space-y-0.5">
                        {menu1Count > 0 && (
                          <p className="font-serif text-foreground">
                            {menu1Count}x Menu 1 — Roti de boeuf baron
                          </p>
                        )}
                        {menu2Count > 0 && (
                          <p className="font-serif text-foreground">
                            {menu2Count}x Menu 2 — Poitrine de boeuf farcie
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Closing ornament */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex items-center gap-3 mt-10"
              >
                <div className="h-px w-8 bg-primary/40" />
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="currentColor" className="text-primary/50" />
                </svg>
                <div className="h-px w-8 bg-primary/40" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
