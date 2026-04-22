import type { Metadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, BarChart2, 
  Layers, Package, ShieldCheck, Zap
} from "lucide-react";
import { fetchMultipleQuotes, fetchQuote } from "@/lib/stocks";
import { INDICES, NIFTY50_STOCKS } from "@/lib/constants";
import { getHomeMeta } from "@/lib/meta"; // or create a specfic one
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { WideStatCard, GroupSidebar } from "@/components/VisualCards";

export const metadata: Metadata = {
  title: `Stocks Hub — Indian Share Market Live Today | Nifty 50, Sensex & All NSE/BSE Sectors ${new Date().getFullYear()} | MoneyPlant`,
  description: `Comprehensive Indian stock market terminal today ${new Date().getFullYear()}. Track live prices for Nifty 50, all 13+ sectors, and 500+ top NSE stocks. Monitor world market impact on Indian share prices.`,
  keywords: [
    "indian stock market today", "nse live today", "bse share price today",
    "nifty 50 stocks live", "top stocks india today", "share market dashboard",
    "live stock prices india", "stock screener india",
    // 52-week
    "52 week high stocks nse today", "52 week high stocks bse today",
    "52 week high stocks list", "stocks hitting 52 week high today",
    "52 week low stocks nse", "52 week low stocks today",
    "breakout stocks today india", "stocks at all time high today",
    // Gainers/losers
    "top gainers today nse", "top gainers today bse", "top losers today nse",
    "top losers today bse", "most active stocks nse today",
    `top 20 gainers today ${new Date().getFullYear()}`,
    `top 20 losers today ${new Date().getFullYear()}`,
    `top 20 stocks india ${new Date().getFullYear()}`,
    `best 20 stocks to buy ${new Date().getFullYear()}`,
    // Time-period
    "stocks up this week india", "stocks down this week india",
    "top performing stocks this week nse", "weekly top gainers india",
    "stocks 1 week performance", "best stocks last 7 days nse",
    "monthly top gainers india", "stocks 1 month return nse",
    // Category
    "large cap stocks india", "mid cap stocks india", "small cap stocks india",
    "blue chip stocks india", "penny stocks india", "multibagger stocks india",
    "dividend stocks india", "growth stocks india", "value stocks india",
    "intraday stocks today", "swing trade stocks today", "f&o stocks today",
    "tech stocks india today", "it stocks nse today", "pharma stocks india",
    "banking stocks today", "fmcg stocks today", "auto stocks india today",
    "psu stocks today", "defence stocks india", "ev stocks india",
    "pre market gainers india", "after hours movers india",
    "bulk deals nse today", "block deals bse today",
    "upper circuit stocks today", "lower circuit stocks today",
    "operator stocks today india", "high delivery stocks today",
    `best stocks to invest ${new Date().getFullYear()} india`,
    `stocks to watch ${new Date().getFullYear()}`,
    "nifty 50 performance today", "sensex today live",
    // GLOBAL — USA Stocks
    "us stocks today", "apple share price today", "microsoft share price today",
    "nvidia share price today", "amazon share price today", "tesla share price today",
    "meta share price today", "google share price today", "berkshire hathaway today",
    "s&p 500 stocks today", "nasdaq 100 stocks today", "dow jones stocks today",
    "us tech stocks today", "us bank stocks today", "us pharma stocks today",
    // GLOBAL — UK Stocks
    "uk stocks today", "ftse 100 stocks list", "london listed stocks today",
    "bp share price today", "shell share price today", "hsbc share price today",
    "barclays share price today", "astrazeneca share price today",
    // GLOBAL — Europe Stocks
    "european stocks today", "german stocks today", "dax stocks list",
    "siemens share price today", "volkswagen share price today",
    "lvmh share price today", "nestle share price today",
    // GLOBAL — Asia Stocks
    "japanese stocks today", "nikkei stocks list", "toyota share price today",
    "sony share price today", "hong kong stocks today", "hang seng stocks",
    "alibaba share price today", "tencent share price today", "samsung share price today",
    "china stocks today", "korea stocks today", "singapore stocks today",
    // GLOBAL — General
    "global top stocks today", "world best performing stocks today",
    "international stock picks today", "foreign stocks to buy today",
    `top 20 global stocks ${new Date().getFullYear()}`,
    `best stocks worldwide ${new Date().getFullYear()}`,
  ].join(", "),
};

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
