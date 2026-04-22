import { fetchQuote } from "./stocks";
import { FOREX_PAIRS } from "./constants";

export interface ForexRate {
  pair: string;
  base: string;
  quote: string;
  rate: number;
  change: number;
  changePercent: number;
  name: string;
}

export async function fetchForexRate(symbol: string, base: string, quote: string, name: string): Promise<ForexRate | null> {
  const q = await fetchQuote(symbol);
  if (!q) return null;
  return {
    pair: symbol,
    base,
    quote,
    rate: q.price,
    change: q.change,
    changePercent: q.changePercent,
    name,
  };
}

export async function fetchAllForexRates() {
  const results = await Promise.allSettled(
    FOREX_PAIRS.map((p) => fetchForexRate(p.symbol, p.base, p.quote, p.name))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<ForexRate | null> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((r): r is ForexRate => r !== null);
}

// Gold and silver via Yahoo Finance MCX futures (approximate)
export async function fetchCommodityPrice(commodity: "gold" | "silver" | "crude-oil") {
  const symbolMap: Record<string, string> = {
    gold: "GC=F",
    silver: "SI=F",
    "crude-oil": "CL=F",
  };
  // Also fetch USD/INR to convert
  const [commodity_q, forex_q] = await Promise.all([
    fetchQuote(symbolMap[commodity]),
    fetchQuote("USDINR=X"),
  ]);
  if (!commodity_q || !forex_q) return null;
  const usdInr = forex_q.price;

  if (commodity === "gold") {
    // Gold futures: troy oz USD → grams INR → 10 grams
    const pricePerOzUsd = commodity_q.price;
    const pricePerGramInr = (pricePerOzUsd / 31.1035) * usdInr;
    const pricePer10gInr = pricePerGramInr * 10;
    return { price: pricePer10gInr, priceUsd: pricePerOzUsd, change: commodity_q.change, changePercent: commodity_q.changePercent, unit: "10g" };
  }
  if (commodity === "silver") {
    const pricePerOzUsd = commodity_q.price;
    const pricePerKgInr = (pricePerOzUsd / 31.1035) * 1000 * usdInr;
    return { price: pricePerKgInr, priceUsd: pricePerOzUsd, change: commodity_q.change, changePercent: commodity_q.changePercent, unit: "kg" };
  }
  // Crude oil per barrel in INR
  const priceInr = commodity_q.price * usdInr;
  return { price: priceInr, priceUsd: commodity_q.price, change: commodity_q.change, changePercent: commodity_q.changePercent, unit: "barrel" };
}
