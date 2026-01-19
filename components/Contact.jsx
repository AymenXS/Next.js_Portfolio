const Contact = () => {
  return (
    <div
      className={
        // 1) Layout
        // 2) Positioning
        // 3) Display & Flexbox/Grid
        'flex flex-col justify-center items-center ' +
        // 4) Spacing
        'p-8 ' +
        // 5) Sizing
        'w-full h-screen ' +
        // 6) Typography
        'text-text ' +
        // 7) Backgrounds
        'bg-bg ' +
        // 8) Borders
        // 9) Effects
        // 10) Transforms
        // 11) Transitions & Animations
        // 12) Interactivity
        // 13) Accessibility
        // 14) States
        // 15) Responsive
        // 16) Dark Mode
        // 17) Custom/Misc
        'skeleton-section'
      }
    >
      <div className="mt-8 text-center skeleton-box">
        <p className="mb-2">Email: aymenghaloua@gmail.com</p>
        <p className="mb-2">Phone: +212 621-23-21-83</p>
        <p>Location: Marrakesh/Safi, Morocco</p>
      </div>
    </div>
  );
};

export default Contact;
