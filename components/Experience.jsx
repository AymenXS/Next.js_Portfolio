import { workExperience } from '@/data';

const Experience = () => {
  return (
    <div
      className={
        // 1) Layout
        'overflow-y-auto ' +
        // 2) Positioning
        // 3) Display & Flexbox/Grid
        // 4) Spacing
        'p-8 ' +
        // 5) Sizing
        'w-full h-screen ' +
        // 6) Typography
        'text-text ' +
        // 7) Backgrounds
        'bg-bg ' +
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
      <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
      {workExperience.map((exp) => (
        <div key={exp.id} className="mb-8 bg-card-bg p-6 rounded-lg skeleton-box">
          <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
          <p className="text-primary mb-1">{exp.period}</p>
          <p className="text-sm mb-2">{exp.location}</p>
          <p>{exp.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Experience;
