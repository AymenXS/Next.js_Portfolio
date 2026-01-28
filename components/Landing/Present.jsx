import Section from '@/shared/Section';

const Present = () => {
  return (
    <Section
      className={
        // 1) Layout
        // 2) Positioning
        // 3) Display & Flexbox/Grid
        'flex-col ' +
        // 4) Spacing
        // 5) Sizing
        'h-full'
        // 6) Typography
        // 7) Backgrounds
        // 8) Borders
        // 9) Effects
        // 10) Transforms
        // 11) Transitions & Animations
        // 12) Interactivity
        // 13) Accessibility
        // 14) States
        // 15) Responsive
        // 16) Dark Mode
        // 17) Custom/Misc
      }
    >
      <div className="w-full max-w-[90%] mx-auto flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 1 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">Full-Stack Development</p>
            <p className="text-sm opacity-60">
              End-to-end web and mobile applications built with modern frameworks and scalable architecture
            </p>
            <p className="text-xs opacity-60 mt-2">REACT • NEXT.JS • NODE.JS • PYTHON</p>
          </div>

          {/* Card 2 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">AI/LLM Solutions</p>
            <p className="text-sm opacity-60">
              Intelligent features powered by GPT, Claude, and custom AI models to automate and enhance your applications
            </p>
            <p className="text-xs opacity-60 mt-2">OPENAI • CLAUDE • LANGCHAIN • HUGGING FACE</p>
          </div>

          {/* Card 3 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">Automation & Workflows</p>
            <p className="text-sm opacity-60">
              Streamline repetitive tasks and complex processes with smart automation that saves time and reduces errors
            </p>
            <p className="text-xs opacity-60 mt-2">ZAPIER • N8N • PYTHON SCRIPTS • APIs</p>
          </div>
        </div>

        {/* Center: 3D Sphere Placeholder */}
        <div className="flex flex-col items-center justify-center p-4 skeleton-box border rounded">
          <p className="font-bold">3D Rotating Technology Sphere</p>
          <p className="text-sm opacity-60">Visualizing my core tech stack in 3D space</p>
          <p className="text-xs opacity-40 mt-2">
            [React, Next.js, Node.js, Python, PostgreSQL, Docker, AWS, TailwindCSS, TypeScript, Redis, OpenAI API, WebGL]
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 4 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">Design & UX</p>
            <p className="text-sm opacity-60">
              Beautiful, intuitive interfaces designed with users in mind—from wireframes to polished design systems
            </p>
            <p className="text-xs opacity-60 mt-2">FIGMA • ADOBE XD • PROTOTYPING • DESIGN SYSTEMS</p>
          </div>

          {/* Card 5 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">System Architecture</p>
            <p className="text-sm opacity-60">
              Scalable, maintainable systems designed with long-term growth and performance in mind
            </p>
            <p className="text-xs opacity-60 mt-2">DISTRIBUTED SYSTEMS • MICROSERVICES • OPTIMIZATION</p>
          </div>

          {/* Card 6 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">Security & Code Quality</p>
            <p className="text-sm opacity-60">Clean, secure, maintainable code with best practices baked in from day one</p>
            <p className="text-xs opacity-60 mt-2">CODE REVIEW • REFACTORING • SECURITY • TESTING</p>
          </div>
        </div>
        <p className="text-xs opacity-60">
          Note: Detailed breakdowns for each capability (Frontend/Backend/etc.) will be added in Phase 4.
        </p>

      </div>
    </Section>
  );
};

export default Present;
