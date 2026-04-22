import { type ForexRate } from "@/lib/forex";
import { FOREX_PAIRS } from "@/lib/constants";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  rates: ForexRate[];
  title?: string;
}

export default function ForexTable({ rates, title }: Props) {
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      {title && (
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(51,65,85,0.5)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>{title}</h3>
          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Real-time Rates</span>
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Currency Pair</th>
              <th style={{ textAlign: "right" }}>Rate</th>
              <th style={{ textAlign: "right" }}>Change</th>
              <th style={{ textAlign: "right" }}>% Change</th>
              <th style={{ textAlign: "right" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => {
              const pairInfo = FOREX_PAIRS.find(p => p.symbol === r.pair);
              if (!pairInfo) return null;
              
              const pos = r.changePercent > 0;
              const neg = r.changePercent < 0;
              
              return (
                <tr key={r.pair}>
                  <td>
                    <Link href={`/forex/${pairInfo.id}`} style={{ textDecoration: "none" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                         <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#3b82f6" }}>{pairInfo.base} / {pairInfo.quote}</span>
                         <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{pairInfo.name}</span>
                      </div>
                    </Link>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 700, color: "#f1f5f9", fontSize: "1rem" }}>
                    {r.rate.toFixed(4)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span style={{ color: pos ? "#10b981" : neg ? "#ef4444" : "#94a3b8", fontWeight: 600, fontSize: "0.85rem" }}>
                      {pos ? "+" : ""}{r.change.toFixed(4)}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span className={`badge ${pos ? "badge-green" : neg ? "badge-red" : ""}`} style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                      {pos ? <TrendingUp size={11} /> : neg ? <TrendingDown size={11} /> : <Minus size={11} />}
                      {r.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                     <span style={{ fontSize: "0.7rem", color: "#475569", background: "rgba(71, 85, 105, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                        ACTIVE
                     </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
