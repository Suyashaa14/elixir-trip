// src/sections/Header.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Our Philosophy", id: "philosophy" },
    { label: "Retreats", id: "retreats" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300
        ${isScrolled
          ? // sticky state: soft gray with blur, no border line
            "bg-neutral-900/55 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.18)]"
          : // top state: fully transparent
            "bg-transparent shadow-none"
        }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand name only */}
          <button
            onClick={() => scrollTo("hero")}
            className="select-none"
            aria-label="Go to top"
          >
            <span className={`font-serif font-extrabold tracking-tight
              ${isScrolled ? "text-white" : "text-white"}`}
              style={{ fontSize: "1.65rem", lineHeight: 1 }}
            >
              Elixir Trip
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative text-sm font-semibold group
                  ${isScrolled ? "text-white/90 hover:text-white" : "text-white hover:text-white"}
                `}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
            <Button
              onClick={() => scrollTo("contact")}
              className="rounded-full px-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              Plan Your Journey
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(v => !v)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 space-y-2 pb-3"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="w-full text-left py-2 px-4 rounded-lg text-white/90 hover:text-white hover:bg-white/10"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                onClick={() => scrollTo("contact")}
                className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
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
