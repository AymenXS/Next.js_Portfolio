'use client';

import { useFullPageScroll } from '@/hooks/useFullPageScroll';

const NUM_PAGES = 3;
const SECTIONS_PER_PAGE = [4, 1, 1, 1, 1]; // 4 sections in Page 1, 1 section each in Page 2 and 3

const Main = () => {
  const { containerRef, slidesRef, currentPage, currentSection, navigateTo } = useFullPageScroll(NUM_PAGES, SECTIONS_PER_PAGE);

  return (
    <div className="overflow-hidden h-screen">
      <div ref={containerRef} className="relative">
        <div ref={(element) => (slidesRef.current[0] = element)}>
          <Landing />
        </div>
        <div ref={(element) => (slidesRef.current[1] = element)}>
          <Projects />
        </div>
        <div ref={(element) => (slidesRef.current[2] = element)}>
          <Experience />
        </div>
        <div ref={(element) => (slidesRef.current[3] = element)}>
          <Testimonials />
        </div>
        <div ref={(element) => (slidesRef.current[4] = element)}>
          <Contact />
        </div>
      </div>
    </div>
  );
};
export default Main;
