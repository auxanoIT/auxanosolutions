"use client";

import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { flushSync } from "react-dom";

import { DecorativeWistiaPlayer } from "@/components/ui/decorative-wistia-player";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { WistiaPlayerEvent } from "@/components/ui/decorative-wistia-player";
import type { CategoryShowcaseSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryShowcaseProps = {
  section: CategoryShowcaseSection;
};

const PANEL_OFFSET = 56;
const PANEL_EXIT_DURATION = 0.18;
const PANEL_ENTER_DURATION = 0.32;
const PANEL_EXIT_OPACITY = 0.34;

export function CategoryShowcase({ section }: CategoryShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const tabsId = useId();
  const activeItem = section.items[activeIndex] ?? section.items[0] ?? null;

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, shouldReduceMotion]);

  useLayoutEffect(() => {
    if (pendingIndex === null || shouldReduceMotion) {
      return;
    }

    const panel = panelRef.current;
    const nextIndex = pendingIndex;

    if (!panel) {
      return;
    }

    const exitOffset = direction === 1 ? -PANEL_OFFSET : PANEL_OFFSET;
    const enterOffset = -exitOffset;

    timelineRef.current?.kill();

    const timeline = gsap.timeline({
      defaults: { overwrite: true },
      onComplete: () => {
        timelineRef.current = null;
        setPendingIndex(null);
        setIsAnimating(false);
        gsap.set(panel, { clearProps: "transform,opacity" });
      },
    });

    timelineRef.current = timeline;

    timeline
      .to(panel, {
        x: exitOffset,
        opacity: PANEL_EXIT_OPACITY,
        duration: PANEL_EXIT_DURATION,
        ease: "power2.in",
      })
      .add(() => {
        flushSync(() => {
          setActiveIndex(nextIndex);
        });

        gsap.set(panel, {
          x: enterOffset,
          opacity: PANEL_EXIT_OPACITY,
        });
      })
      .to(panel, {
        x: 0,
        opacity: 1,
        duration: PANEL_ENTER_DURATION,
        ease: "power3.out",
      });

    return () => {
      timeline.kill();
    };
  }, [direction, pendingIndex, shouldReduceMotion]);

  function handleSelect(index: number) {
    if (index === activeIndex || isAnimating) {
      return;
    }

    if (shouldReduceMotion || !panelRef.current) {
      setActiveIndex(index);
      return;
    }

    setDirection(index > activeIndex ? 1 : -1);
    setPendingIndex(index);
    setIsAnimating(true);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (isAnimating) {
      return;
    }

    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % section.items.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + section.items.length) % section.items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = section.items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    tabRefs.current[nextIndex]?.focus();
    handleSelect(nextIndex);
  }

  function handleVideoReady(event: WistiaPlayerEvent) {
    event.target.endVideoBehavior = "loop";
    void event.target.play().catch(() => {
      // Browsers can still block autoplay in some contexts; muted playback props remain the fallback.
    });
  }

  if (!activeItem) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0b1220_0%,#12365a_44%,#10324a_100%)] py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(25,213,255,0.14),transparent_26%),radial-gradient(circle_at_84%_12%,rgba(47,107,255,0.18),transparent_24%)]" />
      <Container>
        <h2 className="relative max-w-5xl text-balance text-[2rem] font-bold leading-[1.05] tracking-normal text-white sm:text-[2.55rem] lg:text-[3.1rem]">
          {section.title}
        </h2>

        <div className="relative -mx-4 mt-8 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label={section.title}
            className="flex min-w-max gap-3 lg:grid lg:min-w-0 lg:grid-cols-5"
          >
            {section.items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  id={`${tabsId}-tab-${index}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tabsId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  disabled={isAnimating}
                  onClick={() => handleSelect(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "min-w-[13rem] flex-1 rounded-full border px-5 py-3 text-center text-sm font-semibold whitespace-nowrap transition duration-200 lg:min-w-0 lg:w-full",
                    isActive
                      ? "border-[color:rgba(238,244,255,0.95)] bg-[var(--color-cloud)] text-[var(--color-ink)] shadow-[0_18px_42px_rgba(47,107,255,0.18)]"
                      : "border-white/18 bg-[linear-gradient(180deg,rgba(11,18,32,0.42),rgba(11,18,32,0.28))] text-white/72 hover:border-white/28 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] hover:text-white",
                    isAnimating && "cursor-not-allowed opacity-85",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${tabsId}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabsId}-tab-${activeIndex}`}
          tabIndex={0}
          className="mt-8"
        >
          <div
            ref={panelRef}
            className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[0_24px_70px_rgba(11,18,32,0.28)]"
          >
            <div className="grid min-h-[20rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] lg:min-h-[30rem] lg:grid-cols-2">
              <article className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(180deg,rgba(47,107,255,0.18),rgba(25,213,255,0.10),rgba(11,18,32,0.12)),linear-gradient(180deg,#12365a_0%,#0e2d49_100%)] p-6 sm:p-8 lg:p-9">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(25,213,255,0.12),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(47,107,255,0.16),transparent_26%)]" />
                <div>
                  <p className="relative text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-cloud)]/78">
                    {activeItem.label}
                  </p>
                  <h3 className="relative mt-3 max-w-xl text-balance text-2xl font-semibold leading-[1.1] tracking-normal text-white sm:text-[2rem] lg:text-[2.35rem]">
                    {activeItem.title}
                  </h3>
                  <p className="relative mt-4 max-w-xl text-sm leading-7 text-white/82">
                    {activeItem.description}
                  </p>

                  <ul className="relative mt-6 space-y-3">
                    {activeItem.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--color-cyan)]" />
                        <span className="text-xs leading-6 text-white/88 sm:text-sm">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-6">
                  <ButtonLink
                    href={activeItem.ctaHref}
                    variant="secondary"
                    className="!border-transparent !bg-white !px-6 !py-3 !text-sm !font-semibold !text-[var(--color-ink)] shadow-[0_16px_38px_rgba(47,107,255,0.14)] hover:!border-transparent hover:!text-[var(--color-ink)]"
                  >
                    {activeItem.ctaLabel}
                  </ButtonLink>
                </div>
              </article>

              <div className="relative min-h-[18rem] bg-[linear-gradient(180deg,#d9dde4_0%,#cdd5de_100%)] lg:min-h-[30rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.28),transparent_24%),linear-gradient(180deg,rgba(47,107,255,0.05)_0%,rgba(25,213,255,0.04)_45%,rgba(11,18,32,0.08)_100%)]" />
                <div className="relative h-full min-h-[18rem]">
                  <DecorativeWistiaPlayer
                    mediaId={section.wistiaMediaId}
                    autoplay
                    muted
                    silentAutoplay="allow"
                    branding={false}
                    bigPlayButton={false}
                    controlsVisibleOnLoad={false}
                    copyLinkAndThumbnail={false}
                    endVideoBehavior="loop"
                    fullscreenControl={false}
                    playBarControl={false}
                    playPauseControl={false}
                    playPauseNotifier={false}
                    settingsControl={false}
                    volumeControl={false}
                    playbackRateControl={false}
                    transparentLetterbox
                    seo={false}
                    playerColor="19d5ff"
                    preload="auto"
                    onEnded={handleVideoReady}
                    onApiReady={handleVideoReady}
                    onLoadedMetadata={handleVideoReady}
                    className="pointer-events-none absolute inset-0 block h-full w-full"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
