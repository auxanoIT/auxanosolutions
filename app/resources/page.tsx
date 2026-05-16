import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts, getCaseStudies, getResourceGroups } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Resources",
  description:
    "Browse Auxano resources across learning, proof, support, and commercial next steps.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const [resourceGroups, posts, caseStudies] = await Promise.all([
    getResourceGroups(),
    getBlogPosts(),
    getCaseStudies(),
  ]);

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Resources"
            title="One structured resource directory for learning, proof, support, and commercial next steps."
            description="Browse Auxano resources by intent: understand the environment, review delivery proof, find support paths, or move directly into consultation."
          />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Directory"
            title="Browse resources the same way buyers actually need them."
            description="Each group is designed as a stable destination layer, not a cluttered content dump."
          />
          <div className="mt-10 space-y-12">
            {resourceGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-32">
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {group.label}
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {group.links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="group min-h-[8.5rem] rounded-[1.4rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)] transition hover:border-[color:rgba(47,107,255,0.22)] hover:-translate-y-0.5"
                    >
                      <div className="flex h-full flex-col justify-between gap-5">
                        <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                          {link.label}
                        </p>
                        <span className="inline-flex items-center text-sm font-semibold text-[var(--color-electric)]">
                          Open resource
                          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Latest Insights"
            title="Recent planning content for infrastructure and security buyers"
            description="Search-oriented learning content for operational teams preparing scope, budget, and rollout decisions."
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

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Proof"
            title="Representative delivery proof across live environments"
            description="Case studies remain a separate top-level route, but they also sit inside the resource directory because buyers need proof during evaluation."
          />
          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <article
                key={caseStudy.slug}
                className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                  {caseStudy.industry}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                  {caseStudy.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {caseStudy.summary}
                </p>
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-[var(--color-electric)]"
                >
                  Review case study
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-[2.25rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-ink)] px-8 py-10 text-white shadow-[0_28px_80px_rgba(11,18,32,0.18)] sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
              Commercial Tools
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Move from research into a scoped conversation when the timing is right.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              Book a consultation when the brief needs commercial and technical review together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink
                href="/book-consultation"
                className="border-white/12 bg-white/8 text-white hover:border-white/22 hover:text-white"
              >
                Book Consultation
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
