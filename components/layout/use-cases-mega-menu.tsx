"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Container } from "@/components/ui/container";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { UseCaseGroup, UseCaseProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

type UseCasesMegaMenuProps = {
  groups: UseCaseGroup[];
  useCases: UseCaseProfile[];
  active?: boolean;
};

function getGroupSections(activeGroup: UseCaseGroup, useCases: UseCaseProfile[]) {
  return activeGroup.sections
    .map((section) => ({
      ...section,
      items: useCases.filter(
        (useCase) =>
          useCase.group === activeGroup.id && useCase.menuSection === section.id,
      ),
    }))
    .filter((section) => section.items.length > 0);
}

export function UseCasesMegaMenu({
  groups,
  useCases,
  active = false,
}: UseCasesMegaMenuProps) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id ?? "");

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const sections = useMemo(
    () => (activeGroup ? getGroupSections(activeGroup, useCases) : []),
    [activeGroup, useCases],
  );

  if (!activeGroup) {
    return null;
  }

  const columnsClassName =
    sections.length >= 4
      ? "xl:grid-cols-4"
      : sections.length === 3
        ? "lg:grid-cols-3"
        : sections.length === 2
          ? "lg:grid-cols-2"
          : "lg:grid-cols-1";

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
        Use Cases
      </NavigationMenuTrigger>
      <NavigationMenuContent className="fixed inset-x-0 top-20 mt-0 w-full">
        <div className="border-t border-[color:rgba(11,18,32,0.08)] bg-[color:rgba(255,255,255,0.98)] shadow-[0_28px_70px_rgba(11,18,32,0.12)] backdrop-blur-xl">
          <Container className="grid items-start gap-8 py-8 lg:grid-cols-[190px_minmax(0,1fr)]">
            <div className="border-b border-[color:rgba(11,18,32,0.08)] pb-6 lg:min-h-[25rem] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <p className="pt-1 text-[2rem] font-semibold tracking-[-0.05em] text-[var(--color-electric)]">
                Use Cases
              </p>
              <div className="mt-8 space-y-3">
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

            <div className={cn("grid gap-8", columnsClassName)}>
              {sections.map((section) => (
                <div key={section.id}>
                  <p className="text-sm font-semibold text-[var(--color-ink)]">
                    {section.title}
                  </p>
                  <div className="mt-4 grid gap-3">
                    {section.items.map((useCase) => (
                      <NavigationMenuLink
                        key={useCase.slug}
                        asChild
                        className="min-h-[3.25rem] rounded-[0.95rem] bg-[color:rgba(11,18,32,0.04)] px-4 py-3 text-[0.98rem] font-medium leading-snug text-[var(--color-ink)] transition-colors duration-200 hover:bg-[color:rgba(11,18,32,0.06)] hover:text-[var(--color-electric)]"
                      >
                        <Link href={useCase.href}>{useCase.title}</Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
