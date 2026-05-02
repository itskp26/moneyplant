import type { Metadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, BarChart2, 
  Layers, Package, ShieldCheck, Zap
} from "lucide-react";
import { fetchMultipleQuotes, fetchQuote } from "@/lib/stocks";
import { INDICES, NIFTY50_STOCKS } from "@/lib/constants";
import { getStocksMeta } from "@/lib/meta";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { WideStatCard, GroupSidebar } from "@/components/VisualCards";

export const metadata: Metadata = getStocksMeta();


export const revalidate = 60;

export default async function StocksHubPage() {
  const [niftyQuote, sensexQuote] = await Promise.all([
    fetchQuote("^NSEI"),
    fetchQuote("^BSESN")
  ]);

  const niftyStocks = await fetchMultipleQuotes(NIFTY50_STOCKS.slice(0, 20));

  const marketOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const time = hours * 100 + mins;
    if (day === 0 || day === 6) return false;
    return time >= 915 && time <= 1530;
  };

  const isLive = marketOpen();

  const businessGroups = [
    { label: "Adani Group", href: "/conglomerates/adani" },
    { label: "Reliance Group", href: "/conglomerates/reliance" },
    { label: "Tata Group", href: "/conglomerates/tata" },
    { label: "Bajaj Group", href: "/conglomerates/bajaj" },
    { label: "Mahindra Group", href: "/conglomerates/mahindra" },
    { label: "HDFC Group", href: "/conglomerates/hdfc" },
    { label: "SBI Group", href: "/conglomerates/sbi" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Stocks", url: "/stocks" },
      ])} />

      <div className="container section">
        {/* Page Title */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#f1f5f9", margin: 0, fontFamily: "var(--font-sora)" }}>
            Indian Stock Market Live
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem", fontSize: "1.05rem" }}>
            Track real-time prices for Nifty 50, Sensex, and all top performing NSE/BSE stocks.
          </p>
        </div>

        {/* Market Status Bar */}
        <div style={{ 
          background: isLive ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)",
          border: `1px solid ${isLive ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
          padding: "0.75rem 1.25rem",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
             <div style={{ 
               width: "10px", 
               height: "10px", 
               borderRadius: "50%", 
               background: isLive ? "#10b981" : "#ef4444",
               boxShadow: isLive ? "0 0 10px #10b981" : "none"
             }} />
             <span style={{ fontSize: "0.9rem", fontWeight: 700, color: isLive ? "#10b981" : "#ef4444" }}>
               MARKET IS {isLive ? "OPEN" : "CLOSED"}
             </span>
             <span style={{ color: "#64748b", fontSize: "0.85rem" }}>• Next session: {isLive ? "Ends at 3:30 PM" : "Opens Tomorrow 9:15 AM"}</span>
          </div>
          <div style={{ fontSize: "0.85rem", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
             <Zap size={14} /> Update Frequency: 60s
          </div>
        </div>

        {/* Hero Section / Wide Indices */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
           {niftyQuote && (
             <WideStatCard 
               label="NIFTY 50" 
               value={niftyQuote.price} 
               changePercent={niftyQuote.changePercent} 
               change={niftyQuote.change} 
               href="/indices/nifty-50"
               delay={0.1}
             />
           )}
           {sensexQuote && (
             <WideStatCard 
               label="SENSEX" 
               value={sensexQuote.price} 
               changePercent={sensexQuote.changePercent} 
               change={sensexQuote.change} 
               href="/indices/sensex"
               delay={0.2}
             />
           )}
        </div>

        {/* Main Dashboard Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 350px", 
          gap: "2.5rem" 
        }} className="content-grid">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {/* Top 50 Stocks Table */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                 <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f1f5f9", margin: 0, display: "flex", alignItems: "center", gap: "12px" }}>
                   <Activity size={24} color="#3b82f6" /> Nifty 50 Performance
                 </h2>
                 <Link href="/indices/nifty-50" style={{ color: "#3b82f6", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>View Full Composition →</Link>
              </div>
              <MarketTable quotes={niftyStocks} showRank />
            </section>

            {/* Quick Filter Bubbles */}
            <section>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", color: "#cbd5e1" }}>Quick Market Filters</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                 {[
                   { label: "Top Gainers", href: "/top-stocks/gainers", color: "#10b981" },
                   { label: "Top Losers", href: "/top-stocks/losers", color: "#ef4444" },
                   { label: "Most Active", href: "/top-stocks/active", color: "#3b82f6" },
                   { label: "52W Highs", href: "/top-stocks/highs", color: "#f59e0b" },
                   { label: "Banking Stocks", href: "/conglomerates/banking", color: "#6366f1" },
                   { label: "IT Stocks", href: "/conglomerates/it", color: "#06b6d4" },
                 ].map(chip => (
                   <Link key={chip.label} href={chip.href} style={{ 
                     textDecoration: "none",
                     background: "rgba(30, 41, 59, 0.4)",
                     border: `1px solid ${chip.color}22`,
                     padding: "8px 16px",
                     borderRadius: "100px",
                     fontSize: "0.85rem",
                     color: "#f1f5f9",
                     fontWeight: 600,
                     transition: "all 0.2s"
                   }} className="filter-chip">
                     {chip.label}
                   </Link>
                 ))}
              </div>
            </section>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
             {/* Conglomerates Sidebar */}
             <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Layers size={18} color="#8b5cf6" /> Business Groups
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                   {[
                     "Adani", "Reliance", "Tata", "Bajaj", "Mahindra", "HDFC", "SBI"
                   ].map(name => (
                     <Link key={name} href={`/conglomerates/${name.toLowerCase()}`} style={{ 
                       textDecoration: "none", 
                       fontSize: "0.9rem", 
                       color: "#94a3b8", 
                       padding: "8px 12px", 
                       borderRadius: "8px",
                       display: "flex",
                       justifyContent: "space-between",
                       transition: "all 0.2s"
                     }} className="side-link">
                       <span>{name} Group</span>
                       <span style={{ opacity: 0.5 }}>→</span>
                     </Link>
                   ))}
                </div>
             </div>

             {/* Ad Sense Placement */}
             <div style={{ 
               background: "rgba(15, 23, 42, 0.8)", 
               border: "1px dashed rgba(51, 65, 85, 0.6)", 
               borderRadius: "12px",
               padding: "5rem 1.5rem",
               textAlign: "center",
               color: "#334155",
               fontSize: "0.8rem"
             }}>
               Advertisement
             </div>

             {/* Disclaimer */}
             <div className="card" style={{ padding: "1.25rem", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
                <h4 style={{ fontSize: "0.8rem", color: "#f1f5f9", marginBottom: "8px" }}>Investment Risk</h4>
                <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.6 }}>
                  Equity investments are subject to market risks. MoneyPlant provides real-time data for informational purposes only. Always consult a certified financial advisor before making decisions.
                </p>
             </div>
          </aside>

        </div>
      </div>

      <style>{`
        .filter-chip:hover {
          background: rgba(30, 41, 59, 0.8) !important;
          transform: translateY(-1px);
          border-color: rgba(59, 130, 246, 0.5) !important;
        }
        .side-link:hover {
          background: rgba(30, 41, 59, 0.6);
          color: #f1f5f9;
          padding-left: 15px;
        }
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
