import type { Metadata } from "next";
import Link from "next/link";
import { getCommonMeta } from "@/lib/meta";

export const metadata: Metadata = getCommonMeta("About MoneyPlant", "/about");

export default function AboutPage() {
  return (
    <div className="container section" style={{ maxWidth: "980px", padding: "6rem 1rem", minHeight: "60vh" }}>
      <div style={{ display: "grid", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "0.95rem", color: "#38bdf8", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>About MoneyPlant</p>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, margin: 0, lineHeight: 1.05, fontFamily: "var(--font-sora)" }}>Market intelligence made simple, fast, and locally relevant.</h1>
          <p style={{ color: "#cbd5e1", lineHeight: 1.9, fontSize: "1.05rem", maxWidth: "780px" }}>
            MoneyPlant is a finance portal built for Indian and global investors who want quick access to live stock prices, crypto trends, forex rates, commodity prices, and practical tools without needing to navigate multiple websites.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {[
            { title: "Live data across markets", description: "Real-time quotes for NSE, BSE, global indices, crypto, forex, and commodities in one place." },
            { title: "Tools that help decisions", description: "SIP, EMI, Lumpsum, and tax calculators designed for investors and personal finance planning." },
            { title: "Local + global coverage", description: "Compare Indian stocks against international benchmarks and cross-border market trends." },
            { title: "Content with context", description: "More than numbers: clear summaries, FAQs, and dedicated policy pages that support a strong user experience." },
          ].map((card) => (
            <div key={card.title} style={{ background: "rgba(15, 23, 42, 0.94)", border: "1px solid rgba(56, 189, 248, 0.12)", borderRadius: "1.2rem", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.05rem", marginBottom: "0.75rem", color: "#f8fafc", fontWeight: 700 }}>{card.title}</h2>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>{card.description}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          <section style={{ background: "rgba(15, 23, 42, 0.94)", border: "1px solid rgba(56, 189, 248, 0.12)", borderRadius: "1.2rem", padding: "1.75rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "#f1f5f9" }}>What Makes MoneyPlant Different</h2>
            <ul style={{ display: "grid", gap: "0.9rem", paddingLeft: "1.3rem", color: "#cbd5e1", margin: 0 }}>
              <li>Designed for market watchers who need fast, meaningful finance data and not just raw streaming numbers.</li>
              <li>Focus on high-quality, original descriptions, legal transparency, and useful browsing experience.</li>
              <li>Clean navigation across stocks, indices, crypto, forex, commodities, IPOs, and calculators.</li>
              <li>Regular content updates with a priority on relevance and unique coverage instead of thin, duplicate pages.</li>
            </ul>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "rgba(15, 23, 42, 0.94)", border: "1px solid rgba(56, 189, 248, 0.12)", borderRadius: "1.2rem", padding: "1.25rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f8fafc" }}>User-first experience</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>A simple interface, clear labels, and quick access to the most important market information.</p>
            </div>
            <div style={{ background: "rgba(15, 23, 42, 0.94)", border: "1px solid rgba(56, 189, 248, 0.12)", borderRadius: "1.2rem", padding: "1.25rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f8fafc" }}>Transparent site policies</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>Easy access to Privacy Policy and Terms of Use, helping both users and review teams understand the site purpose.</p>
            </div>
          </section>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .container.section { padding: 4rem 1rem; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
