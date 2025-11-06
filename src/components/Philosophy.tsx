import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Heart, Sparkles } from "lucide-react";

export const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Leaf,
      title: "Natural Healing",
      description:
        "Embracing nature's wisdom to restore balance and vitality through our hand-picked wellness retreats.",
      btnLabel: "Explore Nature Retreats",
      // color config per card
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      btnColor: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: Heart,
      title: "Mindful Connection",
      description:
        "Creating sacred space for self-reflection, emotional renewal, and deeper connection with oneself and others.",
      btnLabel: "Join Mindfulness Sessions",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      btnColor: "bg-pink-600 hover:bg-pink-700",
    },
    {
      icon: Sparkles,
      title: "Transformative Journeys",
      description:
        "Curating meaningful experiences that inspire lasting change and awaken a new sense of purpose.",
      btnLabel: "Start Your Journey",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      btnColor: "bg-indigo-600 hover:bg-indigo-700",
    },
  ];

  return (
    <section
      id="philosophy"
      ref={ref}
      // ✅ plain white background like the reference
      className="relative py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
            Find Your Inner Balance
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Discover wellness journeys designed to heal, reconnect, and transform. Each
            experience is crafted to bring calm, clarity, and joy.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                // ✅ white cards, light border, subtle shadow like your image
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center mb-6 mx-auto`}
                >
                  <Icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>

                {/* Title/Desc */}
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-3 font-serif">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Button — solid color, high contrast */}
                <div className="flex justify-center">
                  <button
                    className={`inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold text-white ${item.btnColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20`}
                  >
                    {item.btnLabel}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-800">
            "Healing begins when you pause."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};
