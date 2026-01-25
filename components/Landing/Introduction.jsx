import Section from '@/shared/Section';
import ThemeToggle from './ThemeToggle';

const Introduction = () => {
  return (
    <Section isActive={true}>
      <div className="absolute top-5 right-5 z-30">
        <ThemeToggle />
      </div>
      <div
        className={
          // 1) Layout
          // 2) Positioning
          'relative ' +
          // 3) Display & Flexbox/Grid
          'flex flex-col items-center justify-center ' +
          // 4) Spacing
          'gap-y-4 ' +
          // 5) Sizing
          'h-full w-full ' +
          // 6) Typography
          'text-center'
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
        {/* Interactive Background Placeholder */}
        <p className="text-sm opacity-60">[Particle animation background]</p>

        {/* Hero Title */}
        <h1 className="text-4xl font-bold">Aymen Ghaloua</h1>

        {/* Tagline */}
        <p className="text-xl">Building intelligent systems that turn complexity into simplicity</p>

        {/* Primary CTA Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 border rounded">Download Resume</button>
          <button className="px-4 py-2 border rounded">Contact Me</button>
          <button className="px-4 py-2 border rounded">View Work</button>
        </div>
      </div>
    </Section>
  );
};

export default Introduction;