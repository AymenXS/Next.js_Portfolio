import Section from '@/shared/Section';

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
      <div className="w-full max-w-[90%] mx-auto flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 1 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">Current Exploration</p>
            <p className="text-sm opacity-60">
              Diving deep into System Design patterns—learning distributed systems, microservices architecture, and scalable
              infrastructure design
            </p>
            <p className="text-xs opacity-60 mt-2">[🔍]</p>
          </div>

          {/* Card 2 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">Latest Skill</p>
            <p className="text-sm opacity-60">
              Recently mastered WebGL and 3D web experiences—bringing interactive 3D graphics and immersive visual experiences
              to the web
            </p>
            <p className="text-xs opacity-60 mt-2">[✨]</p>
          </div>

          {/* Card 3 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="font-bold">Future Direction</p>
            <p className="text-sm opacity-60">
              Heading towards systems engineering combined with AI-augmented development workflows—building intelligent,
              scalable systems that leverage AI at their core
            </p>
            <p className="text-xs opacity-60 mt-2">[🎯]</p>
          </div>
        </div>

        {/* Center: 3D Globe Placeholder */}
        <div className="flex flex-col items-center justify-center p-4 skeleton-box border rounded">
          <p className="font-bold">3D Rotating Globe with Time Zones</p>
          <p className="text-sm opacity-60">Working flexibly across global time zones</p>
          <p className="text-xs opacity-40 mt-2">[UTC-5 to UTC+1 coverage]</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Card 4 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="text-2xl font-bold">4+</p>
            <p className="text-sm opacity-60">Years Experience</p>
            <p className="text-xs opacity-60 mt-2">[📅]</p>
          </div>

          {/* Card 5 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="text-2xl font-bold">15+</p>
            <p className="text-sm opacity-60">Projects Delivered</p>
            <p className="text-xs opacity-60 mt-2">[🚀]</p>
          </div>

          {/* Card 6 */}
          <div className="p-4 border rounded skeleton-box">
            <p className="text-2xl font-bold">TBD</p>
            <p className="text-sm opacity-60">Technologies Mastered (until I calculate it)</p>
            <p className="text-xs opacity-60 mt-2">[🛠️]</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Future;
