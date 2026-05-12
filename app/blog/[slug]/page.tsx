import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { getBlogPostBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Article not found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
    keywords: [post.category, post.title],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.publishedAt,
          description: post.excerpt,
          url: absoluteUrl(`/blog/${post.slug}`),
          author: {
            "@type": "Organization",
            name: "Auxano Solutions Technology Limited",
          },
        }}
      />
      <article className="py-20 sm:py-24">
        <Container className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
            {post.category}
          </p>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <p className="mt-8 text-lg leading-8 text-[var(--color-muted)]">{post.excerpt}</p>

          <div className="mt-10 rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Key takeaways
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-ink)]">
              {post.takeaways.map((takeaway) => (
                <li key={takeaway} className="flex gap-3">
                  <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-6 text-base leading-8 text-[var(--color-muted)]">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-[color:rgba(11,18,32,0.08)] pt-8">
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore services
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}
