import Link from "next/link";
import { ArrowUpRight, BookOpenText, Building2, FileQuestion, ServerCog } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts, getFaqs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Knowledge Center",
  description:
    "Planning and learning resources across blog insights, use-case discovery, industry discovery, and frequently asked questions.",
  path: "/resources/knowledge-center",
});

const discoveryLinks = [
  {
    label: "Blog",
    href: "/blog",
    description: "Search-oriented planning content for infrastructure, CCTV, and managed IT decisions.",
    icon: BookOpenText,
  },
  {
    label: "Solutions",
    href: "/services",
    description: "Service categories that connect infrastructure, security, networking, and support.",
    icon: ServerCog,
  },
  {
    label: "Industries",
    href: "/industries",
    description: "Sector-specific landing pages for offices, healthcare, education, retail, and multi-site operations.",
    icon: Building2,
  },
  {
    label: "FAQ Library",
    href: "#faqs",
    description: "Quick answers to common commercial, delivery, and platform questions before a project starts.",
    icon: FileQuestion,
  },
];

export default async function KnowledgeCenterPage() {
  const [posts, faqs] = await Promise.all([getBlogPosts(), getFaqs()]);

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Knowledge Center"
            title="Planning content and discovery paths for teams still framing the environment."
            description="Use this hub when the project is still being understood: what needs attention, which route fits best, and what questions should be resolved before scope is finalized."
          />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Start Here"
            title="Choose the discovery path that fits the question in front of you."
            description="The knowledge center stays intentionally lightweight. It points you to the best next resource instead of trying to become a documentation maze."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {discoveryLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group rounded-[1.7rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)] transition hover:border-[color:rgba(47,107,255,0.22)] hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {link.label}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {link.description}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-electric)]">
                    Open
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Latest Articles"
            title="Recent planning content from the Auxano blog"
            description="A small editorial layer focused on budget, rollout, visibility, and operational tradeoffs."
          />
          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                  {post.category}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  {formatDate(post.publishedAt)} {" - "} {post.readingTime}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-[var(--color-electric)]"
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="faqs" className="scroll-mt-32 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ Library"
            title="Common questions before the project starts to move."
            description="These are the recurring questions buyers ask while comparing routes, planning scope, or deciding how much discovery they need."
            align="center"
          />
          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {faqs.map((item) => (
              <details
                key={item.id}
                className="group rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white px-6 py-5 shadow-[0_16px_40px_rgba(11,18,32,0.06)]"
              >
                <summary className="cursor-pointer list-none text-left text-lg font-medium text-[var(--color-ink)]">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
