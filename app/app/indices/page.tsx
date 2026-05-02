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

export const metadata: Metadata = getIndexMeta();


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
             <MarketTable quotes={usIndices} linkPrefix="/indices" />
          </section>

          {/* Europe */}
          <section>
             <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
               <Globe size={20} color="#f59e0b" /> Europe Benchmarks
             </h3>
             <MarketTable quotes={europeIndices} linkPrefix="/indices" />
          </section>

          {/* Asia-Pacific */}
          <section>
             <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
               <Globe size={20} color="#ec4899" /> Asia-Pacific Benchmarks
             </h3>
             <MarketTable quotes={asiaIndices} linkPrefix="/indices" />
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
