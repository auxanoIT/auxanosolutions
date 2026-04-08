"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

import { IndustriesMegaMenu } from "@/components/layout/industries-mega-menu";
import { MobileNavigationSheet } from "@/components/layout/mobile-navigation-sheet";
import { ResourcesMegaMenu } from "@/components/layout/resources-mega-menu";
import { SolutionsMegaMenu } from "@/components/layout/solutions-mega-menu";
import { UseCasesMegaMenu } from "@/components/layout/use-cases-mega-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type {
  IndustryProfile,
  NavItem,
  ResourceGroup,
  Service,
  SolutionCategory,
  UseCaseGroup,
  UseCaseProfile,
} from "@/lib/types";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  navigation: NavItem[];
  solutionCategories: SolutionCategory[];
  useCaseGroups: UseCaseGroup[];
  useCases: UseCaseProfile[];
  industries: IndustryProfile[];
  resourceGroups: ResourceGroup[];
  services: Service[];
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({
  navigation,
  solutionCategories,
  useCaseGroups,
  useCases,
  industries,
  resourceGroups,
  services,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:rgba(11,18,32,0.08)] bg-[color:rgba(247,250,255,0.88)] backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--color-electric),var(--color-cyan))] text-lg font-semibold text-white shadow-[0_20px_40px_rgba(47,107,255,0.28)]">
            A
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Auxano
            </p>
            <p className="truncate text-sm text-[var(--color-muted)]">
              IT, Security, and Infrastructure
            </p>
          </div>
        </Link>

        <div className="hidden flex-1 justify-center lg:flex">
          <NavigationMenu delayDuration={80} skipDelayDuration={140}>
            <NavigationMenuList>
              {navigation.map((item) => {
                const active =
                  item.kind === "solutions"
                    ? pathname.startsWith("/services")
                    : item.kind === "useCases"
                      ? pathname.startsWith("/use-cases")
                    : item.kind === "industries"
                      ? pathname.startsWith("/industries")
                    : item.kind === "resources"
                      ? pathname.startsWith("/resources")
                    : isActivePath(pathname, item.href);

                if (item.kind === "solutions") {
                  return (
                    <SolutionsMegaMenu
                      key={item.label}
                      categories={solutionCategories}
                      services={services}
                      active={active}
                    />
                  );
                }

                if (item.kind === "industries") {
                  return (
                    <IndustriesMegaMenu
                      key={item.label}
                      industries={industries}
                      active={active}
                    />
                  );
                }

                if (item.kind === "useCases") {
                  return (
                    <UseCasesMegaMenu
                      key={item.label}
                      groups={useCaseGroups}
                      useCases={useCases}
                      active={active}
                    />
                  );
                }

                if (item.kind === "resources") {
                  return (
                    <ResourcesMegaMenu
                      key={item.label}
                      groups={resourceGroups}
                      active={active}
                    />
                  );
                }

                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-[var(--color-muted)]",
                        active &&
                          "bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(11,18,32,0.08)]",
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/estimate" variant="ghost">
            Estimate Cost
          </ButtonLink>
          <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
        </div>

        <div className="lg:hidden">
          <MobileNavigationSheet
            open={open}
            setOpen={setOpen}
            navigation={navigation}
            categories={solutionCategories}
            useCaseGroups={useCaseGroups}
            useCases={useCases}
            industries={industries}
            resourceGroups={resourceGroups}
            services={services}
            trigger={
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:rgba(11,18,32,0.08)] bg-white",
                  open && "border-[color:rgba(47,107,255,0.22)] text-[var(--color-electric)]",
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            }
          />
        </div>
      </Container>
    </header>
  );
}
