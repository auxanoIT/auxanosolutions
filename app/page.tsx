import { notFound } from "next/navigation";

import { SectionRenderer } from "@/components/sections/section-renderer";
import { JsonLd } from "@/components/ui/json-ld";
import { getCaseStudies, getFaqs, getMarketingPage, getServices, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 120;

export const metadata = buildMetadata({
  title: "Managed IT, CCTV, and Network Infrastructure",
  description:
    "Auxano Solutions brings managed IT, CCTV deployment, network infrastructure, and audit-led clarity into one enterprise-grade commercial experience.",
  path: "/",
});

export default async function HomePage() {
  const [page, services, caseStudies, testimonials, faqs] = await Promise.all([
    getMarketingPage("home"),
    getServices(),
    getCaseStudies(),
    getTestimonials(),
    getFaqs(),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Auxano Solutions Technology Limited",
            url: absoluteUrl("/"),
            email: "info@auxanosolutions.net",
            telephone: "+234 8062 218 546",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "26A Adeshina Street, Off Oluwole Phillips, Obafemi Awolowo Way, Ikeja",
              addressLocality: "Lagos",
              addressCountry: "NG",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Auxano Solutions",
            url: absoluteUrl("/"),
            areaServed: "Nigeria",
            serviceType: [
              "Managed IT Support",
              "CCTV Installation",
              "Network Infrastructure",
              "IT Audit and Compliance",
            ],
          },
        ]}
      />
      <SectionRenderer
        sections={page.sections}
        services={services}
        caseStudies={caseStudies}
        testimonials={testimonials}
        faqs={faqs}
      />
    </>
  );
}
