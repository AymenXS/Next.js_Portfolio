'use client';

import { useState } from 'react';

const Testimonials = () => {
  // 'none' | 'guest' | 'linkedin' | 'github' | 'google'
  const [authMode, setAuthMode] = useState('none');

  const isAuthed = authMode !== 'none';
  const isGuest = authMode === 'guest';

  // Skeleton form state (minimal)
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [picture, setPicture] = useState(''); // url or placeholder text

  const canSubmit = name.trim() && message.trim();

  const providerLabel =
    authMode === 'linkedin'
      ? 'LinkedIn'
      : authMode === 'github'
        ? 'GitHub'
        : authMode === 'google'
          ? 'Google'
          : authMode === 'guest'
            ? 'Guest'
            : '';

  return (
    <div className="bg-bg text-text skeleton-section">
      <div className="mx-auto max-w-[95vw] p-8">
        {/* Page title */}
        <header className="text-center">
          <h1 className="text-4xl font-bold">Testimonials</h1>
        </header>

        {/* 50/50 split */}
        <main className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT HALF: Sign-in + Form */}
          <section className="border rounded-2xl skeleton-box p-8">
            <div className="max-w-xl mx-auto">
              {/* Header */}
              <header>
                <h2 className="text-2xl font-bold">Leave a Testimonial</h2>
                <p className="mt-2 opacity-80">
                  Share your thoughts and connect with me
                </p>
              </header>

              {/* Auth Options */}
              {!isAuthed && (
                <div className="mt-6">
                  <div className="grid gap-3">
                    <button
                      type="button"
                      className="w-full px-4 py-3 border rounded-xl skeleton-box"
                      onClick={() => setAuthMode('linkedin')}
                    >
                      Sign in with LinkedIn
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-3 border rounded-xl skeleton-box"
                      onClick={() => setAuthMode('github')}
                    >
                      Sign in with GitHub
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-3 border rounded-xl skeleton-box"
                      onClick={() => setAuthMode('google')}
                    >
                      Sign in with Google
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-3">
                    <div className="flex-1 border-t opacity-40" />
                    <span className="text-sm opacity-70">OR</span>
                    <div className="flex-1 border-t opacity-40" />
                  </div>

                  {/* Guest Mode + Tooltip */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="flex-1 px-4 py-3 border rounded-xl skeleton-box"
                      onClick={() => setAuthMode('guest')}
                    >
                      Continue as Guest
                    </button>

                    {/* Concept tooltip (no logic) */}
                    <div className="relative group">
                      <span className="inline-flex items-center justify-center w-10 h-10 border rounded-xl skeleton-box cursor-default">
                        i
                      </span>

                      <div className="hidden group-hover:block absolute right-0 mt-2 w-72 border rounded-xl skeleton-box bg-bg p-3 text-xs opacity-90">
                        We use IP checking to prevent duplicate guest submissions
                        and maintain guestbook integrity
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs opacity-70">
                    Guest submissions are IP-checked to prevent duplicates
                  </p>
                </div>
              )}

              {/* Submission Form (shown after auth / guest) */}
              {isAuthed && (
                <form
                  className="mt-8 border rounded-2xl skeleton-box p-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Connected badge */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="px-3 py-1 text-xs border rounded-full skeleton-chip">
                      Connected via {providerLabel} {authMode !== 'guest' ? '●' : ''}
                    </span>

                    <button
                      type="button"
                      className="px-3 py-1 text-xs border rounded-lg"
                      onClick={() => setAuthMode('none')}
                    >
                      Sign out
                    </button>
                  </div>

                  {/* Fields */}
                  <div className="mt-6 grid gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Name
                      </label>
                      <input
                        className="w-full px-4 py-3 border rounded-xl skeleton-box bg-transparent"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={isGuest}
                      />
                      <p className="mt-2 text-xs opacity-70">
                        {authMode !== 'guest'
                          ? 'If signed in, this would auto-fill from your social profile.'
                          : 'Required for guest mode.'}
                      </p>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Website (optional)
                      </label>
                      <input
                        className="w-full px-4 py-3 border rounded-xl skeleton-box bg-transparent"
                        placeholder="Your Website (optional)"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                      <p className="mt-2 text-xs opacity-70">
                        Optional field. Could auto-fill if available on profile.
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border rounded-xl skeleton-box bg-transparent min-h-[120px]"
                        placeholder="Share your thoughts..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                      <p className="mt-2 text-xs opacity-70">
                        Required. Minimum 4–5 lines visually (skeleton).
                      </p>
                    </div>

                    {/* Picture */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Picture (optional)
                      </label>
                      <input
                        className="w-full px-4 py-3 border rounded-xl skeleton-box bg-transparent"
                        placeholder="Upload a picture or paste URL (optional)"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                      />
                      <p className="mt-2 text-xs opacity-70">
                        {authMode !== 'guest'
                          ? 'If signed in, this would auto-fill with profile picture.'
                          : 'Optional for guest submissions.'}
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full px-4 py-3 border rounded-xl"
                      disabled={!canSubmit}
                    >
                      Submit Testimonial
                    </button>

                    <p className="text-xs opacity-70">
                      Submit disabled when required fields are empty (skeleton).
                    </p>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* RIGHT HALF: Testimonials list (placeholder, no auto-scroll logic) */}
          <section className="border rounded-2xl skeleton-box p-8">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Guestbook</h2>
              <p className="text-xs opacity-70">
                Auto-scrolling carousel (concept only)
              </p>
            </header>

            {/* Placeholder stack (2 cards only, as requested) */}
            <div className="mt-6 flex flex-col gap-4">
              {/* Card 1: guest */}
              <article className="border rounded-2xl skeleton-box p-5">
                {/* Profile row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border rounded-full skeleton-box" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">Guest User</p>
                      <span className="px-2 py-0.5 text-[10px] border rounded-full skeleton-chip">
                        guest
                      </span>
                    </div>
                    <p className="text-xs opacity-70 truncate">
                      example.com
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4 border rounded-xl skeleton-box p-4">
                  <p className="text-sm opacity-90">
                    “Placeholder testimonial message. This is a short quote-style
                    card in skeleton mode.”
                  </p>
                </div>

                {/* Timestamp */}
                <p className="mt-3 text-xs opacity-60">2 days ago</p>
              </article>

              {/* Card 2: google */}
              <article className="border rounded-2xl skeleton-box p-5">
                {/* Profile row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border rounded-full skeleton-box" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">Google User</p>
                      <span className="px-2 py-0.5 text-[10px] border rounded-full skeleton-chip">
                        google
                      </span>
                    </div>
                    <p className="text-xs opacity-70 truncate">
                      portfolio.site
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4 border rounded-xl skeleton-box p-4">
                  <p className="text-sm opacity-90">
                    “Another placeholder testimonial message. In the real build,
                    this area would auto-scroll upward infinitely.”
                  </p>
                </div>

                {/* Timestamp */}
                <p className="mt-3 text-xs opacity-60">Jan 12</p>
              </article>
            </div>

            {/* Visible note about auto-scroll (no logic) */}
            <div className="mt-6 text-xs opacity-70 border rounded-xl skeleton-box p-4">
              Vertical auto-scroll carousel planned (infinite loop effect). Skeleton-only:
              showing 2 placeholder testimonial cards.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Testimonials;
