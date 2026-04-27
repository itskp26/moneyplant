"use client";
import { type Quote } from "@/lib/stocks";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  quotes: Quote[];
  title?: string;
  linkPrefix?: string;
  showRank?: boolean;
}

function fmt(price: number, symbol?: string) {
  // Forex / small prices
  if (price < 10) return price.toFixed(4);
  if (price < 100) return price.toFixed(2);
  return price.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function fmtMcap(v?: number) {
  if (!v) return "—";
  if (v >= 1e12) return `₹${(v / 1e12).toFixed(2)}L Cr`;
  if (v >= 1e9) return `₹${(v / 1e9).toFixed(2)} Cr`;
  return `₹${(v / 1e6).toFixed(0)} L`;
}

function fmtVol(v: number) {
  if (v >= 1e7) return `${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `${(v / 1e5).toFixed(2)} L`;
  return v.toLocaleString("en-IN");
}

export default function MarketTable({ quotes, title, linkPrefix = "/stocks", showRank = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card"
      style={{
        overflow: "hidden",
        borderRadius: "16px",
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(51, 65, 85, 0.5)",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      {title && (
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(51,65,85,0.4)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(to right, rgba(16,185,129,0.05), transparent)",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {title}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", animation: "pulse-green 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Live Terminal</span>
          </div>
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table className="data-table" style={{ borderCollapse: "separate", borderSpacing: "0" }}>
          <thead>
            <tr style={{ background: "rgba(30, 41, 59, 0.5)" }}>
              {showRank && <th style={{ width: "60px", padding: "1rem" }}>#</th>}
              <th style={{ padding: "1rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>Symbol</th>
              <th style={{ padding: "1rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b" }}>Company</th>
              <th style={{ padding: "1rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", textAlign: "right" }}>Price (₹)</th>
              <th style={{ padding: "1rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", textAlign: "right" }}>Change</th>
              <th style={{ padding: "1rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", textAlign: "right" }}>% Change</th>
              <th style={{ padding: "1rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", textAlign: "right", minWidth: "120px" }}>Market Cap</th>
              <th style={{ padding: "1rem", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", textAlign: "right", minWidth: "110px" }}>Volume</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q, idx) => {
              const pos = q.changePercent > 0;
              const neg = q.changePercent < 0;
              const symbol = q.symbol.replace(/\.NS$|\.BO$/i, "");
              return (
                <motion.tr
                  key={q.symbol}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ background: "rgba(51, 65, 85, 0.3)", x: 4 }}
                  style={{ transition: "background 0.2s, transform 0.2s", borderBottom: "1px solid rgba(51, 65, 85, 0.2)" }}
                >
                  {showRank && (
                    <td style={{ color: "#475569", fontSize: "0.75rem", fontWeight: 600, padding: "1rem" }}>{idx + 1}</td>
                  )}
                  <td style={{ padding: "1rem" }}>
                    <Link
                      href={`${linkPrefix}/${symbol.toLowerCase()}`}
                      style={{
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        color: "#3b82f6",
                        textDecoration: "none",
                        fontFamily: "var(--font-sora)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      {symbol}
                    </Link>
                  </td>
                  <td style={{ padding: "1rem", color: "#94a3b8", fontSize: "0.82rem", fontWeight: 500, maxWidth: "220px" }}>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                      {q.name ?? symbol}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right", fontWeight: 800, color: "#f8fafc", fontSize: "0.95rem", fontFamily: "monospace" }}>
                    {fmt(q.price)}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <span style={{ color: pos ? "#10b981" : neg ? "#ef4444" : "#94a3b8", fontWeight: 700, fontSize: "0.82rem", fontFamily: "monospace" }}>
                      {pos ? "▲" : neg ? "▼" : ""} {Math.abs(q.change).toFixed(2)}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: pos ? "rgba(16, 185, 129, 0.1)" : neg ? "rgba(239, 68, 68, 0.1)" : "rgba(148, 163, 184, 0.1)",
                        color: pos ? "#10b981" : neg ? "#ef4444" : "#94a3b8",
                        border: `1px solid ${pos ? "rgba(16, 185, 129, 0.2)" : neg ? "rgba(239, 68, 68, 0.2)" : "rgba(148, 163, 184, 0.2)"}`,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontFamily: "monospace",
                      }}
                    >
                      {pos ? <TrendingUp size={12} /> : neg ? <TrendingDown size={12} /> : <Minus size={12} />}
                      {pos ? "+" : ""}{q.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right", color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>
                    {fmtMcap(q.marketCap)}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right", color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>
                    {fmtVol(q.volume)}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {quotes.length === 0 && (
          <div style={{ padding: "4rem", textAlign: "center", color: "#334155", background: "rgba(15, 23, 42, 0.2)" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Terminal Offline</div>
            <div style={{ fontSize: "0.85rem", opacity: 0.6 }}>Market may be closed or data is currently unavailable.</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}


