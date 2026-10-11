type Props = {
  side: "left" | "right";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "pink" | "blue";
  delaySec?: number;
};

const sizeClass = {
  xs: "h-10 w-7 sm:h-11 sm:w-8",
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
  { size: "lg", tone: "pink", delaySec: 0, className: "left-0 top-0" },
  {
    size: "md",
    tone: "blue",
    delaySec: 0.55,
    className: "left-4 top-9 sm:left-5 sm:top-10 md:top-11",
  },
  {
    size: "sm",
    tone: "pink",
    delaySec: 1.1,
    className: "left-0 top-[4.5rem] opacity-90 sm:top-[5rem]",
  },
  {
    size: "xs",
    tone: "blue",
    delaySec: 0.85,
    className: "left-6 top-[2.75rem] opacity-90 md:left-7",
  },
  {
    size: "xs",
    tone: "pink",
    delaySec: 1.4,
    className: "left-2 top-[6.25rem] opacity-80 sm:top-[6.75rem]",
  },
];

const RIGHT_BOWS: BowSpec[] = [
  { size: "lg", tone: "pink", delaySec: 0.15, className: "right-0 top-0" },
  {
    size: "md",
    tone: "blue",
    delaySec: 0.7,
    className: "right-4 top-9 sm:right-5 sm:top-10 md:top-11",
  },
  {
    size: "sm",
    tone: "pink",
    delaySec: 1.25,
    className: "right-0 top-[4.5rem] opacity-90 sm:top-[5rem]",
  },
  {
    size: "xs",
    tone: "blue",
    delaySec: 0.95,
    className: "right-6 top-[2.75rem] opacity-90 md:right-7",
  },
  {
    size: "xs",
    tone: "pink",
    delaySec: 1.5,
    className: "right-2 top-[6.25rem] opacity-80 sm:top-[6.75rem]",
  },
];

const OUTER_LEFT: BowSpec[] = [
  { size: "md", tone: "blue", delaySec: 0.2, className: "left-0 top-0" },
  { size: "sm", tone: "pink", delaySec: 0.65, className: "left-5 top-14" },
  { size: "lg", tone: "pink", delaySec: 0.05, className: "left-1 top-28 opacity-90" },
  { size: "xs", tone: "blue", delaySec: 1, className: "left-7 top-40" },
  { size: "md", tone: "pink", delaySec: 0.4, className: "left-0 top-52 opacity-90" },
];

const OUTER_RIGHT: BowSpec[] = [
  { size: "md", tone: "blue", delaySec: 0.25, className: "right-0 top-2" },
  { size: "sm", tone: "pink", delaySec: 0.75, className: "right-5 top-16" },
  { size: "lg", tone: "pink", delaySec: 0.1, className: "right-1 top-28 opacity-90" },
  { size: "xs", tone: "blue", delaySec: 1.05, className: "right-7 top-[10.5rem]" },
  { size: "md", tone: "pink", delaySec: 0.45, className: "right-0 top-[13.5rem] opacity-90" },
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
      className="relative hidden h-[8.5rem] w-16 shrink-0 sm:block sm:h-[9.25rem] sm:w-[4.25rem] md:h-[10rem] md:w-20"
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

/** Extra bows in the wide margins beside the hero */
function HeroBowGutter({ side }: { side: "left" | "right" }) {
  const specs = side === "left" ? OUTER_LEFT : OUTER_RIGHT;
  const edge =
    side === "left"
      ? "left-1 md:left-6 lg:left-10 xl:left-16 2xl:left-24"
      : "right-1 md:right-6 lg:right-10 xl:right-16 2xl:right-24";

  return (
    <div
      className={`pointer-events-none absolute top-24 hidden h-[17rem] w-20 md:block lg:top-28 lg:h-[18rem] lg:w-24 ${edge}`}
      aria-hidden
    >
      {specs.map((b, i) => (
        <HangingBow
          key={`gutter-${side}-${i}`}
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

export { BowColumn, HeroBowGutter };
