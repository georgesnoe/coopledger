"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconTrendingUp, IconCoins } from "@tabler/icons-react";

const impactData = [
  { id: 'revenue', icon: IconTrendingUp, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/10' },
  { id: 'funding', icon: IconCoins, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/10' },
];

export function ImpactSection() {
  const t = useTranslations();

  return (
    <section id="impact" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/51947/tractor-agriculture-farm-vehicle-51947.jpeg?auto=compress&cs=tinysrgb&w=1400')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-900" />
      </div>
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            {t("Impact.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t("Impact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {impactData.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`p-8 sm:p-10 rounded-2xl sm:rounded-3xl ${item.bg} border border-border flex items-center gap-6 sm:gap-8 transition-transform hover:-translate-y-2 shadow-sm`}
              >
                <div className={`w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-background flex items-center justify-center shadow-sm ${item.color}`}>
                  <Icon size={24} className="sm:size-32" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {t(`Impact.cards.${item.id}.title`)}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {t(`Impact.cards.${item.id}.text`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}