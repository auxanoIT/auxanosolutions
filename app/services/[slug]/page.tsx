import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Network,
  ShieldCheck,
  Wrench,
  BadgeCheck,
  ClipboardCheck,
} from "lucide-react";

import { ServiceCapabilityFlow } from "@/components/sections/service-capability-flow";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { getServiceBySlug, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import type {
  Service,
  ServiceCapabilitySection,
  ServiceCategory,
  ServiceNavMedia,
} from "@/lib/types";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const categoryStyles: Record<
  ServiceCategory,
  {
    icon: typeof ShieldCheck;
    accent: string;
    tint: string;
    image: string;
    imageAlt: string;
  }
> = {
  Infrastructure: {
    icon: ShieldCheck,
    accent: "#2f6bff",
    tint: "rgba(47,107,255,0.1)",
    image: "/image/IT Infrastructure.png",
    imageAlt: "Biometric access control device in a secure infrastructure environment",
  },
  Networking: {
    icon: Network,
    accent: "#f97316",
    tint: "rgba(249,115,22,0.11)",
    image: "/image/networking.png",
    imageAlt: "Network rack with structured orange cabling",
  },
  "Hardware Systems": {
    icon: Wrench,
    accent: "#18b67e",
    tint: "rgba(24,182,126,0.12)",
    image: "/image/computer_and_server.png",
    imageAlt: "Computer and server hardware systems",
  },
  "Software & Licenses": {
    icon: BadgeCheck,
    accent: "#7c3aed",
    tint: "rgba(124,58,237,0.1)",
    image: "/image/software_and_licenses.jpg",
    imageAlt: "Software licensing and cloud services workspace",
  },
  "Managed & Advisory": {
    icon: ClipboardCheck,
    accent: "#0f766e",
    tint: "rgba(15,118,110,0.12)",
    image: "/image/It_management.jpg",
    imageAlt: "IT management professional reviewing service activity",
  },
};

function buildFallbackSections(
  service: Service,
  image: string,
  imageAlt: string,
): ServiceCapabilitySection[] {
  return [
    {
      id: "delivery-model",
      navLabel: "Delivery model",
      title: `How ${service.title.toLowerCase()} is scoped.`,
      lead: service.summary,
      body: [service.description],
      points: service.capabilities,
      image: {
        src: image,
        alt: imageAlt,
      },
    },
    {
      id: "handover-control",
      navLabel: "Handover",
      title: "What should be clear at completion.",
      lead:
        "A finished scope should leave the environment usable, supportable, and easier to govern.",
      body: [
        "Auxano documents the technical outcome in a way that helps internal teams, external vendors, and future support work from the same operating picture.",
      ],
      points: service.deliverables,
      image: {
        src: image,
        alt: imageAlt,
      },
    },
    {
      id: "operating-fit",
      navLabel: "Operating fit",
      title: "Where this service creates measurable value.",
      lead: service.positioning,
      body: [
        "The strongest results come when the service is matched to the environment, the operational pressure behind it, and the accountability expected after deployment.",
      ],
      points: service.highlights,
      image: {
        src: image,
        alt: imageAlt,
      },
    },
  ];
}

function getServiceHeroImage(
  service: Service,
  fallbackImage: ServiceNavMedia,
): ServiceNavMedia {
  return service.capabilitySections?.find((section) => section.image)?.image ?? fallbackImage;
}

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

  const style = categoryStyles[service.category];
  const heroImage = getServiceHeroImage(service, {
    src: style.image,
    alt: style.imageAlt,
  });

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
    imagePath: heroImage.src,
    imageAlt: heroImage.alt,
    keywords: [
      service.title,
      service.category,
      ...service.industries,
      ...service.highlights.slice(0, 3),
      ...(service.capabilitySections?.flatMap((section) => [
        section.navLabel,
        section.title,
      ]) ?? []),
    ],
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
  const style = categoryStyles[service.category];
  const heroImage = getServiceHeroImage(service, {
    src: style.image,
    alt: style.imageAlt,
  });
  const capabilitySections =
    service.capabilitySections ??
    buildFallbackSections(service, heroImage.src, heroImage.alt);

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
          image: absoluteUrl(heroImage.src),
        }}
      />

      <section className="overflow-hidden bg-[#08111f] text-white">
        <Container className="py-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
        </Container>
        <Container className="grid gap-10 pb-16 pt-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-3xl">
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {service.description}
            </p>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              className="object-cover opacity-90"
              sizes="(min-width: 1024px) 54vw, 100vw"
            />
          </div>
        </Container>
      </section>

      <ServiceCapabilityFlow service={service} sections={capabilitySections} />

      {related.length ? (
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl">
                  Adjacent scopes in the same service category.
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="group rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[#f8fbff] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(11,18,32,0.1)]"
                >
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <ButtonLink
                    href={`/services/${item.slug}`}
                    variant="ghost"
                    className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
                  >
                    View service
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </ButtonLink>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-[#08111f] py-20 text-white sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Turn this service into a scoped engagement.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Bring the site details, business priorities, timelines, and constraints. Auxano will
              help define the right technical and commercial path.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
