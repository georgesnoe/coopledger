"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocaleToggle } from "@/components/ui/locale-toggle";
import { IconMenu2, IconX } from "@tabler/icons-react";

export function Navbar() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#solution", label: t("Navbar.links.solution") },
    { href: "#impact", label: t("Navbar.links.impact") },
    { href: "#tech", label: t("Navbar.links.tech") },
    { href: "#team", label: t("Navbar.links.team") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 backdrop-blur-md bg-background/80 border-b border-border">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-8 h-8 sm:w-10 sm:h-10">
          <Image 
            src="/logo.png" 
            alt="CoopLedger" 
            fill
            className="object-contain"
          />
        </div>
        <span className="text-lg sm:text-xl font-serif font-bold tracking-tight">CoopLedger</span>
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-3">
        <LocaleToggle />
        <ThemeToggle />
        <Button 
          className="rounded-full bg-[#7cc6fe] text-white hover:bg-[#6bb5ef] px-6 py-2 font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
        >
          {t("Navbar.cta")}
        </Button>
      </div>

      <button 
        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border p-4 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-lg font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <LocaleToggle />
            <ThemeToggle />
          </div>
          <Button 
            className="w-full rounded-full bg-[#7cc6fe] text-white hover:bg-[#6bb5ef] py-3 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            {t("Navbar.cta")}
          </Button>
        </div>
      )}
    </nav>
  );
}