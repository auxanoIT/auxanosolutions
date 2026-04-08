"use client";

import Link from "next/link";

import { IndustryIcon } from "@/components/ui/industry-icon";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Container } from "@/components/ui/container";
import type { IndustryProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

type IndustriesMegaMenuProps = {
  industries: IndustryProfile[];
  active?: boolean;
};

export function IndustriesMegaMenu({
  industries,
  active = false,
}: IndustriesMegaMenuProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-[var(--color-muted)]",
          active && "bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(11,18,32,0.08)]",
        )}
      >
        Industries
      </NavigationMenuTrigger>
      <NavigationMenuContent className="fixed inset-x-0 top-20 mt-0 w-full">
        <div className="border-t border-[color:rgba(11,18,32,0.08)] bg-[color:rgba(255,255,255,0.98)] shadow-[0_28px_70px_rgba(11,18,32,0.12)] backdrop-blur-xl">
          <Container className="grid items-start gap-8 py-8 lg:grid-cols-[170px_minmax(0,1fr)]">
            <div className="border-b border-[color:rgba(11,18,32,0.08)] pb-6 lg:min-h-[27rem] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <p className="pt-1 text-[2rem] font-semibold tracking-[-0.05em] text-[var(--color-electric)]">
                Industries
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {industries.map((industry) => (
                <NavigationMenuLink
                  key={industry.slug}
                  asChild
                  className="min-h-[5.9rem] rounded-[0.95rem] bg-[color:rgba(11,18,32,0.04)] px-8 py-7 transition-colors duration-200 hover:bg-[color:rgba(11,18,32,0.06)]"
                >
                  <Link href={industry.href}>
                    <div className="flex min-h-[2rem] items-center gap-5">
                      <IndustryIcon
                        name={industry.icon}
                        className="h-10 w-10 shrink-0 text-[var(--color-ink)]"
                        strokeWidth={1.6}
                      />
                      <div className="min-w-0">
                        <h4 className="text-[1.35rem] font-medium leading-tight tracking-[-0.04em] text-[var(--color-ink)]">
                          {industry.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </Container>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
