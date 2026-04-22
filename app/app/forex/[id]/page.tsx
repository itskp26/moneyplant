import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, DollarSign, BarChart2, 
  Info, Globe, Landmark, Languages, RefreshCcw
} from "lucide-react";
import { fetchAllForexRates } from "@/lib/forex";
import { getForexMeta } from "@/lib/meta";
import { FOREX_PAIRS } from "@/lib/constants";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const pairInfo = FOREX_PAIRS.find(p => p.id === id);
  if (!pairInfo) return { title: "Forex Pair Not Found | MoneyPlant" };
  
  const rates = await fetchAllForexRates();
  const rateData = rates.find(r => r.pair === pairInfo.symbol);
  
  return getForexMeta(
    pairInfo.id, 
    pairInfo.name, 
    pairInfo.base, 
    pairInfo.quote, 
    rateData?.rate.toFixed(4)
  );
}

export const revalidate = 300; // Forex updates every few mins

export default async function ForexDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pairInfo = FOREX_PAIRS.find(p => p.id === id);

  if (!pairInfo) {
    return (
      <div className="container section" style={{ textAlign: "center", padding: "10rem 0" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Forex Pair Not Found</h1>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>We couldn't find data for: {id}</p>
        <Link href="/forex" className="btn btn-primary">Back to Forex Hub</Link>
      </div>
    );
  }

  const rates = await fetchAllForexRates();
  const rateData = rates.find(r => r.pair === pairInfo.symbol);

  const pos = (rateData?.changePercent ?? 0) >= 0;
  const numFmt = (n: number | undefined, d = 4) => 
    n !== undefined ? n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }) : "—";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Forex", url: "/forex" },
        { name: pairInfo.name, url: `/forex/${pairInfo.id}` },
      ])} />

      <div className="container section">
        {/* Header Section */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/forex" style={{ color: "inherit", textDecoration: "none" }}>Forex</Link>
            <span>/</span>
            <span style={{ color: "#94a3b8" }}>{pairInfo.name}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" }}>
                <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, margin: 0 }}>
                  {pairInfo.base} to {pairInfo.quote} Rate
                </h1>
                <span style={{ 
                  background: "rgba(51, 65, 85, 0.5)", 
                  padding: "4px 10px", 
                  borderRadius: "6px", 
                  fontSize: "0.9rem", 
                  fontWeight: 700,
                  color: "#94a3b8",
                  border: "1px solid rgba(148, 163, 184, 0.1)"
                }}>
                  {pairInfo.id.toUpperCase()}
                </span>
              </div>
              <div style={{ color: "#64748b", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                   <Globe size={14} /> Global Currency Market
                </span>
                <span>•</span>
                <span>Real-Time Exchange Rate</span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ 
                fontSize: "clamp(2.5rem, 6vw, 3.75rem)", 
                fontWeight: 800, 
                color: "#f1f5f9", 
                lineHeight: 1,
                fontFamily: "var(--font-sora)"
              }}>
                {numFmt(rateData?.rate)}
              </div>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "flex-end",
                gap: "8px", 
                marginTop: "0.5rem",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: pos ? "#10b981" : "#ef4444"
              }}>
                {pos ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span>{pos ? "+" : ""}{rateData?.changePercent.toFixed(2)}%</span>
              </div>
              <div style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "8px" }}>
                 Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Converter / Content Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 380px", 
          gap: "2.5rem",
          marginBottom: "3rem" 
        }} className="content-grid">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Conversion Tool UI (Static but looks good) */}
            <div className="card" style={{ padding: "2rem", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}>
               <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem", fontWeight: 800 }}>Currency Converter</h2>
               <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "150px" }}>
                     <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", marginBottom: "8px", textTransform: "uppercase" }}>From {pairInfo.base}</label>
                     <div style={{ 
                       background: "#020817", 
                       border: "1px solid #334155", 
                       borderRadius: "10px", 
                       padding: "1rem",
                       fontSize: "1.5rem",
                       fontWeight: 700,
                       color: "#f8fafc"
                     }}>
                        1.00
                     </div>
                  </div>
                  <div style={{ padding: "1.5rem 0.5rem 0" }}>
                     <RefreshCcw size={20} color="#64748b" />
                  </div>
                  <div style={{ flex: 1, minWidth: "150px" }}>
                     <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", marginBottom: "8px", textTransform: "uppercase" }}>To {pairInfo.quote}</label>
                     <div style={{ 
                       background: "#020817", 
                       border: "1px solid #334155", 
                       borderRadius: "10px", 
                       padding: "1rem",
                       fontSize: "1.5rem",
                       fontWeight: 700,
                       color: "#10b981"
                     }}>
                        {numFmt(rateData?.rate)}
                     </div>
                  </div>
               </div>
               <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#64748b", textAlign: "center" }}>
                  Mid-market exchange rate. Disclaimer: Rates are for informational purposes only.
               </p>
            </div>

            {/* Historical Rates / Intervals */}
            <div className="card" style={{ padding: "1.5rem" }}>
               <h2 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <BarChart2 size={18} color="#10b981" /> Exchange Rate Table
               </h2>
               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[1, 10, 50, 100, 500, 1000].map(amt => (
                      <div key={amt} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                        <span style={{ color: "#64748b", fontSize: "0.9rem" }}>{amt} {pairInfo.base}</span>
                        <span style={{ fontWeight: 700 }}>{numFmt(amt * (rateData?.rate ?? 0), 2)} {pairInfo.quote}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[100, 500, 1000, 5000, 10000, 50000].map(amt => (
                      <div key={amt} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                        <span style={{ color: "#64748b", fontSize: "0.9rem" }}>{amt} {pairInfo.quote}</span>
                        <span style={{ fontWeight: 700 }}>{numFmt(amt / (rateData?.rate ?? 1), 2)} {pairInfo.base}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* About Pair */}
            <div className="card" style={{ padding: "1.5rem" }}>
               <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Info size={18} color="#f59e0b" /> About {pairInfo.name}
               </h2>
               <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8 }}>
                  The {pairInfo.name} ({pairInfo.id.toUpperCase()}) indicates how much the {pairInfo.base} is worth against the {pairInfo.quote}. It is one of the most traded currency pairs in the Indian forex market. The rate is influenced by various factors including interest rates of central banks (RBI, Fed, ECB), economic growth, and geopolitical events.
               </p>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
             {/* Other Pairs */}
             <div className="card" style={{ padding: "1.25rem" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem" }}>Popular Pairs</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                   {FOREX_PAIRS.filter(p => p.id !== id).slice(0, 8).map(p => (
                      <Link key={p.id} href={`/forex/${p.id}`} style={{ 
                        textDecoration: "none", 
                        display: "flex", 
                        justifyContent: "space-between",
                        padding: "0.6rem 0.8rem",
                        background: "rgba(30, 41, 59, 0.4)",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        color: "#cbd5e1",
                        border: "1px solid rgba(51, 65, 85, 0.3)"
                      }}>
                         <span>{p.base}/{p.quote}</span>
                         <span style={{ color: "#64748b" }}>↗</span>
                      </Link>
                   ))}
                </div>
             </div>

             {/* Ad */}
             <div style={{ 
               background: "rgba(15, 23, 42, 0.8)", 
               border: "1px dashed rgba(51, 65, 85, 0.6)", 
               borderRadius: "12px",
               padding: "4rem 1.5rem",
               textAlign: "center",
               color: "#334155",
               fontSize: "0.8rem"
             }}>
               Advertisement
             </div>
          </div>

        </div>
      </div>
    </>
  );
}
