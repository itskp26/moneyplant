"use client";
import React, { useState, useEffect } from "react";
import { 
  CreditCard, Calculator, PieChart as PieChartIcon, 
  HelpCircle, Info, Landmark
} from "lucide-react";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000); // 25 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [years, setYears] = useState(20);
  
  const [results, setResults] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  useEffect(() => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = years * 12;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    setResults({
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    });
  }, [loanAmount, interestRate, years]);

  const numFmt = (n: number) => n.toLocaleString("en-IN");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "2.5rem" }} className="calculator-grid">
      
      {/* Inputs */}
      <div className="card" style={{ padding: "2.5rem" }}>
         <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            
            {/* Loan Amount */}
            <div>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <label style={{ fontWeight: 600, color: "#cbd5e1" }}>Loan Amount (₹)</label>
                  <input 
                    type="number" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    style={{ background: "#0f172a", border: "1px solid #334155", padding: "4px 12px", borderRadius: "6px", color: "#3b82f6", fontWeight: 700, textAlign: "right", width: "120px" }}
                  />
               </div>
               <input 
                 type="range" 
                 min="100000" 
                 max="100000000" 
                 step="100000" 
                 value={loanAmount} 
                 onChange={(e) => setLoanAmount(Number(e.target.value))}
                 style={{ width: "100%", accentColor: "#3b82f6" }}
               />
            </div>

            {/* Interest Rate */}
            <div>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <label style={{ fontWeight: 600, color: "#cbd5e1" }}>Interest Rate (p.a %)</label>
                  <input 
                    type="number" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    style={{ background: "#0f172a", border: "1px solid #334155", padding: "4px 12px", borderRadius: "6px", color: "#3b82f6", fontWeight: 700, textAlign: "right", width: "80px" }}
                  />
               </div>
               <input 
                 type="range" 
                 min="1" 
                 max="20" 
                 step="0.05" 
                 value={interestRate} 
                 onChange={(e) => setInterestRate(Number(e.target.value))}
                 style={{ width: "100%", accentColor: "#3b82f6" }}
               />
            </div>

            {/* Loan Tenure */}
            <div>
               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <label style={{ fontWeight: 600, color: "#cbd5e1" }}>Loan Tenure (Years)</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))}
                    style={{ background: "#0f172a", border: "1px solid #334155", padding: "4px 12px", borderRadius: "6px", color: "#3b82f6", fontWeight: 700, textAlign: "right", width: "80px" }}
                  />
               </div>
               <input 
                 type="range" 
                 min="1" 
                 max="40" 
                 value={years} 
                 onChange={(e) => setYears(Number(e.target.value))}
                 style={{ width: "100%", accentColor: "#3b82f6" }}
               />
            </div>

         </div>

         <div style={{ marginTop: "3rem", padding: "1.5rem", background: "rgba(59, 130, 246, 0.05)", borderRadius: "12px", border: "1px dashed rgba(59, 130, 246, 0.2)" }}>
            <h4 style={{ fontSize: "0.9rem", color: "#3b82f6", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
               <Landmark size={16} /> Home Loan Tip
            </h4>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6 }}>
               Making one extra EMI payment every year or increasing your EMI by 5% annually can reduce your 20-year loan tenure by over 5 years.
            </p>
         </div>
      </div>

      {/* Results */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
         <div className="card" style={{ padding: "2rem", textAlign: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
            <div style={{ color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Monthly EMI</div>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#3b82f6" }}>₹{numFmt(results.monthlyEmi)}</div>
            
            <div style={{ borderTop: "1px solid rgba(51, 65, 85, 0.5)", margin: "2rem 0", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                  <span style={{ color: "#94a3b8" }}>Principal Amount</span>
                  <span style={{ fontWeight: 700 }}>₹{numFmt(loanAmount)}</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                  <span style={{ color: "#94a3b8" }}>Total Interest</span>
                  <span style={{ fontWeight: 700, color: "#cbd5e1" }}>₹{numFmt(results.totalInterest)}</span>
               </div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                  <span style={{ color: "#94a3b8" }}>Total Payable</span>
                  <span style={{ fontWeight: 700, color: "#3b82f6" }}>₹{numFmt(results.totalPayment)}</span>
               </div>
            </div>

            <button className="btn btn-primary" style={{ width: "100%", background: "#3b82f6" }}>Check Eligibility</button>
         </div>

         <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
               <PieChartIcon size={18} color="#f59e0b" /> Payment Breakdown
            </h3>
            <div style={{ height: "8px", background: "#334155", borderRadius: "4px", overflow: "hidden", display: "flex", marginBottom: "1rem" }}>
               <div style={{ width: `${(loanAmount/results.totalPayment)*100}%`, background: "#3b82f6" }} />
               <div style={{ flex: 1, background: "#f59e0b" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", background: "#3b82f6", borderRadius: "50%" }} />
                  <span style={{ color: "#94a3b8" }}>Principal ({(loanAmount/results.totalPayment*100).toFixed(0)}%)</span>
               </div>
               <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", background: "#f59e0b", borderRadius: "50%" }} />
                  <span style={{ color: "#94a3b8" }}>Interest ({(results.totalInterest/results.totalPayment*100).toFixed(0)}%)</span>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
