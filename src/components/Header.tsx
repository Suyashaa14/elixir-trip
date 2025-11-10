// src/sections/Header.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import logo from "../assets/newlogo3.png"; // ← your logo file

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Home", id: "hero" },
    { label: "Our Philosophy", id: "philosophy" },
    { label: "Retreats", id: "retreats" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 border-0
      ${isScrolled ? "bg-[hsl(var(--background)/0.86)] backdrop-blur-lg shadow-elegant" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Brand (logo only, no rotating, no extra text) */}
          <button onClick={() => go("hero")} className="flex items-center gap-3">
            <img
              src={logo}
              alt="Elixir Trip"
              className="h-20 w-auto rounded-md object-contain"
              style={{ filter: isScrolled ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,.35))" }}
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative text-sm font-semibold tracking-wide transition-colors
                ${isScrolled ? "text-[hsl(var(--foreground))]" : "text-white"} group`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all
                ${isScrolled ? "bg-[hsl(var(--primary))]" : "bg-white"}`} />
              </button>
            ))}

            <Button
              onClick={() => go("contact")}
              className={`${isScrolled
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)]"
                : "bg-white/15 text-white border border-white/30 hover:bg-white/25"} rounded-full px-5`}
            >
              Plan Your Journey
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`${isScrolled ? "text-[hsl(var(--foreground))]" : "text-white"} md:hidden p-2`}
          >
            {open ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-3 pb-4 space-y-2"
            >
              {nav.map((item, idx) => (
                <motion.button
                  key={item.id}
                  onClick={() => go(item.id)}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full text-left px-4 py-2 rounded-lg text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.08)]"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                onClick={() => go("contact")}
                className="w-full rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              >
                Plan Your Journey
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
