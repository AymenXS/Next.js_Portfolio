import Section from '@/shared/Section';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';

const Future = () => {
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
        {/* Card 1: Current Exploration */}
        <BentoGridItem
          key={1}
          id={1}
          title="Current Exploration"
          description="Diving deep into System Design patterns—learning distributed systems, microservices architecture, and scalable infrastructure design"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">[🔍]</p>

        {/* Card 2: Latest Skill */}
        <BentoGridItem
          key={2}
          id={2}
          title="Latest Skill"
          description="Recently mastered WebGL and 3D web experiences—bringing interactive 3D graphics and immersive visual experiences to the web"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">[✨]</p>

        {/* Card 3: Future Direction */}
        <BentoGridItem
          key={3}
          id={3}
          title="Future Direction"
          description="Heading towards systems engineering combined with AI-augmented development workflows—building intelligent, scalable systems that leverage AI at their core"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">[🎯]</p>

        {/* Center: 3D Globe Placeholder */}
        <div className="flex flex-col items-center justify-center p-4 skeleton-box">
          <p className="font-bold">3D Rotating Globe with Time Zones</p>
          <p className="text-sm opacity-60">Working flexibly across global time zones</p>
          <p className="text-xs opacity-40 mt-2">[UTC-5 to UTC+1 coverage]</p>
        </div>

        {/* Card 4: Years Experience (Metric) */}
        <BentoGridItem
          key={4}
          id={4}
          title="4+"
          description="Years Experience"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">[📅]</p>

        {/* Card 5: Projects Delivered (Metric) */}
        <BentoGridItem
          key={5}
          id={5}
          title="15+"
          description="Projects Delivered"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">[🚀]</p>

        {/* Card 6: Technologies Mastered (Metric) */}
        <BentoGridItem
          key={6}
          id={6}
          title="TBD"
          description="Technologies Mastered (until I calculate it)"
          className=""
          titleClassName="justify-end"
          spareImg={''}
        />
        <p className="text-xs opacity-60">[🛠️]</p>
      </BentoGrid>
    </Section>
  );
};

export default Future;