import { fetchMultipleQuotes } from "@/lib/stocks";
import { NIFTY50_STOCKS, GLOBAL_INDICES } from "@/lib/constants";

async function getTickerData() {
  try {
    const indiaSymbols = ["^NSEI", "^BSESN", "^NSEBANK", ...NIFTY50_STOCKS.slice(0, 15)];
    const globalSymbols = GLOBAL_INDICES.slice(0, 5).map((i) => i.symbol);
    const cryptoStubs = ["BTC-USD", "ETH-USD"];
    const forexStubs = ["USDINR=X", "EURINR=X"];
    const allSymbols = [...indiaSymbols, ...globalSymbols, ...cryptoStubs, ...forexStubs];
    const quotes = await fetchMultipleQuotes(allSymbols);
    return quotes;
  } catch {
    return [];
  }
}

function fmt(price: number) {
  if (price > 1000) return price.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  if (price > 10) return price.toFixed(2);
  return price.toFixed(4);
}

export default async function TickerBar() {
  const quotes = await getTickerData();

  const items =
    quotes.length > 0
      ? quotes
      : [
          { symbol: "^NSEI", name: "Nifty 50", price: 22500, changePercent: 0.4 },
          { symbol: "^BSESN", name: "Sensex", price: 74000, changePercent: 0.35 },
          { symbol: "RELIANCE", name: "Reliance", price: 2850, changePercent: -0.8 },
          { symbol: "TCS", name: "TCS", price: 3600, changePercent: 1.2 },
          { symbol: "USDINR=X", name: "USD/INR", price: 83.5, changePercent: 0.1 },
          { symbol: "BTC-USD", name: "Bitcoin", price: 67000, changePercent: 2.1 },
        ];

  const doubled = [...items, ...items]; // double for seamless loop

  return (
    <div
      style={{
        background: "#020817",
        borderBottom: "1px solid rgba(51,65,85,0.4)",
        height: "36px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        position: "sticky",
        top: 0,
        zIndex: 60,
      }}
    >
      {/* Label */}
      <div
        style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          padding: "0 1rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "white",
          zIndex: 1,
        }}
      >
        🇮🇳 LIVE
      </div>
      <div style={{ overflow: "hidden", flex: 1, position: "relative" }}>
        <div className="ticker-track" style={{ gap: "2rem", paddingLeft: "2rem" }}>
          {doubled.map((q, i) => (
            <span
              key={`${q.symbol}-${i}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem" }}
            >
              <span style={{ color: "#94a3b8", fontWeight: 500 }}>
                {(q.name ?? q.symbol ?? "").replace(".NS", "")}
              </span>
              <span style={{ color: "#f1f5f9", fontWeight: 600 }}>₹{fmt(q.price)}</span>
              <span
                style={{
                  color: q.changePercent >= 0 ? "#10b981" : "#ef4444",
                  fontWeight: 600,
                }}
              >
                {q.changePercent >= 0 ? "▲" : "▼"} {Math.abs(q.changePercent).toFixed(2)}%
              </span>
              <span style={{ color: "#334155", marginLeft: "0.5rem" }}>|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
