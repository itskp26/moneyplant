"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, Landmark, ShieldCheck, 
  ArrowRightLeft, AlertCircle, TrendingDown,
  ChevronDown, ChevronUp, Info
} from "lucide-react";

export default function TaxCalculator() {
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000); // 80C, etc.
  const [hra, setHra] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  
  const [result, setResult] = useState({
    newTax: 0,
    oldTax: 0,
    better: "new"
  });

  const calculateTaxNew = (gross: number) => {
    const stdDeduction = 75000;
    const taxable = Math.max(0, gross - stdDeduction);
    
    // Rebate u/s 87A for New Regime (effective zero tax upto 12L income AFTER Std Deduction)
    // For FY 2025-26, income up to 12L (taxable) has zero tax due to rebate of Rs 60,000.
    let tax = 0;
    // 0-4L: Nil
    // 4-8L: 5%
    if (taxable > 400000) tax += (Math.min(taxable, 800000) - 400000) * 0.05;
    // 8-12L: 10%
    if (taxable > 800000) tax += (Math.min(taxable, 1200000) - 800000) * 0.10;
    
    // If taxable income <= 12,00,000, tax is zero after rebate
    if (taxable <= 1200000) return 0;

    // 12-16L: 15%
    if (taxable > 1200000) tax += (Math.min(taxable, 1600000) - 1200000) * 0.15;
    // 16-20L: 20%
    if (taxable > 1600000) tax += (Math.min(taxable, 2000000) - 1600000) * 0.20;
    // 20-24L: 25%
    if (taxable > 2000000) tax += (Math.min(taxable, 2400000) - 2000000) * 0.25;
    // >24L: 30%
    if (taxable > 2400000) tax += (taxable - 2400000) * 0.30;

    // Add 4% Cess
    return tax * 1.04;
  };

  const calculateTaxOld = (gross: number, ded: number, h: number, other: number) => {
    const stdDeduction = 50000;
    const totalDeductions = stdDeduction + ded + h + other;
    const taxable = Math.max(0, gross - totalDeductions);

    // Rebate u/s 87A for Old Regime (effective zero tax upto 5L net income)
    if (taxable <= 500000) return 0;

    let tax = 0;
    // 0-2.5L: Nil
    // 2.5-5L: 5%
    if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
    // 5-10L: 20%
    if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
    // >10L: 30%
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;

    // Add 4% Cess
    return tax * 1.04;
  };

  useEffect(() => {
    const nt = calculateTaxNew(income);
    const ot = calculateTaxOld(income, deductions, hra, otherDeductions);

    setResult({
      newTax: nt,
      oldTax: ot,
      better: nt <= ot ? "new" : "old"
    });
  }, [income, deductions, hra, otherDeductions]);

  const fmt = (val: number) => 
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);

  return (
    <div className="card" style={{ padding: "2rem", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="content-grid">
        
        {/* Input section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>Annual Salary / Income</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>₹</span>
              <input 
                type="number" 
                value={income} 
                onChange={(e) => setIncome(Number(e.target.value))}
                style={{ 
                  width: "100%", 
                  background: "rgba(15, 23, 42, 0.5)", 
                  border: "1px solid rgba(51, 65, 85, 0.5)", 
                  borderRadius: "10px", 
                  padding: "0.75rem 0.75rem 0.75rem 2rem", 
                  color: "#f1f5f9",
                  fontSize: "1.1rem",
                  fontWeight: 700
                }}
              />
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(51, 65, 85, 0.3)", paddingTop: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", color: "#f1f5f9", marginBottom: "1.5rem", fontWeight: 800, borderLeft: "4px solid #10b981", paddingLeft: "15px" }}>
  Income Tax Calculator — FY 2025-26 (Budget 2025)
</h2>

            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                   <label style={{ fontSize: "0.85rem", color: "#94a3b8" }}>80C (PPF, LIC, EPF, etc)</label>
                   <span style={{ fontSize: "0.85rem", color: "#fff" }}>{fmt(deductions)}</span>
                </div>
                <input type="range" min="0" max="150000" step="5000" value={deductions} onChange={e => setDeductions(Number(e.target.value))} style={{ width: "100%", accentColor: "#3b82f6" }} />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                   <label style={{ fontSize: "0.85rem", color: "#94a3b8" }}>HRA / Rent Allowance</label>
                   <span style={{ fontSize: "0.85rem", color: "#fff" }}>{fmt(hra)}</span>
                </div>
                <input type="range" min="0" max="500000" step="5000" value={hra} onChange={e => setHra(Number(e.target.value))} style={{ width: "100%", accentColor: "#8b5cf6" }} />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                   <label style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Other Deductions (80D, etc)</label>
                   <span style={{ fontSize: "0.85rem", color: "#fff" }}>{fmt(otherDeductions)}</span>
                </div>
                <input type="range" min="0" max="200000" step="1000" value={otherDeductions} onChange={e => setOtherDeductions(Number(e.target.value))} style={{ width: "100%", accentColor: "#10b981" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Result section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ 
            padding: "1.5rem", 
            background: "rgba(16, 185, 129, 0.05)", 
            border: "1px solid rgba(16, 185, 129, 0.2)", 
            borderRadius: "16px",
            textAlign: "center"
          }}>
            <h3 style={{ fontSize: "0.85rem", color: "#10b981", textTransform: "uppercase", fontWeight: 800, marginBottom: "0.5rem" }}>
              Recommended Regime
            </h3>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", textTransform: "capitalize" }}>
              {result.better} Tax Regime
            </div>
            <div style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "4px" }}>
              You save {fmt(Math.abs(result.newTax - result.oldTax))} per year
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="card" style={{ padding: "1.25rem", textAlign: "center", border: result.better === "new" ? "2px solid #10b981" : "1px solid rgba(51, 65, 85, 0.5)" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>NEW REGIME</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>{fmt(result.newTax)}</div>
              {result.better === "new" && <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 700 }}>BETTER ✅</span>}
            </div>
            <div className="card" style={{ padding: "1.25rem", textAlign: "center", border: result.better === "old" ? "2px solid #10b981" : "1px solid rgba(51, 65, 85, 0.5)" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>OLD REGIME</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800 }}>{fmt(result.oldTax)}</div>
              {result.better === "old" && <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: 700 }}>BETTER ✅</span>}
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <h4 style={{ fontSize: "0.85rem", color: "#cbd5e1", marginBottom: "1rem" }}>Tax Savings Breakdown</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b" }}>
                <span>Standard Deduction</span>
                <span style={{ color: "#fff" }}>₹75,000 (New)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b" }}>
                 <span>Effective Tax Rate</span>
                 <span style={{ color: "#fff" }}>{((result.newTax / income) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1rem", display: "flex", gap: "8px", background: "rgba(59, 130, 246, 0.1)", padding: "1rem", borderRadius: "10px", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
            <Info size={16} color="#3b82f6" />
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.5 }}>
              Calculations based on Budget 2025-26 proposals. New Regime is the default option for FY 2025-26.
            </p>
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
