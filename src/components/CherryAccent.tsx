/** Tiny coquette cherry + bow for the hero “Art” */
export function CherryAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 36"
      className={`h-7 w-8 md:h-8 md:w-9 ${className}`}
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 34c-2 0-3.5-1.5-3.5-3.5S18 27 20 27s3.5 1.5 3.5 3.5S22 34 20 34z"
        fill="#e85a6a"
        stroke="#c93d52"
        strokeWidth="0.8"
      />
      <path
        d="M28 32c-2 0-3.5-1.5-3.5-3.5S26 25 28 25s3.5 1.5 3.5 3.5S30 32 28 32z"
        fill="#ff6b7a"
        stroke="#c93d52"
        strokeWidth="0.8"
      />
      <path
        d="M20 27v-8M28 25l-2-6"
        stroke="#6aab5a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 14c2-3 5-4 8-2"
        stroke="#6aab5a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 11c-3-1-5 1-5 4 0 2 1.5 3.5 3.5 3.5"
        fill="#ffe4ef"
        stroke="#f0a8be"
        strokeWidth="0.9"
      />
      <path
        d="M22 11c3-1 5 1 5 4 0 2-1.5 3.5-3.5 3.5"
        fill="#f7c6d4"
        stroke="#f0a8be"
        strokeWidth="0.9"
      />
      <circle cx="20.5" cy="12" r="1.2" fill="#f0a8be" />
    </svg>
  );
}
