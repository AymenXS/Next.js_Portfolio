import Section from '@/shared/Section';
import { Spotlight } from '../ui/spotlight';
import ThemeToggle from './ThemeToggle';

const Introduction = () => {
  return (
    <Section isActive={true}>
      <div className="absolute top-5 right-5 z-30">
        <ThemeToggle />
      </div>
      <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="red" />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="red" />
      {/* <div className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center | flex-col gap-y-3"> */}
      <div className="h-full w-full dark:bg-black bg-white relative flex items-center justify-center | flex-col gap-y-3">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h5 className="uppercase tracking-widest text-xs text-center">Aymen Ghaloua | Full-Stack Developer</h5>
        <h3 className="text-center text-xl mb-12">Transforming Complex Ideas into Elegant, Innovative Solutions</h3>
        <h4 className="">I'm a passionate developer with a knack for creating responsive, user-centric web applications.</h4>
        <h4>With 3+ years of experience, I bridge the gap between design and functionality.</h4>
        <h4 className=" max-w-lg text-center ">From concept to deployment, I deliver smooth user experiences</h4>
        <h4 className="text-center mb-32">that drive results and meets expectations.</h4>
      </div>
    </Section>
  );
};
export default Introduction;
