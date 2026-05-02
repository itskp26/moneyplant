import type { Metadata } from "next";
import Link from "next/link";
import { 
  Globe, Landmark, Languages, RefreshCcw, 
  ShieldCheck, Info, Zap, ArrowRight
} from "lucide-react";
import { fetchAllForexRates } from "@/lib/forex";
import ForexTable from "@/components/ForexTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { getForexMeta } from "@/lib/meta";

export const metadata: Metadata = getForexMeta();


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
