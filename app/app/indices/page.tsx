import type { Metadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Globe, Map, BarChart2, 
  Flag, Info, Zap
} from "lucide-react";
import { fetchMultipleQuotes } from "@/lib/stocks";
import { INDICES, US_INDICES, EUROPE_INDICES, ASIA_INDICES } from "@/lib/constants";
import { getIndexMeta } from "@/lib/meta";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { StatWidget, MiniTrekCard } from "@/components/VisualCards";

export const metadata: Metadata = {
  title: `Indices Hub — World Market Benchmarks Live | Nifty, Sensex, Dow, Nasdaq & Nikkei ${new Date().getFullYear()} | MoneyPlant`,
  description: `Real-time tracker for all major international stock market indices today ${new Date().getFullYear()}. Monitor Indian benchmarks alongside US, European, and Asian markets with professional analytics.`,
  keywords: [
    // India indices
    "nifty 50 live today", "nifty 50 live price", "nifty 50 chart today",
    "sensex live today", "sensex live price", "bse sensex today",
    "bank nifty live today", "bank nifty live price",
    "nifty it today", "nifty pharma today", "nifty fmcg today", "nifty metal today",
    "nifty realty today", "nifty auto today", "nifty psu bank today",
    "nifty energy today", "nifty media today", "nifty infra today",
    "nifty midcap 100 today", "nifty smallcap 100 today", "nifty next 50 today",
    "nifty 200 today", "nifty 500 today", "bse 100 today", "bse 200 today", "bse 500 today",
    "india vix today", "nifty pe ratio today", "sensex pe ratio today",
    // Time-period index performance
    "nifty 50 weekly performance", "nifty 50 1 week return", "nifty 50 this week",
    "sensex weekly gain loss", "sensex 1 week change", "sensex this week",
    "bank nifty weekly change", "nifty 50 monthly return", "nifty 50 ytd return",
    "nifty 50 52 week high", "nifty 50 52 week low", "sensex 52 week high",
    "index performance this week", "indian market weekly summary",
    // Global indices
    "global stock market today", "s&p 500 today", "dow jones today", "nasdaq today",
    "ftse 100 today", "dax today", "nikkei 225 today", "hang seng today",
    "shanghai composite today", "kospi today", "asx 200 today",
    "world indices live", "global indices today", "international stock market",
    // Year-dynamic
    `top 20 index stocks ${new Date().getFullYear()}`, `best index fund india ${new Date().getFullYear()}`,
    `nifty 50 ${new Date().getFullYear()}`, `sensex ${new Date().getFullYear()} target`,
    "stock market indices india", "nse bse indices live",
    "nifty beees price today", "sensex etf today",
    "52 week high stocks nse bse", "52 week high stocks list today",
    "stocks hitting 52 week high today", "breakout stocks today india",
    // GLOBAL — Americas
    "s&p 500 live index", "dow jones index today", "nasdaq composite index today",
    "russell 2000 index today", "nyse composite today", "tsx canada index today",
    "bovespa index today brazil", "mexbol mexico index today",
    // GLOBAL — Europe
    "ftse 100 index live", "dax 40 index today", "cac 40 index today",
    "ibex 35 spain index today", "aex netherlands index today",
    "smi switzerland index today", "omxs30 sweden index today",
    "euro stoxx 50 today", "stoxx 600 europe today",
    // GLOBAL — Asia Pacific
    "nikkei 225 live index", "hang seng index live", "shanghai composite index",
    "csi 300 china index today", "kospi south korea index today",
    "asx 200 australia index today", "straits times index singapore",
    "nzx 50 new zealand today", "set thailand index today",
    "pse philippines index today", "klci malaysia index today",
    "jci indonesia index today", "vni vietnam index today",
    // GLOBAL — Middle East & Africa
    "tasi saudi arabia index today", "dfmgi dubai index today",
    "adxgi abu dhabi index today", "tadawul index today",
    "bist 100 turkey index today", "tel aviv 35 israel index today",
    "jse south africa index today", "ngx nigeria index today",
    "efg egypt index today",
    // GLOBAL — Comparison
    "nifty vs s&p 500 comparison", "sensex vs dow jones comparison",
    "india index vs world index performance", "best index in world today",
    `global indices ${new Date().getFullYear()} performance`,
    `world stock market indices ${new Date().getFullYear()}`,
  ].join(", "),
};

export const revalidate = 60;

export default async function IndicesHubPage() {
  const indiaIndices = await fetchMultipleQuotes(INDICES.map(i => i.symbol));
  const usIndices = await fetchMultipleQuotes(US_INDICES.map(i => i.symbol));
  const europeIndices = await fetchMultipleQuotes(EUROPE_INDICES.map(i => i.symbol));
  const asiaIndices = await fetchMultipleQuotes(ASIA_INDICES.map(i => i.symbol));

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Indices", url: "/indices" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Market Indices</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Real-time benchmarks from Indian and global exchanges. Monitor world market trends and domestic sector performance in one unified dashboard.
          </p>
        </div>

        {/* Indian Indices Section */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "10px" }}>
              <Flag size={24} color="#10b981" /> Indian Equity Indices
            </h2>
            <div style={{ fontSize: "0.85rem", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
               <Zap size={14} /> Live NSE/BSE Data
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
             {indiaIndices.map((q, i) => {
               const index = INDICES.find(idx => idx.symbol === q.symbol);
               return (
                 <MiniTrekCard 
                   key={q.symbol}
                   label={index?.name || ""}
                   symbol={index?.exchange || ""}
                   price={q.price}
                   changePercent={q.changePercent}
                   href={`/indices/${index?.id}`}
                   delay={0.1 + i * 0.05}
                 />
               );
             })}
          </div>
        </section>

        {/* Global Dashboard */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: "3rem",
          marginBottom: "4rem" 
        }} className="global-grid">
          
          {/* Americas */}
          <section>
             <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
               <Globe size={20} color="#3b82f6" /> Americas Benchmarks
             </h3>
             <MarketTable quotes={usIndices} />
          </section>

          {/* Europe */}
          <section>
             <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
               <Globe size={20} color="#f59e0b" /> Europe Benchmarks
             </h3>
             <MarketTable quotes={europeIndices} />
          </section>

          {/* Asia-Pacific */}
          <section>
             <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
               <Globe size={20} color="#ec4899" /> Asia-Pacific Benchmarks
             </h3>
             <MarketTable quotes={asiaIndices} />
          </section>
        </div>

        {/* Information / Disclaimer */}
        <section style={{ marginTop: "4rem" }}>
           <div className="card" style={{ padding: "2rem", background: "rgba(30, 41, 59, 0.4)", borderRadius: "20px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>Index Methodology</h3>
              <p style={{ fontSize: "1rem", color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                 Market indices represent a portfolio of top stocks from a specific exchange or sector. They are weighted by market capitalization (free-float) to provide a snapshot of overall market sentiment.
              </p>
              <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Info size={16} /> Data delayed by 15 mins for global markets.</div>
                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><Info size={16} /> Indian markets data is real-time or near real-time.</div>
              </div>
           </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .global-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
