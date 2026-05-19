import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The requested Auxano Solutions page could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="py-28 sm:py-32">
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
          Not Found
        </p>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl">
          The requested page does not exist.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">
          Use the core navigation to return to the service platform, the estimator, or the consultation flow.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Explore services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
