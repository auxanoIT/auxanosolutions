import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy information for Auxano Solutions website visitors and lead submissions.",
  path: "/privacy",
});

const privacyPoints = [
  "Auxano collects contact and project information only for consultation, quotation, support, and service-delivery communication.",
  "Analytics and heatmap tooling may capture behavioral interaction data for website improvement and conversion analysis.",
  "Lead data may be processed through service providers such as HubSpot, Microsoft Clarity, Google Analytics, Vercel, and email infrastructure configured for the site.",
  "Users may request correction or deletion of submitted personal information through the published contact channels.",
];

export default function PrivacyPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Privacy"
          title="The site is built for lead generation and operational communication, not opaque data capture."
          description="Replace this launch copy with legal-approved policy language before production go-live if the client requires a fuller compliance statement."
        />
        <div className="mt-8 space-y-4">
          {privacyPoints.map((point) => (
            <div
              key={point}
              className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-5 py-4 text-sm leading-7 text-[var(--color-ink)] shadow-[0_16px_40px_rgba(11,18,32,0.05)]"
            >
              {point}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
