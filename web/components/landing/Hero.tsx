"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" poster="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1800">
          <source src="https://cdn.coverr.co/videos/coverr-rice-fields-from-above-1579/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,198,254,0.3),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(54,143,204,0.2),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/20" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-[#7cc6fe]/60 bg-[#7cc6fe]/10 px-4 py-1 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#3188c2]">
            {t("Hero.badge")}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-foreground mb-6">
            {t("Hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">{t("Hero.subtitle")}</p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link
              href="#how-it-works"
              className="rounded-full bg-[#7cc6fe] px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-[#6ab8ee] transition-colors"
            >
              {t("Navbar.launch")}
            </Link>
            <Link href="#media" className="rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
              {t("Hero.watchDemo")}
            </Link>
          </div>

          <div className="grid grid-cols-3 max-w-xl gap-3 sm:gap-4">
            {[
              { value: "0.2%", label: t("Hero.stats.loans") },
              { value: "15-20%", label: t("Hero.stats.losses") },
              { value: "70%", label: t("Hero.stats.trust") },
            ].map((stat) => (
              <div key={stat.value} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-3 sm:p-4">
                <div className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 w-[340px]">
          <div className="relative w-full aspect-[9/16] rounded-[2.5rem] border-[8px] border-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden bg-zinc-900">
            <Image
              src="https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Cooperative dashboard"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-4 right-4">
              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl space-y-1">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("Hero.balanceLabel")}</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">1,250,000 XOF</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("Hero.balanceNote")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
