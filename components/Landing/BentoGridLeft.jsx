import Section from '@/shared/Section';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { gridItems } from '@/data';

const BentoGridLeft = () => {
  return (
    <Section className="flex-col h-full">
      <BentoGrid className="w-full mx-auto">
        {gridItems.slice(0, 3).map((item) => (
          <BentoGridItem
            key={item.id}
            id={item.id}
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

export default BentoGridLeft;
