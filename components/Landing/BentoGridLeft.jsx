import Section from '@/shared/Section';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
// import { gridItems } from '@/data';

const BentoGridLeft = () => {
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
        <BentoGridItem
          key={1}
          id={1}
          title="Web Development"
          description="Modern, scalable web apps."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={2}
          id={2}
          title="Full Stack"
          description="Front-end & Back-end synergy."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={3}
          id={3}
          title="AI / LLM Solutions"
          description="Integrations & custom AI flows."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={4}
          id={4}
          title="Automation"
          description="Workflow and process automation."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p>In the middle 3D Sphere with rotating technologies</p>
        <BentoGridItem
          key={5}
          id={5}
          title="Design"
          description="UI/UX, interaction, visuals."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={6}
          id={6}
          title="System Thinking"
          description="Big-picture, holistic perspective."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <BentoGridItem
          key={7}
          id={7}
          title="APIs"
          description="REST, GraphQL, integrations."
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
      </BentoGrid>
    </Section>
  );
};

export default BentoGridLeft;


