import { motion } from "framer-motion";
import DigitalDetoxSignalBG from "./DigitalDetoxSignalBG";

type Props = {
  title: string;
  subtitle: string;
  onExplore: () => void;
};

export default function DigitalDetoxCard({ title, subtitle, onExplore }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-[24px] shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Top cinematic animation */}
      <DigitalDetoxSignalBG height={320} wifiSize={168} phoneSize={164} chipSize={44} />

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      {/* Bottom content */}
      <div className="p-6 sm:p-7">
        <h3 className="font-serif text-[clamp(1.6rem,1.3rem+1vw,2rem)] font-semibold text-[hsl(var(--foreground))]">
          {title}
        </h3>
        <p className="mt-2 text-[hsl(var(--muted-foreground))] leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-5">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 text-[hsl(var(--foreground))] font-medium tracking-[-0.01em]"
          >
            <span className="underline underline-offset-4 decoration-black/30 group-hover:decoration-black">
              Explore Programs
            </span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </button>
        </div>
      </div>

      {/* Soft ring/glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-black/5"
        initial={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
        whileHover={{ boxShadow: "0 12px 36px rgba(0,0,0,.10)" }}
        transition={{ duration: 0.25 }}
      />
    </article>
  );
}
