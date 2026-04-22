"use client";
import React, { useState, useEffect } from "react";
import { 
  TrendingUp, PiggyBank, PieChart as PieChartIcon, 
  HelpCircle, Info, RefreshCcw
} from "lucide-react";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [years, setYears] = useState(10);
  
  const [results, setResults] = useState({
    investedAmount: 0,
    estReturns: 0,
    totalValue: 0,
  });

  useEffect(() => {
    const P = monthlyInvestment;
    const i = expectedReturn / 12 / 100;
    const n = years * 12;

    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = P * n;
    const estReturns = totalValue - investedAmount;

    setResults({
      investedAmount: Math.round(investedAmount),
      estReturns: Math.round(estReturns),
      totalValue: Math.round(totalValue),
    });
  }, [monthlyInvestment, expectedReturn, years]);

  const numFmt = (n: number) => n.toLocaleString("en-IN");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "2.5rem" }} className="calculator-grid">
      
      {/* Inputs */}
      <div className="card" style={{ padding: "2.5rem" }}>
         <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            
            {/* Monthly Investment */}
            <div>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <label style={{ fontWeight: 600, color: "#cbd5e1" }}>Monthly Investment (₹)</label>
                  <input 
                    type="number" 
                    value={monthlyInvestment} 
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    style={{ background: "#0f172a", border: "1px solid #334155", padding: "4px 12px", borderRadius: "6px", color: "#10b981", fontWeight: 700, textAlign: "right", width: "120px" }}
                  />
               </div>
               <input 
                 type="range" 
                 min="500" 
                 max="1000000" 
                 step="500" 
                 value={monthlyInvestment} 
                 onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                 style={{ width: "100%", accentColor: "#10b981" }}
               />
            </div>

            {/* Expected Return */}
            <div>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <label style={{ fontWeight: 600, color: "#cbd5e1" }}>Expected Return Rate (p.a %)</label>
                  <input 
                    type="number" 
                    value={expectedReturn} 
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    style={{ background: "#0f172a", border: "1px solid #334155", padding: "4px 12px", borderRadius: "6px", color: "#10b981", fontWeight: 700, textAlign: "right", width: "80px" }}
                  />
               </div>
               <input 
                 type="range" 
                 min="1" 
                 max="30" 
                 step="0.1" 
                 value={expectedReturn} 
                 onChange={(e) => setExpectedReturn(Number(e.target.value))}
                 style={{ width: "100%", accentColor: "#10b981" }}
               />
            </div>

            {/* Time Period */}
            <div>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <label style={{ fontWeight: 600, color: "#cbd5e1" }}>Time Period (Years)</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))}
                    style={{ background: "#0f172a", border: "1px solid #334155", padding: "4px 12px", borderRadius: "6px", color: "#10b981", fontWeight: 700, textAlign: "right", width: "80px" }}
                  />
               </div>
               <input 
                 type="range" 
                 min="1" 
                 max="40" 
                 value={years} 
                 onChange={(e) => setYears(Number(e.target.value))}
                 style={{ width: "100%", accentColor: "#10b981" }}
               />
            </div>

         </div>

         <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "12px", border: "1px dashed rgba(16, 185, 129, 0.2)" }}>
            <h4 style={{ fontSize: "0.9rem", color: "#10b981", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
               <TrendingUp size={16} /> Wealth Growth Tip
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6 }}>
               Increasing your monthly investment by just 10% every year (Step-up SIP) can double your final corpus in the long run.
            </p>
         </div>
      </div>

      {/* Results */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
         <div className="card" style={{ padding: "2rem", textAlign: "center", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}>
            <div style={{ color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Estimated Wealth</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#10b981" }}>₹{numFmt(results.totalValue)}</div>
            
            <div style={{ borderTop: "1px solid rgba(51, 65, 85, 0.5)", margin: "2rem 0", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                  <span style={{ color: "#94a3b8" }}>Invested Amount</span>
                  <span style={{ fontWeight: 700 }}>₹{numFmt(results.investedAmount)}</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                  <span style={{ color: "#94a3b8" }}>Est. Returns</span>
                  <span style={{ fontWeight: 700, color: "#10b981" }}>₹{numFmt(results.estReturns)}</span>
               </div>
            </div>


         </div>

         <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
               <PieChartIcon size={18} color="#8b5cf6" /> Allocation Breakdown
            </h3>
            <div style={{ height: "8px", background: "#334155", borderRadius: "4px", overflow: "hidden", display: "flex", marginBottom: "1rem" }}>
               <div style={{ width: `${(results.investedAmount/results.totalValue)*100}%`, background: "#3b82f6" }} />
               <div style={{ flex: 1, background: "#10b981" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", background: "#3b82f6", borderRadius: "50%" }} />
                  <span style={{ color: "#94a3b8" }}>Invested ({(results.investedAmount/results.totalValue*100).toFixed(0)}%)</span>
               </div>
               <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%" }} />
                  <span style={{ color: "#94a3b8" }}>Returns ({(results.estReturns/results.totalValue*100).toFixed(0)}%)</span>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
