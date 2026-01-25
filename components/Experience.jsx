'use client';

import { useEffect, useMemo, useState } from 'react';

const FALLBACK_EXPERIENCES = [
  {
    id: 'fallback-1',
    jobTitle: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote Worldwide',
    locationMode: 'Remote',
    startDate: '2022-01-01T00:00:00.000Z',
    endDate: null,
    techGroups: [
      { label: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS'] },
      { label: 'Backend', items: ['Node.js', 'Express'] },
      { label: 'Database', items: ['PostgreSQL', 'Redis'] },
      { label: 'AI/Automation', items: ['OpenAI API'] },
      { label: 'Tools', items: ['Git', 'Docker'] },
    ],
    tasks: [
      {
        title: 'Key Highlights',
        descriptions: [
          'Architected a full-stack platform with AI recommendations → increased conversion by 35%, serving 10,000+ monthly users',
          'Automated invoice generation and email workflows → reduced manual work by 80%, saving 15 hours/week',
          'Integrated OpenAI-powered search and chatbot functionality → improved engagement by 40%, processing 500+ queries daily',
          'Optimized database queries and caching → decreased page load time by 60% (3.0s → 1.2s)',
        ],
      },
    ],
  },
  {
    id: 'fallback-2',
    jobTitle: 'Web Developer Intern',
    company: 'Digital Agency',
    location: 'Casablanca, Morocco',
    locationMode: 'Hybrid',
    startDate: '2021-06-01T00:00:00.000Z',
    endDate: '2021-12-01T00:00:00.000Z',
    techGroups: [
      { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] },
      { label: 'Backend', items: ['PHP', 'Laravel'] },
      { label: 'Database', items: ['MySQL'] },
      { label: 'Tools', items: ['Git', 'WordPress'] },
    ],
    tasks: [
      'Developed client websites using WordPress and custom themes → delivered on time with high client approval',
      'Collaborated with design team to implement responsive layouts → ensured mobile-first UX',
      'Maintained and updated existing client sites → resolved bugs with fast turnaround',
    ],
  },
];

function formatFullDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric' }).format(d);
}

function formatDateRange(startIso, endIso) {
  const start = formatFullDate(startIso);
  const end = endIso ? formatFullDate(endIso) : 'Present';
  if (!start && !endIso) return '';
  if (!start) return end;
  if (!end) return start;
  return `${start} - ${end}`;
}

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadState, setLoadState] = useState({ loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch('/api/experience', { method: 'GET' });
        const data = await res.json().catch(() => null);

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || `Request failed (${res.status})`);
        }

        const list = Array.isArray(data.items) ? data.items : [];
        if (!cancelled) {
          setItems(list.length ? list : FALLBACK_EXPERIENCES);
          setActiveIndex(0);
          setLoadState({ loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setItems(FALLBACK_EXPERIENCES);
          setActiveIndex(0);
          setLoadState({ loading: false, error: err?.message || 'Failed to load experiences' });
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const experiences = items.length ? items : FALLBACK_EXPERIENCES;

  const active = experiences[activeIndex] || null;

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < experiences.length - 1;

  const dateRange = useMemo(() => {
    if (!active) return '';
    return formatDateRange(active.startDate, active.endDate);
  }, [active]);

  return (
    <div className="relative p-8 w-full min-h-screen bg-bg text-text skeleton-section">
      {/* Split: simple 20 / 80 */}
      <main className="mx-auto flex gap-8">
        {/* LEFT (20%) */}
        <aside className="w-1/5 min-w-[260px]">
          <article className="p-4 border rounded-2xl skeleton-box">
            {/* FLIP CARD */}
            <div
              className="relative"
              onMouseEnter={() => setFlipped(true)}
              onMouseLeave={() => setFlipped(false)}
            >
              <div
                className="relative w-full aspect-[4/5] rounded-2xl border skeleton-box overflow-hidden"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 p-4 flex flex-col items-center justify-between text-center skeleton-box"
                    style={{
                      backfaceVisibility: 'hidden',
                      pointerEvents: flipped ? 'none' : 'auto',
                    }}
                  >
                    <div className="w-full">
                      <div className="mx-auto size-24 rounded-full border skeleton-box overflow-hidden flex items-center justify-center">
                        {/* Replace with real image when available */}
                        <span className="text-xs opacity-60">aymen-profile.jpg</span>
                      </div>

                      <h2 className="mt-4 text-xl font-bold">Aymen Ghaloua</h2>
                      <p className="text-sm opacity-70">Full-Stack Developer</p>
                      <p className="mt-1 text-xs opacity-70">AI Integration &amp; Automation Specialist</p>
                    </div>

                    <div className="w-full text-xs opacity-70 space-y-1">
                      <p>3+ Years</p>
                      <p>Remote Worldwide</p>
                      <p className="font-semibold">Available for Projects</p>
                    </div>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 p-4 flex flex-col justify-between skeleton-box"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      pointerEvents: flipped ? 'auto' : 'none',
                    }}
                  >
                    <div>
                      <p className="text-sm font-bold">Why Work With Me?</p>

                      <ul className="mt-3 text-xs opacity-80 space-y-2">
                        <li>
                          <span className="font-semibold">Years Active:</span> Active since 2021
                        </li>
                        <li>
                          <span className="font-semibold">Projects:</span> 15+ Projects Delivered
                        </li>
                        <li>
                          <span className="font-semibold">Industries:</span> E-commerce, SaaS, Healthcare
                        </li>
                        <li>
                          <span className="font-semibold">Key Metrics:</span> 98% Client Satisfaction • 20+ Clients Worldwide
                        </li>
                        <li>
                          <span className="font-semibold">Technologies:</span> 12+ Core Technologies
                        </li>
                        <li>
                          <span className="font-semibold">Different:</span> I combine deep technical execution with business thinking and AI-driven automation
                        </li>
                        <li>
                          <span className="font-semibold">Approach:</span> Systems-first development with AI augmentation
                        </li>
                        <li>
                          <span className="font-semibold">Problems:</span> Turn complex manual processes into simple, automated user experiences
                        </li>
                        <li>
                          <span className="font-semibold">Serve:</span> Startups and SMBs scaling their digital presence without enterprise-level budgets
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="mt-4 px-4 py-2 border rounded-xl"
                      onClick={() => setIsOpen(true)}
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>

                {/* HUD FLOATERS (simple offsets) */}
                <span className="absolute -top-3 left-4 px-3 py-1 text-xs border rounded-full skeleton-chip">Available</span>
                <span className="absolute top-4 -right-3 px-3 py-1 text-xs border rounded-full skeleton-chip">Remote Worldwide</span>
                <span className="absolute -bottom-3 left-6 px-3 py-1 text-xs border rounded-full skeleton-chip">UTC-5 → UTC+1</span>
                <span className="absolute bottom-6 -left-3 px-3 py-1 text-xs border rounded-full skeleton-chip">EN • FR • AR</span>
              </div>
            </div>
          </article>
        </aside>

        {/* RIGHT (80%) */}
        <section className="w-4/5">
          <article className="p-6 border rounded-2xl skeleton-box">
            <header className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold underline underline-offset-8">Professional Experiences</h3>
              </div>

              <div className="flex-1 text-center">
                <p className="text-sm opacity-70">{dateRange}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-2 border rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => canPrev && setActiveIndex((i) => Math.max(0, i - 1))}
                  disabled={!canPrev}
                  aria-label="Previous experience"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="px-3 py-2 border rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => canNext && setActiveIndex((i) => Math.min(experiences.length - 1, i + 1))}
                  disabled={!canNext}
                  aria-label="Next experience"
                >
                  →
                </button>
              </div>
            </header>

            {/* Meta row */}
            {active && (
              <>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <p className="text-base font-semibold">{active.jobTitle}</p>
                    <p className="text-base opacity-80">@{active.company}</p>
                    <p className="text-base opacity-70">{active.location}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-base">{active.locationMode}</p>
                  </div>
                </div>

                {/* Tech Groups (hover reveals items) */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {(active.techGroups || []).map((g) => (
                    <span
                      key={g.label}
                      className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default"
                    >
                      {g.label}
                      <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-72 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                        {(g.items || []).join(', ')}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Tasks */}
                {Array.isArray(active.tasks) && active.tasks.length > 0 && typeof active.tasks[0] === 'string' ? (
                  /* Back-compat: plain bullet strings */
                  <ol className="mt-6 space-y-3 text-sm opacity-80">
                    {(active.tasks || []).map((t, idx) => (
                      <li key={`${active.id}-t-${idx}`}>
                        <span className="font-semibold">{idx + 1}.</span>{' '}
                        <span>{t}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  /* Preferred: titled groups */
                  <div className="mt-6 space-y-6 text-sm opacity-80">
                    {(active.tasks || []).map((block, idx) => (
                      <div key={`${active.id}-tb-${idx}`}>
                        {block?.title && (
                          <div className="font-semibold text-accent mb-2">
                            {block.title}:
                          </div>
                        )}
                        <ul className="space-y-2">
                          {(block?.descriptions || []).map((d, j) => (
                            <li key={`${active.id}-tb-${idx}-d-${j}`} className="flex gap-2">
                              <span aria-hidden="true">-</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {loadState.error && (
                  <p className="mt-6 text-xs opacity-60">
                    CMS fallback active: {loadState.error}
                  </p>
                )}
              </>
            )}

            {!active && (
              <p className="mt-6 text-sm opacity-70">
                {loadState.loading ? 'Loading experiences…' : 'No experiences found.'}
              </p>
            )}
          </article>
        </section>
      </main>

      {/* MODAL (absolute + translate, no fixed) */}
      {isOpen && (
        <div className="absolute inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />

          {/* Panel centered via translate */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl p-6 border rounded-2xl bg-bg skeleton-box">
            <header className="flex items-center justify-between">
              <h3 className="font-bold text-lg">FULL PROFILE</h3>
              <button type="button" className="px-3 py-1 border rounded-lg" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </header>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Bento 1 */}
              <div className="p-4 border rounded-xl skeleton-box">
                <p className="text-sm font-bold">Identity &amp; Positioning</p>
                <div className="mt-3 text-xs opacity-80 space-y-1">
                  <p>
                    <span className="font-semibold">Name:</span> Aymen Ghaloua
                  </p>
                  <p>
                    <span className="font-semibold">Picture:</span> aymen-avatar-small.jpg
                  </p>
                  <p>
                    <span className="font-semibold">Primary Role:</span> Full-Stack Developer
                  </p>
                  <p>
                    <span className="font-semibold">Specialization:</span> AI Integration &amp; Automation
                  </p>
                  <p>
                    <span className="font-semibold">Years:</span> 3+ Years
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> Remote Worldwide
                  </p>
                  <p>
                    <span className="font-semibold">Availability:</span> Available
                  </p>
                </div>
              </div>

              {/* Bento 2 */}
              <div className="p-4 border rounded-xl skeleton-box">
                <p className="text-sm font-bold">Value Proposition</p>
                <div className="mt-3 text-xs opacity-80 space-y-1">
                  <p>
                    <span className="font-semibold">Different:</span> Technical execution + business thinking + AI automation
                  </p>
                  <p>
                    <span className="font-semibold">Approach:</span> Systems-first development with AI augmentation
                  </p>
                  <p>
                    <span className="font-semibold">Problems:</span> Automate complex manual workflows into simple UX
                  </p>
                </div>
              </div>

              {/* Bento 3 */}
              <div className="p-4 border rounded-xl skeleton-box">
                <p className="text-sm font-bold">Services</p>
                <div className="mt-3 text-xs opacity-80 space-y-1">
                  <p>Full-stack web apps (Next.js / React)</p>
                  <p>API design and integrations</p>
                  <p>Automation and AI workflows</p>
                  <p>Performance and scaling</p>
                </div>
              </div>

              {/* Bento 4 */}
              <div className="p-4 border rounded-xl skeleton-box">
                <p className="text-sm font-bold">Contact</p>
                <div className="mt-3 text-xs opacity-80 space-y-1">
                  <p>Remote Worldwide</p>
                  <p>EN • FR • AR</p>
                  <p>UTC-5 → UTC+1</p>
                  <p className="opacity-70">Contact section contains the canonical links</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="button" className="px-4 py-2 border rounded-xl" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
