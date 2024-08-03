import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useSectionManager } from './useSectionManager';

export function useFullPageScroll(numPages, sectionsPerPage) {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastSection, setLastSection] = useState(0);
  const { currentSection, changeSection, goToSection } = useSectionManager(sectionsPerPage[0]);

  useEffect(() => {
    const container = containerRef.current;
    const slides = slidesRef.current;
    let offsets = slides.map((slide) => -slide.offsetTop);

    const handleWheel = (e) => {
      if (currentPage === 0) {
        const newSection = changeSection(e.deltaY > 0 ? 1 : -1);
        if (newSection === sectionsPerPage[0] - 1 && e.deltaY > 0) {
          setLastSection(newSection);
          goToPage(1);
        }
      } else {
        const newPage = currentPage + (e.deltaY > 0 ? 1 : -1);
        if (newPage === 0) {
          goToPage(0, lastSection);
        } else {
          goToPage(newPage);
        }
      }
    };

    const goToPage = (pageIndex, sectionIndex = 0) => {
      const boundedPageIndex = Math.max(0, Math.min(numPages - 1, pageIndex));
      if (boundedPageIndex !== currentPage || (boundedPageIndex === 0 && sectionIndex !== currentSection)) {
        gsap.to(container, {
          duration: 1,
          y: offsets[boundedPageIndex],
          onComplete: () => {
            setCurrentPage(boundedPageIndex);
            if (boundedPageIndex === 0) {
              goToSection(sectionIndex);
            }
          },
        });
      }
    };

    const handleResize = () => {
      const innerHeight = window.innerHeight;
      gsap.set(container, { height: slides.length * innerHeight });
      gsap.set(slides, { height: innerHeight });
      offsets = slides.map((slide) => -slide.offsetTop);
      gsap.set(container, { y: offsets[currentPage] });
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
    };
  }, [numPages, sectionsPerPage, currentPage, currentSection, changeSection, goToSection, lastSection]);

  const navigateTo = (page, section = 0) => {
    if (page === 0) {
      goToSection(section);
    } else {
      setLastSection(currentSection);
      const container = containerRef.current;
      const slides = slidesRef.current;
      gsap.to(container, {
        duration: 1,
        y: -slides[page].offsetTop,
        onComplete: () => setCurrentPage(page),
      });
    }
  };

  return { containerRef, slidesRef, currentPage, currentSection, navigateTo };
}
