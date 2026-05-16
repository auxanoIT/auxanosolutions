import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return buildMetadata({
      title: "Case study not found",
      description: "The requested case study could not be found.",
      path: `/case-studies/${slug}`,
    });
  }

  return buildMetadata({
    title: caseStudy.title,
    description: caseStudy.summary,
    path: `/case-studies/${caseStudy.slug}`,
    type: "article",
    keywords: [
      caseStudy.industry,
      caseStudy.location,
      ...caseStudy.relatedServices,
    ],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [caseStudy, allCaseStudies] = await Promise.all([
    getCaseStudyBySlug(slug),
    getCaseStudies(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const related = allCaseStudies.filter((item) => item.slug !== caseStudy.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          headline: caseStudy.title,
          description: caseStudy.summary,
          url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
        }}
      />
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              {caseStudy.industry}
            </p>
            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl">
              {caseStudy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {caseStudy.summary}
            </p>
          </div>
          <div className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-electric)]">
              Project signals
            </p>
            <div className="mt-6 grid gap-3">
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-[var(--color-cloud)] px-4 py-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Challenge
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{caseStudy.challenge}</p>
          </article>
          <article className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)] lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Solution
            </p>
            <div className="mt-4 space-y-4">
              {caseStudy.solution.map((item) => (
                <div key={item} className="rounded-2xl bg-[var(--color-cloud)] px-4 py-4 text-sm leading-7 text-[var(--color-ink)]">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Result"
              title="What changed after the rollout"
              description={caseStudy.result}
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/book-consultation">Discuss a similar project</ButtonLink>
            </div>
          </div>
          {related.length ? (
            <div className="grid gap-4">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-[1.75rem] border border-white bg-white p-6 shadow-[0_18px_44px_rgba(11,18,32,0.06)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-electric)]">
                    Related case study
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.summary}</p>
                  <ButtonLink
                    href={`/case-studies/${item.slug}`}
                    variant="ghost"
                    className="mt-5 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
                  >
                    Read case study
                  </ButtonLink>
                </article>
              ))}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
