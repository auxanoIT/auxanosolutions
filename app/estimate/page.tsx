import { EstimateWizard } from "@/components/estimator/estimate-wizard";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getEstimatorConfig } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Estimate Project Cost",
  description:
    "Use Auxano’s live estimator to generate a structured cost range across managed IT, CCTV, network infrastructure, and audit scope.",
  path: "/estimate",
});

export default async function EstimatePage() {
  const config = await getEstimatorConfig();

  return (
    <section className="py-20 sm:py-24">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Lead Magnet"
          title="Turn technical complexity into a clearer commercial starting point."
          description="This tool is intentionally positioned between passive browsing and a full consultation. It gives buyers a structured range while preserving lead context for follow-up."
        />
        <EstimateWizard config={config} />
      </Container>
    </section>
  );
}
