"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-foreground mb-6">
            {t("Hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
            {t("Hero.subtitle")}
          </p>
        </div>
        
        <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 w-[320px]">
          <div className="relative w-full aspect-[9/16] rounded-[2.5rem] border-[8px] border-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-hidden bg-zinc-900">
            <Image 
              src="https://images.unsplash.com/photo-1556742049-0c2eee77fc2e?w=600&auto=format&fit=crop"
              alt="App Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-4 right-4">
              <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Account Balance</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">1,250,000 XOF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}