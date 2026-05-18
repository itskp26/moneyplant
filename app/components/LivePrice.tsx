"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface LivePriceProps {
  symbol: string;
  type?: "stock" | "crypto" | "forex" | "commodity" | "index";
  initialPrice: number;
  initialChange: number;
  initialChangePercent: number;
  currencySymbol?: string;
}

export default function LivePrice({
  symbol,
  type = "stock",
  initialPrice,
  initialChange,
  initialChangePercent,
  currencySymbol = "₹",
}: LivePriceProps) {
  const [price, setPrice] = useState(initialPrice);
  const [change, setChange] = useState(initialChange);
  const [changePercent, setChangePercent] = useState(initialChangePercent);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchLivePrice = async () => {
      // Don't fetch if the user is in another tab (pauses polling to save API limits & hosting costs)
      if (document.hidden) return;

      try {
        const res = await fetch(`/api/quote?symbol=${encodeURIComponent(symbol)}&type=${type}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.price !== undefined && data.price !== price) {
          if (data.price > price) {
            setFlashClass("flash-up");
          } else {
            setFlashClass("flash-down");
          }
          
          setPrice(data.price);
          setChange(data.change ?? 0);
          setChangePercent(data.changePercent ?? 0);

          // Clear flash animation after 1s
          setTimeout(() => {
            setFlashClass("");
          }, 1000);
        }
      } catch (err) {
        console.error("Failed to fetch live price", err);
      }
    };

    // Poll every 15 seconds during active viewing (standard real-time frequency)
    intervalId = setInterval(fetchLivePrice, 15000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchLivePrice(); // Fetch immediately on tab return
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [symbol, type, price]);

  const pos = changePercent >= 0;
  const numFmt = (n: number | undefined, d = 2) =>
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  return (
    <div style={{ textAlign: "right" }}>
      <div
        className={`price-container ${flashClass}`}
        style={{
          fontSize: "clamp(2rem, 5vw, 3.25rem)",
          fontWeight: 800,
          color: "#f1f5f9",
          lineHeight: 1,
          fontFamily: "var(--font-sora)",
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: "8px",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {currencySymbol}{numFmt(price)}
      </div>
      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "0.5rem",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: pos ? "#10b981" : "#ef4444",
          transition: "color 0.3s ease",
          paddingRight: "8px"
        }}
      >
        {pos ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        <span>{pos ? "+" : ""}{numFmt(change)}</span>
        <span>({pos ? "+" : ""}{numFmt(changePercent)}%)</span>
      </div>

      <style>{`
        .price-container.flash-up {
          background-color: rgba(16, 185, 129, 0.15) !important;
          color: #10b981 !important;
        }
        .price-container.flash-down {
          background-color: rgba(239, 68, 68, 0.15) !important;
          color: #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
