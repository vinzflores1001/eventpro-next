import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // ─────────────────────────────────────────────────────────────
    // TODO: Add to a mailing list.
    // Options:
    //   - Mailchimp API
    //   - Resend Audiences
    //   - Supabase / database table
    // ─────────────────────────────────────────────────────────────

    console.log('New newsletter subscriber:', email)

    return NextResponse.json({ success: true, message: 'Subscribed successfully.' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
