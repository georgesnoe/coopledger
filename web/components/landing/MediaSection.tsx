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
    embed: "https://www.youtube.com/embed/R5Z9lsuZ3bA",
  },
  {
    id: "coops",
    embed: "https://www.youtube.com/embed/pdTfErISLx0",
  },
];

export function MediaSection() {
  const t = useTranslations();

  return (
    <section id="media" className="py-20 sm:py-32 bg-zinc-50/80 dark:bg-zinc-900/40">
      <div className="container px-4 sm:px-6 space-y-14">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{t("Media.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("Media.description")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {videos.map((video) => (
            <article key={video.id} className="rounded-3xl border border-border overflow-hidden bg-background shadow-xl">
              <div className="aspect-video">
                <iframe
                  src={video.embed}
                  title={t(`Media.videos.${video.id}.title`)}
                  className="w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
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
            <article key={item.id} className="group rounded-3xl border border-border bg-background overflow-hidden">
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
