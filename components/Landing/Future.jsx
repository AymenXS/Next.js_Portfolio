import Section from '@/shared/Section';

const direction = [
  { id: 1, type: 'exploration', title: 'Current Exploration', content: 'Exploring [topic]' },
  { id: 2, type: 'skill', title: 'Latest Skill', content: 'Recently mastered [skill]' },
  { id: 3, type: 'direction', title: 'Future Direction', content: 'Heading towards [direction placeholder - System Thinking]' },
  { id: 4, type: 'metric', value: '3+', label: 'Years Experience' },
  { id: 5, type: 'metric', value: 'X', label: 'Projects Delivered' },
  { id: 6, type: 'metric', value: 'Y', label: 'Technologies Mastered' },
];

const Future = () => {
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
        <h1 className="mb-6 text-center">Future Direction</h1>

        {/* Bento Grid */}
        <div className="grid grid-cols-6 grid-rows-6 gap-4 w-full h-[70vh]">
          {/* Center Globe Placeholder */}
          <div className="col-start-3 col-span-2 row-start-3 row-span-2 border rounded-md p-6 text-center skeleton-box flex flex-col items-center justify-center">
            <div className="text-base font-medium">3D Globe</div>
            <div className="mt-2 text-sm opacity-90">Time Zone Flexible visualization</div>
            <div className="mt-2 text-xs opacity-75">
              TODO: Add Three.js/WebGL rotating globe with time zones
            </div>
          </div>

          {/* Content Cards */}
          <InfoCard title={direction[0].title} content={direction[0].content} className="col-start-1 col-span-3 row-start-1 row-span-2" />
          <InfoCard title={direction[1].title} content={direction[1].content} className="col-start-4 col-span-3 row-start-1 row-span-2" />
          <InfoCard title={direction[2].title} content={direction[2].content} className="col-start-1 col-span-3 row-start-5 row-span-2" />

          {/* Metric Cards */}
          <MetricCard value={direction[3].value} label={direction[3].label} className="col-start-5 col-span-2 row-start-5 row-span-1" />
          <MetricCard value={direction[4].value} label={direction[4].label} className="col-start-5 col-span-2 row-start-6 row-span-1" />
          <MetricCard value={direction[5].value} label={direction[5].label} className="col-start-4 col-span-2 row-start-5 row-span-2" />
        </div>

        {/* Future notes */}
        <div className="mt-6 border rounded-md p-4 skeleton-box">
          <div className="text-sm font-medium">Future Implementation Notes</div>
          <div className="mt-2 text-sm opacity-90">
            3D Globe: Interactive time zone display with rotation
          </div>
          <div className="mt-3 text-xs opacity-75">
            Mobile responsive layout will be implemented after desktop skeleton is complete
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Future;

const InfoCard = ({ title, content, className }) => {
  return (
    <div className={`border rounded-md p-4 skeleton-box ${className}`}>
      <div className="text-sm opacity-80">[Icon placeholder]</div>
      <div className="mt-2 text-lg font-medium">{title}</div>
      <div className="mt-1 text-sm opacity-90">{content}</div>
    </div>
  );
};

const MetricCard = ({ value, label, className }) => {
  return (
    <div className={`border rounded-md p-4 skeleton-box ${className}`}>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-sm opacity-90">{label}</div>
    </div>
  );
};
