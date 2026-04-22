import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, BarChart2, 
  Map, List, Compass
} from "lucide-react";
import { fetchQuote, fetchMultipleQuotes } from "@/lib/stocks";
import { getIndexMeta } from "@/lib/meta";
import { INDICES, NIFTY50_STOCKS, NIFTY_NEXT50, BANK_STOCKS, IT_STOCKS, PHARMA_STOCKS, AUTO_STOCKS, FMCG_STOCKS, REALTY_STOCKS, PSU_STOCKS } from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Map index ID to stock symbols for composition table
const INDEX_COMPOSITION_MAP: Record<string, string[]> = {
  "nifty-50": NIFTY50_STOCKS,
  "nifty-next-50": NIFTY_NEXT50,
  "bank-nifty": BANK_STOCKS.slice(0, 12).map(s => s.symbol),
  "nifty-it": IT_STOCKS.slice(0, 10).map(s => s.symbol),
  "nifty-pharma": PHARMA_STOCKS.slice(0, 10).map(s => s.symbol),
  "nifty-auto": AUTO_STOCKS.slice(0, 10).map(s => s.symbol),
  "nifty-fmcg": FMCG_STOCKS.slice(0, 10).map(s => s.symbol),
  "nifty-realty": REALTY_STOCKS.slice(0, 10).map(s => s.symbol),
  "psu-bank": PSU_STOCKS.filter(s => s.sector.includes("Bank")).map(s => s.symbol),
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const index = INDICES.find((i) => i.id === id);
  if (!index) return { title: "Index Not Found | MoneyPlant" };
  
  const quote = await fetchQuote(index.symbol);
  
  return getIndexMeta(
    index.id, 
    index.name, 
    quote?.price.toLocaleString("en-IN"), 
    quote?.changePercent.toFixed(2)
  );
}

export const revalidate = 60;

export default async function IndexDetailPage({ params }: PageProps) {
  const { id } = await params;
  const index = INDICES.find((i) => i.id === id);

  if (!index) {
    return (
      <div className="container section" style={{ textAlign: "center", padding: "10rem 0" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Index Not Found</h1>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const quote = await fetchQuote(index.symbol);
  
  // Fetch composition stocks
  const compositionSymbols = INDEX_COMPOSITION_MAP[id] || [];
  const stocks = compositionSymbols.length > 0 
    ? await fetchMultipleQuotes(compositionSymbols.slice(0, 20)) 
    : [];

  const pos = (quote?.changePercent ?? 0) >= 0;
  const numFmt = (n: number | undefined, d = 2) => 
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Indices", url: "/indices" },
        { name: index.name, url: `/indices/${index.id}` },
      ])} />

      <div className="container section">
        {/* Header Section */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/indices" style={{ color: "inherit", textDecoration: "none" }}>Indices</Link>
            <span>/</span>
            <span style={{ color: "#94a3b8" }}>{index.name}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" }}>
                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, margin: 0 }}>
                  {index.name}
                </h1>
                <span style={{ 
                  background: "rgba(16, 185, 129, 0.1)", 
                  padding: "4px 12px", 
                  borderRadius: "6px", 
                  fontSize: "0.85rem", 
                  fontWeight: 700,
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}>
                  LIVE
                </span>
              </div>
              <div style={{ color: "#64748b", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span>{index.exchange}</span>
                <span>•</span>
                <span>{index.country}</span>
                <span>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                   {index.symbol}
                </span>
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
                {numFmt(quote?.price)}
              </div>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "flex-end",
                gap: "10px", 
                marginTop: "0.75rem",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: pos ? "#10b981" : "#ef4444"
              }}>
                {pos ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <span>{pos ? "+" : ""}{numFmt(quote?.change)}</span>
                <span>({pos ? "+" : ""}{numFmt(quote?.changePercent)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 380px", 
          gap: "2.5rem",
          marginBottom: "3rem" 
        }} className="content-grid">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Key Stats */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={18} color="#3b82f6" /> Market Summary
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Previous Close</div>
                  <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{numFmt(quote?.previousClose)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Open</div>
                  <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{numFmt(quote?.open)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Day Range</div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>{numFmt(quote?.dayLow)} - {numFmt(quote?.dayHigh)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>52-Week Low</div>
                  <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{numFmt(quote?.low52)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>52-Week High</div>
                  <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{numFmt(quote?.high52)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Exchange</div>
                  <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{index.exchange === "NSE" ? "NSE India" : "BSE India"}</div>
                </div>
              </div>
            </div>

            {/* Composition Table */}
            {stocks.length > 0 && (
              <section>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                   <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                    <List size={20} color="#10b981" /> Top Constituents
                   </h2>
                   <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Showing top 20 by weightage/val</span>
                </div>
                <MarketTable quotes={stocks} showRank />
              </section>
            )}

            {/* About Index */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Compass size={18} color="#f59e0b" /> Index Overview
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                The {index.name} is a benchmark index that represents the performance of top Indian companies listed on the {index.exchange}. It is widely used by investors and fund managers as a primary gauge of the Indian equity market's health and direction.
              </p>
              <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "1rem", borderRadius: "10px", border: "1px solid rgba(51, 65, 85, 0.5)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#64748b", fontSize: "0.85rem" }}>
                  <Map size={16} /> <span>Primary Sectors: Banking, IT, Energy, FMCG, and Metals.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
             {/* Related Indices */}
             <div className="card" style={{ padding: "1.25rem" }}>
               <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1.25rem", color: "#f1f5f9" }}>Related Indian Indices</h3>
               <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                 {INDICES.filter(i => i.id !== id).slice(0, 6).map(idx => (
                    <Link key={idx.id} href={`/indices/${idx.id}`} style={{ 
                      textDecoration: "none", 
                      display: "flex", 
                      justifyContent: "space-between",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      background: "rgba(30, 41, 59, 0.5)",
                      border: "1px solid rgba(51, 65, 85, 0.4)",
                      transition: "all 0.2s"
                    }} className="related-index-link">
                      <span style={{ fontSize: "0.85rem", color: "#cbd5e1", fontWeight: 600 }}>{idx.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{idx.exchange}</span>
                    </Link>
                 ))}
               </div>
             </div>

             {/* Ad Widget */}
             <div style={{ 
               background: "rgba(15, 23, 42, 0.8)", 
               border: "1px dashed rgba(51, 65, 85, 0.6)", 
               borderRadius: "12px",
               padding: "3rem 1.5rem",
               textAlign: "center",
               color: "#475569",
               fontSize: "0.8rem"
             }}>
               Advertisement
             </div>

             {/* Quick Actions */}
             <div className="card" style={{ padding: "1.5rem", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
                <h3 style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>Market Outlook</h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>Stay updated with the latest market trends and expert analysis on {index.name}.</p>
                <Link href="/news" className="btn btn-primary" style={{ width: "100%", textAlign: "center" }}>View News Hub</Link>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        .related-index-link:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(30, 41, 59, 0.8);
        }
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
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
