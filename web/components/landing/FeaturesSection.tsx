"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IconShieldCheck, IconCheck, IconLayoutDashboard, IconWallet, IconFileSearch, IconBell } from "@tabler/icons-react";

const features = [
  { id: 'ledger', icon: IconShieldCheck },
  { id: 'voting', icon: IconCheck },
  { id: 'dashboard', icon: IconLayoutDashboard },
  { id: 'wallet', icon: IconWallet },
  { id: 'audit', icon: IconFileSearch },
  { id: 'alerts', icon: IconBell },
];

export function FeaturesSection() {
  const t = useTranslations();

  return (
    <section id="features" className="py-20 sm:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {t("Features.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("Features.description")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id}
                className="bg-background p-6 rounded-2xl border border-border hover:border-[#7cc6fe] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7cc6fe]/10 text-[#7cc6fe] flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{t(`Features.items.${feature.id}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`Features.items.${feature.id}.text`)}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop"
              alt="Blockchain"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-medium">{t("Features.tech")}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">{t("Features.why_title")}</h3>
            <div className="space-y-4">
              {['security', 'transparency', 'speed', 'cost'].map((reason) => (
                <div key={reason} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-muted-foreground">{t(`Features.why.${reason}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}