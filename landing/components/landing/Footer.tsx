"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16">
      <div className="container px-4 sm:px-6 space-y-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="space-y-5">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="CoopLedger" fill className="object-contain" />
            </div>
            <p className="text-zinc-200 max-w-xl text-lg italic">
              <q>{t("Footer.slogan")}</q>
            </p>
            <p className="text-sm text-zinc-400 max-w-xl">{t("Footer.form.text")}</p>
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
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-all"
              >
                <IconBrandX size={20} />
              </a>
              <a
                href="mailto:contact@coopledger.tg"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
              >
                <IconMail size={20} />
              </a>
            </div>
          </div>

          <form className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 space-y-4">
            <h3 className="text-white font-semibold text-lg">{t("Footer.form.title")}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={t("Footer.form.name")}
                className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#7cc6fe]"
              />
              <input
                type="email"
                placeholder={t("Footer.form.email")}
                className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#7cc6fe]"
              />
            </div>
            <textarea
              rows={4}
              placeholder={t("Footer.form.message")}
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-[#7cc6fe]"
            />
            <button
              type="button"
              className="inline-flex rounded-full bg-[#7cc6fe] px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-[#69b8ef] transition-colors"
            >
              {t("Footer.form.submit")}
            </button>
          </form>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-zinc-800">
          <div>
            <h3 className="text-white font-semibold mb-4">{t("Footer.links.product")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#solution" className="hover:text-white transition-colors">
                  {t("Footer.links.solution")}
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  {t("Footer.links.features")}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {t("Footer.links.how")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("Footer.links.company")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t("Footer.links.about")}
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">
                  {t("Footer.links.impact")}
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  {t("Footer.links.team")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("Footer.links.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("Footer.links.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("Footer.links.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t("Footer.links.cookies")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-sm border-t border-zinc-800 pt-6">
          <p>{t("Footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
