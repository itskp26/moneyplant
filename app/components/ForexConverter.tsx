"use client";
import { useState } from "react";
import { RefreshCcw, ArrowRightLeft } from "lucide-react";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "AED", "SAR"];

export default function ForexConverter({ initialRates }: { initialRates: any[] }) {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const getRate = (f: string, t: string) => {
    if (f === t) return 1;
    // Find pair directly
    const pair = initialRates.find(r => r.base === f && r.quote === t);
    if (pair) return pair.rate;
    
    // Cross rate via USD if not found directly
    const fToUsd = initialRates.find(r => r.base === f && r.quote === "USD")?.rate || 1 / (initialRates.find(r => r.base === "USD" && r.quote === f)?.rate || 1);
    const usdToT = initialRates.find(r => r.base === "USD" && r.quote === t)?.rate || 1 / (initialRates.find(r => r.base === t && r.quote === "USD")?.rate || 1);
    
    if (f === "USD") return usdToT;
    if (t === "USD") return fToUsd;
    
    return fToUsd * usdToT;
  };

  const rate = getRate(from, to);
  const result = amount * rate;

  return (
    <div className="card" style={{ padding: "2rem", background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(20px)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "24px" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <RefreshCcw size={20} color="#10b981" /> Currency Converter
      </h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" }}>Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "rgba(2, 8, 23, 0.5)", border: "1px solid rgba(51, 65, 85, 0.5)", color: "#f1f5f9", fontSize: "1.1rem", fontWeight: 700 }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", alignItems: "center", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" }}>From</label>
            <select 
              value={from} 
              onChange={(e) => setFrom(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "rgba(2, 8, 23, 0.5)", border: "1px solid rgba(51, 65, 85, 0.5)", color: "#f1f5f9", fontWeight: 600 }}
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button 
              onClick={() => { setFrom(to); setTo(from); }}
              style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.3)", color: "#3b82f6", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" }}>To</label>
            <select 
              value={to} 
              onChange={(e) => setTo(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "rgba(2, 8, 23, 0.5)", border: "1px solid rgba(51, 65, 85, 0.5)", color: "#f1f5f9", fontWeight: 600 }}
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginTop: "1rem", padding: "1.5rem", background: "rgba(16, 185, 129, 0.05)", borderRadius: "16px", border: "1px dashed rgba(16, 185, 129, 0.3)", textAlign: "center" }}>
          <div style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "4px" }}>{amount} {from} equals</div>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: "#f1f5f9", fontFamily: "var(--font-sora)" }}>
            {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {to}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700, marginTop: "8px" }}>
            1 {from} = {rate.toFixed(4)} {to}
          </div>
        </div>
      </div>
    </div>
  );
}
