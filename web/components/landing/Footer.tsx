"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IconBrandLinkedin, IconBrandTwitter, IconMail } from "@tabler/icons-react";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16">
      <div className="container px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="relative w-12 h-12 mb-4">
              <Image 
                src="/logo.png" 
                alt="CoopLedger" 
                fill
                className="object-contain"
              />
            </div>
            <p className="text-zinc-300 italic mb-4">
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
              <a 
                href="https://twitter.com/coopledger" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#1da1f2] hover:text-white transition-all"
              >
                <IconBrandTwitter size={20} />
              </a>
              <a 
                href="mailto:contact@coopledger.tg"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <IconMail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("Footer.links.product")}</h3>
            <ul className="space-y-2">
              <li><a href="#solution" className="hover:text-white transition-colors">{t("Footer.links.solution")}</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">{t("Footer.links.features")}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{t("Footer.links.how")}</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">{t("Footer.links.partners")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("Footer.links.company")}</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">{t("Footer.links.about")}</a></li>
              <li><a href="#use-cases" className="hover:text-white transition-colors">{t("Footer.links.use_cases")}</a></li>
              <li><a href="mailto:contact@coopledger.tg" className="hover:text-white transition-colors">{t("Footer.links.contact")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("Footer.links.legal")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">{t("Footer.links.privacy")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("Footer.links.terms")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("Footer.links.cookies")}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>{t("Footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}