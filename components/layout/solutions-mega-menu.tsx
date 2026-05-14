"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-b border-[color:rgba(11,18,32,0.08)] bg-white"
        >
          <Container className="grid min-h-[23.75rem] gap-8 py-10 lg:grid-cols-[185px_minmax(0,1fr)]">
            <div className="border-r border-[color:rgba(11,18,32,0.12)] pr-7">
              <p className="text-[0.68rem] font-semibold text-[var(--color-muted)]">
                Solution groups
              </p>
              <div className="mt-4 space-y-2">
                {categories.map((category) => {
                  const isActive = category.id === activeCategory.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onMouseEnter={() => setActiveCategoryId(category.id)}
                      onFocus={() => setActiveCategoryId(category.id)}
                      onClick={() => setActiveCategoryId(category.id)}
                      className={cn(
                        "block w-full text-left text-[0.95rem] font-semibold leading-tight transition-colors",
                        isActive
                          ? "text-[var(--color-electric)]"
                          : "text-[var(--color-ink)] hover:text-[var(--color-electric)]",
                      )}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="grid auto-rows-[4rem] grid-cols-4 gap-3"
              >
                <NavigationMenuLink
                  asChild
                  className="group row-span-3 flex flex-col overflow-hidden rounded-md bg-[color:rgba(238,244,255,0.74)] transition-colors hover:bg-[color:rgba(238,244,255,0.96)]"
                >
                  <Link href={activeCategory.href}>
                    <span className="px-4 pt-4 text-[0.95rem] font-medium text-[var(--color-ink)]">
                      Overview
                    </span>
                    <span className="relative mt-auto block h-[9.5rem] w-full overflow-hidden">
                      <Image
                        src={activeCategory.featuredImage.src}
                        alt={activeCategory.featuredImage.alt}
                        fill
                        sizes="255px"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    </span>
                  </Link>
                </NavigationMenuLink>

                {activeServices.map((service) => (
                  <NavigationMenuLink
                    key={service.slug}
                    asChild
                    className="group rounded-md bg-[color:rgba(247,249,252,0.92)] transition-colors hover:bg-[var(--color-cloud)]"
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex min-w-0 items-center justify-between gap-4 px-4 py-3"
                    >
                      <span className="min-w-0 text-[0.95rem] font-medium leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-electric)]">
                        {service.title}
                      </span>
                      <span className="relative h-10 w-12 shrink-0 overflow-hidden rounded-md bg-white/80">
                        <Image
                          src={service.navImage.src}
                          alt={service.navImage.alt}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </motion.div>
            </AnimatePresence>
          </Container>
        </motion.div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
