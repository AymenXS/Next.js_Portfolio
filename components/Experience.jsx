'use client';

import { useState } from 'react';

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

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
                    className="absolute inset-0 flex items-center justify-center skeleton-box"
                    style={{
                      backfaceVisibility: 'hidden',
                      pointerEvents: flipped ? 'none' : 'auto',
                    }}
                  >
                    Placeholder Image
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
                    <ul className="text-sm space-y-1">
                      <li>Detail 1</li>
                      <li>Detail 2</li>
                      <li>Detail 3</li>
                    </ul>

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
                <span className="absolute -top-3 left-4 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  Availability
                </span>
                <span className="absolute top-4 -right-3 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  Remote
                </span>
                <span className="absolute -bottom-3 left-6 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  Time Flex
                </span>
                <span className="absolute bottom-6 -left-3 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  Languages
                </span>
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold opacity-70">
              Universal Developer
            </h2>
          </article>
        </aside>

        {/* RIGHT (80%) */}
        <section className="w-4/5">
          <div className="border rounded-2xl skeleton-box min-h-[70vh]" />
        </section>
      </main>

      {/* MODAL (absolute + translate, no fixed) */}
      {isOpen && (
        <div className="absolute inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel centered via translate */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl p-6 border rounded-2xl bg-bg skeleton-box">
            <header className="flex items-center justify-between">
              <h3 className="font-bold text-lg">FULL PROFILE</h3>
              <button
                type="button"
                className="px-3 py-1 border rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </header>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl skeleton-box">Bento 1</div>
              <div className="p-4 border rounded-xl skeleton-box">Bento 2</div>
              <div className="p-4 border rounded-xl skeleton-box">Bento 3</div>
              <div className="p-4 border rounded-xl skeleton-box">Bento 4</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
