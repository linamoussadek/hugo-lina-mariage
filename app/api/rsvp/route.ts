import nodemailer from "nodemailer"

export const runtime = "nodejs"

const DEFAULT_FROM = "hugoblouin@gmail.com"
const DEFAULT_NOTIFY = ["hugoblouin@gmail.com", "moussadek.lina45@gmail.com"]

/** Firebase / Cloud Run inject secrets at runtime; bracket access avoids build-time inlining of missing vars. */
function runtimeEnv(name: string): string | undefined {
  const v = process.env[name]
  return typeof v === "string" ? v : undefined
}

function smtpPassword(): string | undefined {
  const candidates = [
    runtimeEnv("SMTP_PASS"),
    runtimeEnv("SMTP_PASSWORD"),
    runtimeEnv("GMAIL_APP_PASSWORD"),
    runtimeEnv("EMAIL_PASSWORD"),
  ]
  const pass = candidates.find((p) => p?.trim())
  return pass?.trim()
}

function parseEmailList(raw: string | undefined): string[] | undefined {
  if (!raw?.trim()) return undefined
  const list = raw.split(",").map((e) => e.trim()).filter(Boolean)
  return list.length ? list : undefined
}

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
      : "Menu 2 — Poitrine de poulet farcie aux épinards et champignons"
  }
  let s = ""
  if (menu1Count > 0) s += `${menu1Count}x Menu 1 — Rôti de boeuf baron, sauce demi-glace\n`
  if (menu2Count > 0) s += `${menu2Count}x Menu 2 — Poitrine de poulet farcie aux épinards et champignons`
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

    const smtpPass = smtpPassword()
    const from = runtimeEnv("SMTP_FROM")?.trim() || DEFAULT_FROM
    const smtpUser = runtimeEnv("SMTP_USER")?.trim() || from
    const to = parseEmailList(runtimeEnv("RSVP_NOTIFY_EMAIL")) ?? DEFAULT_NOTIFY
    const cc = parseEmailList(runtimeEnv("RSVP_CC_EMAIL"))

    let emailSent = false

    if (smtpPass) {
      const host = runtimeEnv("SMTP_HOST")?.trim() || "smtp.gmail.com"
      const port = Number(runtimeEnv("SMTP_PORT")) || 465
      const useGmailShortcut = host === "smtp.gmail.com"

      const transporter = useGmailShortcut
        ? nodemailer.createTransport({
            service: "gmail",
            auth: { user: smtpUser, pass: smtpPass },
          })
        : nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user: smtpUser, pass: smtpPass },
          })

      try {
        await transporter.sendMail({
          from,
          to,
          ...(cc?.length ? { cc } : {}),
          subject: `RSVP reçu — ${guestName}`,
          html: rsvpEmailHtml(guestName, menuSummary, isSolo, guestCount),
        })
        emailSent = true
      } catch (mailErr) {
        console.error("Nodemailer send error (RSVP email not delivered):", mailErr)
      }
    } else {
      console.warn(
        "RSVP email skipped: no SMTP password in env (expected SMTP_PASS or SMTP_PASSWORD / GMAIL_APP_PASSWORD).",
      )
      console.log("RSVP payload (no mail):", {
        guestName,
        guestCount,
        menu1Count,
        menu2Count,
        isSolo,
        soloMenu,
      })
    }

    return Response.json(
      {
        success: true,
        message: "RSVP enregistré",
        emailSent,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("RSVP API error:", error)
    return Response.json({ error: "Erreur lors du traitement du RSVP" }, { status: 500 })
  }
}
