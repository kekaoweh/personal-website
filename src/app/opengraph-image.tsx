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
          background: "#0d0d0c",
          color: "#f1efe9",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,108,255,0.28), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#8f8c85" }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#3b6cff" }} />
          {site.now} · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 34, color: "#8f8c85" }}>
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
                background: i > 40 ? "#3b6cff" : "rgba(241,239,233,0.35)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
