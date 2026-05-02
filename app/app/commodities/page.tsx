import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, DollarSign, 
  BarChart2, Info, Globe, ShieldCheck, Zap, Gem, Droplet
} from "lucide-react";
import { fetchQuote, fetchMultipleQuotes } from "@/lib/stocks";
import { getCommoditiesMeta } from "@/lib/meta";
import { COMMODITIES } from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { StatWidget } from "@/components/VisualCards";

export const metadata: Metadata = getCommoditiesMeta();


export const revalidate = 300; // Commodities update every 5 mins

export default async function CommoditiesHubPage() {
  const symbols = ["GC=F", "SI=F", "CL=F", "BZ=F", "PL=F", "HG=F", "NG=F"];
  const quotes = await fetchMultipleQuotes(symbols);
  const usdInr = await fetchQuote("USDINR=X");
  const inrRate = usdInr?.price || 83.50;

  const getInrPrice = (usdPrice: number, factor: number) => {
    return (usdPrice * inrRate * factor);
  };

  const featuredCommodities = COMMODITIES.filter(c => ["gold", "silver", "crude-oil"].includes(c.id));

  const numFmt = (n: number | undefined, d = 2) => 
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Commodities", url: "/commodities" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Activity size={16} /> Hard Assets Hub
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Commodity Prices</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Real-time global commodity benchmarks and India (MCX) price estimates. Monitor Gold, Silver, Crude Oil and Natural Gas.
          </p>
        </div>

        {/* Major Commodities Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
           {featuredCommodities.map((c, i) => {
             const q = quotes.find(quote => quote.symbol === c.symbol);
             const inrPrice = q ? getInrPrice(q.price, c.factor) : 0;
             const worldPrice = q ? numFmt(q.price) : "—";
             
             // Custom icons for the widgets
             const icon = c.id === 'gold' ? <Gem /> : c.id === 'silver' ? <Gem /> : <Droplet />;

             return (
               <StatWidget 
                 key={c.id}
                 label={c.name}
                 subtitle={`Per ${c.unit}`}
                 value={inrPrice}
                 changePercent={q?.changePercent}
                 change={q?.change}
                 href={`/commodities/${c.id}`}
                 icon={icon}
                 status={`World: $${worldPrice}`}
                 delay={0.1 + i * 0.1}
                 prefix="₹"
               />
             );
           })}
        </div>

        {/* Global Commodities Table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2.5rem" }} className="content-grid">
           
           <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <section>
                 <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
                   <Globe size={20} color="#3b82f6" /> Global Benchmark Futures
                 </h2>
                 <MarketTable quotes={quotes} />
              </section>
           </div>

           <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Market Status Card */}
              <div className="card" style={{ padding: "1.5rem" }}>
                 <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
                   <Zap size={18} color="#10b981" /> Exchange Status
                 </h3>
                 <div style={{ fontSize: "0.85rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "10px" }}>
                   <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>MCX India</span>
                      <span style={{ fontWeight: 700, color: "#10b981" }}>OPEN</span>
                   </div>
                   <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>COMEX (US)</span>
                      <span style={{ fontWeight: 700, color: "#10b981" }}>OPEN</span>
                   </div>
                   <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "1rem" }}>
                      Commodity markets generally trade 24/5 with a short break daily.
                   </p>
                </div>
              </div>

              {/* Ad Widget */}
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
                <h4 style={{ fontSize: "0.8rem", color: "#f1f5f9", marginBottom: "8px" }}>Price Disclaimer</h4>
                <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.6 }}>
                  INR prices are estimates based on spot market data and USD exchange rates. They include taxes and duties where applicable but may vary by city and vendor.
                </p>
             </div>
           </aside>

        </div>
      </div>
    </>
  );
}
