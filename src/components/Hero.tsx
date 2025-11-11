// src/sections/Hero.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export const Hero = () => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Served from /public/video
  const heroMp4 = `${import.meta.env.BASE_URL}video/hero_vid.mp4`;
  const heroPoster = `${import.meta.env.BASE_URL}video/hero_poster.png`;

  // Safety timeout so we never show loader forever
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 3500);
    return () => clearTimeout(id);
  }, []);

  const markReady = () => setReady(true);
  const markError = () => {
    setFailed(true);
    setReady(true);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      // solid base so no flash behind poster/video
      style={{ backgroundColor: "black" }}
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0">

        {/* 1) Poster always shows immediately; fades out once video is ready */}
        <motion.img
          src={heroPoster}
          alt="Elixir Trip hero"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: ready && !failed ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-hidden
        />

        {/* 2) Video sits on top of poster and fades in when it can play */}
        {!failed && (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster={heroPoster}               // extra safety on some browsers
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={markReady}
            onCanPlayThrough={markReady}
            onError={(e) => { console.error("Hero video failed:", e); markError(); }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 1.04 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <source src={heroMp4} type="video/mp4" />
          </motion.video>
        )}

        {/* 3) Your veils/tints only appear once the video is visible */}
        {ready && !failed && (
          <>
            {/* Subtle white cast */}
            <div className="absolute inset-0 bg-white/08" />
            {/* Brand-tinted gradient veil for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.18)] via-transparent to-[hsl(var(--background)/0.85)]" />
          </>
        )}
      </div>

      {/* --- LOADER (shown over poster) --- */}
      {!ready && (
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
          <p className="text-sm text-white/80 tracking-wide">Preparing your experience…</p>
        </div>
      )}

      {/* --- CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto pt-24 md:pt-28"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-balance leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] text-[hsl(var(--primary-foreground))]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Discover Your{" "}
            <motion.span
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
              onClick={() => document.getElementById("retreats")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                         bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] text-[hsl(var(--primary-foreground))]"
            >
              Explore Retreats
            </Button>

            <Button
              variant="outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6 rounded-full transition-all duration-300
                         border-2 border-[hsl(var(--primary-foreground)/0.6)]
                         text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground)/0.12)] backdrop-blur-sm"
            >
              Plan My Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
