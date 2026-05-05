import { Container } from "@/components/ui/container";
import type { LogoStripSection } from "@/lib/types";

type LogoStripProps = {
  section: LogoStripSection;
};

export function LogoStrip({ section }: LogoStripProps) {
  return (
    <section className="border-y border-[color:rgba(11,18,32,0.06)] bg-white">
      <Container className="py-8">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {section.logos.map((logo) => (
            <div
              key={logo.name}
              className="rounded-full border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-4 py-3 text-center text-sm font-medium text-[var(--color-ink)]"
            >
              {logo.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
