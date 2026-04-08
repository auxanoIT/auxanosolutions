"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { WistiaPlayer as WistiaPlayerElement } from "@wistia/wistia-player";

import {
  applyDecorativePlayerStyles,
  DecorativeWistiaPlayer,
  type WistiaPlayerEvent,
} from "@/components/ui/decorative-wistia-player";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { HeroSection, HeroVideoSlide } from "@/lib/types";

type HomeHeroProps = {
  section: HeroSection;
};

type SlideSelectorRailProps = {
  slides: HeroVideoSlide[];
  activeIndex: number;
  countdownValue: number;
  onSelect: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  ringRefs: React.MutableRefObject<Array<SVGCircleElement | null>>;
};

const schematicNodes = [
  { id: "core", label: "Core", top: "16%", left: "45%" },
  { id: "cameras", label: "CCTV", top: "34%", left: "76%" },
  { id: "access", label: "Access", top: "66%", left: "71%" },
  { id: "support", label: "Support", top: "70%", left: "21%" },
  { id: "branch", label: "Branch", top: "38%", left: "12%" },
];

const HERO_COUNTDOWN_START = 20;
const SELECTOR_SIZE = 48;
const SELECTOR_STROKE = 2.75;
const SELECTOR_RADIUS = 20;
const SELECTOR_CIRCUMFERENCE = 2 * Math.PI * SELECTOR_RADIUS;

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function getCountdownValue(progress: number) {
  return Math.max(0, HERO_COUNTDOWN_START - Math.floor(progress * HERO_COUNTDOWN_START));
}

export function HomeHero({ section }: HomeHeroProps) {
  if (section.mode === "videoCarousel" && section.slides?.length) {
    return <VideoCarouselHero slides={section.slides} />;
  }

  return <DefaultHomeHero section={section} />;
}

function VideoCarouselHero({
  slides,
}: {
  slides: HeroVideoSlide[];
}) {
  const shouldReduceMotion = useReducedMotion();
  const playerRef = useRef<WistiaPlayerElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageTintRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const ringRefs = useRef<Array<SVGCircleElement | null>>([]);
  const activeIndexRef = useRef(0);
  const pendingAdvanceTimeoutRef = useRef<number | null>(null);
  const syncRequestRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() =>
    typeof document === "undefined" ? true : document.visibilityState === "visible",
  );
  const activeSlide = slides[activeIndex] ?? slides[0];
  const countdownValue = shouldReduceMotion
    ? HERO_COUNTDOWN_START
    : getCountdownValue(progress);

  const clearPendingAdvance = () => {
    if (!pendingAdvanceTimeoutRef.current) {
      return;
    }

    window.clearTimeout(pendingAdvanceTimeoutRef.current);
    pendingAdvanceTimeoutRef.current = null;
  };

  const syncPlayerToSlide = async (index: number, forceRestart = false) => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    const nextSlide = slides[index] ?? slides[0];
    const requestId = ++syncRequestRef.current;

    applyDecorativePlayerStyles(player);

    try {
      await player.pause();

      if (player.mediaId !== nextSlide.wistiaMediaId) {
        await player.replaceWithMedia(nextSlide.wistiaMediaId);
      } else if (forceRestart || player.currentTime > 0) {
        player.currentTime = 0;
      }

      if (syncRequestRef.current !== requestId) {
        return;
      }

      player.muted = true;
      player.currentTime = 0;

      if (shouldReduceMotion || !isDocumentVisible) {
        await player.pause();
        return;
      }

      await player.play();
    } catch {
      if (syncRequestRef.current !== requestId) {
        return;
      }

      if (!shouldReduceMotion && isDocumentVisible) {
        void player.play().catch(() => undefined);
      }
    }
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    if (shouldReduceMotion || !isDocumentVisible) {
      void player.pause().catch(() => undefined);
      return;
    }

    void player.play().catch(() => undefined);
  }, [isDocumentVisible, shouldReduceMotion]);

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }

    void syncPlayerToSlide(activeIndex, true);
    // active slide sync intentionally depends only on slide changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      clearPendingAdvance();
    };
  }, []);

  useLayoutEffect(() => {
    const activeRing = ringRefs.current[activeIndex];

    ringRefs.current.forEach((ring, index) => {
      if (!ring || index === activeIndex) {
        return;
      }

      gsap.set(ring, {
        attr: { "stroke-dashoffset": SELECTOR_CIRCUMFERENCE },
      });
    });

    if (!activeRing) {
      return;
    }

    const ringOffset = shouldReduceMotion
      ? SELECTOR_CIRCUMFERENCE
      : SELECTOR_CIRCUMFERENCE * (1 - clampProgress(progress));

    gsap.to(activeRing, {
      attr: { "stroke-dashoffset": ringOffset },
      duration: shouldReduceMotion ? 0 : 0.18,
      ease: "none",
      overwrite: true,
    });
  }, [activeIndex, progress, shouldReduceMotion]);

  useLayoutEffect(() => {
    if (shouldReduceMotion) {
      gsap.set([headlineRef.current, descriptionRef.current, ctaWrapRef.current], {
        clearProps: "all",
      });
      gsap.set(stageTintRef.current, { clearProps: "all" });
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    timeline
      .fromTo(
        stageTintRef.current,
        { autoAlpha: 0.36 },
        { autoAlpha: 0, duration: 0.75 },
        0,
      )
      .fromTo(
        headlineRef.current,
        { autoAlpha: 0, y: 46 },
        { autoAlpha: 1, y: 0, duration: 0.78 },
        0.08,
      )
      .fromTo(
        descriptionRef.current,
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.64 },
        0.16,
      )
      .fromTo(
        ctaWrapRef.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        0.24,
      );

    return () => {
      timeline.kill();
    };
  }, [activeIndex, shouldReduceMotion]);

  const handleSelectSlide = (index: number) => {
    clearPendingAdvance();
    setProgress(0);

    if (index === activeIndexRef.current) {
      void syncPlayerToSlide(index, true);
      return;
    }

    setActiveIndex(index);
  };

  const handleApiReady = (event: WistiaPlayerEvent) => {
    playerRef.current = event.target;
    applyDecorativePlayerStyles(event.target);
    event.target.muted = true;
    activeIndexRef.current = 0;
    clearPendingAdvance();
    setActiveIndex(0);
    setProgress(0);
    void syncPlayerToSlide(0, true);
  };

  const handleLoadedMetadata = (event: WistiaPlayerEvent) => {
    playerRef.current = event.target;
    applyDecorativePlayerStyles(event.target);

    if (shouldReduceMotion) {
      void event.target.pause().catch(() => undefined);
    }
  };

  const handleTimeUpdate = (event: WistiaPlayerEvent) => {
    if (shouldReduceMotion || !isDocumentVisible) {
      return;
    }

    const duration = event.target.duration;
    const currentTime = event.target.currentTime;

    if (!duration || Number.isNaN(duration)) {
      return;
    }

    setProgress(clampProgress(currentTime / duration));
  };

  const handleEnded = () => {
    if (shouldReduceMotion) {
      setProgress(0);
      return;
    }

    clearPendingAdvance();
    setProgress(1);

    pendingAdvanceTimeoutRef.current = window.setTimeout(() => {
      pendingAdvanceTimeoutRef.current = null;
      setProgress(0);
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 160);
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#041a29] text-white"
    >
      <div className="relative min-h-[16.5rem] sm:min-h-[28rem] lg:min-h-[42rem] xl:min-h-[46rem]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#04182a_0%,#062338_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(25,213,255,0.14),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(47,107,255,0.22),transparent_22%),linear-gradient(90deg,rgba(4,24,39,0.26),rgba(4,24,39,0.12)_34%,rgba(4,24,39,0.54))]" />
        <div className="absolute left-[32%] top-[-11%] h-[132%] w-[46%] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(25,213,255,0.08),transparent_66%)]" />
        <div className="absolute right-[-11%] top-[-22%] h-[94%] w-[34%] rounded-full bg-[radial-gradient(circle,rgba(25,213,255,0.15),transparent_68%)] blur-3xl" />

        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <DecorativeWistiaPlayer
            mediaId={slides[0]?.wistiaMediaId ?? ""}
            autoplay={false}
            muted
            silentAutoplay="allow"
            branding={false}
            bigPlayButton={false}
            controlsVisibleOnLoad={false}
            copyLinkAndThumbnail={false}
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
            preload="metadata"
            className="pointer-events-none absolute inset-0 block h-full w-full"
            style={{ width: "100%", height: "100%" }}
            onApiReady={handleApiReady}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,18,31,0.08)_0%,rgba(3,19,31,0.18)_56%,rgba(4,24,39,0.72)_100%)]" />
        <div
          ref={stageTintRef}
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,34,52,0.44)_0%,rgba(8,34,52,0.26)_56%,rgba(8,34,52,0.62)_100%)]"
        />

        <SlideSelectorRail
          slides={slides}
          activeIndex={activeIndex}
          countdownValue={countdownValue}
          onSelect={handleSelectSlide}
          ringRefs={ringRefs}
          orientation="vertical"
          className="absolute right-5 top-1/2 hidden -translate-y-1/2 lg:flex xl:right-8"
        />
      </div>

      <div className="relative overflow-hidden bg-[linear-gradient(90deg,#07263a_0%,#0a3047_52%,#083148_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(25,213,255,0.32),transparent)]" />
        <div className="absolute left-[34%] top-[-4.25rem] h-40 w-40 rounded-full border border-white/8 sm:h-52 sm:w-52" />

        <Container className="grid gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(21rem,0.84fr)] lg:gap-16 lg:py-12">
          <div>
            <h1
              ref={headlineRef}
              className="max-w-5xl text-balance text-[3.55rem] font-semibold leading-[0.94] tracking-[-0.075em] text-white sm:text-[4.65rem] lg:text-[5.55rem]"
            >
              {activeSlide.headline}
            </h1>
          </div>

          <div className="lg:pt-2">
            <p
              ref={descriptionRef}
              className="max-w-xl text-pretty text-lg leading-8 text-white/88 sm:text-[1.45rem] sm:leading-[1.48] lg:text-[1.1rem] lg:leading-8"
            >
              {activeSlide.description}
            </p>

            <div ref={ctaWrapRef} className="mt-7 flex flex-wrap items-center gap-4">
              <ButtonLink
                href={activeSlide.primaryCta.href}
                variant="secondary"
                className="!border-transparent !bg-white !px-7 !py-3.5 !text-base !font-semibold !text-[#061a28] shadow-[0_22px_55px_rgba(3,18,31,0.22)] hover:!border-transparent hover:!text-[#061a28]"
              >
                {activeSlide.primaryCta.label}
              </ButtonLink>
            </div>

            <SlideSelectorRail
              slides={slides}
              activeIndex={activeIndex}
              countdownValue={countdownValue}
              onSelect={handleSelectSlide}
              ringRefs={ringRefs}
              orientation="horizontal"
              className="mt-8 lg:hidden"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}

function SlideSelectorRail({
  slides,
  activeIndex,
  countdownValue,
  onSelect,
  orientation = "vertical",
  className,
  ringRefs,
}: SlideSelectorRailProps) {
  return (
    <div
      className={cn(
        "z-10 flex items-center",
        orientation === "vertical" ? "flex-col gap-4" : "flex-row gap-3",
        className,
      )}
      aria-label="Homepage hero slides"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Show hero slide ${index + 1}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "group relative flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#082a3f]",
              isActive
                ? "h-12 w-12"
                : "h-8 w-8 transition duration-200 hover:scale-110",
            )}
          >
            {isActive ? (
              <>
                <svg
                  viewBox={`0 0 ${SELECTOR_SIZE} ${SELECTOR_SIZE}`}
                  className="absolute inset-0 -rotate-90"
                  aria-hidden="true"
                >
                  <circle
                    cx={SELECTOR_SIZE / 2}
                    cy={SELECTOR_SIZE / 2}
                    r={SELECTOR_RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={SELECTOR_STROKE}
                  />
                  <circle
                    ref={(node) => {
                      ringRefs.current[index] = node;
                    }}
                    cx={SELECTOR_SIZE / 2}
                    cy={SELECTOR_SIZE / 2}
                    r={SELECTOR_RADIUS}
                    fill="none"
                    stroke="rgba(25,213,255,1)"
                    strokeLinecap="round"
                    strokeWidth={SELECTOR_STROKE}
                    strokeDasharray={SELECTOR_CIRCUMFERENCE}
                    strokeDashoffset={SELECTOR_CIRCUMFERENCE}
                  />
                </svg>
                <span className="absolute inset-[4px] rounded-full border border-white/10 bg-[rgba(6,28,41,0.88)]" />
                <span className="relative text-[0.7rem] font-semibold tabular-nums text-white">
                  {countdownValue}
                </span>
              </>
            ) : (
              <span className="relative h-2.5 w-2.5 rounded-full bg-white/52 transition duration-200 group-hover:bg-white/86" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function DefaultHomeHero({ section }: HomeHeroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || shouldReduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-copy]", {
        opacity: 0,
        y: 22,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from("[data-hero-panel]", {
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from("[data-node]", {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)",
        delay: 0.4,
      });

      gsap.fromTo(
        "[data-line]",
        { scaleX: 0, opacity: 0.24 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.45,
          transformOrigin: "left center",
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(25,213,255,0.28),transparent_28%),radial-gradient(circle_at_95%_10%,rgba(47,107,255,0.24),transparent_22%),linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] pb-20 pt-14 sm:pb-24 sm:pt-18"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div
            data-hero-copy
            className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(11,18,32,0.08)] bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-electric)] shadow-[0_18px_42px_rgba(11,18,32,0.08)]"
          >
            <ShieldCheck className="h-4 w-4" />
            {section.eyebrow}
          </div>
          <h1
            data-hero-copy
            className="mt-8 max-w-3xl text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl lg:text-7xl"
          >
            {section.title}
          </h1>
          <p
            data-hero-copy
            className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl"
          >
            {section.description}
          </p>

          <div data-hero-copy className="mt-6 flex flex-wrap gap-3">
            {section.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[color:rgba(11,18,32,0.08)] bg-white/78 px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div data-hero-copy className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={section.primaryCta.href}>
              {section.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={section.secondaryCta.href} variant="secondary">
              {section.secondaryCta.label}
            </ButtonLink>
          </div>

          <div
            data-hero-copy
            className="mt-10 grid gap-4 border-t border-[color:rgba(11,18,32,0.08)] pt-8 sm:grid-cols-3"
          >
            {section.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/50 bg-white/60 p-5 shadow-[0_20px_45px_rgba(11,18,32,0.06)]"
              >
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          data-hero-panel
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative isolate overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(11,18,32,0.96),rgba(17,26,47,0.92))] p-6 text-white shadow-[0_40px_80px_rgba(11,18,32,0.26)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,213,255,0.22),transparent_30%),radial-gradient(circle_at_90%_18%,rgba(47,107,255,0.35),transparent_26%)]" />
          <div className="relative flex min-h-[34rem] flex-col justify-between rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
                  Integrated Command View
                </p>
                <p className="mt-2 text-sm text-white/72">
                  Support, surveillance, network health, and site readiness in one story.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/72">
                Live rollout
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="relative mx-auto mt-10 h-[20rem] w-full max-w-[30rem]">
              <div
                data-line
                className="absolute left-[18%] top-[38%] h-px w-[31%] bg-[linear-gradient(90deg,rgba(25,213,255,0.1),rgba(25,213,255,1))]"
              />
              <div
                data-line
                className="absolute left-[51%] top-[18%] h-[23%] w-px bg-[linear-gradient(180deg,rgba(25,213,255,1),rgba(25,213,255,0.14))]"
              />
              <div
                data-line
                className="absolute left-[51%] top-[40%] h-px w-[27%] bg-[linear-gradient(90deg,rgba(25,213,255,1),rgba(47,107,255,1))]"
              />
              <div
                data-line
                className="absolute left-[27%] top-[68%] h-px w-[43%] bg-[linear-gradient(90deg,rgba(47,107,255,0.5),rgba(25,213,255,1))]"
              />

              {schematicNodes.map((node) => (
                <div
                  key={node.id}
                  data-node
                  className="absolute"
                  style={{ left: node.left, top: node.top }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(25,213,255,0.6),transparent_70%)] blur-xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/14 bg-[radial-gradient(circle,rgba(47,107,255,0.32),rgba(11,18,32,0.96))] text-center shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
                      <span className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/84">
                        {node.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 pt-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/52">
                  Coverage
                </p>
                <p className="mt-2 text-sm font-medium text-white/82">
                  CCTV, access, and incident visibility designed together.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/52">
                  Operations
                </p>
                <p className="mt-2 text-sm font-medium text-white/82">
                  Support ownership and documentation included from the start.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/52">
                  Visibility
                </p>
                <p className="mt-2 text-sm font-medium text-white/82">
                  Network health and deployment readiness reflected in one model.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
