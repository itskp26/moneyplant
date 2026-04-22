"use client";

import React, { useState } from "react";
import { Bitcoin, RefreshCw, BarChart2, Globe, Newspaper } from "lucide-react";

interface NewsImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
  style?: React.CSSProperties;
}

const CATEGORY_MAP: Record<string, { icon: React.ReactNode; gradient: string; color: string }> = {
  Crypto: {
    icon: <Bitcoin size={32} />,
    gradient: "linear-gradient(135deg, #451a03 0%, #7c2d12 100%)",
    color: "#f59e0b",
  },
  Forex: {
    icon: <RefreshCw size={32} />,
    gradient: "linear-gradient(135deg, #172554 0%, #1e3a8a 100%)",
    color: "#3b82f6",
  },
  Markets: {
    icon: <BarChart2 size={32} />,
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
    color: "#10b981",
  },
  Corporate: {
    icon: <Globe size={32} />,
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    color: "#818cf8",
  },
  Economy: {
    icon: <Newspaper size={32} />,
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#94a3b8",
  },
};

export default function NewsImage({ src, alt, category, className, style }: NewsImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallback = CATEGORY_MAP[category] || CATEGORY_MAP["Economy"];

  return (
    <div 
      className={className} 
      style={{ 
        position: "relative", 
        width: "100%", 
        height: "100%", 
        background: "#020617",
        overflow: "hidden",
        ...style 
      }}
    >
      {!error && src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loading ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {(error || loading) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: fallback.gradient,
            color: fallback.color,
            padding: "1rem",
            textAlign: "center",
            opacity: error ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        >
          <div style={{ opacity: 0.8, marginBottom: "0.5rem" }}>
            {fallback.icon}
          </div>
          <span style={{ 
            fontSize: "0.6rem", 
            fontWeight: 800, 
            textTransform: "uppercase", 
            letterSpacing: "0.15em",
            opacity: 0.6
          }}>
            {category} Hub
          </span>
        </div>
      )}
      
      <div 
        style={{ 
          position: "absolute", 
          inset: 0, 
          background: "linear-gradient(to right, transparent 0%, rgba(15,23,42,0.4) 100%)",
          pointerEvents: "none" 
        }} 
      />
    </div>
  );
}
