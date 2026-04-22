"use client";
import { useEffect, useRef, useState } from "react";

const MINI_TICKERS = [
  { label: "NIFTY 50", value: "24,350", change: "+0.65%", up: true },
  { label: "SENSEX", value: "78,493", change: "+0.65%", up: true },
  { label: "BANK NIFTY", value: "56,565", change: "+0.85%", up: true },
  { label: "BTC/INR", value: "₹71,26,003", change: "+2.39%", up: true },
  { label: "ETH/INR", value: "₹2,22,655", change: "+2.88%", up: true },
  { label: "USD/INR", value: "₹92.58", change: "-0.46%", up: false },
  { label: "GOLD 10g", value: "₹89,400", change: "+0.30%", up: true },
  { label: "ADANI ENT.", value: "₹2,218", change: "+0.66%", up: true },
];

export default function FloatingTicker() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % MINI_TICKERS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "2rem",
        maxWidth: "680px",
        margin: "2rem auto 0",
      }}
    >
      {MINI_TICKERS.map((t, i) => (
        <div
          key={t.label}
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            background:
              i === active
                ? t.up
                  ? "rgba(16,185,129,0.15)"
                  : "rgba(239,68,68,0.15)"
                : "rgba(30,41,59,0.6)",
            border: `1px solid ${
              i === active
                ? t.up
                  ? "rgba(16,185,129,0.4)"
                  : "rgba(239,68,68,0.4)"
                : "rgba(51,65,85,0.5)"
            }`,
            fontSize: "0.72rem",
            fontWeight: 700,
            color: i === active ? (t.up ? "#10b981" : "#ef4444") : "#64748b",
            fontFamily: "monospace",
            transition: "all 0.4s ease",
            transform: i === active ? "scale(1.06)" : "scale(1)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ opacity: 0.6, fontWeight: 400 }}>{t.label}</span>
          <span>{t.value}</span>
          <span style={{ color: t.up ? "#10b981" : "#ef4444", opacity: i === active ? 1 : 0.5 }}>
            {t.change}
          </span>
        </div>
      ))}
    </div>
  );
}
