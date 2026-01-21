'use client';

import { useState } from 'react';

/**
 * DATA (Simple)
 */
const projects = [
  {
    id: 1,
    category: 'ONLINE STORE WEBSITE',
    title: 'SwiftCart',
    thumbnail: 'placeholder',
    miniDescription:
      'An expansive online store offering a diverse range of products, providing a smooth and secure shopping experience for customers seeking quality goods and services. Featuring:',
    keyFeatures: [
      'Feature 1: Responsive design',
      'Feature 2: Secure checkout',
      'Feature 3: Product filtering',
      'Feature 4: User reviews',
    ],
    techStack: [
      { concept: '3D Animation', tech: 'WebGL' },
      { concept: 'Framework', tech: 'NextJS' },
      { concept: 'State Management', tech: 'Redux' },
      { concept: 'Styling', tech: 'TailwindCSS' },
    ],
    problem:
      'Customers needed a reliable store experience with a clear browsing flow, predictable shopping cart behavior, and trustworthy checkout steps. Many store experiences feel cluttered, slow, or confusing, especially on mobile.',
    answer:
      'The solution focuses on clear hierarchy and frictionless navigation, backed by predictable state management for cart actions and a consistent UI system. The checkout flow is simplified to reduce drop-off and improve confidence.',
    visualDesign: [
      'Modern minimalist interface',
      'Clear hierarchy and spacing',
      'Mobile-first responsive layout',
      'Consistent component styling',
      'Readable typography and CTAs',
    ],
    architecture: [
      'RESTful API integration',
      'Client state for cart + user flow',
      'Separation of UI vs data concerns',
      'Caching / performance considerations',
      'Scalable folder structure',
    ],
    standoutSections: ['3D product viewer', 'AI-powered recommendations'],
    metrics: { performance: 95, accessibility: 98, bestPractices: 92, seo: 100 },
  },
  {
    id: 2,
    category: 'PORTFOLIO WEBSITE',
    title: 'Project Title 2',
    thumbnail: 'placeholder',
    miniDescription:
      'A modern portfolio showcasing projects with a strong visual hierarchy and smooth navigation. Built for clarity and conversion. Featuring:',
    keyFeatures: [
      'Feature 1: Clean sections',
      'Feature 2: Fast navigation',
      'Feature 3: Project modals',
      'Feature 4: Responsive layout',
    ],
    techStack: [
      { concept: '3D Animation', tech: 'Three.js' },
      { concept: 'Framework', tech: 'NextJS' },
      { concept: 'State Management', tech: 'Zustand' },
      { concept: 'Styling', tech: 'TailwindCSS' },
    ],
    problem: 'Problem description goes here...',
    answer: 'Solution description goes here...',
    visualDesign: ['Point 1', 'Point 2', 'Point 3', 'Point 4'],
    architecture: ['Point 1', 'Point 2', 'Point 3', 'Point 4'],
    standoutSections: ['Section 1', 'Section 2'],
    metrics: { performance: 90, accessibility: 96, bestPractices: 93, seo: 99 },
  },
  {
    id: 3,
    category: 'DASHBOARD APP',
    title: 'Project Title 3',
    thumbnail: 'placeholder',
    miniDescription:
      'A dashboard that surfaces insights quickly and keeps workflows simple for daily use. Built with maintainability in mind. Featuring:',
    keyFeatures: [
      'Feature 1: Data overview',
      'Feature 2: Filters',
      'Feature 3: Exports',
      'Feature 4: Auth roles',
    ],
    techStack: [
      { concept: '3D Animation', tech: 'None' },
      { concept: 'Framework', tech: 'React' },
      { concept: 'State Management', tech: 'Redux' },
      { concept: 'Styling', tech: 'CSS Modules' },
    ],
    problem: 'Problem description goes here...',
    answer: 'Solution description goes here...',
    visualDesign: ['Point 1', 'Point 2', 'Point 3', 'Point 4'],
    architecture: ['Point 1', 'Point 2', 'Point 3', 'Point 4'],
    standoutSections: ['Section 1', 'Section 2'],
    metrics: { performance: 92, accessibility: 97, bestPractices: 91, seo: 98 },
  },
];

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
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hover states
  const [hoveredPillIndex, setHoveredPillIndex] = useState(null);
  const [hoveredModalConceptIndex, setHoveredModalConceptIndex] = useState(null);

  const currentProject = projects[currentIndex];

  const onPrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => i - 1);
  };

  const onNext = () => {
    if (currentIndex === projects.length - 1) return;
    setCurrentIndex((i) => i + 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setHoveredModalConceptIndex(null);
  };

  return (
    <div className="bg-bg text-text skeleton-section">
      <div className="mx-auto max-w-[90vw] p-8">
        {/* Page Title */}
        <header className="text-center">
          <h1 className="text-4xl font-bold">Latest Projects</h1>
        </header>

        {/* Carousel Section (relative so modal overlay covers ONLY this section) */}
        <section className="relative mt-10 border rounded-2xl skeleton-box p-8">
          {/* 2.1 Layout: Left 40 / Right 60 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            {/* Left (~40%) */}
            <div className="lg:col-span-2">
              {/* Category + Title */}
              <p className="text-sm uppercase tracking-widest opacity-70">
                {currentProject.category}
              </p>
              <h2 className="mt-3 text-5xl font-extrabold">
                {currentProject.title}
              </h2>

              {/* Mini description */}
              <p className="mt-4 text-sm opacity-80 max-w-xl">
                {currentProject.miniDescription}
              </p>

              {/* Key features */}
              <ul className="mt-4 list-disc pl-5 text-sm space-y-1 opacity-90">
                {currentProject.keyFeatures.slice(0, 4).map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {currentProject.techStack.map((t, idx) => (
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

            {/* Right (~60%) */}
            <div className="lg:col-span-3">
              <button
                type="button"
                className="w-full text-left border rounded-2xl skeleton-box p-4"
                onClick={openModal}
              >
                <div className="aspect-video border rounded-xl skeleton-box flex items-center justify-center opacity-70">
                  Project Preview Placeholder (click to open modal)
                </div>
              </button>
            </div>
          </div>

          {/* 2.4 Navigation Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            {/* Left Arrow */}
            <button
              type="button"
              className="w-12 h-12 border rounded-full skeleton-box disabled:opacity-40"
              onClick={onPrev}
              disabled={currentIndex === 0}
              aria-label="Previous project"
            >
              ‹
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-3">
              {projects.map((p, idx) => {
                const active = idx === currentIndex;
                return (
                  <button
                    key={p.id}
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
              {/* Optional label placeholder */}
              <span className="ml-2 text-xs opacity-70">
                All • {currentIndex + 1}/{projects.length}
              </span>
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              className="w-12 h-12 border rounded-full skeleton-box disabled:opacity-40"
              onClick={onNext}
              disabled={currentIndex === projects.length - 1}
              aria-label="Next project"
            >
              ›
            </button>
          </div>

          {/* 4. ALL PROJECTS Button */}
          <div className="mt-10 flex justify-center">
            <button type="button" className="px-6 py-3 border rounded-xl skeleton-box">
              ALL PROJECTS
            </button>
          </div>

          {/* 3. Project Modal (covers ONLY this Projects section) */}
          {isModalOpen && (
            <div className="absolute inset-0 z-50">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

              {/* Panel (absolute center via translate) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,85vw)] border rounded-2xl bg-bg skeleton-box">
                {/* Inner scroll container */}
                <div className="max-h-[70vh] overflow-y-auto p-6">
                  {/* Modal Header */}
                  <header className="relative">
                    {/* Close button top-right */}
                    <button
                      type="button"
                      className="absolute right-0 top-0 px-3 py-1 border rounded-lg"
                      onClick={closeModal}
                    >
                      Close
                    </button>

                    {/* Interactive Concepts row */}
                    <div className="text-xs opacity-80">
                      <span className="font-semibold">CONCEPTS</span>
                      <span className="opacity-70"> | </span>

                      {currentProject.techStack.map((t, idx) => {
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

                    {/* Title + Description + CTA */}
                    <div className="mt-4 flex items-start justify-between gap-6">
                      <div>
                        <h3 className="text-3xl font-extrabold">{currentProject.title}</h3>
                        <p className="mt-2 text-sm opacity-80 max-w-2xl">
                          {currentProject.miniDescription}
                        </p>
                      </div>

                      <button type="button" className="px-4 py-2 border rounded-xl">
                        Live Demo
                      </button>
                    </div>
                  </header>

                  {/* Modal Content Sections */}
                  <div className="mt-8 flex flex-col gap-8">
                    {/* A. Media */}
                    <section>
                      <h4 className="font-bold">Media</h4>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="border rounded-xl skeleton-box p-4">Screenshot 1</div>
                        <div className="border rounded-xl skeleton-box p-4">Screenshot 2</div>
                        <div className="border rounded-xl skeleton-box p-4">Screenshot 3</div>
                      </div>
                      <div className="mt-3 border rounded-xl skeleton-box p-6">
                        Demo Video Placeholder
                      </div>
                    </section>

                    {/* B. Real Problem Solved */}
                    <section>
                      <h4 className="font-bold">Real Problem Solved</h4>
                      <p className="mt-3 text-sm opacity-90">
                        <span className="font-semibold">Problem:</span> {currentProject.problem}
                      </p>
                      <p className="mt-3 text-sm opacity-90">
                        <span className="font-semibold">Answer:</span> {currentProject.answer}
                      </p>
                      <p className="mt-3 text-xs opacity-70">
                        (This leads to the following key features)
                      </p>
                    </section>

                    {/* C. Key Features */}
                    <section>
                      <h4 className="font-bold">Key Features</h4>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-xl skeleton-box p-4">
                          <h5 className="font-semibold">Visual &amp; UX Concepts</h5>
                          <ul className="mt-2 list-disc pl-5 text-sm space-y-1 opacity-90">
                            {currentProject.visualDesign.slice(0, 6).map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="border rounded-xl skeleton-box p-4">
                          <h5 className="font-semibold">
                            Architecture &amp; Technical Implementation
                          </h5>
                          <ul className="mt-2 list-disc pl-5 text-sm space-y-1 opacity-90">
                            {currentProject.architecture.slice(0, 6).map((p, idx) => (
                              <li key={idx}>{p}</li>
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

                    {/* D. Metrics */}
                    <section>
                      <h4 className="font-bold">Performance Metrics / Lighthouse Scores</h4>
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="border rounded-xl skeleton-box p-4">
                          <p className="text-sm font-semibold">Performance</p>
                          <p className="mt-2 text-2xl font-bold">
                            {currentProject.metrics.performance}
                          </p>
                        </div>
                        <div className="border rounded-xl skeleton-box p-4">
                          <p className="text-sm font-semibold">Accessibility</p>
                          <p className="mt-2 text-2xl font-bold">
                            {currentProject.metrics.accessibility}
                          </p>
                        </div>
                        <div className="border rounded-xl skeleton-box p-4">
                          <p className="text-sm font-semibold">Best Practices</p>
                          <p className="mt-2 text-2xl font-bold">
                            {currentProject.metrics.bestPractices}
                          </p>
                        </div>
                        <div className="border rounded-xl skeleton-box p-4">
                          <p className="text-sm font-semibold">SEO</p>
                          <p className="mt-2 text-2xl font-bold">{currentProject.metrics.seo}</p>
                        </div>
                      </div>
                    </section>

                    {/* E. Bottom CTA */}
                    <footer className="pt-2 pb-2">
                      <div className="flex justify-center">
                        <button type="button" className="px-8 py-3 border rounded-xl">
                          Live Demo
                        </button>
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Projects;
