import { defineArrayMember, defineField, defineType } from "sanity";

const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "string" }),
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

const blogHeading = defineType({
  name: "blogHeading",
  title: "Heading",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "number",
      options: { list: [2, 3] },
      initialValue: 2,
    }),
    defineField({
      name: "anchor",
      title: "Anchor ID",
      type: "string",
      description:
        "Optional. Use lowercase words with hyphens, for example: planning-the-system",
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare: ({ title }) => ({ title, subtitle: "Heading" }),
  },
});

const blogParagraph = defineType({
  name: "blogParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare: ({ title }) => ({ title, subtitle: "Paragraph" }),
  },
});

const blogPlainText = defineType({
  name: "blogPlainText",
  title: "Plain Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "text",
    },
    prepare: ({ title }) => ({ title, subtitle: "Plain paragraph" }),
  },
});

const blogImageBlock = defineType({
  name: "blogImageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title: title || "Image",
      subtitle: "Image block",
      media,
    }),
  },
});

const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "challenge", title: "Challenge", type: "text" }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "result", title: "Result", type: "text" }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
    }),
    defineField({
      name: "relatedServices",
      title: "Related Services",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});

const post = defineType({
  name: "post",
  title: "Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading Time", type: "string" }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({
      name: "takeaways",
      title: "Takeaways",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "blogPlainText" }),
        defineArrayMember({ type: "blogHeading" }),
        defineArrayMember({ type: "blogParagraph" }),
        defineArrayMember({ type: "blogImageBlock" }),
      ],
    }),
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

const careerOpening = defineType({
  name: "careerOpening",
  title: "Career Openings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["Full Time", "Part Time", "Contract", "Internship", "Remote"],
      },
    }),
    defineField({
      name: "summary",
      title: "Role Summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "isOpen",
      title: "Open Position",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      employmentType: "employmentType",
    },
    prepare: ({ title, location, employmentType }) => ({
      title,
      subtitle: [location, employmentType].filter(Boolean).join(" | "),
    }),
  },
});

const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "FAQ ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const schemaTypes = [
  metric,
  seo,
  blogHeading,
  blogParagraph,
  blogPlainText,
  blogImageBlock,
  caseStudy,
  post,
  testimonial,
  careerOpening,
  faq,
];
