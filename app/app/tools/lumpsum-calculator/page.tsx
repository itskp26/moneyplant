import type { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, Info, HelpCircle, 
  ArrowLeft, TrendingUp, ShieldAlert,
  ChevronRight, BadgeCheck
} from "lucide-react";
import LumpsumCalculator from "@/components/LumpsumCalculator";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Lumpsum Calculator — Mutual Fund Returns Estimator ${new Date().getFullYear()} | MoneyPlant`,
  description: `Calculate potential returns on your one-time lumpsum mutual fund investments today ${new Date().getFullYear()}. Estimate future wealth based on expected return rates and time periods with precision.`,
  keywords: [
    "lumpsum calculator today", "one time investment calculator", "mutual fund lumpsum estimator",
    "lump sum return calculator live", "investment returns estimator worldwide",
    "finance tools moneyplant", "best lumpsum calculator 2025", "wealth growth calculator",
    "calculate returns on 1 lakh", "calculate returns on 5 lakh", "calculate returns on 10 lakh",
    "fd vs mutual fund lumpsum", "lumpsum return after 5 years", "lumpsum return after 10 years",
    "lumpsum return after 20 years", "stock market lumpsum calculator",
    "crypto lumpsum return calculator", "gold lumpsum returns india",
    "compound interest lumpsum calculator", "future value of one time investment",
    "retirement corpus lumpsum calculator", "child education lumpsum planner",
    "lumpsum calculator india", "lumpsum calculator usa", "lumpsum calculator uk",
    "lumpsum calculator uae", "lumpsum calculator saudi arabia",
    "best way to invest 10 lakh today", "where to invest lumpsum money 2025",
    "lumpsum returns 12 percent", "lumpsum returns 15 percent", "lumpsum returns 20 percent",
    "inflation adjusted lumpsum calculator", "tax impact on lumpsum withdrawal india",
    "major cap gain tax calculator", "lumpsum profit vs investment",
    "mutual fund lumpsum returns chart", "historical lumpsum returns nse bse",
    "nifty 50 lumpsum performance idag", "sensex lumpsum returns history",
    "real estate vs lumpsum fund returns", "gold bullion vs lumpsum investment",
    "lumpsum return formula", "how is lumpsum return calculated",
    `best investment tools ${new Date().getFullYear()}`, `top 20 financial apps ${new Date().getFullYear()}`,
    "moneyplant wealth estimator", "lumpsum returns on index funds",
  ].join(", "),
};

export default function LumpsumPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "Lumpsum Calculator", url: "/tools/lumpsum-calculator" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <Link 
            href="/tools" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              color: "#3b82f6", 
              fontSize: "0.85rem", 
              textDecoration: "none",
              fontWeight: 700,
              marginBottom: "1rem"
            }}
          >
            <ArrowLeft size={14} /> Back to Finance Tools
          </Link>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#10b981", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Calculator size={16} /> Investment Planning
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem", margin: 0 }}>Lumpsum Calculator</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Plan your wealth growth by estimating the future value of your one-time investments. Perfect for mutual funds, stocks, and fixed deposits.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2.5rem" }} className="content-grid">
          
          <div>
            <LumpsumCalculator />

            <div style={{ marginTop: "4rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                <Info size={24} color="#3b82f6" /> What is a Lumpsum Investment?
              </h2>
              <div style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.8 }}>
                <p style={{ marginBottom: "1.25rem" }}>
                   A <strong>Lumpsum investment</strong> is a one-time single investment of a bulk amount in a particular scheme or financial instrument. For example, if you invest ₹1 Lakh in a mutual fund today and let it grow for 10 years, it is considered a lumpsum investment.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                   This is different from <strong>SIP (Systematic Investment Plan)</strong>, where you invest small amounts periodically (e.g., monthly). Lumpsum is ideal when you have a surplus amount from a bonus, gift, or sale of an asset.
                </p>
                
                <h3 style={{ color: "#f1f5f9", fontSize: "1.1rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>Benefits of Lumpsum Investment</h3>
                <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <li><strong>Power of Compounding:</strong> Your entire capital starts earning returns from day one.</li>
                  <li><strong>Lower Transaction Costs:</strong> Since it's a single transaction, management is easier.</li>
                  <li><strong>Market Timing:</strong> If you invest when the market is undervalued, you can gain significant alpha.</li>
                </ul>
              </div>
            </div>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Guide Card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <BadgeCheck size={18} color="#10b981" /> Expert Tips
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                 <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                    1. Use Lumpsum when you have high liquidity.
                 </p>
                 <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                    2. Avoid timing the market; focus on the "time in the market".
                 </p>
                 <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                    3. Diversify across different asset classes.
                 </p>
              </div>
            </div>

            {/* Related Tools */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1.25rem" }}>Related Calculators</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { name: "SIP Calculator", href: "/tools/sip-calculator" },
                  { name: "EMI Calculator", href: "/tools/emi-calculator" },
                  { name: "Income Tax Calculator", href: "/tools/tax-calculator" }
                ].map(tool => (
                  <Link 
                    key={tool.name} 
                    href={tool.href} 
                    style={{ 
                      fontSize: "0.85rem", 
                      color: "#94a3b8", 
                      textDecoration: "none", 
                      display: "flex", 
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(30, 41, 59, 0.4)",
                      border: "1px solid rgba(51, 65, 85, 0.3)"
                    }}
                  >
                    <span>{tool.name}</span>
                    <ChevronRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Regulatory Note */}
            <div className="card" style={{ padding: "1.25rem", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#ef4444" }}>
                 <ShieldAlert size={16} />
                 <h4 style={{ fontSize: "0.85rem", margin: 0, fontWeight: 700 }}>Disclaimer</h4>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.6 }}>
                Mutual fund investments are subject to market risks. The results from this calculator are based on mathematical formulas and do not guarantee future performance.
              </p>
            </div>
          </aside>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
