// src/sections/cards/VeganCard.tsx
import VeganCircleRevealBG from "./VeganCircleRevealBG";
import veganCircle from "../../assets/vegan-circle.jpg"; // square collage
import veganBowl   from "../../assets/vegan-bowl.png";   // transparent PNG/WebP

type Props = { title: string; subtitle: string; onExplore: () => void };

export default function VeganCard({ title, subtitle, onExplore }: Props) {
  return (
    
    <article className="group relative overflow-hidden rounded-[24px] border border-black/5 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Animation area */}
      <div className="relative h-[320px] rounded-t-[24px] overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white flex items-center justify-center">
        <VeganCircleRevealBG
          size={300}
          revealDelay={0.20}
          revealDuration={2.0}  // slower sweep
          holdDuration={0.25}
          fadeDuration={0.35}   // plate gone before bowl starts
          bowlSize={176}
          foodCircleSrc={veganCircle}
          bowlSrc={veganBowl}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      {/* Text area */}
      <div className="relative rounded-b-[24px] border-t border-black/5 bg-white/85 backdrop-blur-md p-6 sm:p-7">
        <h3 className="text-[hsl(var(--foreground))] font-serif text-[1.85rem] sm:text-[2rem] font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-2 text-[hsl(var(--muted-foreground))] text-[1.05rem] leading-relaxed">
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
    </article>
  );
}
