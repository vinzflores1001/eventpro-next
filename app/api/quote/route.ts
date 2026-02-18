import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, type, date, guests, budget, details } = body

    if (!name || !email || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ─────────────────────────────────────────────────────────────
    // TODO: Connect email service (see /api/booking/route.ts)
    // ─────────────────────────────────────────────────────────────

    console.log('New quote request:', { name, email, phone, type, date, guests, budget, details })

    return NextResponse.json({
      success: true,
      message: `Quote request received for ${name}. We'll send a tailored proposal shortly.`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
