const contactInfo = {
  email: 'your.email@example.com',
  location: 'Your City, Country',
  whatsapp: '+1 (123) 456-7890',
  socials: {
    github: 'github.com/yourusername',
  },
};

// Availability is set by you from database (not user input)
const availability = 'Available'; // or "In Project"

const Contact = () => {
  const whatsappDigits = contactInfo.whatsapp.replace(/[^\d]/g, ''); // simple helper for wa.me

  return (
    <div className="bg-bg text-text skeleton-section w-full min-h-screen">
      {/* Full-width, 50/50 split */}
      <main className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        {/* LEFT HALF */}
        <section className="p-12 lg:p-16">
          {/* Title + subtitle link (top-left) */}
          <header>
            <h1 className="text-4xl font-bold">Contact Me</h1>
            <p className="mt-2 text-sm opacity-80">
              Or reach me via:{' '}
              <a
                className="underline"
                href={`mailto:${contactInfo.email}`}
              >
                {contactInfo.email}
              </a>
            </p>
          </header>

          {/* Availability display (not a field) */}
          <div className="mt-8 border rounded-2xl skeleton-box p-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs border rounded-full skeleton-chip">
                Currently: {availability}
              </span>
            </div>
            <p className="mt-2 text-xs opacity-70">
              This status is updated by me from the database
            </p>
          </div>

          {/* Contact Form */}
          <section className="mt-8 border rounded-2xl skeleton-box p-6">
            <h2 className="text-lg font-bold">Send a Message</h2>

            <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
              {/* First / Last name (2 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pr-12 border rounded-xl bg-transparent skeleton-box"
                    placeholder="First Name"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-70">
                    [Icon]
                  </span>
                </div>

                {/* Last Name */}
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pr-12 border rounded-xl bg-transparent skeleton-box"
                    placeholder="Last Name"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-70">
                    [Icon]
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 pr-12 border rounded-xl bg-transparent skeleton-box"
                  placeholder="Email"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-70">
                  [Icon]
                </span>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  className="w-full px-4 py-3 pr-12 border rounded-xl bg-transparent skeleton-box min-h-[220px]"
                  placeholder="Message"
                  required
                />
                <span className="absolute right-3 top-4 text-xs opacity-70">
                  [Icon]
                </span>
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-10 py-3 border rounded-full"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Visible future note (not code comment) */}
            <p className="mt-4 text-xs opacity-70">
              Form submission logic will be added later
            </p>
          </section>

          {/* Contact Information */}
          <section className="mt-8 border rounded-2xl skeleton-box p-6">
            <h2 className="text-lg font-bold">Contact Information</h2>

            <div className="mt-5 grid gap-3 text-sm">
              {/* Email */}
              <div className="flex items-center gap-3">
                <span className="text-xs opacity-70">[Email Icon]</span>
                <a className="underline" href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <span className="text-xs opacity-70">[Location Icon]</span>
                <span>{contactInfo.location}</span>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3">
                <span className="text-xs opacity-70">[WhatsApp Icon]</span>
                <a
                  className="underline"
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contactInfo.whatsapp}
                </a>
              </div>

              {/* Socials */}
              <div className="pt-2">
                <p className="text-sm font-semibold">Connect with me:</p>
                <div className="mt-2 flex items-center gap-3">
                  <button type="button" className="px-3 py-2 border rounded-xl skeleton-box">
                    [GitHub Icon]
                  </button>
                  <a
                    className="underline"
                    href={`https://${contactInfo.socials.github}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {contactInfo.socials.github}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Future Enhancements (visible blueprint section) */}
          <section className="mt-8 border border-dashed rounded-2xl skeleton-box p-6 opacity-90">
            <h2 className="text-lg font-bold">Future Features</h2>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1 opacity-80">
              <li>Service Type selection (dropdown)</li>
              <li>Collaboration Type (dropdown)</li>
              <li>Estimated Budget (range selector)</li>
              <li>AI-powered pre-detailed form for better context gathering</li>
            </ul>
          </section>
        </section>

        {/* RIGHT HALF */}
        <section className="relative min-h-[60vh] lg:min-h-screen">
          {/* Curved divider (dashed line) */}
          <div className="absolute left-0 top-0 bottom-0 w-0 border-l border-dashed opacity-40" />

          {/* Organic shape wrapper */}
          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Dashed outline extending beyond */}
            <div
              className="absolute w-[92%] h-[84%] border border-dashed rounded-[48px] opacity-40"
              style={{
                transform: 'translate(10px, -10px)',
              }}
            />

            {/* Main organic shape */}
            <div
              className="w-[90%] h-[80%] border rounded-[64px] skeleton-box flex items-center justify-center text-center p-8"
              style={{
                clipPath:
                  'polygon(0% 12%, 8% 6%, 22% 2%, 40% 1%, 58% 3%, 74% 8%, 88% 16%, 96% 30%, 99% 48%, 96% 66%, 88% 82%, 74% 92%, 58% 97%, 40% 99%, 22% 98%, 8% 94%, 0% 86%)',
              }}
            >
              <div>
                <p className="text-lg font-semibold opacity-80">Image Placeholder</p>
                <p className="mt-2 text-sm opacity-70">
                  TODO: Add animated image/AI-generated design
                </p>
              </div>
            </div>

            {/* subtle note about flow/divider */}
            <div className="absolute left-6 bottom-6 text-xs opacity-60">
              Curved divider + organic mask (skeleton)
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
