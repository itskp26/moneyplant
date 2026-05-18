import { NextResponse } from "next/server";
import { fetchQuote } from "@/lib/stocks";
import { fetchCryptoDetail } from "@/lib/crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");
    const type = searchParams.get("type") || "stock";

    if (!symbol) {
      return NextResponse.json({ error: "Missing symbol" }, { status: 400 });
    }

    if (type === "crypto") {
      const crypto = await fetchCryptoDetail(symbol);
      if (!crypto) {
        return NextResponse.json({ error: "Crypto not found" }, { status: 404 });
      }
      return NextResponse.json({
        price: crypto.priceUsd,
        change: crypto.change24h,
        changePercent: crypto.change24h, // coingecko returns 24h change pct
      });
    }

    // Stocks, Forex, Indices, Commodities
    const quote = await fetchQuote(symbol);
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json({
      price: quote.price,
      change: quote.change,
      changePercent: quote.changePercent,
    });
  } catch (error) {
    console.error("API error fetching quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
