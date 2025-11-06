import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote:
        "I didn't just lose weight — I found peace. The journey transformed not just my body, but my entire perspective on life.",
      author: "Sarah Mitchell",
      role: "Weight Loss Retreat",
    },
    {
      quote:
        "Under the Bali sun, surrounded by nature's embrace, I rediscovered myself. This retreat gave me the reset I desperately needed.",
      author: "James Chen",
      role: "Mindfulness Retreat",
    },
    {
      quote:
        "The plant-based cuisine was divine, and the healing practices were life-changing. I left feeling renewed and inspired.",
      author: "Emma Rodriguez",
      role: "Vegan Wellness",
    },
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 bg-gradient-to-b from-[#F9FAFB] via-[#F4FFFB] to-[#FFFFFF] relative overflow-hidden"
    >
      {/* Soft floating lights */}
      <motion.div
        className="absolute top-20 right-16 w-72 h-72 bg-primary/15 rounded-full blur-[100px]"
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px]"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.25, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#062E2E] mb-4">
            Stories from the Journey
          </h2>
          <p className="text-lg md:text-xl text-[#3A4D47]/80">
            Voices of transformation from those who found their Elixir
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/30 mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                “{t.quote}”
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-900">{t.author}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
