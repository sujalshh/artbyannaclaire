import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-pink/25 bg-white/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center md:px-8">
        <p className="font-script text-3xl text-ink">{BRAND.name}</p>
        <p className="max-w-md text-sm text-ink-light">{BRAND.tagline}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
          <Link href="/order" className="text-ink hover:text-pink">
            Place an order
          </Link>
          <Link href="/personalized" className="text-ink hover:text-pink">
            Personalized
          </Link>
          <Link href="/banners" className="text-ink hover:text-pink">
            Banners
          </Link>
        </div>
        <p className="text-xs text-ink-light">
          Prices shown are starting points — final quote confirmed by email.
        </p>
      </div>
    </footer>
  );
}
