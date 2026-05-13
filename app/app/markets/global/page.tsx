import type { Metadata } from "next";
import Link from "next/link";
import { fetchMultipleQuotes } from "@/lib/stocks";
import { US_INDICES, EUROPE_INDICES, ASIA_INDICES, MEA_INDICES, US_STOCKS } from "@/lib/constants";
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import { 
  Globe, TrendingUp, TrendingDown, Clock, Activity, 
  MapPin, ChevronRight, BarChart3, Search, Zap,
  Compass
} from "lucide-react";

export const revalidate = 120;

import { getMarketsMeta } from "@/lib/meta";

export const metadata: Metadata = getMarketsMeta("global");

// Professional country codes/badges instead of toy emojis
const COUNTRY_CODE: Record<string, string> = {
  USA: "US", UK: "UK", Germany: "DE", France: "FR", Spain: "ES",
  Switzerland: "CH", Italy: "IT", Netherlands: "NL", Eurozone: "EU",
  Japan: "JP", "Hong Kong": "HK", China: "CN", Australia: "AU",
  "South Korea": "KR", Taiwan: "TW", Singapore: "SG", Malaysia: "MY",
  Indonesia: "ID", India: "IN", Thailand: "TH", Philippines: "PH",
  "Saudi Arabia": "SA", "UAE (Dubai)": "AE", "UAE (Abu Dhabi)": "AE",
  Qatar: "QA", Israel: "IL", Egypt: "EG", Canada: "CA",
  Brazil: "BR", Mexico: "MX",
};

function IndexCard({ name, country, value, changePercent, id }: {
  name: string; country: string; value?: number; changePercent?: number; id?: string;
}) {
  const pos = (changePercent ?? 0) >= 0;
  const accentColor = pos ? "#10b981" : "#ef4444";
  
  return (
    <div className="card" style={{ 
      padding: "1.25rem",
      background: "rgba(15, 23, 42, 0.4)",
      border: `1px solid rgba(255, 255, 255, 0.05)`,
      borderRadius: "20px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Accent glow on hover — subtle */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)`
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ 
            fontSize: "0.65rem", fontWeight: 800, color: "#f8fafc",
            background: "rgba(59, 130, 246, 0.15)", padding: "2px 6px", borderRadius: "4px",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            letterSpacing: "0.05em"
          }}>
            {COUNTRY_CODE[country] || "INTL"}
          </div>
          <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            {country}
          </span>
        </div>
        {id && (
          <Link href={`/indices/${id}`} style={{ 
            width: "24px", height: "24px", borderRadius: "50%",
            background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#94a3b8", textDecoration: "none", border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <ChevronRight size={14} />
          </Link>
        )}
      </div>

      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{name}</div>
      
      {value != null ? (
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f8fafc", fontFamily: "var(--font-sora)", letterSpacing: "-0.02em" }}>
            {value.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <div style={{ 
            fontSize: "0.85rem", fontWeight: 800, color: accentColor,
            display: "flex", alignItems: "center", gap: "2px"
          }}>
            {pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(changePercent ?? 0).toFixed(2)}%
          </div>
        </div>
      ) : (
        <div className="shimmer" style={{ height: "36px", borderRadius: "8px", marginTop: "4px" }} />
      )}
    </div>
  );
}

async function getData() {
  const [us, europe, asia, mea, usStocks] = await Promise.all([
    fetchMultipleQuotes(US_INDICES.map((i) => i.symbol)),
    fetchMultipleQuotes(EUROPE_INDICES.map((i) => i.symbol)),
    fetchMultipleQuotes(ASIA_INDICES.map((i) => i.symbol)),
    fetchMultipleQuotes(MEA_INDICES.slice(0, 4).map((i) => i.symbol)),
    fetchMultipleQuotes(US_STOCKS.map((s) => s.symbol)),
  ]);
  return { us, europe, asia, mea, usStocks };
}

function mergeWithData<T extends { symbol: string }>(
  indices: T[],
  quotes: { symbol: string; price: number; changePercent: number }[]
) {
  return indices.map((idx) => {
    const q = quotes.find((q) => q.symbol === idx.symbol);
    return { ...idx, value: q?.price, changePercent: q?.changePercent };
  });
}

export default async function GlobalMarketsPage() {
  const { us, europe, asia, mea, usStocks } = await getData();

  const usData = mergeWithData(US_INDICES, us);
  const euData = mergeWithData(EUROPE_INDICES, europe);
  const asData = mergeWithData(ASIA_INDICES, asia);
  const meaData = mergeWithData(MEA_INDICES, mea);
  const stockData = mergeWithData(US_STOCKS.map(s => ({ ...s, id: "", country: "USA" })), usStocks);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://moneyplant24.com" },
        { name: "Markets", url: "https://moneyplant24.com/markets" },
        { name: "Global Markets", url: "https://moneyplant24.com/markets/global" },
      ])} />
      <JsonLd data={faqSchema([
        { q: "What time does the US stock market open in India time (IST)?", a: "US markets (NYSE & NASDAQ) open at 9:30 AM EST which is 7:00 PM IST in summer (EDT) and 8:00 PM IST in winter (EST). They close at 10:00 PM IST (summer) / 11:00 PM IST (winter)." },
        { q: "What time does the London Stock Exchange (FTSE) trade in IST?", a: "FTSE 100 trades from 9:00 AM to 5:30 PM GMT, which is 2:30 PM to 11:00 PM IST." },
        { q: "What time does the Tokyo Stock Exchange (Nikkei) trade in IST?", a: "Tokyo Stock Exchange (TSE) trades from 9:00 AM to 3:30 PM JST, which is 5:30 AM to 12:00 PM IST." },
        { q: "How does S&P 500 affect Indian markets?", a: "The S&P 500 movements heavily influence Indian markets via FII/FPI flows. When the S&P 500 falls significantly, Indian Nifty 50 often opens lower the next day as foreign institutional investors reduce emerging market exposure." },
        { q: "What is the VIX index?", a: "CBOE VIX (sometimes called the 'Fear Index') measures expected market volatility in the next 30 days derived from S&P 500 options. High VIX (above 30) indicates fear/uncertainty; Low VIX (below 15) signals calm markets. India NSE also has its own India VIX." },
      ])} />

      <div className="container section">
        <nav style={{ fontSize: "0.78rem", color: "#475569", marginBottom: "1.5rem", display: "flex", gap: "4px" }}>
          <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/markets" style={{ color: "#64748b", textDecoration: "none" }}>Markets</Link>
          <span>/</span>
          <span style={{ color: "#94a3b8" }}>Global</span>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#3b82f6", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          <Globe size={16} /> Global Market Terminal
        </div>
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-0.03em" }}>
          World Stock Markets
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "850px", lineHeight: 1.7, marginBottom: "3rem" }}>
          Real-time coverage of 30+ global indices across major financial hubs. Monitor liquidity, performance trends, and opening hours for the world&apos;s decentralized economy.
        </p>

        {/* Jump links - Modern Pills */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          {[
            { label: "Americas", icon: <Compass size={14} />, href: "#americas" },
            { label: "Europe", icon: <Zap size={14} />, href: "#europe" },
            { label: "Asia-Pacific", icon: <Globe size={14} />, href: "#asia" },
            { label: "MEA", icon: <Activity size={14} />, href: "#mea" },
          ].map((l) => (
            <a key={l.label} href={l.href} style={{
              background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "12px", padding: "0.6rem 1.2rem",
              fontSize: "0.85rem", fontWeight: 700, color: "#f1f5f9", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s"
            }}>
              {l.icon} {l.label}
            </a>
          ))}
          <Link href="/markets/india" style={{
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "12px", padding: "0.6rem 1.2rem",
            fontSize: "0.85rem", fontWeight: 700, color: "#10b981", textDecoration: "none",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            <BarChart3 size={14} /> Indian Markets
          </Link>
        </div>

        {/* Top US Stocks Quick Reference - Premium Grid */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
             <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={18} color="#3b82f6" />
             </div>
             <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f8fafc", margin: 0 }}>Wall Street Leaders</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {stockData.map((s) => {
              const pos = (s.changePercent ?? 0) >= 0;
              const accentColor = pos ? "#10b981" : "#ef4444";
              return (
                <div key={s.symbol} className="card stock-card" style={{ 
                  padding: "1.25rem",
                  background: "rgba(15, 23, 42, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "20px",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#3b82f6", fontFamily: "var(--font-sora)", letterSpacing: "-0.01em" }}>{s.symbol}</span>
                    <div style={{ 
                      fontSize: "0.75rem", fontWeight: 800, color: accentColor,
                      background: pos ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)", 
                      padding: "4px 10px", borderRadius: "8px",
                      border: `1px solid ${pos ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                      display: "flex", alignItems: "center", gap: "4px"
                    }}>
                      {pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(s.changePercent ?? 0).toFixed(2)}%
                    </div>
                  </div>
                  
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "2px" }}>{s.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginBottom: "1.25rem" }}>{s.desc}</div>

                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f8fafc", fontFamily: "var(--font-sora)", letterSpacing: "-0.02em" }}>
                      {s.value ? `$${s.value.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : "—"}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 700 }}>USD</div>
                  </div>
                  
                {/* Modern visual touch: tiny sparkline-like bar */}
                <div style={{ marginTop: "1.25rem", width: "100%", height: "2px", background: "rgba(255,255,255,0.03)", borderRadius: "1px", overflow: "hidden", position: "relative" }}>
                   <div className="sparkline-pulse" style={{ width: "60%", height: "100%", background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, position: "absolute" }} />
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          .stock-card:hover {
            transform: translateY(-5px);
            background: rgba(30, 41, 59, 0.6) !important;
            border-color: rgba(59, 130, 246, 0.3) !important;
            box-shadow: 0 20px 40px -20px rgba(0,0,0,0.7), 0 0 15px rgba(59, 130, 246, 0.1) !important;
          }
          @keyframes spark-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          .sparkline-pulse {
            animation: spark-slide 3s infinite linear;
          }
        `}</style>
      </section>

        {/* Americas */}
        <section id="americas" style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
             <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={18} color="#3b82f6" />
             </div>
             <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f8fafc", margin: 0 }}>Americas Indices</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {usData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
          </div>
          <div style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: "8px", fontSize: "0.78rem", color: "#475569" }}>
            ⏰ <strong>US Market Hours in IST:</strong> Pre-market 5:30 PM–7:00 PM · Regular 7:00 PM–1:30 AM · After-hours 1:30 AM–3:30 AM (summer). Add 30 min in winter.
          </div>
        </section>

        {/* Europe */}
        <section id="europe" style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
             <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={18} color="#8b5cf6" />
             </div>
             <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f8fafc", margin: 0 }}>Europe & UK</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {euData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
          </div>
          <div style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: "8px", fontSize: "0.78rem", color: "#475569" }}>
            ⏰ <strong>European Market Hours in IST:</strong> FTSE/DAX/CAC open at 2:30 PM IST and close at 11:00 PM IST (summer). Adjust by -30 min in winter (GMT+1).
          </div>
        </section>

        {/* Asia-Pacific */}
        <section id="asia" style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">🌏 Asia-Pacific</h2>
          <p className="section-subtitle">Nikkei, Hang Seng, Shanghai, KOSPI, ASX, Nifty & more</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {asData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
          </div>
          <div style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: "8px", fontSize: "0.78rem", color: "#475569" }}>
            ⏰ <strong>Asian Market Hours in IST:</strong> Tokyo opens 5:30 AM · Shanghai opens 6:30 AM · Hong Kong opens 6:45 AM · Singapore opens 6:30 AM · India opens 9:15 AM · Australia opens 4:00 AM.
          </div>
        </section>

        {/* Middle East & Africa */}
        <section id="mea" style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">🌍 Middle East & Africa</h2>
          <p className="section-subtitle">Tadawul (Saudi), DFM (Dubai), ADX (Abu Dhabi), QSE & more</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {meaData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
            {/* Add Middle East static cards for context */}
            {[
              { name: "Boursa Kuwait (BKK)", country: "Kuwait" },
              { name: "Bahrain Bourse", country: "Bahrain" },
              { name: "Muscat Stock Exchange", country: "Oman" },
              { name: "Casablanca Stock Exchange", country: "Morocco" },
              { name: "JSE (Johannesburg)", country: "South Africa" },
              { name: "Nigeria Stock Exchange (NGX)", country: "Nigeria" },
            ].map((idx) => (
              <div key={idx.name} className="card" style={{ 
                padding: "1.25rem",
                background: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "20px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                   <div style={{ 
                     fontSize: "0.6rem", fontWeight: 800, color: "#94a3b8",
                     background: "rgba(255, 255, 255, 0.05)", padding: "2px 5px", borderRadius: "4px"
                   }}>
                     {COUNTRY_CODE[idx.country] || "INTL"}
                   </div>
                   <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                     {idx.country}
                   </span>
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#e2e8f0" }}>{idx.name}</div>
                <div className="shimmer" style={{ height: "24px", borderRadius: "8px", marginTop: "1rem" }} />
              </div>
            ))}
          </div>
        </section>

        {/* Global Market Hours Reference - High Contrast Terminal */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
             <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Clock size={18} color="#f59e0b" />
             </div>
             <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f8fafc", margin: 0 }}>Market Sessions Terminal</h2>
          </div>
          
          <div style={{ 
            background: "rgba(15, 23, 42, 0.5)", 
            borderRadius: "24px", 
            border: "1px solid rgba(255, 255, 255, 0.05)",
            overflow: "hidden",
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "rgba(30, 41, 59, 0.5)", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                  <th style={{ padding: "1.25rem 1.5rem", textAlign: "left", color: "#64748b", fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Exchange</th>
                  <th style={{ padding: "1.25rem 1.5rem", textAlign: "left", color: "#64748b", fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Session Status</th>
                  <th style={{ padding: "1.25rem 1.5rem", textAlign: "left", color: "#64748b", fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Hours (IST)</th>
                  <th style={{ padding: "1.25rem 1.5rem", textAlign: "left", color: "#64748b", fontWeight: 800, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Key Index</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { exchange: "Tokyo Stock Exchange", country: "JP", open: "5:30 AM", close: "12:00 PM", index: "Nikkei 225" },
                  { exchange: "Shanghai Stock Exchange", country: "CN", open: "6:30 AM", close: "12:30 PM", index: "Shanghai Composite" },
                  { exchange: "Hong Kong Stock Exchange", country: "HK", open: "6:45 AM", close: "1:30 PM", index: "Hang Seng" },
                  { exchange: "National Stock Exchange", country: "IN", open: "9:15 AM", close: "3:30 PM", index: "Nifty 50" },
                  { exchange: "Australian Securities Exchange", country: "AU", open: "4:00 AM", close: "12:30 PM", index: "ASX 200" },
                  { exchange: "London Stock Exchange", country: "UK", open: "2:30 PM", close: "11:00 PM", index: "FTSE 100" },
                  { exchange: "Frankfurt (XETRA)", country: "DE", open: "2:30 PM", close: "11:30 PM", index: "DAX" },
                  { exchange: "NYSE / NASDAQ", country: "US", open: "7:00 PM*", close: "1:30 AM*", index: "S&P 500 / Dow" },
                ].map((row, i) => (
                  <tr key={row.exchange} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ fontSize: "0.65rem", fontWeight: 800, color: "#94a3b8", background: "rgba(255,255,255,0.05)", padding: "2px 5px", borderRadius: "4px" }}>{row.country}</div>
                        <span style={{ fontWeight: 700, color: "#f1f5f9" }}>{row.exchange}</span>
                      </div>
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                       <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                          <span style={{ fontSize: "0.85rem", color: "#10b981", fontWeight: 700 }}>LIVE</span>
                       </div>
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                       <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.95rem", fontFamily: "monospace" }}>
                          <span style={{ color: "#60a5fa", fontWeight: 700 }}>{row.open}</span>
                          <span style={{ color: "#475569" }}>→</span>
                          <span style={{ color: "#f87171", fontWeight: 700 }}>{row.close}</span>
                       </div>
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem", color: "#94a3b8", fontWeight: 600 }}>{row.index}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#475569", marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <Activity size={14} /> * Times adjusted for Daylight Saving (Summer). View local winter adjustments in settings.
          </p>
        </section>
      </div>
    </>
  );
}
