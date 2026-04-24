"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocaleToggle } from "@/components/ui/locale-toggle";


export function Navbar() {
  const t = useTranslations();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <Image 
            src="/logo.png" 
            alt="CoopLedger" 
            fill
            className="object-contain"
          />
        </div>
        <span className="text-xl font-serif font-bold tracking-tight">CoopLedger</span>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="#solution" className="hover:text-primary transition-colors">
          {t("Navbar.links.solution")}
        </Link>
        <Link href="#impact" className="hover:text-primary transition-colors">
          {t("Navbar.links.impact")}
        </Link>
        <Link href="#tech" className="hover:text-primary transition-colors">
          {t("Navbar.links.tech")}
        </Link>
        <Link href="#team" className="hover:text-primary transition-colors">
          {t("Navbar.links.team")}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <LocaleToggle />
        <ThemeToggle />
        <Button 
          className="rounded-full bg-[#7cc6fe] text-white hover:bg-[#6bb5ef] px-6 py-2 font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
        >
          {t("Navbar.cta")}
        </Button>
      </div>
    </nav>
  );
}
