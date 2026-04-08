import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { RichContentSection } from "@/lib/types";

type RichContentProps = {
  section: RichContentSection;
};

export function RichContent({ section }: RichContentProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        <div className="mt-6 space-y-5 text-base leading-8 text-[var(--color-muted)]">
          {section.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
