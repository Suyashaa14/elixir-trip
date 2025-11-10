// src/sections/Hero.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
// import heroPoster from "../assets/hero_poster.jpg"; // ← optional poster (uncomment if you add one)
import heroMp4 from "../assets/hero_vid.mp4";

export const Hero = () => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Safety timeout so we never get a “stuck” loader on slow networks
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(id);
  }, []);

  // When the video metadata or first frame is available, show content
  const markReady = () => setReady(true);
  const markError = () => {
    setFailed(true);
    setReady(true); // reveal content (we’ll show gradient fallback instead of video)
  };

  // const scrollToRetreats = () => {
  //   document.getElementById("retreats")?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0">
        {/* Video (hidden until ready to avoid white flash) */}
        {!failed && (
          <motion.video
            ref={videoRef}
            className={`w-full h-full object-cover ${ready ? "opacity-100" : "opacity-0"}`}
            // poster={heroPoster} // ← optional: uncomment if you add a poster image
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={markReady}
            onCanPlayThrough={markReady}
            onError={markError}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <source src={heroMp4} type="video/mp4" />
          </motion.video>
        )}

        {/* Fallback gradient if video errors or while loading (prevents white flash) */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: ready && !failed ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 30%, hsl(var(--secondary)/0.25) 100%)",
          }}
        />

        {/* Subtle white cast like your reference (lighter than before) */}
        <div className="absolute inset-0 bg-white/08" />

        {/* Brand-tinted gradient veil for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.18)] via-transparent to-[hsl(var(--background)/0.85)]" />
      </div>

      {/* --- FLOATING ORBS (soft) --- */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "hsl(var(--primary)/0.28)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 right-10 w-72 h-72 rounded-full blur-3xl"
        style={{ background: "hsl(var(--accent)/0.26)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* --- LOADER --- */}
      {!ready && (
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
          <p className="text-sm text-white/80 tracking-wide">Preparing your experience…</p>
        </div>
      )}

      {/* --- CONTENT --- */}
      {ready && (
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-balance leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] text-[hsl(var(--primary-foreground))]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Discover Your{" "}
              <motion.span
                // Match button’s primary color
                className="text-[hsl(var(--primary))]"
                animate={{
                  textShadow: [
                    "0 0 0 rgba(0,0,0,0)",
                    "0 0 24px rgba(255,255,255,0.45)",
                    "0 0 0 rgba(0,0,0,0)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                Elixir
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-balance font-light drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)] text-[hsl(var(--primary-foreground))]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A journey to wellness, balance & renewal
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() =>
                  document.getElementById("retreats")?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                           bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] text-[hsl(var(--primary-foreground))]"
              >
                Explore Retreats
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-lg px-8 py-6 rounded-full transition-all duration-300
                           border-2 border-[hsl(var(--primary-foreground)/0.6)]
                           text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground)/0.12)] backdrop-blur-sm"
              >
                Plan My Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Hero;
