import { CalendarDays, ClipboardCheck, Presentation } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Consultation",
  description:
    "Book a consultation with Auxano Solutions to scope managed IT, CCTV, network infrastructure, access control, or compliance work.",
  path: "/book-consultation",
});

const reasons = [
  {
    icon: Presentation,
    title: "Clarify the commercial brief",
    description: "Turn broad requirements into a structured scope, commercial path, and technical priority order.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit the current state",
    description: "Use the call to expose weak points, deployment risk, and support gaps before project work begins.",
  },
  {
    icon: CalendarDays,
    title: "Plan delivery timing",
    description: "Align rollout windows, site access, support readiness, and operational constraints early.",
  },
];

export default async function BookConsultationPage() {
  const settings = await getSiteSettings();

  return (
    <section className="py-20 sm:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Consultation-first"
          title="Use the consultation route when the environment needs discovery before rollout."
          description="This path is built for teams that need technical clarity, commercial framing, or a phased plan before implementation starts."
        />
        <div className="grid gap-4 xl:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <article
                key={reason.title}
                className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {reason.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{reason.description}</p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <LeadForm
            context="consultation"
            title="Request a consultation"
            description="If scheduling needs internal alignment first, leave the brief here and the team can coordinate the right follow-up."
          />
          <div className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Direct booking
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
              If the HubSpot calendar is live, jump straight into a meeting slot.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              The direct booking CTA is ready for HubSpot Meetings. Until then, the consultation form preserves the lead and the context behind it.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href={settings.hubspotMeetingUrl}>Open Booking Calendar</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
