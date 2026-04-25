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
  const nextFlag = localeFlags[nextLocale];

  const toggleLocale = () => {
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLocale}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 hover:bg-accent transition-all duration-300 border border-transparent hover:border-primary/20"
      aria-label={`Switch to ${localeFlags[nextLocale].label}`}
    >
      <Image 
        src={currentFlag.flag}
        alt={currentFlag.label}
        width={24}
        height={16}
        className="rounded-sm object-cover"
        unoptimized
      />
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase">
        {locale}
      </span>
      <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity -rotate-90">
        <Image 
          src={nextFlag.flag}
          alt={nextFlag.label}
          width={16}
          height={10}
          className="rounded-sm"
          unoptimized
        />
      </div>
    </button>
  );
}