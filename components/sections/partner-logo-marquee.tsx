"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { Container } from "@/components/ui/container";

const partnerLogos = [
  { src: "/image/patner_logo/amcrest_logo.png.png", alt: "Amcrest" },
  {
    src: "/image/patner_logo/cambium_networks_icon.png.png",
    alt: "Cambium Networks",
  },
  { src: "/image/patner_logo/canon_anz_icon.jpeg.png", alt: "Canon" },
  {
    src: "/image/patner_logo/centurion_health_icon.png.png",
    alt: "Centurion Health",
  },
  { src: "/image/patner_logo/d-link_usa_icon.png.png", alt: "D-Link" },
  {
    src: "/image/patner_logo/dahua_technology_icon.jpeg.png",
    alt: "Dahua Technology",
  },
  {
    src: "/image/patner_logo/exceltelecominc_icon.jpeg.png",
    alt: "Excel Telecom",
  },
  { src: "/image/patner_logo/fortigate-awscom_logo.svg.png", alt: "Fortigate" },
  { src: "/image/patner_logo/Frame 50.png", alt: "Auxano partner" },
  { src: "/image/patner_logo/Icon.jpeg (1).png", alt: "Auxano client" },
  { src: "/image/patner_logo/Icon.jpeg (2).png", alt: "Auxano client" },
  { src: "/image/patner_logo/Icon.jpeg (3).png", alt: "Auxano client" },
  { src: "/image/patner_logo/Icon.jpeg (4).png", alt: "Auxano client" },
  { src: "/image/patner_logo/Icon.jpeg.png", alt: "Auxano client" },
  { src: "/image/patner_logo/Icon.png.png", alt: "Auxano client" },
  { src: "/image/patner_logo/kaspersky_icon.jpeg.png", alt: "Kaspersky" },
  {
    src: "/image/patner_logo/key_king_mobile_locksmith_icon.png.png",
    alt: "Key King Mobile Locksmith",
  },
  {
    src: "/image/patner_logo/matrix_professional_haircare__color_icon.png.png",
    alt: "Matrix Professional Haircare",
  },
  { src: "/image/patner_logo/mavialarm_logo.png.png", alt: "Mavi Alarm" },
  { src: "/image/patner_logo/panasonic_usa_icon.jpeg.png", alt: "Panasonic" },
  {
    src: "/image/patner_logo/sharp_healthcare_logo.png.png",
    alt: "Sharp Healthcare",
  },
  { src: "/image/patner_logo/toshiba_icon.jpeg.png", alt: "Toshiba" },
  { src: "/image/patner_logo/vmware_icon.jpeg.png", alt: "VMware" },
];

const marqueeLogos = [...partnerLogos, ...partnerLogos];

export function PartnerLogoMarquee() {
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollMobileLogos(direction: "left" | "right") {
    mobileScrollerRef.current?.scrollBy({
      left: direction === "left" ? -180 : 180,
      behavior: "smooth",
    });
  }

  return (
    <section className="overflow-hidden bg-[#0A3047] py-10 text-white sm:py-12">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-balance text-[2rem] font-medium leading-tight tracking-[-0.035em] sm:text-[2.7rem] lg:text-[3.25rem]">
            Trusted by Clients and Partners
          </h2>
          <p className="mt-3 text-lg leading-7 text-white/82 sm:text-[1.35rem]">
            to secure people, property, and data
          </p>
        </div>
      </Container>

      <div className="partner-logo-viewport relative mt-9 hidden h-24 overflow-hidden sm:mt-11 sm:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-[linear-gradient(90deg,#0A3047_0%,rgba(10,48,71,0)_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-[linear-gradient(270deg,#0A3047_0%,rgba(10,48,71,0)_100%)]" />

        <div
          className="partner-logo-marquee flex h-full w-max items-center gap-12 px-6 sm:gap-20 sm:px-10"
          aria-label="Auxano client and partner logos"
        >
          {marqueeLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="group mt-7 flex h-14 w-[7.5rem] shrink-0 items-center justify-center sm:w-[9rem]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={116}
                height={44}
                className="max-h-8 w-auto max-w-[7.5rem] object-contain opacity-58 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-9 sm:max-w-[9rem]"
                sizes="(min-width: 640px) 3rem, 5rem"
              />
            </div>
          ))}
        </div>
      </div>

      <Container className="mt-9 sm:hidden">
        <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2">
          <button
            type="button"
            aria-label="Previous partner logos"
            onClick={() => scrollMobileLogos("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={mobileScrollerRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-9 overflow-x-auto scroll-smooth px-1"
            aria-label="Auxano client and partner logos"
          >
            {partnerLogos.map((logo) => (
              <div
                key={logo.src}
                className="flex h-16 w-[7.5rem] shrink-0 snap-center items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={116}
                  height={44}
                  className="max-h-8 w-auto max-w-[7.5rem] object-contain opacity-70 grayscale transition duration-300"
                  sizes="7.5rem"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next partner logos"
            onClick={() => scrollMobileLogos("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
