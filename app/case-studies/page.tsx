import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Explore delivery highlights across CCTV, network infrastructure, and managed support programs shaped around measurable operational outcomes.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Delivery Proof"
          title="Compact case studies built to show operational outcomes, not decorative storytelling."
          description="Each story is structured around challenge, solution, result, and measurable signals so enterprise buyers can evaluate the quality of execution quickly."
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <article
              key={caseStudy.slug}
              className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                {caseStudy.industry}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                {caseStudy.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{caseStudy.summary}</p>
              <div className="mt-6 grid gap-3">
                {caseStudy.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-[var(--color-cloud)] px-4 py-3">
                    <p className="text-xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <ButtonLink
                href={`/case-studies/${caseStudy.slug}`}
                variant="ghost"
                className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
              >
                Read the story
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
