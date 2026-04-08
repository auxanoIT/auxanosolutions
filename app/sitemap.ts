import type { MetadataRoute } from "next";

import {
  getBlogPosts,
  getCaseStudies,
  getIndustries,
  getServices,
  getUseCases,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, useCases, industries, caseStudies, posts] = await Promise.all([
    getServices(),
    getUseCases(),
    getIndustries(),
    getCaseStudies(),
    getBlogPosts(),
  ]);

  return [
    "/",
    "/about",
    "/services",
    "/use-cases",
    "/industries",
    "/case-studies",
    "/resources",
    "/resources/knowledge-center",
    "/resources/support-center",
    "/blog",
    "/contact",
    "/book-consultation",
    "/estimate",
    "/privacy",
    "/terms",
    ...services.map((service) => `/services/${service.slug}`),
    ...useCases.map((useCase) => useCase.href),
    ...industries.map((industry) => industry.href),
    ...caseStudies.map((item) => `/case-studies/${item.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));
}
