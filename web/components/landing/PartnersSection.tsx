"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconBrandGithub } from "@tabler/icons-react";

const partners = [
  { id: 'ministry', name: 'Ministry of Agriculture', logo: '' },
  { id: 'ifad', name: 'IFAD', logo: '' },
  { id: 'giz', name: 'GIZ', logo: '' },
  { id: 'worldbank', name: 'World Bank', logo: '' },
  { id: 'fao', name: 'FAO', logo: '' },
  { id: 'bank', name: 'Togolese Banks', logo: '' },
];

export function PartnersSection() {
  const t = useTranslations();

  return (
    <section id="partners" className="py-20 sm:py-32">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {t("Partners.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("Partners.description")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-2xl flex items-center gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                <IconBrandGithub size={24} className="text-zinc-500" />
              </div>
              <span className="font-medium">{t(`Partners.items.${partner.id}.name`)}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 text-white p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-4">{t("Partners.cta_title")}</h3>
            <p className="text-zinc-300 mb-6">{t("Partners.cta_text")}</p>
            <a 
              href="mailto:contact@coopledger.tg"
              className="inline-flex items-center gap-2 bg-[#7cc6fe] text-white px-6 py-3 rounded-full font-medium hover:bg-[#6bb5ef] transition-colors"
            >
              {t("Partners.cta_button")}
            </a>
          </div>
          
          <div className="bg-[#7cc6fe]/10 p-8 rounded-3xl border border-[#7cc6fe]/20">
            <h3 className="text-xl font-bold mb-4">{t("Partners.support_title")}</h3>
            <p className="text-muted-foreground mb-6">{t("Partners.support_text")}</p>
            <div className="flex flex-wrap gap-2">
              {['funding', 'technical', 'training'].map((type) => (
                <span 
                  key={type}
                  className="bg-[#7cc6fe]/20 text-[#7cc6fe] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {t(`Partners.support_types.${type}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}