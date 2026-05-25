"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const CONSENT_KEY = "auxano_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

type CookieConsent = "accepted" | "declined";

function persistConsent(value: CookieConsent) {
  window.localStorage.setItem(CONSENT_KEY, value);
  document.cookie = `${CONSENT_KEY}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`;
}

function readConsent(): CookieConsent | null {
  const stored = window.localStorage.getItem(CONSENT_KEY);

  if (stored === "accepted" || stored === "declined") {
    return stored;
  }

  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CONSENT_KEY}=`))
    ?.split("=")[1];

  return cookieValue === "accepted" || cookieValue === "declined"
    ? cookieValue
    : null;
}

function TrackingScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const hubspotTrackingId = process.env.NEXT_PUBLIC_HUBSPOT_TRACKING_ID;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
          </Script>
        </>
      ) : null}
      {clarityId ? (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}
      {hubspotTrackingId ? (
        <Script
          id="hubspot-tracking"
          strategy="lazyOnload"
          src={`https://js.hs-scripts.com/${hubspotTrackingId}.js`}
        />
      ) : null}
      <Script id="tawk-chat" strategy="afterInteractive">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a08ce95f0ad271c34b2ee54/1jop6dujt';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
      </Script>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export function CookieConsentManager() {
  const [consent, setConsent] = useState<CookieConsent | null | undefined>(
    undefined,
  );

  useEffect(() => {
    queueMicrotask(() => {
      setConsent(readConsent());
    });
  }, []);

  function handleConsent(value: CookieConsent) {
    persistConsent(value);
    setConsent(value);
  }

  if (consent === "accepted") {
    return <TrackingScripts />;
  }

  if (consent === "declined" || consent === undefined) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-lg border border-white/12 bg-[var(--color-ink)] p-5 text-white shadow-[0_24px_80px_rgba(11,18,32,0.28)] sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold">Cookie privacy</p>
          <p className="mt-2 text-sm leading-6 text-white/72">
            We use cookies and tracking tools to understand website visits,
            improve performance, support live chat, and follow up on service
            enquiries. You can accept or decline. Your choice will be remembered
            on this device.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleConsent("declined")}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/16 px-5 text-sm font-semibold text-white transition hover:border-white/34 hover:bg-white/8"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--color-electric)] px-5 text-sm font-semibold text-white transition hover:bg-[#2557d8]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
