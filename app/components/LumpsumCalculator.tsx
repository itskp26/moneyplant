"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, PieChart, Coins, Calendar, Info, Calculator, Download } from "lucide-react";

export default function LumpsumCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const [result, setResult] = useState({
    invested: 0,
    returns: 0,
    total: 0
  });

  useEffect(() => {
    const p = investment;
    const r = rate / 100;
    const n = years;

    // Future Value = P * (1 + r)^n
    const total = p * Math.pow(1 + r, n);
    const returns = total - p;

    setResult({
      invested: p,
      returns: returns,
      total: total
    });
  }, [investment, rate, years]);

  const fmt = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);

  return (
    <div className="card" style={{ padding: "2rem", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="content-grid">

        {/* Input section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: "#94a3b8" }}>Total Investment</label>
              <span style={{ color: "#3b82f6", fontWeight: 700 }}>{fmt(investment)}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="10000000"
              step="5000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#3b82f6" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: "#94a3b8" }}>Expected Return Rate (p.a)</label>
              <span style={{ color: "#10b981", fontWeight: 700 }}>{rate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#10b981" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: "#94a3b8" }}>Time Period (Years)</label>
              <span style={{ color: "#8b5cf6", fontWeight: 700 }}>{years} Yr</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#8b5cf6" }}
            />
          </div>

          <div style={{
            marginTop: "1rem",
            padding: "1.25rem",
            background: "rgba(30, 41, 59, 0.4)",
            borderRadius: "12px",
            border: "1px solid rgba(51, 65, 85, 0.5)"
          }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <Info size={18} color="#3b82f6" style={{ marginTop: "2px" }} />
              <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                Lumpsum investment means a one-time single investment of a bulk amount. This calculator helps you estimate the wealth created over time based on historical returns.
              </p>
            </div>
          </div>
        </div>

        {/* Result section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ textAlign: "center", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(51, 65, 85, 0.5)" }}>
            <h3 style={{ fontSize: "0.9rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Estimated Returns</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f1f5f9" }}>{fmt(result.total)}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#1e293b", border: "2px solid #3b82f6" }} />
                <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Invested Amount</span>
              </div>
              <span style={{ fontWeight: 700 }}>{fmt(result.invested)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#10b981" }} />
                <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Est. Returns</span>
              </div>
              <span style={{ fontWeight: 700, color: "#10b981" }}>{fmt(result.returns)}</span>
            </div>

            {/* Visual Bar */}
            <div style={{
              height: "24px",
              width: "100%",
              background: "#1e293b",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              marginTop: "0.5rem"
            }}>
              <div style={{
                width: `${(result.invested / result.total) * 100}%`,
                height: "100%",
                background: "#3b82f6",
                transition: "width 0.3s ease"
              }} />
              <div style={{
                width: `${(result.returns / result.total) * 100}%`,
                height: "100%",
                background: "#10b981",
                transition: "width 0.3s ease"
              }} />
            </div>
          </div>

          <button className="btn btn-primary" style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <Calendar size={18} />
            Start Planning Now
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
            <button style={{ background: "none", border: "none", color: "#64748b", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
              <Download size={14} /> Download PDF
            </button>
            <button style={{ background: "none", border: "none", color: "#64748b", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
              <Calculator size={14} /> Save Calculation
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
