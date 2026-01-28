'use client';

import { useEffect, useState, useCallback } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const platformBadgeClass = (platform) => {
  if (platform === 'linkedin') return 'border-blue-500/50 text-blue-400';
  if (platform === 'github') return 'border-zinc-400/50 text-zinc-200';
  if (platform === 'google') return 'border-emerald-500/40 text-emerald-300';
  return 'border-white/20 text-white/70';
};

const safeStr = (v, fallback = '') => (typeof v === 'string' && v.trim() ? v.trim() : fallback);

const humanizeTimestamp = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 5) return `${diffWeek} week${diffWeek === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString();
};

const normalizeTestimonial = (t, idx) => {
  const safe = t && typeof t === 'object' ? t : {};
  return {
    id: safe.id ?? `t-${idx}`,
    name: safeStr(safe.name, 'Anonymous'),
    website: safeStr(safe.website, ''),
    platform: safeStr(safe.platform, 'guest'),
    platformLabel: safeStr(safe.platformLabel, 'Guest'),
    platformIcon: safeStr(safe.platformIcon, 'guest'),
    message: safeStr(safe.message, ''),
    timestamp: safeStr(safe.timestamp, ''),
    avatar: safeStr(safe.avatar, 'default-avatar.png'),
  };
};

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });
  const { data: session, status } = useSession();

  const [mode, setMode] = useState('guest');
  const [form, setForm] = useState({ name: '', website: '', message: '', honeypot: '' });
  const [submitState, setSubmitState] = useState({ loading: false, error: '', success: '' });

  const fetchTestimonials = useCallback(async () => {
    setState({ loading: true, error: '' });

    try {
      const res = await fetch('/api/testimonials', { cache: 'no-store' });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const listRaw = Array.isArray(data.items) ? data.items : [];
      const list = listRaw.map(normalizeTestimonial).filter((x) => x.id);

      setItems(list);
      setState({ loading: false, error: '' });
    } catch (e) {
      setItems([]);
      setState({ loading: false, error: e?.message || 'Failed to load testimonials' });
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  useEffect(() => {
    if (session?.user) setMode('github');
  }, [session]);

  const onField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const resetSubmit = () => setSubmitState({ loading: false, error: '', success: '' });
  const guestNameRequired = mode === 'guest' && !form.name.trim();
  const messageRequired = !form.message.trim();
  const disableSubmit = submitState.loading || messageRequired || guestNameRequired;

  const onSubmit = async (e) => {
    e.preventDefault();
    resetSubmit();

    if (mode === 'github' && !session?.user) {
      setSubmitState({ loading: false, error: 'Sign in with GitHub to submit.', success: '' });
      return;
    }

    const message = form.message.trim();
    if (!message) {
      setSubmitState({ loading: false, error: 'Message is required.', success: '' });
      return;
    }

    setSubmitState({ loading: true, error: '', success: '' });
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          name: form.name,
          website: form.website,
          message: form.message,
          honeypot: form.honeypot,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Submission failed');
      }

      setForm((prev) => ({ ...prev, message: '', honeypot: '' }));
      setSubmitState({
        loading: false,
        error: '',
        success: 'Submitted for review. Thanks for sharing!',
      });
    } catch (err) {
      setSubmitState({
        loading: false,
        error: err?.message || 'Submission failed',
        success: '',
      });
    }
  };

  return (
    <div className="bg-bg text-text skeleton-section" id="testimonials">
      <div className="mx-auto max-w-[95vw] p-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Testimonials</h1>
          <p className="mt-2 text-sm opacity-70">
            Share your thoughts and connect with me
          </p>
        </header>

        <main className="mt-10">
          <section className="border rounded-2xl skeleton-box p-10 mx-auto max-w-[95vw] min-h-[90vh]">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Guestbook</h2>
              <p className="text-[11px] opacity-70">CMS-backed list</p>
            </header>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">
              <div className="border rounded-2xl skeleton-box p-5 h-fit">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-[11px] opacity-60">1 submission per 24h per IP</p>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                  {[
                    { key: 'guest', label: 'Guest' },
                    { key: 'github', label: 'GitHub' },
                  ].map((m) => {
                    const active = mode === m.key;
                    return (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setMode(m.key)}
                        className={
                          'px-3 py-1 text-xs border rounded-full skeleton-chip ' +
                          (active ? 'opacity-100' : 'opacity-70')
                        }
                      >
                        {m.label}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    disabled
                    className="px-3 py-1 text-xs border rounded-full skeleton-chip opacity-40 cursor-not-allowed"
                    title="Not available yet"
                  >
                    Google (not available yet)
                  </button>
                </div>

                {mode === 'github' && (
                  <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                    {session?.user ? (
                      <>
                        <p className="text-xs opacity-70">
                          Signed in as {session.user.name || 'GitHub user'}.
                        </p>
                        <button
                          type="button"
                          className="px-3 py-1 text-xs border rounded-full"
                          onClick={() => signOut()}
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-xs opacity-70">
                          Sign in with GitHub to submit.
                        </p>
                        <button
                          type="button"
                          className="px-3 py-1 text-xs border rounded-full"
                          onClick={() => signIn('github')}
                          disabled={status === 'loading'}
                        >
                          Sign in
                        </button>
                      </>
                    )}
                  </div>
                )}

                <form className="mt-4 space-y-3" onSubmit={onSubmit}>
                  {mode === 'guest' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        className="px-3 py-2 border rounded-xl bg-transparent outline-none"
                        placeholder="Name (required)"
                        value={form.name}
                        onChange={onField('name')}
                        maxLength={80}
                      />
                      <input
                        className="px-3 py-2 border rounded-xl bg-transparent outline-none"
                        placeholder="Website (optional)"
                        value={form.website}
                        onChange={onField('website')}
                        maxLength={200}
                      />
                    </div>
                  )}

                  {/* Honeypot field (hidden from humans) */}
                  <div className="hidden">
                    <input
                      tabIndex="-1"
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={onField('honeypot')}
                    />
                  </div>

                  <textarea
                    className="w-full px-3 py-2 border rounded-xl bg-transparent outline-none min-h-[110px]"
                    placeholder="Your message…"
                    value={form.message}
                    onChange={onField('message')}
                    maxLength={1000}
                  />

                  {submitState.error && (
                    <p className="text-xs text-red-400">{submitState.error}</p>
                  )}
                  {submitState.success && (
                    <p className="text-xs text-emerald-300">{submitState.success}</p>
                  )}

                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <button
                      type="submit"
                      disabled={disableSubmit}
                      className="px-4 py-2 border rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {submitState.loading ? 'Submitting…' : 'Submit Testimonial'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="border rounded-2xl skeleton-box p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">Recent entries</p>
                  <p className="text-[11px] opacity-60">Auto-scrolling (planned)</p>
                </div>
                {/* ✅ Loading */}
                {state.loading && (
                  <div className="mt-4 text-xs opacity-70 border rounded-xl skeleton-box p-4">
                    Loading testimonials…
                  </div>
                )}

                {/* ✅ Error (actionable) */}
                {!state.loading && state.error && (
                  <div className="mt-4 border rounded-xl skeleton-box p-4">
                    <p className="text-sm font-semibold">Failed to load testimonials.</p>
                    <p className="mt-1 text-xs opacity-70">{state.error}</p>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="px-4 py-2 border rounded-xl"
                        onClick={fetchTestimonials}
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}

                {/* ✅ Empty */}
                {!state.loading && !state.error && items.length === 0 && (
                  <div className="mt-4 text-xs opacity-70 border rounded-xl skeleton-box p-4">
                    No testimonials yet.
                  </div>
                )}

                {/* ✅ Success */}
                {!state.loading && !state.error && items.length > 0 && (
                  <div className="mt-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                    {items.map((t) => (
                      <article key={t.id} className="border rounded-2xl skeleton-box p-5">
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

                            {t.website ? (
                              <p className="text-xs opacity-70 truncate">{t.website}</p>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-4 border rounded-xl skeleton-box p-4">
                          <p className="text-sm opacity-90 break-words">
                            {t.message ? `“${t.message}”` : '“(No message provided)”'}
                          </p>
                        </div>

                        {t.timestamp ? (
                          <p className="mt-3 text-xs opacity-60">
                            {humanizeTimestamp(t.timestamp)}
                          </p>
                        ) : (
                          <p className="mt-3 text-xs opacity-50">—</p>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Testimonials;
