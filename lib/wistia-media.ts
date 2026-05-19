import type { MarketingPage, PageSection } from "@/lib/types";

export const wistiaMedia = {
  heroLogo: "c2yv4jgz1h",
  softwareLicensing: "148n3m2l2i",
  networking: "bmht6wovj6",
  itManagement: "ult3cb00db",
  itInfrastructure: "nh3tq2qpkz",
  hardware: "rv93ziarjh",
} as const;

export function applyHomeWistiaMedia(page: MarketingPage): MarketingPage {
  if (page.slug !== "home") {
    return page;
  }

  return {
    ...page,
    sections: page.sections.map(applyHomeSectionWistiaMedia),
  };
}

function applyHomeSectionWistiaMedia(section: PageSection): PageSection {
  if (section._type === "hero" && section.mode === "videoCarousel") {
    const slideMediaIds = [
      wistiaMedia.itInfrastructure,
      wistiaMedia.hardware,
      wistiaMedia.networking,
      wistiaMedia.itManagement,
    ];
    const contentSlides = section.slides ?? [];

    return {
      ...section,
      slides: [
        {
          id: "hero-logo-intro",
          wistiaMediaId: wistiaMedia.heroLogo,
          headline: "",
          description: "",
          hideContent: true,
          primaryCta: {
            label: "",
            href: "/book-consultation",
            variant: "primary",
          },
        },
        ...contentSlides.map((slide, index) => ({
          ...slide,
          wistiaMediaId: slideMediaIds[index] ?? slide.wistiaMediaId,
        })),
      ],
    };
  }

  if (section._type === "categoryShowcase") {
    const mediaByItemId: Record<string, string> = {
      "installed-right": wistiaMedia.itInfrastructure,
      "connected-end-to-end": wistiaMedia.networking,
      "original-equipment": wistiaMedia.hardware,
      "licensed-configured": wistiaMedia.softwareLicensing,
      "support-that-stays": wistiaMedia.itManagement,
    };

    return {
      ...section,
      wistiaMediaId: wistiaMedia.itInfrastructure,
      items: section.items.map((item) => ({
        ...item,
        wistiaMediaId: mediaByItemId[item.id],
      })),
    };
  }

  return section;
}
