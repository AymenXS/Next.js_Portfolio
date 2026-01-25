import Section from '@/shared/Section';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';

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
      <BentoGrid className="max-w-[90%]">
        {/* Card 1: Full-Stack Development */}
        <BentoGridItem
          key={1}
          id={1}
          title="Full-Stack Development"
          description="End-to-end web and mobile applications built with modern frameworks and scalable architecture"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">REACT • NEXT.JS • NODE.JS • PYTHON</p>

        {/* Card 2: AI/LLM Solutions */}
        <BentoGridItem
          key={2}
          id={2}
          title="AI/LLM Solutions"
          description="Intelligent features powered by GPT, Claude, and custom AI models to automate and enhance your applications"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">OPENAI • CLAUDE • LANGCHAIN • HUGGING FACE</p>

        {/* Card 3: Automation & Workflows */}
        <BentoGridItem
          key={3}
          id={3}
          title="Automation & Workflows"
          description="Streamline repetitive tasks and complex processes with smart automation that saves time and reduces errors"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">ZAPIER • N8N • PYTHON SCRIPTS • APIs</p>

        {/* Center: 3D Sphere Placeholder */}
        <div className="flex flex-col items-center justify-center p-4 skeleton-box">
          <p className="font-bold">3D Rotating Technology Sphere</p>
          <p className="text-sm opacity-60">Visualizing my core tech stack in 3D space</p>
          <p className="text-xs opacity-40 mt-2">[React, Next.js, Node.js, Python, PostgreSQL, Docker, AWS, TailwindCSS, TypeScript, Redis, OpenAI API, WebGL]</p>
        </div>

        {/* Card 4: Design & UX */}
        <BentoGridItem
          key={4}
          id={4}
          title="Design & UX"
          description="Beautiful, intuitive interfaces designed with users in mind—from wireframes to polished design systems"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">FIGMA • ADOBE XD • PROTOTYPING • DESIGN SYSTEMS</p>

        {/* Card 5: System Architecture */}
        <BentoGridItem
          key={5}
          id={5}
          title="System Architecture"
          description="Scalable, maintainable systems designed with long-term growth and performance in mind"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">DISTRIBUTED SYSTEMS • MICROSERVICES • OPTIMIZATION</p>

        {/* Card 6: Code Quality & Security */}
        <BentoGridItem
          key={6}
          id={6}
          title="Code Quality & Security"
          description="Clean, secure, maintainable code with best practices baked in from day one"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">CODE REVIEW • REFACTORING • SECURITY • TESTING</p>
      </BentoGrid>
    </Section>
  );
};

export default Present;