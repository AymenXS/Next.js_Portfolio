import { cn } from '@/lib/utils'; // Assuming you have a utils file with cn function

export default function Section({ className, children, bgColor, isActive = false }) {
  return (
    <section
      className={cn(
        'section absolute inset-0 h-full w-full',
        bgColor,
        'flex items-center justify-center',
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
    >
      {children}
    </section>
  );
}
