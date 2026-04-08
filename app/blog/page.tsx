import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Search-oriented articles on CCTV planning, managed IT budgeting, network monitoring, and enterprise operations.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="Practical content for teams buying, planning, and governing infrastructure."
          description="The blog is designed for search, authority, and commercial education. Each post supports the main service funnels with operationally credible content."
        />
        <div className="mt-10 grid gap-4 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                {post.category}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                {post.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                <span>{formatDate(post.publishedAt)}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <ButtonLink
                href={`/blog/${post.slug}`}
                variant="ghost"
                className="mt-6 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
              >
                Read article
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
