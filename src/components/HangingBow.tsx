type Props = {
  side: "left" | "right";
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "pink" | "blue";
  delaySec?: number;
};

const sizeClass = {
  sm: "h-12 w-8 sm:h-14 sm:w-9",
  md: "h-[4.5rem] w-12 sm:h-[5.25rem] sm:w-14",
  lg: "h-20 w-14 sm:h-24 sm:w-16 md:h-28 md:w-[4.25rem]",
} as const;

const tones = {
  pink: {
    loopA: "#ffe4ef",
    loopB: "#f7c6d4",
    stroke: "#f0a8be",
    ribbon: "#e8b4c4",
    knot: "#f0a8be",
    knotHi: "#ffe4ef",
    sparkle: "#f7c6d4",
  },
  blue: {
    loopA: "#eef8ff",
    loopB: "#dff0fb",
    stroke: "#9ec5e8",
    ribbon: "#b8d8f0",
    knot: "#9ec5e8",
    knotHi: "#eef8ff",
    sparkle: "#b8d8f0",
  },
} as const;

type BowSpec = {
  size: keyof typeof sizeClass;
  tone: keyof typeof tones;
  delaySec: number;
  className: string;
};

/** Full class strings (no runtime replace) so Tailwind includes positioning utilities */
const LEFT_BOWS: BowSpec[] = [
  {
    size: "lg",
    tone: "pink",
    delaySec: 0,
    className: "left-0 top-0",
  },
  {
    size: "md",
    tone: "blue",
    delaySec: 0.55,
    className: "left-3 top-10 sm:left-4 sm:top-11 md:top-12",
  },
  {
    size: "sm",
    tone: "pink",
    delaySec: 1.1,
    className: "left-0 top-[4.75rem] opacity-90 sm:top-[5.25rem]",
  },
];

const RIGHT_BOWS: BowSpec[] = [
  {
    size: "lg",
    tone: "pink",
    delaySec: 0.15,
    className: "right-0 top-0",
  },
  {
    size: "md",
    tone: "blue",
    delaySec: 0.7,
    className: "right-3 top-10 sm:right-4 sm:top-11 md:top-12",
  },
  {
    size: "sm",
    tone: "pink",
    delaySec: 1.25,
    className: "right-0 top-[4.75rem] opacity-90 sm:top-[5.25rem]",
  },
];

export function HangingBow({
  side,
  className = "",
  size = "md",
  tone = "pink",
  delaySec = 0,
}: Props) {
  const sway = side === "right" ? "bow-sway-right" : "bow-sway-left";
  const c = tones[tone];

  return (
    <div
      className={`pointer-events-none ${sway} ${className}`}
      style={{ animationDelay: `${delaySec}s` }}
      aria-hidden
    >
      <svg
        viewBox="0 0 56 120"
        className={`${sizeClass[size]} opacity-[0.92]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M28 0v42" stroke={c.ribbon} strokeWidth="2" strokeLinecap="round" />
        <path
          d="M28 0v42"
          stroke="#fff"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M28 44c-14 2-22 12-20 24 2 10 12 16 22 14 6-1 10-5 12-10"
          fill={c.loopA}
          stroke={c.stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M28 44c14 2 22 12 20 24-2 10-12 16-22 14-6-1-10-5-12-10"
          fill={c.loopB}
          stroke={c.stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <ellipse cx="28" cy="46" rx="5" ry="4" fill={c.knot} />
        <ellipse cx="28" cy="45" rx="3" ry="2.5" fill={c.knotHi} />
        <path
          d="M24 50l-4 18c-1 4 2 8 6 7l2-12"
          fill={c.loopB}
          stroke={c.stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M32 50l4 20c1 5-2 9-7 8l-1-14"
          fill={c.loopA}
          stroke={c.stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="38" r="1.5" fill={c.sparkle} opacity="0.85" />
        <circle cx="42" cy="36" r="1" fill={c.sparkle} opacity="0.9" />
      </svg>
    </div>
  );
}

function BowColumn({ side }: { side: "left" | "right" }) {
  const specs = side === "left" ? LEFT_BOWS : RIGHT_BOWS;

  return (
    <div
      className="relative hidden h-[7.5rem] w-14 shrink-0 sm:block sm:h-[8.25rem] sm:w-16 md:h-[9rem] md:w-[4.5rem]"
      aria-hidden
    >
      {specs.map((b, i) => (
        <HangingBow
          key={`${side}-${i}`}
          side={side}
          size={b.size}
          tone={b.tone}
          delaySec={b.delaySec}
          className={`absolute ${b.className}`}
        />
      ))}
    </div>
  );
}

export { BowColumn };
