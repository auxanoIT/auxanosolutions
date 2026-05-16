import { Container } from "@/components/ui/container";
import { StatMetricIcon, type StatMetricIconKind } from "@/components/ui/stat-metric-icon";
import type { Metric } from "@/lib/types";

type HeroMetricStripProps = {
  metrics: Metric[];
};

const metricIcons: StatMetricIconKind[] = ["award", "clipboard", "users", "headset"];

export function HeroMetricStrip({ metrics }: HeroMetricStripProps) {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <div className="overflow-hidden rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white">
          <div className="grid divide-y divide-[color:rgba(53,92,154,0.18)] md:grid-cols-4 md:divide-x md:divide-y-0">
            {metrics.map((metric, index) => {
              const icon = metricIcons[index % metricIcons.length];

              return (
                <article
                  key={metric.label}
                  className="relative flex min-h-[16rem] flex-col items-center justify-center px-6 py-9 text-center"
                >
                  <StatMetricIcon kind={icon} />
                  <p className="mt-8 text-[1.5rem] font-semibold leading-none tracking-normal text-[#123f91] sm:text-[2.5rem]">
                    {metric.value}
                  </p>
                  <span className="mt-6 h-1 w-16 rounded-full bg-[#f97316]" />
                  <p className="mt-6 text-lg font-semibold text-[#1f2937]">
                    {metric.label}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
