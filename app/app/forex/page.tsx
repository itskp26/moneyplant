import type { Metadata } from "next";
import Link from "next/link";
import { 
  Globe, Landmark, Languages, RefreshCcw, 
  ShieldCheck, Info, Zap, ArrowRight
} from "lucide-react";
import { fetchAllForexRates } from "@/lib/forex";
import ForexTable from "@/components/ForexTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Forex Hub — World Currency Exchange Rates | Live USD/INR, EUR, GBP & Remittance ${new Date().getFullYear()}`,
  description: `Worldwide currency tracker and exchange rate terminal today ${new Date().getFullYear()}. Monitor live USD to INR, major international currency pairs, RBI reference rates, and NRI transfer rates.`,
  keywords: [
    "forex rate india today", "usd to inr today", "dollar to rupee today",
    "dollar rate today india", "dollar price india today", "inr to usd today",
    "usdt to inr today", "tether to inr", "rupee vs dollar today",
    "euro to rupee today", "eur to inr today", "europe euro to inr",
    "gbp to inr today", "pound to rupee today", "british pound to inr",
    "aed to inr today", "dirham to rupee today", "uae dirham to inr",
    "sar to inr today", "saudi riyal to rupee today", "saudi riyal to inr",
    "kwd to inr today", "kuwait dinar to rupee", "kuwait dinar to inr",
    "qar to inr today", "qatar riyal to rupee", "qatar riyal to inr",
    "jpy to inr today", "yen to rupee today", "japanese yen to inr",
    "cny to inr today", "yuan to rupee today", "chinese yuan to inr",
    "aud to inr today", "australian dollar to rupee", "aud to inr rate",
    "cad to inr today", "canadian dollar to rupee", "cad to inr rate",
    "chf to inr today", "swiss franc to rupee", "swiss franc to inr",
    "sgd to inr today", "singapore dollar to rupee", "sgd to inr rate",
    "pkr to inr today", "pakistani rupee to inr", "pakistan currency rate",
    "bdt to inr today", "bangladeshi taka to inr", "taka to rupee",
    "live exchange rates india", "currency exchange rate india",
    "rbi reference rate today", "rbi forex rate today", "rbi usd inr rate",
    "forex market india", "forex trading india", "currency converter india",
    "nri transfer rate today", "best remittance rate india", "sbi forex rate today",
    "hdfc forex rate today", "icici forex rate today", "bank forex rate india",
    "western union rate india", "wise transfer rate india", "remittance india",
    "usd to inr 1 week change", "dollar rupee weekly change", "dollar weekly performance",
    "rupee vs dollar this week", "dollar 1 week gain loss", "rupee this week",
    "currency rate this week india", "forex weekly report", "forex 7 days",
    "dollar index today dxy", "dollar strength today",
    `usd inr rate ${new Date().getFullYear()}`, `forex rates ${new Date().getFullYear()}`,
    `top 20 currency pairs ${new Date().getFullYear()}`, "best exchange rate today",
    // GLOBAL — USA
    "usd exchange rate today", "dollar rate usa", "buy usd in usa",
    "usd to eur today", "usd to gbp today", "usd to jpy today",
    "usd to cad today", "usd to aud today", "dollar index usa today",
    // GLOBAL — UK
    "gbp exchange rate today", "pound sterling rate today", "pound to euro today",
    "pound to dollar today", "pound to inr today", "pound to aed today",
    "uk forex rates today", "rbs forex rate", "barclays forex rate",
    // GLOBAL — Europe
    "euro exchange rate today", "eur usd today", "eur gbp today",
    "eur to inr today", "eur to jpy today", "ecb exchange rate today",
    "euro rate germany", "euro rate france", "euro vs dollar today",
    // GLOBAL — UAE / Dubai
    "aed exchange rate today", "dirham rate today", "aed to usd today",
    "aed to inr today", "aed to gbp today", "aed to eur today",
    "uae dirham exchange rate today", "dubai forex rate today",
    // GLOBAL — Saudi Arabia
    "sar exchange rate today", "riyal rate today", "sar to usd today",
    "sar to inr today", "sar to gbp today", "saudi riyal forex rate",
    // GLOBAL — Kuwait / Qatar / Oman / Bahrain
    "kwd to usd today", "kwd to inr today", "kuwait dinar forex rate",
    "qar to usd today", "qar to inr today", "qatar riyal exchange rate",
    "omr to usd today", "omr to inr today", "oman rial exchange rate",
    "bhd to usd today", "bahrain dinar exchange rate",
    // GLOBAL — Pakistan, Bangladesh, Sri Lanka, Nepal
    "pkr to usd today", "pkr exchange rate today", "pakistan rupee rate today",
    "bdt to usd today", "bangladesh taka exchange rate today",
    "lkr to usd today", "sri lanka rupee exchange rate",
    "npr to usd today", "nepal rupee exchange rate",
    // GLOBAL — Asia Pacific
    "jpy to usd today", "yen exchange rate today", "japan yen rate today",
    "cny to usd today", "chinese yuan exchange rate today",
    "sgd to usd today", "singapore dollar exchange rate today",
    "aud to usd today", "australian dollar exchange rate today",
    "cad to usd today", "canadian dollar exchange rate today",
    "myr to usd today", "ringgit exchange rate today",
    "idr to usd today", "rupiah exchange rate today",
    "php to usd today", "philippine peso exchange rate",
    "thb to usd today", "thai baht exchange rate today",
    // GLOBAL — Africa
    "ngn to usd today", "nigeria naira exchange rate",
    "zar to usd today", "south africa rand exchange rate",
    "kes to usd today", "kenya shilling exchange rate",
    // GLOBAL — Americas
    "brl to usd today", "brazil real exchange rate",
    "mxn to usd today", "mexican peso exchange rate",
    "ars to usd today", "argentina peso exchange rate today",
    // GLOBAL — Remittance
    "send money to india from usa", "send money to india from uk",
    "send money to india from dubai", "send money to india from canada",
    "nri money transfer rate", "international money transfer rate today",
    "wise exchange rate today", "western union rate today",
    "xoom transfer rate", "remitly rate today", "transferwise rate",
    "best remittance rate worldwide", "cheapest way to send money internationally",
    `global forex ${new Date().getFullYear()}`, `world currency rates ${new Date().getFullYear()}`,
  ].join(", "),
};

import { StatWidget, WideStatCard } from "@/components/VisualCards";

export const revalidate = 300; // Forex updates every 5 mins

export default async function ForexHubPage() {
  const rates = await fetchAllForexRates();
  
  const inrPairs = rates.filter(r => r.pair.endsWith("INR=X"));
  const globalMajors = rates.filter(r => 
    !r.pair.endsWith("INR=X") && (r.base === "USD" || r.quote === "USD")
  );
  const globalCrosses = rates.filter(r => 
    !r.pair.endsWith("INR=X") && r.base !== "USD" && r.quote !== "USD"
  );

  const usdInr = rates.find(r => r.pair === "USDINR=X");

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Forex", url: "/forex" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#10b981", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Languages size={16} /> Global Currency Hub
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Forex Markets</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Real-time exchange rates for major global currencies. Monitor INR performance against the Dollar, Euro, Pound, and more.
          </p>
        </div>

        {/* Major Pair Spotlight */}
        <div style={{ marginBottom: "3.5rem" }}>
           <WideStatCard 
             label="US DOLLAR TO INDIAN RUPEE"
             value={usdInr?.rate ? `₹${usdInr.rate.toFixed(4)}` : "—"}
             changePercent={usdInr?.changePercent || 0}
             change={0} // pts not applicable for forex usually in this format, or 0
             href="/forex/usd-to-inr"
             delay={0.1}
           />
        </div>

        {/* Global Market Overview */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 350px", 
          gap: "2.5rem" 
        }} className="content-grid">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <ForexTable rates={inrPairs} title="Indian Rupee (INR) Pairs" />
            <ForexTable rates={globalMajors} title="Global Major Pairs" />
            <ForexTable rates={globalCrosses} title="Global Cross Rates" />
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
             {/* RBI Reference Rate Card */}
             <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Landmark size={18} color="#8b5cf6" /> RBI Reference Rate
                </h3>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "10px" }}>
                   <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>USD/INR</span>
                      <span style={{ fontWeight: 700, color: "#f1f5f9" }}>{usdInr?.rate.toFixed(4) || "—"}</span>
                   </div>
                   <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>EUR/INR</span>
                      <span style={{ fontWeight: 700, color: "#f1f5f9" }}>{rates.find(r => r.pair === "EURINR=X")?.rate.toFixed(4) || "—"}</span>
                   </div>
                   <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "1rem", fontStyle: "italic" }}>
                      *RBI reference rates are updated once per business day based on market fixings.
                   </p>
                </div>
             </div>

             {/* Ad Placement */}
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

             {/* Transfer CTA */}
             <div className="card" style={{ 
               padding: "1.5rem",
               border: "1px solid rgba(59, 130, 246, 0.2)",
               textAlign: "center"
             }}>
               <RefreshCcw size={32} color="#3b82f6" style={{ margin: "0 auto 1rem" }} />
               <h3 style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>Send Money Abroad?</h3>
               <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "1.25rem" }}>Compare the best remittance rates for international transfers from India.</p>
               <a href="#" className="btn btn-outline" style={{ width: "100%", textAlign: "center", fontSize: "0.8rem" }}>Compare Rates</a>
             </div>
          </aside>

        </div>
      </div>

      <style>{`
        .btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
          border: none;
        }
        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
        .btn-outline {
          background: transparent;
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .btn-outline:hover {
          background: rgba(30, 41, 59, 0.5);
          color: #f1f5f9;
        }
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
