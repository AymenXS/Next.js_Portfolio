import Introduction from './Introduction';
import BentoGridLeft from './BentoGridLeft';
import BentoGridRight from './BentoGridRight';
import Approach from './Approach';
import Technologies from './Technologies';

const Landing = () => {
  return (
    <div
      className={
        // 1) Layout
        // 2) Positioning
        // 3) Display & Flexbox/Grid
        // 4) Spacing
        // 5) Sizing
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
        'skeleton-section'
      }
    >
      <Introduction />
      <BentoGridLeft />
      <BentoGridRight />
      <Approach />
      {/* <Technologies /> */}
    </div>
  );
};

export default Landing;
