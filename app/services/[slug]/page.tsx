import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServiceBySlug, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "The requested service page could not be found.",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getServiceBySlug(slug), getServices()]);

  if (!service) {
    notFound();
  }

  const related = services
    .filter((item) => item.slug !== service.slug && item.category === service.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.category,
          provider: {
            "@type": "Organization",
            name: "Auxano Solutions Technology Limited",
          },
          areaServed: "Nigeria",
          url: absoluteUrl(`/services/${service.slug}`),
          description: service.summary,
        }}
      />

      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              {service.category}
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {service.description}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--color-ink)]">
              {service.positioning}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
              <ButtonLink href="/estimate" variant="secondary">
                Estimate This Scope
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Outcome
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
              {service.outcome}
            </p>
            <ul className="mt-8 space-y-4">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-7 text-[var(--color-muted)]">
                  <span className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Capabilities"
              title="What the delivery typically covers"
              description="The final scope is adjusted to the environment, but these are the main operating layers covered in the service."
            />
            <div className="mt-8 grid gap-4">
              {service.capabilities.map((capability) => (
                <div
                  key={capability}
                  className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-5 py-4 text-sm leading-7 text-[var(--color-ink)]"
                >
                  {capability}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Deliverables"
              title="What a serious handover looks like"
              description="The commercial promise is not just technical installation. It is the clarity of the final environment and operating model."
            />
            <div className="mt-8 grid gap-4">
              {service.deliverables.map((deliverable) => (
                <div
                  key={deliverable}
                  className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-5 py-4 text-sm leading-7 text-[var(--color-ink)]"
                >
                  {deliverable}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Best fit"
              title="Where this service creates the strongest operational value"
              description="Auxano’s message should make it clear which environments are most likely to benefit from the service."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.industries.map((industry) => (
              <div
                key={industry}
                className="rounded-[1.75rem] border border-white bg-white px-5 py-4 text-sm font-medium text-[var(--color-ink)] shadow-[0_16px_40px_rgba(11,18,32,0.06)]"
              >
                {industry}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Related Services"
              title="Explore adjacent capabilities"
              description="The broader Auxano service stack is still visible for buyers shaping a larger technical program."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
                >
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.summary}</p>
                  <ButtonLink
                    href={`/services/${item.slug}`}
                    variant="ghost"
                    className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
                  >
                    View service
                  </ButtonLink>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
