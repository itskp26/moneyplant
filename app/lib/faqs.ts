import { getGlobalLocations } from "./locationKeywords";

export interface FAQ {
  q: string;
  a: string;
}

const FAQ_TEMPLATES = [
  {
    q: "What is the Bitcoin price in {location} today?",
    a: "In {location}, Bitcoin (BTC) is currently trading at global market rates. Investors in {location} use MoneyPlant's real-time terminal to track BTC in USD and local currencies with second-by-second updates."
  },
  {
    q: "How to buy gold in {location} at best rates?",
    a: "Gold prices in {location} are influenced by international COMEX spot prices. To get the best rates in {location}, monitor our live 24K and 22K gold rate charts which update every minute based on global benchmark data."
  },
  {
    q: "What are the top 5 stocks to watch in {location} this week?",
    a: "Traders in {location} are focusing on high-growth global assets and major indices. Whether you are in London, Edinburgh, or Tokyo, MoneyPlant's intelligence hub highlights the most active stocks and breakout opportunities."
  },
  {
    q: "Is crypto trading legal and tracked in {location}?",
    a: "Regulatory frameworks for crypto vary by region. For residents in {location}, it's essential to use platforms that comply with local guidelines while accessing global liquidity. MoneyPlant provides the data you need to trade safely."
  },
  {
    q: "What is the current USD/INR impact on {location} investors?",
    a: "The USD to INR exchange rate is a key indicator for global emerging markets. Investors in {location} track this pair to understand international trade dynamics and currency volatility."
  },
  {
    q: "Best investment strategy for {location} in 2026?",
    a: "A diversified portfolio including global indices (S&P 500), crypto (BTC/ETH), and commodities (Gold) is recommended for long-term growth in {location}. Use our market analysis tools to build your strategy."
  },
  {
    q: "How to track Nifty 50 and Sensex from {location}?",
    a: "Global investors in {location} can access live NSE and BSE data on MoneyPlant24.com. We provide a seamless interface to monitor Indian markets alongside global assets like NASDAQ and FTSE."
  },
  {
    q: "What time does the market open in {location}?",
    a: "Market hours depend on the specific exchange. While MoneyPlant provides 24/7 crypto data, our global indices section covers opening and closing times for all major world markets relative to {location} time."
  }
];

export function getGlobalFaqs(): FAQ[] {
  const locations = getGlobalLocations();
  const allFaqs: FAQ[] = [];

  // Use a predictable but rotating seed based on a 2-hour window
  const timeWindowMs = 2 * 60 * 60 * 1000;
  const currentWindowIndex = Math.floor(Date.now() / timeWindowMs);
  
  // Create a massive pool of FAQs
  const poolLocations = locations.slice(0, 1000); // Larger pool
  
  for (let i = 0; i < poolLocations.length; i++) {
    const loc = poolLocations[i];
    const capitalizedLoc = loc.charAt(0).toUpperCase() + loc.slice(1);
    const templateIndex = (i + currentWindowIndex) % FAQ_TEMPLATES.length;
    const t = FAQ_TEMPLATES[templateIndex];
    allFaqs.push({
      q: t.q.replace(/{location}/g, capitalizedLoc),
      a: t.a.replace(/{location}/g, capitalizedLoc)
    });
  }

  const batchSize = 8;
  const totalBatches = Math.floor(allFaqs.length / batchSize);
  const currentBatchIndex = currentWindowIndex % totalBatches;
  
  const start = currentBatchIndex * batchSize;
  return allFaqs.slice(start, start + batchSize);
}
