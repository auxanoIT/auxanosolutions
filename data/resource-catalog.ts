import type { ResourceGroup, ResourceGroupId, ResourceLinkItem } from "@/lib/types";

type ResourceLinkSeed = Omit<ResourceLinkItem, "group">;

function buildGroup(
  id: ResourceGroupId,
  label: string,
  links: ResourceLinkSeed[],
): ResourceGroup {
  return {
    id,
    label,
    href: `/resources#${id}`,
    links: links.map((link) => ({
      ...link,
      group: id,
    })),
  };
}

export const resourceGroups: ResourceGroup[] = [
  buildGroup("insights-learning", "Insights & Learning", [
    { id: "knowledge-center", label: "Knowledge Center", href: "/resources/knowledge-center" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "industries", label: "Industries", href: "/industries" },
  ]),
  buildGroup("proof-planning", "Proof & Planning", [
    { id: "case-studies", label: "Case Studies", href: "/case-studies" },
    { id: "solutions-overview", label: "Solutions Overview", href: "/services" },
    { id: "about-auxano", label: "About Auxano", href: "/about" },
  ]),
  buildGroup("support", "Support", [
    { id: "support-center", label: "Support Center", href: "/resources/support-center" },
    { id: "faq-library", label: "FAQ Library", href: "/resources/knowledge-center#faqs" },
    { id: "contact", label: "Contact", href: "/contact" },
  ]),
  buildGroup("commercial-tools", "Commercial Tools", [
    { id: "book-consultation", label: "Book Consultation", href: "/book-consultation" },
  ]),
];

export const resourceLinks: ResourceLinkItem[] = resourceGroups.flatMap((group) => group.links);
