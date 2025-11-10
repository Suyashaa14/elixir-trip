import logo from "../assets/newlogo2.jpg";


export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white border-t border-black/10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
           
              <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Elixir Trip" className="h-10 w-auto rounded-md object-contain" />
              <span className="text-2xl font-serif font-bold text-[hsl(var(--foreground))]">
                Elixir Trips
              </span>
            </div>
            </div>

            <p className="mb-3 max-w-md text-neutral-600 leading-relaxed">
              Find your <span className="text-emerald-600 font-medium">Elixir</span> — one journey at a time. Transformative wellness experiences curated for mind, body, and balance.
            </p>
            <p className="italic text-sm text-neutral-500">
              “Where nature heals, and journeys begin.”
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif font-semibold text-neutral-900 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("retreats")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="transition-colors hover:text-emerald-600"
                >
                  Our Retreats
                </button>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="transition-colors hover:text-emerald-600"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="transition-colors hover:text-emerald-600"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Retreats */}
          <div>
            <h4 className="font-serif font-semibold text-neutral-900 mb-4">
              Retreats
            </h4>
            <ul className="space-y-2 text-neutral-600">
              <li className="hover:text-emerald-600 transition-colors">
                Weight Loss
              </li>
              <li className="hover:text-emerald-600 transition-colors">
                Vegan Wellness
              </li>
              <li className="hover:text-emerald-600 transition-colors">
                Mindfulness
              </li>
              <li className="hover:text-emerald-600 transition-colors">
                Digital Detox
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 text-sm text-neutral-500 md:flex-row">
          <p>© 2025 Elixir Trips. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="transition-colors hover:text-emerald-600">
              Privacy Policy
            </button>
            <button className="transition-colors hover:text-emerald-600">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
