import { Resend } from 'resend';

const MAX_FIRST = 60;
const MAX_LAST = 60;
const MAX_EMAIL = 254;
const MAX_MSG = 4000;

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req) {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
    const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      return Response.json(
        {
          ok: false,
          error:
            'Server missing env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL',
        },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
    }

    // Honeypot
    const honeypot = String(body?.company_website || '').trim();
    if (honeypot) {
      return Response.json({ ok: false, error: 'Spam rejected.' }, { status: 400 });
    }

    const firstName = String(body?.first_name || '').trim().slice(0, MAX_FIRST);
    const lastName = String(body?.last_name || '').trim().slice(0, MAX_LAST);
    const email = String(body?.email || '').trim().slice(0, MAX_EMAIL);
    const message = String(body?.message || '').trim().slice(0, MAX_MSG);

    if (!firstName || !lastName || !email || !message) {
      return Response.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
    }

    if (!isEmail(email)) {
      return Response.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
    }

    if (message.length < 10) {
      return Response.json({ ok: false, error: 'Message is too short.' }, { status: 400 });
    }

    const resend = new Resend(RESEND_API_KEY);

    // ✅ Always use friendly-name format
    const from = CONTACT_FROM_EMAIL.includes('<')
      ? CONTACT_FROM_EMAIL
      : `Portfolio Contact <${CONTACT_FROM_EMAIL}>`;

    const subject = `New Contact Message — ${firstName} ${lastName}`;
    const text = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');

    // ✅ Use Node SDK naming: replyTo (not reply_to) :contentReference[oaicite:2]{index=2}
    const { data, error } = await resend.emails.send({
      from,
      to: [CONTACT_TO_EMAIL],
      subject,
      text,
      replyTo: email,
    });

    if (error) {
      return Response.json(
        { ok: false, error: error?.message || 'Email provider error.' },
        { status: 500 }
      );
    }

    // ✅ Return the Resend email id so you can confirm it appears in Resend logs
    return Response.json({ ok: true, id: data?.id || null });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || 'Server error.' },
      { status: 500 }
    );
  }
}
