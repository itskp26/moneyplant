"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, BarChart2, Globe, Coins, 
  DollarSign, Gem, Search, Bell, User, Zap, ArrowRight, Newspaper, 
  Wallet, PieChart, ShieldCheck
} from "lucide-react";
import { MiniChart } from "./VisualCards";

interface MobileHomeProps {
  data: any; // Passing the same data from page.tsx
}

export default function MobileHome({ data }: MobileHomeProps) {
  const { nifty50, cryptos, forex } = data;
  const [activeTab, setActiveTab] = useState("Stocks");

  const categories = [
    { name: "Stocks", icon: <BarChart2 size={20} />, color: "#3b82f6" },
    { name: "Crypto", icon: <Coins size={20} />, color: "#f59e0b" },
    { name: "Forex", icon: <DollarSign size={20} />, color: "#10b981" },
    { name: "IPO", icon: <Zap size={20} />, color: "#8b5cf6" },
  ];

  const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 1 });

  return (
    <div className="mobile-app-shell" style={{ paddingBottom: "90px", color: "#f8fafc" }}>
      {/* 1. Slim App Header */}
      <header style={{
        padding: "1rem 1.25rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(2, 8, 23, 0.8)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(51, 65, 85, 0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
           <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #10b981, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={20} color="white" />
           </div>
           <span style={{ fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>MoneyPlant</span>
        </div>
        <div style={{ display: "flex", gap: "15px", color: "#94a3b8" }}>
          <Search size={22} />
          <Bell size={22} />
          <User size={22} />
        </div>
      </header>

      {/* 2. Top Indices Ribbon */}
      <div style={{ 
        overflowX: "auto", 
        display: "flex", 
        gap: "12px", 
        padding: "1.25rem",
        scrollbarWidth: "none"
      }} className="no-scrollbar">
        {nifty50.map((idx: any) => (
          <div key={idx.symbol} style={{
            minWidth: "150px",
            padding: "1rem",
            background: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(51, 65, 85, 0.4)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px"
          }}>
            <span style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase" }}>{idx.name.replace("NIFTY ", "")}</span>
            <span style={{ fontSize: "1.1rem", fontWeight: 900 }}>{fmt(idx.price)}</span>
            <span style={{ fontSize: "0.75rem", color: idx.changePercent >= 0 ? "#10b981" : "#ef4444", fontWeight: 700 }}>
              {idx.changePercent >= 0 ? "+" : ""}{idx.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      {/* 3. Hero Action Card */}
      <div style={{ padding: "0 1.25rem" }}>
        <div style={{
          padding: "1.5rem",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
        }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: "0.5rem" }}>Market is Greed 🐂</h2>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1.25rem" }}>Indices are hitting record highs. It's a great time to review your portfolio.</p>
            <Link href="/markets/india" style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "0.6rem 1.2rem", background: "#10b981", color: "white",
              borderRadius: "10px", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none"
            }}>
              Go to Markets <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.1 }}>
            <TrendingUp size={120} color="#10b981" />
          </div>
        </div>
      </div>

      {/* 4. Category Ribbon */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "2rem 1.25rem 1.5rem" }}>
        {categories.map((cat) => (
          <div key={cat.name} onClick={() => setActiveTab(cat.name)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer"
          }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "18px",
              background: activeTab === cat.name ? cat.color : "rgba(30, 41, 59, 0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: activeTab === cat.name ? "white" : "#64748b",
              transition: "all 0.3s ease",
              boxShadow: activeTab === cat.name ? `0 8px 20px -4px ${cat.color}66` : "none"
            }}>
              {cat.icon}
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: activeTab === cat.name ? "#f1f5f9" : "#64748b" }}>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* 5. Live Asset List (Modern Rows) */}
      <div style={{ padding: "0 1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 900 }}>Top {activeTab}</h3>
          <Link href="/markets" style={{ fontSize: "0.8rem", color: "#3b82f6", fontWeight: 700, textDecoration: "none" }}>See All</Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {(activeTab === "Stocks" ? nifty50 : cryptos.slice(0, 5)).map((item: any, i: number) => {
            const up = (item.changePercent ?? item.change24h) >= 0;
            const color = up ? "#10b981" : "#ef4444";
            return (
              <motion.div 
                key={item.id || item.symbol}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  padding: "1rem",
                  background: "rgba(15, 23, 42, 0.4)",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(51, 65, 85, 0.2)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(30, 41, 59, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                    {activeTab === "Stocks" ? "📈" : "₿"}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f1f5f9" }}>{item.symbol.replace(".NS", "")}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{item.name || item.symbol}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "12px" }}>
                   <div className="hidden-tiny">
                      <MiniChart color={color} up={up} />
                   </div>
                   <div>
                      <div style={{ fontSize: "1rem", fontWeight: 900, color: "#f1f5f9" }}>₹{fmt(item.price || item.priceInr)}</div>
                      <div style={{ fontSize: "0.75rem", color: color, fontWeight: 700 }}>
                        {up ? "+" : ""}{(item.changePercent ?? item.change24h).toFixed(2)}%
                      </div>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 380px) {
          .hidden-tiny { display: none; }
        }
      `}</style>
    </div>
  );
}
