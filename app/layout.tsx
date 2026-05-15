import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import "./globals.css";

import { AnalyticsBundle } from "@/components/layout/analytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteSettings as fallbackSiteSettings } from "@/data/site-content";
import {
  getFooterColumns,
  getIndustries,
  getNavigation,
  getResourceGroups,
  getServices,
  getSiteSettings,
  getSolutionCategories,
} from "@/lib/content";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://auxanosolutions.net"),
  title: {
    default: "Auxano Solutions | Enterprise IT, CCTV, and Network Infrastructure",
    template: "%s | Auxano Solutions",
  },
  description: fallbackSiteSettings.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    navigation,
    solutionCategories,
    industries,
    resourceGroups,
    services,
    footerColumns,
    siteSettings,
  ] = await Promise.all([
    getNavigation(),
    getSolutionCategories(),
    getIndustries(),
    getResourceGroups(),
    getServices(),
    getFooterColumns(),
    getSiteSettings(),
  ]);

  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <div className="flex min-h-screen flex-col">
          <SiteHeader
            navigation={navigation}
            solutionCategories={solutionCategories}
            industries={industries}
            resourceGroups={resourceGroups}
            services={services}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter columns={footerColumns} settings={siteSettings} />
        </div>
        <AnalyticsBundle />
      </body>
    </html>
  );
}
