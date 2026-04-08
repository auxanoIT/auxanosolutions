import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CTABandSection } from "@/lib/types";
import { cn } from "@/lib/utils";

type CTABandProps = {
  section: CTABandSection;
};

export function CTABand({ section }: CTABandProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div
          className={cn(
            "overflow-hidden rounded-[2.25rem] border p-8 sm:p-12",
            section.dark
              ? "border-white/10 bg-[linear-gradient(145deg,rgba(11,18,32,1),rgba(19,32,60,0.94))] text-white"
              : "border-[color:rgba(11,18,32,0.08)] bg-[linear-gradient(135deg,rgba(47,107,255,0.08),rgba(25,213,255,0.12),rgba(255,255,255,0.92))]",
          )}
        >
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            className={section.dark ? "[&>h2]:text-white [&>p]:text-white/72" : undefined}
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={section.primaryCta.href}>{section.primaryCta.label}</ButtonLink>
            {section.secondaryCta ? (
              <ButtonLink
                href={section.secondaryCta.href}
                variant={section.dark ? "secondary" : "ghost"}
                className={section.dark ? "border-white/12 bg-white/8 text-white hover:border-white/20 hover:text-white" : undefined}
              >
                {section.secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
