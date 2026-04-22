import { type CryptoQuote } from "@/lib/crypto";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  coins: CryptoQuote[];
  title?: string;
}

function fmt(price: number) {
  if (price < 0.01) return price.toFixed(8);
  if (price < 1) return price.toFixed(4);
  if (price < 100) return price.toFixed(2);
  return price.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function fmtMcap(v?: number) {
  if (!v) return "—";
  if (v >= 1e12) return `₹${(v / 1e12).toFixed(2)}L Cr`;
  if (v >= 1e9) return `₹${(v / 1e9).toFixed(2)} Cr`;
  return `₹${(v / 1e6).toFixed(0)} L`;
}

export default function CryptoTable({ coins, title }: Props) {
  return (
    <div style={{ 
      background: "rgba(15, 23, 42, 0.4)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(51, 65, 85, 0.4)",
      borderRadius: "20px",
      overflow: "hidden" 
    }}>
      {title && (
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(51,65,85,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#f1f5f9", margin: 0 }}>{title}</h3>
          <span style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>Live CoinGecko Data</span>
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "50px", paddingLeft: "1.5rem" }}>#</th>
              <th>Coin</th>
              <th style={{ textAlign: "right" }}>Price (₹)</th>
              <th style={{ textAlign: "right" }}>24h Change</th>
              <th style={{ textAlign: "right", minWidth: "140px" }}>Market Cap</th>
              <th style={{ textAlign: "right", minWidth: "140px", paddingRight: "1.5rem" }}>Volume (24h)</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((c) => {
              const pos = c.change24h > 0;
              const neg = c.change24h < 0;
              return (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(51, 65, 85, 0.2)" }}>
                  <td style={{ color: "#475569", fontSize: "0.8rem", paddingLeft: "1.5rem", fontWeight: 700 }}>{c.marketCapRank}</td>
                  <td>
                    <Link href={`/crypto/${c.id}`} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", padding: "0.5rem 0" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.image} alt={c.name} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)" }} />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                         <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#f8fafc" }}>{c.symbol.toUpperCase()}</span>
                         <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}>{c.name}</span>
                      </div>
                    </Link>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 900, color: "#f1f5f9", fontSize: "1rem", fontFamily: "monospace" }}>
                    ₹{fmt(c.priceInr)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "4px", 
                      color: pos ? "#10b981" : neg ? "#ef4444" : "#94a3b8",
                      fontWeight: 800,
                      fontSize: "0.9rem"
                    }}>
                      {pos ? "▲" : neg ? "▼" : ""}
                      {Math.abs(c.change24h).toFixed(2)}%
                    </div>
                  </td>
                  <td style={{ textAlign: "right", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600 }}>
                    {fmtMcap(c.marketCapInr)}
                  </td>
                  <td style={{ textAlign: "right", color: "#64748b", fontSize: "0.85rem", fontWeight: 600, paddingRight: "1.5rem" }}>
                    {fmtMcap(c.volume24hInr)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
