import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, DollarSign, 
  BarChart2, Info, Globe, ShieldCheck, Zap, Gem, Droplet
} from "lucide-react";
import { fetchQuote, fetchMultipleQuotes } from "@/lib/stocks";
import { getCommodityMeta } from "@/lib/meta";
import { COMMODITIES } from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { StatWidget } from "@/components/VisualCards";

export const metadata: Metadata = {
  title: `Commodities Hub — Live Gold, Silver & Crude Oil Prices | World Market Rates ${new Date().getFullYear()}`,
  description: `Stay updated with real-time world commodity prices today ${new Date().getFullYear()}. Monitor live 24K/22K Gold, Silver, and Crude Oil (Brent/WTI) rates across Indian and international benchmarks.`,
  keywords: [
    // Gold
    "gold rate today india", "gold price today", "today gold rate", "live gold price",
    "24k gold price today", "22k gold price today", "gold price per gram india",
    "gold rate mumbai today", "gold rate delhi today", "gold rate chennai today",
    "gold rate bangalore today", "gold rate hyderabad today", "gold rate kolkata today",
    "gold price in dubai today", "gold price in london today", "gold price in usa today",
    "gold price in usd today", "gold price in aed today", "gold price in sar today",
    "XAUUSD today", "mcx gold price today", "spot gold price",
    "gold price this week", "gold 1 week price change", "gold weekly gain loss",
    "gold price prediction 2025", "sovereign gold bond", "digital gold price today",
    "gold etf india", "sone ka bhav aaj", "gold price chart",
    // Silver
    "silver rate today india", "silver price today", "today silver rate",
    "silver price per gram today", "silver price per kg india",
    "silver price in dubai today", "silver price usd today", "XAGUSD today",
    "mcx silver price today", "silver 1 week price change", "silver weekly gain loss",
    "chandi ka bhav aaj", "silver vs gold ratio today",
    // Crude Oil
    "crude oil price today india", "crude oil price today", "brent crude oil price today",
    "wti crude oil price today", "mcx crude oil price today",
    "oil barrel price today", "crude oil 1 week price change", "crude oil weekly change",
    "petrol price india vs crude oil", "opec news today",
    // Others
    "natural gas price today india", "copper price today india",
    "platinum price today india", "commodity market india live",
    "mcx prices today", "commodity market live india",
    `top 20 commodity stocks ${new Date().getFullYear()}`,
    "commodity market news today", "precious metals price today",
    "commodity prices this week", "commodity weekly change",
    // GLOBAL — Gold by Country
    "gold price in usa today", "gold price in america", "gold price new york", "comex gold today",
    "gold price in uk today", "gold price in london", "london gold fixing today",
    "gold price in germany", "gold price in france", "gold price in europe today",
    "gold price in canada today", "gold price in australia today", "gold price in aud",
    "gold price in singapore today", "gold price in sgd",
    "gold price in hong kong today", "gold price hkd",
    "gold price in china today", "gold price in cny", "gold price in japan today",
    "gold price in south korea today", "gold price in malaysia today",
    "gold price in thailand today", "gold price in indonesia today",
    "gold price in turkey today", "gold price in iran today",
    "gold price in pakistan today", "gold price in pkr",
    "gold price in bangladesh today", "gold price in bdt",
    "gold price in sri lanka", "gold price in nepal today",
    "gold price in nigeria today", "gold price in south africa today",
    "gold price in kenya today", "gold price in egypt today",
    "gold price in brazil today", "gold price in argentina today",
    "gold price in mexico today", "gold price in russia today",
    "gold price in philippines today", "gold price in vietnam today",
    // GLOBAL — Silver by Country
    "silver price in usa today", "silver price usd per ounce",
    "silver price in uk today", "silver price gbp",
    "silver price in europe today", "silver price in germany",
    "silver price in australia today", "silver price aud",
    "silver price in canada today", "silver price cad",
    "silver price in pakistan today", "silver price in uae today",
    "silver price in saudi arabia today", "silver price in singapore today",
    // GLOBAL — Crude Oil
    "crude oil price usa today", "crude oil price europe today",
    "crude oil price middle east", "saudi aramco oil price",
    "brent crude uk price today", "wti oil price america today",
    "crude oil price australia today", "crude oil price japan today",
    "crude oil price china today", "crude oil price germany today",
    "opec monthly report", "oil price russia ukraine war impact",
    // GLOBAL — Commodity General
    "commodity prices worldwide", "global commodity market today",
    "international commodity prices", "commodity exchange worldwide",
    `commodity market ${new Date().getFullYear()} world`,
    `gold price ${new Date().getFullYear()} global`,
  ].join(", "),
};

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
