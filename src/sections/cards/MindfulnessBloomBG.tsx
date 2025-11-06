import { motion, useReducedMotion } from "framer-motion";

/**
 * MindfulnessBloomBG
 * - Right-facing head silhouette (stylized, like your reference)
 * - Stems grow from the open crown, petals pop in, gentle sway + floating dots
 * - Pure SVG; no images; colors adjustable via props
 */
type Props = {
  height?: number;
  skin?: string;     // head fill
  stroke?: string;   // head outline
  leaf?: string;
  petal?: string;
  center?: string;
  auraFrom?: string; // tw classes for background
  auraTo?: string;
};

export default function MindfulnessBloomBG({
  height = 320,
  skin   = "#F6D2BE",
  stroke = "#111111",
  leaf   = "#22C55E",        // green-500
  petal  = "#EC4899",        // pink-500
  center = "#111111",
  auraFrom = "from-emerald-50",
  auraTo   = "to-white",
}: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-t-[24px]" style={{ height }} aria-hidden>
      {/* soft background tint */}
      <div className={`absolute inset-0 bg-gradient-to-b ${auraFrom} ${auraTo}`} />
      <div className="absolute inset-0"
           style={{ background: "radial-gradient(60% 50% at 55% 25%, rgba(0,0,0,.06) 0%, transparent 60%)" }} />

      <svg
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2"
        width="340" height="260" viewBox="0 0 340 260" fill="none"
      >
        {/* === HEAD (right-facing, open crown) === */}
        <g>
          {/* fill */}
          <path
            d="M208 216c-30 0-52-22-52-49 0-10 3-19 9-27-7-36 21-74 81-82 70-10 108 31 83 75 16 9 23 25 18 40-6 18-24 31-45 31h-94Z"
            fill={skin}
          />
          {/* outline */}
          <path
            d="M208 216c-30 0-52-22-52-49 0-10 3-19 9-27-7-36 21-74 81-82
               31-4 57 4 72 18 9 8 12 19 2 30
               M282 64c5 8 9 20 10 28
               M264 86c21 0 41-4 58-14"
            stroke={stroke} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none"
          />
          {/* crown cut/opening line */}
          <path d="M208 80c36-22 94-24 132-12" stroke={stroke} strokeWidth={6} strokeLinecap="round" />
        </g>

        {/* === PLANT GROUP (grows + sways) === */}
        <motion.g
          transform="translate(238,84)" // pivot roughly at crown
          style={{ transformOrigin: "0px 0px" }}
          animate={reduce ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
          transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* stem 1 */}
          <motion.path
            d="M0 0 C-6 18 -10 36 -6 58"
            stroke={leaf} strokeWidth={4} strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0.6 : 1.4, ease: "easeInOut", delay: 0.15 }}
          />
          {/* left leaf */}
          <motion.path
            d="M-10 30 C-22 26 -26 20 -27 14 C-18 16 -13 20 -10 24 Z"
            fill={leaf}
            initial={{ scale: 0, opacity: 0, originX: 0.8, originY: 0.5 }}
            animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.70, duration: 0.3 }}
          />

          {/* stem 2 */}
          <motion.path
            d="M0 0 C8 22 12 38 10 60"
            stroke={leaf} strokeWidth={4} strokeLinecap="round" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0.6 : 1.4, ease: "easeInOut", delay: 0.25 }}
          />
          {/* right leaf */}
          <motion.path
            d="M14 32 C26 30 32 24 34 18 C24 20 18 24 14 28 Z"
            fill={leaf}
            initial={{ scale: 0, opacity: 0, originX: 0.2, originY: 0.5 }}
            animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.82, duration: 0.3 }}
          />

          {/* three blooms */}
          {[
            { x: -8, y: 62, d: 0.0 },
            { x: 12, y: 66, d: 0.1 },
            { x: 28, y: 56, d: 0.18 },
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x}, ${b.y})`}>
              {/* petals */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, k) => (
                <motion.ellipse
                  key={k} cx="0" cy="-10" rx="6.5" ry="12" fill={petal}
                  transform={`rotate(${deg})`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.05, 1], opacity: [0, 1, 1] }}
                  transition={{ delay: 1.0 + b.d + k * 0.03, duration: 0.28, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 4px 10px rgba(236,72,153,.35))" }}
                />
              ))}
              {/* center */}
              <motion.circle
                cx="0" cy="0" r="5.5" fill={center}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.32 + b.d, duration: 0.24, ease: "easeOut" }}
              />
            </g>
          ))}
        </motion.g>

        {/* gentle 'breathing' halo */}
        {!reduce && (
          <motion.circle
            cx="238" cy="84" r="28" fill="rgba(16,185,129,.20)"
            initial={{ r: 10, opacity: 0.35 }}
            animate={{ r: [10, 38, 10], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
          />
        )}
      </svg>

      {/* floating dots */}
      {!reduce &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-emerald-400/60"
            style={{
              width: 6, height: 6,
              left: `${48 + (Math.random() * 8 - 4)}%`,
              top: `${35 + Math.random() * 12}%`,
              filter: "blur(.2px)",
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-8, -16, -26] }}
            transition={{
              delay: 0.9 + i * 0.2,
              duration: 2.0,
              repeat: Infinity,
              repeatDelay: 1.6 + Math.random(),
              ease: "easeOut",
            }}
          />
        ))}
    </div>
  );
}
