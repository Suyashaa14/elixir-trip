// src/sections/cards/VeganCircleRevealBG.tsx
import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type Props = {
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
  size = 300,
  revealDelay = 0.2,
  revealDuration = 2.0,  // slower sweep
  holdDuration = 0.25,
  fadeDuration = 0.35,
  bowlSize = 176,
  foodCircleSrc,
  bowlSrc,
}: Props) {
  const id = useId();
  const reduce = useReducedMotion();

  const r = (size - 1) / 2;
  const C = 2 * Math.PI * r;

  // timing helpers
  const tStart = revealDelay;
  const tShownEnd = revealDelay + revealDuration + holdDuration; // when plate should start fading
  const total = tShownEnd + fadeDuration; // full plate animation time

  // bowl begins AFTER the plate has fully faded
  const bowlDelay = total + 0.05;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* subtle glow, no outline */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.06) 38%, transparent 70%)",
        }}
      />

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          {/* sweep mask reveals the bitmap – no stroke shown to user */}
          <mask id={`v-mask-${id}`}>
            <rect width={size} height={size} fill="black" />
            <motion.circle
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

        {/* PLATE GROUP — stays hidden, then visible, then fades to 0 */}
        <motion.g
          mask={`url(#v-mask-${id})`}
          clipPath={`url(#v-clip-${id})`}
          // Keyframes keep it invisible until revealDelay, then visible, then fade out
          initial={false}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: total,
            times: [
              0,
              tStart / total,
              (tStart + 0.001) / total, // instant jump to 1 at reveal start
              tShownEnd / total,         // hold fully visible
              1,                         // fade to 0 by the end
            ],
            ease: "linear",
          }}
        >
          <image
            href={foodCircleSrc}
            x={0}
            y={0}
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid slice"
          />
        </motion.g>
      </svg>

      {/* BOWL POP — starts only after plate is fully gone */}
      <motion.img
        src={bowlSrc}
        alt=""
        style={{ width: bowlSize, zIndex: 1 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_22px_rgba(0,0,0,0.28)]"
        initial={{ opacity: 0, scale: 0.4, rotate: -4 }}
        animate={
          reduce
            ? { opacity: 1, scale: 1, rotate: 0 }
            : { opacity: 1, scale: [0.4, 1.18, 0.96, 1], rotate: 0 }
        }
        transition={
          reduce
            ? { delay: bowlDelay, duration: 0.35 }
            : {
                delay: bowlDelay,
                duration: 0.95,
                times: [0, 0.6, 0.82, 1],
                ease: ["easeOut", "easeOut", "easeOut"],
              }
        }
      />
    </div>
  );
}
