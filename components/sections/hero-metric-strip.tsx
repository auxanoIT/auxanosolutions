import { Container } from "@/components/ui/container";
import type { Metric } from "@/lib/types";

type HeroMetricStripProps = {
  metrics: Metric[];
};

export function HeroMetricStrip({ metrics }: HeroMetricStripProps) {
  return (
    <section className="bg-white mt-8 md:mt-16">
      <Container>
        <div className="grid divide-y divide-[#0A3047] border-y border-[#0A3047] md:grid-cols-4 md:divide-x md:divide-y-0">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex min-h-[8.5rem] flex-col items-center justify-center px-6 py-8 text-center md:min-h-[9.75rem] md:px-5"
            >
              <p className="text-[2.85rem] font-semibold leading-none tracking-[-0.07em] text-[#0A3047] sm:text-[3.45rem]">
                {metric.value}
              </p>
              <p className="mt-3 text-sm font-medium leading-6 text-[#0A3047] sm:text-base">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
