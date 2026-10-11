import Link from "next/link";
import { ArrowRight, Heart, Paintbrush } from "lucide-react";

const cards = [
  {
    href: "/personalized",
    icon: Heart,
    title: "Personalized",
    body: "3D letters from $15, name claw clips, pearl brushes, photo albums — color, theme & inspo built in.",
    cta: "See pricing & book",
    glow: "from-pink-soft/80 to-transparent",
    iconBg: "from-pink-soft to-white",
  },
  {
    href: "/banners",
    icon: Paintbrush,
    title: "Painted banners",
    body: "Upload your layout, wording & size. From $35 — add ship-within-24-hours when you’re in a pinch.",
    cta: "Banner pricing",
    glow: "from-blue-soft/90 to-transparent",
    iconBg: "from-blue-soft to-white",
  },
];

export function ServiceCards() {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative overflow-hidden rounded-[1.75rem] bg-white/75 p-7 shadow-[0_4px_24px_rgba(74,68,88,0.07)] ring-1 ring-white/90 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_20px_48px_rgba(247,198,212,0.28)] md:p-8"
          >
            <div
              className={`pointer-events-none absolute -right-6 -top-6 h-36 w-36 rounded-full bg-gradient-to-br ${c.glow} blur-2xl transition group-hover:scale-110`}
              aria-hidden
            />
            <div
              className={`relative inline-flex rounded-2xl bg-gradient-to-br ${c.iconBg} p-3.5 shadow-sm`}
            >
              <c.icon className="h-7 w-7 text-ink/85" strokeWidth={1.65} />
            </div>
            <h2 className="relative mt-5 text-xl font-bold tracking-tight text-ink md:text-[1.35rem]">
              {c.title}
            </h2>
            <p className="relative mt-2.5 text-sm leading-relaxed text-ink-light">
              {c.body}
            </p>
            <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition group-hover:gap-2.5">
              {c.cta}
              <ArrowRight className="h-4 w-4 text-pink transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
