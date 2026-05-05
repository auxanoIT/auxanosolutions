import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Service, ServiceGridSection } from "@/lib/types";

type ServiceGridProps = {
  section: ServiceGridSection;
  services: Service[];
};

export function ServiceGrid({ section, services }: ServiceGridProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="mt-10 grid gap-4 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="group rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(11,18,32,0.12)]"
            >
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                {service.title}
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-[var(--color-ink)]">
                {service.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/services/${service.slug}`}
                variant="ghost"
                className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
              >
                Explore service
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
