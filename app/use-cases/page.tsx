import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { UseCaseIcon } from "@/components/ui/use-case-icon";
import { getUseCaseGroups, getUseCases } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Use Cases",
  description:
    "Explore outcome-led use cases across security, operations, connectivity, managed IT, and compliance planning for modern business environments.",
  path: "/use-cases",
});

export default async function UseCasesPage() {
  const [groups, useCases] = await Promise.all([getUseCaseGroups(), getUseCases()]);

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Use Cases"
            title="Outcome-led entry points for teams buying security, connectivity, support, and audit confidence."
            description="Use cases help buyers recognize the operational problem first, then map it to the right Auxano service stack."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
            <ButtonLink href="/estimate" variant="secondary">
              Estimate Project Scope
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="space-y-16">
          {groups.map((group) => {
            const groupUseCases = useCases.filter((useCase) => useCase.group === group.id);

            return (
              <section key={group.id} id={group.id}>
                <SectionHeading
                  eyebrow="Use Case Group"
                  title={group.label}
                  description={group.description}
                />
                <div className="mt-8 grid gap-4 xl:grid-cols-3">
                  {groupUseCases.map((useCase) => (
                    <Link
                      key={useCase.slug}
                      href={useCase.href}
                      className="group rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_18px_50px_rgba(11,18,32,0.06)] transition hover:-translate-y-0.5 hover:border-[color:rgba(47,107,255,0.24)] hover:shadow-[0_24px_60px_rgba(11,18,32,0.08)]"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] text-[var(--color-ink)]">
                        <UseCaseIcon name={useCase.icon} className="h-6 w-6" strokeWidth={1.8} />
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                        {useCase.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                        {useCase.shortDescription}
                      </p>
                      <span className="mt-6 inline-flex text-sm font-semibold text-[var(--color-electric)]">
                        Explore use case
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="rounded-[2.5rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-ink)] px-6 py-10 text-white shadow-[0_28px_70px_rgba(11,18,32,0.2)] sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
            Consultation
          </p>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Need one of these use cases turned into a real project scope?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
            Start with the commercial problem, match it to the right technical stack, and move into a cleaner consultation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
            <ButtonLink href="/estimate" variant="secondary">
              Estimate Project Scope
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
