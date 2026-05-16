"use client";

import { useState, useTransition } from "react";

import { TurnstileField } from "@/components/forms/turnstile-field";
import { cn } from "@/lib/utils";

type LeadFormProps = {
  context: "contact" | "consultation";
  title?: string;
  description?: string;
  className?: string;
};

const serviceInterests = [
  "Managed IT Support",
  "CCTV & Surveillance",
  "Network Infrastructure",
  "Access Control",
  "IT Audit & Compliance",
  "Business Continuity & DR",
];

export function LeadForm({
  context,
  title = "Start the conversation",
  description = "Tell Auxano what needs attention and the team can shape the next step around your environment.",
  className,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    setMessage("");

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setMessage("Please complete the verification check.");
      return;
    }

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      serviceInterest: formData.get("serviceInterest"),
      message: formData.get("message"),
      context,
      turnstileToken,
    };

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setMessage(data?.error ?? "Something went wrong. Please try again.");
      setTurnstileResetKey((current) => current + 1);
      return;
    }

    setStatus("success");
    setMessage(
      context === "consultation"
        ? "Consultation request received. The team can now coordinate the next discussion."
        : "Message received. Auxano can now review the brief and respond.",
    );
    setTurnstileResetKey((current) => current + 1);
  }

  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-7 shadow-[0_24px_60px_rgba(11,18,32,0.08)]",
        className,
      )}
    >
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
          {context === "consultation" ? "Book Consultation" : "Contact Auxano"}
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{description}</p>
      </div>

      <form
        action={(formData) => startTransition(() => void handleSubmit(formData))}
        className="mt-8 grid gap-4 md:grid-cols-2"
      >
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Full name
          <input
            name="name"
            required
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Company
          <input
            name="company"
            required
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Email
          <input
            name="email"
            type="email"
            required
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Phone
          <input
            name="phone"
            required
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] md:col-span-2">
          Service focus
          <select
            name="serviceInterest"
            defaultValue="Managed IT Support"
            className="h-12 rounded-2xl border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 outline-none transition focus:border-[var(--color-electric)]"
          >
            {serviceInterests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)] md:col-span-2">
          Project brief
          <textarea
            name="message"
            rows={6}
            required
            className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.1)] bg-[var(--color-cloud)] px-4 py-4 outline-none transition focus:border-[var(--color-electric)]"
          />
        </label>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <TurnstileField
            onVerify={setTurnstileToken}
            onError={() => {
              setStatus("error");
              setMessage("Verification could not load. Please refresh and try again.");
            }}
            resetKey={turnstileResetKey}
          />
        </div>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] px-6 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(47,107,255,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Sending..." : context === "consultation" ? "Request Consultation" : "Send Message"}
          </button>
        </div>
      </form>

      {message ? (
        <p
          className={cn(
            "mt-5 rounded-2xl px-4 py-3 text-sm",
            status === "success"
              ? "bg-[color:rgba(24,182,126,0.12)] text-[var(--color-success)]"
              : "bg-[color:rgba(239,68,68,0.08)] text-red-600",
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
