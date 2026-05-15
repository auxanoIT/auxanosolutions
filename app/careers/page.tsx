import { BriefcaseBusiness, GraduationCap, ShieldCheck, UsersRound } from "lucide-react";

import { SectionRenderer } from "@/components/sections/section-renderer";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMarketingPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Auxano Solutions to work on IT infrastructure, networking, CCTV, support, and business technology projects for serious operational environments.",
  path: "/careers",
});

const workTracks = [
  {
    icon: BriefcaseBusiness,
    title: "Project delivery",
    description:
      "Support site surveys, deployment planning, vendor coordination, documentation, and client handover across infrastructure and security projects.",
  },
  {
    icon: ShieldCheck,
    title: "Technical operations",
    description:
      "Work across managed IT, networking, endpoint support, CCTV systems, access control, and continuity-focused service environments.",
  },
  {
    icon: UsersRound,
    title: "Client support",
    description:
      "Help business users get clearer answers, faster escalation, and better ownership when their systems need attention.",
  },
  {
    icon: GraduationCap,
    title: "Learning path",
    description:
      "Build practical experience across live environments, documentation standards, troubleshooting, and commercial service delivery.",
  },
];

const qualities = [
  "You communicate clearly with technical and non-technical teams.",
  "You document your work so another person can support the environment later.",
  "You take reliability, safety, and client trust seriously.",
  "You are comfortable learning across hardware, networks, software, and support workflows.",
];

export default async function CareersPage() {
  const page = await getMarketingPage("careers");

  return (
    <>
      {page ? <SectionRenderer sections={page.sections} /> : null}

      <section className={page ? "bg-[var(--color-cloud)] py-20 sm:py-24" : "py-20 sm:py-24"}>
        <Container>
          <SectionHeading
            eyebrow="Careers"
            title="Build practical technology systems for organizations that need clarity and uptime."
            description="Auxano looks for people who can combine technical curiosity with disciplined execution, clear communication, and respect for live business environments."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {workTracks.map((track) => {
              const Icon = track.icon;

              return (
                <article
                  key={track.title}
                  className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {track.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{track.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Who fits"
            title="We value people who make complex work easier to trust."
            description="Open roles may change, but the standard stays the same: dependable execution, clear thinking, and practical ownership."
          />
          <div className="space-y-4">
            {qualities.map((quality, index) => (
              <div
                key={quality}
                className="flex gap-4 rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-5 shadow-[0_14px_34px_rgba(11,18,32,0.05)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-7 text-[var(--color-ink)]">{quality}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-ink)] py-20 text-white sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Apply"
            title="Send a short introduction and the area you want to grow in."
            description="Include your experience, tools you have worked with, and the kind of technical or client-support work you want to do next."
            className="text-white"
          />
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="mailto:info@auxanosolutions.net?subject=Career%20Interest%20-%20Auxano%20Solutions">
              Email Careers
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Auxano
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
