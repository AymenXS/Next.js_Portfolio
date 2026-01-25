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

  // Badge styling (keeps your current pill design, just adds subtle provider identity)
  const providerPillClass =
    authMode === 'linkedin'
      ? 'border-blue-500/50 text-blue-400'
      : authMode === 'github'
        ? 'border-zinc-400/50 text-zinc-200'
        : authMode === 'google'
          ? 'border-emerald-500/40 text-emerald-300'
          : 'border-white/20 text-white/80';

  // Right-side example testimonials (INFO DEPTH)
  const testimonialExamples = [
    {
      id: 't1',
      avatar: 'profile-sarah-thompson.jpg',
      name: 'Sarah Thompson',
      website: 'techwizard.com',
      platform: 'linkedin',
      platformLabel: 'LinkedIn',
      platformIcon: 'in',
      message:
        "Aymen's work on our project was exceptional. His attention to detail and innovative solutions greatly improved our web application's performance and user experience. Would definitely work with him again!",
      timestamp: '2 days ago',
    },
    {
      id: 't2',
      avatar: 'default-avatar.png',
      name: 'Michael Rodriguez',
      website: 'N/A',
      platform: 'guest',
      platformLabel: 'Guest',
      platformIcon: 'guest',
      message:
        'Quick turnaround and excellent communication throughout the project. Aymen delivered exactly what we needed and was very responsive to feedback.',
      timestamp: '1 week ago',
    },
    {
      id: 't3',
      avatar: 'github-profile-picture (auto)',
      name: 'Emily Chen',
      website: 'github.com/emilychen',
      platform: 'github',
      platformLabel: 'GitHub',
      platformIcon: 'gh',
      message:
        "Aymen's ability to translate complex requirements into elegant code is remarkable. He's a valuable asset to any development team. Highly recommended!",
      timestamp: '3 days ago',
    },
    {
      id: 't4',
      avatar: 'google-profile-picture (auto)',
      name: 'David Park',
      website: 'davidpark.dev',
      platform: 'google',
      platformLabel: 'Google',
      platformIcon: 'G',
      message:
        'Professional, skilled, and easy to work with. Aymen helped us build a complex e-commerce platform and delivered beyond our expectations. The site runs smoothly and our customers love it.',
      timestamp: '5 days ago',
    },
    {
      id: 't5',
      avatar: 'custom-uploaded-image',
      name: 'Lisa Nakamura',
      website: 'designhub.co',
      platform: 'guest',
      platformLabel: 'Guest',
      platformIcon: 'guest',
      message:
        "Aymen's dedication to clean, efficient code and his collaborative approach made our project a success. Communication was excellent throughout.",
      timestamp: '1 week ago',
    },
  ];

  const platformBadgeClass = (platform) => {
    if (platform === 'linkedin') return 'border-blue-500/50 text-blue-400';
    if (platform === 'github') return 'border-zinc-400/50 text-zinc-200';
    if (platform === 'google') return 'border-emerald-500/40 text-emerald-300';
    return 'border-white/20 text-white/70';
  };

  return (
    <div className="bg-bg text-text skeleton-section">
      <div className="mx-auto max-w-[95vw] p-8">
        {/* Page title */}
        <header className="text-center">
          <h1 className="text-4xl font-bold">Testimonials</h1>
          <p className="mt-2 text-sm opacity-70">
            What people say about working with me
          </p>
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

                      <div className="hidden group-hover:block absolute right-0 mt-2 w-80 border rounded-xl skeleton-box bg-bg p-3 text-xs opacity-90">
                        We use IP checking to prevent duplicate guest submissions
                        and maintain guestbook integrity. This is a first line of
                        defense against spam.
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
                    <span
                      className={`px-3 py-1 text-xs border rounded-full skeleton-chip ${providerPillClass}`}
                    >
                      Connected via {providerLabel}
                      {authMode === 'linkedin' ? ' in' : authMode === 'github' ? ' gh' : authMode === 'google' ? ' G' : ''}
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
                        Website
                        <span className="opacity-60 font-normal"> (optional)</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 border rounded-xl skeleton-box bg-transparent"
                        placeholder="Your Website (optional)"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                      <p className="mt-2 text-xs opacity-70">
                        Optional. Example: https://johnsmith.com
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border rounded-xl skeleton-box bg-transparent min-h-[140px]"
                        placeholder="Share your thoughts..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                      <p className="mt-2 text-xs opacity-70">
                        Required. (4–5 lines visually)
                      </p>
                    </div>

                    {/* Picture */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Picture
                        <span className="opacity-60 font-normal"> (optional)</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 border rounded-xl skeleton-box bg-transparent"
                        placeholder="Upload a picture or paste URL (optional)"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                      />
                      <p className="mt-2 text-xs opacity-70">
                        {authMode !== 'guest'
                          ? 'If signed in, this would auto-fill from your social profile.'
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
                      Submit disabled if Name or Message is empty.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* RIGHT HALF: Testimonials list (concept auto-scroll) */}
          <section className="border rounded-2xl skeleton-box p-8">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Guestbook</h2>
              <p className="text-xs opacity-70">
                Auto-scrolling carousel (concept only)
              </p>
            </header>

            {/* Vertical scrolling container (concept): show 4 visible cards */}
            <div className="mt-6 flex flex-col gap-4 max-h-[520px] overflow-hidden">
              {testimonialExamples.slice(0, 4).map((t) => (
                <article key={t.id} className="border rounded-2xl skeleton-box p-5">
                  {/* Profile row */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 border rounded-full skeleton-box overflow-hidden flex items-center justify-center">
                      <span className="text-[10px] opacity-60 text-center px-1">
                        {t.avatar}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{t.name}</p>

                        <span
                          className={`px-2 py-0.5 text-[10px] border rounded-full skeleton-chip ${platformBadgeClass(
                            t.platform
                          )}`}
                          title={t.platformLabel}
                        >
                          {t.platformIcon}
                        </span>
                      </div>

                      <p className="text-xs opacity-70 truncate">
                        {t.website}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-4 border rounded-xl skeleton-box p-4">
                    <p className="text-sm opacity-90">“{t.message}”</p>
                  </div>

                  {/* Timestamp */}
                  <p className="mt-3 text-xs opacity-60">{t.timestamp}</p>
                </article>
              ))}
            </div>

            {/* Visible note about auto-scroll (no logic) */}
            <div className="mt-6 text-xs opacity-70 border rounded-xl skeleton-box p-4">
              Vertical auto-scroll carousel planned (infinite loop effect). Phase 2 shows static example cards only.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Testimonials;
