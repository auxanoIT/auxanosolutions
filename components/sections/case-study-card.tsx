import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { getCaseStudyMedia } from "@/lib/case-study-media";
import type { CaseStudy } from "@/lib/types";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
  featured?: boolean;
};

export function CaseStudyCard({ caseStudy, featured = false }: CaseStudyCardProps) {
  const media = getCaseStudyMedia(caseStudy);
  const metrics = caseStudy.metrics?.slice(0, featured ? 3 : 2) ?? [];

  return (
    <article className="group grid h-full overflow-hidden rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white shadow-[0_20px_55px_rgba(11,18,32,0.07)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-cloud)]">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          quality={56}
          sizes={featured ? "(min-width: 1280px) 42vw, 100vw" : "(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0)_45%,rgba(11,18,32,0.62)_100%)]" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
          <span className="rounded-full bg-white/18 px-3 py-2 backdrop-blur">
            {caseStudy.industry || "Case Study"}
          </span>
          {caseStudy.location ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/18 px-3 py-2 backdrop-blur">
              <MapPin className="h-3.5 w-3.5" />
              {caseStudy.location}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex h-full flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-electric)]">
          {caseStudy.client || "Client outcome"}
        </p>
        <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--color-ink)]">
          {caseStudy.title}
        </h2>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--color-muted)]">
          {caseStudy.summary}
        </p>
        {metrics.length ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={`${caseStudy.slug}-${metric.label}`} className="rounded-2xl bg-[var(--color-cloud)] px-4 py-3">
                <p className="text-xl font-semibold text-[var(--color-ink)]">{metric.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        <ButtonLink
          href={`/case-studies/${caseStudy.slug}`}
          variant="ghost"
          className="mt-auto justify-start px-0 pt-6 text-[var(--color-electric)] hover:bg-transparent"
        >
          View case study
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </ButtonLink>
      </div>
    </article>
  );
}
