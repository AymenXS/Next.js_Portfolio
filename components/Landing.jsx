import Section from '@/shared/Section';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { gridItems } from '@/data';

const Landing = () => {
  return (
    <>
      <Section isActive={true} className="flex-col">
        <h5>Aymen Ghaloua | Full-Stack Developer</h5>
        <h3>Welcome to my digital playground.</h3>
        <h4>I'm a passionate developer with a knack for creating responsive, user-centric web applications.</h4>
        <h4>
          With 3+ years of experience, I bridge the gap between design and functionality, transforming complex ideas into elegant,
          innovative solutions.
        </h4>
        <h4>From concept to deployment, I deliver smooth user experiences that drive results and meets expectations.</h4>
      </Section>
      <Section className="flex-col h-full border-4 border-red-400 p-2">
        <BentoGrid className="w-full border-2 border-blue-200 mx-auto">
          {gridItems.map((item, index) => (
            <BentoGridItem
              key={index}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </Section>
    </>
  );
};

export default Landing;
