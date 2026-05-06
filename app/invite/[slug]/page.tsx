import { notFound } from "next/navigation"
import { guests, getGuest } from "@/lib/guests"
import { HeroSection } from "@/components/wedding/hero-section"
import { MessageSection } from "@/components/wedding/message-section"
import { DateLocationSection } from "@/components/wedding/date-location-section"
import { RSVPSection } from "@/components/wedding/rsvp-section"
import { CountdownSection } from "@/components/wedding/countdown-section"
import { Footer } from "@/components/wedding/footer"

export async function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guest = getGuest(slug)
  if (!guest) return {}
  return {
    title: `Invitation • Hugo & Lina — ${guest.label}`,
    description: `Invitation au mariage de Hugo et Lina, adressée à ${guest.label}.`,
  }
}

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guest = getGuest(slug)
  if (!guest) notFound()

  return (
    <main className="min-h-screen overflow-x-hidden w-full">
      <HeroSection greeting={guest.greeting} inviteText={guest.inviteText} />
      <MessageSection greeting={guest.greeting} />
      <DateLocationSection />
      <RSVPSection guestName={guest.label} maxGuests={guest.maxGuests} isSolo={guest.isSolo} />
      <CountdownSection />
      <Footer />
    </main>
  )
}
