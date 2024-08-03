import { useState } from 'react';
import { gsap } from 'gsap';

export function useSectionManager(numSections) {
  const [currentSection, setCurrentSection] = useState(0);

  const changeSection = (direction) => {
    const newSection = currentSection + direction;
    if (newSection >= 0 && newSection < numSections) {
      setCurrentSection(newSection);
      updateSectionVisibility(newSection);
    }
    return newSection;
  };

  const goToSection = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < numSections) {
      setCurrentSection(sectionIndex);
      updateSectionVisibility(sectionIndex);
    }
  };

  const updateSectionVisibility = (activeIndex) => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      gsap.to(section, {
        duration: 0.5,
        opacity: index === activeIndex ? 1 : 0,
        pointerEvents: index === activeIndex ? 'auto' : 'none',
      });
    });
  };

  return { currentSection, changeSection, goToSection };
}
