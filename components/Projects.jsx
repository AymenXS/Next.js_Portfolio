'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

/**
 * Phase 4 Rule:
 * - No fake fallback content
 * - CMS is source of truth
 * - Full states: loading / error / empty / success
 * - Modal: ESC + backdrop + scroll lock
 */

const isValidExternalUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const u = url.trim();
  if (!u) return false;
  if (u === '#') return false;
  // Allow https/http only (avoid javascript: etc)
  return /^https?:\/\/.+/i.test(u);
};

const normalizeTechStack = (tech) => {
  if (!Array.isArray(tech)) return [];
  return tech
    .map((t) => ({
      concept: typeof t?.concept === 'string' ? t.concept : '',
      tech: typeof t?.tech === 'string' ? t.tech : '',
    }))
    .filter((t) => t.concept && t.tech);
};

const normalizeProject = (p, idx) => {
  const safe = p && typeof p === 'object' ? p : {};
  const id = safe.id ?? idx;

  return {
    id,
    title: typeof safe.title === 'string' ? safe.title : '',
    subtitle: typeof safe.subtitle === 'string' ? safe.subtitle : '',
    miniDescription:
      typeof safe.cardMiniDescription === 'string'
        ? safe.cardMiniDescription
        : typeof safe.miniDescription === 'string'
          ? safe.miniDescription
          : '',
    keyFeatures: Array.isArray(safe.keyFeatures) ? safe.keyFeatures.filter((x) => typeof x === 'string') : [],
    techStack: normalizeTechStack(safe.techConcepts ?? safe.techStack),
    modalTitle: typeof safe.modalTitle === 'string' ? safe.modalTitle : '',
    modalMiniDescription:
      typeof safe.modalDescription === 'string'
        ? safe.modalDescription
        : typeof safe.modalMiniDescription === 'string'
          ? safe.modalMiniDescription
          : '',
    liveDemoUrl: typeof safe.liveUrl === 'string' ? safe.liveUrl : (typeof safe.liveDemoUrl === 'string' ? safe.liveDemoUrl : ''),
    problem: typeof safe.problem === 'string' ? safe.problem : '',
    answer: typeof safe.answer === 'string' ? safe.answer : '',
    visualDesign: Array.isArray(safe.visualDesign) ? safe.visualDesign.filter((x) => typeof x === 'string') : [],
    architecture: Array.isArray(safe.architecture) ? safe.architecture.filter((x) => typeof x === 'string') : [],
    standoutSections: Array.isArray(safe.standoutSections) ? safe.standoutSections.filter((x) => typeof x === 'string') : [],
    metrics: safe.metrics && typeof safe.metrics === 'object' ? safe.metrics : {},
    extraMetrics: safe.extraMetrics && typeof safe.extraMetrics === 'object' ? safe.extraMetrics : {},
    thumbnail: typeof safe.thumbnail === 'string' ? safe.thumbnail : '',
    pictures: Array.isArray(safe.pictures) ? safe.pictures : [],
    featured: Boolean(safe.featured),
    startDate: safe.startDate ?? null,
    endDate: safe.endDate ?? null,
    slug: typeof safe.slug === 'string' ? safe.slug : '',
  };
};

/**
 * Reusable Tech Pill
 * Default: concept
 * Hover: tech
 */
const TechPill = ({ concept, tech, isHovered, onEnter, onLeave }) => {
  return (
    <span
      className="px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      title={tech}
    >
      <span className="transition-opacity duration-150">
        {isHovered ? tech : concept}
      </span>
    </span>
  );
};

const Projects = () => {
  // ✅ Phase 4: CMS is the truth; start empty
  const [items, setItems] = useState([]);
  const [loadState, setLoadState] = useState({ loading: true, error: null });

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hover states
  const [hoveredPillIndex, setHoveredPillIndex] = useState(null);
  const [hoveredModalConceptIndex, setHoveredModalConceptIndex] = useState(null);

  const abortRef = useRef(null);

  const fetchProjects = useCallback(async () => {
    // cancel previous
    if (abortRef.current) {
      try { abortRef.current.abort(); } catch { }
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoadState({ loading: true, error: null });

    try {
      const res = await fetch('/api/projects', { cache: 'no-store', signal: controller.signal });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Request failed (${res.status})`);
      }

      const mapped = Array.isArray(json.items) ? json.items.map(normalizeProject) : [];

      setItems(mapped);
      setCurrentIndex(0);
      setLoadState({ loading: false, error: null });
    } catch (e) {
      if (e?.name === 'AbortError') return;
      setItems([]);
      setCurrentIndex(0);
      setLoadState({ loading: false, error: e?.message || 'Failed to load projects' });
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    return () => {
      if (abortRef.current) {
        try { abortRef.current.abort(); } catch { }
      }
    };
  }, [fetchProjects]);

  // ✅ Keep index valid when items change
  useEffect(() => {
    if (currentIndex >= items.length) setCurrentIndex(0);
  }, [items.length, currentIndex]);

  const currentProject = items[currentIndex] || null;

  const canPrev = currentIndex > 0;
  const canNext = currentIndex < items.length - 1;

  const onPrev = () => canPrev && setCurrentIndex((i) => Math.max(0, i - 1));
  const onNext = () => canNext && setCurrentIndex((i) => Math.min(items.length - 1, i + 1));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setHoveredModalConceptIndex(null);
  };

  // ✅ Body scroll lock while modal open
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  // ✅ ESC to close modal
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
      // optional carousel keys while modal closed only
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen]);

  const liveDemoOk = useMemo(
    () => (currentProject ? isValidExternalUrl(currentProject.liveDemoUrl) : false),
    [currentProject]
  );

  // --------------------
  // RENDER STATES (Phase 4)
  // --------------------

  return (
    <div className="bg-bg text-text skeleton-section">
      <div className="mx-auto max-w-[90vw] p-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Latest Projects</h1>
          <p className="mt-2 text-sm opacity-70">
            Explore my recent work and case studies
          </p>
        </header>

        {/* ✅ Loading */}
        {loadState.loading && (
          <p className="mt-6 text-sm opacity-70 text-center">Loading projects…</p>
        )}

        {/* ✅ Error (actionable) */}
        {!loadState.loading && loadState.error && (
          <div className="mt-10 border rounded-2xl skeleton-box p-6 text-center">
            <p className="text-sm font-semibold">Failed to load projects.</p>
            <p className="mt-2 text-xs opacity-70">{loadState.error}</p>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                className="px-5 py-2 border rounded-xl skeleton-box"
                onClick={fetchProjects}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* ✅ Empty (honest) */}
        {!loadState.loading && !loadState.error && items.length === 0 && (
          <div className="mt-10 border rounded-2xl skeleton-box p-6 text-center">
            <p className="text-sm opacity-70">No projects found.</p>
          </div>
        )}

        {/* ✅ Success */}
        {!loadState.loading && !loadState.error && currentProject && (
          <section className="relative mt-10 border rounded-2xl skeleton-box p-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              {/* Left */}
              <div className="lg:col-span-2">
                <p className="text-sm uppercase tracking-widest opacity-70">
                  {currentProject.subtitle}
                </p>
                <h2 className="mt-3 text-5xl font-extrabold">
                  {currentProject.title}
                </h2>

                <p className="mt-4 text-sm opacity-80 max-w-xl">
                  {currentProject.miniDescription}
                </p>

                <ul className="mt-4 list-disc pl-5 text-sm space-y-1 opacity-90">
                  {(currentProject.keyFeatures || []).slice(0, 4).map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(currentProject.techStack || []).map((t, idx) => (
                    <TechPill
                      key={idx}
                      concept={t.concept}
                      tech={t.tech}
                      isHovered={hoveredPillIndex === idx}
                      onEnter={() => setHoveredPillIndex(idx)}
                      onLeave={() => setHoveredPillIndex(null)}
                    />
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="lg:col-span-3">
                <button
                  type="button"
                  className="w-full text-left border rounded-2xl skeleton-box p-4"
                  onClick={openModal}
                >
                  <div className="aspect-video border rounded-xl skeleton-box flex items-center justify-center opacity-70">
                    {currentProject.thumbnail || 'Project media'} (16:9) — click to open modal
                  </div>
                </button>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <button
                type="button"
                className="w-12 h-12 border rounded-full skeleton-box disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={onPrev}
                disabled={!canPrev}
                aria-label="Previous project"
              >
                ‹
              </button>

              <div className="flex items-center gap-3">
                {items.map((p, idx) => {
                  const active = idx === currentIndex;
                  return (
                    <button
                      key={p.id ?? idx}
                      type="button"
                      className={
                        'w-3 h-3 rounded-full border ' +
                        (active ? 'bg-black' : 'bg-transparent opacity-60')
                      }
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to project ${idx + 1}`}
                    />
                  );
                })}
                <span className="ml-2 text-xs opacity-70">
                  {currentIndex + 1} of {items.length}
                </span>
              </div>

              <button
                type="button"
                className="w-12 h-12 border rounded-full skeleton-box disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={onNext}
                disabled={!canNext}
                aria-label="Next project"
              >
                ›
              </button>
            </div>

            {/* View all projects (route exists) */}
            <div className="mt-10 flex justify-center">
              <a href="/projects" className="px-6 py-3 border rounded-xl skeleton-box">
                VIEW ALL PROJECTS
              </a>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="absolute inset-0 z-50">
                <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,85vw)] border rounded-2xl bg-bg skeleton-box">
                  <div className="max-h-[70vh] overflow-y-auto p-6">
                    <header className="relative">
                      <button
                        type="button"
                        className="absolute right-0 top-0 px-3 py-1 border rounded-lg"
                        onClick={closeModal}
                      >
                        Close
                      </button>

                      <div className="text-xs opacity-80">
                        <span className="font-semibold">TECH STACK</span>
                        <span className="opacity-70"> | </span>

                        {(currentProject.techStack || []).map((t, idx) => {
                          const active = hoveredModalConceptIndex === idx;
                          return (
                            <span key={idx}>
                              <span
                                className="cursor-default"
                                onMouseEnter={() => setHoveredModalConceptIndex(idx)}
                                onMouseLeave={() => setHoveredModalConceptIndex(null)}
                                style={{ transition: 'opacity 150ms' }}
                              >
                                {active ? t.tech.toUpperCase() : t.concept.toUpperCase()}
                              </span>
                              {idx < currentProject.techStack.length - 1 ? (
                                <span className="opacity-60"> • </span>
                              ) : null}
                            </span>
                          );
                        })}
                      </div>

                      <div className="mt-4 flex items-start justify-between gap-6">
                        <div>
                          <h3 className="text-3xl font-extrabold">
                            {currentProject.modalTitle || currentProject.title}
                          </h3>
                          <p className="mt-2 text-sm opacity-80 max-w-2xl">
                            {currentProject.modalMiniDescription || currentProject.miniDescription}
                          </p>
                        </div>

                        {/* ✅ Phase 4: hide if absent */}
                        {liveDemoOk && (
                          <a
                            href={currentProject.liveDemoUrl}
                            className="px-4 py-2 border rounded-xl"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Live Demo →
                          </a>
                        )}
                      </div>
                    </header>

                    <div className="mt-8 flex flex-col gap-8">
                      <section>
                        <h4 className="font-bold">Real Problem Solved</h4>
                        {currentProject.problem ? (
                          <p className="mt-3 text-sm opacity-90">
                            <span className="font-semibold">Problem:</span> {currentProject.problem}
                          </p>
                        ) : (
                          <p className="mt-3 text-sm opacity-70">Problem statement not provided.</p>
                        )}

                        {currentProject.answer ? (
                          <p className="mt-3 text-sm opacity-90">
                            <span className="font-semibold">Answer:</span> {currentProject.answer}
                          </p>
                        ) : (
                          <p className="mt-3 text-sm opacity-70">Solution summary not provided.</p>
                        )}
                      </section>

                      <section>
                        <h4 className="font-bold">Key Features</h4>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-xl skeleton-box p-4">
                            <h5 className="font-semibold">Visual &amp; UX Concepts</h5>
                            <ul className="mt-2 list-disc pl-5 text-sm space-y-1 opacity-90">
                              {(currentProject.visualDesign || []).slice(0, 6).map((x, idx) => (
                                <li key={idx}>{x}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="border rounded-xl skeleton-box p-4">
                            <h5 className="font-semibold">Architecture &amp; Technical Implementation</h5>
                            <ul className="mt-2 list-disc pl-5 text-sm space-y-1 opacity-90">
                              {(currentProject.architecture || []).slice(0, 6).map((x, idx) => (
                                <li key={idx}>{x}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {currentProject.standoutSections?.length ? (
                          <div className="mt-4 border rounded-xl skeleton-box p-4">
                            <h5 className="font-semibold">Highlighted Features</h5>
                            <ul className="mt-2 list-disc pl-5 text-sm space-y-1 opacity-90">
                              {currentProject.standoutSections.slice(0, 4).map((s, idx) => (
                                <li key={idx}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </section>

                      <section>
                        <h4 className="font-bold">Project Metrics</h4>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['performance', 'accessibility', 'bestPractices', 'seo'].map((k) => (
                            <div key={k} className="border rounded-xl skeleton-box p-4">
                              <p className="text-sm font-semibold">
                                {k === 'bestPractices' ? 'Best Practices' : k[0].toUpperCase() + k.slice(1)}
                              </p>
                              <p className="mt-2 text-2xl font-bold">
                                {currentProject.metrics?.[k] ?? '—'}
                              </p>
                            </div>
                          ))}
                        </div>

                        {currentProject.extraMetrics && Object.keys(currentProject.extraMetrics).length > 0 ? (
                          <div className="mt-4 border rounded-xl skeleton-box p-4 text-sm opacity-85">
                            {Object.entries(currentProject.extraMetrics).map(([kk, vv]) => (
                              <p key={kk}>
                                <span className="font-semibold">{kk}:</span> {String(vv)}
                              </p>
                            ))}
                          </div>
                        ) : null}
                      </section>

                      {/* Bottom CTA (same rule: hide if absent) */}
                      {liveDemoOk && (
                        <footer className="pt-2 pb-2">
                          <div className="flex justify-center">
                            <a
                              href={currentProject.liveDemoUrl}
                              className="px-8 py-3 border rounded-xl"
                              target="_blank"
                              rel="noreferrer"
                            >
                              View Live Demo →
                            </a>
                          </div>
                        </footer>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Projects;
