import type { CaseStudy, ServiceNavMedia } from "@/lib/types";

const defaultCaseStudyMedia: ServiceNavMedia = {
  src: "/image/service-details/door-access-dashboard.webp",
  alt: "Access control dashboard and security operations interface",
};

const caseStudyMediaBySlug: Record<string, ServiceNavMedia> = {
  "lagos-head-office-security-modernization": {
    src: "/image/service-details/door-access-dashboard.webp",
    alt: "Access control dashboard for a corporate security modernization project",
  },
  "private-clinic-network-refresh": {
    src: "/image/industries/healthcare.webp",
    alt: "Healthcare technology environment with reliable network infrastructure",
  },
  "warehouse-rollout-with-centralized-visibility": {
    src: "/image/industries/warehousing-logistics.webp",
    alt: "Warehouse technology rollout with centralized site visibility",
  },
};

const caseStudyMediaByIndustry: Record<string, ServiceNavMedia> = {
  healthcare: {
    src: "/image/industries/healthcare.webp",
    alt: "Healthcare technology environment with reliable network infrastructure",
  },
  "professional services": {
    src: "/image/industries/corporate-offices.webp",
    alt: "Corporate office infrastructure and security environment",
  },
  "distribution & warehousing": {
    src: "/image/industries/warehousing-logistics.webp",
    alt: "Warehouse and logistics facility with connected security systems",
  },
};

export function getCaseStudyMedia(caseStudy: CaseStudy): ServiceNavMedia {
  if (caseStudy.image?.src) {
    return {
      src: caseStudy.image.src,
      alt: caseStudy.image.alt || `${caseStudy.title} case study image`,
    };
  }

  const industryKey = caseStudy.industry?.toLowerCase();

  return (
    caseStudyMediaBySlug[caseStudy.slug] ??
    (industryKey ? caseStudyMediaByIndustry[industryKey] : undefined) ??
    defaultCaseStudyMedia
  );
}
