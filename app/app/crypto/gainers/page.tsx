import Link from "next/link";
import { TrendingUp, Coins, ChevronLeft } from "lucide-react";
import { fetchCryptoList } from "@/lib/crypto";
import CryptoMoverCard from "@/components/CryptoMoverCard";

export const revalidate = 60;

export default async function GainersPage() {
  const coins = await fetchCryptoList();
  const gainers = [...coins].sort((a, b) => b.change24h - a.change24h);

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
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#10b981", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          <TrendingUp size={16} /> Performance Leaderboard
        </div>
        <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Top 24h Gainers</h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
          Cryptocurrencies showing the highest price appreciation in the last 24 hours.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {gainers.map((c, i) => (
          <CryptoMoverCard key={c.id} coin={c} up={true} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}
