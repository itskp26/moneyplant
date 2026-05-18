"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";

interface AdUnitProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
}

export default function AdUnit({ slot, format = "auto", responsive = true }: AdUnitProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!slot) return;

    // Delay initialization slightly to let Next.js layout calculate responsive availableWidth.
    // This prevents the 'availableWidth=0' AdSense error.
    const timer = setTimeout(() => {
      try {
        // Only push if there are uninitialized ad units on the page.
        // Once AdSense initializes a slot, it adds a status attribute to it.
        const uninitializedAds = document.querySelectorAll(
          "ins.adsbygoogle:not([data-adsbygoogle-status])"
        );

        if (uninitializedAds.length > 0) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense initialization error:", e);
        setHasError(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [slot]);

  // If no slot is configured, render a premium glassmorphic ad placement placeholder
  if (!slot || hasError) {
    return (
      <div 
        style={{
          margin: "2rem 0",
          width: "100%",
          background: "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)",
          border: "1px dashed rgba(139, 92, 246, 0.2)",
          borderRadius: "12px",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          textAlign: "center",
          backdropFilter: "blur(8px)"
        }}
      >
        <div style={{ fontSize: "0.68rem", color: "#8b5cf6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "6px" }}>
          <Info size={12} /> Sponsored Advertisement
        </div>
        <div style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 500 }}>
          Premium Financial Analytics & Trading Terminal
        </div>
        {process.env.NODE_ENV !== "production" && (
          <div style={{ fontSize: "0.72rem", color: "#475569" }}>
            AdSense Unit (Client: ca-pub-2567665577481409 {slot ? `| Slot: ${slot}` : "(Auto Ads Active)"})
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="my-6 flex justify-center overflow-hidden w-full">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2567665577481409"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
