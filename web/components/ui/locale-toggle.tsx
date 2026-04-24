"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "fr" : "en";
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPathname);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-full px-3 h-9 w-10 transition-all duration-300 bg-background/50 backdrop-blur-sm border border-border hover:bg-accent"
      onClick={toggleLocale}
    >
      <Image 
        src={locale === "en" ? "https://flagcdn.com/w20/fr.png" : "https://flagcdn.com/w20/gb.png"}
        alt={locale === "en" ? "Français" : "English"}
        width={20}
        height={14}
        className="rounded-sm"
        unoptimized
      />
    </Button>
  );
}
