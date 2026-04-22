"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Item {
  id: string;
  name: string;
  symbol: string;
  value: string;
  changePercent: number;
  image?: string;
  href: string;
}

interface Props {
  title: string;
  icon: ReactNode;
  items: Item[];
  viewAllHref: string;
}

export default function DashboardSidebarCard({ title, icon, items, viewAllHref }: Props) {
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
      <div>
        {items.map((item, idx) => {
          const pos = item.changePercent >= 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={item.href}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.9rem 1.25rem",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(51, 65, 85, 0.15)",
                  transition: "all 0.2s",
                }}
                className="sidebar-row-hover"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      width={28}
                      height={28}
                      style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(59, 130, 246, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.6rem",
                        fontWeight: 800,
                        color: "#3b82f6",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      {item.symbol.substring(0, 2)}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.2 }}>
                      {item.symbol}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 500 }}>
                      {item.name}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#f8fafc", fontFamily: "monospace" }}>
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
                    {pos ? "▲" : "▼"}{Math.abs(item.changePercent).toFixed(2)}%
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
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
