// src/sections/newRetreats.tsx
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Brain, Smartphone } from "lucide-react";

// Images
import retreatVegan from "@/assets/retreat-vegan.jpg";               // keep same as before
import mindfulnessImg from "@/assets/mindfulness-retreats.jpg";      // your custom image path
import digitalDetoxImg from "@/assets/digitaldetox.jpg";             // your custom image path

// Booking flow
// import { ExperienceFlow } from "@/booking/ExperienceFlow";
import type { RetreatKey } from "@/booking/demoData";

type Card = {
  key: RetreatKey;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

// NOTE: Weightloss removed as requested
const retreats: Card[] = [
  {
    key: "vegan",
    icon: Leaf,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Vegan Wellness",
    subtitle: "Nourish from Within",
    description:
      "Experience plant-based healing: organic menus, sustainable living, and rejuvenating spa practices.",
    image: retreatVegan,
  },
  {
    key: "mindfulness",
    icon: Brain,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    title: "Mindfulness Retreat",
    subtitle: "Return to Presence",
    description:
      "Meditation, breathwork, and quiet nature time designed to reset your nervous system and mind.",
    image: mindfulnessImg,
  },
  {
    key: "detox",
    icon: Smartphone,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Digital Detox",
    subtitle: "Unplug to Reconnect",
    description:
      "Step away from screens and into slow living—long walks, real conversations, deep rest.",
    image: digitalDetoxImg,
  },
];

export const NewRetreats = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Booking flow
  const [flowOpen, setFlowOpen] = useState(false);
  const [selected, setSelected] = useState<RetreatKey>("vegan"); // default to vegan since weightloss is removed

  return (
    <section id="retreats" className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Choose Your Elixir
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Thoughtfully crafted paths—each designed to restore balance and spark lasting change.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {retreats.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all"
              >
                {/* Media */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={r.image}
                    alt={`${r.title} – ${r.subtitle}`}
                    className="h-full w-full object-cover"
                    animate={{ scale: hoveredIndex === i ? 1.06 : 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  {/* Subtle top gradient polish */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-5">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${r.iconBg}`}
                    >
                      <Icon className={`h-6 w-6 ${r.iconColor}`} />
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-semibold text-gray-900">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-base font-medium text-gray-800">
                    {r.subtitle}
                  </p>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {r.description}
                  </p>

                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        setSelected(r.key);
                        setFlowOpen(true);
                      }}
                      className="rounded-xl px-6 py-5 text-sm font-semibold shadow-sm bg-gray-900 text-white hover:bg-gray-800"
                    >
                      I want this experience
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Booking flow dialog */}
      {/* <ExperienceFlow open={flowOpen} onOpenChange={setFlowOpen} retreat={selected} /> */}
    </section>
  );
};

export default NewRetreats;
