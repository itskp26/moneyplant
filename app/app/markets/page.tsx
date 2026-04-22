import type { Metadata } from "next";
import Link from "next/link";
import { 
  Globe, Landmark, Activity, BarChart2, TrendingUp, 
  Coins, DollarSign, Gem, ShieldCheck, ArrowRight,
  Zap
} from "lucide-react";
import { fetchMultipleQuotes } from "@/lib/stocks";
import { GLOBAL_INDICES } from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { StatWidget, PortalCard } from "@/components/VisualCards";

export const metadata: Metadata = {
  title: `Markets Hub — Universal Market Overview | Real-Time World Stock Market Tracker ${new Date().getFullYear()} | MoneyPlant`,
  description: `A centralized portal for world financial markets today ${new Date().getFullYear()}. Compare performance across Indian NSE/BSE and international exchanges including NYSE, NASDAQ, and LSE benchmarks.`,
  keywords: [
    "stock market india today", "live market india", "nse bse live today",
    "nifty 50 today", "sensex today", "bank nifty live",
    "global markets live", "world indices today", "s&p 500 today",
    "dow jones today", "nasdaq today", "ftse 100 today", "nikkei 225 today",
    "forex rates today", "usd to inr today", "dollar rate today india",
    "gold rate today india", "silver rate today india", "crude oil price today india",
    "bitcoin price india today", "crypto price india today",
    "top gainers today nse", "top losers today nse",
    "52 week high stocks india", "52 week low stocks today",
    "most active stocks india", "breakout stocks today",
    "market sentiment today india", "fear greed index india",
    "FII DII data today", "foreign investment india today",
    "commodity prices today india", "mcx prices today",
    "upcoming ipo 2025", "ipo listing today india", "ipo gmp today",
    "india vs global markets today", "emerging markets today",
    `top 20 stocks india ${new Date().getFullYear()}`,
    `markets overview ${new Date().getFullYear()}`,
    `best investment ${new Date().getFullYear()} india`,
    "market weekly summary", "weekly market performance india",
    "market this week india", "stocks this week india",
    "gold this week", "bitcoin this week", "rupee this week",
    "financial dashboard india", "real time market data india",
    "portfolio tracker india", "investment tracker india",
    "nse bse market overview", "market cap india total",
    "india vix today", "advance decline ratio india",
    "market breadth india", "sector performance india today",
    // GLOBAL — USA
    "us stock market today", "us market live", "new york stock exchange today",
    "s&p 500 live today", "dow jones live today", "nasdaq live today",
    "us market open today", "us pre market today", "us after hours today",
    "apple nvidia tesla stock today", "us tech stocks today",
    // GLOBAL — UK
    "uk stock market today", "ftse 100 live today", "london stock exchange today",
    "uk shares today", "british stocks today", "london market open today",
    // GLOBAL — Europe
    "european stock market today", "dax live today", "cac 40 live today",
    "german stock market today", "french stock market today",
    "euronext today", "european shares today",
    // GLOBAL — Asia
    "asian stock market today", "nikkei 225 live today", "hang seng live today",
    "shanghai composite live today", "kospi live today", "asx 200 live today",
    "japan stock market today", "china stock market today", "hong kong market today",
    "singapore stock market today", "australian stock market today",
    // GLOBAL — Middle East
    "middle east stock market today", "saudi stock market today", "tadawul live",
    "dubai stock market today", "dfm live today", "adx abu dhabi today",
    "qatar stock exchange today", "kuwait stock exchange today",
    // GLOBAL — Comparison & Macro
    "india vs usa stock market", "nifty vs dow jones today",
    "emerging markets vs developed markets", "asia vs europe stocks today",
    "global market crash today", "global market rally today",
    `world stock markets ${new Date().getFullYear()}`,
    `global market overview ${new Date().getFullYear()}`,
  ].join(", "),
};

export const revalidate = 60;

// Internal component moved to top to ensure it's defined before usage
function AssetLink({ title, desc, icon, href }: { title: string, desc: string, icon: React.ReactNode, href: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div className="card card-hover" style={{ padding: "1.5rem", height: "100%", display: "flex", gap: "1.25rem", alignItems: "center" }}>
         <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "12px", borderRadius: "12px" }}>
           {icon}
         </div>
         <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "4px" }}>{title}</h3>
            <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>{desc}</p>
         </div>
      </div>
    </Link>
  );
}

async function getMarketData() {
  const [indianIndices, worldIndices] = await Promise.all([
    fetchMultipleQuotes(["^NSEI", "^BSESN", "^NSEBANK", "^CNXIT", "RELIANCE.NS", "TCS.NS"]),
    fetchMultipleQuotes(GLOBAL_INDICES.slice(0, 8).map(i => i.symbol))
  ]);
  return { indianIndices, worldIndices };
}

export default async function MarketsHubPage() {
  const { indianIndices, worldIndices } = await getMarketData();

  const nifty = indianIndices.find(q => q.symbol === "^NSEI");
  const sensex = indianIndices.find(q => q.symbol === "^BSESN");

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Markets", url: "/markets" },
      ])} />

      <div className="container section">
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#3b82f6", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Globe size={16} /> Market Intelligence
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>World Markets Hub</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Your command center for global finance. Monitor Indian benchmarks, international indices, and alternative assets in real-time.
          </p>
        </div>

        {/* Market Pulse Stats */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "1.5rem",
          marginBottom: "4rem" 
        }}>
           <StatWidget 
             label="Nifty 50" 
             value={nifty?.price || 0} 
             changePercent={nifty?.changePercent} 
             change={nifty?.change} 
             href="/indices/nifty-50" 
             icon={<Activity />} 
             delay={0.1}
           />
           <StatWidget 
             label="Sensex" 
             value={sensex?.price || 0} 
             changePercent={sensex?.changePercent} 
             change={sensex?.change} 
             href="/indices/sensex" 
             icon={<BarChart2 />} 
             delay={0.2}
           />
           <StatWidget 
             label="Market Sentiment" 
             value="BULLISH" 
             status="Extreme Greed" 
             href="#" 
             icon={<TrendingUp />} 
             delay={0.3}
           />
        </div>

        {/* Main Regional Portals */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "5rem" }} className="regional-grid">
           <PortalCard 
             title="Indian Markets" 
             desc="Explore NSE/BSE indices, top conglomerates, and sector-wise performance across the Indian economy."
             icon={<Landmark />}
             href="/markets/india"
             accentColor="#3b82f6"
             delay={0.4}
           />
           <PortalCard 
             title="Global Markets" 
             desc="Track S&P 500, Nasdaq, Nikkei, and other major world exchange benchmarks in real-time."
             icon={<Globe />}
             href="/markets/global"
             accentColor="#a855f7"
             delay={0.5}
           />
        </div>

        {/* Global Summary Table */}
        <div style={{ marginBottom: "4rem" }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>World Indices Performance</h2>
              <Link href="/markets/global" style={{ color: "#3b82f6", textDecoration: "none", fontSize: "0.9rem", fontWeight: 700 }}>View heatmap →</Link>
           </div>
           <MarketTable quotes={worldIndices} linkPrefix="/markets" />
        </div>

        {/* Asset Classes Grid */}
        <div>
           <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>Market Segments</h2>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              <AssetLink 
                title="Forex Exchange" 
                desc="Live global currency rates and INR pairs." 
                icon={<DollarSign size={24} color="#10b981" />} 
                href="/forex" 
              />
              <AssetLink 
                title="Cryptocurrency" 
                desc="Bitcoin, Ethereum and Altcoin live prices." 
                icon={<Coins size={24} color="#f59e0b" />} 
                href="/crypto" 
              />
              <AssetLink 
                title="Commodities" 
                desc="Gold, Silver and Energy market trackers." 
                icon={<Gem size={24} color="#ef4444" />} 
                href="/commodities" 
              />
              <AssetLink 
                title="IPO Center" 
                desc="Upcoming and recently listed India IPOs." 
                icon={<Zap size={24} color="#8b5cf6" />} 
                href="/ipo" 
              />
           </div>
        </div>

        {/* Safety Disclaimer */}
        <div style={{ marginTop: "5rem", padding: "2rem", borderTop: "1px solid rgba(51, 65, 85, 0.4)", textAlign: "center" }}>
           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#64748b", marginBottom: "1rem" }}>
              <ShieldCheck size={18} />
              <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>Verified Market Data</span>
           </div>
           <p style={{ color: "#475569", fontSize: "0.8rem", maxWidth: "700px", margin: "0 auto", lineHeight: 1.6 }}>
             Stock prices and indices are delayed by up to 15 minutes. Global market data is provided for informational purposes and should not be considered financial advice. MoneyPlant is not responsible for any trading losses based on this data.
           </p>
        </div>
      </div>

      <style>{`
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5); 
          border-color: rgba(255,255,255,0.15);
        }
        @media (max-width: 768px) {
          .regional-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
