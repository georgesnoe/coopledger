"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1500382017468-9049fed74eg3?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 px-4 sm:px-6">
        <div className="flex-1 text-left space-y-6 sm:space-y-8 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-tight text-foreground tracking-tight">
            {t("Hero.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium opacity-90">
            {t("Hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-5 pt-2 sm:pt-4">
            <Button 
              className="rounded-full bg-[#7cc6fe] text-white hover:bg-[#6bb5ef] px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-bold transition-all hover:scale-105 shadow-xl shadow-blue-500/30"
            >
              {t("Hero.cta_primary")}
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all"
            >
              {t("Hero.cta_secondary")}
            </Button>
          </div>
        </div>

        <div className="flex-1 relative hidden lg:block">
          <div className="relative w-[280px] h-[520px] lg:w-[320px] lg:h-[600px] mx-auto rounded-[3rem] border-[10px] lg:border-[12px] border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden bg-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-5 lg:p-6 flex flex-col gap-3 lg:gap-4">
              <div className="w-full h-4 bg-white/10 rounded-full animate-pulse" />
              <div className="w-3/4 h-4 bg-white/10 rounded-full animate-pulse" />
              
              <div className="mt-6 lg:mt-8 p-5 lg:p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400 font-medium">Balance</span>
                  <span className="text-sm text-white font-bold">1,250,000 FCFA</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex justify-between text-[11px] text-zinc-300">
                    <span>Seed Purchase</span>
                    <span className="text-red-400 font-medium">- 45,000</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-300">
                    <span>Collective Sale</span>
                    <span className="text-green-400 font-medium">+ 210,000</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto mb-8 lg:mb-10 p-4 lg:p-5 rounded-3xl bg-[#7cc6fe]/10 backdrop-blur-md border border-[#7cc6fe]/20 text-center">
                <p className="text-xs text-zinc-300 font-medium mb-2 lg:mb-3">New Vote Available</p>
                <div className="bg-[#7cc6fe] text-white text-[11px] py-2 lg:py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/40">
                  Vote Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}