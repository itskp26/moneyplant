import Link from "next/link";
import { TrendingDown, Coins, ChevronLeft } from "lucide-react";
import { fetchCryptoList } from "@/lib/crypto";
import CryptoMoverCard from "@/components/CryptoMoverCard";

export const revalidate = 3600; // 1 hour

export default async function LosersPage() {
  const coins = await fetchCryptoList();
  const losers = [...coins].sort((a, b) => a.change24h - b.change24h);

  return (
    <div className="container section">
      <div style={{ marginBottom: "2.5rem" }}>
        <Link href="/crypto" style={{ 
          display: "inline-flex", alignItems: "center", gap: "6px", 
          color: "#3b82f6", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600,
          marginBottom: "1.5rem" 
        }}>
          <ChevronLeft size={16} /> Back to Hub
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ef4444", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          <TrendingDown size={16} /> Performance Leaderboard
        </div>
        <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Top 24h Losers</h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
          Cryptocurrencies showing the highest price correction in the last 24 hours.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {losers.map((c, i) => (
          <CryptoMoverCard key={c.id} coin={c} up={false} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}
