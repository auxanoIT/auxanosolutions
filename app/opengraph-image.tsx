import { ImageResponse } from "next/og";

export const alt = "Auxano Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(145deg, rgba(11,18,32,1) 0%, rgba(24,37,67,1) 50%, rgba(47,107,255,0.85) 100%)",
          color: "white",
          padding: "64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(25,213,255,0.35), transparent 28%), radial-gradient(circle at 80% 20%, rgba(47,107,255,0.28), transparent 24%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "32px",
            padding: "48px",
            background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                height: "72px",
                width: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "24px",
                background: "linear-gradient(145deg, #2F6BFF, #19D5FF)",
                fontSize: "32px",
                fontWeight: 700,
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "22px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#19D5FF" }}>
                Auxano Solutions
              </span>
              <span style={{ fontSize: "22px", color: "rgba(255,255,255,0.72)" }}>
                IT, Security, and Infrastructure
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "780px" }}>
            <span style={{ fontSize: "20px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#19D5FF" }}>
              Enterprise Digital Platform
            </span>
            <h1 style={{ margin: 0, fontSize: "68px", lineHeight: 1, letterSpacing: "-0.06em" }}>
              Managed IT, CCTV, and network visibility that feel production-grade.
            </h1>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
