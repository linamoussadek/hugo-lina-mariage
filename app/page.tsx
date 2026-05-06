import Link from "next/link"
import { guests } from "@/lib/guests"

export default function IndexPage() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full flex flex-col items-center justify-center py-20 px-6 bg-background">
      <div className="max-w-sm w-full space-y-10 text-center">
        {/* Title */}
        <div className="space-y-2">
          <p className="text-xs tracking-[0.28em] uppercase text-primary font-sans">Invitations</p>
          <h1 className="font-serif text-4xl" style={{ color: "oklch(0.25 0.02 60)" }}>Hugo &amp; Lina</h1>
          <p className="font-serif italic text-muted-foreground">13 Juin 2026</p>
        </div>

        <div className="w-12 h-px bg-primary/40 mx-auto" />

        {/* Guest links */}
        <ul className="space-y-3">
          {guests.map((guest) => (
            <li key={guest.slug}>
              <Link
                href={`/invite/${guest.slug}`}
                className="block w-full rounded-xl border border-primary/20 bg-card px-5 py-4 text-sm font-sans text-foreground hover:bg-primary/5 transition-colors"
                style={{ boxShadow: "0 2px 12px oklch(0.7 0.08 80 / 0.08)" }}
              >
                {guest.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground">
          Chaque lien est une invitation personnalisée à partager directement avec l&apos;invité.
        </p>
      </div>
    </main>
  )
}
