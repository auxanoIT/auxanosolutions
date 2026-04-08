import { ShieldCheck, Workflow, Wrench } from "lucide-react";

import { SectionRenderer } from "@/components/sections/section-renderer";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getMarketingPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Auxano Solutions",
  description:
    "Auxano combines managed IT, network infrastructure, CCTV delivery, and compliance-led planning for organizations that need serious operational support.",
  path: "/about",
});

const principles = [
  {
    icon: Workflow,
    title: "Operate as one system",
    description:
      "Support, security, infrastructure, and continuity planning are treated as connected operational layers, not disconnected line items.",
  },
  {
    icon: ShieldCheck,
    title: "Build trust through clarity",
    description:
      "Every engagement should leave leadership with a clearer view of risk, scope, documentation, and next-step decisions.",
  },
  {
    icon: Wrench,
    title: "Deliver for live environments",
    description:
      "Auxano plans around active business operations, handover quality, and post-launch support readiness instead of isolated installation moments.",
  },
];

const deliveryTimeline = [
  "Discovery and environment review",
  "Architecture, commercial scoping, and rollout planning",
  "Deployment, documentation, and operator handover",
  "Support transition, monitoring, and review cadence",
];

export default async function AboutPage() {
  const page = await getMarketingPage("about");

  return (
    <>
      {page ? <SectionRenderer sections={page.sections} /> : null}
      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Operating principles"
            title="The site positions Auxano around delivery discipline, not template-level service claims."
            description="The objective is to help enterprise buyers understand how the company thinks, executes, and reduces technical ambiguity."
          />
          <div className="mt-10 grid gap-4 xl:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.08)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Delivery path"
              title="A structured process from first conversation to post-launch stability."
              description="The about page should prove that Auxano is prepared for commercial and operational complexity, not just technical installation."
            />
          </div>
          <div className="space-y-4">
            {deliveryTimeline.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_16px_40px_rgba(11,18,32,0.05)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-electric)] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-sm leading-7 text-[var(--color-ink)]">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="rounded-[2.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[linear-gradient(135deg,rgba(47,107,255,0.08),rgba(25,213,255,0.14),rgba(255,255,255,0.92))] p-8 sm:p-12">
            <SectionHeading
              eyebrow="Next step"
              title="Turn the conversation into a scoped consultation."
              description="Use the booking flow when the environment needs discovery, commercial framing, or a phased rollout conversation."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
              <ButtonLink href="/estimate" variant="secondary">
                Estimate Project Cost
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
