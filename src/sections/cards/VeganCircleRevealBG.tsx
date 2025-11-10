// src/sections/cards/VeganCircleRevealBG.tsx
import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type Props = {
  playKey?: number;          // 👈 added
  size?: number;
  revealDelay?: number;
  revealDuration?: number;
  holdDuration?: number;
  fadeDuration?: number;
  bowlSize?: number;
  foodCircleSrc: string;
  bowlSrc: string;
};

export default function VeganCircleRevealBG({
  playKey = 0,
  size = 300,
  revealDelay = 0.2,
  revealDuration = 2.0,
  holdDuration = 0.25,
  fadeDuration = 0.35,
  bowlSize = 176,
  foodCircleSrc,
  bowlSrc,
}: Props) {
  const baseId = useId();                   // unique per mount
  const id = `${baseId}-${playKey}`;        // unique per replay
  const reduce = useReducedMotion();

  const r = (size - 1) / 2;
  const C = 2 * Math.PI * r;

  const tStart = revealDelay;
  const tShownEnd = revealDelay + revealDuration + holdDuration;
  const total = tShownEnd + fadeDuration;
  const bowlDelay = total + 0.05;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: size, height: size }} aria-hidden>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(60% 60% at 50% 45%, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.06) 38%, transparent 70%)" }}
      />

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <mask id={`v-mask-${id}`}>
            <rect width={size} height={size} fill="black" />
            <motion.circle
              key={playKey}                   // ← restart stroke animation on replay
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="white"
              strokeWidth={size}
              strokeDasharray={C}
              strokeDashoffset={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ delay: revealDelay, duration: revealDuration, ease: "easeInOut" }}
            />
          </mask>
          <clipPath id={`v-clip-${id}`}>
            <circle cx={size / 2} cy={size / 2} r={r} />
          </clipPath>
        </defs>

        <motion.g
          key={`g-${playKey}`}               // ← ensure replay
          mask={`url(#v-mask-${id})`}
          clipPath={`url(#v-clip-${id})`}
          initial={false}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: total,
            times: [0, tStart / total, (tStart + 0.001) / total, tShownEnd / total, 1],
            ease: "linear",
          }}
        >
          <image href={foodCircleSrc} x={0} y={0} width={size} height={size} preserveAspectRatio="xMidYMid slice" />
        </motion.g>
      </svg>

      <motion.img
        key={`bowl-${playKey}`}              // ← replay bowl timing too
        src={bowlSrc}
        alt=""
        style={{ width: bowlSize, zIndex: 1 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_22px_rgba(0,0,0,0.28)]"
        initial={{ opacity: 0, scale: 0.4, rotate: -4 }}
        animate={reduce ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 1, scale: [0.4, 1.18, 0.96, 1], rotate: 0 }}
        transition={reduce ? { delay: bowlDelay, duration: 0.35 } : { delay: bowlDelay, duration: 0.95, times: [0, 0.6, 0.82, 1], ease: "easeOut" }}
      />
    </div>
  );
}
