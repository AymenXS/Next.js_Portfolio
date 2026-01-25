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
                      <p className="mt-1 text-xs opacity-70">
                        AI Integration &amp; Automation Specialist
                      </p>
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
                <span className="absolute -top-3 left-4 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  Available
                </span>
                <span className="absolute top-4 -right-3 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  Remote Worldwide
                </span>
                <span className="absolute -bottom-3 left-6 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  UTC-5 → UTC+1
                </span>
                <span className="absolute bottom-6 -left-3 px-3 py-1 text-xs border rounded-full skeleton-chip">
                  EN • FR • AR
                </span>
              </div>
            </div>
          </article>
        </aside>

        {/* RIGHT (80%) */}
        <section className="w-4/5">
          <div className="flex flex-col gap-6">
            {/* Experience 1 */}
            <article className="p-6 border rounded-2xl skeleton-box">
              <header>
                <h3 className="text-xl font-bold">Freelance Full-Stack Developer</h3>
                <p className="text-sm opacity-70">
                  Self-Employed • Remote Worldwide • Remote • Jan 2022 - Present
                </p>
              </header>

              {/* Tech Stack Concepts (hover reveals) */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Frontend
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    HTML5, CSS3, JavaScript (ES6+), React, Next.js, TailwindCSS
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Backend
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    Node.js, Express, Python, FastAPI
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Database
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    PostgreSQL, MongoDB, Redis
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  DevOps/Infra
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-72 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    Docker, AWS (S3, EC2), Vercel, GitHub Actions
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  AI/Automation
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-72 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    OpenAI API, LangChain, Zapier, n8n
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Tools
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    Git, VS Code, Figma, Postman, Linear
                  </span>
                </span>
              </div>

              {/* Responsibilities */}
              <ol className="mt-5 space-y-3 text-sm opacity-80">
                <li>
                  <span className="font-semibold">1.</span>{' '}
                  <span className="font-semibold">Architected</span> a full-stack e-commerce platform with AI-powered product recommendations →{' '}
                  <span className="font-semibold">Increased conversion rate by 35%</span>, serving{' '}
                  <span className="font-semibold">10,000+ monthly users</span>
                </li>
                <li>
                  <span className="font-semibold">2.</span>{' '}
                  <span className="font-semibold">Automated</span> invoice generation and email workflows →{' '}
                  <span className="font-semibold">Reduced manual work by 80%</span>, saving{' '}
                  <span className="font-semibold">15 hours per week</span>
                </li>
                <li>
                  <span className="font-semibold">3.</span>{' '}
                  <span className="font-semibold">Integrated</span> OpenAI-powered search and chatbot functionality →{' '}
                  <span className="font-semibold">Improved user engagement by 40%</span>, processing{' '}
                  <span className="font-semibold">500+ queries daily</span>
                </li>
                <li>
                  <span className="font-semibold">4.</span>{' '}
                  <span className="font-semibold">Optimized</span> database queries and implemented Redis caching →{' '}
                  <span className="font-semibold">Decreased page load time by 60%</span> (from 3.0s to 1.2s)
                </li>
                <li>
                  <span className="font-semibold">5.</span>{' '}
                  <span className="font-semibold">Designed and implemented</span> real-time notification system using WebSockets →{' '}
                  <span className="font-semibold">Enabled instant updates</span> for{' '}
                  <span className="font-semibold">5,000+ concurrent users</span>
                </li>
              </ol>
            </article>

            {/* Experience 2 */}
            <article className="p-6 border rounded-2xl skeleton-box">
              <header>
                <h3 className="text-xl font-bold">Web Developer Intern</h3>
                <p className="text-sm opacity-70">
                  Digital Agency XYZ • Casablanca, Morocco • Hybrid • Jun 2021 - Dec 2021
                </p>
              </header>

              {/* Tech Stack Concepts (hover reveals) */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Frontend
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    HTML, CSS, JavaScript, jQuery, Bootstrap
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Backend
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-56 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    PHP, Laravel
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Database
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-56 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    MySQL
                  </span>
                </span>

                <span className="relative group px-3 py-1 text-xs border rounded-full skeleton-chip cursor-default">
                  Tools
                  <span className="absolute left-0 top-full mt-2 hidden group-hover:block w-64 p-3 text-xs border rounded-xl bg-bg skeleton-box">
                    Git, WordPress, Adobe XD
                  </span>
                </span>
              </div>

              {/* Responsibilities */}
              <ol className="mt-5 space-y-3 text-sm opacity-80">
                <li>
                  <span className="font-semibold">1.</span>{' '}
                  <span className="font-semibold">Developed</span> 5+ client websites using WordPress and custom themes →{' '}
                  <span className="font-semibold">Delivered on time</span> with{' '}
                  <span className="font-semibold">100% client approval rate</span>
                </li>
                <li>
                  <span className="font-semibold">2.</span>{' '}
                  <span className="font-semibold">Collaborated</span> with design team to implement responsive layouts →{' '}
                  <span className="font-semibold">Ensured mobile-first design</span> across all projects
                </li>
                <li>
                  <span className="font-semibold">3.</span>{' '}
                  <span className="font-semibold">Maintained</span> and updated existing client sites →{' '}
                  <span className="font-semibold">Resolved 50+ bug tickets</span> with average{' '}
                  <span className="font-semibold">24h turnaround</span>
                </li>
              </ol>
            </article>
          </div>
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
                    <span className="font-semibold">Specialization:</span> AI-Powered Web Solutions
                  </p>
                  <p>
                    <span className="font-semibold">Experience:</span> 3+ Years
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> Remote Worldwide
                  </p>
                  <p>
                    <span className="font-semibold">Availability:</span> Available for new projects starting February 2025
                  </p>
                </div>
              </div>

              {/* Bento 2 */}
              <div className="p-4 border rounded-xl skeleton-box">
                <p className="text-sm font-bold">Personality &amp; Culture Fit</p>
                <div className="mt-3 text-xs opacity-80 space-y-2">
                  <p>
                    <span className="font-semibold">Work Style:</span> Async-first, highly autonomous, self-managed
                  </p>
                  <p>
                    <span className="font-semibold">Communication:</span> Clear documentation, proactive daily updates, transparent progress tracking
                  </p>
                  <p>
                    <span className="font-semibold">Time Zone Flex:</span> Flexible across EU/US time zones (UTC-5 to UTC+1)
                  </p>
                  <p>
                    <span className="font-semibold">Languages:</span> English (Fluent), French (Native), Arabic (Native)
                  </p>
                  <div>
                    <p className="font-semibold">Values:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>Transparency and honest communication</li>
                      <li>Quality over speed, but deliver on time</li>
                      <li>Continuous learning and skill refinement</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bento 3 */}
              <div className="p-4 border rounded-xl skeleton-box">
                <p className="text-sm font-bold">Quick Wins</p>
                <div className="mt-3 text-xs opacity-80 space-y-2">
                  <div>
                    <p className="font-semibold">Certifications/Education:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>B.Sc. Computer Science (In Progress)</li>
                      <li>freeCodeCamp Full-Stack Certification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Notable Achievements:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>Built custom JS animation library with 200+ GitHub stars</li>
                      <li>Automated 5+ business workflows saving 100+ hours/month</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Published Content:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>3 technical articles on dev.to</li>
                      <li>Portfolio case study on Medium</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Open Source:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>Contributor to Next.js documentation</li>
                      <li>Maintained 2 open-source UI component libraries</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Side Projects:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>JS Animation Library — 200+ GitHub stars, 50+ weekly downloads</li>
                      <li>AI-powered task automation tool for freelancers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bento 4 */}
              <div className="p-4 border rounded-xl skeleton-box">
                <p className="text-sm font-bold">Value Proposition &amp; Proof</p>
                <div className="mt-3 text-xs opacity-80 space-y-2">
                  <p>
                    <span className="font-semibold">Different:</span> I don't just code — I architect systems that solve real business problems with AI-driven automation and clean UX
                  </p>
                  <div>
                    <p className="font-semibold">Problems You Solve:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>Slow, manual workflows → Automated, scalable systems</li>
                      <li>Confusing user experiences → Intuitive, conversion-focused interfaces</li>
                      <li>Disconnected tools → Integrated, AI-enhanced platforms</li>
                    </ul>
                  </div>
                  <p>
                    <span className="font-semibold">Who You Serve:</span> SMBs and startups needing scalable, modern tech without enterprise-level costs or complexity
                  </p>
                  <p>
                    <span className="font-semibold">Global Clients:</span> Worked with clients across 8 countries (US, UK, France, Germany, Morocco, UAE, Canada, Australia)
                  </p>
                  <p>
                    <span className="font-semibold">Project Diversity:</span> E-commerce platforms, SaaS dashboards, portfolio sites, automation tools, AI integrations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
