"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { solarAssets, externalLinks } from "@/data/solarcards-assets";

const navLinks = [
  { label: "How to Play", href: "#top" },
  { label: "Game Modes", href: "#mission" },
  { label: "Your Turn", href: "#your-turn" },
  { label: "Victory", href: "#victory" },
];

export function SolarNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-space-black/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="#top" className="flex items-center rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun">
          {/* TODO: swap for the SolarCards logo when supplied. */}
          <Image
            src={solarAssets.solarballsLogo}
            alt="SolarBalls home"
            width={140}
            height={35}
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-1 py-2 text-sm font-bold text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
            >
              {link.label}
            </a>
          ))}
          <a
            href={externalLinks.shop}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sun px-4 py-2 font-display text-sm text-space-black shadow-[0_4px_16px_rgba(255,216,74,0.35)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
          >
            Shop SolarCards
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-ink md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none">
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-space-black/95 px-4 pb-4 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded px-2 py-3 text-base font-bold text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-sun"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={externalLinks.shop}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-full bg-sun px-4 py-3 text-center font-display text-space-black"
              >
                Shop SolarCards
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
