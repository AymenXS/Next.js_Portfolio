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
          'gap-y-3 ' +
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
        <p>*Don't want much in the beginning to not prevent the interactive background from being overwhelmed; beginning of the refreshing feeling driven experience*</p>
        <p>- Interactive Background</p>
        <p>- Title + Tagline Something with AI</p>
        <p>- Primary CTA button: Resume DL, Contact, Checking</p>

        <hr className="w-full my-4" />
      </div>
    </Section>
  );
};
export default Introduction;
