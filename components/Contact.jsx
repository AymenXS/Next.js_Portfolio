'use client';

import { useMemo, useState } from 'react';

const MAX_FIRST = 60;
const MAX_LAST = 60;
const MAX_EMAIL = 254;
const MAX_MSG = 4000;

const Contact = () => {
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Honeypot (bots fill this; humans never see it)
  const [companyWebsite, setCompanyWebsite] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const canSubmit = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0 &&
      message.trim().length > 0 &&
      !submitting
    );
  }, [firstName, lastName, email, message, submitting]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitOk(false);
    setSubmitError('');

    try {
      const payload = {
        first_name: firstName.trim().slice(0, MAX_FIRST),
        last_name: lastName.trim().slice(0, MAX_LAST),
        email: email.trim().slice(0, MAX_EMAIL),
        message: message.trim().slice(0, MAX_MSG),
        company_website: companyWebsite.trim(), // honeypot
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      setSubmitOk(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setCompanyWebsite('');
    } catch (err) {
      setSubmitError(err?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-bg text-text skeleton-section" id="contact">
      <div className="mx-auto max-w-[95vw] p-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="mt-2 text-sm opacity-70">
            Real submission pipeline (Phase 3) — hardened in Phase 4
          </p>
        </header>

        <main className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left panel: status */}
          <section className="border rounded-2xl skeleton-box p-8">
            <h2 className="text-xl font-bold">Availability</h2>
            <p className="mt-2 text-sm opacity-80">Available for projects</p>
            <p className="mt-2 text-xs opacity-70">
              This status is updated by me (hardcoded for now)
            </p>

            <div className="mt-6 text-sm opacity-80 space-y-2">
              <p>
                <span className="font-semibold">Location:</span> Remote Worldwide
              </p>
              <p>
                <span className="font-semibold">Languages:</span> EN • FR • AR
              </p>
              <p>
                <span className="font-semibold">Timezone:</span> UTC-5 → UTC+1
              </p>
            </div>

            <div className="mt-6 border rounded-xl skeleton-box p-4 text-xs opacity-70">
              Note: Anti-spam is Phase 4 minimal (honeypot + limits). IP rate-limit can be added later.
            </div>
          </section>

          {/* Right panel: form */}
          <section className="border rounded-2xl skeleton-box p-8">
            <h2 className="text-xl font-bold">Send a message</h2>
            <p className="mt-2 text-sm opacity-70">
              I’ll get back to you as soon as possible.
            </p>

            {/* Banners */}
            {submitOk && (
              <div className="mt-6 border rounded-xl skeleton-box p-4 text-sm">
                ✅ Message sent successfully.
              </div>
            )}

            {submitError && (
              <div className="mt-6 border rounded-xl skeleton-box p-4 text-sm">
                ❌ {submitError}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="company_website"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs opacity-70">First name</label>
                  <input
                    className="w-full px-3 py-2 border rounded-xl bg-transparent outline-none disabled:opacity-40"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    maxLength={MAX_FIRST}
                    required
                    disabled={submitting}
                    placeholder="Aymen"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs opacity-70">Last name</label>
                  <input
                    className="w-full px-3 py-2 border rounded-xl bg-transparent outline-none disabled:opacity-40"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={MAX_LAST}
                    required
                    disabled={submitting}
                    placeholder="Ghaloua"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs opacity-70">Email</label>
                <input
                  className="w-full px-3 py-2 border rounded-xl bg-transparent outline-none disabled:opacity-40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={MAX_EMAIL}
                  required
                  disabled={submitting}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs opacity-70">Message</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-xl bg-transparent outline-none min-h-[140px] disabled:opacity-40"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={MAX_MSG}
                  required
                  disabled={submitting}
                  placeholder="Tell me what you want to build…"
                />
                <div className="text-[11px] opacity-60 flex justify-between">
                  <span>Min: ~10 chars</span>
                  <span>
                    {Math.min(message.length, MAX_MSG)} / {MAX_MSG}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full px-4 py-3 border rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Contact;
