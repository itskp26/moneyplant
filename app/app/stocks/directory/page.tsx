import type { Metadata } from "next";
import Link from "next/link";
import { 
  ADANI_STOCKS, RELIANCE_STOCKS, TATA_STOCKS, BAJAJ_STOCKS, 
  MAHINDRA_STOCKS, BIRLA_STOCKS, HDFC_STOCKS, ICICI_STOCKS, 
  SBI_STOCKS, KOTAK_STOCKS, GODREJ_STOCKS, JSW_STOCKS, 
  VEDANTA_STOCKS, ITC_STOCKS, LT_STOCKS, WIPRO_STOCKS, 
  INFOSYS_STOCKS, HCL_STOCKS, MARUTI_STOCKS, PSU_STOCKS, 
  PHARMA_STOCKS, IT_STOCKS, BANK_STOCKS, AUTO_STOCKS, 
  FMCG_STOCKS, REALTY_STOCKS, NIFTY50_STOCKS, NIFTY_NEXT50 
} from "@/lib/constants";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `A-Z Stocks Directory ${new Date().getFullYear()} | Full Listed Companies List | MoneyPlant`,
  description: `Complete A-Z directory of all listed stocks on MoneyPlant. Browse over 300+ NSE and BSE listed companies across IT, Banking, FMCG, and major conglomerates.`,
  keywords: "stocks directory, list of stocks, all nse stocks, nse companies list, bse companies list, indian stock market companies",
};

export default function StockDirectoryPage() {
  // Combine all stock objects from conglomerates and sectors
  const allStockObjects = [
    ...ADANI_STOCKS, ...RELIANCE_STOCKS, ...TATA_STOCKS, ...BAJAJ_STOCKS,
    ...MAHINDRA_STOCKS, ...BIRLA_STOCKS, ...HDFC_STOCKS, ...ICICI_STOCKS,
    ...SBI_STOCKS, ...KOTAK_STOCKS, ...GODREJ_STOCKS, ...JSW_STOCKS,
    ...VEDANTA_STOCKS, ...ITC_STOCKS, ...LT_STOCKS, ...WIPRO_STOCKS,
    ...INFOSYS_STOCKS, ...HCL_STOCKS, ...MARUTI_STOCKS, ...PSU_STOCKS,
    ...PHARMA_STOCKS, ...IT_STOCKS, ...BANK_STOCKS, ...AUTO_STOCKS,
    ...FMCG_STOCKS, ...REALTY_STOCKS
  ];

  // Also include the string arrays (NIFTY50, NIFTY_NEXT50) by mapping them to basic objects
  const niftyObjects = [...NIFTY50_STOCKS, ...NIFTY_NEXT50].map(symbol => ({
    symbol,
    name: symbol, // Fallback name
    sector: "Nifty Component",
    unlisted: false
  }));

  const combined = [...allStockObjects, ...niftyObjects];

  // Deduplicate by symbol and filter out unlisted ones
  const uniqueStocksMap = new Map();
  combined.forEach(stock => {
    // Only add if not unlisted and not already in map
    if (!stock.unlisted && !uniqueStocksMap.has(stock.symbol)) {
      uniqueStocksMap.set(stock.symbol, stock);
    }
  });

  const uniqueStocks = Array.from(uniqueStocksMap.values());
  
  // Sort alphabetically by symbol
  uniqueStocks.sort((a, b) => a.symbol.localeCompare(b.symbol));

  // Group by first letter
  const groupedStocks: Record<string, typeof uniqueStocks> = {};
  uniqueStocks.forEach(stock => {
    const firstLetter = stock.symbol.charAt(0).toUpperCase();
    if (!groupedStocks[firstLetter]) {
      groupedStocks[firstLetter] = [];
    }
    groupedStocks[firstLetter].push(stock);
  });

  const alphabet = Object.keys(groupedStocks).sort();

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Stocks", url: "/stocks" },
        { name: "Directory", url: "/stocks/directory" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", fontFamily: "var(--font-sora)" }}>
            A-Z Stocks Directory
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Browse our complete database of NSE/BSE listed companies. Track real-time prices, charts, and fundamentals for hundreds of Indian stocks.
          </p>
        </div>

        {/* Quick Jump Alphabet */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "8px", 
          justifyContent: "center",
          marginBottom: "3rem",
          background: "rgba(30, 41, 59, 0.4)",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(51, 65, 85, 0.4)"
        }}>
          {alphabet.map(letter => (
            <a 
              key={letter} 
              href={`#letter-${letter}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                background: "#0f172a",
                borderRadius: "8px",
                color: "#3b82f6",
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#3b82f6";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#0f172a";
                e.currentTarget.style.color = "#3b82f6";
              }}
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Stock Lists Grouped by Letter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {alphabet.map(letter => (
            <div key={letter} id={`letter-${letter}`} style={{ scrollMarginTop: "100px" }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem", 
                marginBottom: "1.5rem",
                borderBottom: "1px solid rgba(51, 65, 85, 0.4)",
                paddingBottom: "0.5rem"
              }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: 0, color: "#f1f5f9" }}>{letter}</h2>
                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>
                  {groupedStocks[letter].length} stocks
                </span>
              </div>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                gap: "1rem" 
              }}>
                {groupedStocks[letter].map(stock => (
                  <Link 
                    key={stock.symbol} 
                    href={`/stocks/${stock.symbol.toLowerCase()}`}
                    style={{
                      padding: "1rem",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(51, 65, 85, 0.4)",
                      borderRadius: "8px",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
                      e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.4)";
                      e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1.05rem" }}>
                      {stock.symbol}
                    </div>
                    {stock.name !== stock.symbol && (
                      <div style={{ fontSize: "0.8rem", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {stock.name}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
