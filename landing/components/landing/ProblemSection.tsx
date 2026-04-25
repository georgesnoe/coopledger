"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconFileText, IconAlertTriangle, IconUserMinus, IconBuilding } from "@tabler/icons-react";

const problemData = [
  { id: 'opacity', icon: IconFileText, color: 'text-blue-500' },
  { id: 'risk', icon: IconAlertTriangle, color: 'text-red-500' },
  { id: 'trust', icon: IconUserMinus, color: 'text-orange-500' },
  { id: 'exclusion', icon: IconBuilding, color: 'text-purple-500' },
];

export function ProblemSection() {
  const t = useTranslations();

  return (
    <section id="problem" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg?auto=compress&cs=tinysrgb&w=1400')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-900" />
      </div>
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">
            {t("Problem.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t("Problem.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {problemData.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-background border border-border hover:border-primary transition-all group hover:shadow-xl"
              >
                <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 sm:mb-6 transition-colors group-hover:bg-primary group-hover:text-white ${item.color} group-hover:text-white`}>
                  <Icon size={20} className="sm:size-24" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  {t(`Problem.cards.${item.id}.title`)}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t(`Problem.cards.${item.id}.text`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}