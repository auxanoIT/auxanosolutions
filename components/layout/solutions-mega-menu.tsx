"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Container } from "@/components/ui/container";
import type { Service, SolutionCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type SolutionsMegaMenuProps = {
  categories: SolutionCategory[];
  services: Service[];
  active?: boolean;
};

function orderedServices(activeCategory: SolutionCategory, services: Service[]) {
  return activeCategory.serviceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
}

export function SolutionsMegaMenu({
  categories,
  services,
  active = false,
}: SolutionsMegaMenuProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "");

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  const activeServices = useMemo(
    () => (activeCategory ? orderedServices(activeCategory, services) : []),
    [activeCategory, services],
  );

  if (!activeCategory) {
    return null;
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-[var(--color-muted)]",
          active && "bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(11,18,32,0.08)]",
        )}
        onMouseEnter={() => setActiveCategoryId(categories[0]?.id ?? "")}
        onFocus={() => setActiveCategoryId(categories[0]?.id ?? "")}
      >
        Solutions
      </NavigationMenuTrigger>
      <NavigationMenuContent className="fixed inset-x-0 top-20 mt-0 w-full">
        <div className="border-t border-[color:rgba(11,18,32,0.08)] bg-[color:rgba(255,255,255,0.98)] shadow-[0_28px_70px_rgba(11,18,32,0.12)] backdrop-blur-xl">
          <Container className="grid gap-10 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="border-b border-[color:rgba(11,18,32,0.08)] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Solutions
              </p>
              <div className="mt-4 space-y-1">
                {categories.map((category) => {
                  const isActive = category.id === activeCategory.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onMouseEnter={() => setActiveCategoryId(category.id)}
                      onFocus={() => setActiveCategoryId(category.id)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition",
                        isActive
                          ? "bg-[var(--color-cloud)] text-[var(--color-ink)]"
                          : "text-[var(--color-muted)] hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]",
                      )}
                    >
                      <span className="text-sm font-semibold">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(290px,340px)_1fr]">
              <Link
                href={activeCategory.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(11,18,32,0.08)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-[color:rgba(11,18,32,0.08)]">
                  <Image
                    src={activeCategory.featuredImage.src}
                    alt={activeCategory.featuredImage.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                    {activeCategory.formalTitle}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {activeCategory.featuredTitle}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-electric)]">
                    View category
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>

              <div className="grid max-h-[29rem] gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
                {activeServices.map((service) => (
                  <NavigationMenuLink
                    key={service.slug}
                    asChild
                    className="group rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[color:rgba(47,107,255,0.22)] hover:shadow-[0_18px_45px_rgba(11,18,32,0.08)]"
                  >
                    <Link href={`/services/${service.slug}`}>
                      <div className="flex gap-4">
                        <div className="relative h-18 w-22 shrink-0 overflow-hidden rounded-[1rem] bg-[var(--color-cloud)]">
                          <Image
                            src={service.navImage.src}
                            alt={service.navImage.alt}
                            fill
                            sizes="88px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-[var(--color-ink)] transition group-hover:text-[var(--color-electric)]">
                            {service.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
