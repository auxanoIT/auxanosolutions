"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBox,
  FiCamera,
  FiClipboard,
  FiCloud,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiGrid,
  FiHardDrive,
  FiLayers,
  FiLifeBuoy,
  FiLock,
  FiMonitor,
  FiPhoneCall,
  FiPrinter,
  FiServer,
  FiSettings,
  FiShare2,
  FiShield,
  FiTool,
  FiUsers,
  FiVideo,
  FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type ServiceCategoryCarouselCard = {
  slug: string;
  title: string;
  href: string;
};

type ServiceCategoryCarouselProps = {
  id: string;
  title: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  cards: ServiceCategoryCarouselCard[];
  reverse?: boolean;
};

const serviceIconMap: Record<string, IconType> = {
  "door-access-control": FiLock,
  "surveillance-system-cctv": FiCamera,
  "structured-lan-cabling": FiShare2,
  "data-centre-services": FiServer,
  "automated-gates-sliding-doors": FiZap,
  "sales-of-it-hardware": FiMonitor,
  "repair-of-it-hardware": FiTool,
  "sales-of-data-centre-consumables": FiBox,
  "audio-visual-services-livestreaming": FiVideo,
  "network-design-with-diagram": FiGitBranch,
  "network-architecture-planning": FiGrid,
  "network-cabling": FiShare2,
  "network-configurations": FiSettings,
  "sales-of-network-equipment": FiHardDrive,
  "office-telephone-system-ip-pbx": FiPhoneCall,
  "desktop-laptop-sales": FiMonitor,
  "computer-installation-setup": FiCpu,
  "server-sales-repair": FiServer,
  "server-storage-provisioning-deployment": FiDatabase,
  "printer-sales-installation": FiPrinter,
  "firewall-sales-licenses": FiShield,
  "antivirus-licenses": FiShield,
  "windows-operating-system-licenses": FiMonitor,
  "server-operating-system-licenses": FiServer,
  "database-software-licenses": FiDatabase,
  "cloud-services-licenses": FiCloud,
  "applications-licenses": FiGrid,
  "it-technical-services": FiLifeBuoy,
  "it-managed-services-staff-outsourcing": FiUsers,
  "it-consultancy-audit-services": FiClipboard,
  "it-project-management": FiLayers,
};

const fallbackIcon = FiGrid;

export function ServiceCategoryCarousel({
  id,
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  cards,
  reverse = false,
}: ServiceCategoryCarouselProps) {
  const [cardsPerView, setCardsPerView] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function syncLayout() {
      const nextCardsPerView = window.innerWidth >= 1024 ? 3 : 1;

      setCardsPerView(nextCardsPerView);
      setActiveIndex((current) =>
        Math.min(current, Math.max(cards.length - nextCardsPerView, 0)),
      );
    }

    syncLayout();
    window.addEventListener("resize", syncLayout);

    return () => {
      window.removeEventListener("resize", syncLayout);
    };
  }, [cards.length]);

  const maxIndex = Math.max(cards.length - cardsPerView, 0);
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < maxIndex;

  const railStyle = useMemo(
    () => ({
      width: `${(cards.length / cardsPerView) * 100}%`,
      transform: `translateX(-${(100 / cards.length) * activeIndex}%)`,
    }),
    [activeIndex, cards.length, cardsPerView],
  );

  function goToIndex(index: number) {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  }

  return (
    <section id={id} className="scroll-mt-28 bg-white py-12 sm:py-16">
      <div
        className={`grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-stretch ${
          reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
        }`}
      >
        <div className="flex min-w-0 flex-col">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <div className="mt-3 space-y-2">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-7 text-[var(--color-ink)]/85 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative mt-4">
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide lg:overflow-hidden">
              <div
                className="flex gap-3 transition-transform duration-500 ease-out sm:gap-4 lg:transition-transform"
                style={cardsPerView === 1 ? {} : railStyle}
              >
                {cards.map((card) => {
                  const Icon = serviceIconMap[card.slug] ?? fallbackIcon;

                  return (
                    <Link
                      key={card.slug}
                      href={card.href}
                      className="group shrink-0 min-h-[10rem] rounded-lg border border-[rgba(14,31,52,0.18)] bg-white p-5 transition hover:border-[#ED6A39] hover:shadow-[0_18px_42px_rgba(237,106,57,0.12)] sm:min-h-[10.75rem] sm:p-6 lg:min-h-[11.5rem]"
                      style={{
                        width: cardsPerView === 1 ? 'calc(100vw - 3rem)' : `calc((100% - ${(cards.length - 1) * 1}rem) / ${cards.length})`,
                        maxWidth: cardsPerView === 1 ? '100%' : 'none',
                      }}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ED6A39] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold leading-tight text-[var(--color-ink)] sm:text-xl">
                        {card.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => goToIndex(activeIndex - 1)}
              disabled={!hasPrev}
              aria-label="Previous service"
              className="absolute left-0 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-[#ED6A39] bg-white text-[#ED6A39] transition hover:bg-[#ED6A39] hover:text-white disabled:cursor-not-allowed disabled:border-[#FDBCA8] disabled:text-[#FDBCA8] disabled:hover:bg-white lg:flex"
            >
              <FiArrowLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => goToIndex(activeIndex + 1)}
              disabled={!hasNext}
              aria-label="Next service"
              className="absolute right-0 top-1/2 z-10 hidden h-14 w-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-[#ED6A39] bg-white text-[#ED6A39] transition hover:bg-[#ED6A39] hover:text-white disabled:cursor-not-allowed disabled:border-[#FDBCA8] disabled:text-[#FDBCA8] disabled:hover:bg-white lg:flex"
            >
              <FiArrowRight className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
            {cards.map((card, index) => (
              <button
                key={card.slug}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={`Go to ${card.title}`}
                className={`h-2 rounded-full transition ${
                  index === activeIndex
                    ? "w-8 bg-[#ED6A39]"
                    : "w-2 bg-[rgba(237,106,57,0.25)]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-[17rem] w-full overflow-hidden rounded-lg sm:min-h-[22rem] lg:min-h-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain sm:object-cover"
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 100vw, calc(100vw - 3rem)"
          />
        </div>
      </div>
    </section>
  );
}
