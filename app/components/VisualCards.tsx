"use client";
import React, { isValidElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";

// --- MINI SPARKLINE CHART ---
export function MiniChart({ color, up, data }: { color: string; up: boolean; data?: number[] }) {
  const points = data || (up ? [25, 22, 28, 18, 20, 10, 5, 8] : [5, 12, 8, 18, 15, 22, 28, 25]);
  const width = 70;
  const height = 32;
  const step = width / (points.length - 1);
  const pathData = `M 0,${points[0]} ${points.map((p, i) => `L ${i * step},${p}`).join(" ")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <motion.path
        d={pathData}
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </svg>
  );
}

// --- PREMIUM STAT WIDGET ---
interface StatWidgetProps {
  label: string;
  value: string | number;
  changePercent?: number;
  change?: number;
  icon: React.ReactNode;
  href: string;
  status?: string;
  subtitle?: string; // New prop for units or extra info
  delay?: number;
  prefix?: string;
  compact?: boolean;
}

export function StatWidget({
  label, value, changePercent, change, icon, href, status, subtitle, delay = 0, prefix = "₹", compact = false
}: StatWidgetProps) {
  const isStringValue = typeof value === "string";
  const pos = (changePercent ?? 0) > 0 || status === "Greed";
  const neg = (changePercent ?? 0) < 0 || status === "Fear";
  const color = pos ? "#10b981" : neg ? "#ef4444" : "#94a3b8";
  
  const numericValue = isStringValue ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
  const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 1 });
  const high = numericValue ? fmt(numericValue * 1.002) : "";
  const low = numericValue ? fmt(numericValue * 0.998) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link href={href} style={{ textDecoration: "none" }}>
        <div style={{
          padding: compact ? "1rem" : "1.25rem",
          background: "rgba(15, 23, 42, 0.45)",
          border: `1px solid ${color}33`,
          borderRadius: "16px",
          backdropFilter: "blur(24px)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          display: "flex", flexDirection: "column", gap: "0.5rem",
          boxShadow: "0 4px 20px -5px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle accent light */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: color, opacity: 0.8 }}>{icon}</span>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>
                  {label}
                </span>
                {subtitle && (
                  <span style={{ fontSize: "0.6rem", color: "#475569", fontWeight: 600, marginTop: "1px", display: "block" }}>
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
            <MiniChart color={color} up={pos} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "4px" }}>
            <div>
              <div style={{ fontSize: compact ? "1.5rem" : "1.85rem", fontWeight: 900, color: "#f8fafc", fontFamily: "monospace", letterSpacing: "-0.02em" }}>
                {typeof value === 'number' ? `${prefix}${value.toLocaleString("en-IN")}` : value}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "0.2rem" }}>
                {changePercent !== undefined ? (
                  <>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: color, display: "flex", alignItems: "center", gap: "2px" }}>
                      {pos ? "▲" : neg ? "▼" : ""} {Math.abs(changePercent).toFixed(2)}%
                    </span>
                    {change !== undefined && (
                      <span style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 600 }}>
                        {pos ? "+" : ""}{change.toLocaleString()} pts
                      </span>
                    )}
                  </>
                ) : (
                  <span style={{ fontSize: "0.85rem", fontWeight: 800, color: color }}>{status}</span>
                )}
              </div>
            </div>
            
            {!compact && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
                <div style={{ fontSize: "0.65rem", color: "#334155", fontWeight: 700 }}>
                  H: <span style={{ color: "#64748b" }}>{high}</span>
                </div>
                <div style={{ fontSize: "0.65rem", color: "#334155", fontWeight: 700 }}>
                  L: <span style={{ color: "#64748b" }}>{low}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// --- IMMERSIVE PORTAL CARD ---
interface PortalCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
  accentColor: string;
  delay?: number;
}

export function PortalCard({ title, desc, icon, href, accentColor, delay = 0 }: PortalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
    >
      <Link href={href} style={{ textDecoration: "none" }}>
        <div style={{
          padding: "2.5rem 2rem",
          background: `linear-gradient(145deg, ${accentColor}1A 0%, rgba(15, 23, 42, 0.45) 100%)`,
          border: `1px solid ${accentColor}33`,
          borderRadius: "24px",
          backdropFilter: "blur(20px)",
          height: "100%",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          textAlign: "center",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Animated glow orb */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: "absolute", top: "-20%", left: "-20%",
              width: "100px", height: "100px", borderRadius: "50%",
              background: accentColor, filter: "blur(40px)"
            }}
          />

          <div style={{ 
            background: `${accentColor}22`, 
            padding: "20px", 
            borderRadius: "50%", 
            marginBottom: "1.5rem",
            border: `1px solid ${accentColor}33`
          }}>
            {isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement, { size: 48, color: accentColor } as any) 
              : icon}
          </div>
          
          <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f1f5f9", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem", maxWidth: "300px" }}>
            {desc}
          </p>
          
          <div style={{ 
            display: "flex", alignItems: "center", gap: "8px", 
            color: accentColor, fontWeight: 800, fontSize: "0.9rem",
            background: `${accentColor}11`,
            padding: "8px 20px",
            borderRadius: "999px",
            border: `1px solid ${accentColor}22`
          }}>
            Enter Hub <ArrowRight size={18} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// --- COMPACT INDEX/SECTOR CARD ---
interface MiniTrekCardProps {
  label: string;
  symbol: string;
  price: number;
  changePercent: number;
  href: string;
  delay?: number;
}

export function MiniTrekCard({ label, symbol, price, changePercent, href, delay = 0 }: MiniTrekCardProps) {
  const pos = changePercent >= 0;
  const color = pos ? "#10b981" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, borderColor: `${color}66` }}
    >
      <Link href={href} style={{ textDecoration: "none" }}>
        <div style={{
          padding: "1.25rem",
          background: "rgba(30, 41, 59, 0.4)",
          border: "1px solid rgba(51, 65, 85, 0.4)",
          borderRadius: "14px",
          transition: "all 0.3s ease",
          cursor: "pointer",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
             <div>
                <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: "0.6rem", color: "#334155", fontWeight: 700 }}>{symbol}</div>
             </div>
             <div style={{ padding: "4px", background: `${color}11`, borderRadius: "6px" }}>
                <MiniChart color={color} up={pos} />
             </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
             <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#f1f5f9", fontFamily: "monospace" }}>
                {price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
             </div>
             <div style={{ fontSize: "0.85rem", fontWeight: 800, color: color }}>
                {pos ? "+" : ""}{changePercent.toFixed(2)}%
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// --- WIDE STAT CARD (HORIZONTAL) ---
interface WideStatCardProps {
  label: string;
  value: string | number;
  changePercent: number;
  change: number;
  prefix?: string;
  delay?: number;
  href: string;
}

export function WideStatCard({ label, value, changePercent, change, prefix = "", delay = 0, href }: WideStatCardProps) {
  const pos = changePercent >= 0;
  const color = pos ? "#10b981" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      style={{ flex: 1 }}
    >
      <Link href={href} style={{ textDecoration: "none" }}>
        <div style={{
          padding: "1.75rem 2.5rem",
          background: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${color}33`,
          borderRadius: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 40px -15px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Accent light */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
          }} />

          <div>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
              {label}
            </div>
            <div style={{ fontSize: "2.75rem", fontWeight: 900, color: "#f8fafc", fontFamily: "monospace", letterSpacing: "-0.02em" }}>
              {prefix}{typeof value === "number" ? value.toLocaleString("en-IN") : value}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: color, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
              {pos ? "▲" : "▼"}{Math.abs(changePercent).toFixed(2)}%
            </div>
            <div style={{ fontSize: "0.95rem", color: "#475569", fontWeight: 700, marginTop: "4px" }}>
              {pos ? "+" : ""}{change.toLocaleString()} pts
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// --- BUSINESS GROUP SIDEBAR COMPONENT ---
interface GroupItem {
  label: string;
  href: string;
}

export function GroupSidebar({ groups }: { groups: GroupItem[] }) {
  return (
    <div className="card" style={{ 
      padding: "1.75rem", 
      height: "fit-content", 
      background: "rgba(15, 23, 42, 0.4)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(51, 65, 85, 0.4)",
      borderRadius: "20px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", borderBottom: "1px solid rgba(51, 65, 85, 0.4)", paddingBottom: "1rem" }}>
        <div style={{ background: "rgba(139, 92, 246, 0.15)", padding: "10px", borderRadius: "10px", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
           <Landmark size={22} color="#8b5cf6" />
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 900, margin: 0, color: "#f1f5f9" }}>Business Groups</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {groups.map((g, i) => (
          <Link key={i} href={g.href} style={{ textDecoration: "none" }}>
             <motion.div 
               whileHover={{ x: 6, background: "rgba(51, 65, 85, 0.3)" }}
               style={{ 
                 display: "flex", 
                 justifyContent: "space-between", 
                 alignItems: "center", 
                 padding: "1rem 1.25rem",
                 borderRadius: "14px",
                 transition: "all 0.2s"
               }}
             >
                <span style={{ fontSize: "1rem", color: "#94a3b8", fontWeight: 600 }}>{g.label}</span>
                <ArrowRight size={18} color="#475569" />
             </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
// --- PREMIUM FEATURE CARD (USED IN IPO/TOOLS) ---
interface PremiumFeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accentColor: string;
  actionText: string;
  href: string;
  delay?: number;
}

export function PremiumFeatureCard({ title, desc, icon, accentColor, actionText, href, delay = 0 }: PremiumFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.211, 0, 0.046, 1] }}
      whileHover={{ y: -8 }}
      style={{ flex: 1, height: "100%" }}
    >
      <Link href={href} style={{ textDecoration: "none", height: "100%", display: "block" }}>
        <div style={{
          padding: "2.5rem 2rem",
          background: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(24px)",
          border: `1px solid ${accentColor}22`,
          borderRadius: "24px",
          height: "100%",
          display: "flex", flexDirection: "column",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.4)"
        }}>
          {/* Internal Glow */}
          <div style={{
            position: "absolute", top: "-10%", right: "-10%",
            width: "120px", height: "120px", borderRadius: "50%",
            background: `${accentColor}11`, filter: "blur(40px)"
          }} />

          {/* Icon Container */}
          <div style={{
            width: "64px", height: "64px",
            background: `${accentColor}11`,
            borderRadius: "18px",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "2rem",
            border: `1px solid ${accentColor}33`,
            boxShadow: `0 8px 16px -4px ${accentColor}22`
          }}>
            {isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement, { size: 30, color: accentColor } as any) 
              : icon}
          </div>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#f8fafc", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{title}</h3>
          <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.6, flex: 1, marginBottom: "2.5rem" }}>
            {desc}
          </p>

          <div style={{ 
            display: "flex", alignItems: "center", gap: "10px", 
            color: accentColor, fontWeight: 800, fontSize: "0.95rem",
            background: `${accentColor}11`,
            padding: "12px 24px",
            borderRadius: "14px",
            border: `1px solid ${accentColor}22`,
            width: "100%",
            justifyContent: "center",
            transition: "all 0.3s ease"
          }} className="feature-cta">
            {actionText} <ArrowRight size={18} />
          </div>
        </div>
      </Link>
      <style jsx>{`
        .feature-cta:hover {
          background: ${accentColor}22;
          transform: scale(1.02);
        }
      `}</style>
    </motion.div>
  );
}
