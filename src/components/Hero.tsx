import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

// 🎥 Nice yoga video (WebM) + high-res poster (JPG)
const VIDEO_WEBM =
  // "https://upload.wikimedia.org/wikipedia/commons/9/9d/Yoga_with_Lisa_Chulich_for_Nike.webm";
  "https://www.pexels.com/download/video/34575504/"
const POSTER_JPG =
  "https://www.pexels.com/download/video/34575504/";

export const Hero = () => {
  const scrollToRetreats = () => {
    document.getElementById("retreats")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <motion.video
          className="w-full h-full object-cover"
          poster={POSTER_JPG}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Serene wellness motion backdrop"
          title="Elixir Trips hero video"
          // keep your gentle zoom-in animation
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <source src={VIDEO_WEBM} type="video/webm" />
          {/* Optional: add an MP4 fallback later if you host one */}
        </motion.video>

        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-background/90" />
      </div>

      {/* Floating Gradient Orbs with Glow */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float shadow-glow"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float shadow-glow"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary-foreground mb-6 text-balance leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover Your{" "}
            <motion.span
              className="text-primary-light"
              animate={{
                textShadow: [
                  "0 0 20px rgba(64, 224, 208, 0.5)",
                  "0 0 40px rgba(64, 224, 208, 0.8)",
                  "0 0 20px rgba(64, 224, 208, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Elixir
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-primary-foreground mb-8 text-balance font-light drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A journey to wellness, balance & renewal
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={scrollToRetreats}
                className="bg-primary hover:bg-primary-dark text-primary-foreground shadow-glow text-lg px-8 py-6 rounded-full transition-all duration-300"
              >
                Explore Retreats
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-primary-foreground text-primary hover:bg-primary-foreground/20 backdrop-blur-sm text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-lg"
              >
                Plan My Journey
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToRetreats}
        >
          <ChevronDown className="w-8 h-8 text-primary-foreground animate-bounce" />
        </motion.div> */}
      </div>
    </section>
  );
};
