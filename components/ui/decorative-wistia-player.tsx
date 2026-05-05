"use client";

import dynamic from "next/dynamic";
import { useCallback, type CSSProperties } from "react";
import type { WistiaPlayer as WistiaPlayerElement } from "@wistia/wistia-player";

export type WistiaPlayerEvent = CustomEvent & {
  target: WistiaPlayerElement;
};

export type DecorativeWistiaPlayerProps = {
  mediaId: string;
  autoplay?: boolean;
  branding?: boolean;
  bigPlayButton?: boolean;
  className?: string;
  controlsVisibleOnLoad?: boolean;
  copyLinkAndThumbnail?: boolean;
  endVideoBehavior?: "default" | "loop" | "reset";
  fullscreenControl?: boolean;
  muted?: boolean;
  playbackRateControl?: boolean;
  playBarControl?: boolean;
  playPauseControl?: boolean;
  playPauseNotifier?: boolean;
  playerColor?: string;
  preload?: "auto" | "metadata" | "none";
  seo?: boolean;
  settingsControl?: boolean;
  silentAutoplay?: boolean | "allow";
  style?: CSSProperties;
  transparentLetterbox?: boolean;
  volumeControl?: boolean;
  onApiReady?: (event: WistiaPlayerEvent) => void;
  onEnded?: (event: WistiaPlayerEvent) => void;
  onLoadedMetadata?: (event: WistiaPlayerEvent) => void;
  onTimeUpdate?: (event: WistiaPlayerEvent) => void;
};

const WISTIA_STYLE_ID = "auxo-decorative-wistia-style";

const WistiaPlayer = dynamic<DecorativeWistiaPlayerProps>(
  () =>
    import("@wistia/wistia-player-react").then((module) => module.WistiaPlayer),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_28%,rgba(25,213,255,0.14),transparent_22%),linear-gradient(180deg,rgba(4,24,39,0.92),rgba(6,35,56,0.98))]" />
    ),
  },
);

export function applyDecorativePlayerStyles(player: WistiaPlayerElement) {
  const shadowRoot = player.shadowRoot;

  if (!shadowRoot || shadowRoot.getElementById(WISTIA_STYLE_ID)) {
    player.setAttribute("aria-hidden", "true");
    player.tabIndex = -1;
    return;
  }

  const style = document.createElement("style");
  style.id = WISTIA_STYLE_ID;
  style.textContent = `
    .w-ui-container,
    .click-for-sound-btn,
    .w-vulcan-v2-button,
    a[aria-label*="Wistia Logo"] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    .w-vulcan--background {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }

    .w-video-wrapper,
    video {
      display: block !important;
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-width: 100% !important;
      min-height: 100% !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    video {
      object-fit: cover !important;
      object-position: center center !important;
      filter: saturate(0.96) contrast(1.03);
    }
  `;

  shadowRoot.appendChild(style);
  player.setAttribute("aria-hidden", "true");
  player.tabIndex = -1;
}

export function DecorativeWistiaPlayer(props: DecorativeWistiaPlayerProps) {
  const handleApiReady = useCallback(
    (event: WistiaPlayerEvent) => {
      applyDecorativePlayerStyles(event.target);
      props.onApiReady?.(event);
    },
    [props],
  );

  const handleLoadedMetadata = useCallback(
    (event: WistiaPlayerEvent) => {
      applyDecorativePlayerStyles(event.target);
      props.onLoadedMetadata?.(event);
    },
    [props],
  );

  return (
    <WistiaPlayer
      {...props}
      onApiReady={handleApiReady}
      onLoadedMetadata={handleLoadedMetadata}
    />
  );
}
