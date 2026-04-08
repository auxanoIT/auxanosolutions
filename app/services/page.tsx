import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServices, getSolutionCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Service } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Auxano's full service architecture across infrastructure, networking, hardware systems, software licensing, and managed advisory delivery.",
  path: "/services",
});

const featuredSlugs = [
  "surveillance-system-cctv",
  "network-design-with-diagram",
  "it-managed-services-staff-outsourcing",
];

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([getServices(), getSolutionCategories()]);
  const featured = featuredSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Service Platform"
            title="One solution stack spanning infrastructure, networking, hardware, licensing, and managed delivery."
            description="Auxano's solution architecture is organized so buyers can see both the commercial lead services and the deeper operating capabilities behind them."
          />
          <div className="mt-10 grid gap-4 xl:grid-cols-3">
            {featured.map((service) => (
              <article
                key={service.slug}
                className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_20px_55px_rgba(11,18,32,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                  Featured
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{service.summary}</p>
                <ButtonLink
                  href={`/services/${service.slug}`}
                  variant="ghost"
                  className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
                >
                  View service
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="space-y-16">
          {categories.map((category) => {
            const group = category.serviceSlugs
              .map((slug) => services.find((service) => service.slug === slug))
              .filter((service): service is Service => Boolean(service));

            return (
              <section
                key={category.id}
                id={category.anchorId}
                className="scroll-mt-32 rounded-[2.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_20px_60px_rgba(11,18,32,0.05)] sm:p-8"
              >
                <SectionHeading
                  eyebrow={category.label}
                  title={category.formalTitle}
                  description={category.description}
                />
                <div className="mt-8 grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
                  <article className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                      Category Overview
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                      {category.featuredTitle}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                      {category.featuredDescription}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.slice(0, 4).map((service) => (
                        <span
                          key={service.slug}
                          className="rounded-full border border-[color:rgba(11,18,32,0.08)] bg-white px-3 py-2 text-xs font-medium text-[var(--color-ink)]"
                        >
                          {service.title}
                        </span>
                      ))}
                    </div>
                    <ButtonLink href="/book-consultation" variant="secondary" className="mt-8 w-full">
                      Discuss This Category
                    </ButtonLink>
                  </article>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {group.map((service) => (
                      <article
                        key={service.slug}
                        className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
                      >
                        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                          {service.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                          {service.description}
                        </p>
                        <ul className="mt-6 space-y-3 text-sm text-[var(--color-ink)]">
                          {service.capabilities.slice(0, 3).map((capability) => (
                            <li key={capability} className="flex gap-3">
                              <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                              <span>{capability}</span>
                            </li>
                          ))}
                        </ul>
                        <ButtonLink
                          href={`/services/${service.slug}`}
                          variant="ghost"
                          className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
                        >
                          Read details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </ButtonLink>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </Container>
      </section>
    </>
  );
}
