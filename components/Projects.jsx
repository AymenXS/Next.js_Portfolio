'use client';

import { useState } from 'react';

/**
 * DATA (Filled from INFO DEPTH)
 * Keep the existing component behavior (carousel + modal + hover concept/tech).
 */
const projects = [
  {
    id: 1,
    category: 'E-COMMERCE PLATFORM',
    title: 'SwiftCart',
    thumbnail: 'project-swiftcart-thumbnail.png',
    miniDescription:
      'A modern e-commerce platform featuring AI-powered product recommendations, real-time inventory management, and seamless checkout experience. Built to handle 10,000+ concurrent users with 99.9% uptime. Featuring:',
    keyFeatures: [
      'AI-powered product recommendations',
      'Real-time inventory sync',
      'One-click checkout with Stripe',
      'Advanced product filtering',
    ],
    // Concept → tech on hover (matches your existing hover pill logic)
    techStack: [
      { concept: 'Framework', tech: 'Next.js 14, React 18' },
      { concept: 'Styling', tech: 'TailwindCSS, Framer Motion' },
      { concept: 'Backend', tech: 'Node.js, Express, REST API' },
      { concept: 'Database', tech: 'PostgreSQL, Redis (caching)' },
      { concept: 'Payment', tech: 'Stripe API' },
      { concept: 'Deployment', tech: 'Vercel, AWS S3' },
    ],

    // Modal-specific
    modalTitle: 'SwiftCart - AI-Powered E-Commerce Platform',
    modalMiniDescription:
      'A scalable e-commerce solution serving 10,000+ monthly users with AI-driven personalization.',
    liveDemoUrl: '#',

    // Modal sections
    problem:
      'Small businesses struggle with managing online inventory across multiple sales channels, leading to overselling and poor customer experience. Traditional e-commerce platforms are either too expensive or lack real-time sync capabilities.',
    answer:
      'SwiftCart provides real-time inventory management with automatic syncing across all sales channels, AI-powered stock predictions to prevent overselling, and a user-friendly admin dashboard. The platform scales affordably from startups to mid-size businesses.',
    visualDesign: [
      'Modern minimalist design with generous whitespace',
      'Smooth page transitions (Framer Motion)',
      'Intuitive product filtering with instant feedback',
      'Mobile-first responsive layout',
      '3D product viewer (WebGL) for richer browsing',
      'One-click checkout to reduce abandonment',
    ],
    architecture: [
      'Microservices architecture (products, orders, payments, inventory)',
      'RESTful API design with versioning/documentation',
      'Redis caching layer to reduce DB load and improve response time',
      'PostgreSQL with indexing for fast product search',
      'Stripe integration with webhook handling',
      'Real-time inventory sync via WebSockets',
    ],
    standoutSections: [
      'AI product recommendations',
      'Abandoned cart recovery emails',
      'Admin analytics dashboard',
    ],
    metrics: { performance: 95, accessibility: 98, bestPractices: 92, seo: 100 },
    extraMetrics: {
      pageLoadTime: '1.2s (average)',
      conversionRate: '+35% improvement',
    },
  },

  {
    id: 2,
    category: 'AI/LLM SOLUTION',
    title: 'BotForge',
    thumbnail: 'project-botforge-thumbnail.png',
    miniDescription:
      'A no-code platform for building custom AI chatbots powered by GPT-4 and Claude. Businesses can create, train, and deploy conversational AI without writing code. Featuring:',
    keyFeatures: [
      'Drag-and-drop chatbot builder',
      'Multi-LLM support (GPT-4, Claude)',
      'Custom knowledge base training',
      'Analytics dashboard',
    ],
    techStack: [
      { concept: 'Framework', tech: 'Next.js 14, TypeScript' },
      { concept: 'AI/LLM', tech: 'OpenAI API, Claude API, LangChain' },
      { concept: 'Backend', tech: 'Python, FastAPI, Celery (async tasks)' },
      { concept: 'Database', tech: 'MongoDB, Pinecone (vector DB)' },
      { concept: 'Deployment', tech: 'Docker, AWS ECS, CloudFront' },
    ],

    modalTitle: 'BotForge - No-Code AI Chatbot Platform',
    modalMiniDescription:
      'A no-code interface to create, train, and deploy business chatbots in minutes, with multi-model support and scalable RAG.',
    liveDemoUrl: '#',

    problem:
      'Businesses need custom AI chatbots but lack technical expertise and find existing solutions too expensive or inflexible.',
    answer:
      'BotForge provides a no-code interface where users build conversation flows, connect data sources, and deploy chatbots quickly. It supports multiple AI models and scales automatically.',
    visualDesign: [
      'Drag-and-drop flow builder UI',
      'Real-time chat preview',
      'Dark/Light mode support',
      'Responsive analytics dashboard',
      'Clean component hierarchy for complex screens',
      'Fast navigation across builder steps',
    ],
    architecture: [
      'Microservices with FastAPI',
      'Async task processing with Celery',
      'Vector embeddings for semantic search',
      'RAG (Retrieval-Augmented Generation) pipeline',
      'Rate limiting + caching for cost control',
      'Observability: logs/metrics for quality monitoring',
    ],
    standoutSections: [
      'Multi-LLM routing (GPT-4 / Claude)',
      'Knowledge base ingestion + chunking',
      'Conversation analytics + feedback loops',
    ],
    metrics: { performance: 90, accessibility: 96, bestPractices: 93, seo: 98 },
    extraMetrics: {
      pageLoadTime: '1.5s (average)',
      deployments: '500+ chatbots deployed',
    },
  },

  {
    id: 3,
    category: 'AUTOMATION TOOL',
    title: 'FlowMate',
    thumbnail: 'project-flowmate-thumbnail.png',
    miniDescription:
      'Workflow automation platform connecting 100+ apps without code. Automate repetitive tasks, sync data across platforms, and save 15+ hours per week. Featuring:',
    keyFeatures: [
      'Visual workflow builder',
      '100+ app integrations',
      'Scheduled triggers',
      'Error handling & retry logic',
    ],
    techStack: [
      { concept: 'Framework', tech: 'React, Next.js' },
      { concept: 'Backend', tech: 'Node.js, Express, Bull (job queue)' },
      { concept: 'Database', tech: 'MongoDB, Redis' },
      { concept: 'Integrations', tech: 'Zapier API, REST APIs, Webhooks' },
      { concept: 'Deployment', tech: 'Vercel, Railway' },
    ],

    modalTitle: 'FlowMate - Workflow Automation Platform',
    modalMiniDescription:
      'A visual automation builder that connects tools, schedules jobs, and handles retries so teams save hours every week.',
    liveDemoUrl: '#',

    problem:
      'Teams waste time on repetitive tasks and manual data syncing across tools, causing delays, errors, and inconsistent records.',
    answer:
      'FlowMate centralizes automation in one visual builder, adds durable job processing and retries, and connects dozens of integrations through APIs and webhooks.',
    visualDesign: [
      'Node-based visual workflow builder',
      'Clear states for success/failure',
      'Readable logs and execution history',
      'Simple templates for common workflows',
      'Responsive layout for daily use',
      'Minimal friction for creating automations',
    ],
    architecture: [
      'Durable job queue (Bull) for scheduled + async tasks',
      'Retry logic + dead-letter handling for failures',
      'Webhook-based triggers for real-time events',
      'Redis for queues/caching; MongoDB for config + history',
      'Secure credential storage patterns (placeholder)',
      'Extensible integration adapters layer',
    ],
    standoutSections: [
      'Error handling + retry pipeline',
      'Reusable integration templates',
      'Execution logs + debugging view',
    ],
    metrics: { performance: 92, accessibility: 97, bestPractices: 91, seo: 97 },
    extraMetrics: {
      timeSaved: '15+ hours/week (typical team)',
      integrations: '100+ apps',
    },
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
          <p className="mt-2 text-sm opacity-70">
            Explore my recent work and case studies
          </p>
        </header>

        {/* Carousel Section (relative so modal overlay covers ONLY this section) */}
        <section className="relative mt-10 border rounded-2xl skeleton-box p-8">
          {/* Layout: Left 40 / Right 60 */}
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
                  {currentProject.thumbnail} (16:9) — click to open modal
                </div>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
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
              <span className="ml-2 text-xs opacity-70">
                {currentIndex + 1} of {projects.length}
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

          {/* VIEW ALL PROJECTS Button */}
          <div className="mt-10 flex justify-center">
            <a
              href="/projects"
              className="px-6 py-3 border rounded-xl skeleton-box"
            >
              VIEW ALL PROJECTS
            </a>
          </div>

          {/* Project Modal (covers ONLY this Projects section) */}
          {isModalOpen && (
            <div className="absolute inset-0 z-50">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

              {/* Panel */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1200px,85vw)] border rounded-2xl bg-bg skeleton-box">
                <div className="max-h-[70vh] overflow-y-auto p-6">
                  {/* Modal Header */}
                  <header className="relative">
                    <button
                      type="button"
                      className="absolute right-0 top-0 px-3 py-1 border rounded-lg"
                      onClick={closeModal}
                    >
                      Close
                    </button>

                    {/* Tech Stack Pills (top row) — concept→tech hover preserved */}
                    <div className="text-xs opacity-80">
                      <span className="font-semibold">TECH STACK</span>
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
                        <h3 className="text-3xl font-extrabold">
                          {currentProject.modalTitle || currentProject.title}
                        </h3>
                        <p className="mt-2 text-sm opacity-80 max-w-2xl">
                          {currentProject.modalMiniDescription || currentProject.miniDescription}
                        </p>
                      </div>

                      <a
                        href={currentProject.liveDemoUrl || '#'}
                        className="px-4 py-2 border rounded-xl"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Live Demo →
                      </a>
                    </div>
                  </header>

                  {/* Modal Content */}
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
                      <h4 className="font-bold">Project Metrics</h4>

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

                      {/* Extra metrics from INFO DEPTH */}
                      {currentProject.extraMetrics ? (
                        <div className="mt-4 border rounded-xl skeleton-box p-4 text-sm opacity-85">
                          {Object.entries(currentProject.extraMetrics).map(([k, v]) => (
                            <p key={k}>
                              <span className="font-semibold">
                                {k === 'pageLoadTime'
                                  ? 'Page Load Time'
                                  : k === 'conversionRate'
                                    ? 'Conversion Rate'
                                    : k === 'deployments'
                                      ? 'Deployments'
                                      : k === 'timeSaved'
                                        ? 'Time Saved'
                                        : k === 'integrations'
                                          ? 'Integrations'
                                          : k}
                                :
                              </span>{' '}
                              {v}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </section>

                    {/* Bottom CTA */}
                    <footer className="pt-2 pb-2">
                      <div className="flex justify-center">
                        <a
                          href={currentProject.liveDemoUrl || '#'}
                          className="px-8 py-3 border rounded-xl"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Live Demo →
                        </a>
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
