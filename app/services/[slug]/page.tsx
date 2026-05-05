import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Network,
  ShieldCheck,
  Target,
  Wrench,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { getServiceBySlug, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";
import type { ServiceCategory } from "@/lib/types";

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

const servicePath = [
  "Discovery",
  "Scope",
  "Deployment",
  "Handover",
  "Support",
];

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
  const style = categoryStyles[service.category];

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
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
              <ButtonLink
                href="/estimate"
                variant="secondary"
                className="border-white/15 bg-white/10 text-white hover:border-white/35 hover:text-white"
              >
                Estimate This Scope
              </ButtonLink>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <Image
              src={style.image}
              alt={style.imageAlt}
              fill
              priority
              className="object-cover opacity-90"
              sizes="(min-width: 1024px) 54vw, 100vw"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-3 rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[#f8fbff] p-4 sm:grid-cols-5">
            {servicePath.map((item, index) => (
              <div key={item} className="rounded-2xl bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  0{index + 1}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-ink)]">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white pb-20 sm:pb-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-electric)]">
              Scope clarity
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl">
              What this service is expected to cover.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)]">
              A serious scope should make coverage, deliverables, operating fit, and the next
              commercial action clear before procurement begins.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[#f8fbff] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[var(--color-electric)]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                Core capabilities
              </h3>
              <ul className="mt-6 space-y-4">
                {service.capabilities.map((capability) => (
                  <li key={capability} className="flex gap-3 text-sm leading-7 text-[var(--color-muted)]">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--color-success)]" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_18px_60px_rgba(11,18,32,0.06)]">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ backgroundColor: style.tint, color: style.accent }}
              >
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                Handover deliverables
              </h3>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-3 text-sm leading-7 text-[var(--color-muted)]">
                    <span
                      className="mt-2.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: style.accent }}
                    />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f8ff] py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-electric)]">
              Best fit
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-4xl">
              Environments where this service creates the most value.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.industries.map((industry) => (
                <div
                  key={industry}
                  className="rounded-2xl border border-[color:rgba(11,18,32,0.08)] bg-[#f8fbff] px-5 py-4 text-sm font-semibold text-[var(--color-ink)]"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-[#08111f] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-cyan)]">
              Positioning
            </p>
            <p className="mt-5 text-2xl font-semibold leading-9 tracking-[-0.04em]">
              {service.positioning}
            </p>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm leading-7 text-slate-300">
                If the environment involves multiple stakeholders, procurement choices, site risk,
                or post-launch accountability, this service should be scoped before purchase.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-electric)]">
                  Related services
                </p>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl">
                  Adjacent scopes in the same service category.
                </h2>
              </div>
              <ButtonLink href="/services" variant="secondary">
                Browse All Services
              </ButtonLink>
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-cyan)]">
              Next step
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Turn this service into a scoped engagement.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Bring the site details, business priorities, timelines, and constraints. Auxano will
              help define the right technical and commercial path.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              className="border-white/15 bg-white/10 text-white hover:border-white/35 hover:text-white"
            >
              Contact Sales
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
