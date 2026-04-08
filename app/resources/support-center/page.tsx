import Link from "next/link";
import { CalendarDays, Headset, Mail, MessageCircle, Phone, WalletCards } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFaqs, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { createWhatsappLink } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Support Center",
  description:
    "Support and contact routes for consultations, estimates, WhatsApp support, and common pre-project questions.",
  path: "/resources/support-center",
});

const supportRoutes = [
  {
    label: "Contact",
    href: "/contact",
    description: "Use the full contact route when you need a structured commercial or technical brief captured.",
    icon: Headset,
  },
  {
    label: "Book Consultation",
    href: "/book-consultation",
    description: "Use consultation-first when the environment needs discovery before implementation can be scoped.",
    icon: CalendarDays,
  },
  {
    label: "Estimate Cost",
    href: "/estimate",
    description: "Start with a planning range when budget alignment needs to happen before a live discussion.",
    icon: WalletCards,
  },
];

const helpFaqIds = new Set(["faq-2", "faq-3", "faq-5", "faq-6"]);

export default async function SupportCenterPage() {
  const [settings, faqs] = await Promise.all([getSiteSettings(), getFaqs()]);
  const helpFaqs = faqs.filter((faq) => helpFaqIds.has(faq.id));

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#F7FAFF_0%,#EEF4FF_100%)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Support Center"
            title="Clear support and contact paths when the next step is already operational."
            description="Use this hub when the need is less about research and more about routing: who to contact, how to book, and which path fits the urgency."
          />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Primary Routes"
            title="Choose the route that matches the urgency and the kind of help needed."
            description="Support center links stay practical: contact, consultation, estimate, and direct messaging."
          />
          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {supportRoutes.map((route) => {
              const Icon = route.icon;

              return (
                <Link
                  key={route.label}
                  href={route.href}
                  className="rounded-[1.75rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)] transition hover:border-[color:rgba(47,107,255,0.22)] hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                    {route.label}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {route.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid gap-4 xl:grid-cols-2">
            <a
              href={createWhatsappLink(
                settings.whatsappSales,
                "Hello Auxano, I need to discuss a new IT, network, or security project.",
              )}
              className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-ink)] p-8 text-white shadow-[0_18px_50px_rgba(11,18,32,0.18)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-cyan)]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-cyan)]">
                WhatsApp Sales
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                Route new commercial conversations directly.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/72">
                Use this path for new rollout ideas, estimate follow-up, procurement questions, or consultation requests.
              </p>
            </a>

            <a
              href={createWhatsappLink(
                settings.whatsappSupport,
                "Hello Auxano, I need support assistance for an existing technical issue.",
              )}
              className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-8 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                WhatsApp Support
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
                Use the faster route for ongoing technical issues.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                Use support routing when an existing environment already needs intervention, troubleshooting, or post-deployment assistance.
              </p>
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-cloud)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Contact Details"
            title="The direct support details stay visible here."
            description="For teams that already know they need to reach someone, not browse more content."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <a
              href={`tel:${settings.phone}`}
              className="rounded-[1.75rem] border border-white bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                <Phone className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Phone
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">{settings.phone}</p>
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="rounded-[1.75rem] border border-white bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                <Mail className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Email
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">{settings.email}</p>
            </a>
            <div className="rounded-[1.75rem] border border-white bg-white p-6 shadow-[0_18px_50px_rgba(11,18,32,0.06)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:rgba(47,107,255,0.08)] text-[var(--color-electric)]">
                <Headset className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Office
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                {settings.address}, {settings.city}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Help FAQs"
            title="Questions that usually come up before reaching out."
            description="Support-oriented answers for consultation, estimation, and lead routing."
            align="center"
          />
          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {helpFaqs.map((item) => (
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
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/contact" variant="secondary">
              Contact Auxano
            </ButtonLink>
            <ButtonLink href="/book-consultation">Book Consultation</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
