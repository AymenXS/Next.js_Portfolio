import Section from '@/shared/Section';

const Approach = () => {
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
        'text-center ' +
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
      <div className="w-full max-w-5xl">
        <h1 className="mb-6">Work Philosophy &amp; Approach</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <StepCard
            step="Step 1"
            title="Technical excellence"
            description="TODO: Add small description for this step"
          />
          <StepCard
            step="Step 2"
            title="Strategic thinking"
            description="TODO: Add small description for this step"
          />
          <StepCard
            step="Step 3"
            title="User-focused approach"
            description="TODO: Add small description for this step"
          />
        </div>

        {/* Label / concept for animated element + hover-to-reveal step (no behavior implemented here) */}
        <div className="mt-6 border rounded-md p-4 skeleton-box text-left">
          <div className="text-sm font-medium">Implementation Note (Skeleton Label)</div>
          <div className="mt-2 text-sm opacity-90">
            Animated element will be added (from reference image). On hover it reveals the step; on click it shows more details.
            This file only keeps the label/concept—no interaction implemented in Phase 1.
          </div>
        </div>

        <div className="mt-6 border rounded-md p-4 skeleton-box text-left">
          <div className="text-sm font-medium">Future Implementation Notes</div>
          <div className="mt-2 text-sm opacity-90">
            Detailed philosophy content and principles to be added
          </div>
          <div className="mt-3 text-xs opacity-75">
            Mobile responsive layout will be implemented after desktop skeleton is complete
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Approach;

const StepCard = ({ step, title, description }) => {
  return (
    <div className="border rounded-md p-4 skeleton-box text-left">
      <div className="text-xs opacity-75">{step}</div>
      <div className="mt-2 text-lg font-medium">{title}</div>
      <div className="mt-1 text-sm opacity-90">{description}</div>
    </div>
  );
};
