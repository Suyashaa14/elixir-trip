import WeightLossOrbitBG from "./WeightLossOrbitBG";

type Props = {
  title: string;
  subtitle: string;
  onExplore: () => void;
};

export default function WeightLossCard({ title, subtitle, onExplore }: Props) {
  return (
    <article
      className="group relative overflow-hidden rounded-[24px] border border-black/5
                 bg-white/80 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* TOP: Visual area (centered) */}
      <div
        className="relative h-[300px] rounded-t-[24px] overflow-hidden
                   bg-gradient-to-b from-[#F3FFFB] via-white/85 to-white/40
                   flex items-center justify-center"
      >
        {/* gentle glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 50%, rgba(0, 200, 180, 0.16) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
        <WeightLossOrbitBG ring={320} radius={108} icon={24} spin={60} centerWidth={170} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      {/* BOTTOM: Text-only panel */}
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
