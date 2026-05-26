export interface Guest {
  slug: string
  greeting: string    // e.g. "Chère Famille Giguère"
  label: string       // e.g. "Famille Giguère"
  inviteText: string  // grammatically correct invite phrase
  maxGuests: number   // maximum attendees allowed
  isSolo: boolean     // if true, skip guest count — just pick a menu
}

export const guests: Guest[] = [
  { slug: "famille-giguere",   greeting: "Chère Famille Giguère",   label: "Famille Giguère",   inviteText: "Vous êtes chaleureusement conviés au mariage de",  maxGuests: 4, isSolo: false },
  { slug: "famille-bouchard",  greeting: "Chère Famille Bouchard",  label: "Famille Bouchard",  inviteText: "Vous êtes chaleureusement conviés au mariage de",  maxGuests: 4, isSolo: false },
  { slug: "famille-moussadek", greeting: "Chère Famille Moussadek", label: "Famille Moussadek", inviteText: "Vous êtes chaleureusement conviés au mariage de",  maxGuests: 4, isSolo: false },
  { slug: "michelle-landry",   greeting: "Chère Michelle",          label: "Michelle Landry",   inviteText: "Tu es chaleureusement conviée au mariage de",      maxGuests: 1, isSolo: true  },
  { slug: "mathias-corbeil",   greeting: "Cher Mathias",            label: "Mathias Corbeil",   inviteText: "Tu es chaleureusement convié au mariage de",       maxGuests: 1, isSolo: true  },
  { slug: "jean-francois",     greeting: "Cher Jean-François",      label: "Jean-François",     inviteText: "Tu es chaleureusement convié au mariage de",       maxGuests: 1, isSolo: true  },
  { slug: "athena-couture",    greeting: "Chère Athéna",            label: "Athéna Couture",    inviteText: "Tu es chaleureusement conviée au mariage de",      maxGuests: 1, isSolo: true  },
  { slug: "gilles-et-solange", greeting: "Chers Gilles et Solange", label: "Gilles & Solange",  inviteText: "Vous êtes chaleureusement conviés au mariage de",  maxGuests: 2, isSolo: false },
]

export function getGuest(slug: string): Guest | undefined {
  return guests.find((g) => g.slug === slug)
}
