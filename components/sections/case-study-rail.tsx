import { CaseStudyCard } from "@/components/sections/case-study-card";
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
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>
      </Container>
    </section>
  );
}
