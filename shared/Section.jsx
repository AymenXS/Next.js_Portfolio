// components/Section.jsx
export default function Section({ children, bgColor, isActive = false }) {
  return (
    <div
      className={`section absolute inset-0 ${bgColor} flex items-center justify-center ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <h1 className="text-4xl">{children}</h1>
    </div>
  );
}
