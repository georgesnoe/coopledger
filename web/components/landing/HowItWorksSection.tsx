"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { IconUsers, IconFileText, IconCheck, IconChartBar } from "@tabler/icons-react";

const steps = [
  { id: 1, icon: IconUsers, key: 'join' },
  { id: 2, icon: IconFileText, key: 'record' },
  { id: 3, icon: IconCheck, key: 'vote' },
  { id: 4, icon: IconChartBar, key: 'track' },
];

export function HowItWorksSection() {
  const t = useTranslations();

  return (
    <section id="how-it-works" className="py-20 sm:py-32">
      <div className="container px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            {t("HowItWorks.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("HowItWorks.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                <div className="bg-background rounded-2xl p-6 border border-border hover:border-[#7cc6fe] transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#7cc6fe]/10 text-[#7cc6fe] flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <div className="text-sm text-[#7cc6fe] font-bold mb-2">{t("HowItWorks.step")} {step.id}</div>
                  <h3 className="text-lg font-bold mb-2">{t(`HowItWorks.steps.${step.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`HowItWorks.steps.${step.key}.text`)}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-zinc-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://videos.pexels.com/video-files/6551440/6551440-hd_1920_1080_25fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-medium">{t("HowItWorks.demo_caption")}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">{t("HowItWorks.benefits_title")}</h3>
            <ul className="space-y-4">
              {['transparency', 'efficiency', 'trust', 'growth'].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-muted-foreground">{t(`HowItWorks.benefits.${benefit}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}