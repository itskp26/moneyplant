import { fetchMultipleQuotes } from "@/lib/stocks";

async function getTickerData() {
  try {
    const globalSymbols = [
      "^GSPC", "^IXIC", "^DJI", "^FTSE", "^N225", "^HSI", // Global Indices
      "BTC-USD", "ETH-USD", "SOL-USD", "BNB-USD",       // Crypto
      "EURUSD=X", "GBPUSD=X", "USDJPY=X", "USDINR=X",   // Forex
      "GC=F", "SI=F", "CL=F",                            // Commodities
      "^NSEI", "^BSESN"                                  // India Indices
    ];
    const quotes = await fetchMultipleQuotes(globalSymbols);
    return quotes;
  } catch {
    return [];
  }
}

function fmt(price: number, symbol: string) {
  const isIndian = symbol.includes("INR") || symbol.startsWith("^NSE") || symbol.startsWith("^BSE");
  const sign = isIndian ? "₹" : "$";
  
  if (price > 1000) return `${sign}${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (price > 10) return `${sign}${price.toFixed(2)}`;
  return `${sign}${price.toFixed(4)}`;
}

export default async function TickerBar() {
  const quotes = await getTickerData();

  const items =
    quotes.length > 0
      ? quotes
      : [
          { symbol: "^GSPC", name: "S&P 500", price: 5450, changePercent: 0.65 },
          { symbol: "BTC-USD", name: "Bitcoin", price: 81238, changePercent: 2.1 },
          { symbol: "EURUSD=X", name: "EUR/USD", price: 1.0852, changePercent: 0.12 },
          { symbol: "GC=F", name: "Gold", price: 2350, changePercent: 0.3 },
          { symbol: "^NSEI", name: "Nifty 50", price: 24350, changePercent: 0.4 },
        ];

  const doubled = [...items, ...items];

  return (
    <div
      className="ticker-bar"
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
      {/* Global Live Label */}
      <div
        style={{
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          padding: "0 1rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          fontSize: "0.65rem",
          fontWeight: 800,
          letterSpacing: "0.05em",
          color: "white",
          zIndex: 1,
          textTransform: "uppercase"
        }}
      >
        <span style={{ marginRight: "6px" }}>🌐</span> Global Live
      </div>
      
      <div style={{ overflow: "hidden", flex: 1, position: "relative" }}>
        <div className="ticker-track" style={{ gap: "2.5rem", paddingLeft: "2rem" }}>
          {doubled.map((q, i) => (
            <span
              key={`${q.symbol}-${i}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.75rem" }}
            >
              <span style={{ color: "#64748b", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                {(q.name ?? q.symbol ?? "").replace("-USD", "").replace("=X", "").replace("^", "")}
              </span>
              <span style={{ color: "#f1f5f9", fontWeight: 700, fontFamily: "monospace" }}>
                {fmt(q.price, q.symbol)}
              </span>
              <span
                style={{
                  color: q.changePercent >= 0 ? "#10b981" : "#ef4444",
                  fontWeight: 800,
                  fontSize: "0.7rem"
                }}
              >
                {q.changePercent >= 0 ? "+" : ""}{q.changePercent.toFixed(2)}%
              </span>
              <span style={{ color: "rgba(51,65,85,0.5)", marginLeft: "0.5rem" }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
