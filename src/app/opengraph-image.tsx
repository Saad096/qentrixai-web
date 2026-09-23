import { ImageResponse } from "next/og";

/**
 * One generated card for every route that does not define its own.
 *
 * The old site pointed every page's og:image at /og.png, which 404'd in
 * production -- so every share of every page was blank (audit A-06).
 */
export const runtime = "edge";
export const alt = "QentrixAI. AI systems that survive production";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#262621",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#F5F4EE",
              display: "flex",
            }}
          />
          <div style={{ color: "#F0EEE6", fontSize: 30, fontWeight: 600 }}>QentrixAI</div>
        </div>

        <div
          style={{
            color: "#F0EEE6",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 940,
            display: "flex",
          }}
        >
          AI systems that survive real users, real load, and handover.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#0FA88C",
            color: "#0E1F1B",
            borderRadius: 16,
            padding: "26px 32px",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", gap: 44 }}>
            <div style={{ display: "flex" }}>25+ systems shipped</div>
            <div style={{ display: "flex" }}>12 geographies</div>
            <div style={{ display: "flex" }}>6wk to MVP</div>
          </div>
          <div style={{ display: "flex", fontWeight: 600 }}>qentrix-ai.com</div>
        </div>
      </div>
    ),
    size
  );
}
