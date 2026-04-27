// ─── Yahoo Finance Quote Fetcher ──────────────────────────────────────────────
export interface Quote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  name?: string;
  high52?: number;
  low52?: number;
  previousClose?: number;
  open?: number;
  dayHigh?: number;
  dayLow?: number;
  pe?: number;
  exchange?: string;
}

const YF_BASE = "https://query1.finance.yahoo.com";

// Add .NS suffix for NSE-traded stocks
function toNseSymbol(symbol: string) {
  // Exclude indices (^), forex (=X), already-suffixed (.NS/.BO etc.)
  // and futures contracts (=F) like GC=F, SI=F, CL=F, BZ=F
  const upper = symbol.toUpperCase();
  if (upper.startsWith("^") || upper.includes("=X") || upper.includes("=F") || upper.includes(".")) return upper;
  return `${upper}.NS`;
}

export async function fetchQuote(symbol: string): Promise<Quote | null> {
  try {
    const ySymbol = toNseSymbol(symbol);
    const url = `${YF_BASE}/v8/finance/chart/${encodeURIComponent(ySymbol)}?interval=1d&range=1d`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta) return null;
    
    const price = meta.regularMarketPrice ?? 0;
    // Yahoo Finance can be tricky with previous close location
    const prev = meta.previousClose ?? 
                 meta.chartPreviousClose ?? 
                 meta.regularMarketPreviousClose ??
                 price;
                 
    const change = price - prev;
    const changePercent = prev !== 0 ? (change / prev) * 100 : 0;
    
    return {
      symbol: meta.symbol,
      price,
      change,
      changePercent,
      volume: meta.regularMarketVolume ?? 0,
      marketCap: meta.marketCap,
      name: meta.shortName ?? meta.longName ?? symbol,
      high52: meta.fiftyTwoWeekHigh,
      low52: meta.fiftyTwoWeekLow,
      previousClose: prev,
      open: meta.regularMarketOpen,
      dayHigh: meta.regularMarketDayHigh,
      dayLow: meta.regularMarketDayLow,
      exchange: meta.exchangeName,
    };
  } catch {
    return null;
  }
}

export async function fetchMultipleQuotes(symbols: string[]): Promise<Quote[]> {
  const results = await Promise.allSettled(symbols.map(fetchQuote));
  return results
    .filter((r): r is PromiseFulfilledResult<Quote | null> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((q): q is Quote => q !== null);
}

// ─── Screener-style detailed stock info ───────────────────────────────────────
export interface StockDetail extends Quote {
  sector?: string;
  industry?: string;
  eps?: number;
  pbRatio?: number;
  debtToEquity?: number;
  roe?: number;
  dividendYield?: number;
  description?: string;
}

export async function fetchStockDetail(symbol: string): Promise<StockDetail | null> {
  try {
    const ySymbol = toNseSymbol(symbol);
    const url = `${YF_BASE}/v10/finance/quoteSummary/${encodeURIComponent(ySymbol)}?modules=summaryDetail,defaultKeyStatistics,assetProfile,financialData`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
      const basic = await fetchQuote(symbol);
      return basic;
    }
    const json = await res.json();
    const summary = json?.quoteSummary?.result?.[0];
    const fin = summary?.financialData;
    const stats = summary?.defaultKeyStatistics;
    const profile = summary?.assetProfile;
    const detail = summary?.summaryDetail;
    const basic = await fetchQuote(symbol);
    if (!basic) return null;
    return {
      ...basic,
      sector: profile?.sector,
      industry: profile?.industry,
      description: profile?.longBusinessSummary,
      eps: stats?.trailingEps?.raw,
      pe: detail?.trailingPE?.raw,
      pbRatio: stats?.priceToBook?.raw,
      debtToEquity: fin?.debtToEquity?.raw,
      roe: fin?.returnOnEquity?.raw ? fin.returnOnEquity.raw * 100 : undefined,
      dividendYield: detail?.dividendYield?.raw ? detail.dividendYield.raw * 100 : undefined,
    };
  } catch {
    return await fetchQuote(symbol);
  }
}

// ─── Top Gainers / Losers ─────────────────────────────────────────────────────
export async function fetchTopMovers(symbols: string[], type: "gainers" | "losers" | "active") {
  const quotes = await fetchMultipleQuotes(symbols);
  if (type === "gainers") return quotes.sort((a, b) => b.changePercent - a.changePercent).slice(0, 20);
  if (type === "losers") return quotes.sort((a, b) => a.changePercent - b.changePercent).slice(0, 20);
  return quotes.sort((a, b) => b.volume - a.volume).slice(0, 20);
}
