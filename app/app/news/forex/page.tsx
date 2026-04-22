import type { Metadata } from "next";
import { fetchForexNews } from "@/lib/news";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { RefreshCw, TrendingUp, Clock, Globe, Zap, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Forex News Today ${new Date().getFullYear()} — Live Currency Rates, Fed Policy & Global Updates | MoneyPlant`,
  description: `Stay updated with real-time USD/INR, EUR/USD, and global currency market news today ${new Date().getFullYear()}. Comprehensive coverage of central bank policies, inflation data, and forex trends on MoneyPlant.`,
  keywords: [
    "forex news today", "forex market news live", "currency news today", "fx news updates",
    "dollar rate news today", "usd inr news live", "eur usd news today", "gbp usd news",
    "forex news india", "forex news usa today", "forex news uk", "forex news europe",
    "forex news dubai", "forex news uae", "forex news saudi arabia", "forex news qatar",
    "forex news kuwait", "forex news pakistan", "forex news bangladesh",
    "forex news singapore", "forex news australia", "forex news canada",
    "fed interest rate news today", "rbi policy news today", "ecb news live",
    "bank of england news today", "boj news japan", "central bank news worldwide",
    "dollar strength today news", "why is dollar rising today", "dollar crash news",
    "rupee vs dollar news today", "euro vs dollar latest news",
    "best time to buy dollars today", "nri money transfer news",
    "remittance rate news today", "wise exchange rate news",
    "western union exchange rate news", "paypal forex rate today",
    "forex trading news live", "currency war news 2025", "global inflation news",
    "us cpi news today", "non farm payroll news nfp today", "fomc news live",
    "forex market hours today news", "global market sentiment forex",
    "forex technical analysis news", "forex fundamental news today",
    "dxy dollar index news today", "oil price news live today",
    "commodity news forex impact", "gold price impact on forex today",
    "emerging market currency news", "exotic currency pairs news today",
    "forex outlook 2025", "forex forecast 2026", "currency prediction news",
    "forex volatility news today", "safe haven currency news",
    "forex news live stream", "forex news calendar today",
    "important forex news today", "breaking forex news world",
    "forex news in english", "forex news india time", "forex ist updates",
  ].join(", "),
};

export default async function ForexNewsPage() {
  const news = await fetchForexNews();

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "News", url: "/news" },
        { name: "Forex", url: "/news/forex" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#3b82f6", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <RefreshCw size={16} /> Currency Intelligence
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Forex Trading News</h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px" }}>
            Breaking updates on global currency pairs, central bank policies, and macroeconomic shifts impacting the Indian Rupee and major world currencies.
          </p>
        </div>

        {/* Live Pairs Ticker Simulation */}
        <div style={{ 
          background: "rgba(30, 41, 59, 0.4)", 
          border: "1px solid rgba(51, 65, 85, 0.5)", 
          borderRadius: "12px", 
          padding: "1rem", 
          marginBottom: "3rem",
          display: "flex",
          gap: "2rem",
          overflowX: "auto",
          whiteSpace: "nowrap"
        }}>
           {[
             { pair: "USD/INR", price: "83.42", change: "+0.05%" },
             { pair: "EUR/USD", price: "1.0852", change: "-0.12%" },
             { pair: "GBP/USD", price: "1.2644", change: "+0.08%" },
             { pair: "USD/JPY", price: "151.65", change: "+0.22%" },
             { pair: "AUD/USD", price: "0.6534", change: "-0.04%" },
           ].map(p => (
             <div key={p.pair} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontWeight: 800, color: "#f1f5f9", fontSize: "0.85rem" }}>{p.pair}</span>
                <span style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>{p.price}</span>
                <span style={{ color: p.change.startsWith("+") ? "#10b981" : "#ef4444", fontSize: "0.75rem", fontWeight: 700 }}>{p.change}</span>
             </div>
           ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "3rem" }} className="forex-layout">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
             {news.map((item) => (
               <article key={item.id} className="card forex-news-card" style={{ padding: "1.5rem", borderLeft: "4px solid #3b82f6" }}>
                 <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#3b82f6", textTransform: "uppercase" }}>{item.category}</span>
                        <span style={{ fontSize: "0.75rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {item.time}</span>
                      </div>
                      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "12px", lineHeight: 1.4 }}>{item.title}</h2>
                      <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{item.desc}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.8rem", color: "#475569" }}>Source: {item.author}</span>
                        <Link href={item.url} style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem" }}>Full Analysis &rarr;</Link>
                      </div>
                    </div>
                 </div>
               </article>
             ))}
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
             <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                   <Globe size={18} color="#3b82f6" /> Global Events
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                   {[
                     { event: "US CPI Release", day: "Tuesday", impact: "High" },
                     { event: "BoE Interest Rate", day: "Thursday", impact: "High" },
                     { event: "India Forex Reserves", day: "Friday", impact: "Medium" },
                   ].map(e => (
                     <div key={e.event} style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(51, 65, 85, 0.3)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                           <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f1f5f9" }}>{e.event}</span>
                           <span style={{ background: e.impact === "High" ? "rgba(239, 68, 68, 0.1)" : "rgba(245, 158, 11, 0.1)", color: e.impact === "High" ? "#ef4444" : "#f59e0b", fontSize: "0.65rem", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>{e.impact}</span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{e.day}, 18:30 IST</div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="card" style={{ 
               padding: "1.5rem", 
               background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)",
               border: "1px solid rgba(59, 130, 246, 0.3)"
             }}>
                <Zap size={24} color="#3b82f6" style={{ marginBottom: "1rem" }} />
                <h4 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.5rem" }}>Real-time Alerts</h4>
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "1.25rem" }}>Get instant notifications for major price breakouts in USD/INR and Gold.</p>
                <button className="btn btn-primary" style={{ width: "100%", fontSize: "0.8rem", background: "#3b82f6" }}>Enable Alerts</button>
             </div>
          </aside>
        </div>
      </div>

      <style>{`
        .forex-news-card {
           transition: all 0.2s;
           background: rgba(15, 23, 42, 0.4) !important;
        }
        .forex-news-card:hover {
           background: rgba(30, 41, 59, 0.4) !important;
           transform: translateX(4px);
        }
        @media (max-width: 1024px) {
           .forex-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
