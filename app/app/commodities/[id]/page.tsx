import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Activity, Globe, Zap, AlertCircle,
  BarChart2, Droplet, Gem
} from "lucide-react";
import { fetchQuote, fetchMultipleQuotes } from "@/lib/stocks";
import { getCommodityMeta } from "@/lib/meta";
import { COMMODITIES } from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const commodity = COMMODITIES.find((c) => c.id === id);
  if (!commodity) return { title: "Commodity Not Found | MoneyPlant" };

  const usdInr = await fetchQuote("USDINR=X");
  const inrRate = usdInr?.price || 83.5;
  const quote = await fetchQuote(commodity.symbol);
  const inrPrice = quote
    ? (quote.price * inrRate * commodity.factor).toLocaleString("en-IN", { maximumFractionDigits: 0 })
    : undefined;

  return getCommodityMeta(
    commodity.id as "gold" | "silver" | "crude-oil" | "platinum",
    inrPrice
  );
}

export const revalidate = 300;

const ICON_MAP: Record<string, React.ReactNode> = {
  gold: <Gem size={28} color="#f59e0b" />,
  silver: <Gem size={28} color="#94a3b8" />,
  "crude-oil": <Droplet size={28} color="#3b82f6" />,
  "brent-oil": <Droplet size={28} color="#6366f1" />,
  "natural-gas": <Zap size={28} color="#10b981" />,
  platinum: <Gem size={28} color="#e2e8f0" />,
  copper: <BarChart2 size={28} color="#f97316" />,
};

export default async function CommodityDetailPage({ params }: PageProps) {
  const { id } = await params;
  const commodity = COMMODITIES.find((c) => c.id === id);

  if (!commodity) {
    return (
      <div className="container section" style={{ textAlign: "center", padding: "10rem 0" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Commodity Not Found</h1>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>
          We couldn&apos;t find data for: <strong>{id}</strong>
        </p>
        <Link href="/commodities" style={{ textDecoration: "none", background: "#3b82f6", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "10px", fontWeight: 700 }}>
          ← Back to Commodities
        </Link>
      </div>
    );
  }

  // Fetch prices in parallel
  const [quote, usdInrQuote] = await Promise.all([
    fetchQuote(commodity.symbol),
    fetchQuote("USDINR=X"),
  ]);

  // Fetch related symbols (exclude current)
  const relatedSymbols = commodity.relatedSymbols.filter(s => s !== commodity.symbol);
  const relatedQuotes = await fetchMultipleQuotes(relatedSymbols);

  const inrRate = usdInrQuote?.price || 83.5;
  const pos = (quote?.changePercent ?? 0) >= 0;

  const numFmt = (n: number | undefined, d = 2) =>
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  const inrPrice = quote ? (quote.price * inrRate * commodity.factor) : null;
  const inrPriceFmt = inrPrice
    ? inrPrice.toLocaleString("en-IN", { maximumFractionDigits: 0 })
    : "—";

  // Sidebar: other commodities
  const otherCommodities = COMMODITIES.filter(c => c.id !== commodity.id).slice(0, 6);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Commodities", url: "/commodities" },
        { name: commodity.shortName, url: `/commodities/${commodity.id}` },
      ])} />

      <div className="container section">

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem", marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/commodities" style={{ color: "inherit", textDecoration: "none" }}>Commodities</Link>
          <span>/</span>
          <span style={{ color: "#94a3b8" }}>{commodity.shortName}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "0.5rem" }}>
                <div style={{
                  background: "rgba(30, 41, 59, 0.7)", padding: "12px", borderRadius: "14px",
                  border: `1px solid ${commodity.color}30`
                }}>
                  {ICON_MAP[commodity.id] ?? <BarChart2 size={28} color={commodity.color} />}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, margin: 0 }}>
                      {commodity.name}
                    </h1>
                    <span style={{
                      background: "rgba(16, 185, 129, 0.1)", padding: "4px 12px", borderRadius: "6px",
                      fontSize: "0.75rem", fontWeight: 700, color: "#10b981",
                      border: "1px solid rgba(16, 185, 129, 0.2)"
                    }}>LIVE</span>
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
                    {commodity.exchange} &nbsp;•&nbsp; {commodity.unitLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Block */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>
                ₹{inrPriceFmt}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
                India Estimate {commodity.unitLabel}
              </div>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "flex-end",
                gap: "8px", marginTop: "0.5rem", fontSize: "1.1rem", fontWeight: 600,
                color: pos ? "#10b981" : "#ef4444"
              }}>
                {pos ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                <span>{pos ? "+" : ""}{numFmt(quote?.changePercent)}%</span>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2.5rem" }} className="content-grid">

          {/* LEFT column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Price Snapshot Card */}
            <div className="card" style={{ padding: "1.75rem", border: `1px solid ${commodity.color}20` }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Globe size={18} color="#3b82f6" /> Price Snapshot
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
                {/* World USD */}
                <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "1.25rem", borderRadius: "12px", border: "1px solid rgba(51, 65, 85, 0.4)" }}>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>World Price (USD)</div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f8fafc" }}>${numFmt(quote?.price)}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>{commodity.unitLabel}</div>
                </div>
                {/* India INR */}
                <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "1.25rem", borderRadius: "12px", border: `1px solid ${commodity.color}30` }}>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>India Estimate (₹)</div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: commodity.color }}>₹{inrPriceFmt}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>{commodity.unitLabel}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                {[
                  { label: "Open",       val: quote?.open,          prefix: "$" },
                  { label: "Day Low",    val: quote?.dayLow,        prefix: "$", color: "#ef4444" },
                  { label: "Day High",   val: quote?.dayHigh,       prefix: "$", color: "#10b981" },
                  { label: "Prev Close", val: quote?.previousClose, prefix: "$" },
                  { label: "52W Low",    val: quote?.low52,         prefix: "$" },
                  { label: "52W High",   val: quote?.high52,        prefix: "$" },
                ].map(({ label, val, prefix, color }) => (
                  <div key={label}>
                    <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{label}</div>
                    <div style={{ fontWeight: 700, color: color ?? "#f1f5f9" }}>{prefix}{numFmt(val)}</div>
                  </div>
                ))}
              </div>

              {/* Day Range Bar */}
              {quote?.dayLow && quote?.dayHigh && (
                <div style={{ marginTop: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", marginBottom: "8px" }}>
                    <span>Day Range</span>
                    <span>{(((quote.price - quote.dayLow) / (quote.dayHigh - quote.dayLow)) * 100).toFixed(0)}% of range</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(51, 65, 85, 0.5)", borderRadius: "2px", position: "relative" }}>
                    <div style={{
                      position: "absolute",
                      left: `${Math.min(100, Math.max(0, ((quote.price - quote.dayLow) / (quote.dayHigh - quote.dayLow)) * 100))}%`,
                      top: "-4px", width: "12px", height: "12px",
                      background: commodity.color, borderRadius: "50%", border: "2px solid #0f172a",
                      transform: "translateX(-50%)"
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 600, marginTop: "8px" }}>
                    <span>${numFmt(quote.dayLow)}</span>
                    <span>${numFmt(quote.dayHigh)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Currency Reference Card */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={18} color="#f59e0b" /> Currency Reference
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "1rem", borderRadius: "10px", border: "1px solid rgba(51, 65, 85, 0.4)" }}>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", marginBottom: "4px" }}>USD / INR Rate</div>
                  <div style={{ fontWeight: 800, fontSize: "1.4rem" }}>₹{numFmt(usdInrQuote?.price)}</div>
                </div>
                <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "1rem", borderRadius: "10px", border: "1px solid rgba(51, 65, 85, 0.4)" }}>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", marginBottom: "4px" }}>Conversion Factor</div>
                  <div style={{ fontWeight: 800, fontSize: "1.4rem" }}>× {commodity.factor}</div>
                </div>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#475569", marginTop: "1rem", lineHeight: 1.6 }}>
                India price estimate = World price × USD/INR rate × unit conversion factor. Actual MCX prices may vary due to import duties, GST, and exchange premiums.
              </p>
            </div>

            {/* About */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <BarChart2 size={18} color={commodity.color} /> About {commodity.shortName}
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.9 }}>
                {commodity.description}
              </p>
            </div>

            {/* Related Futures Table */}
            {relatedQuotes.length > 0 && (
              <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Globe size={18} color="#3b82f6" /> Related Futures
                </h2>
                <MarketTable quotes={relatedQuotes} />
              </section>
            )}
          </div>

          {/* RIGHT sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Market Status */}
            <div className="card" style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Zap size={16} color="#10b981" /> Market Status
              </h3>
              <div style={{ fontSize: "0.85rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>MCX India</span>
                  <span style={{ fontWeight: 700, color: "#10b981" }}>OPEN</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{commodity.exchange.split("/")[1]?.trim() ?? "COMEX"}</span>
                  <span style={{ fontWeight: 700, color: "#10b981" }}>OPEN</span>
                </div>
              </div>
            </div>

            {/* Other Commodities */}
            <div className="card" style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem", color: "#f1f5f9" }}>Other Commodities</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {otherCommodities.map(c => (
                  <Link key={c.id} href={`/commodities/${c.id}`} style={{
                    textDecoration: "none", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.65rem 0.9rem", borderRadius: "8px",
                    background: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(51, 65, 85, 0.4)",
                    transition: "all 0.2s"
                  }} className="related-commodity-link">
                    <span style={{ fontSize: "0.85rem", color: "#cbd5e1", fontWeight: 600 }}>{c.shortName}</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{c.unit}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad Widget */}
            <div style={{
              background: "rgba(15, 23, 42, 0.8)", border: "1px dashed rgba(51, 65, 85, 0.6)",
              borderRadius: "12px", padding: "4rem 1.5rem", textAlign: "center",
              color: "#334155", fontSize: "0.8rem"
            }}>Advertisement</div>

            {/* Disclaimer */}
            <div className="card" style={{ padding: "1.25rem", border: "1px solid rgba(239, 68, 68, 0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <AlertCircle size={14} color="#ef4444" />
                <h4 style={{ fontSize: "0.8rem", color: "#f1f5f9", margin: 0 }}>Price Disclaimer</h4>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                INR prices shown are estimates based on international spot market data and USD/INR exchange rates. Actual MCX prices include import duties, GST (3% on gold/silver), warehousing charges, and exchange premiums. Always verify with your broker.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .related-commodity-link:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(30, 41, 59, 0.8);
        }
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
