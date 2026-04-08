import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { IndustryIcon } from "@/components/ui/industry-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { getIndustries, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Service } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Industries",
  description:
    "Explore the industries Auxano supports across corporate offices, healthcare, education, government, logistics, retail, hospitality, and other operationally demanding environments.",
  path: "/industries",
});

function getPrimaryServices(industryServiceSlugs: string[], services: Service[]) {
  return industryServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
}

export default async function IndustriesPage() {
  const [industries, services] = await Promise.all([getIndustries(), getServices()]);

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Industry Focus"
            title="Built for environments where infrastructure, security, and uptime carry commercial weight."
            description="Auxano supports sector-specific environments with solution stacks shaped around visibility, control, continuity, and cleaner technical handover."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
            <ButtonLink href="/estimate" variant="secondary">
              Estimate Project Scope
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Sectors"
            title="Twelve industry environments, each with a dedicated conversion page."
            description="Each sector page maps operating pressure to relevant services, proof, and a clearer consultation path."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry) => {
              const primaryServices = getPrimaryServices(industry.primaryServiceSlugs, services);

              return (
                <Link
                  key={industry.slug}
                  href={industry.href}
                  className="group rounded-[1.85rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)] transition hover:-translate-y-1 hover:border-[color:rgba(47,107,255,0.24)] hover:shadow-[0_24px_60px_rgba(11,18,32,0.08)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] text-[var(--color-ink)]">
                    <IndustryIcon name={industry.icon} className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {industry.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {industry.shortDescription}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {primaryServices.slice(0, 2).map((service) => (
                      <span
                        key={service.slug}
                        className="rounded-full border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-3 py-2 text-xs font-medium text-[var(--color-ink)]"
                      >
                        {service.title}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex text-sm font-semibold text-[var(--color-electric)]">
                    Explore industry
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="rounded-[2.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-ink)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(11,18,32,0.2)] sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
            Sector Planning
          </p>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Need the right industry page turned into a live commercial funnel?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
            Auxano can scope the right service stack, proof structure, and consultation path around the environment you are targeting first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
            <ButtonLink href="/estimate" variant="secondary">
              Estimate Project Scope
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
