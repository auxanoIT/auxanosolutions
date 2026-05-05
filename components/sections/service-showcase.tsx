"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { ServiceShowcaseItem, ServiceShowcaseSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type ServiceShowcaseProps = {
  section: ServiceShowcaseSection;
};

const DESKTOP_CARD_COUNT = 4;
const TABLET_CARD_COUNT = 2;
const MOBILE_CARD_COUNT = 1;
const AUTOPLAY_DELAY_MS = 4600;
const CARD_GAP_PX = 24;

function getCardsPerPage(width: number) {
  if (width >= 1280) {
    return DESKTOP_CARD_COUNT;
  }

  if (width >= 768) {
    return TABLET_CARD_COUNT;
  }

  return MOBILE_CARD_COUNT;
}

function buildWindowItems(
  items: ServiceShowcaseItem[],
  startIndex: number,
  count: number,
) {
  const windowItems: ServiceShowcaseItem[] = [];

  for (let index = 0; index < count; index += 1) {
    const itemIndex = (startIndex + index) % items.length;
    const item = items[itemIndex];

    if (item) {
      windowItems.push(item);
    }
  }

  return windowItems;
}

export function ServiceShowcase({ section }: ServiceShowcaseProps) {
  const headingId = useId();
  const shouldReduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const prevAnimationFrameRef = useRef<number | null>(null);
  const [cardsPerPage, setCardsPerPage] = useState(DESKTOP_CARD_COUNT);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const isCarouselActive = section.items.length > DESKTOP_CARD_COUNT;
  const isDesktopViewport = cardsPerPage === DESKTOP_CARD_COUNT;
  const visibleIndex = activeIndex >= section.items.length ? 0 : activeIndex;
  const stepWidth = cardsPerPage
    ? (viewportWidth - CARD_GAP_PX * (cardsPerPage - 1)) / cardsPerPage +
      CARD_GAP_PX
    : 0;
  const renderStartIndex =
    direction === "prev"
      ? (visibleIndex - 1 + section.items.length) % section.items.length
      : visibleIndex;
  const renderedItems = isCarouselActive
    ? buildWindowItems(section.items, renderStartIndex, cardsPerPage + 1)
    : section.items;

  useEffect(() => {
    const syncCardsPerPage = () => {
      setCardsPerPage(getCardsPerPage(window.innerWidth));
    };

    syncCardsPerPage();
    window.addEventListener("resize", syncCardsPerPage);

    return () => {
      window.removeEventListener("resize", syncCardsPerPage);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (prevAnimationFrameRef.current) {
        window.cancelAnimationFrame(prevAnimationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const syncViewportWidth = () => {
      setViewportWidth(viewport.clientWidth);
    };

    syncViewportWidth();

    const observer = new ResizeObserver(() => {
      syncViewportWidth();
    });

    observer.observe(viewport);

    return () => {
      observer.disconnect();
    };
  }, []);

  const animateNext = () => {
    if (!isCarouselActive || stepWidth <= 0 || isAnimating) {
      return;
    }

    if (prevAnimationFrameRef.current) {
      window.cancelAnimationFrame(prevAnimationFrameRef.current);
      prevAnimationFrameRef.current = null;
    }

    setDirection("next");
    setIsAnimating(true);
    setIsTransitionEnabled(true);
    setTranslateX(stepWidth);
  };

  const animatePrevious = () => {
    if (!isCarouselActive || stepWidth <= 0 || isAnimating) {
      return;
    }

    if (prevAnimationFrameRef.current) {
      window.cancelAnimationFrame(prevAnimationFrameRef.current);
    }

    setDirection("prev");
    setIsAnimating(true);
    setIsTransitionEnabled(false);
    setTranslateX(stepWidth);

    prevAnimationFrameRef.current = window.requestAnimationFrame(() => {
      prevAnimationFrameRef.current = window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
        setTranslateX(0);
      });
    });
  };

  const advanceTrack = useEffectEvent(() => {
    animateNext();
  });

  useEffect(() => {
    const shouldAutoplay =
      !shouldReduceMotion &&
      !isPaused &&
      !isAnimating &&
      isCarouselActive &&
      !isDesktopViewport &&
      stepWidth > 0;

    if (!shouldAutoplay) {
      return;
    }

    const intervalId = window.setInterval(() => {
      advanceTrack();
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    isAnimating,
    isCarouselActive,
    isDesktopViewport,
    isPaused,
    shouldReduceMotion,
    stepWidth,
  ]);

  if (!section.items.length) {
    return null;
  }

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {section.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#23A3FF]">
              {section.eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-5 text-balance text-4xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-5xl lg:text-6xl"
          >
            {section.title}
          </h2>
        </div>

        <div
          className="mt-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onTouchCancel={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget;

            if (
              !(nextTarget instanceof Node) ||
              !event.currentTarget.contains(nextTarget)
            ) {
              setIsPaused(false);
            }
          }}
        >
          <div className="relative">
            <div
              ref={viewportRef}
              className="overflow-hidden"
              role="region"
              aria-labelledby={headingId}
              aria-roledescription="carousel"
            >
              {isCarouselActive ? (
                <div
                  className={cn(
                    "service-showcase-track flex gap-6",
                    shouldReduceMotion || !isTransitionEnabled
                      ? "transition-none"
                      : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  )}
                  onTransitionEnd={() => {
                    if (!isAnimating) {
                      return;
                    }

                    if (prevAnimationFrameRef.current) {
                      window.cancelAnimationFrame(
                        prevAnimationFrameRef.current,
                      );
                      prevAnimationFrameRef.current = null;
                    }

                    setIsAnimating(false);
                    setIsTransitionEnabled(false);
                    setTranslateX(0);
                    setActiveIndex((currentIndex) =>
                      direction === "prev"
                        ? (currentIndex - 1 + section.items.length) %
                          section.items.length
                        : (currentIndex + 1) % section.items.length,
                    );
                  }}
                >
                  {renderedItems.map((item, index) => (
                    <article
                      key={`${item.id}-${index}`}
                      className="service-showcase-item group flex h-full shrink-0 flex-col"
                    >
                      <div className="relative aspect-[0.84] overflow-hidden rounded-[1.8rem] bg-[var(--color-cloud)] shadow-[0_24px_60px_rgba(11,18,32,0.1)]">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 92vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,48,71,0.04),rgba(10,48,71,0.22))]" />
                      </div>
                      <div className="flex flex-1 flex-col px-1 pt-6">
                        <h3 className="min-h-[4.5rem] text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">
                          {item.title}
                        </h3>
                        <p className="mt-4 min-h-[8rem] text-base leading-8 text-[var(--color-muted)]">
                          {item.description}
                        </p>
                        <div className="mt-auto flex items-center pt-7">
                          <ButtonLink
                            href={item.ctaHref}
                            variant="secondary"
                            className="!rounded-full !border-[color:rgba(10,48,71,0.12)] !bg-white/92 !px-5 !py-3 !text-[1rem] !font-semibold !text-[#0A3047] shadow-[0_14px_34px_rgba(10,48,71,0.08)] hover:!border-[color:rgba(10,48,71,0.28)] hover:!text-[#0A3047]"
                          >
                            <span>{item.ctaLabel}</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </ButtonLink>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="group flex h-full flex-col"
                    >
                      <div className="relative aspect-[0.84] overflow-hidden rounded-[1.8rem] bg-[var(--color-cloud)] shadow-[0_24px_60px_rgba(11,18,32,0.1)]">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 92vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,48,71,0.04),rgba(10,48,71,0.22))]" />
                      </div>
                      <div className="flex flex-1 flex-col px-1 pt-6">
                        <h3 className="min-h-[4.5rem] text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">
                          {item.title}
                        </h3>
                        <p className="mt-4 min-h-[8rem] text-base leading-8 text-[var(--color-muted)]">
                          {item.description}
                        </p>
                        <div className="mt-auto flex items-center pt-7">
                          <ButtonLink
                            href={item.ctaHref}
                            variant="secondary"
                            className="!rounded-full !border-[color:rgba(10,48,71,0.12)] !bg-white/92 !px-5 !py-3 !text-[1rem] !font-semibold !text-[#0A3047] shadow-[0_14px_34px_rgba(10,48,71,0.08)] hover:!border-[color:rgba(10,48,71,0.28)] hover:!text-[#0A3047]"
                          >
                            <span>{item.ctaLabel}</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </ButtonLink>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {isCarouselActive && isDesktopViewport ? (
              <>
                <button
                  type="button"
                  onClick={animatePrevious}
                  aria-label="Show previous service"
                  className="hidden xl:flex absolute left-0 top-[38%] z-10 h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[color:rgba(10,48,71,0.14)] bg-white/95 text-[#0A3047] shadow-[0_12px_30px_rgba(10,48,71,0.16)] transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3047]/25"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={animateNext}
                  aria-label="Show next service"
                  className="hidden xl:flex absolute right-0 top-[38%] z-10 h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-[#0A3047] text-white shadow-[0_12px_30px_rgba(10,48,71,0.22)] transition duration-200 hover:bg-[#0d3c58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3047]/25"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            ) : null}
          </div>

          <style jsx>{`
            .service-showcase-track {
              transform: translateX(-${translateX}px);
            }

            .service-showcase-item {
              width: calc(
                (100% - ${(cardsPerPage - 1) * CARD_GAP_PX}px) / ${cardsPerPage}
              );
            }
          `}</style>
        </div>
      </Container>
    </section>
  );
}
