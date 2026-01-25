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
      <h1 className="mt-16">Work <span>Approach</span></h1>
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
        <Card
          icon="[🧩]"
          title="Systems-First Thinking"
          description="I don't just write code—I understand the full picture and process first. Every project starts with mapping out user needs, business goals, technical constraints, and how all the pieces fit together. This ensures solutions that actually solve the right problems."
        />
        <Card
          icon="[🤖]"
          title="AI-Augmented Development"
          description="Leveraging AI tools and APIs to accelerate development, automate repetitive tasks, and build intelligent features that adapt to users. AI isn't just a feature—it's integrated into my entire workflow to deliver faster, smarter solutions."
        />
        <Card
          icon="[👥]"
          title="User-Centric Design"
          description="Technology serves people, not the other way around. I build interfaces and experiences that users actually enjoy—intuitive, accessible, and designed with real human behavior in mind. Every design decision is validated against user needs."
        />
      </div>
    </Section>
  );
};

export default Approach;

const Card = ({ icon, title, description }) => {
  return (
    <div
      className={
        // 1) Layout
        // 2) Positioning
        'relative ' +
        // 3) Display & Flexbox/Grid
        'flex items-center justify-center ' +
        // 4) Spacing
        'mx-auto p-4 ' +
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
        // 16) Dark Mode
        // 17) Custom/Misc
        'skeleton-box'
      }
    >
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        {/* Icon Placeholder */}
        <p className="text-2xl">{icon}</p>

        {/* Title */}
        <h2 className="relative z-10 mt-4 text-xl font-bold">{title}</h2>

        {/* Description */}
        <p className="mt-2 text-sm text-center opacity-80">{description}</p>
      </div>
    </div>
  );
};