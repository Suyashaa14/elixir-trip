import { motion, useReducedMotion } from "framer-motion";
import {
  Smartphone,
  Wifi,
  WifiOff,
  Hand,
  Airplay,
  BellOff,
  Moon,
} from "lucide-react";

/**
 * Big, cinematic Digital Detox sequence:
 * 1) Huge WiFi appears, hand taps it, WiFi -> WiFiOff
 * 2) Phone fades in; animated red X overlays the phone
 * 3) Airplane / BellOff / Moon chips pop around
 */
type Props = {
  height?: number;      // height of the visual area
  wifiSize?: number;    // px size for WiFi icons
  phoneSize?: number;   // px size for the phone
  chipSize?: number;    // px size for chips
  tint?: string;        // tailwind gradient class for subtle brand tint
};

export default function DigitalDetoxSignalBG({
  height = 300,
  wifiSize = 148,
  phoneSize = 148,
  chipSize = 42,
  tint = "from-sky-200/45",
}: Props) {
  const reduce = useReducedMotion();

  const chips = [
    { Icon: Airplay, delay: 1.85, x: -110, y:  10 },
    { Icon: BellOff, delay: 2.00, x:  110, y:  16 },
    { Icon: Moon,    delay: 2.15, x:    0, y: 105 },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-t-[24px]"
      style={{ height }}
      aria-hidden
    >
      {/* Background & subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[hsl(var(--muted))]" />
      <div className={`absolute inset-0 bg-gradient-to-b ${tint} to-transparent`} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(65% 60% at 50% 35%, rgba(0,0,0,.10) 0%, transparent 55%)",
        }}
      />

      {/* =====  PHASE 1 – WiFi with tap  ===== */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[64%]">
        {/* Big WiFi show-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 1], scale: [0.7, 1] }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative"
          style={{ width: wifiSize, height: wifiSize }}
        >
          {/* WiFi ON icon */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: [1, 1, 0],
                    scale: [1, 1.04, 0.9],
                  }
            }
            transition={{ duration: 1.2, delay: 0.35, ease: "easeInOut" }}
            className="flex items-center justify-center"
            style={{ width: wifiSize, height: wifiSize }}
          >
            <Wifi className="w-[90%] h-[90%] text-sky-600 drop-shadow-[0_10px_24px_rgba(2,132,199,.35)]" />
          </motion.div>

          {/* Hand that taps the WiFi */}
          <motion.div
            initial={{ opacity: 0, x: 120, y: 80, rotate: 12 }}
            animate={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: [0, 1, 1, 0],
                    x: [120, 18, 18, 18],
                    y: [80, 22, 22, 22],
                    scale: [1, 0.94, 1.0, 1.0], // little press
                  }
            }
            transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
            className="absolute"
            style={{ width: wifiSize * 0.45, height: wifiSize * 0.45 }}
          >
            <Hand className="w-full h-full text-[hsl(var(--foreground))]" />
          </motion.div>

          {/* WiFi OFF icon appears after the tap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : { opacity: [0, 1], scale: [0.85, 1.06, 1] }
            }
            transition={{ delay: 1.1, duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <WifiOff className="w-[92%] h-[92%] text-rose-600 drop-shadow-[0_10px_24px_rgba(225,29,72,.35)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* =====  PHASE 2 – Phone with animated red X  ===== */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.45, ease: "easeOut" }}
        style={{ width: phoneSize, height: phoneSize }}
      >
        <Smartphone className="w-full h-full text-[hsl(var(--foreground))] drop-shadow-[0_10px_22px_rgba(0,0,0,.15)]" />

        {/* Animated red X overlay */}
        <motion.span
          className="absolute left-1/2 top-1/2 block origin-center rounded-full bg-rose-500"
          style={{ width: phoneSize * 0.12, height: phoneSize * 1.15 }}
          initial={{ rotate: 45, scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.35, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 block origin-center rounded-full bg-rose-500"
          style={{ width: phoneSize * 0.12, height: phoneSize * 1.15 }}
          initial={{ rotate: -45, scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 1.68, duration: 0.35, ease: "easeInOut" }}
        />
      </motion.div>

      {/* =====  PHASE 3 – Helper chips  ===== */}
      {chips.map(({ Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-white shadow-md"
          style={{
            width: chipSize,
            height: chipSize,
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          }}
          initial={{ opacity: 0, scale: 0.7, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay, duration: 0.28, ease: "easeOut" }}
        >
          <Icon className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
        </motion.div>
      ))}
    </div>
  );
}
