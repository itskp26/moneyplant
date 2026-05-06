"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Item {
  id: string;
  name: string;
  symbol: string;
  value: string;
  changePercent?: number;
  image?: string;
  href: string;
}

interface Props {
  title: string;
  icon: ReactNode;
  items: Item[];
  viewAllHref: string;
  shuffle?: boolean;
}

export default function DashboardSidebarCard({ title, icon, items, viewAllHref, shuffle = false }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!shuffle || items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [shuffle, items.length]);

  const displayItems = shuffle ? [items[index]] : items;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-card"
      style={{
        overflow: "hidden",
        borderRadius: "16px",
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(51, 65, 85, 0.4)",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid rgba(51, 65, 85, 0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to right, rgba(16,185,129,0.03), transparent)",
        }}
      >
        <h3
          style={{
            fontSize: "0.95rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            color: "#f8fafc",
            letterSpacing: "-0.01em",
          }}
        >
          {icon}
          {title}
        </h3>
        <Link
          href={viewAllHref}
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#3b82f6",
            textDecoration: "none",
            background: "rgba(59, 130, 246, 0.1)",
            padding: "4px 10px",
            borderRadius: "6px",
            transition: "all 0.2s",
          }}
          className="hover-bright"
        >
          View all
        </Link>
      </div>
      <div style={{ position: "relative", minHeight: shuffle ? "110px" : "auto" }}>
        <AnimatePresence mode="wait">
          {displayItems.map((item, idx) => {
            const hasChange = item.changePercent !== undefined;
            const pos = (item.changePercent ?? 0) >= 0;
            
            return (
              <motion.div
                key={shuffle ? index : item.id}
                initial={{ opacity: 0, x: shuffle ? 20 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  delay: shuffle ? 0 : idx * 0.05,
                  duration: shuffle ? 0.5 : 0.3
                }}
                viewport={{ once: true }}
                style={shuffle ? { position: "absolute", top: 0, left: 0, right: 0 } : {}}
              >
              <Link
                href={item.href}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: hasChange ? "center" : "flex-start",
                  padding: "1rem 1.25rem",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(51, 65, 85, 0.15)",
                  transition: "all 0.2s",
                }}
                className="sidebar-row-hover"
              >
                {/* Icon/Image Section */}
                <div style={{ flexShrink: 0, marginTop: hasChange ? 0 : "4px" }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      width={32}
                      height={32}
                      style={{ borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(59, 130, 246, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        color: "#3b82f6",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      {item.symbol.substring(0, 2)}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {!hasChange ? (
                    /* NEWS LAYOUT (Vertical Stack) */
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ 
                        fontSize: "0.9rem", 
                        fontWeight: 700, 
                        color: "#f1f5f9", 
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {item.value}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.7rem", fontWeight: 600 }}>
                        <span style={{ color: "#3b82f6", textTransform: "uppercase" }}>{item.symbol}</span>
                        <span style={{ color: "#334155" }}>•</span>
                        <span style={{ color: "#64748b" }}>{item.name}</span>
                      </div>
                    </div>
                  ) : (
                    /* STOCK LAYOUT (Side-by-Side) */
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.symbol}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.name}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f8fafc", fontFamily: "monospace" }}>
                          {item.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: pos ? "#10b981" : "#ef4444",
                            fontFamily: "monospace",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "2px",
                          }}
                        >
                          {pos ? "▲" : "▼"}{Math.abs(item.changePercent ?? 0).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
      <style jsx global>{`
        .sidebar-row-hover:hover {
          background: rgba(51, 65, 85, 0.3);
          padding-left: 1.5rem !important;
        }
        .hover-bright:hover {
          background: rgba(59, 130, 246, 0.2) !important;
          color: #60a5fa !important;
        }
      `}</style>
    </motion.div>
  );
}
