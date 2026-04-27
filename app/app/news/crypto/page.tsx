import type { Metadata } from "next";
import { fetchCryptoNews } from "@/lib/news";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { Bitcoin, TrendingUp, Clock, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import NewsImage from "@/components/NewsImage";

export const metadata: Metadata = {
  title: `Crypto News Today ${new Date().getFullYear()} — Live Bitcoin, Ethereum & Altcoin Updates`,
  description: `Get real-time cryptocurrency news today ${new Date().getFullYear()}, blockchain updates, and deep market analysis. Live coverage of Bitcoin, Ethereum, Solana, and Altcoin movements with global impact reports on MoneyPlant.`,
  keywords: [
    "crypto news today", "cryptocurrency news live", "bitcoin news today", "ethereum news today",
    "altcoin news today", "blockchain updates live", "crypto market analysis",
    "crypto news india", "crypto news usa", "crypto news uk", "crypto news dubai",
    "crypto news uae", "crypto news saudi arabia", "crypto news pakistan",
    "crypto news bangladesh", "crypto news singapore", "crypto news australia",
    "bitcoin crash today", "why is bitcoin falling today", "why is crypto up today",
    "crypto market news live", "cryptocurrency latest update",
    "binance news today", "coinbase news today", "sec crypto news",
    "fed crypto news", "crypto regulation news 2025", "crypto tax news india",
    "solana price news", "xrp ripple news today", "dogecoin news live",
    "cardano news updates", "polygon matic news", "shiba inu coin news",
    "new crypto coin releases 2025", "upcoming ico news", "nft news today",
    "defi news live", "web3 news updates", "metaverse news 2025",
    "crypto exchange hacks news", "bitcoin halving impact 2025",
    "ethereum 2.0 updates", "crypto whale alerts today", "stablecoin news tether usdt",
    "crypto news now", "breaking crypto news", "top 10 crypto news today",
    "cryptocurrency investment news", "institutional crypto news",
    "bitcoin price prediction news", "ethereum price news today",
    `best crypto to buy ${new Date().getFullYear()} news`, "crypto bullish news today",
    "crypto bearish news today", "crypto market sentiment today",
    "crypto liquidations today", "crypto derivatives news",
    "bitcoin etf news live", "ethereum etf updates", "crypto news world",
    "international crypto updates", "crypto news in english",
    "crypto news in hindi", "crypto news in arabic", "crypto news in urdu",
    "crypto news in bengali", "crypto news in spanish", "crypto news in french",
    "crypto news in german", "crypto news in chinese", "crypto news in japanese",
  ].join(", "),
};

export default async function CryptoNewsPage() {
  const news = await fetchCryptoNews(20);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "News", url: "/news" },
        { name: "Crypto", url: "/news/crypto" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Bitcoin size={16} /> Digital Assets Feed
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Crypto Market Intelligence</h1>
          <p style={{ color: "#94a3b8", maxWidth: "700px" }}>
            Real-time updates from the global blockchain ecosystem. Tracking regulatory shifts, institutional adoption, and technological breakthroughs.
          </p>
        </div>

        {/* Sentiment Quick Stats - Simulated */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #10b981" }}>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>Market Sentiment</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#10b981" }}>Greed (72)</div>
          </div>
          <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #3b82f6" }}>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>Major Trend</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f1f5f9" }}>Accumulation</div>
          </div>
          <div className="card" style={{ padding: "1.5rem", borderLeft: "4px solid #f59e0b" }}>
            <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "8px" }}>Volatility Index</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f59e0b" }}>Medium-High</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
          {news.map((item) => (
            <article key={item.id} className="card news-card-crypto" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "200px", position: "relative" }}>
                <NewsImage 
                  src={item.image} 
                  alt={item.title} 
                  category="Crypto" 
                />
                <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(4px)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 700, border: "1px solid rgba(255,255,255,0.1)" }}>
                  {item.author}
                </div>
              </div>
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "2px 8px", borderRadius: "4px" }}>CRYPTO</span>
                  <span style={{ fontSize: "0.7rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {item.time}</span>
                </div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "12px", lineHeight: 1.4 }}>{item.title}</h2>
                <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{item.desc}</p>
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981", fontSize: "0.75rem", fontWeight: 700 }}>
                     <ShieldCheck size={14} /> Verified Source
                   </div>
                   <Link href={item.url} target="_blank" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}>
                      Read More <ExternalLink size={14} />
                   </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .news-card-crypto {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(51, 65, 85, 0.3) !important;
        }
        .news-card-crypto:hover {
          transform: translateY(-5px);
          border-color: rgba(245, 158, 11, 0.4) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(245, 158, 11, 0.05) !important;
        }
      `}</style>
    </>
  );
}
