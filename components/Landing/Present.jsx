import Section from '@/shared/Section';

const capabilities = [
  { id: 1, title: 'Full Stack', description: 'End-to-end development', icon: '[🔧]' },
  { id: 2, title: 'AI/LLM Integration', description: 'AI-powered solutions', icon: '[🤖]' },
  { id: 3, title: 'Automation', description: 'Process automation', icon: '[⚡]' },
  { id: 4, title: 'Design', description: 'User-focused design', icon: '[🎨]' },
  { id: 5, title: 'System Thinking', description: 'Holistic approach', icon: '[🧠]' },
  { id: 6, title: 'API Development', description: 'Robust APIs', icon: '[🔌]' },
];

const Present = () => {
  return (
    <Section
      className={
        // 1) Layout
        // 2) Positioning
        'flex-col ' +
        // 3) Display & Flexbox/Grid
        'flex items-center justify-center ' +
        // 4) Spacing
        'px-6 py-10 ' +
        // 5) Sizing
        'h-full w-full ' +
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
        'md:px-10 ' +
        // 16) Dark Mode
        // 17) Custom/Misc
        'skeleton-section'
      }
    >
      <div className="w-full max-w-6xl">
        <h1 className="mb-6 text-center">Present Capabilities</h1>

        {/* Bento Grid */}
        <div
          className={
            // 1) Layout
            // 2) Positioning
            // 3) Display & Flexbox/Grid
            'grid ' +
            // 4) Spacing
            'gap-4 ' +
            // 5) Sizing
            'w-full h-[70vh] ' +
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
            'grid-cols-6 grid-rows-6 ' +
            // 16) Dark Mode
            // 17) Custom/Misc
            ''
          }
        >
          {/* Center Sphere Placeholder (3x3) */}
          <div
            className={
              // 1) Layout
              // 2) Positioning
              'relative ' +
              // 3) Display & Flexbox/Grid
              'flex flex-col items-center justify-center ' +
              // 4) Spacing
              'p-6 ' +
              // 5) Sizing
              'col-start-3 col-span-2 row-start-3 row-span-2 ' +
              // 6) Typography
              'text-center ' +
              // 7) Backgrounds
              // 8) Borders
              'border rounded-md ' +
              // 9) Effects
              // 10) Transforms
              // 11) Transitions & Animations
              // 12) Interactivity
              // 13) Accessibility
              // 14) States
              // 15) Responsive
              'md:col-start-3 md:col-span-2 md:row-start-3 md:row-span-2 ' +
              // 16) Dark Mode
              // 17) Custom/Misc
              'skeleton-box'
            }
          >
            <div className="text-base font-medium">3D Sphere</div>
            <div className="mt-2 text-sm opacity-90">Rotating technologies visualization</div>
            <div className="mt-2 text-xs opacity-75">TODO: Add Three.js/WebGL rotating tech sphere</div>
          </div>

          {/* Capability Cards (placed around center) */}
          <BentoCard
            item={capabilities[0]}
            className="col-start-1 col-span-2 row-start-1 row-span-2"
          />
          <BentoCard
            item={capabilities[1]}
            className="col-start-5 col-span-2 row-start-1 row-span-2"
          />
          <BentoCard
            item={capabilities[2]}
            className="col-start-1 col-span-2 row-start-3 row-span-2"
          />
          <BentoCard
            item={capabilities[3]}
            className="col-start-5 col-span-2 row-start-3 row-span-2"
          />
          <BentoCard
            item={capabilities[4]}
            className="col-start-2 col-span-2 row-start-5 row-span-2"
          />
          <BentoCard
            item={capabilities[5]}
            className="col-start-4 col-span-2 row-start-5 row-span-2"
          />
        </div>

        {/* Future notes */}
        <div className="mt-6 border rounded-md p-4 skeleton-box">
          <div className="text-sm font-medium">Future Implementation Notes</div>
          <div className="mt-2 text-sm opacity-90">
            3D Sphere: WebGL rotating technology stack visualization
          </div>
          <div className="mt-3 text-xs opacity-75">
            Mobile responsive layout will be implemented after desktop skeleton is complete
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Present;

const BentoCard = ({ item, className }) => {
  return (
    <div
      className={
        // 1) Layout
        // 2) Positioning
        'relative ' +
        // 3) Display & Flexbox/Grid
        'flex flex-col ' +
        // 4) Spacing
        'p-4 ' +
        // 5) Sizing
        'w-full h-full ' +
        // 6) Typography
        // 7) Backgrounds
        // 8) Borders
        'border rounded-md ' +
        // 9) Effects
        // 10) Transforms
        // 11) Transitions & Animations
        // 12) Interactivity
        // 13) Accessibility
        // 14) States
        // 15) Responsive
        // 16) Dark Mode
        // 17) Custom/Misc
        `skeleton-box ${className}`
      }
    >
      <div className="text-sm opacity-80">{item.icon} Icon placeholder</div>
      <div className="mt-2 text-lg font-medium">{item.title}</div>
      <div className="mt-1 text-sm opacity-90">{item.description}</div>
    </div>
  );
};
