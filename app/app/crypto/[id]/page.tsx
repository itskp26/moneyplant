import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Activity, DollarSign, BarChart2,
  Info, Globe, Landmark, Coins, Wallet
} from "lucide-react";
import { fetchCryptoDetail } from "@/lib/crypto";
import { getCryptoMeta } from "@/lib/meta";
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
  const coin = await fetchCryptoDetail(id);
  if (!coin) return { title: "Crypto Not Found | MoneyPlant" };

  return getCryptoMeta(
    coin.id,
    coin.name,
    coin.symbol,
    coin.priceInr.toLocaleString("en-IN"),
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
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Cryptocurrency", url: "/crypto" },
        { name: coin.name, url: `/crypto/${coin.id}` },
      ])} />

      <div className="container section">
        {/* Header Section */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "0.85rem", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/crypto" style={{ color: "inherit", textDecoration: "none" }}>Crypto</Link>
            <span>/</span>
            <span style={{ color: "#94a3b8" }}>{coin.name}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coin.image} alt={coin.name} style={{ width: "64px", height: "64px", borderRadius: "50%" }} />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" }}>
                  <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, margin: 0 }}>
                    {coin.name}
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
                    {coin.symbol}
                  </span>
                </div>
                <div style={{ color: "#64748b", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700 }}>
                    Rank #{coin.marketCapRank || "—"}
                  </span>
                  <span>•</span>
                  <span>Global Market</span>
                  <span>•</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Activity size={14} color="#10b981" /> Updated Live
                  </span>
                </div>
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
                ₹{numFmt(coin.priceInr, coin.priceInr < 1 ? 6 : 2)}
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
                <span>({pos ? "+" : ""}{numFmt(coin.change24h)}%)</span>
                <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 400 }}>in 24h</span>
              </div>
              <div style={{ fontSize: "1rem", color: "#64748b", marginTop: "4px" }}>
                ≈ ${numFmt(coin.priceUsd, coin.priceUsd < 1 ? 6 : 2)} USD
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
            {/* Market Stats */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={18} color="#3b82f6" /> {coin.name} Market Stats
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Market Cap</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{numFmt(coin.marketCapInr, 0)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>24h Volume</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>₹{numFmt(coin.volume24hInr, 0)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>All-Time High</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#10b981" }}>₹{numFmt(coin.allTimeHighInr)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>24h Low</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#ef4444" }}>₹{numFmt(coin.low24hInr)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>24h High</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#10b981" }}>₹{numFmt(coin.high24hInr)}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Market Rank</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>#{coin.marketCapRank}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Circ. Supply</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{numFmt(coin.circulatingSupply, 0)} {coin.symbol}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Total Supply</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{numFmt(coin.totalSupply, 0)} {coin.symbol}</div>
                </div>
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
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>Invest in {coin.name} from India</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "500px", margin: "0 auto 2rem" }}>
                Start your crypto journey today. Buy {coin.name} with INR using UPI or Bank Transfer on India's safest exchanges.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <a href="#" className="btn btn-primary">Buy on - </a>
                <a href="#" className="btn btn-outline" style={{ background: "rgba(255,255,255,0.05)" }}>Buy on -</a>
              </div>
            </div>

            {/* Price Conversion Table */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Landmark size={18} color="#8b5cf6" /> {coin.symbol} to INR Conversion
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[1, 5, 10, 50, 100].map(amt => (
                    <div key={amt} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px", fontSize: "0.9rem" }}>
                      <span style={{ color: "#64748b" }}>{amt} {coin.symbol}</span>
                      <span style={{ fontWeight: 700, color: "#e2e8f0" }}>₹{numFmt(amt * coin.priceInr)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[100, 1000, 10000, 50000, 100000].map(amt => (
                    <div key={amt} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.3)", paddingBottom: "8px", fontSize: "0.9rem" }}>
                      <span style={{ color: "#64748b" }}>₹{amt.toLocaleString()}</span>
                      <span style={{ fontWeight: 700, color: "#e2e8f0" }}>{numFmt(amt / coin.priceInr, 6)} {coin.symbol}</span>
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
