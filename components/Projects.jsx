import { projects } from '@/data';
import Image from 'next/image';

const Projects = () => {
  return (
    <div className="w-full h-screen bg-bg text-text p-8 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-card-bg rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm mb-4">{project.des}</p>
              <div className="flex space-x-2 mb-4">
                {project.iconLists.map((icon, index) => (
                  <Image key={index} src={icon} alt="technology" width={24} height={24} />
                ))}
              </div>
              <a href={project.link} className="text-primary hover:text-primary-dark transition-colors duration-200">
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
