"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const useCases = [
  { id: 'seeds', image: 'https://images.unsplash.com/photo-1574943320219-553eb5f72a88?w=600&auto=format&fit=crop' },
  { id: 'equipment', image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop' },
  { id: 'training', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0b4f6e?w=600&auto=format&fit=crop' },
  { id: 'storage', image: 'https://images.unsplash.com/photo-1580674684081-7618ee9c7c90?w=600&auto=format&fit=crop' },
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