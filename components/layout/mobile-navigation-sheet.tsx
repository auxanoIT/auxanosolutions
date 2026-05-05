"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button-link";
import { IndustryIcon } from "@/components/ui/industry-icon";
import { UseCaseIcon } from "@/components/ui/use-case-icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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

type MobileNavigationSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navigation: NavItem[];
  categories: SolutionCategory[];
  useCaseGroups: UseCaseGroup[];
  useCases: UseCaseProfile[];
  industries: IndustryProfile[];
  resourceGroups: ResourceGroup[];
  services: Service[];
  trigger: ReactNode;
};

type MobileView = "root" | "solutions" | "useCases" | "industries" | "resources";

function getCategoryServices(category: SolutionCategory, services: Service[]) {
  return category.serviceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
}

function getUseCaseSections(group: UseCaseGroup, useCases: UseCaseProfile[]) {
  return group.sections
    .map((section) => ({
      ...section,
      items: useCases.filter(
        (useCase) =>
          useCase.group === group.id && useCase.menuSection === section.id,
      ),
    }))
    .filter((section) => section.items.length > 0);
}

export function MobileNavigationSheet({
  open,
  setOpen,
  navigation,
  categories,
  useCaseGroups,
  useCases,
  industries,
  resourceGroups,
  services,
  trigger,
}: MobileNavigationSheetProps) {
  const defaultCategoryId = categories[0]?.id ?? "";
  const defaultUseCaseGroupId = useCaseGroups[0]?.id ?? "";
  const defaultResourceGroupId = resourceGroups[0]?.id ?? "";
  const [view, setView] = useState<MobileView>("root");
  const [expandedCategoryId, setExpandedCategoryId] = useState<string>(defaultCategoryId);
  const [expandedUseCaseGroupId, setExpandedUseCaseGroupId] = useState<string>(
    defaultUseCaseGroupId,
  );
  const [expandedResourceGroupId, setExpandedResourceGroupId] = useState<string>(
    defaultResourceGroupId,
  );

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setView("root");
      setExpandedCategoryId(defaultCategoryId);
      setExpandedUseCaseGroupId(defaultUseCaseGroupId);
      setExpandedResourceGroupId(defaultResourceGroupId);
    }
  }

  function openSolutionsView() {
    setExpandedCategoryId(defaultCategoryId);
    setView("solutions");
  }

  function openUseCasesView() {
    setExpandedUseCaseGroupId(defaultUseCaseGroupId);
    setView("useCases");
  }

  function openIndustriesView() {
    setView("industries");
  }

  function openResourcesView() {
    setExpandedResourceGroupId(defaultResourceGroupId);
    setView("resources");
  }

  function goBackToRoot() {
    setView("root");
  }

  const viewOffset = {
    root: "0%",
    solutions: "20%",
    useCases: "40%",
    industries: "60%",
    resources: "80%",
  } satisfies Record<MobileView, string>;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="max-sm:max-w-full overflow-hidden p-0 sm:max-w-[24rem]"
      >
        <div className="relative h-full overflow-hidden">
          <div
            className="flex h-full w-[500%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${viewOffset[view]})` }}
          >
            <section className="flex h-full w-1/5 shrink-0 flex-col bg-white">
              <div className="flex items-center justify-between px-5 pb-4 pt-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--color-electric),var(--color-cyan))] text-sm font-semibold text-white shadow-[0_16px_36px_rgba(47,107,255,0.22)]">
                    A
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                      Auxano
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">Menu</p>
                  </div>
                </div>

                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgba(11,18,32,0.08)] text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-5">
                <div className="border-y border-[color:rgba(11,18,32,0.08)]">
                  {navigation.map((item, index) => {
                    const rowClassName = cn(
                      "flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[var(--color-ink)]",
                      index > 0 && "border-t border-[color:rgba(11,18,32,0.08)]",
                    );

                    if (item.kind === "solutions") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={openSolutionsView}
                          className={rowClassName}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                        </button>
                      );
                    }

                    if (item.kind === "useCases") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={openUseCasesView}
                          className={rowClassName}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                        </button>
                      );
                    }

                    if (item.kind === "industries") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={openIndustriesView}
                          className={rowClassName}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                        </button>
                      );
                    }

                    if (item.kind === "resources") {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          onClick={openResourcesView}
                          className={rowClassName}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-4 w-4 text-[var(--color-muted)]" />
                        </button>
                      );
                    }

                    return (
                      <SheetClose asChild key={item.href}>
                        <Link href={item.href} className={rowClassName}>
                          <span>{item.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>

                <div className="mt-auto grid gap-3 pt-8">
                  <SheetClose asChild>
                    <ButtonLink href="/estimate" variant="secondary" className="w-full">
                      Estimate Cost
                    </ButtonLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <ButtonLink href="/book-consultation" className="w-full">
                      Book Consultation
                    </ButtonLink>
                  </SheetClose>
                </div>
              </div>
            </section>

            <section className="flex h-full w-1/5 shrink-0 flex-col bg-white">
              <div className="grid grid-cols-[40px_1fr_40px] items-center border-b border-[color:rgba(11,18,32,0.08)] px-4 pb-4 pt-5">
                <button
                  type="button"
                  onClick={goBackToRoot}
                  aria-label="Back to menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-center text-sm font-semibold text-[var(--color-ink)]">
                  Solutions
                </p>
                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-5 pt-3">
                <Accordion
                  type="single"
                  collapsible
                  value={expandedCategoryId}
                  onValueChange={setExpandedCategoryId}
                  className="w-full"
                >
                  {categories.map((category) => {
                    const categoryServices = getCategoryServices(category, services);

                    return (
                      <AccordionItem key={category.id} value={category.id}>
                        <AccordionTrigger className="py-5 text-base font-semibold">
                          {category.label}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5">
                          <div className="grid gap-3">
                            <SheetClose asChild>
                              <Link
                                href={category.href}
                                className="overflow-hidden rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] transition hover:border-[color:rgba(47,107,255,0.22)]"
                              >
                                <div className="relative aspect-[16/10] overflow-hidden border-b border-[color:rgba(11,18,32,0.08)]">
                                  <Image
                                    src={category.featuredImage.src}
                                    alt={category.featuredImage.alt}
                                    fill
                                    sizes="320px"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                                    Overview
                                  </p>
                                  <h3 className="mt-3 text-base font-semibold text-[var(--color-ink)]">
                                    {category.formalTitle}
                                  </h3>
                                </div>
                              </Link>
                            </SheetClose>

                            <div className="grid gap-2">
                              {categoryServices.map((service) => (
                                <SheetClose asChild key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="flex items-center gap-3 rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-3 transition hover:border-[color:rgba(47,107,255,0.22)]"
                                  >
                                    <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-[0.9rem] bg-[var(--color-cloud)]">
                                      <Image
                                        src={service.navImage.src}
                                        alt={service.navImage.alt}
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-[var(--color-ink)]">
                                        {service.title}
                                      </p>
                                    </div>
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </section>

            <section className="flex h-full w-1/5 shrink-0 flex-col bg-white">
              <div className="grid grid-cols-[40px_1fr_40px] items-center border-b border-[color:rgba(11,18,32,0.08)] px-4 pb-4 pt-5">
                <button
                  type="button"
                  onClick={goBackToRoot}
                  aria-label="Back to menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-center text-sm font-semibold text-[var(--color-ink)]">
                  Use Cases
                </p>
                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-5 pt-3">
                <SheetClose asChild>
                  <Link
                    href="/use-cases"
                    className="mb-4 inline-flex rounded-[1.2rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-electric)] transition hover:border-[color:rgba(47,107,255,0.22)]"
                  >
                    View all use cases
                  </Link>
                </SheetClose>

                <Accordion
                  type="single"
                  collapsible
                  value={expandedUseCaseGroupId}
                  onValueChange={setExpandedUseCaseGroupId}
                  className="w-full"
                >
                  {useCaseGroups.map((group) => {
                    const sections = getUseCaseSections(group, useCases);

                    return (
                      <AccordionItem key={group.id} value={group.id}>
                        <AccordionTrigger className="py-5 text-base font-semibold">
                          {group.label}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5">
                          <div className="grid gap-4">
                            {sections.map((section) => (
                              <div key={section.id}>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                                  {section.title}
                                </p>
                                <div className="grid gap-2">
                                  {section.items.map((useCase) => (
                                    <SheetClose asChild key={useCase.slug}>
                                      <Link
                                        href={useCase.href}
                                        className="flex items-center gap-4 rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-4 py-3 transition hover:border-[color:rgba(47,107,255,0.22)] hover:bg-white"
                                      >
                                        <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[color:rgba(11,18,32,0.08)] bg-white text-[var(--color-ink)]">
                                          <UseCaseIcon
                                            name={useCase.icon}
                                            className="h-5 w-5"
                                            strokeWidth={1.8}
                                          />
                                        </span>
                                        <span className="text-sm font-semibold text-[var(--color-ink)]">
                                          {useCase.title}
                                        </span>
                                      </Link>
                                    </SheetClose>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </section>

            <section className="flex h-full w-1/5 shrink-0 flex-col bg-white">
              <div className="grid grid-cols-[40px_1fr_40px] items-center border-b border-[color:rgba(11,18,32,0.08)] px-4 pb-4 pt-5">
                <button
                  type="button"
                  onClick={goBackToRoot}
                  aria-label="Back to menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-center text-sm font-semibold text-[var(--color-ink)]">
                  Industries
                </p>
                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-5 pt-3">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="industries-panel"
                  className="w-full"
                >
                  <AccordionItem value="industries-panel">
                    <AccordionTrigger className="py-5 text-base font-semibold">
                      Industries
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <div className="grid gap-2">
                        <SheetClose asChild>
                          <Link
                            href="/industries"
                            className="rounded-[1.2rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-electric)] transition hover:border-[color:rgba(47,107,255,0.22)]"
                          >
                            View all industries
                          </Link>
                        </SheetClose>
                        {industries.map((industry) => (
                          <SheetClose asChild key={industry.slug}>
                            <Link
                              href={industry.href}
                              className="flex items-center gap-4 rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-4 py-3 transition hover:border-[color:rgba(47,107,255,0.22)] hover:bg-white"
                            >
                              <span className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-[color:rgba(11,18,32,0.08)] bg-white text-[var(--color-ink)]">
                                <IndustryIcon
                                  name={industry.icon}
                                  className="h-5 w-5"
                                  strokeWidth={1.8}
                                />
                              </span>
                              <span className="text-sm font-semibold text-[var(--color-ink)]">
                                {industry.title}
                              </span>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>

            <section className="flex h-full w-1/5 shrink-0 flex-col bg-white">
              <div className="grid grid-cols-[40px_1fr_40px] items-center border-b border-[color:rgba(11,18,32,0.08)] px-4 pb-4 pt-5">
                <button
                  type="button"
                  onClick={goBackToRoot}
                  aria-label="Back to menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-center text-sm font-semibold text-[var(--color-ink)]">
                  Resources
                </p>
                <SheetClose asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-muted)] transition hover:bg-[color:rgba(11,18,32,0.04)] hover:text-[var(--color-ink)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-5 pt-3">
                <Accordion
                  type="single"
                  collapsible
                  value={expandedResourceGroupId}
                  onValueChange={setExpandedResourceGroupId}
                  className="w-full"
                >
                  {resourceGroups.map((group) => (
                    <AccordionItem key={group.id} value={group.id}>
                      <AccordionTrigger className="py-5 text-base font-semibold">
                        {group.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5">
                        <div className="grid gap-2">
                          {group.links.map((link) => (
                            <SheetClose asChild key={link.id}>
                              <Link
                                href={link.href}
                                className="rounded-[1.15rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[color:rgba(47,107,255,0.22)] hover:bg-white hover:text-[var(--color-electric)]"
                              >
                                {link.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
