"use client";

import React, { useState } from "react";
import { type LucideIcon } from "lucide-react";
import { getBrandLogo } from "@/lib/icons";

interface BrandLogoProps {
  domainKey: string;
  fallback: React.ReactNode;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A robust logo component that handles brand logos with a graceful 
 * Lucide icon fallback if the image fails to load.
 */
export default function BrandLogo({ 
  domainKey, 
  fallback, 
  size = 24, 
  className,
  style 
}: BrandLogoProps) {
  const [error, setError] = useState(false);
  const logoUrl = getBrandLogo(domainKey);

  if (!logoUrl || error) {
    return <div className={className} style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", ...style }}>{fallback}</div>;
  }

  return (
    <div 
      className={className}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        overflow: "hidden",
        ...style
      }}
    >
      <img
        src={logoUrl}
        alt={`${domainKey} logo`}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
        onError={() => setError(true)}
      />
    </div>
  );
}
