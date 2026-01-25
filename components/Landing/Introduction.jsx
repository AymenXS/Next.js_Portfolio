import Section from '@/shared/Section';

const Introduction = ({ navigateTo }) => {
  return (
    <Section isActive={true}>
      <div
        className={
          'relative ' +
          'flex flex-col items-center justify-center ' +
          'gap-y-4 ' +
          'h-full w-full ' +
          'text-center'
        }
      >
        <p className="text-sm opacity-60">[Particle animation background]</p>

        <h1 className="text-4xl font-bold">Aymen Ghaloua</h1>

        <p className="text-xl">
          Building intelligent systems that turn complexity into simplicity
        </p>

        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <button
            className="px-4 py-2 border rounded opacity-60 cursor-not-allowed"
            disabled
            type="button"
          >
            Download Resume
          </button>

          <button
            className="px-4 py-2 border rounded"
            type="button"
            onClick={() => navigateTo?.(4)}
          >
            Contact Me
          </button>

          <button
            className="px-4 py-2 border rounded"
            type="button"
            onClick={() => navigateTo?.(2)}
          >
            View Work
          </button>
        </div>

        {/* Deferred note must be visible in UI */}
        <p className="text-xs opacity-60 mt-2">
          Resume download — deferred (Phase 4+)
        </p>
      </div>
    </Section>
  );
};

export default Introduction;
