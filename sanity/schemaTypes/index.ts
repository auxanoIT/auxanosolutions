import { defineArrayMember, defineField, defineType } from "sanity";

const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", title: "Href", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "string" }),
  ],
});

const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "string" }),
  ],
});

const networkNode = defineType({
  name: "networkNode",
  title: "Network Node",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "detail", title: "Detail", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "x", title: "X Position", type: "number", validation: (rule) => rule.required() }),
    defineField({ name: "y", title: "Y Position", type: "number", validation: (rule) => rule.required() }),
  ],
});

const heroSection = defineType({
  name: "hero",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (rule) => rule.required() }),
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      options: {
        list: ["default", "videoCarousel"],
      },
      initialValue: "default",
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "metrics", title: "Metrics", type: "array", of: [defineArrayMember({ type: "metric" })] }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "link" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "link" }),
    defineField({
      name: "slides",
      title: "Video Carousel Slides",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "wistiaMediaId", title: "Wistia Media ID", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "headline", title: "Headline", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", validation: (rule) => rule.required() }),
            defineField({ name: "primaryCta", title: "Primary CTA", type: "link" }),
          ],
          preview: {
            select: {
              title: "headline",
              subtitle: "wistiaMediaId",
            },
          },
        }),
      ],
    }),
  ],
});

const logoStripSection = defineType({
  name: "logoStrip",
  title: "Logo Strip",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "partnerLogo",
        }),
      ],
    }),
  ],
});

const metricBandSection = defineType({
  name: "metricBand",
  title: "Metric Band",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "metrics", title: "Metrics", type: "array", of: [defineArrayMember({ type: "metric" })] }),
  ],
});

const serviceGridSection = defineType({
  name: "serviceGrid",
  title: "Service Grid",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "featuredSlugs",
      title: "Featured Service Slugs",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
});

const contentSplitSection = defineType({
  name: "contentSplit",
  title: "Content Split",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Body", type: "array", of: [defineArrayMember({ type: "text" })] }),
    defineField({ name: "points", title: "Points", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "reverse", title: "Reverse Layout", type: "boolean" }),
    defineField({ name: "dark", title: "Dark Background", type: "boolean" }),
  ],
});

const serviceShowcaseItem = defineType({
  name: "serviceShowcaseItem",
  title: "Service Showcase Item",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "imageSrc", title: "Image Source", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "imageAlt", title: "Image Alt", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "ctaHref", title: "CTA Href", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});

const serviceShowcaseSection = defineType({
  name: "serviceShowcase",
  title: "Service Showcase",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "serviceShowcaseItem" })],
      validation: (rule) => rule.min(1),
    }),
  ],
});

const categoryShowcaseItem = defineType({
  name: "categoryShowcaseItem",
  title: "Category Showcase Item",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "bullets", title: "Bullets", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "ctaHref", title: "CTA Href", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "title",
    },
  },
});

const categoryShowcaseSection = defineType({
  name: "categoryShowcase",
  title: "Category Showcase",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "wistiaMediaId", title: "Wistia Media ID", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "categoryShowcaseItem" })],
      validation: (rule) => rule.min(1),
    }),
  ],
});

const networkMapSection = defineType({
  name: "networkMapSection",
  title: "Network Map Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "bullets", title: "Bullets", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "nodes", title: "Nodes", type: "array", of: [defineArrayMember({ type: "networkNode" })] }),
  ],
});

const caseStudyRailSection = defineType({
  name: "caseStudyRail",
  title: "Case Study Rail",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "slugs", title: "Case Study Slugs", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});

const testimonialRailSection = defineType({
  name: "testimonialRail",
  title: "Testimonial Rail",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});

const faqBlockSection = defineType({
  name: "faqBlock",
  title: "FAQ Block",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "ids", title: "FAQ IDs", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
});

const ctaBandSection = defineType({
  name: "ctaBand",
  title: "CTA Band",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "link" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "link" }),
    defineField({ name: "dark", title: "Dark Background", type: "boolean" }),
  ],
});

const richContentSection = defineType({
  name: "richContent",
  title: "Rich Content",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "content", title: "Content", type: "array", of: [defineArrayMember({ type: "text" })] }),
  ],
});

const partnerLogo = defineType({
  name: "partnerLogo",
  title: "Partner Logo",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tone", title: "Tone", type: "string" }),
  ],
});

const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text" }),
    defineField({ name: "canonicalPath", title: "Canonical Path", type: "string" }),
  ],
});

const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({ type: "hero" }),
        defineArrayMember({ type: "logoStrip" }),
        defineArrayMember({ type: "metricBand" }),
        defineArrayMember({ type: "serviceGrid" }),
        defineArrayMember({ type: "contentSplit" }),
        defineArrayMember({ type: "serviceShowcase" }),
        defineArrayMember({ type: "categoryShowcase" }),
        defineArrayMember({ type: "networkMapSection" }),
        defineArrayMember({ type: "caseStudyRail" }),
        defineArrayMember({ type: "testimonialRail" }),
        defineArrayMember({ type: "faqBlock" }),
        defineArrayMember({ type: "ctaBand" }),
        defineArrayMember({ type: "richContent" }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "shortName", title: "Short Name", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "whatsappSales", title: "WhatsApp Sales", type: "string" }),
    defineField({ name: "whatsappSupport", title: "WhatsApp Support", type: "string" }),
    defineField({ name: "hubspotMeetingUrl", title: "HubSpot Meetings URL", type: "string" }),
  ],
});

const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href", type: "string" }),
            defineField({
              name: "kind",
              title: "Kind",
              type: "string",
              options: {
                list: ["link", "solutions", "useCases", "industries", "resources"],
              },
            }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({
              name: "children",
              title: "Children",
              type: "array",
              of: [defineArrayMember({ type: "link" })],
            }),
          ],
        }),
      ],
    }),
  ],
});

const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "columns",
      title: "Columns",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "links", title: "Links", type: "array", of: [defineArrayMember({ type: "link" })] }),
          ],
        }),
      ],
    }),
  ],
});

const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Infrastructure",
          "Networking",
          "Hardware Systems",
          "Software & Licenses",
          "Managed & Advisory",
        ],
      },
    }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "positioning", title: "Positioning", type: "text" }),
    defineField({ name: "outcome", title: "Outcome", type: "text" }),
    defineField({ name: "heroLabel", title: "Hero Label", type: "string" }),
    defineField({ name: "navDescription", title: "Navigation Description", type: "text" }),
    defineField({
      name: "navImage",
      title: "Navigation Image",
      type: "object",
      fields: [
        defineField({ name: "src", title: "Source", type: "string" }),
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "capabilities", title: "Capabilities", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "deliverables", title: "Deliverables", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "industries", title: "Industries", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "serviceMixId", title: "Estimator Service ID", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "challenge", title: "Challenge", type: "text" }),
    defineField({ name: "solution", title: "Solution", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "result", title: "Result", type: "text" }),
    defineField({ name: "metrics", title: "Metrics", type: "array", of: [defineArrayMember({ type: "metric" })] }),
    defineField({ name: "relatedServices", title: "Related Services", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

const post = defineType({
  name: "post",
  title: "Posts",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading Time", type: "string" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "takeaways", title: "Takeaways", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "body", title: "Body", type: "array", of: [defineArrayMember({ type: "text" })] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
  ],
});

const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({ name: "id", title: "FAQ ID", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", validation: (rule) => rule.required() }),
  ],
});

const estimatorMultiplier = defineType({
  name: "estimatorMultiplier",
  title: "Estimator Multiplier",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "multiplierLow", title: "Low Multiplier", type: "number" }),
    defineField({ name: "multiplierHigh", title: "High Multiplier", type: "number" }),
    defineField({ name: "note", title: "Note", type: "string" }),
  ],
});

const estimatorBand = defineType({
  name: "estimatorBand",
  title: "Estimator Band",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "low", title: "Low Value", type: "number" }),
    defineField({ name: "high", title: "High Value", type: "number" }),
    defineField({ name: "note", title: "Note", type: "string" }),
  ],
});

const estimatorService = defineType({
  name: "estimatorService",
  title: "Estimator Service",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "baseLow", title: "Base Low", type: "number" }),
    defineField({ name: "baseHigh", title: "Base High", type: "number" }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});

const estimatorConfig = defineType({
  name: "estimatorConfig",
  title: "Estimator Config",
  type: "document",
  fields: [
    defineField({ name: "companySizes", title: "Company Sizes", type: "array", of: [defineArrayMember({ type: "estimatorMultiplier" })] }),
    defineField({ name: "locationBands", title: "Location Bands", type: "array", of: [defineArrayMember({ type: "estimatorMultiplier" })] }),
    defineField({ name: "supportTiers", title: "Support Tiers", type: "array", of: [defineArrayMember({ type: "estimatorMultiplier" })] }),
    defineField({ name: "cameraBands", title: "Camera Bands", type: "array", of: [defineArrayMember({ type: "estimatorBand" })] }),
    defineField({ name: "networkScopes", title: "Network Scopes", type: "array", of: [defineArrayMember({ type: "estimatorBand" })] }),
    defineField({ name: "complianceLevels", title: "Compliance Levels", type: "array", of: [defineArrayMember({ type: "estimatorBand" })] }),
    defineField({ name: "services", title: "Services", type: "array", of: [defineArrayMember({ type: "estimatorService" })] }),
    defineField({ name: "contingencyLow", title: "Contingency Low", type: "number" }),
    defineField({ name: "contingencyHigh", title: "Contingency High", type: "number" }),
  ],
});

const contactSettings = defineType({
  name: "contactSettings",
  title: "Contact Settings",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "whatsappSales", title: "WhatsApp Sales", type: "string" }),
    defineField({ name: "whatsappSupport", title: "WhatsApp Support", type: "string" }),
    defineField({ name: "meetingUrl", title: "Meeting URL", type: "string" }),
  ],
});

export const schemaTypes = [
  link,
  metric,
  networkNode,
  partnerLogo,
  seo,
  heroSection,
  logoStripSection,
  metricBandSection,
  serviceGridSection,
  contentSplitSection,
  serviceShowcaseItem,
  serviceShowcaseSection,
  categoryShowcaseItem,
  categoryShowcaseSection,
  networkMapSection,
  caseStudyRailSection,
  testimonialRailSection,
  faqBlockSection,
  ctaBandSection,
  richContentSection,
  estimatorMultiplier,
  estimatorBand,
  estimatorService,
  siteSettings,
  navigation,
  footer,
  page,
  service,
  caseStudy,
  post,
  testimonial,
  faq,
  estimatorConfig,
  contactSettings,
];
