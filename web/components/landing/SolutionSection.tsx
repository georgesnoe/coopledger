"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconShieldCheck, IconCheck, IconLayoutDashboard } from "@tabler/icons-react";
import Image from "next/image";

const solutionPillars = [
  { id: 'ledger', icon: IconShieldCheck, color: 'bg-blue-500' },
  { id: 'democracy', icon: IconCheck, color: 'bg-green-500' },
  { id: 'visibility', icon: IconLayoutDashboard, color: 'bg-purple-500' },
];

export function SolutionSection() {
  const t = useTranslations();

  return (
    <section id="solution" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            {t("Solution.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t("Solution.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {solutionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
                <div className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full ${pillar.color} text-white flex items-center justify-center shadow-lg ring-4 sm:ring-8 ring-primary/10 transition-transform hover:scale-110`}>
                  <Icon size={28} className="sm:size-36" />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    {t(`Solution.pillars.${pillar.id}.title`)}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {t(`Solution.pillars.${pillar.id}.text`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12">
          <div className="relative w-64 sm:w-80 h-40 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border border-border">
            <Image 
              src="https://images.pexels.com/photos/6802046/pexels-photo-6802046.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Blockchain Technology"
              fill
              className="object-cover opacity-80 dark:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-xs sm:text-sm font-medium text-foreground">{t("Solution.blockchain")}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-400/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}