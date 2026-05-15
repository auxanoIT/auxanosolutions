"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  DatabaseBackup,
  Handshake,
  KeyRound,
  LifeBuoy,
  Mail,
  MapPin,
  Network,
  Phone,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { PartnerLogoMarquee } from "@/components/sections/partner-logo-marquee";
import { Container } from "@/components/ui/container";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const metrics = [
  { value: "2012", label: "Founded" },
  { value: "12+", label: "Years ICT delivery" },
  { value: "35%", label: "Client cost savings" },
  { value: "24/7", label: "Dedicated support" },
];

const values = [
  {
    icon: Users2,
    title: "Customer-centric",
    description:
      "Every solution is shaped around the client environment, budget, operating pressure, and long-term support need.",
  },
  {
    icon: Target,
    title: "Results-driven",
    description:
      "We focus on measurable outcomes: lower operating cost, better uptime, clearer controls, and simpler vendor management.",
  },
  {
    icon: Sparkles,
    title: "Innovative",
    description:
      "Auxano blends proven infrastructure with modern IP-based, cloud, security, and hybrid technology where it makes business sense.",
  },
  {
    icon: Handshake,
    title: "Trusted teamwork",
    description:
      "Our engineers, project leads, and client teams work with open communication from discovery through handover and support.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent",
    description:
      "Scope, risk, documentation, commercial decisions, and post-deployment ownership stay visible throughout the engagement.",
  },
];

const services = [
  {
    icon: ShieldCheck,
    title: "Surveillance & Access Control",
    description: "Design, installation, remediation, door access, and operator-ready security environments.",
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    description: "Structured LAN cabling, wireless, switching, routing, IP telephony, and documentation.",
  },
  {
    icon: LifeBuoy,
    title: "Managed IT Support",
    description: "Helpdesk, vendor management, staff augmentation, monitoring, and strategic planning.",
  },
  {
    icon: Server,
    title: "Data Centre & Servers",
    description: "Server build-out, virtualization, HVAC readiness, storage, and resource migration.",
  },
  {
    icon: KeyRound,
    title: "Cybersecurity",
    description: "Security reviews, threat mitigation, incident response, audits, and compliance support.",
  },
  {
    icon: DatabaseBackup,
    title: "Backup & Recovery",
    description: "Proactive data protection, recovery planning, post-crash retrieval, and continuity support.",
  },
];

const leaders = [
  {
    name: "Olatunji Aduloju",
    role: "Managing Director",
    office: "Corporate Office, Lagos",
    contact: "olatunji@auxanosolutions.net",
  },
  {
    name: "Tosin Ayorinde",
    role: "IT Business & Technical Support Lead",
    office: "Corporate Office, Lagos",
    contact: "tosin@auxanosolutions.net",
  },
  {
    name: "Kayode Mejabi",
    role: "Regional Technical Support Lead",
    office: "Abuja Office",
    contact: "kayode@auxanosolutions.net",
  },
  {
    name: "Mahmoud Khallaf",
    role: "Operations & Technical Lead, North Africa",
    office: "Cairo Office",
    contact: "mahmoudk@auxanosolutions.net",
  },
];

const offices = [
  {
    title: "Corporate Office",
    location: "Lagos, Nigeria",
    address:
      "26, Adeshina Street, Off Oluwole Philips, Obafemi Awolowo Way, Ikeja, Lagos.",
    phone: "08034247062",
    email: "info@auxanosolutions.net",
  },
  {
    title: "Abuja Office",
    location: "FCT, Nigeria",
    address:
      "4th Floor, ChurchGate Tower C, Constitution Avenue, Central Business District, FCT, Nigeria.",
    phone: "0702-639-3446",
    email: "kayode@auxanosolutions.net",
  },
  {
    title: "Cairo Office",
    location: "Cairo, Egypt",
    address: "53, Capital Mall, behind the Court, Fifth Settlement, New Cairo, Egypt.",
    phone: "+20 101 639 7193",
    email: "mahmoudk@auxanosolutions.net",
  },
];

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : fadeUp}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  center = false,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  inverse?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-4xl text-center" : "max-w-3xl"}>
      <p
        className={
          inverse
            ? "text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200"
            : "text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]"
        }
      >
        {eyebrow}
      </p>
      <h2
        className={
          inverse
            ? "mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl"
            : "mt-4 text-balance text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl"
        }
      >
        {title}
      </h2>
      {description ? (
        <p
          className={
            inverse
              ? "mt-5 text-pretty text-base leading-8 text-white/72 sm:text-lg"
              : "mt-5 text-pretty text-base leading-8 text-[var(--color-muted)] sm:text-lg"
          }
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      style={variant === "secondary" ? { color: "#0b1220" } : undefined}
      className={
        variant === "primary"
          ? "inline-flex items-center gap-2 rounded-full bg-[#f97316] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ea580c]"
          : "inline-flex items-center gap-2 rounded-full border border-[color:rgba(10,48,71,0.16)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:border-[color:rgba(47,107,255,0.4)]"
      }
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function AboutGeneaInspired() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : -46]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.22], [1, reduceMotion ? 1 : 1.035]);

  return (
    <div className="overflow-hidden bg-[#f7faff] text-[var(--color-ink)]">
      <section className="relative bg-[#0A3047] pb-10 pt-20 text-white sm:pb-12 lg:pt-24">
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_16%_18%,rgba(25,213,255,0.22),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(249,115,22,0.2),transparent_24%)]" />
        <Container className="relative overflow-hidden">
          <motion.div
            style={{ y: heroY }}
            className="mx-auto max-w-xs text-center sm:max-w-5xl"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
              About Auxano
            </p>
            <h1 className="mt-5 text-balance text-2xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Meet Auxano, your ICT solutions and support partner.
            </h1>
            <p className="mx-auto mt-6 max-w-xs text-pretty text-sm leading-7 text-white/78 sm:max-w-3xl sm:text-xl sm:leading-8">
              Reliable and affordable ICT solutions for organizations that need infrastructure,
              security, support, and continuity delivered with serious operational discipline.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href="/book-consultation">Book Consultation</CtaLink>
              <CtaLink href="/services" variant="secondary">
                Explore Services
              </CtaLink>
            </div>
          </motion.div>

          <motion.div
            style={{ scale: mediaScale, maxWidth: "calc(100vw - 40px)" }}
            className="relative mx-auto mt-10 h-96 w-full max-w-sm overflow-hidden rounded-lg border border-white/14 bg-white/8 shadow-[0_34px_95px_rgba(0,0,0,0.28)] sm:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, y: 44 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/image/It_management.jpg"
              alt="Auxano ICT support specialist reviewing a mobile work order"
              fill
              priority
              className="object-cover object-[center_36%]"
              sizes="(min-width: 1280px) 1216px, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,48,71,0.02),rgba(10,48,71,0.78))]" />
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 sm:bottom-5 sm:left-5 sm:right-5 sm:grid-cols-4 sm:gap-3">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.08 }}
                  className="min-w-0 rounded-lg border border-white/18 bg-white/12 p-3 backdrop-blur-md sm:p-4"
                >
                  <div className="text-2xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-1 break-words text-[0.66rem] font-medium uppercase leading-4 tracking-[0.08em] text-white/68 sm:text-xs sm:tracking-[0.12em]">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              Our Purpose
            </p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
              Enhancing productivity, reducing operating costs, and helping organizations grow
              through dependable ICT systems.
            </h2>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[#eef4ff] py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative h-96 overflow-hidden rounded-lg bg-[#0A3047]">
              <Image
                src="/image/IT Infrastructure.png"
                alt="Secure infrastructure access system representing Auxano enterprise ICT delivery"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0A3047]">
                Enterprise-grade delivery
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
              About Us
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
              Specialized, cost-effective ICT services across Nigeria and North Africa.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              <p>
                Auxano Solutions Technology Limited delivers ICT services that help businesses
                streamline operations, secure assets, and scale efficiently.
              </p>
              <p>
                Since 2012, our team has deployed enterprise-grade IT infrastructure, surveillance,
                access control, networks, software, hardware, and managed support for organizations
                across telecoms, finance, energy, manufacturing, and services.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Strategic partnerships with Dell, Microsoft, VMware, McAfee, Paxton, and more",
                "All-in-one model that simplifies vendor management and reduces overhead",
                "Tailored hybrid solutions integrating analogue and IP-based technologies",
                "OEM procurement, configuration, installation, support, and project management",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-[#0A3047]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f97316]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <PartnerLogoMarquee />

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Company Values"
            title="The working standards behind every Auxano engagement."
            description="These principles guide how our engineers, technical leads, and project teams make decisions before, during, and after delivery."
            center
          />
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.04}>
                  <article className="group h-full rounded-lg border border-[color:rgba(10,48,71,0.1)] bg-white p-5 shadow-[0_18px_48px_rgba(10,48,71,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[color:rgba(47,107,255,0.34)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eaf3ff] text-[var(--color-electric)] transition group-hover:bg-[#0A3047] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-[var(--color-ink)]">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#0A3047] py-16 text-white sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionIntro
              eyebrow="The Auxano Promise"
              title="Dependable technology is only one part of the result."
              description="Auxano stays committed to outstanding support, clear handover, and continuous ownership after deployment."
              inverse
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.title} delay={index * 0.04}>
                  <article className="min-h-52 rounded-lg border border-white/12 bg-white/[0.07] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#0A3047]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">{service.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#eef4ff] py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Leadership"
            title="Office and technical leads for client success."
            description="Portraits are placeholders for now, ready to be replaced with real executive images when available."
            center
          />
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((leader, index) => (
              <Reveal key={leader.name} delay={index * 0.05}>
                <article className="group overflow-hidden rounded-lg border border-[color:rgba(10,48,71,0.1)] bg-white shadow-[0_20px_55px_rgba(10,48,71,0.08)]">
                  <div className="relative aspect-[4/4.6] overflow-hidden bg-[#0A3047]">
                    <Image
                      src="/image/about/team-placeholder.svg"
                      alt={`${leader.name} placeholder portrait`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-[#f97316]">{leader.role}</p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
                      {leader.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {leader.office}
                    </p>
                    <a
                      href={`mailto:${leader.contact}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-electric)]"
                    >
                      Contact
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionIntro
            eyebrow="Our Offices"
            title="Local presence for projects across Nigeria and North Africa."
            center
          />
          <div className="mt-11 grid gap-5 lg:grid-cols-3">
            {offices.map((office, index) => (
              <Reveal key={office.title} delay={index * 0.06}>
                <article className="h-full rounded-lg border border-[color:rgba(10,48,71,0.1)] bg-[#f7faff] p-6 shadow-[0_18px_50px_rgba(10,48,71,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A3047] text-white">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-[var(--color-ink)]">
                    {office.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-electric)]">
                    {office.location}
                  </p>
                  <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                    <p className="flex gap-3">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#f97316]" />
                      <span>{office.address}</span>
                    </p>
                    <p className="flex gap-3">
                      <Phone className="mt-1 h-4 w-4 shrink-0 text-[#f97316]" />
                      <span>{office.phone}</span>
                    </p>
                    <p className="flex gap-3">
                      <Mail className="mt-1 h-4 w-4 shrink-0 text-[#f97316]" />
                      <span>{office.email}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0A3047] py-16 text-white sm:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
              Next Step
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight sm:text-5xl">
              Let’s design the right ICT solution for your business.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Talk to Auxano about infrastructure, networking, security, managed support,
              audits, relocation, procurement, or a phased technical rollout.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-wrap gap-3 lg:justify-end">
            <CtaLink href="/book-consultation">Talk to Sales</CtaLink>
            <CtaLink href="/estimate" variant="secondary">
              Estimate Project
            </CtaLink>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
