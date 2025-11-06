import { motion, useReducedMotion } from "framer-motion";
import { Dumbbell, Apple, HeartPulse, Bike, Leaf, Salad } from "lucide-react";
import scaleCenter from "../../assets/scaleCenter.png";

type Props = {
  ring?: number;        // square box that defines the orbit area
  radius?: number;      // distance of icons from the center
  icon?: number;        // icon size in px
  spin?: number;        // seconds for one full rotation
  centerWidth?: number; // image width of the scale
};

export default function WeightLossOrbitBG({
  ring = 320,
  radius = 110,
  icon = 24,
  spin = 28,
  centerWidth = 170,
}: Props) {
  const reduce = useReducedMotion();
  const Icons = [Dumbbell, Apple, HeartPulse, Bike, Leaf, Salad, Apple, Leaf];

  return (
    // Single absolute anchor at the true center of the visual panel
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: ring, height: ring }}
    >
      {/* ORBIT — rotates around the SAME anchor as the scale */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { repeat: Infinity, duration: spin, ease: "linear" }}
        aria-hidden
      >
        {Icons.map((Icon, idx) => {
          const angle = (idx / Icons.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <span
              key={idx}
              className="absolute inline-flex items-center justify-center rounded-full
                         bg-teal-500/55 ring-1 ring-black/10 backdrop-blur-[2px]
                         shadow-[0_2px_8px_rgba(0,0,0,.22)]"
              style={{
                left: "50%",
                top: "50%",
                width: icon + 12,
                height: icon + 12,
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <Icon className="text-white" size={icon} strokeWidth={2.1} />
            </span>
          );
        })}
      </motion.div>

      {/* SCALE — fixed at the SAME center, above the orbit */}
      <img
        src={scaleCenter}
        alt=""
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 h-auto"
        style={{ width: centerWidth }}
      />
    </div>
  );
}
