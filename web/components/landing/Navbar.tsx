"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocaleToggle } from "@/components/ui/locale-toggle";
import { IconMenu2, IconX } from "@tabler/icons-react";

export function Navbar() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#solution", label: t("Navbar.links.solution") },
    { href: "#impact", label: t("Navbar.links.impact") },
    { href: "#technology", label: t("Navbar.links.technology") },
    { href: "#team", label: t("Navbar.links.team") },
  ];

  return (
    <nav className="fixed top-3 left-0 right-0 z-50">
      <div className="container px-4 sm:px-6">
        <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 backdrop-blur-xl px-4 py-2.5 shadow-[0_8px_40px_rgba(15,25,40,0.08)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11">
              <Image src="/logo.png" alt="CoopLedger" fill className="object-contain" />
            </div>
            <span className="hidden sm:block text-sm font-semibold tracking-wide">CoopLedger</span>
          </Link>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-border/80 bg-background/80 p-1">
              <LocaleToggle />
              <ThemeToggle />
            </div>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center rounded-full bg-[#7cc6fe] px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-[#66baf9] transition-colors"
            >
              {t("Navbar.launch")}
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-2 rounded-2xl border border-border/70 bg-background/95 backdrop-blur-md p-4 space-y-4 animate-in slide-in-from-top-2 shadow-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <LocaleToggle />
              <ThemeToggle />
            </div>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center rounded-full bg-[#7cc6fe] px-4 py-2 text-sm font-semibold text-zinc-950"
              onClick={() => setIsOpen(false)}
            >
              {t("Navbar.launch")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
