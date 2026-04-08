import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { IndustryIcon } from "@/components/ui/industry-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getCaseStudies,
  getIndustryBySlug,
  getIndustries,
  getServices,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Service } from "@/lib/types";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

function getMappedServices(serviceSlugs: string[], services: Service[]) {
  return serviceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
}

export async function generateStaticParams() {
  const industries = await getIndustries();

  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    return buildMetadata({
      title: "Industry not found",
      description: "The requested industry page could not be found.",
      path: `/industries/${slug}`,
    });
  }

  return buildMetadata({
    title: industry.title,
    description: industry.heroDescription,
    path: industry.href,
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const [industry, services, caseStudies] = await Promise.all([
    getIndustryBySlug(slug),
    getServices(),
    getCaseStudies(),
  ]);

  if (!industry) {
    notFound();
  }

  const mappedServices = getMappedServices(industry.primaryServiceSlugs, services);
  const relatedCaseStudy = industry.relatedCaseStudySlug
    ? caseStudies.find((item) => item.slug === industry.relatedCaseStudySlug)
    : null;

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Industry
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl">
              {industry.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {industry.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/book-consultation">{industry.ctaLabel}</ButtonLink>
              <ButtonLink href="/estimate" variant="secondary">
                Estimate Project Scope
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] text-[var(--color-ink)]">
              <IndustryIcon name={industry.icon} className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Best Fit
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
              {industry.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              {industry.shortDescription}
            </p>
            <div className="mt-6 grid gap-3">
              {industry.environmentExamples.map((environment) => (
                <div
                  key={environment}
                  className="rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-4 py-3 text-sm font-medium text-[var(--color-ink)]"
                >
                  {environment}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Operating Pressure"
            title="What this environment usually needs solved first"
            description="These pages are structured around real operational pressure, not generic industry labeling."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {industry.challengePoints.map((point) => (
              <article
                key={point}
                className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
              >
                <p className="text-sm leading-7 text-[var(--color-muted)]">{point}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Mapped Solutions"
            title="The services most likely to matter in this sector"
            description="Each industry page maps to a focused service stack instead of showing the full catalog at once."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {mappedServices.map((service) => (
              <article
                key={service.slug}
                className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                  Service
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {service.summary}
                </p>
                <ButtonLink
                  href={`/services/${service.slug}`}
                  variant="ghost"
                  className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
                >
                  View service
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Environment Examples"
              title="Typical operating contexts for this page"
              description="The goal is to help buyers recognize where the service stack fits, not force every environment into the same story."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {industry.environmentExamples.map((environment) => (
              <div
                key={environment}
                className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-5 py-4 text-sm font-medium text-[var(--color-ink)] shadow-[0_16px_40px_rgba(11,18,32,0.06)]"
              >
                {environment}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          {relatedCaseStudy ? (
            <div className="rounded-[2.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-8 shadow-[0_22px_60px_rgba(11,18,32,0.08)]">
              <SectionHeading
                eyebrow="Proof"
                title={relatedCaseStudy.title}
                description={relatedCaseStudy.summary}
              />
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {relatedCaseStudy.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-5"
                  >
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href={`/case-studies/${relatedCaseStudy.slug}`} variant="secondary">
                  Review Case Study
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className="rounded-[2.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-8">
              <SectionHeading
                eyebrow="Delivery Approach"
                title="Where credibility still matters even without a sector-specific case study."
                description="Auxano should still present a grounded operating approach when formal proof is not yet public for a given industry."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  "Survey and scope before procurement decisions are locked in.",
                  "Documented handover so the environment stays supportable after launch.",
                  "Consultation-led design across networking, security, and operational workflows.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-5 text-sm leading-7 text-[var(--color-muted)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="rounded-[2.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-ink)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(11,18,32,0.2)] sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
            Consultation
          </p>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Ready to shape the right {industry.title.toLowerCase()} rollout?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
            Use this page as the starting point for a consultation built around the environment, not a generic service list.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation">{industry.ctaLabel}</ButtonLink>
            <ButtonLink href="/estimate" variant="secondary">
              Estimate Project Scope
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
