import { workExperience } from '@/data';

const Experience = () => {
  return (
    <div className="w-full h-screen bg-bg text-text p-8 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
      {workExperience.map((exp) => (
        <div key={exp.id} className="mb-8 bg-card-bg p-6 rounded-lg shadow-md">
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
