"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { IconPlayerPlay } from "@tabler/icons-react";

const gallery = [
  {
    id: "meeting",
    image:
      "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "harvest",
    image:
      "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "logistics",
    image:
      "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const videos = [
  {
    id: "finance",
    poster: "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: "coops",
    poster: "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=1200",
    source:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];

export function MediaSection() {
  const t = useTranslations();

  return (
    <section id="media" className="py-24 sm:py-32 bg-gradient-to-b from-background to-[#eef6ff]/60 dark:to-zinc-950/50">
      <div className="container px-4 sm:px-6 space-y-14">
        <div className="text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center rounded-full border border-[#7cc6fe]/50 bg-[#7cc6fe]/10 px-4 py-1 text-xs font-semibold tracking-wider uppercase text-[#368fcc]">{t("Media.badge")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mt-4 mb-4">{t("Media.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("Media.description")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {videos.map((video) => (
            <article key={video.id} className="rounded-3xl border border-border/70 overflow-hidden bg-background/80 backdrop-blur-sm shadow-[0_14px_60px_rgba(48,74,110,0.12)]">
              <div className="relative aspect-video bg-zinc-950">
                <video className="w-full h-full object-cover" poster={video.poster} controls preload="metadata">
                  <source src={video.source} type="video/mp4" />
                </video>
                <div className="absolute top-4 left-4 pointer-events-none inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  <IconPlayerPlay size={14} />
                  {t("Media.videoLabel")}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">{t(`Media.videos.${video.id}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`Media.videos.${video.id}.text`)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <article key={item.id} className="group rounded-3xl border border-border/70 bg-background/80 backdrop-blur-sm overflow-hidden shadow-[0_14px_60px_rgba(48,74,110,0.08)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={t(`Media.gallery.${item.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-2">{t(`Media.gallery.${item.id}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`Media.gallery.${item.id}.text`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
