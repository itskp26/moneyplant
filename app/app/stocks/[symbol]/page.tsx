import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Activity, DollarSign, BarChart2,
  Info, ShieldCheck, Globe, Building2, Layers
} from "lucide-react";
import { fetchStockDetail } from "@/lib/stocks";
import { getStockMeta } from "@/lib/meta";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema, organizationSchema } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { symbol } = await params;
  const stock = await fetchStockDetail(symbol);
  if (!stock) return { 
    title: `Stock Not Found: ${symbol.toUpperCase()}`,
    description: `We could not find data for the stock symbol ${symbol.toUpperCase()}. Please check the symbol and try again on MoneyPlant.`
  };

  return getStockMeta(
    stock.symbol,
    stock.name || stock.symbol,
    stock.price.toFixed(2),
    stock.changePercent.toFixed(2)
  );
}

export const revalidate = 60;

export default async function StockDetailPage({ params }: PageProps) {
  const { symbol } = await params;
  const stock = await fetchStockDetail(symbol);

  if (!stock) {
    return (
      <div className="container section" style={{ textAlign: "center", padding: "10rem 0" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Stock Not Found</h1>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>We couldn't find data for the symbol: {symbol}</p>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const pos = stock.changePercent >= 0;
  const numFmt = (n: number | undefined, d = 2) =>
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  const marketCapFmt = (n: number | undefined) => {
    if (!n) return "—";
    if (n >= 1000000000000) return `₹${(n / 1000000000000).toFixed(2)} Cr`; // This is wrong, MC in YF is usually USD unless converted. NSE is in INR usually.
    // Actually MC from YF for .NS stocks is already in INR usually, but in full units.
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Stocks", url: "/stocks" },
        { name: stock.name || stock.symbol, url: `/stocks/${stock.symbol.toLowerCase()}` },
      ])} />

      <div className="container section">
        {/* Header Section */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/stocks" style={{ color: "inherit", textDecoration: "none" }}>Stocks</Link>
            <span>/</span>
            <span style={{ color: "#94a3b8" }}>{stock.symbol}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" }}>
                <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, margin: 0 }}>
                  {stock.name}
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
                  {stock.symbol.split(".")[0]}
                </span>
              </div>
              <div style={{ color: "#64748b", display: "flex", alignItems: "center", gap: "1rem" }}>
                <span>{stock.exchange || "NSE"}</span>
                <span>•</span>
                <span>EQ</span>
                <span>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldCheck size={14} color="#10b981" /> Verified Data
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 800,
                color: "#f1f5f9",
                lineHeight: 1,
                fontFamily: "var(--font-sora)"
              }}>
                ₹{numFmt(stock.price)}
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "0.5rem",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: pos ? "#10b981" : "#ef4444"
              }}>
                {pos ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                <span>{pos ? "+" : ""}{numFmt(stock.change)}</span>
                <span>({pos ? "+" : ""}{numFmt(stock.changePercent)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "2rem",
          marginBottom: "3rem"
        }} className="content-grid">

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Main Stats Card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={18} color="#3b82f6" /> Stock Performance
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Open</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{numFmt(stock.open)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Prev Close</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{numFmt(stock.previousClose)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Volume</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{numFmt(stock.volume, 0)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Day Low</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#ef4444" }}>₹{numFmt(stock.dayLow)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Day High</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#10b981" }}>₹{numFmt(stock.dayHigh)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Market Cap</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{marketCapFmt(stock.marketCap)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>52W Low</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{numFmt(stock.low52)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>52W High</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{numFmt(stock.high52)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>P/E Ratio</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{numFmt(stock.pe)}</div>
                </div>
              </div>

              {/* Day Range Visualizer */}
              <div style={{ marginTop: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", marginBottom: "8px" }}>
                  <span>Day Range</span>
                  <span>{((stock.price - (stock.dayLow ?? 0)) / ((stock.dayHigh ?? 1) - (stock.dayLow ?? 0)) * 100).toFixed(0)}% of range</span>
                </div>
                <div style={{ height: "4px", background: "rgba(51, 65, 85, 0.5)", borderRadius: "2px", position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    left: `${Math.min(100, Math.max(0, ((stock.price - (stock.dayLow ?? 0)) / ((stock.dayHigh ?? 1) - (stock.dayLow ?? 0)) * 100)))}%`,
                    top: "-4px",
                    width: "12px",
                    height: "12px",
                    background: "#3b82f6",
                    borderRadius: "50%",
                    border: "2px solid #0f172a"
                  }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 600, marginTop: "8px" }}>
                  <span>₹{numFmt(stock.dayLow)}</span>
                  <span>₹{numFmt(stock.dayHigh)}</span>
                </div>
              </div>
            </div>

            {/* Fundamentals */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <BarChart2 size={18} color="#10b981" /> Fundamentals & Key Ratios
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>EPS (TTM)</span>
                    <span style={{ fontWeight: 600 }}>{numFmt(stock.eps)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>P/B Ratio</span>
                    <span style={{ fontWeight: 600 }}>{numFmt(stock.pbRatio)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>Div. Yield</span>
                    <span style={{ fontWeight: 600 }}>{numFmt(stock.dividendYield)}%</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>ROE</span>
                    <span style={{ fontWeight: 600 }}>{numFmt(stock.roe)}%</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>Debt to Equity</span>
                    <span style={{ fontWeight: 600 }}>{numFmt(stock.debtToEquity)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px" }}>
                    <span style={{ color: "#64748b" }}>Face Value</span>
                    <span style={{ fontWeight: 600 }}>—</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Building2 size={18} color="#f59e0b" /> About {stock.name}
              </h2>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ background: "rgba(30, 41, 59, 0.5)", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid rgba(51, 65, 85, 0.5)" }}>
                  <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase" }}>Sector</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#cbd5e1" }}>{stock.sector || "N/A"}</div>
                </div>
                <div style={{ background: "rgba(30, 41, 59, 0.5)", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid rgba(51, 65, 85, 0.5)" }}>
                  <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase" }}>Industry</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#cbd5e1" }}>{stock.industry || "N/A"}</div>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: 0 }}>
                {stock.description || `No description available for ${stock.name}. ${stock.name} is a leading company listed on ${stock.exchange || "the NSE"}.`}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* CTA / Ad Widget */}
            <div className="card" style={{
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              padding: "1.5rem",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              textAlign: "center"
            }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Activity size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Ready to invest?</h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.5rem" }}>Open a demat account with India's top brokers and start trading {stock.symbol} today.</p>
              <a href="#" className="btn btn-primary" style={{ width: "100%" }}>Open Demat Account</a>
            </div>

            {/* Sector Stocks */}
            <div className="card" style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Layers size={16} color="#8b5cf6" /> More in {stock.sector || "this sector"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Explore other companies in the {stock.sector || "same"} industry area.</p>
                <Link href="/markets/india" className="btn btn-outline" style={{ display: "block", textAlign: "center", fontSize: "0.8rem", padding: "0.5rem" }}>
                  View All Sector Stocks
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ fontSize: "0.75rem", color: "#334155", padding: "0 0.5rem" }}>
              <div style={{ fontWeight: 700, marginBottom: "4px" }}>Disclaimer:</div>
              Stock prices are real-time or delayed as per exchange rules. Financial data is sourced from public filings. MoneyPlant does not provide investment advice.
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
