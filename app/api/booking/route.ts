import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, date, guests, notes, package: pkg } = body

    // Validate required fields
    if (!name || !email || !phone || !date || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ─────────────────────────────────────────────────────────────
    // TODO: Connect a real email service here.
    // Options:
    //   - Resend:    https://resend.com  (free 100 emails/day)
    //   - SendGrid:  https://sendgrid.com
    //   - Nodemailer with Gmail SMTP
    //
    // Example with Resend:
    //   import { Resend } from 'resend'
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({
    //     from: 'bookings@eventpro.ph',
    //     to: 'hello@eventpro.ph',
    //     subject: `New Booking Request — ${pkg}`,
    //     html: `<p>Name: ${name}</p><p>Email: ${email}</p>...`,
    //   })
    // ─────────────────────────────────────────────────────────────

    console.log('New booking request:', { name, email, phone, date, guests, notes, package: pkg })

    return NextResponse.json({
      success: true,
      message: `Booking request received for ${name}. We'll contact ${email} within 24 hours.`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
