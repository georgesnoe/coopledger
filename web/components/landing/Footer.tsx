"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconBrandLinkedin } from "@tabler/icons-react";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16">
      <div className="container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-white">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="CoopLedger" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">CoopLedger</span>
            </div>
            <p className="text-lg font-medium text-zinc-100 italic">
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

          <div className="bg-zinc-800/50 p-8 rounded-3xl border border-zinc-700 space-y-6">
            <h3 className="text-xl font-bold text-white">
              {t("Footer.contact_title")}
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder={t("Footer.contact_name")} 
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <input 
                  type="email" 
                  placeholder={t("Footer.contact_email")} 
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <input 
                type="text" 
                placeholder={t("Footer.contact_placeholder")} 
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <textarea 
                placeholder={t("Footer.contact_message")} 
                rows={3} 
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <Button className="w-full rounded-full bg-[#7cc6fe] text-white hover:bg-[#6bb5ef] font-bold py-6 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02]">
                {t("Footer.contact_button")}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>{t("Footer.copyright")}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t("Footer.links.conditions")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("Footer.links.privacy")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("Footer.links.contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
