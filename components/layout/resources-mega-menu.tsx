"use client";

import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { ResourceGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

type ResourcesMegaMenuProps = {
  groups: ResourceGroup[];
  active?: boolean;
};

export function ResourcesMegaMenu({
  groups,
  active = false,
}: ResourcesMegaMenuProps) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  if (!activeGroup) {
    return null;
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "text-[var(--color-muted)]",
          active &&
            "bg-white text-[var(--color-ink)] shadow-[0_12px_30px_rgba(11,18,32,0.08)]",
        )}
        onMouseEnter={() => setActiveGroupId(groups[0]?.id ?? "")}
        onFocus={() => setActiveGroupId(groups[0]?.id ?? "")}
      >
        Resources
      </NavigationMenuTrigger>
      <NavigationMenuContent className="fixed inset-x-0 top-20 mt-0 w-full">
        <div className="border-t border-[color:rgba(11,18,32,0.08)] bg-[color:rgba(255,255,255,0.98)] shadow-[0_28px_70px_rgba(11,18,32,0.12)] backdrop-blur-xl">
          <Container className="grid items-start gap-8 py-8 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="border-b border-[color:rgba(11,18,32,0.08)] pb-6 lg:min-h-[21rem] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <div className="space-y-3 pt-1">
                {groups.map((group) => {
                  const isActive = group.id === activeGroup.id;

                  return (
                    <button
                      key={group.id}
                      type="button"
                      onMouseEnter={() => setActiveGroupId(group.id)}
                      onFocus={() => setActiveGroupId(group.id)}
                      className={cn(
                        "block w-full text-left text-[1.15rem] font-medium leading-tight tracking-[-0.03em] transition-colors",
                        isActive
                          ? "text-[var(--color-electric)]"
                          : "text-[var(--color-ink)] hover:text-[var(--color-electric)]",
                      )}
                    >
                      {group.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {activeGroup.links.map((link) => (
                <NavigationMenuLink
                  key={link.id}
                  asChild
                  className="min-h-[5rem] rounded-[0.95rem] bg-[color:rgba(11,18,32,0.04)] px-6 py-5 text-[1.02rem] font-medium leading-snug text-[var(--color-ink)] transition-colors duration-200 hover:bg-[color:rgba(11,18,32,0.06)] hover:text-[var(--color-electric)]"
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              ))}
            </div>
          </Container>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
