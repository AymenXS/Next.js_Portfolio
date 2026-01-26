'use client';

import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const res = await fetch('/api/projects', { cache: 'no-store' });
        const json = await res.json().catch(() => null);

        if (!alive) return;

        if (!res.ok || !json?.ok) {
          throw new Error(json?.error || `Request failed (${res.status})`);
        }

        setItems(Array.isArray(json.items) ? json.items : []);
      } catch (e) {
        if (!alive) return;
        setLoadError(e?.message || 'Failed to load projects');
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    }

    run();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <a href="/" className="text-sm underline opacity-80">
          Back to Home
        </a>
      </div>

      <p className="mt-2 text-sm opacity-70">
        A simple list view (Phase 3 fundamentals). Detailed UI remains on the home page carousel.
      </p>

      {(isLoading || loadError) && (
        <p className="mt-4 text-xs opacity-70">
          {isLoading ? 'Loading projects from CMS…' : `Failed to load projects (${loadError})`}
        </p>
      )}

      {!isLoading && !loadError && items.length === 0 ? (
        <p className="mt-8 text-sm opacity-70">No projects found.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map((p) => (
            <li key={p.id} className="border rounded-2xl p-4 skeleton-box">
              <div className="text-xs uppercase tracking-widest opacity-70">{p.subtitle}</div>
              <div className="mt-2 text-xl font-bold">{p.title}</div>
              {p.cardMiniDescription && (
                <p className="mt-2 text-sm opacity-80">{p.cardMiniDescription}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2 text-xs opacity-80">
                {(p.techConcepts || []).slice(0, 4).map((t, idx) => (
                  <span key={idx} className="border rounded-full px-2 py-1">
                    {t.concept}: {t.tech}
                  </span>
                ))}
              </div>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm underline"
                >
                  Live demo
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
