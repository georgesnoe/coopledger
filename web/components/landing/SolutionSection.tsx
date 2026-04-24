"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconShieldCheck, IconCheck, IconLayoutDashboard } from "@tabler/icons-react";

const solutionPillars = [
  { id: 'ledger', icon: IconShieldCheck, color: 'bg-blue-500' },
  { id: 'democracy', icon: IconCheck, color: 'bg-green-500' },
  { id: 'visibility', icon: IconLayoutDashboard, color: 'bg-purple-500' },
];

export function SolutionSection() {
  const t = useTranslations();

  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            {t("Solution.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("Solution.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {solutionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className="flex flex-col items-center text-center space-y-6">
                <div className={`w-20 h-20 rounded-full ${pillar.color} text-white flex items-center justify-center shadow-lg ring-8 ring-primary/10 transition-transform hover:scale-110`}>
                  <Icon size={36} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">
                    {t(`Solution.pillars.${pillar.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {t(`Solution.pillars.${pillar.id}.text`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
