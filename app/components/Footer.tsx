import Link from "next/link";
import { TrendingUp } from "lucide-react";

const FOOTER_LINKS = {
  "Indian Markets": [
    { label: "Nifty 50 Live", href: "/indices/nifty-50" },
    { label: "Sensex Live", href: "/indices/sensex" },
    { label: "Bank Nifty", href: "/indices/bank-nifty" },
    { label: "Top Gainers", href: "/top-stocks/gainers" },
    { label: "Top Losers", href: "/top-stocks/losers" },
    { label: "Most Active", href: "/top-stocks/most-active" },
    { label: "IPO Tracker", href: "/ipo" },
  ],
  "Conglomerates": [
    { label: "Adani Group Stocks", href: "/conglomerates/adani" },
    { label: "Reliance Group Stocks", href: "/conglomerates/reliance" },
    { label: "Tata Group Stocks", href: "/conglomerates/tata" },
    { label: "Bajaj Group Stocks", href: "/conglomerates/bajaj" },
    { label: "Mahindra Group Stocks", href: "/conglomerates/mahindra" },
    { label: "Aditya Birla Group", href: "/conglomerates/birla" },
    { label: "HDFC Group Stocks", href: "/conglomerates/hdfc" },
    { label: "ICICI Group Stocks", href: "/conglomerates/icici" },
    { label: "SBI Group Stocks", href: "/conglomerates/sbi" },
    { label: "L&T Group Stocks", href: "/conglomerates/lt" },
    { label: "ITC Group Stocks", href: "/conglomerates/itc" },
    { label: "JSW Group Stocks", href: "/conglomerates/jsw" },
    { label: "Vedanta Group Stocks", href: "/conglomerates/vedanta" },
    { label: "Godrej Group Stocks", href: "/conglomerates/godrej" },
    { label: "A-Z Stocks Directory", href: "/stocks/directory" },
  ],
  "Crypto & Forex": [
    { label: "Bitcoin Price India", href: "/crypto/bitcoin" },
    { label: "Ethereum Price India", href: "/crypto/ethereum" },
    { label: "Top 20 Cryptos", href: "/crypto" },
    { label: "USD to INR", href: "/forex/usd-to-inr" },
    { label: "EUR to INR", href: "/forex/eur-to-inr" },
    { label: "All Forex Pairs", href: "/forex" },
  ],
  "Commodities & Tools": [
    { label: "Gold Rate Today", href: "/commodities/gold" },
    { label: "Silver Rate Today", href: "/commodities/silver" },
    { label: "Crude Oil Price", href: "/commodities/crude-oil" },
    { label: "SIP Calculator", href: "/tools/sip-calculator" },
    { label: "EMI Calculator", href: "/tools/emi-calculator" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "#020817",
        borderTop: "1px solid rgba(51,65,85,0.4)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
        marginTop: "4rem",
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(4, 1fr)",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.7rem", textDecoration: "none", marginBottom: "1.25rem" }}>
              {/* Footer Premium Logo */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(15, 23, 42, 0.4)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="MoneyPlant Logo" width={32} height={32} style={{ objectFit: "contain" }} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sora)",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #10b981, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.15))",
                }}
              >
                MoneyPlant
              </span>
            </Link>
            <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "280px", marginBottom: "1.5rem" }}>
              India&apos;s premier finance data platform. Live Nifty 50, Sensex, stock prices, crypto INR rates, forex, gold & IPO tracker — all in one place.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: "𝕏", href: "https://twitter.com/moneyplantindia", label: "Twitter/X" },
                { icon: "▶", href: "#", label: "YouTube" },
                { icon: "in", href: "#", label: "LinkedIn" },
                { icon: "📸", href: "#", label: "Instagram" },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="social-btn">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(51,65,85,0.4)",
            borderRadius: "10px",
            padding: "1rem 1.25rem",
            marginBottom: "2rem",
          }}
        >
          <p style={{ fontSize: "0.78rem", color: "#475569", lineHeight: 1.6 }}>
            <strong style={{ color: "#64748b" }}>Disclaimer:</strong> MoneyPlant is a financial information platform only. All data is sourced from public APIs and is provided for informational purposes only. This is NOT investment advice. Please consult a SEBI-registered financial advisor before making investment decisions. Equity investments are subject to market risks.
          </p>
        </div>

        {/* Social Share Call to Action */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          <a href="https://twitter.com/intent/tweet?url=https://moneyplant24.com&text=Check%20out%20MoneyPlant%20for%20live%20global%20stock%20prices,%20crypto,%20and%20forex%20rates!%20%24BTC%20%24SPX" target="_blank" rel="noreferrer" style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "0.5rem 1rem", borderRadius: "8px", color: "#60a5fa", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            𝕏 Share on Twitter
          </a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://moneyplant24.com&title=MoneyPlant%20Live%20Global%20Markets" target="_blank" rel="noreferrer" style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(14, 165, 233, 0.3)", padding: "0.5rem 1rem", borderRadius: "8px", color: "#38bdf8", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
            💼 Share on LinkedIn
          </a>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(51,65,85,0.3)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#475569", fontSize: "0.8rem" }}>
            © {year} MoneyPlant. All rights reserved. Data powered by Yahoo Finance & CoinGecko.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Sitemap", href: "/sitemap.xml" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "#475569", fontSize: "0.8rem", textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
