import {  useRef } from "react";
import { motion, useInView } from "framer-motion";

// import { ExperienceFlow } from "../booking/ExperienceFlow";
import type { RetreatKey } from "../booking/demoData";

// special split/animated cards
import WeightLossCard from "../sections/cards/WeightLossCard";
import VeganCard from "../sections/cards/VeganCard";
import MindfulnessCard from "../sections/cards/MindfulnessCard";
import DigitalDetoxCard from "../sections/cards/DigitalDetoxCard";

type Card = { key: RetreatKey; title: string; subtitle: string };

const CARDS: Card[] = [
  { key: "weightloss", title: "Weight Loss", subtitle: "Transform your body with holistic wellness programs" },
  { key: "vegan", title: "Vegan Lifestyle", subtitle: "Plant-based culinary experiences and education" },
  { key: "mindfulness", title: "Mindfulness", subtitle: "Deepen your meditation and spiritual practice" },
  { key: "detox", title: "Digital Detox", subtitle: "Disconnect to reconnect with yourself and nature" },
];

export const Retreats = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // const [flowOpen, setFlowOpen] = useState(false);
  // const [selected, setSelected] = useState<RetreatKey>("weightloss");

  // const open = (k: RetreatKey) => {
  //   setSelected(k);
  //   setFlowOpen(true);
  // };

  return (
    <section id="retreats" ref={ref} className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(var(--foreground))]">
            Choose Your Elixir
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4 max-w-[1400px] mx-auto">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.06 * i }}
            >
              {c.key === "weightloss" && (
                <WeightLossCard title={c.title} subtitle={c.subtitle} onExplore={() => open("weightloss")} />
              )}
              {c.key === "vegan" && (
                <VeganCard title={c.title} subtitle={c.subtitle} onExplore={() => open("vegan")} />
              )}
              {c.key === "mindfulness" && (
                <MindfulnessCard title={c.title} subtitle={c.subtitle} onExplore={() => open("mindfulness")} />
              )}
              {c.key === "detox" && (
                <DigitalDetoxCard title={c.title} subtitle={c.subtitle} onExplore={() => open("detox")} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* <ExperienceFlow open={flowOpen} onOpenChange={setFlowOpen} retreat={selected} /> */}
    </section>
  );
};

export default Retreats;
