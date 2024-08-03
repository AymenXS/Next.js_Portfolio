import Section from '@/shared/Section';
import IconCloud from './IconCloud';
import { technologies } from '@/data';

const Technologies = () => {
  return (
    <Section className="flex-col h-full border-4 border-red-400 p-2">
      <IconCloud iconSlugs={technologies} />
    </Section>
  );
};
export default Technologies;
