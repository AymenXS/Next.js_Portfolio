import Section from '@/shared/Section';

const Approach = () => {
  return (
    <Section
      className={
        // 1) Layout
        // 2) Positioning
        // 3) Display & Flexbox/Grid
        'flex-col ' +
        // 4) Spacing
        // 5) Sizing
        'h-full w-full'
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
      <h1 className="mt-16">My <span>approach</span></h1>
      <div
        className={
          // 1) Layout
          // 2) Positioning
          // 3) Display & Flexbox/Grid
          'flex flex-col items-center justify-center ' +
          // 4) Spacing
          'gap-4 ' +
          // 5) Sizing
          'w-full ' +
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
          'lg:flex-row'
          // 16) Dark Mode
          // 17) Custom/Misc
        }
      >
        <Card title="Planning & Strategy" />
        <Card title="Development & Progress Update" />
        <Card title="Launch & Monitoring" />
      </div>
    </Section>
  );
};

export default Approach;

const Card = ({ title }) => {
  return (
    <div
      className={
        // 1) Layout
        // 2) Positioning
        'relative ' +
        // 3) Display & Flexbox/Grid
        'flex items-center justify-center ' +
        // 4) Spacing
        'p-4 ' +
        // 5) Sizing
        'h-[30rem] max-w-sm w-full ' +
        // 6) Typography
        // 7) Backgrounds
        // 8) Borders
        'border ' +
        // 9) Effects
        // 10) Transforms
        // 11) Transitions & Animations
        // 12) Interactivity
        // 13) Accessibility
        // 14) States
        // 15) Responsive
        'mx-auto ' +
        // 16) Dark Mode
        // 17) Custom/Misc
        'skeleton-box'
      }
    >
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        <h2 className="relative z-10 mt-4 text-xl">{title}</h2>
      </div>
    </div>
  );
};
