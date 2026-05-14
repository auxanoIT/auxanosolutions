"use client";

import Image from "next/image";
import { ArrowRight, Eye, RadioTower, ShieldCheck, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import type { IndustryProfile, Service, ServiceNavMedia } from "@/lib/types";
import { cn } from "@/lib/utils";

type IndustryChallengeTabsProps = {
  industry: IndustryProfile;
  services: Service[];
};

type ChallengeTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: ServiceNavMedia;
  icon: LucideIcon;
  points: Array<{
    title: string;
    description: string;
  }>;
};

function getServiceImage(
  services: Service[],
  index: number,
  fallback: ServiceNavMedia,
): ServiceNavMedia {
  const service = services[index];

  if (!service) {
    return fallback;
  }

  return service.capabilitySections?.[0]?.image ?? service.navImage ?? fallback;
}

function buildTabs(industry: IndustryProfile, services: Service[]): ChallengeTab[] {
  const environment = industry.environmentExamples[0] ?? industry.title.toLowerCase();

  return [
    {
      id: "control",
      label: "Control access",
      title: `Protect movement across ${environment.toLowerCase()}`,
      description: industry.challengePoints[0],
      image: industry.heroImage,
      icon: ShieldCheck,
      points: [
        {
          title: "Entry and role clarity",
          description:
            "Define who should enter each space, how access should be granted, and what should be recorded.",
        },
        {
          title: "Visitor-ready operation",
          description:
            "Plan front-of-house, back-of-house, and sensitive zones around daily movement patterns.",
        },
        {
          title: services[0]?.title ?? "Integrated security layer",
          description:
            services[0]?.summary ??
            "Tie the physical environment back to infrastructure that can be maintained after handover.",
        },
      ],
    },
    {
      id: "visibility",
      label: "Improve visibility",
      title: "Know what is happening before issues become expensive",
      description: industry.challengePoints[1],
      image: getServiceImage(services, 1, industry.heroImage),
      icon: Eye,
      points: [
        {
          title: "Coverage without blind spots",
          description:
            "Map entrances, shared zones, perimeter points, and operational areas before devices are installed.",
        },
        {
          title: "Faster review",
          description:
            "Make footage, logs, and network status easier for operators and managers to interpret.",
        },
        {
          title: services[1]?.title ?? "Operational monitoring",
          description:
            services[1]?.summary ??
            "Give teams enough visibility to detect, verify, and respond with confidence.",
        },
      ],
    },
    {
      id: "continuity",
      label: "Support uptime",
      title: "Keep the environment supportable after launch",
      description: industry.challengePoints[2],
      image: getServiceImage(services, 2, industry.heroImage),
      icon: RadioTower,
      points: [
        {
          title: "Documented handover",
          description:
            "Leave behind diagrams, access notes, support paths, and configuration context for future work.",
        },
        {
          title: "Response readiness",
          description:
            "Align support expectations with the actual commercial pressure of the environment.",
        },
        {
          title: services[2]?.title ?? "Managed operating model",
          description:
            services[2]?.summary ??
            "Plan the support rhythm before the site depends on the new systems every day.",
        },
      ],
    },
  ];
}

export function IndustryChallengeTabs({
  industry,
  services,
}: IndustryChallengeTabsProps) {
  const tabs = useMemo(() => buildTabs(industry, services), [industry, services]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const ActiveIcon = activeTab.icon;

  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-electric)]">
            Operating challenges
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-ink)] sm:text-5xl sm:leading-[1.05]">
            Solving {industry.title.toLowerCase()} infrastructure challenges
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            The priority is not only installing technology. It is making access,
            visibility, and support work together in the way the site actually operates.
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden sm:mt-10">
          <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    "min-w-[13.5rem] rounded-full border px-6 py-4 text-sm font-semibold transition sm:min-w-[17rem]",
                    isActive
                      ? "border-[#084d8b] bg-[#084d8b] text-white shadow-[0_18px_45px_rgba(8,77,139,0.18)]"
                      : "border-[color:rgba(11,18,32,0.16)] bg-white text-[var(--color-ink)] hover:border-[color:rgba(8,77,139,0.45)]",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 flex h-[4.1rem] w-14 items-center justify-end bg-[linear-gradient(90deg,rgba(255,255,255,0),#fff_70%)] sm:hidden">
            <ArrowRight className="h-5 w-5 text-[var(--color-ink)]" />
          </div>
        </div>

        <div className="mt-10 grid gap-9 lg:mt-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative min-h-[17rem] overflow-hidden rounded-lg bg-[var(--color-cloud)] shadow-[0_22px_60px_rgba(11,18,32,0.08)] sm:min-h-[24rem] lg:order-2">
            <Image
              key={activeTab.image.src}
              src={activeTab.image.src}
              alt={activeTab.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e9f7f0] text-[#0f766e]">
              <ActiveIcon className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.045em] text-[var(--color-ink)] sm:text-4xl">
              {activeTab.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              {activeTab.description}
            </p>

            <div className="mt-7 grid gap-4">
              {activeTab.points.map((point) => (
                <div key={point.title} className="grid gap-2 border-l-2 border-[#19d5ff] pl-4">
                  <h4 className="text-base font-semibold text-[var(--color-ink)]">
                    {point.title}
                  </h4>
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <ButtonLink href="/book-consultation" variant="ghost" className="mt-7 px-0">
              Connect with an expert
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
