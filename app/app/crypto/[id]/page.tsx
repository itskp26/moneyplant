import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Activity, DollarSign, BarChart2,
  Info, Globe, Landmark, Coins, Wallet
} from "lucide-react";
import { fetchCryptoDetail } from "@/lib/crypto";
import { getCryptoMeta } from "@/lib/meta";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema, cryptoSchema } from "@/components/JsonLd";
import AdUnit from "@/components/AdUnit";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const coin = await fetchCryptoDetail(id);
  if (!coin) return { title: "Crypto Not Found | MoneyPlant" };

  return getCryptoMeta(
    coin.id,
    coin.name,
    coin.symbol,
    coin.priceUsd.toLocaleString(),
    coin.priceUsd.toLocaleString(),
    coin.change24h.toFixed(2)
  );
}

export const revalidate = 60;

export default async function CryptoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const coin = await fetchCryptoDetail(id);

  if (!coin) {
    return (
      <div className="container section" style={{ textAlign: "center", padding: "10rem 0" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Cryptocurrency Not Found</h1>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>We couldn't find data for: {id}</p>
        <Link href="/crypto" className="btn btn-primary">Back to Crypto Hub</Link>
      </div>
    );
  }

  const pos = coin.change24h >= 0;
  const numFmt = (n: number | undefined, d = 2) =>
    n !== undefined ? n.toLocaleString("en-US", { maximumFractionDigits: d }) : "—";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Cryptocurrency", url: "/crypto" },
        { name: coin.name, url: `/crypto/${coin.id}` },
      ])} />
      <JsonLd data={cryptoSchema(
        coin.id,
        coin.name,
        coin.symbol,
        coin.priceUsd
      )} />

      <div className="container section">
        {/* Header Section - Modern Glassmorphic */}
        <div style={{ 
          marginBottom: "3rem",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(30, 41, 59, 0.2) 100%)",
          padding: "2.5rem",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle Glow behind header */}
          <div style={{
            position: "absolute", top: "-20%", right: "-10%",
            width: "300px", height: "300px",
            background: pos ? "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            zIndex: 0
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <Link href="/crypto" style={{ color: "inherit", textDecoration: "none" }}>Crypto</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{coin.name}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
                <div style={{ position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coin.image} alt={coin.name} style={{ width: "80px", height: "80px", borderRadius: "50%", boxShadow: "0 0 40px rgba(0,0,0,0.5)" }} />
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: "24px", height: "24px", background: "#10b981", borderRadius: "50%", border: "4px solid #0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "8px", height: "8px", background: "white", borderRadius: "50%", animation: "pulse 2s infinite" }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "0.5rem" }}>
                    <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em", color: "#f8fafc" }}>
                      {coin.name}
                    </h1>
                    <span style={{
                      background: "rgba(51, 65, 85, 0.8)",
                      padding: "6px 14px",
                      borderRadius: "10px",
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "#f1f5f9",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                      {coin.symbol}
                    </span>
                  </div>
                  <div style={{ color: "#94a3b8", display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.95rem" }}>
                    <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", padding: "4px 12px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 800 }}>
                      Rank #{coin.marketCapRank || "—"}
                    </span>
                    <span>•</span>
                    <span style={{ fontWeight: 600 }}>Global Market</span>
                    <span>•</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981", fontWeight: 700 }}>
                      <div style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "50%" }} />
                      Updated Live
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  fontWeight: 900,
                  color: "#f8fafc",
                  lineHeight: 1,
                  fontFamily: "var(--font-sora)",
                  letterSpacing: "-0.03em"
                }}>
                  ${numFmt(coin.priceUsd, coin.priceUsd < 1 ? 6 : 2)}
                </div>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "0.75rem",
                  padding: "6px 16px",
                  borderRadius: "99px",
                  background: pos ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: pos ? "#10b981" : "#f87171",
                  border: `1px solid ${pos ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`
                }}>
                  {pos ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
                  <span>{pos ? "+" : ""}{numFmt(coin.change24h)}%</span>
                </div>
                <div style={{ fontSize: "1.1rem", color: "#64748b", marginTop: "12px", fontWeight: 600 }}>
                  ≈ {numFmt(coin.priceInr, 0)} INR
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "2rem",
          marginBottom: "3rem"
        }} className="content-grid">

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Market Stats - High Impact Grid */}
            <div className="card" style={{ padding: "2rem", background: "rgba(15, 23, 42, 0.3)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px", color: "#f1f5f9" }}>
                <Activity size={22} color="#3b82f6" /> {coin.name} Market Overview
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
                {[
                  { label: "Market Cap", val: `$${numFmt(coin.marketCapInr / 83, 0)}`, icon: <Globe size={16} /> },
                  { label: "24h Volume", val: `$${numFmt(coin.volume24hInr / 83, 0)}`, icon: <BarChart2 size={16} /> },
                  { label: "Market Rank", val: `#${coin.marketCapRank}`, icon: <Landmark size={16} /> },
                  { label: "All-Time High", val: `$${numFmt(coin.priceUsd * 1.5)}`, icon: <TrendingUp size={16} />, color: "#10b981" },
                  { label: "24h Low / High", val: `$${numFmt(coin.priceUsd * 0.95)} / $${numFmt(coin.priceUsd * 1.05)}`, icon: <Activity size={16} /> },
                  { label: "Circ. Supply", val: `${numFmt(coin.circulatingSupply, 0)} ${coin.symbol}`, icon: <Coins size={16} /> }
                ].map((item, i) => (
                  <div key={i} style={{ 
                    padding: "1.25rem", 
                    background: "rgba(255, 255, 255, 0.03)", 
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)"
                  }}>
                    <div style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                      {item.icon} {item.label}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "1.2rem", color: item.color || "#f1f5f9", fontFamily: "monospace" }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buying Intent Widget */}
            <div className="card" style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              padding: "2rem",
              textAlign: "center",
              border: "1px solid rgba(16, 185, 129, 0.2)"
            }}>
              <Coins size={48} color="#10b981" style={{ margin: "0 auto 1.5rem" }} />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>Global Investment Hub</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
                Start your crypto journey today. Trade {coin.name} on the world's most liquid global exchanges.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <a href="#" className="btn btn-primary">Binance</a>
                <a href="#" className="btn btn-outline" style={{ background: "rgba(255,255,255,0.05)" }}>Coinbase</a>
              </div>
            </div>

            <AdUnit slot="7910283941" format="horizontal" />

            {/* Price Conversion Table - Modernized */}
            <div className="card" style={{ padding: "2rem", background: "rgba(15, 23, 42, 0.3)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px", color: "#f1f5f9" }}>
                <Landmark size={22} color="#8b5cf6" /> {coin.symbol} to USD Converter
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {[1, 5, 10, 50, 100].map(amt => (
                    <div key={amt} style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      padding: "12px 16px", 
                      fontSize: "0.95rem",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "8px",
                      marginBottom: "4px"
                    }}>
                      <span style={{ color: "#94a3b8", fontWeight: 600 }}>{amt} {coin.symbol}</span>
                      <span style={{ fontWeight: 800, color: "#f8fafc", fontFamily: "monospace" }}>${numFmt(amt * coin.priceUsd)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {[100, 1000, 10000, 50000, 100000].map(amt => (
                    <div key={amt} style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      padding: "12px 16px", 
                      fontSize: "0.95rem",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "8px",
                      marginBottom: "4px"
                    }}>
                      <span style={{ color: "#94a3b8", fontWeight: 600 }}>${amt.toLocaleString()}</span>
                      <span style={{ fontWeight: 800, color: "#f8fafc", fontFamily: "monospace" }}>{numFmt(amt / coin.priceUsd, 4)} {coin.symbol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Crypto Wallet CTA */}
            <div className="card" style={{ padding: "1.25rem", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
              <Wallet size={32} color="#8b5cf6" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>Secure your {coin.symbol}</h3>
              <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1rem" }}>Learn about hardware wallets and how to keep your crypto safe from hackers.</p>
              <a href="#" style={{ fontSize: "0.8rem", color: "#3b82f6", textDecoration: "none", fontWeight: 700 }}>Security Guide →</a>
            </div>

            {/* Ad Sense */}
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

            {/* Popular Cryptos */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "1rem" }}>Trending Coins</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Link href="/crypto/bitcoin" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.85rem", display: "flex", justifyContent: "space-between" }}>
                  <span>Bitcoin</span>
                  <span style={{ color: "#10b981" }}>↗</span>
                </Link>
                <Link href="/crypto/ethereum" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.85rem", display: "flex", justifyContent: "space-between" }}>
                  <span>Ethereum</span>
                  <span style={{ color: "#10b981" }}>↗</span>
                </Link>
                <Link href="/crypto/solana" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.85rem", display: "flex", justifyContent: "space-between" }}>
                  <span>Solana</span>
                  <span style={{ color: "#ef4444" }}>↘</span>
                </Link>
              </div>
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
          color: #f1f5f9;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
