import React from 'react';
import { companies, testimonials } from '@/data';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import Section from '@/shared/Section';

const Testimonials = () => {
  return (
    <Section className="flex-col h-full py-20 skeleton-section">
      <h1 className="heading">
        Kind words from
        <span className="text-secondary"> satisfied clients</span>
      </h1>
      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          className={
            // 1) Layout
            'overflow-hidden ' +
            // 2) Positioning
            'relative ' +
            // 3) Display & Flexbox/Grid
            'flex flex-col items-center justify-center ' +
            // 4) Spacing
            // 5) Sizing
            'h-[50vh] ' +
            // 6) Typography
            'antialiased ' +
            // 7) Backgrounds
            // 8) Borders
            'rounded-md ' +
            // 9) Effects
            // 10) Transforms
            // 11) Transitions & Animations
            // 12) Interactivity
            // 13) Accessibility
            // 14) States
            // 15) Responsive
            'md:h-[30rem] ' +
            // 16) Dark Mode
            // 17) Custom/Misc
            'skeleton-box'
          }
        >
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10 skeleton-box">
          {companies.map((company, index) => (
            <React.Fragment key={`${company.id}-${index}`}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <img src={company.img} alt={company.name} className="md:w-10 w-5" />
                <img
                  src={company.nameImg}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  className="md:w-24 w-20"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
