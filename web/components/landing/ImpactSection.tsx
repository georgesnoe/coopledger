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
    <section id="impact" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            {t("Impact.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("Impact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {impactData.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`p-10 rounded-3xl ${item.bg} border border-border flex items-center gap-8 transition-transform hover:-translate-y-2 shadow-sm`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-background flex items-center justify-center shadow-sm ${item.color}`}>
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {t(`Impact.cards.${item.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
