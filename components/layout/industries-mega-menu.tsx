"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-b border-[color:rgba(11,18,32,0.08)] bg-white"
        >
          <Container className="grid min-h-[23.75rem] items-start gap-8 py-10 lg:grid-cols-[130px_minmax(0,1fr)]">
            <div className="min-h-[18.25rem] border-r border-[color:rgba(11,18,32,0.12)] pr-7">
              <p className="text-[0.95rem] font-semibold leading-tight text-[var(--color-electric)]">
                Industries
              </p>
            </div>

            <div className="grid auto-rows-[4rem] grid-cols-4 gap-3">
              {industries.map((industry) => (
                <NavigationMenuLink
                  key={industry.slug}
                  asChild
                  className="group rounded-md bg-[color:rgba(247,249,252,0.92)] transition-colors duration-100 hover:bg-[color:rgba(234,240,246,0.98)]"
                >
                  <Link href={industry.href} className="flex h-full min-w-0 items-center gap-4 px-5">
                    <IndustryIcon
                      name={industry.icon}
                      className="h-8 w-8 shrink-0 text-[var(--color-ink)]"
                      strokeWidth={1.45}
                    />
                    <span className="min-w-0 text-[0.95rem] font-medium leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-electric)]">
                      {industry.title}
                    </span>
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </Container>
        </motion.div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
