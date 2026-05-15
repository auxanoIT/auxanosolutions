"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-b border-[color:rgba(11,18,32,0.08)] bg-white"
        >
          <Container className="grid min-h-[17.5rem] items-start gap-8 py-10 lg:grid-cols-[185px_minmax(0,1fr)]">
            <div className="min-h-[12rem] border-r border-[color:rgba(11,18,32,0.12)] pr-7">
              <div className="space-y-2">
                {groups.map((group) => {
                  const isActive = group.id === activeGroup.id;

                  return (
                    <button
                      key={group.id}
                      type="button"
                      onMouseEnter={() => setActiveGroupId(group.id)}
                      onFocus={() => setActiveGroupId(group.id)}
                      onClick={() => setActiveGroupId(group.id)}
                      className={cn(
                        "block w-full text-left text-[0.95rem] font-semibold leading-tight transition-colors",
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

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeGroup.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="grid auto-rows-[3.5rem] grid-cols-4 gap-3"
              >
                {activeGroup.links.map((link) => (
                  <NavigationMenuLink
                    key={link.id}
                    asChild
                    className="group rounded-md bg-[color:rgba(247,249,252,0.92)] transition-colors duration-100 hover:bg-[color:rgba(234,240,246,0.98)]"
                  >
                    <Link
                      href={link.href}
                      className="flex h-full min-w-0 items-center px-4 text-[0.95rem] font-medium leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-electric)]"
                    >
                      {link.label}
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
