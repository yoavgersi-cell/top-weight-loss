import { ImageResponse } from "next/og";

// OG image for the hub landing (treatmentshub.com/, rewritten to /hub by the
// proxy, which passes /hub/* through unprefixed - so this file-convention URL
// resolves on the hub host). Before this the hub home shipped no og:image.
export const runtime = "edge";
export const alt = "Treatments Hub - Compare Online Treatment Providers & Prices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0C4B75 0%, #093d61 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: "36px", fontSize: "34px", fontWeight: 800, color: "white" }}>
          <span>Treatments</span>
          <span style={{ color: "#8FC5F5" }}>Hub</span>
          <span style={{ fontSize: "20px", marginLeft: "4px", color: "rgba(255,255,255,0.7)" }}>.com</span>
        </div>
        <div style={{ fontSize: "56px", fontWeight: 800, color: "white", lineHeight: 1.15, marginBottom: "24px" }}>
          Compare Online Treatment Providers
        </div>
        <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>
          Weight loss, hair loss, TRT, HRT and online therapy - verified prices, real reviews, honest rankings.
        </div>
      </div>
    ),
    { ...size }
  );
}
