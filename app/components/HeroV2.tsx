"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Activity, FileText, TrendingUp, TrendingDown, BarChart2, Coins, DollarSign, Gem } from "lucide-react";

import { StatWidget } from "@/components/VisualCards";

const MARKET_PILLS = [
  { label: "NIFTY 50", value: "24,350", change: "+0.65%", up: true },
  { label: "SENSEX", value: "78,493", change: "+0.65%", up: true },
  { label: "BANK NIFTY", value: "56,565", change: "+0.85%", up: true },
  { label: "BTC/INR", value: "₹71.2L", change: "+2.39%", up: true },
  { label: "USD/INR", value: "₹92.58", change: "-0.46%", up: false },
  { label: "GOLD 10g", value: "₹89,400", change: "+0.30%", up: true },
  { label: "ADANI", value: "₹2,218", change: "+0.66%", up: true },
  { label: "ETH/INR", value: "₹2.2L", change: "+2.88%", up: true },
];

// Lazy-load the 3D globe (no SSR)
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: "200px", height: "200px", borderRadius: "50%",
        border: "2px solid rgba(16,185,129,0.3)",
        animation: "spin 3s linear infinite",
      }} />
    </div>
  ),
});

// Smooth horizontal infinite scroll ticker
function InfiniteScroll() {
  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
      <motion.div
        style={{ display: "flex", gap: "1rem", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...MARKET_PILLS, ...MARKET_PILLS].map((t, i) => (
          <div key={i} style={{
            padding: "5px 16px",
            borderRadius: "999px",
            background: t.up ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
            border: `1px solid ${t.up ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
            fontSize: "0.72rem",
            fontWeight: 700,
            color: t.up ? "#10b981" : "#ef4444",
            fontFamily: "monospace",
            display: "flex", alignItems: "center", gap: "8px",
            whiteSpace: "nowrap",
          }}>
            <span style={{ color: "#64748b", fontWeight: 400 }}>{t.label}</span>
            <span style={{ color: "#e2e8f0" }}>{t.value}</span>
            <span>{t.change}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface HeroV2Props {
  statCards: {
    label: string;
    value: string;
    changePercent?: number;
    change?: number;
    icon: React.ReactNode;
    href: string;
  }[];
}

export default function HeroV2({ statCards }: HeroV2Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const globeTransform = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `perspective(1000px) rotateX(${Number(y) * 0.3}deg) rotateY(${Number(x) * 0.3}deg)`
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * -12);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const words = ["India's", "Live", "Finance", "Hub"];
  const gradientWords = [false, false, true, true];

  return (
    <section
      ref={containerRef}
      style={{
        background: "linear-gradient(135deg, #020817 0%, #060f1e 35%, #0a1628 60%, #020817 100%)",
        borderBottom: "1px solid rgba(51,65,85,0.4)",
        padding: "5rem 0 3.5rem",
        position: "relative",
        overflow: "hidden",
        minHeight: "640px",
      }}
    >
      {/* Animated mesh gradient bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "10%", left: "10%",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, #10b981, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute", top: "20%", right: "15%",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, #3b82f6, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            position: "absolute", bottom: "5%", left: "30%",
            width: "600px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: "3rem", alignItems: "center" }} className="hero-grid">

          {/* LEFT: Text + Stats */}
          <div>
            {/* LIVE badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: "999px", padding: "5px 16px",
                fontSize: "0.75rem", color: "#10b981", fontWeight: 700,
                marginBottom: "1.5rem", letterSpacing: "0.04em",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}
              />
              Live Market Data — Updated Every Minute
            </motion.div>

            {/* Headline with staggered word animation */}
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1.25rem" }}>
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{
                    display: "inline-block", marginRight: "0.4em",
                    ...(gradientWords[i] ? {
                      background: "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    } : { color: "#f1f5f9" }),
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: "520px", lineHeight: 1.75, marginBottom: "2rem" }}
            >
              Real-time Nifty 50, Sensex, NSE/BSE stocks, Bitcoin price in INR,
              USD to INR, Gold rates & IPOs — all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/markets/india" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "0.8rem 1.8rem",
                  background: "linear-gradient(135deg, #10b981, #3b82f6)",
                  color: "white", borderRadius: "12px",
                  fontWeight: 700, fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 0 40px rgba(16,185,129,0.3)",
                }}>
                  <Activity size={18} /> Explore Markets
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/ipo" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "0.8rem 1.8rem",
                  background: "rgba(30,41,59,0.8)", color: "#94a3b8",
                  borderRadius: "12px", fontWeight: 700, fontSize: "0.95rem",
                  textDecoration: "none",
                  border: "1px solid rgba(51,65,85,0.6)",
                  backdropFilter: "blur(10px)",
                }}>
                  <FileText size={18} /> IPO Tracker
                </Link>
              </motion.div>
            </motion.div>

            {/* Market stat cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }} className="stat-grid">
              {statCards.slice(0, 4).map((card, i) => (
                <StatWidget key={card.label} {...card} delay={0.9 + i * 0.1} />
              ))}
            </div>
          </div>

          {/* RIGHT: 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              height: "540px",
              position: "relative",
              transform: globeTransform,
            }}
          >
            {/* Glow behind globe */}
            <div style={{
              position: "absolute", inset: "10%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(59,130,246,0.1) 50%, transparent 80%)",
              filter: "blur(20px)",
              zIndex: 0,
            }} />
            <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
              <Globe3D />
            </div>

            {/* Floating market data cards around globe */}
            {[
              { label: "NIFTY 50", value: "24,350", up: true, top: "5%", left: "-10%" },
              { label: "BTC/INR", value: "₹71.2L", up: true, bottom: "10%", right: "-5%" },
              { label: "GOLD", value: "₹89,400", up: true, bottom: "20%", left: "-12%" },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }}
                style={{
                  position: "absolute",
                  top: badge.top,
                  bottom: (badge as any).bottom,
                  left: (badge as any).left,
                  right: (badge as any).right,
                  padding: "8px 14px",
                  background: "rgba(10, 22, 40, 0.85)",
                  border: `1px solid ${badge.up ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)",
                  zIndex: 10,
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ fontSize: "0.65rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>{badge.label}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#f1f5f9", fontFamily: "monospace" }}>{badge.value}</div>
                <div style={{ fontSize: "0.7rem", color: badge.up ? "#10b981" : "#ef4444", fontWeight: 700 }}>
                  {badge.up ? "▲" : "▼"} Live
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom stat cards row (remaining) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginTop: "2.5rem" }}
          className="bottom-stat-grid"
        >
          {statCards.slice(4).map((card, i) => (
            <StatWidget key={card.label} {...card} delay={1.4 + i * 0.08} />
          ))}
        </motion.div>

        {/* Infinite scroll ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{ marginTop: "2rem" }}
        >
          <InfiniteScroll />
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .bottom-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stat-grid { grid-template-columns: 1fr !important; }
          .bottom-stat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
