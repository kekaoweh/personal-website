import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview shown when the site is shared on LinkedIn, X, iMessage, etc.
export default function Image() {
  const bars = Array.from({ length: 56 }, (_, i) => {
    const x = Math.sin(i * 0.5) * 0.5 + Math.sin(i * 1.3) * 0.3;
    return 24 + Math.round(Math.abs(x) * 70);
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#07080c",
          color: "#e9ebf1",
          backgroundImage:
            "radial-gradient(ellipse 45% 60% at 30% 0%, rgba(111,140,255,0.32), transparent 70%), radial-gradient(ellipse 40% 55% at 70% 0%, rgba(34,211,238,0.18), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#8b91a1" }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#6f8cff" }} />
          {site.now} · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#8b91a1" }}>
            Full-stack developer · Computing Science & Psychology
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, height: 96 }}>
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: `${h}%`,
                borderRadius: 3,
                // Blend blue (#6f8cff) to cyan (#22d3ee); the OG renderer has no color-mix().
                background: `rgb(${Math.round(111 + (34 - 111) * (i / 55))}, ${Math.round(140 + (211 - 140) * (i / 55))}, ${Math.round(255 + (238 - 255) * (i / 55))})`,
                opacity: 0.55 + (i / 55) * 0.45,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
