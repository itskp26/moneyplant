import type { Metadata } from "next";
import Link from "next/link";
import { getCommonMeta } from "@/lib/meta";

export const metadata: Metadata = getCommonMeta("About MoneyPlant", "/about");

export default function AboutPage() {
  return (
    <div className="container section" style={{ maxWidth: "900px", padding: "6rem 1rem", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "1.5rem", fontFamily: "var(--font-sora)" }}>About MoneyPlant</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", color: "#94a3b8", lineHeight: 1.85 }}>
        <p>
          MoneyPlant is a premium financial intelligence platform built to help Indian and global investors access live market prices, currency exchange rates, commodities data, cryptocurrency updates, and essential tools from one place.
        </p>

        <p>
          Our platform is designed around fast access to meaningful market information. We do not just show numbers; we provide context and navigation so users can easily follow global market trends, compare assets, and check stock performance across major Indian conglomerates, global indices, and crypto markets.
        </p>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f1f5f9" }}>What We Cover</h2>
          <ul style={{ display: "grid", gap: "0.75rem", paddingLeft: "1.2rem", color: "#cbd5e1" }}>
            <li>Live Indian stock prices, including NSE, BSE, and leading conglomerate groups.</li>
            <li>Global indices such as S&P 500, NASDAQ, Dow Jones, FTSE 100, and Nikkei 225.</li>
            <li>Cryptocurrency prices in USD and local currency conversions.</li>
            <li>Forex rate tracking across major currency pairs and emerging market currencies.</li>
            <li>Real-time commodities prices for gold, silver, crude oil, and more.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f1f5f9" }}>Why MoneyPlant</h2>
          <p>
            We emphasize useful, unique content rather than generic or duplicated finance pages. Every hub and tool is intended to solve a user need quickly: discover top gainers, monitor currency volatility, evaluate IPOs, or calculate SIP and EMI scenarios with ease.
          </p>
          <p>
            The site is built to be user-friendly, with rich navigation, deep financial coverage, and legal pages like <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link> that are easy to find and understand.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f1f5f9" }}>Our Data Approach</h2>
          <p>
            MoneyPlant sources market feeds from trusted public APIs and refreshes those values frequently to keep the site relevant. We also provide tools and editorial-style FAQ content to help visitors understand market dynamics without needing to jump between multiple financial sites.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f1f5f9" }}>Our Commitment</h2>
          <p>
            We strive to maintain a clean, high-value user experience with content that is both useful and compliant. Our platform is intended as a reference resource, not as financial advice. Users should always verify information independently and consult a professional before making investment decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
