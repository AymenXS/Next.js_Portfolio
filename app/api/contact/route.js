export async function POST(req) {
  try {
    const body = await req.json();

    const firstName = (body?.first_name || '').trim();
    const lastName = (body?.last_name || '').trim();
    const email = (body?.email || '').trim();
    const message = (body?.message || '').trim();

    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { ok: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return Response.json(
        { ok: false, error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL; // your inbox
    const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL; // verified sender in Resend

    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      return Response.json(
        {
          ok: false,
          error:
            'Server missing env vars: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL',
        },
        { status: 500 }
      );
    }

    const subject = `Portfolio Contact: ${firstName} ${lastName}`;
    const text = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5">
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(
      lastName
    )}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr />
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return Response.json(
        { ok: false, error: `Email provider error. ${errText}` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
