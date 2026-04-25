"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IconTarget, IconHeart, IconUsers, IconBuilding } from "@tabler/icons-react";

export function AboutSection() {
  const t = useTranslations();

  const values = [
    { id: 'mission', icon: IconTarget, key: 'mission' },
    { id: 'vision', icon: IconHeart, key: 'vision' },
    { id: 'values', icon: IconUsers, key: 'values' },
    { id: 'approach', icon: IconBuilding, key: 'approach' },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1524174476329-a6a8d9e1e3d8?w=800&auto=format&fit=crop"
                alt="Togolese farmers"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-32 sm:w-40 h-32 sm:h-40 bg-[#7cc6fe] rounded-2xl shadow-xl flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm text-center px-2">
                {t("About.stats_label")}
              </span>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                {t("About.title")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("About.description")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className="bg-background p-5 sm:p-6 rounded-2xl border border-border"
                  >
                    <Icon size={24} className="text-[#7cc6fe] mb-3" />
                    <h3 className="font-semibold mb-1">{t(`About.items.${item.id}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`About.items.${item.id}.text`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}