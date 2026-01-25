// app/page.jsx
'use client';

import { useFullPageScroll } from '@/hooks/useFullPageScroll';
import Landing from '@/components/Landing/Landing';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

const NUM_PAGES = 5;
const SECTIONS_PER_PAGE = [5];

const Main = () => {
  const { containerRef, slidesRef, currentPage, currentSection, navigateTo } =
    useFullPageScroll(NUM_PAGES, SECTIONS_PER_PAGE);

  return (
    <div className="overflow-hidden h-screen">
      <div ref={containerRef}>
        <div className="w-full h-screen relative" ref={(element) => (slidesRef.current[0] = element)}>
          <Landing navigateTo={navigateTo} />
        </div>

        <div className="w-full h-screen relative" ref={(element) => (slidesRef.current[1] = element)}>
          <Experience />
        </div>

        <div className="w-full h-screen relative" ref={(element) => (slidesRef.current[2] = element)}>
          <Projects />
        </div>

        <div className="w-full h-screen relative" ref={(element) => (slidesRef.current[3] = element)}>
          <Testimonials />
        </div>

        <div className="w-full h-screen relative" ref={(element) => (slidesRef.current[4] = element)}>
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Main;
