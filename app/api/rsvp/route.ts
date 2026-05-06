import { Resend } from "resend"

const DEFAULT_FROM = "onboarding@resend.dev"
const DEFAULT_NOTIFY = "moussadek.lina45@gmail.com"

function buildMenuSummary(body: {
  isSolo: boolean
  soloMenu?: number
  menu1Count: number
  menu2Count: number
}) {
  const { isSolo, soloMenu, menu1Count, menu2Count } = body
  if (isSolo) {
    return soloMenu === 1
      ? "Menu 1 — Rôti de boeuf baron, sauce demi-glace"
      : "Menu 2 — Poitrine de boeuf farcie aux épinards, sauce suprême"
  }
  let s = ""
  if (menu1Count > 0) s += `${menu1Count}x Menu 1 — Rôti de boeuf baron, sauce demi-glace\n`
  if (menu2Count > 0) s += `${menu2Count}x Menu 2 — Poitrine de boeuf farcie aux épinards`
  return s
}

function rsvpEmailHtml(guestName: string, menuSummary: string, isSolo: boolean, guestCount: number) {
  return `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <p style="color: #d4a574; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 10px;">CONFIRMATION DE PRÉSENCE</p>
            <h2 style="color: #2a2a2a; font-size: 28px; margin: 0; font-weight: 300;">Hugo &amp; Lina</h2>
          </div>

          <div style="background: #f9f7f4; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <p style="color: #666; font-size: 14px; margin: 0 0 16px;">Un RSVP a été reçu :</p>

            <div style="space-y: 12px;">
              <div style="margin-bottom: 12px;">
                <p style="color: #999; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Groupe</p>
                <p style="color: #2a2a2a; font-size: 16px; margin: 0 0 0 0;">${guestName}</p>
              </div>

              ${!isSolo ? `
                <div style="margin-bottom: 12px;">
                  <p style="color: #999; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Nombre de personnes</p>
                  <p style="color: #2a2a2a; font-size: 16px; margin: 0;">${guestCount}</p>
                </div>
              ` : ""}

              <div style="margin-bottom: 12px;">
                <p style="color: #999; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Menu sélectionné</p>
                <p style="color: #2a2a2a; font-size: 14px; margin: 0; white-space: pre-line;">${menuSummary}</p>
              </div>
            </div>
          </div>

          <div style="text-align: center; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 20px; color: #999; font-size: 12px;">
            <p style="margin: 0;">Mariage — Samedi 13 juin 2026 à 16h00</p>
            <p style="margin: 4px 0 0;">Chez les Blouin, Ottawa</p>
          </div>
        </div>
      `
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { guestName, guestCount, menu1Count, menu2Count, isSolo, soloMenu } = body

    const menuSummary = buildMenuSummary({
      isSolo,
      soloMenu,
      menu1Count: Number(menu1Count) || 0,
      menu2Count: Number(menu2Count) || 0,
    })

    const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM
    const to = process.env.RSVP_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY
    const ccRaw = process.env.RSVP_CC_EMAIL?.trim()
    const cc = ccRaw ? ccRaw.split(",").map((e) => e.trim()).filter(Boolean) : undefined

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      const response = await resend.emails.send({
        from,
        to,
        ...(cc?.length ? { cc } : {}),
        subject: `RSVP reçu — ${guestName}`,
        html: rsvpEmailHtml(guestName, menuSummary, isSolo, guestCount),
      })

      if (response.error) {
        console.error("Resend email error:", response.error)
      }
    } else {
      console.log("RESEND_API_KEY not set — skipping email, RSVP data:", {
        guestName,
        guestCount,
        menu1Count,
        menu2Count,
        isSolo,
        soloMenu,
      })
    }

    return Response.json({ success: true, message: "RSVP enregistré" }, { status: 200 })
  } catch (error) {
    console.error("RSVP API error:", error)
    return Response.json({ error: "Erreur lors du traitement du RSVP" }, { status: 500 })
  }
}
