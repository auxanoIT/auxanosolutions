import Image from "next/image";

import { CTABand } from "@/components/sections/cta-band";
import { ServiceCategoryCarousel } from "@/components/sections/service-category-carousel";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getServices, getSolutionCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { CTABandSection, Service, ServiceCategory } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Auxano's full service architecture across infrastructure, networking, hardware systems, software licensing, and managed advisory delivery.",
  path: "/services",
});

const categoryNarratives: Record<
  ServiceCategory,
  {
    title: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
  }
> = {
  Infrastructure: {
    title: "Built to protect.",
    paragraphs: [
      "Simple and seamless physical security with a cybersecurity focus",
    ],
    imageSrc: "/image/service_section/itsection.jpg",
    imageAlt:
      "IT infrastructure service team in a secured business environment",
  },
  Networking: {
    title: "Designed to scale.",
    paragraphs: ["Structured networks built for speed, stability, and growth."],
    imageSrc: "/image/service_section/Networks_section.jpg",
    imageAlt: "Networking service setup with modern office connectivity",
  },
  "Hardware Systems": {
    title: "Hardware done right.",
    paragraphs: [
      "From setup to support, built for reliability and long-term use.",
    ],
    imageSrc: "/image/service_section/Hardware_section.jpg",
    imageAlt: "Hardware systems deployment in a business environment",
  },
  "Software & Licenses": {
    title: "Protection starts here.",
    paragraphs: [
      "Software, security, and cloud solutions built for modern business needs.",
    ],
    imageSrc: "/image/service_section/Licensed.jpg",
    imageAlt:
      "Licensed software and security solutions for business operations",
  },
  "Managed & Advisory": {
    title: "Beyond deployment.",
    paragraphs: [
      "Ongoing support, audits, and expert guidance for growing businesses.",
    ],
    imageSrc: "/image/service_section/Operational_support.jpg",
    imageAlt: "Operational support and advisory service collaboration",
  },
};

const categoryOrder: ServiceCategory[] = [
  "Infrastructure",
  "Networking",
  "Hardware Systems",
  "Software & Licenses",
  "Managed & Advisory",
];

const servicesCtaSection: CTABandSection = {
  _type: "ctaBand",
  eyebrow: "Ready to scope your project?",
  title: "Need help turning the service list into a project scope?",
  description:
    "Share the environment, risk, location, and timing. Auxano can help sequence the right mix of survey, procurement, deployment, and support.",
  primaryCta: {
    label: "Book Consultation",
    href: "/book-consultation",
    variant: "primary",
  },
  dark: true,
};

function orderCategoriesByNarrative(category: { label: string }[]) {
  return [...category].sort(
    (left, right) =>
      categoryOrder.indexOf(left.label as ServiceCategory) -
      categoryOrder.indexOf(right.label as ServiceCategory),
  );
}

function getCategoryServices(services: Service[], slugs: string[]) {
  return slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
}

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    getSolutionCategories(),
  ]);

  const orderedCategories = orderCategoriesByNarrative(categories);

  return (
    <>
      <section className="overflow-hidden bg-[#08111f] text-white">
        <Container className="grid min-h-[calc(100vh-5rem)] gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-cyan)]">
              Services
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Technology services built as one operating system.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Auxano brings infrastructure, networking, hardware, software
              licensing, and managed advisory work into one delivery model, so
              buyers can move from unclear requirements to a scoped, installed,
              and supportable environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book-consultation">
                Book Consultation
              </ButtonLink>
              <ButtonLink
                href="/estimate"
                variant="secondary"
                className="border-white/15 bg-white/10 text-white hover:border-white/35 hover:text-white"
              >
                Estimate Project Cost
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                ["5", "service categories"],
                ["31+", "delivery capabilities"],
                ["1", "accountable rollout path"],
              ].map(([value, label]) => (
                <div key={label} className="border-t border-white/15 pt-4">
                  <p className="text-3xl font-semibold tracking-[-0.05em]">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <Image
              src="/image/servces.png"
              alt="Auxano services platform visual"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 54vw, 100vw"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="text-center">
          <h2 className="mx-auto mt-6 max-w-5xl text-balance text-4xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-5xl lg:text-7xl">
            One Partner for every Technology need
          </h2>
        </Container>
      </section>

      <section className="bg-white pb-20 sm:pb-24">
        <Container className="space-y-2">
          {orderedCategories.map((category, index) => {
            const narrative =
              categoryNarratives[category.label as ServiceCategory];
            const categoryServices = getCategoryServices(
              services,
              category.serviceSlugs,
            );

            return (
              <ServiceCategoryCarousel
                key={category.id}
                id={category.anchorId}
                title={narrative.title}
                paragraphs={narrative.paragraphs}
                imageSrc={narrative.imageSrc}
                imageAlt={narrative.imageAlt}
                reverse={index % 2 === 1}
                cards={categoryServices.map((service) => ({
                  slug: service.slug,
                  title: service.title,
                  href: `/services/${service.slug}`,
                }))}
              />
            );
          })}
        </Container>
      </section>

      <div className="bg-[#F8FBFF]">
        <CTABand section={servicesCtaSection} />
      </div>
    </>
  );
}
