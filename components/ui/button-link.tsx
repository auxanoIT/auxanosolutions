import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200",
        variant === "primary" &&
          "bg-[linear-gradient(135deg,var(--color-electric),var(--color-cyan))] text-white shadow-[0_18px_50px_rgba(47,107,255,0.25)] hover:-translate-y-0.5",
        variant === "secondary" &&
          "border border-[color:rgba(11,18,32,0.12)] bg-white text-[var(--color-ink)] hover:border-[color:rgba(47,107,255,0.32)] hover:text-[var(--color-electric)]",
        variant === "ghost" &&
          "text-[var(--color-ink)] hover:bg-[color:rgba(11,18,32,0.04)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
