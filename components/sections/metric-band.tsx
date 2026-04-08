import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { MetricBandSection } from "@/lib/types";

type MetricBandProps = {
  section: MetricBandSection;
};

export function MetricBand({ section }: MetricBandProps) {
  return (
    <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {section.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.75rem] border border-white bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.08)]"
            >
              <p className="text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">
                {metric.value}
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-electric)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
