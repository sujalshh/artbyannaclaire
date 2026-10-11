"use client";

import { motion } from "framer-motion";

const FLUTTERS = [
  { top: "12%", duration: 42, delay: 0, scale: 1, opacity: 0.62, yWave: 18 },
  { top: "28%", duration: 36, delay: 12, scale: 0.78, opacity: 0.52, yWave: 22 },
  { top: "52%", duration: 48, delay: 6, scale: 0.92, opacity: 0.58, yWave: 14 },
  { top: "68%", duration: 38, delay: 22, scale: 0.68, opacity: 0.48, yWave: 20 },
  { top: "38%", duration: 44, delay: 18, scale: 0.88, opacity: 0.55, yWave: 16 },
] as const;

const flap = {
  animate: { rotate: [-2, 14, -2] },
  transition: { duration: 0.32, repeat: Infinity, ease: "easeInOut" as const },
};

const flapRight = {
  animate: { rotate: [2, -14, 2] },
  transition: { duration: 0.32, repeat: Infinity, ease: "easeInOut" as const },
};

function Butterfly({ scale, uid }: { scale: number; uid: number }) {
  const lid = `bf${uid}`;
  const originL = "42px 32px";
  const originR = "42px 32px";

  return (
    <svg
      viewBox="0 0 84 56"
      className="h-11 w-[3.25rem] sm:h-14 sm:w-[4.25rem]"
      style={{
        transform: `scale(${scale})`,
        filter: `drop-shadow(0 2px 6px rgba(247, 198, 212, 0.35))`,
      }}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`wu-${lid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff5f9" />
          <stop offset="35%" stopColor="#f7c6d4" />
          <stop offset="100%" stopColor="#c9dff5" />
        </linearGradient>
        <linearGradient id={`wl-${lid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffe4ef" />
          <stop offset="55%" stopColor="#e8b4c4" />
          <stop offset="100%" stopColor="#b8d8f0" />
        </linearGradient>
        <radialGradient id={`spot-${lid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Antennae */}
      <path
        d="M42 18c-4-6-9-8-12-6M42 18c4-6 9-8 12-6"
        stroke="#6b6378"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="30" cy="12" r="1.2" fill="#f7c6d4" />
      <circle cx="54" cy="12" r="1.2" fill="#b8d8f0" />

      {/* Body */}
      <ellipse cx="42" cy="30" rx="2.8" ry="9" fill="#4a4458" opacity="0.85" />
      <ellipse cx="42" cy="28" rx="1.4" ry="6" fill="#7a7289" opacity="0.5" />

      {/* Left wings */}
      <motion.g style={{ transformOrigin: originL }} {...flap}>
        <path
          d="M42 28C22 14 4 18 2 30c-1 8 6 14 16 16 8 2 14-2 18-10 4-6 6-8 6-8z"
          fill={`url(#wu-${lid})`}
          stroke="#e8a8be"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <path
          d="M42 32C28 38 14 42 8 36c-4-4-2-10 4-12 6-2 12 0 18 4 6 4 10 4 12 4z"
          fill={`url(#wl-${lid})`}
          stroke="#d4a8e8"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <ellipse cx="18" cy="26" rx="5" ry="4" fill={`url(#spot-${lid})`} />
        <circle cx="24" cy="34" r="2" fill="#fff" opacity="0.35" />
      </motion.g>

      {/* Right wings */}
      <motion.g style={{ transformOrigin: originR }} {...flapRight}>
        <path
          d="M42 28C62 14 80 18 82 30c1 8-6 14-16 16-8 2-14-2-18-10-4-6-6-8-6-8z"
          fill={`url(#wu-${lid})`}
          stroke="#e8a8be"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <path
          d="M42 32C56 38 70 42 76 36c4-4 2-10-4-12-6-2-12 0-18 4-6 4-10 4-12 4z"
          fill={`url(#wl-${lid})`}
          stroke="#d4a8e8"
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <ellipse cx="66" cy="26" rx="5" ry="4" fill={`url(#spot-${lid})`} />
        <circle cx="60" cy="34" r="2" fill="#fff" opacity="0.35" />
      </motion.g>
    </svg>
  );
}

function Drifter({
  top,
  duration,
  delay,
  scale,
  opacity,
  yWave,
  index,
}: (typeof FLUTTERS)[number] & { index: number }) {
  return (
    <motion.div
      className="absolute left-0 will-change-transform"
      style={{ top, opacity }}
      initial={{ x: "-14vw", rotate: -4 }}
      animate={{
        x: ["-14vw", "114vw"],
        y: [0, yWave, -yWave * 0.55, yWave * 0.35, 0],
        rotate: [-5, 2, -2, 3, -4],
      }}
      transition={{
        x: { duration, repeat: Infinity, ease: "linear", delay },
        y: {
          duration: duration * 0.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.3,
        },
        rotate: {
          duration: duration * 0.55,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <Butterfly scale={scale} uid={index} />
    </motion.div>
  );
}

export function ButterflyField() {
  return (
    <div
      className="butterfly-field pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {FLUTTERS.map((f, i) => (
        <Drifter key={i} index={i} {...f} />
      ))}
    </div>
  );
}
