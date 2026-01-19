import { projects } from '@/data';
import Image from 'next/image';

const Projects = () => {
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
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-card-bg rounded-lg overflow-hidden skeleton-box">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm mb-4">{project.des}</p>
              <div className="flex space-x-2 mb-4">
                {project.iconLists.map((icon, index) => (
                  <Image key={index} src={icon} alt="technology" width={24} height={24} />
                ))}
              </div>
              <a href={project.link} className="text-primary">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
