import Section from '@/shared/Section';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
// import { gridItems } from '@/data';

const BentoGridRight = () => {
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
      <BentoGrid className="max-w-full">
        <BentoGridItem
          key={1}
          id={1}
          title="Current Exploration"
          description="Latest projects and learning."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={2}
          id={2}
          title="Latest Skill"
          description="Recently mastered technology."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={3}
          id={3}
          title="System Thinking"
          description="My direction heading."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={4}
          id={4}
          title="Time Zone Flexible"
          description="Available across time zones."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p>In the middle 3D Globe (for now)</p>
        <BentoGridItem
          key={5}
          id={5}
          title="3+ Years Experience"
          description="Professional development experience."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={6}
          id={6}
          title="X Projects Delivered"
          description="Successful project completions."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={7}
          id={7}
          title="Y Technologies Mastered"
          description="Technologies in my toolkit."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
      </BentoGrid>
    </Section>
  );
};

export default BentoGridRight;
