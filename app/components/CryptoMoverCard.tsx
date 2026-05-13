"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Coins } from "lucide-react";

interface CryptoMoverCardProps {
  coin: any;
  up: boolean;
  delay: number;
}

export default function CryptoMoverCard({ coin, up, delay }: CryptoMoverCardProps) {
  const color = up ? "#10b981" : "#ef4444";
  const numFmt = (n: number | undefined, d = 2) => 
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Link href={`/crypto/${coin.id}`} style={{ textDecoration: "none" }}>
        <div style={{
          padding: "1.5rem",
          background: "rgba(15, 23, 42, 0.5)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: `1px solid ${color}33`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5), 0 0 15px ${color}11`
        }}>
          {/* Accent border top */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ 
                width: "36px", height: "36px", 
                borderRadius: "10px", 
                background: `${color}15`, 
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${color}33`
              }}>
                <Coins size={20} color={color} />
              </div>
              <div>
                <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.01em" }}>
                  {coin.symbol.toUpperCase()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                  {coin.name}
                </div>
              </div>
            </div>
            <div style={{
              fontSize: "0.8rem", fontWeight: 800, color: color,
              padding: "4px 10px", borderRadius: "8px", background: `${color}15`,
              border: `1px solid ${color}22`
            }}>
              {up ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.7rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
              Price in USD
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f8fafc", fontFamily: "monospace", letterSpacing: "-0.02em" }}>
              ${numFmt(coin.priceUsd)}
            </div>
          </div>

          {/* Visual touch: tiny market cap indicator */}
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
             <div style={{ fontSize: "0.65rem", color: "#475569", fontWeight: 600 }}>GLOBAL MARKET DATA</div>
             <div style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 800 }}>LIVE</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
