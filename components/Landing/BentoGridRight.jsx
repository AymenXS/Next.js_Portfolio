import Section from '@/shared/Section';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { gridItems } from '@/data';

const BentoGridRight = () => {
  return (
    <Section className="flex-col h-full">
      <BentoGrid className="w-full mx-auto">
        {gridItems.slice(3, 6).map((item, index) => (
          <BentoGridItem
            key={index}
            id={index + 4}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </Section>
  );
};

export default BentoGridRight;
