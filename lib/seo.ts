import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/utils";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  imageAlt?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

const defaultKeywords = [
  "Auxano Solutions",
  "managed IT support Nigeria",
  "CCTV installation Lagos",
  "network infrastructure Nigeria",
  "IT infrastructure services",
  "access control systems",
  "business IT support",
];

export function buildMetadata({
  title,
  description,
  path = "/",
  imagePath = "/opengraph-image",
  imageAlt = title,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: MetadataOptions): Metadata {
  const pageUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(imagePath);

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    applicationName: "Auxano Solutions",
    authors: [{ name: "Auxano Solutions Technology Limited" }],
    creator: "Auxano Solutions Technology Limited",
    publisher: "Auxano Solutions Technology Limited",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Auxano Solutions",
      type,
      locale: "en_NG",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  };
}
