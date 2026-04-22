import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, BarChart2, 
  ArrowLeft, Zap, Info
} from "lucide-react";
import { fetchTopMovers } from "@/lib/stocks";
import { getTopStocksMeta } from "@/lib/meta";
import { NIFTY50_STOCKS, NIFTY_NEXT50 } from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { type } = await params;
  const pType = type as "gainers" | "losers" | "active";
  return getTopStocksMeta(pType === "active" ? "most-active" : pType);
}

export const revalidate = 60;

export default async function TopStocksPage({ params }: PageProps) {
  const { type: rawType } = await params;
  const type = rawType as "gainers" | "losers" | "active";
  
  // Scrutinize Nifty 100 for top movers
  const pool = [...NIFTY50_STOCKS, ...NIFTY_NEXT50];
  const stocks = await fetchTopMovers(pool, type);

  const titleMap = {
    gainers: { name: "Top Gainers", Icon: TrendingUp, color: "#10b981", desc: "Leading stocks by percentage price increase on NSE today." },
    losers: { name: "Top Losers", Icon: TrendingDown, color: "#ef4444", desc: "Stocks with the deepest price percentage decline on NSE today." },
    active: { name: "Most Active", Icon: Activity, color: "#3b82f6", desc: "Highest volume traders on the exchange today by turnover." }
  };

  const meta = titleMap[type] || titleMap.gainers;
  const { name, Icon, color, desc } = meta;

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Stocks", url: "/stocks" },
        { name, url: `/top-stocks/${type}` },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/stocks" style={{ color: "inherit", textDecoration: "none" }}>Stocks</Link>
            <span>/</span>
            <span style={{ color: "#94a3b8" }}>{name}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
             <div>
                <h1 style={{ fontSize: "2.75rem", fontWeight: 800, color: "#f1f5f9", margin: 0, display: "flex", alignItems: "center", gap: "16px" }}>
                  <Icon size={36} color={color} /> {name} Today
                </h1>
                <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "0.5rem", maxWidth: "700px" }}>
                  {desc} Real-time data from NSE India.
                </p>
             </div>
             <div style={{ 
               background: "rgba(30, 41, 59, 0.4)", 
               padding: "10px 20px", 
               borderRadius: "12px", 
               border: `1px solid ${color}22`,
               display: "flex",
               alignItems: "center",
               gap: "10px"
             }}>
                <Zap size={16} color={color} />
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#cbd5e1" }}>Updates in 60s</span>
             </div>
          </div>
        </div>

        {/* Action / Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
           <section>
              <MarketTable quotes={stocks} showRank />
           </section>

           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                 <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                   <BarChart2 size={18} color="#3b82f6" /> Strategic Insight
                 </h3>
                 <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6 }}>
                   Monitor {type === "gainers" ? "positive momentum" : type === "losers" ? "downward trends" : "liquidity traps"} in the market. 
                   Sudden activity in large-cap stocks often precedes major index movements.
                 </p>
              </div>
              <div className="card" style={{ padding: "1.5rem", background: "rgba(15, 23, 42, 0.5)" }}>
                 <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                   <Info size={18} color="#f59e0b" /> Market Sentiment
                 </h3>
                 <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6 }}>
                   While local benchmarks are driving {name}, keep an eye on US Futures and Asian markets to identify overarching global trends.
                 </p>
              </div>
              <div className="card" style={{ 
                padding: "1.5rem", 
                border: "1px solid rgba(59, 130, 246, 0.2)",
                textAlign: "center" 
              }}>
                 <Link href="/markets/india" className="btn btn-primary" style={{ width: "100%", fontSize: "0.85rem" }}>View Market India Hub</Link>
                 <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#475569" }}>Analyze sectors and industry performance.</div>
              </div>
           </div>
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
      `}</style>
    </>
  );
}
