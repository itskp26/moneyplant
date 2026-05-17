"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Activity, FileText, TrendingUp, TrendingDown, BarChart2, Coins, DollarSign, Gem } from "lucide-react";

import { StatWidget } from "@/components/VisualCards";


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

// Bottom ticker rail — continuous smooth scroll
function ScrollableStatRail({ statCards }: { statCards: HeroV2Props["statCards"] }) {
  // Double the cards for seamless looping
  const doubledCards = [...statCards, ...statCards];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        paddingTop: "6px",
        paddingBottom: "8px",
      }}
      className="stat-ticker-rail"
    >
      <div className="ticker-cards-track" style={{ gap: "0.75rem" }}>
        {doubledCards.map((card, i) => (
          <div key={`${card.label}-${i}`} style={{ flexShrink: 0 }}>
            <StatWidget {...card} delay={0} compact />
          </div>
        ))}
      </div>
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

  const words = ["Global", "Live", "Finance", "Hub"];
  const gradientWords = [true, false, true, true];

  return (
    <section
      ref={containerRef}
      style={{
        background: "linear-gradient(135deg, #020817 0%, #060f1e 35%, #0a1628 60%, #020817 100%)",
        borderBottom: "1px solid rgba(51,65,85,0.4)",
        padding: "5rem 0 3.5rem",
        position: "relative",
        minHeight: "640px",
      }}
    >
      {/* Animated mesh gradient bg — clipped to section */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: "2rem", alignItems: "flex-start" }} className="hero-grid">

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
            <h1 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.2rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.05em",
              marginBottom: "1.5rem",
              textShadow: "0 20px 50px rgba(0,0,0,0.5)"
            }}>
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
                  style={{
                    display: "inline-block", marginRight: "0.35em",
                    ...(gradientWords[i] ? {
                      background: "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(16,185,129,0.2))"
                    } : { color: "#f8fafc" }),
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
              Real-time Global Stocks, Bitcoin (USD), Forex Markets, Gold & Silver rates,
              and Top Cryptocurrencies — tracked globally with second-by-second updates.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginBottom: "3.5rem" }}
              className="hero-btns"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/markets/global" className="btn-shine" style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  padding: "1.1rem 2.8rem",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white", borderRadius: "16px",
                  fontWeight: 800, fontSize: "1.1rem",
                  fontFamily: "var(--font-sora)",
                  textDecoration: "none",
                  boxShadow: "0 20px 40px -10px rgba(16,185,129,0.5), 0 0 20px rgba(16,185,129,0.2)",
                  border: "2px solid rgba(255,255,255,0.2)",
                  letterSpacing: "0.02em",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <Activity size={22} /> Explore Markets
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/ipo" className="btn-shine" style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  padding: "1.1rem 2.8rem",
                  background: "rgba(30,41,59,0.4)", color: "#ffffff",
                  borderRadius: "16px", fontWeight: 700, fontSize: "1.1rem",
                  fontFamily: "var(--font-sora)",
                  textDecoration: "none",
                  border: "2px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 15px 30px -5px rgba(0,0,0,0.4)",
                  letterSpacing: "0.02em",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <FileText size={22} /> IPO Tracker
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

          {/* RIGHT: 3D Globe — bottom-aligned to fill the lower space */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              position: "relative",
              width: "100%",
              height: "480px",
              alignSelf: "end",
              overflow: "visible",
            }}
          >
            {/* Glow behind globe */}
            <div style={{
              position: "absolute", inset: "15%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(59,130,246,0.1) 50%, transparent 80%)",
              filter: "blur(20px)",
              zIndex: 0,
            }} />
            <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
              <Globe3D />
            </div>

            {/* Floating market data cards — tucked inside container, no overflow */}
            {[
              { label: "S&P 500", value: "5,450", up: true, top: "5%", left: "8%" },
              { label: "BTC/USD", value: "$65,240", up: true, bottom: "12%", right: "8%" },
              { label: "GOLD", value: "$2,350", up: true, bottom: "30%", left: "8%" },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }}
                style={{
                  position: "absolute",
                  top: badge.top,
                  bottom: (badge as any).bottom,
                  left: (badge as any).left,
                  right: (badge as any).right,
                  padding: "8px 14px",
                  background: "rgba(10, 22, 40, 0.9)",
                  border: `1px solid ${badge.up ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)",
                  zIndex: 10,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
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

        {/* Middle scrollable rail — continuous smooth scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          style={{ marginTop: "2.5rem", overflow: "hidden" }}
        >
          <div className="ticker-cards-track-slow" style={{ gap: "1rem" }}>
            {[...statCards, ...statCards].map((card, i) => (
              <div key={`${card.label}-${i}`} style={{ flexShrink: 0, width: "300px" }}>
                <StatWidget {...card} delay={0} compact={false} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mouse-wheel scrollable ticker rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{ marginTop: "1.5rem" }}
        >
          <ScrollableStatRail statCards={statCards} />
        </motion.div>
      </div>

      <style>{`
        @keyframes ticker-cards {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-cards-track {
          display: flex;
          animation: ticker-cards 60s linear infinite;
          width: max-content;
        }

        .ticker-cards-track-slow {
          display: flex;
          animation: ticker-cards 90s linear infinite;
          width: max-content;
          padding-top: 10px;
          padding-bottom: 15px;
        }

        .ticker-cards-track:hover,
        .ticker-cards-track-slow:hover {
          animation-play-state: paused;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Desktop: left content fixed, globe 480px ── */
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 480px !important; gap: 2rem !important; }
        }

        /* ── Tablet: stack vertically ── */
        @media (max-width: 1023px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .bottom-stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .stat-grid { grid-template-columns: 1fr !important; }
          .bottom-stat-grid { grid-template-columns: 1fr !important; }
          h1 { font-size: 2.25rem !important; line-height: 1.1 !important; }
          .hero-btns > div { width: 100%; }
          .hero-btns a { width: 100%; justify-content: center; }
        }

        /* Scrollable rail: hide scrollbar ── */
        .stat-rail-hide-scroll::-webkit-scrollbar { display: none; }
        .stat-rail-hide-scroll { -ms-overflow-style: none; scrollbar-width: none; -webkit-overflow-scrolling: touch; }

        /* Button Shine Effect */
        .btn-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: skewX(-25deg);
          animation: shine 4s infinite;
        }
        @keyframes shine {
          100% {
            left: 200%;
          }
        }
      `}</style>
    </section>
  );
}
