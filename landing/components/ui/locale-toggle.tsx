"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const localeFlags: Record<string, { flag: string; label: string }> = {
  en: { flag: "https://flagcdn.com/w40/gb.png", label: "English" },
  fr: { flag: "https://flagcdn.com/w40/fr.png", label: "Français" },
};

export function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "en" ? "fr" : "en";
  const currentFlag = localeFlags[locale];

  const toggleLocale = () => {
    const newPathname = pathname.startsWith(`/${locale}`)
      ? pathname.replace(`/${locale}`, `/${nextLocale}`)
      : `/${nextLocale}${pathname}`;
    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLocale}
      className="group flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-all duration-300"
      aria-label={`Switch to ${localeFlags[nextLocale].label}`}
    >
      <Image src={currentFlag.flag} alt={currentFlag.label} width={18} height={12} className="rounded-sm object-cover" unoptimized />
      {locale}
    </button>
  );
}
