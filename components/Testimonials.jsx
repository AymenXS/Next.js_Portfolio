'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';

const platformBadgeClass = (platform) => {
  if (platform === 'linkedin') return 'border-blue-500/50 text-blue-400';
  if (platform === 'github') return 'border-zinc-400/50 text-zinc-200';
  if (platform === 'google') return 'border-emerald-500/40 text-emerald-300';
  return 'border-white/20 text-white/70';
};

const safeStr = (v, fallback = '') => (typeof v === 'string' && v.trim() ? v.trim() : fallback);

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
  // ✅ Phase 4 decision: UI shell preserved but disabled, read-only behavior
  const READ_ONLY_LOCKED = true;

  const [items, setItems] = useState([]);
  const [state, setState] = useState({ loading: true, error: '' });

  // keep “auth mode” selector for later (but disabled)
  const [authMode, setAuthMode] = useState('guest');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

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

  const visible = useMemo(() => items.slice(0, 4), [items]);

  // ✅ Phase 4: submit is disabled; no fake action
  const onSubmit = (e) => {
    e.preventDefault();
    // Intentionally no-op in read-only mode
  };

  return (
    <div className="bg-bg text-text skeleton-section" id="testimonials">
      <div className="mx-auto max-w-[95vw] p-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Testimonials</h1>
          <p className="mt-2 text-sm opacity-70">
            Guestbook UI preserved — submissions are locked in Phase 4
          </p>
        </header>

        <main className="mt-10">
          <section className="border rounded-2xl skeleton-box p-8 max-w-3xl mx-auto">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Guestbook</h2>
              <div className="text-right">
                <p className="text-[11px] opacity-70">CMS-backed list</p>
                {READ_ONLY_LOCKED && (
                  <p className="text-[11px] opacity-60">
                    🔒 Read-only (submission deferred)
                  </p>
                )}
              </div>
            </header>

            {/* ✅ Submission shell preserved but disabled */}
            <div className="mt-6 border rounded-2xl skeleton-box p-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm font-semibold">Leave a message</p>

                {/* This replaces “IP-checked” as an active claim */}
                <p className="text-[11px] opacity-60">
                  Anti-spam (IP/rate-limit) planned — not active in read-only mode
                </p>
              </div>

              {/* auth selector (disabled) */}
              <div className="mt-4 flex gap-2 flex-wrap">
                {[
                  { key: 'guest', label: 'Guest' },
                  { key: 'google', label: 'Google' },
                  { key: 'github', label: 'GitHub' },
                  { key: 'linkedin', label: 'LinkedIn' },
                ].map((m) => {
                  const active = authMode === m.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      disabled={READ_ONLY_LOCKED}
                      onClick={() => !READ_ONLY_LOCKED && setAuthMode(m.key)}
                      className={
                        'px-3 py-1 text-xs border rounded-full skeleton-chip ' +
                        (active ? 'opacity-100' : 'opacity-70') +
                        (READ_ONLY_LOCKED ? ' cursor-not-allowed opacity-40' : '')
                      }
                      title={READ_ONLY_LOCKED ? 'Submissions are locked in Phase 4' : ''}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>

              <form className="mt-4 space-y-3" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    className="px-3 py-2 border rounded-xl bg-transparent outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={READ_ONLY_LOCKED}
                  />
                  <input
                    className="px-3 py-2 border rounded-xl bg-transparent outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                    placeholder="Website (optional)"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    disabled={READ_ONLY_LOCKED}
                  />
                </div>

                <textarea
                  className="w-full px-3 py-2 border rounded-xl bg-transparent outline-none min-h-[110px] disabled:opacity-40 disabled:cursor-not-allowed"
                  placeholder="Your message…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={READ_ONLY_LOCKED}
                />

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-xs opacity-60">
                    Submissions are disabled in Phase 4 (read-only mode).
                  </p>

                  <button
                    type="submit"
                    disabled={true}
                    className="px-4 py-2 border rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Locked until submission pipeline is implemented"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* ✅ Loading */}
            {state.loading && (
              <div className="mt-6 text-xs opacity-70 border rounded-xl skeleton-box p-4">
                Loading testimonials…
              </div>
            )}

            {/* ✅ Error (actionable) */}
            {!state.loading && state.error && (
              <div className="mt-6 border rounded-xl skeleton-box p-4">
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
              <div className="mt-6 text-xs opacity-70 border rounded-xl skeleton-box p-4">
                No testimonials yet.
              </div>
            )}

            {/* ✅ Success */}
            {!state.loading && !state.error && visible.length > 0 && (
              <div className="mt-6 flex flex-col gap-4 max-h-[520px] overflow-hidden">
                {visible.map((t) => (
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
                      <p className="mt-3 text-xs opacity-60">{t.timestamp}</p>
                    ) : (
                      <p className="mt-3 text-xs opacity-50">—</p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Testimonials;
