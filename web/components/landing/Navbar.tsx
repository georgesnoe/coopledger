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
    { href: "#about", label: t("Navbar.links.about") },
    { href: "#how-it-works", label: t("Navbar.links.how") },
    { href: "#features", label: t("Navbar.links.features") },
    { href: "#solution", label: t("Navbar.links.solution") },
    { href: "#partners", label: t("Navbar.links.partners") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 bg-background/90 backdrop-blur-md border-b border-border/50">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
          <Image 
            src="/logo.png" 
            alt="CoopLedger" 
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <LocaleToggle />
        <ThemeToggle />
      </div>

      <button 
        className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border p-4 space-y-4 animate-in slide-in-from-top-2">
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
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}