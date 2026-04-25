"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const useCases = [
  { id: 'seeds', image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'equipment', image: 'https://images.pexels.com/photos/162801/farmer-machine-tractor-farming-162801.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'training', image: 'https://images.pexels.com/photos/8926559/pexels-photo-8926559.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'storage', image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=900' },
];

export function UseCasesSection() {
  const t = useTranslations();

  return (
    <section id="use-cases" className="py-20 sm:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {t("UseCases.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("UseCases.description")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.id} className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <Image 
                  src={useCase.image}
                  alt={t(`UseCases.items.${useCase.id}.title`)}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold mb-1">{t(`UseCases.items.${useCase.id}.title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`UseCases.items.${useCase.id}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}