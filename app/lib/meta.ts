import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TWITTER, OG_IMAGE } from "./constants";
import type { Metadata } from "next";

// ─── DYNAMIC YEAR & TIME HELPERS ──────────────────────────────────────────────
function y() { return new Date().getFullYear(); }           // e.g. 2025
function yn() { return new Date().getFullYear() + 1; }     // e.g. 2026
function yp() { return new Date().getFullYear() - 1; }     // e.g. 2024
function month() { return new Date().toLocaleString("en-US", { month: "long" }); } // e.g. "April"

// Generate year-aware keyword variants for any term
function yearKeys(term: string): string[] {
  return [term, `${term} ${y()}`, `${term} ${yn()}`, `${term} ${month()} ${y()}`];
}

// Generate time-period keywords (daily, weekly, monthly)
function periodKeys(term: string): string[] {
  return [
    term,
    `${term} today`,
    `${term} this week`,
    `${term} weekly`,
    `${term} 1 week`,
    `${term} 7 days`,
    `${term} this month`,
    `${term} monthly`,
    `${term} 30 days`,
    `${term} last 7 days`,
    `${term} last 30 days`,
  ];
}

// ─── SHARED BASE METADATA ─────────────────────────────────────────────────────
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: "MoneyPlant Editorial Team", url: SITE_URL }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Live Finance Data India`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_TWITTER,
    creator: SITE_TWITTER,
    images: [OG_IMAGE],
  },
  verification: {
    google: "moneyplant-google-verification",
  },
  other: {
    "geo.region": "IN",
    "geo.country": "India",
    "geo.placename": "India",
    ICBM: "20.5937, 78.9629",
    "DC.language": "en",
    "DC.title": SITE_NAME,
    "DC.description": SITE_DESCRIPTION,
    "DC.subject": "Finance, Stock Market, Nifty 50, Sensex, Crypto, Forex",
    "DC.publisher": SITE_NAME,
    "DC.type": "Text",
    "DC.format": "text/html",
    "DC.identifier": SITE_URL,
    "DC.coverage": "India, Global",
    "rating": "general",
    "revisit-after": "1 days",
    "distribution": "global",
    "language": "English",
    "category": "Finance, Stock Market, Investment",
    "classification": "Finance/Investment",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": SITE_NAME,
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    "theme-color": "#0f172a",
    "msapplication-TileColor": "#0f172a",
    "msapplication-navbutton-color": "#0f172a",
    "news_keywords": "Nifty 50, Sensex, BSE, NSE, stock market India, stock market today",
  },
};

// ─── HOMEPAGE META ────────────────────────────────────────────────────────────
export function getHomeMeta(): Metadata {
  const title = `MoneyPlant — World Finance Portal | Stock Market India, Crypto, Forex & Commodities ${y()}`;
  const description =
    `Real-time international market tracker and India's NSE/BSE live terminal. Access benchmark data for stocks, Bitcoin, Gold rates, and world exchange rates. Your universal finance dashboard ${y()}.`;
  const keywords = [
    // EXISTING (all preserved)
    "nifty 50 today", "nifty 50 live price", "nifty today", "nifty 50 price today",
    "sensex today", "sensex live", "bse sensex today", "stock market india today",
    "nse live", "bse live", "share market today india", "top 10 stocks india",
    "top 10 stocks nse today", "best stocks to buy today india", "nifty 50 stocks list",
    "stock market opening today", "indian stock market news", "market today india",
    "stock price today india", "bitcoin price india today", "bitcoin price in rupees",
    "btc price inr", "ethereum price india", "crypto price in india",
    "usd to inr today", "dollar rate today india", "gold rate today india",
    "silver rate today india", "crude oil price india", "best shares to buy today",
    "where to invest money india", "mutual funds india", "ipo today india",
    "upcoming ipo 2025", "s&p 500 today", "dow jones today", "nasdaq today",
    "global stock market today", "forex rate india today", "currency rate today india",
    "moneyplant finance", "live market data india", "top gainers nse today",
    "top losers nse today", "most active stocks india", "52 week high stocks india",
    "52 week low stocks india", "market cap india", "india stock market index",
    "nifty bank today", "bank nifty live", "nifty it today", "nifty pharma today",
    "nifty auto today", "nifty fmcg", "nifty metal", "nifty real estate",
    "smallcap stocks india", "midcap stocks india", "large cap stocks india",
    "blue chip stocks india", "penny stocks india", "stock tips india",
    "zerodha market watch", "groww market", "moneycontrol live",
    "economic times markets", "screener.in stocks", "trading today india",
    "intraday stocks today", "swing trading india", "value investing india",
    "rakesh jhunjhunwala portfolio", "warren buffett india stocks",
    "FII DII data today", "foreign institutional investors india",
    // NEW: Dynamic year-based
    `top 20 stocks india ${y()}`, `top 20 stocks ${y()}`, `top 20 stocks to buy ${y()}`,
    `best 20 stocks india ${y()}`, `top 20 stocks nse ${y()}`, `top 20 stocks bse ${y()}`,
    `top 20 stocks ${yn()}`, `best stocks to invest ${y()}`, `top stocks india ${y()}`,
    `multibagger stocks ${y()}`, `best performing stocks ${y()}`, `stocks to watch ${y()}`,
    `best investment ${y()}`, `where to invest in ${y()}`, `stock picks ${y()}`,
    `top 20 gainers ${y()}`, `top 20 losers ${y()}`, `most active stocks ${y()}`,
    // NEW: Tricky intent keywords
    "52 week high stocks list today", "52 week high stocks list nse bse",
    "stocks hitting 52 week high today", "breakout stocks today india",
    "stocks at all time high today", "which stocks are up today",
    "which stocks are down today", "stocks to buy today nse",
    "stocks to avoid today india", "best intraday stock today",
    "pre market gainers india", "after hours movers india",
    "what is happening in stock market today", "why market is up today",
    "why market is down today", "market crash today india",
    "today stock market news", "market rally today india",
    "real time market rates", "financial dashboard india",
    "market overview today india", "fear and greed index india",
    "inflation rate india today", "commodity prices today india",
    "investment tracker india", "portfolio tracker india",
    // NEW: Global + comparison
    `dow jones vs nifty ${y()}`, `nasdaq vs sensex ${y()}`,
    "india vs us stock market today", "emerging markets today",
    "nifty 50 vs s&p 500", "global market impact india today",
    // ─── GLOBAL — USA ───────────────────────────────────────────────────────────
    "stock market usa today", "us market live", "s&p 500 live", "dow jones live",
    "nasdaq live", "nyse today", "us stocks to buy today",
    "bitcoin price usa", "btc price usd today", "gold price usa today",
    "dollar rate today usa", "usd exchange rate world",
    // ─── GLOBAL — UK ────────────────────────────────────────────────────────────
    "stock market uk today", "ftse 100 live", "pound to dollar today",
    "bitcoin price uk today", "gold price uk today", "pound rate today",
    "gbp usd today", "uk shares live today",
    // ─── GLOBAL — UAE / Dubai ───────────────────────────────────────────────────
    "stock market uae today", "dfm today", "adx today",
    "bitcoin price dubai today", "gold price dubai today", "gold rate uae today",
    "aed to inr today", "aed to usd today", "dirham rate today",
    "gold price in dubai per gram today", "22k gold rate dubai today",
    // ─── GLOBAL — Saudi Arabia ──────────────────────────────────────────────────
    "stock market saudi arabia today", "tadawul today", "tasi index today",
    "bitcoin price saudi today", "gold price saudi today", "gold rate riyadh today",
    "sar to inr today", "sar to usd today", "riyal rate today",
    // ─── GLOBAL — Kuwait / Qatar / Bahrain / Oman ───────────────────────────────
    "gold rate kuwait today", "gold price kuwait today", "kwd to inr today",
    "gold rate qatar today", "gold price doha today", "qar to inr today",
    "gold rate bahrain today", "gold rate oman today", "omr to inr today",
    // ─── GLOBAL — Pakistan ──────────────────────────────────────────────────────
    "stock market pakistan today", "kse 100 today", "psx today",
    "bitcoin price pakistan today", "gold rate pakistan today", "gold price pkr today",
    "dollar rate pakistan today", "pkr to usd today", "pkr to inr today",
    // ─── GLOBAL — Bangladesh ────────────────────────────────────────────────────
    "stock market bangladesh today", "dse today", "cse dhaka today",
    "bitcoin price bangladesh today", "gold rate bangladesh today",
    "dollar rate bangladesh today", "bdt to usd today",
    // ─── GLOBAL — Singapore ─────────────────────────────────────────────────────
    "stock market singapore today", "sti index today", "sgx today",
    "bitcoin price singapore today", "gold rate singapore today",
    "sgd to usd today", "sgd to inr today",
    // ─── GLOBAL — Australia ─────────────────────────────────────────────────────
    "stock market australia today", "asx 200 today", "asx live",
    "bitcoin price australia today", "gold price australia today",
    "aud to usd today", "aud to inr today",
    // ─── GLOBAL — Canada ────────────────────────────────────────────────────────
    "stock market canada today", "tsx today", "s&p tsx today",
    "bitcoin price canada today", "gold price canada today",
    "cad to usd today", "cad to inr today",
    // ─── GLOBAL — Europe ────────────────────────────────────────────────────────
    "stock market europe today", "dax today", "cac 40 today", "ftse today",
    "bitcoin price europe today", "bitcoin price eur today",
    "gold price europe today", "euro to dollar today", "eur usd today",
    "germany stock market today", "france stock market today",
    // ─── GLOBAL — Asia Pacific ──────────────────────────────────────────────────
    "stock market japan today", "nikkei 225 today", "topix today",
    "stock market china today", "shanghai index today", "hang seng today",
    "stock market korea today", "kospi today", "kosdaq today",
    "stock market malaysia today", "klci today",
    "stock market indonesia today", "jci today",
    "stock market philippines today", "pse index today",
    "stock market thailand today", "set index today",
    "stock market vietnam today", "vni index today",
    // ─── GLOBAL — Africa ─────────────────────────────────────────────────────────
    "stock market nigeria today", "ngx today", "bitcoin price nigeria today",
    "stock market south africa today", "jse today",
    "stock market kenya today", "nse kenya today", "gold rate nigeria today",
    "stock market egypt today", "egx today",
    // ─── GLOBAL — Americas ───────────────────────────────────────────────────────
    "stock market brazil today", "bovespa today", "b3 today",
    "stock market mexico today", "ipc index today",
    "bitcoin price brazil today", "bitcoin price argentina today",
    // ─── GLOBAL — General World ──────────────────────────────────────────────────
    "world stock market live", "global financial news today",
    "world economy today", "global recession news", "world market hours today",
    "international finance news", "world currency rates today",
    "global investment news today", "world markets live today",
    `world finance ${y()}`, `global investment ${y()}`,
    `top 20 stocks world ${y()}`, `best global assets ${y()}`,
  ].join(", ");
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "MoneyPlant Live Finance India" }],
    },
    twitter: { title, description, images: [OG_IMAGE] },
    alternates: { canonical: SITE_URL },
  };
}

// ─── STOCK PAGE META ──────────────────────────────────────────────────────────
export function getStockMeta(symbol: string, name: string, price?: string, change?: string): Metadata {
  const title = `${name} Share Price Today ${y()} | ${symbol} NSE Live Rate | ₹${price ?? "—"}`;
  const description = `Live ${name} (${symbol}) share price today ${y()} on NSE/BSE. ₹${price ?? "—"} ${change ? `(${change}%)` : ""}. Monitor real-time chart, 52-week data, market cap, and expert stock analysis on MoneyPlant.`;
  const keywords = [
    // EXISTING
    `${name.toLowerCase()} share price`, `${symbol.toLowerCase()} share price today`,
    `${name.toLowerCase()} stock price`, `${symbol.toLowerCase()} nse`, `${symbol.toLowerCase()} bse`,
    `${name.toLowerCase()} today`, `${name.toLowerCase()} price today`, `${name.toLowerCase()} live price`,
    `${name.toLowerCase()} stock`, `${name.toLowerCase()} share price today live`,
    `${symbol.toLowerCase()} stock price`, `${name.toLowerCase()} 52 week high`,
    `${name.toLowerCase()} 52 week low`, `${name.toLowerCase()} market cap`,
    `${name.toLowerCase()} dividend`, `${name.toLowerCase()} annual report`,
    `${name.toLowerCase()} target price`, `${name.toLowerCase()} chart`,
    `${name.toLowerCase()} technical analysis`, `${name.toLowerCase()} fundamental analysis`,
    `${name.toLowerCase()} eps`, `${name.toLowerCase()} pe ratio`,
    `${name.toLowerCase()} book value`, `${name.toLowerCase()} roe`,
    `${name.toLowerCase()} promoter holding`, `${name.toLowerCase()} fii holding`,
    `${name.toLowerCase()} dii holding`, `${name.toLowerCase()} quarterly results`,
    `${name.toLowerCase()} financial results`, `${name.toLowerCase()} stock analysis`,
    `${name.toLowerCase()} buy or sell`, `${name.toLowerCase()} today news`,
    `is ${name.toLowerCase()} good to buy`, `${symbol.toLowerCase()} price history`,
    `${symbol.toLowerCase()} all time high`, `${symbol.toLowerCase()} nse share price`,
    `${symbol.toLowerCase()} bse share price`, `${symbol.toLowerCase()} live`,
    `${symbol.toLowerCase()} chart`, `buy ${name.toLowerCase()} stock india`,
    `${name.toLowerCase()} investors`,
    // NEW: Year-dynamic
    ...yearKeys(`${name.toLowerCase()} target price`),
    ...yearKeys(`${name.toLowerCase()} prediction`),
    ...yearKeys(`${symbol.toLowerCase()} target`),
    `${name.toLowerCase()} share price ${y()}`, `${name.toLowerCase()} stock ${y()}`,
    `best time to buy ${name.toLowerCase()}`, `should i buy ${symbol.toLowerCase()} today`,
    `${name.toLowerCase()} 1 week performance`, `${name.toLowerCase()} 1 month return`,
    `${name.toLowerCase()} 52 week return`, `${name.toLowerCase()} 3 month performance`,
    `${name.toLowerCase()} 6 month performance`, `${name.toLowerCase()} ytd return`,
    `${name.toLowerCase()} weekly gain loss`, `${name.toLowerCase()} weekly change`,
    `top 20 stocks india ${y()}`, `is ${name.toLowerCase()} in top 20 stocks`,
    `${name.toLowerCase()} upcoming events`, `${name.toLowerCase()} next earnings date`,
  ].join(", ");
  const url = `${SITE_URL}/stocks/${symbol.toLowerCase()}`;
  return {
    title,
    description,
    keywords,
    openGraph: {
      title, description, url,
      images: [{ url: `${SITE_URL}/og/stocks/${symbol.toLowerCase()}.png`, width: 1200, height: 630, alt: `${name} Share Price Today` }],
    },
    twitter: { title, description },
    alternates: { canonical: url },
  };
}

// ─── CONGLOMERATE META ────────────────────────────────────────────────────────
export function getConglomerateMeta(
  group: string,
  stocks: { symbol: string; name: string }[]
): Metadata {
  const names: Record<string, string> = {
    adani: "Adani Group", reliance: "Reliance Group", tata: "Tata Group",
    bajaj: "Bajaj Group", mahindra: "Mahindra Group", birla: "Aditya Birla Group",
    hdfc: "HDFC Group", icici: "ICICI Group", sbi: "SBI Group", kotak: "Kotak Group",
    godrej: "Godrej Group", jsw: "JSW Group", vedanta: "Vedanta Group",
    itc: "ITC Group", lt: "L&T Group", wipro: "Wipro Group", infosys: "Infosys Group",
    hcl: "HCL Group", psu: "PSU / Govt Stocks", banking: "Banking Sector",
    pharma: "Pharma Sector", it: "IT Sector", auto: "Auto Sector",
    fmcg: "FMCG Sector", realty: "Real Estate Sector",
  };
  const groupName = names[group];
  const stockNames = stocks.map((s) => s.name).join(", ");
  const symbolList = stocks.map((s) => s.symbol).join(", ");
  const title = `${groupName} Stocks ${y()} — Full Company List & Market Performance`;
  const description = `Track the complete listed company portfolio of ${groupName} today ${y()}. Monitor real-time share prices, market cap, and performance of all group firms on NSE/BSE.`;
  const keywords = [
    // EXISTING
    `${groupName.toLowerCase()} stocks`, `${groupName.toLowerCase()} stocks list`,
    `${groupName.toLowerCase()} share price`, `all ${groupName.toLowerCase()} companies`,
    `${group} group stocks price today`, `${group} group companies nse`,
    `top ${group} stocks`,
    ...stocks.flatMap((s) => [
      `${s.name.toLowerCase()} share price`, `${s.symbol.toLowerCase()} stock`,
      `${s.name.toLowerCase()} today`,
    ]),
    symbolList, `how many companies does ${group} own`,
    `${group} group company list`, `${group} group market cap`,
    `invest in ${group} group`, `best ${group} stock to buy`, `${group} group stocks nse bse`,
    // NEW: Year-dynamic
    ...yearKeys(`best ${group} stock`),
    ...yearKeys(`${groupName.toLowerCase()} stocks`),
    `top 20 ${group} stocks ${y()}`, `${group} group stocks ${y()}`,
    `${group} group market cap ${y()}`, `${group} group performance ${y()}`,
    `${group} stocks 1 week performance`, `${group} stocks weekly gain loss`,
    `${group} group 52 week high low`, `${group} group latest news ${y()}`,
    `should i invest in ${group} group ${y()}`, `${group} group dividend ${y()}`,
    `${group} top performing stock ${y()}`, `${group} worst performing stock today`,
    `${group} group revenue profit ${y()}`,
    // MASSIVE INDIAN CONGLOMERATE KEYWORDS
    "adani reliance tata birla comparison", "best indian business group to invest",
    "top 10 conglomerates in india", "list of all listed companies in india",
    "conglomerate stocks nse bse today", "diversified business groups india",
    "adani enterprises vs reliance industries", "tata motors vs mahindra",
    "hdfc vs icici group performance", "bajaj finance vs jio financial",
    "indian family business stocks", "wealth creators of india today",
    "multibagger stocks from conglomerates", "blue chip conglomerate stocks india",
    "adani group news live today", "reliance industries news live",
    "tata group latest updates india", "birla group share price today",
    "vedanta jsw steel group news", "lt hcl to infosys it sector",
    "india business news today", "moneyplant conglomerate tracker",
    "adani wealth of gautam adani today", "reliance mukesh ambani net worth impact",
    "tata sons shareholding structure", "how to buy all adani stocks",
    "best tata stocks for long term", "is reliance a good buy today",
    "adani group debt news today", "tata group dividend history",
    "conglomerate discount india stocks", "holding company discount india",
    "nifty 50 conglomerate weightage", "sensex business group analysis",
    "adani total gas vs gujarat gas", "reliance retail vs avenue supermarts",
    "tata tech vs ltimindtree", "adani green vs tata power",
    `top 20 indian conglomerates ${y()}`, `best business groups ${y()}`,
    "adani hindenburg saga latest", "reliance disney merger impact",
    "tata group semiconductor news", "adani airport biz news",
    "conglomerate stocks price list today", "market cap of adani group today",
    "market cap of tata group live", "reliance industries m-cap live",
    "indian billionaire stocks today", "promoter holding of conglomerates",
    "pledge shares of indian conglomerates", "debt to equity ratio conglomerates",
  ].join(", ");
  const url = `${SITE_URL}/conglomerates/${group}`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${groupName} Stocks ${y()}` }] },
    twitter: { title, description },
    alternates: { canonical: url },
  };
}

// ─── INDEX PAGE META ──────────────────────────────────────────────────────────
export function getIndexMeta(
  indexId: string, indexName: string, value?: string, change?: string
): Metadata {
  const title = `${indexName} Live Today ${y()} | Market Benchmark ${value ? `— ${value} (${change}%)` : ""}`;
  const description = `Track ${indexName} performance today ${y()} — ${value ?? "real-time index data"}. Access historical charts, top performing stocks, and complete market benchmark analysis for ${indexName}.`;
  const keywords = [
    // EXISTING
    `${indexName.toLowerCase()} today`, `${indexName.toLowerCase()} live`,
    `${indexName.toLowerCase()} price today`, `${indexName.toLowerCase()} chart`,
    `${indexName.toLowerCase()} value today`, `${indexName.toLowerCase()} 52 week high`,
    `${indexName.toLowerCase()} 52 week low`, `${indexName.toLowerCase()} all time high`,
    `${indexName.toLowerCase()} historical data`, `${indexName.toLowerCase()} stocks list`,
    `${indexName.toLowerCase()} composition`, `${indexName.toLowerCase()} weightage`,
    `${indexName.toLowerCase()} performance today`, `${indexName.toLowerCase()} opening time`,
    `${indexName.toLowerCase()} closing time`, "nse india live", "share market index today",
    "stock index india", "indian stock market index today",
    "nifty 50 today", "sensex today", "bank nifty today", "nse live chart",
    "nifty pe ratio today", "nse index today", "bse index today",
    // NEW: Time-period keywords
    ...periodKeys(`${indexName.toLowerCase()} performance`),
    ...periodKeys(`${indexName.toLowerCase()} return`),
    `${indexName.toLowerCase()} weekly change`, `${indexName.toLowerCase()} weekly gain`,
    `${indexName.toLowerCase()} weekly loss`, `${indexName.toLowerCase()} 1 week return`,
    `${indexName.toLowerCase()} 1 month return`, `${indexName.toLowerCase()} 3 month return`,
    `${indexName.toLowerCase()} ytd return ${y()}`, `${indexName.toLowerCase()} ${y()} return`,
    // NEW: Year-dynamic
    ...yearKeys(`${indexName.toLowerCase()} target`),
    ...yearKeys(`${indexName.toLowerCase()} prediction`),
    `${indexName.toLowerCase()} ${y()}`, `${indexName.toLowerCase()} ${yn()}`,
    `${indexName.toLowerCase()} top 20 stocks ${y()}`,
    `top 20 nifty stocks ${y()}`, `top 20 index stocks ${y()}`,
    `best index fund india ${y()}`, `${indexName.toLowerCase()} etf india ${y()}`,
  ].join(", ");
  const url = `${SITE_URL}/indices/${indexId}`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${indexName} Live Today ${y()}` }] },
    twitter: { title, description },
    alternates: { canonical: url },
  };
}

// ─── CRYPTO PAGE META ─────────────────────────────────────────────────────────
export function getCryptoMeta(
  coinId: string, coinName: string, symbol: string, priceInr?: string, priceUsd?: string, change?: string
): Metadata {
  const title = `${coinName} (${symbol}) Price INR & USD Today ${y()} | ₹${priceInr ?? "—"}`;
  const description = `Real-time ${coinName} (${symbol}) price today ${y()} — ₹${priceInr ?? "—"} INR | $${priceUsd ?? "—"} USD ${change ? `(${change}%)` : ""}. Track international crypto trends, market cap, and live technical charts.`;
  const keywords = [
    // EXISTING
    `${coinName.toLowerCase()} price in india`, `${coinName.toLowerCase()} price today`,
    `${coinName.toLowerCase()} price inr`, `${symbol.toLowerCase()} price`,
    `${symbol.toLowerCase()} price india`, `${symbol.toLowerCase()} price in rupees`,
    `${coinName.toLowerCase()} to inr`, `${coinName.toLowerCase()} live price`,
    `1 ${coinName.toLowerCase()} in rupees`, `${coinId} price india`,
    `${coinName.toLowerCase()} market cap`, `${coinName.toLowerCase()} all time high`,
    `${coinName.toLowerCase()} chart inr`, `${coinName.toLowerCase()} buy india`,
    `how to buy ${coinName.toLowerCase()} india`, `${coinName.toLowerCase()} prediction 2025`,
    `${coinName.toLowerCase()} target 2025`, `${coinName.toLowerCase()} news today`,
    "crypto price india today", "cryptocurrency price india", "best crypto to buy india",
    "bitcoin price india today", "btc price inr today", "crypto in rupees",
    "digital currency india", "crypto investment india", "blockchain india",
    "cryptocurrency market india", "crypto tax india", "wazirx coindcx coinswitch india",
    // NEW: Year-dynamic
    ...yearKeys(`${coinName.toLowerCase()} price prediction`),
    ...yearKeys(`${coinName.toLowerCase()} target price`),
    ...yearKeys(`should i buy ${coinName.toLowerCase()}`),
    `${coinName.toLowerCase()} ${y()} price`, `${coinName.toLowerCase()} ${yn()} price`,
    `${symbol.toLowerCase()} price ${y()}`, `best crypto ${y()}`, `top 20 crypto ${y()}`,
    `top 20 cryptocurrencies ${y()}`, `best crypto to buy ${y()}`,
    // NEW: Time-period (weekly/monthly)
    ...periodKeys(`${coinName.toLowerCase()} price change`),
    `${coinName.toLowerCase()} 1 week price`, `${coinName.toLowerCase()} weekly gain`,
    `${coinName.toLowerCase()} weekly loss`, `${coinName.toLowerCase()} 7 day change`,
    `${coinName.toLowerCase()} 1 month return`, `${coinName.toLowerCase()} 30 day change`,
    `${coinName.toLowerCase()} weekly performance`, `${symbol.toLowerCase()} 1 week`,
    `${symbol.toLowerCase()} weekly chart`, `${coinName.toLowerCase()} down this week`,
    `${coinName.toLowerCase()} up this week`, `${coinName.toLowerCase()} drop this week`,
    // NEW: Tricky intent keywords
    `why is ${coinName.toLowerCase()} falling today`, `why is ${coinName.toLowerCase()} rising today`,
    `best time to buy ${coinName.toLowerCase()}`, `${coinName.toLowerCase()} dip today`,
    `${coinName.toLowerCase()} correction today`, `${coinName.toLowerCase()} bull run ${y()}`,
    `is ${coinName.toLowerCase()} a good investment ${y()}`,
    `${coinName.toLowerCase()} vs bitcoin ${y()}`, `${symbol.toLowerCase()} usd inr converter`,
    `convert ${symbol.toLowerCase()} to inr`, `${symbol.toLowerCase()} to usd`,
    "altcoin season 2025", "defi tokens today", "crypto gainers today",
    "top crypto this week", "which crypto is performing best this week",
    "crypto fear greed index", "bitcoin dominance today", "crypto market cap today",
  ].join(", ");
  const url = `${SITE_URL}/crypto/${coinId}`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${coinName} Price India Today ${y()}` }] },
    twitter: { title, description },
    alternates: { canonical: url },
  };
}

// ─── FOREX PAGE META ──────────────────────────────────────────────────────────
export function getForexMeta(
  pairId: string, pairName: string, base: string, quote: string, rate?: string
): Metadata {
  const title = `${base} to ${quote} Today ${y()} | World Exchange Rate ${rate ? `— ${rate}` : ""}`;
  const description = `Live ${base} to ${quote} exchange rate today ${y()} — ${rate ? `1 ${base} = ${rate} ${quote}` : "real-time data"}. Monitor international currency trends, RBI rates, and remittance corridors.`;
  const keywords = [
    // EXISTING
    `${base.toLowerCase()} to ${quote.toLowerCase()}`, `${base.toLowerCase()} to ${quote.toLowerCase()} today`,
    `${base.toLowerCase()} ${quote.toLowerCase()} live rate`, `${base.toLowerCase()} ${quote.toLowerCase()} exchange rate`,
    `${base.toLowerCase()} rate today india`, `1 ${base.toLowerCase()} in ${quote.toLowerCase()}`,
    `${base.toLowerCase()} to rupee`, `${base.toLowerCase()} vs ${quote.toLowerCase()}`,
    `${pairName.toLowerCase()}`, `${base.toLowerCase()} ${quote.toLowerCase()} chart`,
    `${base.toLowerCase()} ${quote.toLowerCase()} forecast`, `${base.toLowerCase()} ${quote.toLowerCase()} rbi rate`,
    "forex rate india", "currency converter india", "live forex india",
    "dollar rate today india", "usd inr today", "rbi reference rate",
    "forex market india", "currency exchange rate india", "international money transfer india",
    "send money to india", "currency rate india today", "live exchange rate india",
    `${base.toLowerCase()} ${quote.toLowerCase()} buy sell`,
    // NEW: Time-period (this is the tricky gold/currency weekly trick)
    ...periodKeys(`${base.toLowerCase()} to ${quote.toLowerCase()} rate`),
    `${base.toLowerCase()} ${quote.toLowerCase()} 1 week change`,
    `${base.toLowerCase()} ${quote.toLowerCase()} weekly gain loss`,
    `${base.toLowerCase()} ${quote.toLowerCase()} last 7 days change`,
    `${base} weekly performance vs ${quote}`,
    `how much did ${base.toLowerCase()} change this week`,
    `${base.toLowerCase()} to ${quote.toLowerCase()} 1 month change`,
    `${base.toLowerCase()} ${quote.toLowerCase()} monthly return`,
    `${pairName.toLowerCase()} weekly chart`, `${pairName.toLowerCase()} 7 day chart`,
    // NEW: Year-dynamic
    ...yearKeys(`${base.toLowerCase()} to ${quote.toLowerCase()} rate`),
    ...yearKeys(`${base.toLowerCase()} ${quote.toLowerCase()} forecast`),
    `${base} to ${quote} rate ${y()}`, `${base} vs ${quote} ${y()}`,
    `${base} to ${quote} ${yn()} outlook`, `${pairName} ${y()} prediction`,
    // NEW: Tricky intent
    `why is ${base.toLowerCase()} falling against ${quote.toLowerCase()}`,
    `why is ${base.toLowerCase()} rising today`, `${base.toLowerCase()} strength today`,
    `${base.toLowerCase()} weakness today`, `${base.toLowerCase()} all time high vs ${quote.toLowerCase()}`,
    `best exchange rate ${base.toLowerCase()} to ${quote.toLowerCase()}`,
    `bank forex rate ${base.toLowerCase()} to ${quote.toLowerCase()}`,
    `sbi ${base.toLowerCase()} ${quote.toLowerCase()} rate today`,
    `hdfc forex rate ${base.toLowerCase()}`, `nri transfer rate ${base.toLowerCase()} to inr`,
    "dollar index today DXY", "us dollar strength weak",
    `currency war ${y()}`, `forex trading india ${y()}`,
  ].join(", ");
  const url = `${SITE_URL}/forex/${pairId}`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${base} to ${quote} Exchange Rate ${y()}` }] },
    twitter: { title, description },
    alternates: { canonical: url },
  };
}

// ─── COMMODITY META ───────────────────────────────────────────────────────────
export function getCommodityMeta(
  commodity: "gold" | "silver" | "crude-oil" | "platinum",
  priceInr?: string
): Metadata {
  const map: Record<string, { title: string; desc: string; keywords: string[] }> = {
    gold: {
      title: `Gold Rate Today ${y()} — 24K & 22K Gold Prices | World Market Rates`,
      desc: `Live gold rate today ${y()} — ₹${priceInr ?? "—"} per 10g (24K). Track real-time prices for 22K/18K gold in India, Dubai, London, and USA with international market trends.`,
      keywords: [
        // EXISTING
        "gold rate today india", "gold price today", "gold rate today", "today gold rate",
        "24k gold price", "22k gold price", "18k gold price", "gold price per gram india",
        "gold price 10 gram india", "gold rate mumbai today", "gold rate delhi today",
        "gold rate chennai", "gold rate bangalore", "gold rate hyderabad", "gold rate kolkata",
        "gold rate ahmedabad", "gold rate pune", "mcx gold price", "gold etf india",
        "sovereign gold bond", "digital gold india", "gold futures india", "gold import india",
        "gold price history india", "international gold price", "gold price usd",
        "today gold rate 22 carat", "today gold rate 24 carat", "1 tola gold price",
        "gold rate soverign", "gold jewellery rate india", "is gold good investment india",
        // NEW: Time-period (THE TRICK — weekly gold price)
        ...periodKeys("gold rate"),
        ...periodKeys("gold price"),
        "gold price this week", "gold 1 week price", "gold price last 7 days",
        "gold weekly price change", "gold weekly gain", "gold weekly loss",
        "gold price increase this week", "gold price decrease this week",
        "how much gold changed this week", "gold price 7 days chart",
        "gold price 30 days chart", "gold price 1 month change",
        "gold monthly performance", "gold vs last week", "gold price last month",
        "gold price last year vs today", "gold price 1 year change",
        "gold price 5 year chart india", "gold price 10 year chart india",
        // NEW: Global gold prices
        "gold price in dubai", "gold price dubai today", "dubai gold rate today",
        "gold price in dubai today in rupees", "gold rate uae today",
        "gold price in london", "london gold price today", "london gold fixing",
        "gold price in usa today", "gold price in usd today", "gold price america",
        "gold price in euro", "gold price in gbp", "gold price in sar",
        "gold price saudi arabia today", "gold price in pakistan today",
        "gold price in qatar today", "gold price in kuwait today",
        "gold price in singapore today", "gold price hong kong today",
        "international gold price today", "XAUUSD today", "gold vs dollar today",
        "xau usd live", "spot gold price today", "gold bullion price",
        "gold bar price india", "gold coin price india", "gold futures comex",
        "gold price per ounce today", "gold price per troy ounce",
        // NEW: Year-dynamic
        ...yearKeys("gold price prediction"),
        ...yearKeys("gold rate india"),
        ...yearKeys("gold investment"),
        `top 20 gold stocks ${y()}`, `gold stocks india ${y()}`,
        `gold etf returns ${y()}`, `sovereign gold bond returns ${y()}`,
        `best gold etf india ${y()}`, `gold vs equity ${y()}`, `gold vs fd ${y()}`,
        `is gold good to buy in ${y()}`, `gold rate ${y()}`, `gold price ${y()}`,
        `gold rate ${yn()}`, `gold forecast ${y()} ${yn()}`,
        // NEW: Tricky intent
        "why gold price rising today", "why gold price falling today",
        "should i buy gold today", "is now good time to buy gold",
        "gold rate prediction tomorrow", "gold rate next week",
        "gold price on monday", "gold market holiday today",
        "gold price vs inflation", "gold vs bitcoin which is better",
        "gold vs silver price comparison", "gold silver ratio today",
        "hallmark gold price today", "bis hallmark gold rate",
        "22 carat vs 24 carat gold difference price",
        "making charges gold jewellery india", "sgb vs gold etf vs digital gold",
        "sone ka bhav aaj", "aaj ka sone ka rate", "sone ki kimat aaj",
        "gold karo becho aaj ka rate", "gold price news today india",
      ],
    },
    silver: {
      title: `Silver Rate Today ${y()} — Real-Time Price Per KG | International Silver Rates`,
      desc: `Live silver rate today ${y()} — ₹${priceInr ?? "—"} per kg. Monitor silver price action in India and world markets including XAG/USD, MCX, and retail rates.`,
      keywords: [
        // EXISTING
        "silver rate today india", "silver price today", "silver rate today",
        "silver price per kg india", "silver price per gram", "mcx silver price",
        "silver futures india", "999 silver price", "silver bar price india",
        "silver coin price india", "silver jewellery rate india",
        "silver etf india", "investment silver india", "silver rate mumbai",
        "silver rate delhi", "silver rate chennai", "silver medical uses",
        // NEW: Time-period
        ...periodKeys("silver rate"),
        ...periodKeys("silver price"),
        "silver price this week", "silver 1 week price", "silver price last 7 days",
        "silver weekly price change", "silver weekly gain", "silver weekly loss",
        "how much did silver change this week", "silver 7 days chart",
        "silver 30 days chart", "silver 1 month change", "silver monthly performance",
        "silver price last year vs today", "silver price 1 year change",
        "silver price 5 year chart india", "silver 10 year history india",
        // NEW: Global silver prices
        "silver price in dubai today", "silver price usd today", "XAGUSD today",
        "silver price in uae", "silver price london today", "silver price usa",
        "silver spot price today", "silver bullion price", "silver price per ounce",
        "silver vs gold ratio today", "gold silver ratio live",
        "comex silver price today", "silver futures comex", "lme silver price",
        // NEW: Year-dynamic
        ...yearKeys("silver price prediction"),
        ...yearKeys("silver rate india"),
        `silver etf returns ${y()}`, `best silver etf india ${y()}`,
        `silver vs gold ${y()}`, `silver investment ${y()}`,
        `is silver good to buy in ${y()}`, `silver price ${y()}`, `silver ${yn()} forecast`,
        // NEW: Tricky intent
        "why silver price rising today", "why silver price falling today",
        "should i buy silver today", "silver vs gold which is better",
        "chandi ka bhav aaj", "aaj ka chandi ka rate",
        "solar panel silver demand", "ev silver demand", "industrial silver demand",
        "platinum price today", "palladium price today",
      ],
    },
    "crude-oil": {
      title: `Crude Oil Price Today ${y()} — Brent & WTI Live Rates | World Energy Tracker`,
      desc: `Track real-time crude oil prices today ${y()} — Brent and WTI benchmarks. Monitor MCX oil rates, OPEC updates, and international energy market shifts.`,
      keywords: [
        // EXISTING
        "crude oil price today", "crude oil price india", "crude oil rate today",
        "wti crude oil price", "brent crude oil price", "mcx crude oil price",
        "oil barrel price today", "oil price today india", "petroleum price india",
        "crude oil futures india", "opec india", "crude oil chart",
        "petrol price vs crude oil", "crude oil news today india",
        // NEW: Time-period
        ...periodKeys("crude oil price"),
        "oil price this week", "oil price 1 week change", "crude oil weekly price",
        "oil price weekly gain loss", "crude oil 7 day chart", "oil price last 7 days",
        "oil price 1 month change", "crude oil monthly performance",
        "brent crude weekly", "wti weekly price change",
        // NEW: Year-dynamic
        ...yearKeys("crude oil price prediction"),
        ...yearKeys("oil price forecast"),
        `crude oil price ${y()}`, `oil price ${yn()} outlook`, `opec news ${y()}`,
        // NEW: Tricky intent
        "why oil price rising today", "why crude oil falling today",
        "petrol diesel price tomorrow", "opec production cut today",
        "oil price vs rupee today", "crude oil russia ukraine", "iran oil ban news",
        "natural gas price today india", "natural gas weekly price change",
        "carbon credit price", "renewables vs crude oil trend",
      ],
    },
    platinum: {
      title: `Platinum Rate Today ${y()} in India | Platinum Price Per Gram`,
      desc: `Live platinum rate today ${y()} in India per gram and per tola. Track platinum 1-week price change, platinum vs gold comparison, MCX platinum, and investment outlook for platinum in India.`,
      keywords: [
        "platinum rate today india", "platinum price today", "platinum price per gram india",
        "platinum vs gold price", "platinum jewellery india", "platinum investment india",
        ...periodKeys("platinum price"), "platinum weekly price change",
        "platinum 1 week performance", ...yearKeys("platinum price"),
        `platinum price ${y()}`, "palladium price today", "platinum etf india",
      ],
    },
  };
  const data = map[commodity] ?? map.gold;
  const url = `${SITE_URL}/commodities/${commodity}`;
  return {
    title: data.title,
    description: data.desc,
    keywords: data.keywords.join(", "),
    openGraph: { title: data.title, description: data.desc, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: data.title }] },
    twitter: { title: data.title, description: data.desc },
    alternates: { canonical: url },
  };
}

// ─── IPO META ─────────────────────────────────────────────────────────────────
export function getIpoMeta(): Metadata {
  const title = `IPO Tracker ${y()} — All Upcoming, Open & Recently Listed IPOs in India`;
  const description =
    `Ultimate IPO dashboard today ${y()}. Monitor upcoming Mainboard and SME IPOs, real-time Grey Market Premiums (GMP), allotment status, and listing gains live.`;
  const keywords = [
    // EXISTING
    "ipo today india", "upcoming ipo 2025", "new ipo 2025", "ipo list 2025",
    "ipo open today", "ipo subscription today", "ipo allotment status",
    "ipo listing today", "nse ipo", "bse ipo", "ipo gmp today",
    "grey market premium ipo", "ipo review", "best ipo to apply",
    "sme ipo india", "mainboard ipo india", "ipo price band",
    "ipo lot size", "ipo allotment date", "ipo listing date",
    "ipo profit india", "how to apply ipo zerodha", "how to apply ipo groww",
    "ipo status check", "ipo registrar status", "ipo news today india",
    "upcoming ipo next week", "top ipo 2025 india", "ipo returns india",
    // NEW: Year-dynamic
    ...yearKeys("upcoming ipo india"),
    ...yearKeys("new ipo india"),
    ...yearKeys("best ipo to apply"),
    `ipo ${y()} india`, `ipo ${yn()} india`, `upcoming ipo ${yn()}`,
    `top 20 ipo ${y()}`, `top 20 upcoming ipo ${y()}`,
    `best ipo gains ${y()}`, `ipo listing gain ${y()}`, `ipo returns ${y()}`,
    `ipo calendar ${y()}`, `ipo pipeline ${y()} india`,
    `ipo this week ${y()}`, `ipo next week ${y()}`, `ipo this month ${y()}`,
    // NEW: Tricky intent
    "ipo grey market premium today live", "ipo gmp list today",
    "which ipo to apply this week", "best ipo to buy today",
    "ipo allotment chances how to increase", "ipo cutoff price meaning",
    "ipo hni qib retail subscription today", "ipo anchor allotment",
    "should i apply ipo today", "ipo expected listing price today",
    "ipo valuation expensive or cheap", "ipo refund when credited",
    "ipo shares when credited to demat", "ipo unlocking date",
    "ipo lock in period india", "promoter lock in ipo",
  ].join(", ");
  const url = `${SITE_URL}/ipo`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `IPO India ${y()}` }] },
    twitter: { title, description },
    alternates: { canonical: url },
  };
}

// ─── TOP STOCKS META ──────────────────────────────────────────────────────────
export function getTopStocksMeta(type: "gainers" | "losers" | "most-active"): Metadata {
  const map = {
    gainers: {
      title: `Top 20 Gainers Today ${y()} — NSE/BSE Best Performing Stocks`,
      description: `Live tracker for today's top 20 gaining stocks in India ${y()}. Monitor price action, volume spikes, and sectoral leaders on NSE and BSE benchmarks.`,
      keywords: [
        // EXISTING
        "top gainers today", "nse top gainers", "bse top gainers", "best stocks today india",
        "stocks up today india", "top gainers nse bse", "biggest gainers today india",
        "stocks rising today", "top performing stocks india", "best stocks to trade today india",
        // NEW: Year + top-20 dynamic
        `top 20 gainers today ${y()}`, `top 20 stocks nse ${y()}`,
        `top 20 gainers nse ${y()}`, `top 20 stocks india ${y()}`,
        ...yearKeys("top gainers india"),
        // NEW: Time-period
        "top gainers this week", "top gainers 1 week nse", "weekly top gainers india",
        "stocks with highest gain this week", "top gainers last 7 days nse",
        "top gainers this month", "monthly top gainers nse bse",
        // NEW: Tricky
        "52 week high stocks today", "stocks hitting new high today",
        "breakout stocks today india", "upper circuit stocks today",
        "stocks with huge volume today", "institutional buying stocks today",
        "fii bought stocks today", "delivery based gainers today",
        "which stocks are best today", "stocks rallying today india",
        `top 20 stocks to buy ${y()}`, `best 20 stocks ${y()}`,
      ].join(", "),
    },
    losers: {
      title: `Top 20 Losers Today NSE/BSE ${y()} | Falling Stocks India Live`,
      description: `View today's top 20 losing stocks on NSE and BSE ${y()}. Real-time list of top losers with price, % change, 1-week decline, 52-week low, volume and market cap. Identify falling stocks and short-selling opportunities.`,
      keywords: [
        // EXISTING
        "top losers today", "nse top losers", "bse top losers", "stocks down today india",
        "falling stocks india", "biggest losers today india", "stocks declining today",
        "worst performing stocks india", "stocks to avoid today", "bearish stocks india",
        // NEW: Year + top-20 dynamic
        `top 20 losers today ${y()}`, `top 20 falling stocks ${y()}`,
        ...yearKeys("top losers india"),
        // NEW: Time-period
        "top losers this week", "weekly top losers india", "stocks losing this week",
        "stocks with largest decline this week", "top losers last 7 days",
        "top losers this month", "monthly losers nse bse",
        // NEW: Tricky
        "52 week low stocks today", "stocks hitting new lows today",
        "lower circuit stocks today", "stocks crashing today india",
        "why stock price falling today", "stocks to short today india",
        "which stocks to sell today", "fii selling stocks today",
        `top 20 stocks to avoid ${y()}`, `worst 20 stocks ${y()}`,
      ].join(", "),
    },
    "most-active": {
      title: `Top 20 Most Active Stocks Today NSE/BSE ${y()} | Highest Volume`,
      description: `View most actively traded stocks on NSE and BSE today by volume and turnover ${y()}. High volume stocks signal institutional activity and breakout potential. Track live trading volumes across all sectors.`,
      keywords: [
        // EXISTING
        "most active stocks today", "high volume stocks india", "most traded stocks nse",
        "highest volume stocks bse", "most active stocks nse today",
        "stocks with high volume", "institutional activity stocks india",
        "breakout stocks india", "intraday stocks high volume",
        // NEW: Year + top-20 dynamic
        `top 20 most active stocks ${y()}`, `top 20 volume stocks nse ${y()}`,
        ...yearKeys("most active stocks india"),
        // NEW: Time-period
        "most active stocks this week", "weekly volume leaders nse",
        "highest traded stocks this week india", "top volume stocks last 7 days",
        // NEW: Tricky
        "operator stocks today india", "bulk deals nse today", "block deals bse today",
        "delivery percentage stocks today", "fno stocks with high oi today",
        "options chain high oi stocks", "open interest analysis today",
        `top 20 active stocks ${y()}`, `most traded ${y()}`,
      ].join(", "),
    },
  };
  const d = map[type];
  const url = `${SITE_URL}/top-stocks/${type}`;
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    openGraph: { title: d.title, description: d.description, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: d.title }] },
    twitter: { title: d.title, description: d.description },
    alternates: { canonical: url },
  };
}
