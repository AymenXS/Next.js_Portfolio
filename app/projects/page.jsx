'use client';

import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      try {
        setIsLoading(true);
        setLoadError('');

        const res = await fetch('/api/projects');
        const json = await res.json().catch(() => null);

        if (!isMounted) return;

        if (!res.ok || !json?.ok) {
          setLoadError(json?.error || 'Failed to load projects');
          return;
        }

        setItems(Array.isArray(json?.items) ? json.items : []);
      } catch (err) {
        if (!isMounted) return;
        setLoadError(err?.message || 'Failed to load projects');
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-5xl p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">All Projects</h1>
            <p className="mt-2 text-sm opacity-70">
              Minimal list view (Phase 3). Detailed UI deferred.
            </p>
          </div>

          <a className="px-4 py-2 border rounded-lg" href="/">
            Back to Home
          </a>
        </div>

        {(isLoading || loadError) && (
          <p className="mt-6 text-sm opacity-70">
            {isLoading ? 'Loading…' : `Load issue: ${loadError}`}
          </p>
        )}

        {!isLoading && !loadError && (
          <div className="mt-8 grid gap-4">
            {items.map((p) => (
              <article key={p.id} className="border rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest opacity-70">
                  {p.category}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
                <p className="mt-2 text-sm opacity-80">{p.miniDescription}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(p.techStack || []).slice(0, 6).map((t, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs border rounded-full">
                      {t.concept}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            {!items.length && (
              <p className="text-sm opacity-70">No projects found.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
