import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CaseStudy, CaseStudyRailSection } from "@/lib/types";

type CaseStudyRailProps = {
  section: CaseStudyRailSection;
  caseStudies: CaseStudy[];
};

export function CaseStudyRail({ section, caseStudies }: CaseStudyRailProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
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
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                {caseStudy.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{caseStudy.summary}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {caseStudy.metrics.map((metric) => (
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
                Read case study
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
