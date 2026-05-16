"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { ServiceShowcaseSection } from "@/lib/types";

type ServiceShowcaseProps = {
  section: ServiceShowcaseSection;
};

const SCROLL_EDGE_TOLERANCE = 2;

export function ServiceShowcase({ section }: ServiceShowcaseProps) {
  const headingId = useId();
  const shouldReduceMotion = useReducedMotion();
  const desktopScrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const didDragRef = useRef(false);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const syncScrollControls = useCallback(() => {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    setCanScrollPrevious(scroller.scrollLeft > SCROLL_EDGE_TOLERANCE);
    setCanScrollNext(
      scroller.scrollLeft < maxScrollLeft - SCROLL_EDGE_TOLERANCE,
    );
  }, []);

  useEffect(() => {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    syncScrollControls();

    const observer = new ResizeObserver(() => {
      syncScrollControls();
    });

    observer.observe(scroller);
    scroller.addEventListener("scroll", syncScrollControls, { passive: true });

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", syncScrollControls);
    };
  }, [syncScrollControls]);

  function scrollDesktopShowcase(direction: "previous" | "next") {
    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left:
        direction === "previous"
          ? -scroller.clientWidth * 0.82
          : scroller.clientWidth * 0.82,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const target = event.target;

    if (
      target instanceof Element &&
      target.closest("a, button")
    ) {
      return;
    }

    const scroller = desktopScrollerRef.current;

    if (!scroller) {
      return;
    }

    didDragRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = scroller.scrollLeft;
    setIsDragging(true);
    scroller.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = desktopScrollerRef.current;

    if (!isDragging || !scroller) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;

    if (Math.abs(deltaX) > 4) {
      didDragRef.current = true;
    }

    scroller.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  }

  function endPointerDrag(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = desktopScrollerRef.current;

    if (scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  }

  if (!section.items.length) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-[#eef2f7] py-14 md:bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] md:py-20 lg:py-24">
      <Container>
        <div className="md:hidden">
          <h2 className="text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--color-ink)]">
            {section.title}
          </h2>
          {section.description ? (
            <p className="mt-3 text-[1.05rem] leading-7 text-[var(--color-ink)]/80">
              {section.description}
            </p>
          ) : null}
        </div>

        <div className="-mx-5 mt-8 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          <div
            className="flex snap-x snap-mandatory gap-4"
            aria-label={`${section.title} services`}
          >
            {section.items.map((item) => (
              <article
                key={item.id}
                className="w-[78vw] max-w-[22rem] shrink-0 snap-start overflow-hidden rounded-md bg-white shadow-[0_18px_48px_rgba(10,48,71,0.08)]"
              >
                <div className="relative aspect-[1.08] bg-[#dde4ec]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="78vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(10,48,71,0.08))]" />
                </div>
                <div className="p-7">
                  <h3 className="text-[1.65rem] font-semibold leading-tight tracking-[-0.04em] text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 min-h-[8.5rem] text-[1.05rem] leading-8 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                  <ButtonLink
                    href={item.ctaHref}
                    variant="secondary"
                    className="mt-6 !border-transparent !bg-[#07121c] !px-6 !py-3 !text-sm !font-semibold !text-white shadow-none hover:!border-transparent hover:!bg-[#0f2335] hover:!text-white"
                  >
                    {item.ctaLabel}
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto hidden max-w-4xl text-center md:block">
          <h2
            id={headingId}
            className="text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-4xl lg:text-5xl"
          >
            {section.title}
          </h2>
        </div>

        <div className="mt-14 hidden md:block">
          <div className="relative">
            <div
              ref={desktopScrollerRef}
              className="cursor-grab overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
              role="region"
              aria-labelledby={headingId}
              aria-roledescription="carousel"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endPointerDrag}
              onPointerCancel={endPointerDrag}
              onPointerLeave={(event) => {
                if (isDragging) {
                  endPointerDrag(event);
                }
              }}
              onClickCapture={(event) => {
                if (didDragRef.current) {
                  event.preventDefault();
                  event.stopPropagation();
                  didDragRef.current = false;
                }
              }}
            >
              <div className="flex snap-x snap-mandatory gap-6">
                {section.items.map((item) => (
                  <article
                    key={item.id}
                    className="group flex h-full w-[calc((100%_-_1.5rem)/2)] shrink-0 snap-start flex-col xl:w-[calc((100%_-_4.5rem)/4)]"
                  >
                    <div className="relative aspect-[0.84] overflow-hidden rounded-[1.8rem] bg-[var(--color-cloud)] shadow-[0_24px_60px_rgba(11,18,32,0.1)]">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 92vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        draggable={false}
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
            </div>

            {canScrollPrevious ? (
              <button
                type="button"
                onClick={() => scrollDesktopShowcase("previous")}
                aria-label="Show previous services"
                className="absolute left-0 top-[38%] z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-[color:rgba(10,48,71,0.14)] bg-white/95 text-[#0A3047] shadow-[0_12px_30px_rgba(10,48,71,0.16)] transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3047]/25"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : null}

            {canScrollNext ? (
              <button
                type="button"
                onClick={() => scrollDesktopShowcase("next")}
                aria-label="Show more services"
                className="absolute right-0 top-[38%] z-10 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-[#0A3047] text-white shadow-[0_12px_30px_rgba(10,48,71,0.22)] transition duration-200 hover:bg-[#0d3c58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3047]/25"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
