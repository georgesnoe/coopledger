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
    <section id="problem" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            {t("Problem.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("Problem.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problemData.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="p-8 rounded-3xl bg-background border border-border hover:border-primary transition-all group hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary group-hover:text-white ${item.color} group-hover:text-white`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t(`Problem.cards.${item.id}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
