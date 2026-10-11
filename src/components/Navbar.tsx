"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/lib/brand";

const links = [
  { href: "/", label: "Home" },
  { href: "/personalized", label: "Personalized" },
  { href: "/banners", label: "Banners" },
  { href: "/order", label: "Order" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pink/30 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="font-script text-2xl text-ink md:text-3xl">
          {BRAND.name}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === l.href
                  ? "bg-pink-soft text-ink"
                  : "text-ink-light hover:bg-blue-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/order?type=banner"
          className="hidden rounded-full bg-gradient-to-r from-pink to-baby-blue px-4 py-2 text-sm font-bold text-ink shadow-sm sm:inline-flex"
        >
          Start an order
        </Link>
        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-pink/20 bg-cream px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-medium text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
