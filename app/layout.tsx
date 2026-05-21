import type { Metadata } from "next";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";

import { AnalyticsBundle } from "@/components/layout/analytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
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
import type { SiteSettings } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Auxano Solutions | Enterprise IT, CCTV, and Network Infrastructure",
    template: "%s | Auxano Solutions",
  },
  description: fallbackSiteSettings.description,
  applicationName: "Auxano Solutions",
  authors: [{ name: "Auxano Solutions Technology Limited" }],
  creator: "Auxano Solutions Technology Limited",
  publisher: "Auxano Solutions Technology Limited",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Auxano Solutions | Enterprise IT, CCTV, and Network Infrastructure",
    description: fallbackSiteSettings.description,
    url: absoluteUrl("/"),
    siteName: "Auxano Solutions",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Auxano Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auxano Solutions | Enterprise IT, CCTV, and Network Infrastructure",
    description: fallbackSiteSettings.description,
    images: [{ url: absoluteUrl("/opengraph-image"), alt: "Auxano Solutions" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

function buildSiteJsonLd(settings: SiteSettings) {
  const organizationId = `${absoluteUrl("/")}#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": organizationId,
        name: settings.name,
        alternateName: settings.shortName,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/image/AUxano.webp"),
        image: absoluteUrl("/opengraph-image"),
        description: settings.description,
        email: settings.email,
        telephone: settings.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: settings.city,
          addressCountry: settings.country,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Nigeria",
          },
        ],
        knowsAbout: [
          "Managed IT support",
          "CCTV installation",
          "Network infrastructure",
          "Access control systems",
          "IT audit and compliance",
          "Business continuity",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: settings.shortName,
        url: absoluteUrl("/"),
        publisher: {
          "@id": organizationId,
        },
        inLanguage: "en-NG",
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getNavigation();
  const needsSolutions = navigation.some((item) => item.kind === "solutions");
  const needsIndustries = navigation.some((item) => item.kind === "industries");
  const needsResources = navigation.some((item) => item.kind === "resources");

  const [
    solutionCategories,
    industries,
    resourceGroups,
    services,
    footerColumns,
    siteSettings,
  ] = await Promise.all([
    needsSolutions ? getSolutionCategories() : Promise.resolve([]),
    needsIndustries ? getIndustries() : Promise.resolve([]),
    needsResources ? getResourceGroups() : Promise.resolve([]),
    needsSolutions ? getServices() : Promise.resolve([]),
    getFooterColumns(),
    getSiteSettings(),
  ]);

  return (
    <html lang="en" className="antialiased">
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
        <JsonLd data={buildSiteJsonLd(siteSettings)} />
        <AnalyticsBundle />
      </body>
    </html>
  );
}
