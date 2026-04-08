"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { NetworkMapSection } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

type NetworkMapProps = {
  section: NetworkMapSection;
};

export function NetworkMap({ section }: NetworkMapProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || shouldReduceMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-map-line]",
        { scaleX: 0, opacity: 0.16 },
        {
          scaleX: 1,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
          },
        },
      );

      gsap.from("[data-map-node]", {
        scale: 0.3,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 68%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section className="bg-[var(--color-ink)] py-20 text-white sm:py-24">
      <div ref={rootRef}>
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
              className="[&>h2]:text-white [&>p]:text-white/70"
            />
            <ul className="mt-8 space-y-4">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-sm leading-7 text-white/80"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(25,213,255,0.22),transparent_24%),radial-gradient(circle_at_85%_15%,rgba(47,107,255,0.28),transparent_22%)]" />
            <div className="relative h-[30rem]">
              <div
                data-map-line
                className="absolute left-[18%] top-[38%] h-px w-[34%] bg-[linear-gradient(90deg,rgba(25,213,255,0.2),rgba(25,213,255,1))]"
              />
              <div
                data-map-line
                className="absolute left-[49%] top-[18%] h-[21%] w-px bg-[linear-gradient(180deg,rgba(25,213,255,1),rgba(25,213,255,0.18))]"
              />
              <div
                data-map-line
                className="absolute left-[49%] top-[40%] h-px w-[28%] bg-[linear-gradient(90deg,rgba(25,213,255,1),rgba(47,107,255,1))]"
              />
              <div
                data-map-line
                className="absolute left-[28%] top-[70%] h-px w-[42%] bg-[linear-gradient(90deg,rgba(47,107,255,0.4),rgba(25,213,255,1))]"
              />

              {section.nodes.map((node) => (
                <div
                  key={node.label}
                  data-map-node
                  className="absolute w-40 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[0_20px_45px_rgba(0,0,0,0.28)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-cyan)]">
                      {node.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/74">{node.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
