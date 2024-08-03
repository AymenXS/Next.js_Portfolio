import { cn } from '@/lib/utils';
import Image from 'next/image';

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 mx-auto max-w-7xl w-full px-6 py-12 h-[90vh]', className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  return (
    <div
      className={cn(
        'rounded-3xl group/bento hover:shadow-2xl transition-all duration-300 shadow-lg dark:shadow-none p-6 md:p-8 dark:bg-black/50 bg-white/10 backdrop-blur-sm border border-white/10 flex flex-col justify-between relative overflow-hidden',
        className
      )}
      style={{
        background: 'rgba(4,7,29,0.8)',
        backgroundImage: 'linear-gradient(135deg, rgba(4,7,29,0.9) 0%, rgba(12,14,35,0.8) 100%)',
      }}
    >
      {img && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={img}
            alt={title as string}
            layout="fill"
            objectFit="cover"
            className={cn(imgClassName, 'z-0 opacity-30 group-hover/bento:opacity-40 transition-opacity duration-300')}
          />
        </div>
      )}
      {spareImg && (
        <div
          className={`absolute right-0 bottom-0 ${
            id === 5 ? 'w-3/4 opacity-50' : 'w-1/2 opacity-20'
          } h-3/4 transition-all duration-300 group-hover/bento:scale-105`}
        >
          <Image src={spareImg} alt="Spare" layout="fill" objectFit="contain" className="z-10" />
        </div>
      )}
      <div className={cn('relative z-20 h-full flex flex-col', titleClassName)}>
        <h3 className="font-sans text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 group-hover/bento:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <p className="font-sans font-light text-sm md:text-base lg:text-lg text-gray-300 mt-2 group-hover/bento:translate-y-1 transition-transform duration-300 line-clamp-4 md:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  );
};
