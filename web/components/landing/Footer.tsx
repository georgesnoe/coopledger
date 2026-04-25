"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconBrandLinkedin } from "@tabler/icons-react";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12 sm:py-16">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3 text-white">
              <div className="relative w-8 sm:w-10 h-8 sm:h-10">
                <Image 
                  src="/logo.png" 
                  alt="CoopLedger" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight">CoopLedger</span>
            </div>
            <p className="text-base sm:text-lg font-medium text-zinc-100 italic">
              <q>{t("Footer.slogan")}</q>
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/miabe-hackathon/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all"
              >
                <IconBrandLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="bg-zinc-800/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-700 space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {t("Footer.contact_title")}
            </h3>
            <form className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input 
                  type="text" 
                  placeholder={t("Footer.contact_name")} 
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm sm:text-base"
                />
                <input 
                  type="email" 
                  placeholder={t("Footer.contact_email")} 
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm sm:text-base"
                />
              </div>
              <input 
                type="text" 
                placeholder={t("Footer.contact_placeholder")} 
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm sm:text-base"
              />
              <textarea 
                placeholder={t("Footer.contact_message")} 
                rows={3} 
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm sm:text-base"
              />
              <Button className="w-full rounded-full bg-[#7cc6fe] text-white hover:bg-[#6bb5ef] font-bold py-3 sm:py-6 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02]">
                {t("Footer.contact_button")}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>{t("Footer.copyright")}</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">{t("Footer.links.conditions")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("Footer.links.privacy")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("Footer.links.contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}