import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { UseCaseIcon } from "@/components/ui/use-case-icon";
import {
  getCaseStudies,
  getIndustries,
  getServices,
  getUseCaseBySlug,
  getUseCases,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { IndustryProfile, Service } from "@/lib/types";

type UseCasePageProps = {
  params: Promise<{ slug: string }>;
};

function getMappedServices(serviceSlugs: string[], services: Service[]) {
  return serviceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
}

function getMappedIndustries(
  industrySlugs: string[],
  industries: IndustryProfile[],
) {
  return industrySlugs
    .map((slug) => industries.find((industry) => industry.slug === slug))
    .filter((industry): industry is IndustryProfile => Boolean(industry));
}

export async function generateStaticParams() {
  const useCases = await getUseCases();

  return useCases.map((useCase) => ({
    slug: useCase.slug,
  }));
}

export async function generateMetadata({
  params,
}: UseCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlug(slug);

  if (!useCase) {
    return buildMetadata({
      title: "Use case not found",
      description: "The requested use-case page could not be found.",
      path: `/use-cases/${slug}`,
    });
  }

  return buildMetadata({
    title: useCase.title,
    description: useCase.heroDescription,
    path: useCase.href,
  });
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const [useCase, services, industries, caseStudies] = await Promise.all([
    getUseCaseBySlug(slug),
    getServices(),
    getIndustries(),
    getCaseStudies(),
  ]);

  if (!useCase) {
    notFound();
  }

  const mappedServices = getMappedServices(useCase.primaryServiceSlugs, services);
  const mappedIndustries = getMappedIndustries(
    useCase.relevantIndustrySlugs,
    industries,
  );
  const relatedCaseStudy = useCase.relatedCaseStudySlug
    ? caseStudies.find((item) => item.slug === useCase.relatedCaseStudySlug)
    : null;

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Use Case
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl">
              {useCase.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {useCase.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/book-consultation">{useCase.ctaLabel}</ButtonLink>
              <ButtonLink href="/estimate" variant="secondary">
                Estimate Project Scope
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] text-[var(--color-ink)]">
              <UseCaseIcon name={useCase.icon} className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Focus
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
              {useCase.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              {useCase.shortDescription}
            </p>
            <div className="mt-6 grid gap-3">
              {useCase.environmentExamples.map((environment) => (
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
            title="What this use case usually needs solved first"
            description="Each use-case page is structured around the business pressure buyers are actually trying to reduce."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {useCase.challengePoints.map((point) => (
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
            title="The service stack most likely to resolve this outcome"
            description="Use-case pages bring multiple Auxano services into one clearer commercial story."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {mappedServices.map((service) => (
              <article
                key={service.slug}
                className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
              >
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {service.title}
                </h2>
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
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Relevant Industries"
              title="Where this use case most often fits commercially"
              description="These industry pages help buyers connect the outcome to a recognizable operating environment."
            />
            <div className="mt-8 grid gap-4">
              {mappedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={industry.href}
                  className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-5 py-4 text-sm font-medium text-[var(--color-ink)] shadow-[0_16px_40px_rgba(11,18,32,0.06)] transition hover:border-[color:rgba(47,107,255,0.24)] hover:text-[var(--color-electric)]"
                >
                  {industry.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Environment Examples"
              title="Typical contexts for this page"
              description="The use-case page stays grounded by naming the kinds of environments where the solution stack usually applies."
            />
            <div className="mt-8 grid gap-4">
              {useCase.environmentExamples.map((environment) => (
                <div
                  key={environment}
                  className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-5 py-4 text-sm leading-7 text-[var(--color-ink)]"
                >
                  {environment}
                </div>
              ))}
            </div>
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
                title="How Auxano keeps this use case commercially grounded"
                description="Where public proof is not yet published, the page should still show a serious delivery approach instead of generic claims."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  "Start with a survey or technical review before major procurement decisions are locked in.",
                  "Connect rollout, documentation, and handover so the environment remains supportable after launch.",
                  "Map the outcome to the right service mix instead of forcing every buyer into the same scope.",
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
            Ready to scope the right {useCase.title.toLowerCase()} rollout?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
            Use this page as the starting point for a consultation built around the commercial outcome you need first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation">{useCase.ctaLabel}</ButtonLink>
            <ButtonLink href="/estimate" variant="secondary">
              Estimate Project Scope
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
