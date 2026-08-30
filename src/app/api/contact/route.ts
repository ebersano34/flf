import { NextRequest, NextResponse } from 'next/server';

// This is a stub. Wire this up to one of:
//  - An email service (Resend, SendGrid, Postmark)
//  - A CRM/intake tool
//  - Formspree (in which case you can skip this route and point the form
//    directly at your Formspree endpoint instead)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // TODO: send an email / write to your CRM here.
    console.log('New contact submission:', data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
