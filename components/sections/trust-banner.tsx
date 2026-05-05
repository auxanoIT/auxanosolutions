import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { TrustBannerSection } from "@/lib/types";

type TrustBannerProps = {
  section: TrustBannerSection;
};

export function TrustBanner({ section }: TrustBannerProps) {
  return (
    <section className="bg-[#f3f7fa] py-20 sm:py-24 lg:py-28">
      <Container className="max-w-6xl text-center">
        <h2 className="mx-auto max-w-5xl text-balance text-2xl font-semibold leading-[1.08] tracking-normal text-[var(--color-ink)] sm:text-2xl lg:text-4xl">
          {section.title}
        </h2>
        <p className="mx-auto max-w-4xl text-balance text-xl font-semibold leading-8 text-[var(--color-ink)] sm:text-2xl lg:text-4xl">
          {section.description}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink
            href={section.cta.href}
            className="min-h-14 bg-[var(--color-ink)] px-8 text-base text-white shadow-none hover:-translate-y-0.5 hover:bg-[color:rgba(11,18,32,0.92)] sm:min-w-64"
          >
            {section.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
