import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TWITTER, OG_IMAGE } from "./constants";
import type { Metadata } from "next";
import {
  mixWithGlobalKeywords, buildDynamicGlobalMarkets, buildDynamicHomeMetaKeywords,
  buildDynamicCommodityKeywords, buildDynamicTopStocksKeywords, buildDynamicIpoKeywords,
  buildDynamicStockKeywords, buildDynamicIndexKeywords, buildDynamicCryptoKeywords,
  buildDynamicForexKeywords, buildDynamicConglomerateKeywords,
  getGlobalIndexNames, getGlobalCurrencyTerms
} from "./locationKeywords";

// ─── DYNAMIC YEAR & TIME HELPERS ──────────────────────────────────────────────
function y() { return new Date().getFullYear(); }           // e.g. 2025
function yn() { return new Date().getFullYear() + 1; }     // e.g. 2026


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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
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
    ...buildDynamicHomeMetaKeywords(y().toString(), yn().toString()),
    ...buildDynamicGlobalMarkets(),
    // ─── GLOBAL — General World ──────────────────────────────────────────────────
    "world stock market live", "global financial news today",
    "world economy today", "global recession news", "world market hours today",
    "international finance news", "world currency rates today",
    "global investment news today", "world markets live today",
    `world finance ${y()}`, `global investment ${y()}`,
    `top 20 stocks world ${y()}`, `best global assets ${y()}`,
  ];
  const finalKeywords = mixWithGlobalKeywords(keywords, ["finance", "stock market", "investment", "bitcoin price", "gold rate"]);
  return {
    title,
    description,
    keywords: finalKeywords,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "MoneyPlant Live Finance India" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: SITE_URL },
  };
}

// ─── STOCK PAGE META ──────────────────────────────────────────────────────────
export function getStockMeta(symbol: string, name: string, price?: string, change?: string): Metadata {
  const title = `${name} Share Price Today ${y()} | ${symbol} NSE Live Rate | ₹${price ?? "—"}`;
  const description = `Live ${name} (${symbol}) share price today ${y()} on NSE/BSE. ₹${price ?? "—"} ${change ? `(${change}%)` : ""}. Monitor real-time chart, 52-week data, market cap, and expert stock analysis on MoneyPlant.`;
  const keywords = buildDynamicStockKeywords(symbol, name, y().toString(), yn().toString()).join(", ");
  const url = `${SITE_URL}/stocks/${symbol.toLowerCase()}`;
  return {
    title,
    description,
    keywords,
    openGraph: {
      title, description, url,
      type: "article",
      images: [{ url: `/og/stocks/${symbol.toLowerCase()}.png`, width: 1200, height: 630, alt: `${name} Share Price Today` }],
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
  const keywords = buildDynamicConglomerateKeywords(groupName, stocks.map(s => s.name), y().toString(), yn().toString()).join(", ");
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
  indexId?: string, indexName?: string, value?: string, change?: string
): Metadata {
  if (!indexId || !indexName) {
    const title = `Indices Hub — World Market Benchmarks Live | Nifty, Sensex, Dow, Nasdaq & Nikkei ${y()}`;
    const description = `Real-time tracker for all major international stock market indices today ${y()}. Monitor Indian benchmarks alongside US, European, and Asian markets with professional analytics.`;
    const specificKeywords = [
      "nifty 50 live today", "nifty 50 live price", "nifty 50 chart today",
      "sensex live today", "sensex live price", "bse sensex today",
      "bank nifty live today", "bank nifty live price",
      "nifty it today", "nifty pharma today", "nifty fmcg today", "nifty metal today",
      "nifty realty today", "nifty auto today", "nifty psu bank today",
      "nifty energy today", "nifty media today", "nifty infra today",
      "nifty midcap 100 today", "nifty smallcap 100 today", "nifty next 50 today",
      "nifty 200 today", "nifty 500 today", "bse 100 today", "bse 200 today", "bse 500 today",
      "india vix today", "nifty pe ratio today", "sensex pe ratio today",
      "nifty 50 weekly performance", "nifty 50 1 week return", "nifty 50 this week",
      "sensex weekly gain loss", "sensex 1 week change", "sensex this week",
      "bank nifty weekly change", "nifty 50 monthly return", "nifty 50 ytd return",
      "nifty 50 52 week high", "nifty 50 52 week low", "sensex 52 week high",
      "index performance this week", "indian market weekly summary",
      "global stock market today", "s&p 500 today", "dow jones today", "nasdaq today",
      "ftse 100 today", "dax today", "nikkei 225 today", "hang seng today",
      "shanghai composite today", "kospi today", "asx 200 today",
      "world indices live", "global indices today", "international stock market",
      `top 20 index stocks ${y()}`, `best index fund india ${y()}`,
      `nifty 50 ${y()}`, `sensex ${y()} target`,
      "stock market indices india", "nse bse indices live",
      "nifty beees price today", "sensex etf today",
      "52 week high stocks nse bse", "52 week high stocks list today",
      "stocks hitting 52 week high today", "breakout stocks today india",
      "s&p 500 live index", "dow jones index today", "nasdaq composite index today",
      "russell 2000 index today", "nyse composite today", "tsx canada index today",
      "bovespa index today brazil", "mexbol mexico index today",
      "ftse 100 index live", "dax 40 index today", "cac 40 index today",
      "ibex 35 spain index today", "aex netherlands index today",
      "smi switzerland index today", "omxs30 sweden index today",
      "euro stoxx 50 today", "stoxx 600 europe today",
      "nikkei 225 live index", "hang seng index live", "shanghai composite index",
      "csi 300 china index today", "kospi south korea index today",
      "asx 200 australia index today", "straits times index singapore",
      "nzx 50 new zealand today", "set thailand index today",
      "pse philippines index today", "klci malaysia index today",
      "jci indonesia index today", "vni vietnam index today",
      "tasi saudi arabia index today", "dfmgi dubai index today",
      "adxgi abu dhabi index today", "tadawul index today",
      "bist 100 turkey index today", "tel aviv 35 israel index today",
      "jse south africa index today", "ngx nigeria index today",
      "efg egypt index today",
      "nifty vs s&p 500 comparison", "sensex vs dow jones comparison",
      "india index vs world index performance", "best index in world today",
      `global indices ${y()} performance`, `world stock market indices ${y()}`
    ];
    const keywords = mixWithGlobalKeywords(specificKeywords, [
      ...getGlobalIndexNames(),
      "Nifty 50", "Sensex", "Stock Market", "Indices", "World Market"
    ]);
    const url = `${SITE_URL}/indices`;
    return {
      title, description, keywords,
      openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Global Indices Hub" }] },
      twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
      alternates: { canonical: url },
    };
  }

  const title = `${indexName} Live Today ${y()} | Market Benchmark ${value ? `— ${value} (${change}%)` : ""}`;
  const description = `Track ${indexName} performance today ${y()} — ${value ?? "real-time index data"}. Access historical charts, top performing stocks, and complete market benchmark analysis for ${indexName}.`;
  const keywords = buildDynamicIndexKeywords(indexName, y().toString(), yn().toString()).join(", ");
  const url = `${SITE_URL}/indices/${indexId}`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, type: "article", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${indexName} Live Today ${y()}` }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── CRYPTO PAGE META ─────────────────────────────────────────────────────────
export function getCryptoMeta(
  coinId?: string, coinName?: string, symbol?: string, priceInr?: string, priceUsd?: string, change?: string
): Metadata {
  if (!coinId || !coinName || !symbol) {
    const title = `Crypto Hub — Real-Time Cryptocurrency Prices INR & USD | Bitcoin, Ethereum ${y()}`;
    const description = `Live cryptocurrency market terminal today ${y()}. Track Bitcoin, Ethereum, and 1000+ digital assets with real-time INR/USD exchange rates and world market cap trends.`;
    const specificKeywords = [
      "crypto price today india", "bitcoin price india today", "bitcoin price inr",
      "btc price inr today", "ethereum price india", "ethereum to inr",
      "crypto market today", "top cryptocurrencies india", "live crypto prices india",
      "solana price india today", "xrp price india today", "bnb price india today",
      "dogecoin price india today", "cardano price india", "polygon price india",
      "crypto gainers today", "top crypto gainers today", "top crypto losers today",
      "crypto market cap today", "total crypto market cap", "bitcoin dominance today",
      "crypto price this week", "crypto 1 week performance", "bitcoin weekly gain loss",
      "ethereum weekly change", "crypto monthly return", "best crypto this week",
      "worst crypto this week", "crypto up this week", "crypto down this week",
      `top 20 cryptocurrencies ${y()}`, `best crypto to buy ${y()}`,
      `top 20 crypto ${y()}`, `crypto bull run ${y()}`,
      "buy crypto india", "crypto investment india", "how to buy bitcoin india",
      "wazirx prices", "coindcx prices", "zebpay prices", "binance india",
      "crypto tax india", "30% crypto tax india", "tds crypto india",
      "crypto regulations india 2025", "sebi crypto india", "rbi crypto india",
      "altcoin season 2025", "defi tokens today", "nft market today", "web3 india",
      "crypto fear greed index", "ethereum gas fees today", "bitcoin atm india",
      "usdt to inr today", "tether price inr", "stablecoin india",
      "crypto portfolio tracker india", "crypto market analysis today",
      "live cryptocurrency rates india", "bitcoin to rupee today",
      "bitcoin price usa", "bitcoin price usd today", "btc price usd",
      "ethereum price usa", "crypto price usa today", "buy bitcoin usa",
      "crypto exchange usa", "coinbase prices", "kraken crypto prices",
      "best crypto usa 2025", "crypto tax usa", "irs crypto tax",
      "bitcoin price uk today", "bitcoin price gbp", "btc price gbp",
      "ethereum price uk", "crypto price uk", "buy bitcoin uk",
      "crypto exchange uk", "binance uk", "coinbase uk",
      "bitcoin price in pounds today", "crypto regulation uk",
      "bitcoin price uae today", "bitcoin price dubai", "btc price aed",
      "ethereum price uae", "crypto price dubai", "buy bitcoin dubai",
      "crypto in uae", "crypto exchange dubai", "binance dubai",
      "bitcoin price in dirhams", "crypto regulations uae",
      "bitcoin price saudi arabia", "bitcoin price sar today", "btc sar price",
      "crypto price riyadh", "crypto investment saudi arabia", "buy bitcoin saudi",
      "bitcoin price pakistan today", "bitcoin price pkr", "btc pkr price",
      "ethereum price pakistan", "crypto price pakistan", "buy bitcoin pakistan",
      "crypto regulations pakistan", "sbp crypto pakistan",
      "bitcoin price bangladesh today", "bitcoin price bdt", "btc bdt price",
      "crypto price bangladesh", "buy bitcoin bangladesh",
      "bitcoin price singapore", "bitcoin price sgd", "buy bitcoin singapore",
      "crypto exchange singapore", "mas crypto singapore",
      "bitcoin price australia today", "bitcoin price aud", "btc aud price",
      "crypto price australia", "buy bitcoin australia", "swyftx crypto",
      "bitcoin price canada today", "bitcoin price cad", "btc cad price",
      "crypto price canada", "buy bitcoin canada",
      "bitcoin price euro today", "bitcoin price eur", "btc eur price",
      "ethereum price europe", "crypto price germany", "crypto price france",
      "bitcoin price netherlands", "crypto regulation europe", "mica regulation crypto",
      "bitcoin price nigeria today", "bitcoin price ngn", "crypto price nigeria",
      "bitcoin price kenya", "bitcoin price south africa", "bitcoin price philippines",
      "bitcoin price malaysia today", "bitcoin price indonesia", "btc price thailand",
      "bitcoin price turkey", "bitcoin price brazil", "bitcoin price argentina",
      "crypto price live world", "global crypto market today",
      "world cryptocurrency prices", "international crypto exchange",
      "crypto prices across countries", "bitcoin price in all currencies",
      "crypto in dollars euros pounds dirhams",
      `best crypto to buy worldwide ${y()}`,
      `global crypto market ${y()}`
    ];
    const keywords = mixWithGlobalKeywords(specificKeywords, ["Crypto", "Bitcoin", "Ethereum", "Cryptocurrency"]);
    const url = `${SITE_URL}/crypto`;
    return {
      title, description, keywords,
      openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Global Crypto Hub" }] },
      twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
      alternates: { canonical: url },
    };
  }

  const title = `${coinName} (${symbol}) Price INR & USD Today ${y()} | ₹${priceInr ?? "—"}`;
  const description = `Real-time ${coinName} (${symbol}) price today ${y()} — ₹${priceInr ?? "—"} INR | $${priceUsd ?? "—"} USD ${change ? `(${change}%)` : ""}. Track international crypto trends, market cap, and live technical charts.`;
  const keywords = buildDynamicCryptoKeywords(coinName, symbol, y().toString(), yn().toString());
  const finalKeywords = mixWithGlobalKeywords(keywords, [coinName, `${coinName} price`, symbol]);
  const url = `${SITE_URL}/crypto/${coinId}`;
  return {
    title, description, keywords: finalKeywords,
    openGraph: { title, description, url, type: "article", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${coinName} Price India Today ${y()}` }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── FOREX PAGE META ──────────────────────────────────────────────────────────
export function getForexMeta(
  pairId?: string, pairName?: string, base?: string, quote?: string, rate?: string
): Metadata {
  if (!pairId || !pairName || !base || !quote) {
    const title = `Forex Hub — World Currency Exchange Rates | Live USD/INR, EUR, GBP & Remittance ${y()}`;
    const description = `Worldwide currency tracker and exchange rate terminal today ${y()}. Monitor live USD to INR, major international currency pairs, RBI reference rates, and NRI transfer rates.`;
    const specificKeywords = [
      "forex rate india today", "usd to inr today", "dollar to rupee today",
      "dollar rate today india", "dollar price india today", "inr to usd today",
      "usdt to inr today", "tether to inr", "rupee vs dollar today",
      "euro to rupee today", "eur to inr today", "europe euro to inr",
      "gbp to inr today", "pound to rupee today", "british pound to inr",
      "aed to inr today", "dirham to rupee today", "uae dirham to inr",
      "sar to inr today", "saudi riyal to rupee today", "saudi riyal to inr",
      "kwd to inr today", "kuwait dinar to rupee", "kuwait dinar to inr",
      "qar to inr today", "qatar riyal to rupee", "qatar riyal to inr",
      "jpy to inr today", "yen to rupee today", "japanese yen to inr",
      "cny to inr today", "yuan to rupee today", "chinese yuan to inr",
      "aud to inr today", "australian dollar to rupee", "aud to inr rate",
      "cad to inr today", "canadian dollar to rupee", "cad to inr rate",
      "chf to inr today", "swiss franc to rupee", "swiss franc to inr",
      "sgd to inr today", "singapore dollar to rupee", "sgd to inr rate",
      "pkr to inr today", "pakistani rupee to inr", "pakistan currency rate",
      "bdt to inr today", "bangladeshi taka to inr", "taka to rupee",
      "live exchange rates india", "currency exchange rate india",
      "rbi reference rate today", "rbi forex rate today", "rbi usd inr rate",
      "forex market india", "forex trading india", "currency converter india",
      "nri transfer rate today", "best remittance rate india", "sbi forex rate today",
      "hdfc forex rate today", "icici forex rate today", "bank forex rate india",
      "western union rate today india", "wise transfer rate india", "remittance india",
      "usd to inr 1 week change", "dollar rupee weekly change", "dollar weekly performance",
      "rupee vs dollar this week", "dollar 1 week gain loss", "rupee this week",
      "currency rate this week india", "forex weekly report", "forex 7 days",
      "dollar index today dxy", "dollar strength today",
      `usd inr rate ${y()}`, `forex rates ${y()}`,
      `top 20 currency pairs ${y()}`, "best exchange rate today",
      "usd exchange rate today", "dollar rate usa", "buy usd in usa",
      "usd to eur today", "usd to gbp today", "usd to jpy today",
      "usd to cad today", "usd to aud today", "dollar index usa today",
      "gbp exchange rate today", "pound sterling rate today", "pound to euro today",
      "pound to dollar today", "pound to inr today", "pound to aed today",
      "uk forex rates today", "rbs forex rate", "barclays forex rate",
      "euro exchange rate today", "eur usd today", "eur gbp today",
      "eur to inr today", "eur to jpy today", "ecb exchange rate today",
      "euro rate germany", "euro rate france", "euro vs dollar today",
      "aed exchange rate today", "dirham rate today", "aed to usd today",
      "aed to inr today", "aed to gbp today", "aed to eur today",
      "uae dirham exchange rate today", "dubai forex rate today",
      "sar exchange rate today", "riyal rate today", "sar to usd today",
      "sar to inr today", "sar to gbp today", "saudi riyal forex rate",
      "kwd to usd today", "kwd to inr today", "kuwait dinar forex rate",
      "qar to usd today", "qar to inr today", "qatar riyal exchange rate",
      "omr to usd today", "omr to inr today", "oman rial exchange rate",
      "bhd to usd today", "bahrain dinar exchange rate",
      "pkr to usd today", "pkr exchange rate today", "pakistan rupee rate today",
      "bdt to usd today", "bangladesh taka exchange rate today",
      "lkr to usd today", "sri lanka rupee exchange rate",
      "npr to usd today", "nepal rupee exchange rate",
      "jpy to usd today", "yen exchange rate today", "japan yen rate today",
      "cny to usd today", "chinese yuan exchange rate today",
      "sgd to usd today", "singapore dollar exchange rate today",
      "aud to usd today", "australian dollar exchange rate today",
      "cad to usd today", "canadian dollar exchange rate today",
      "myr to usd today", "ringgit exchange rate today",
      "idr to usd today", "rupiah exchange rate today",
      "php to usd today", "philippine peso exchange rate",
      "thb to usd today", "thai baht exchange rate today",
      "ngn to usd today", "nigeria naira exchange rate",
      "zar to usd today", "south africa rand exchange rate",
      "kes to usd today", "kenya shilling exchange rate",
      "brl to usd today", "brazil real exchange rate",
      "mxn to usd today", "mexican peso exchange rate",
      "ars to usd today", "argentina peso exchange rate today",
      "send money to india from usa", "send money to india from uk",
      "send money to india from dubai", "send money to india from canada",
      "nri money transfer rate", "international money transfer rate today",
      "wise exchange rate today", "western union rate today",
      "xoom transfer rate", "remitly rate today", "transferwise rate",
      "best remittance rate worldwide", "cheapest way to send money internationally",
      `global forex ${y()}`, `world currency rates ${y()}`
    ];
    const keywords = mixWithGlobalKeywords(specificKeywords, [
      ...getGlobalCurrencyTerms(),
      "Forex", "Currency Exchange", "USD to INR", "Remittance", "Exchange Rates"
    ]);
    const url = `${SITE_URL}/forex`;
    return {
      title, description, keywords,
      openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Global Forex Hub" }] },
      twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
      alternates: { canonical: url },
    };
  }

  const title = `${pairName} Today ${y()} | World Exchange Rate ${rate ? `— ${rate}` : ""}`;
  const description = `Live ${base} to ${quote} exchange rate today ${y()} — ${rate ? `1 ${base} = ${rate} ${quote}` : "real-time data"}. Monitor international currency trends, RBI rates, and remittance corridors.`;
  const keywords = buildDynamicForexKeywords(base, quote, y().toString(), yn().toString());
  const finalKeywords = mixWithGlobalKeywords(keywords, [`${base} to ${quote}`, `${base} to inr`, `${base} rate`]);
  const url = `${SITE_URL}/forex/${pairId}`;
  return {
    title, description, keywords: finalKeywords,
    openGraph: { title, description, url, type: "article", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${base} to ${quote} Exchange Rate ${y()}` }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── COMMODITY META ───────────────────────────────────────────────────────────
export function getCommodityMeta(
  commodity: "gold" | "silver" | "crude-oil" | "platinum" | "aluminum" | "zinc" | "lead" | "nickel" | "natural-gas" | "brent-oil" | "cotton" | "cpo" | "rubber",
  priceInr?: string
): Metadata {
  const map: Record<string, { title: string; desc: string; keywords: string[] }> = {
    gold: {
      title: `Gold Rate Today ${y()} — 24K & 22K Gold Prices | World Market Rates`,
      desc: `Live gold rate today ${y()} — ₹${priceInr ?? "—"} per 10g (24K). Track real-time prices for 22K/18K gold in India, Dubai, London, and USA with international market trends.`,
      keywords: buildDynamicCommodityKeywords("gold", y().toString(), yn().toString()),
    },
    silver: {
      title: `Silver Rate Today ${y()} — Real-Time Price Per KG | International Silver Rates`,
      desc: `Live silver rate today ${y()} — ₹${priceInr ?? "—"} per kg. Monitor silver price action in India and world markets including XAG/USD, MCX, and retail rates.`,
      keywords: buildDynamicCommodityKeywords("silver", y().toString(), yn().toString()),
    },
    "crude-oil": {
      title: `Crude Oil Price Today ${y()} — Brent & WTI Live Rates | World Energy Tracker`,
      desc: `Track real-time crude oil prices today ${y()} — Brent and WTI benchmarks. Monitor MCX oil rates, OPEC updates, and international energy market shifts.`,
      keywords: buildDynamicCommodityKeywords("crude-oil", y().toString(), yn().toString()),
    },
    platinum: {
      title: `Platinum Rate Today ${y()} in India | Platinum Price Per Gram`,
      desc: `Live platinum rate today ${y()} in India per gram and per tola. Track platinum 1-week price change, platinum vs gold comparison, MCX platinum, and investment outlook for platinum in India.`,
      keywords: buildDynamicCommodityKeywords("platinum", y().toString(), yn().toString()),
    },
    aluminum: {
      title: `Aluminum Price Today ${y()} — MCX Live Rate | International LME Aluminum`,
      desc: `Live aluminum rate today ${y()} on MCX India. Track aluminum price per kg, international LME benchmarks, and global demand trends for aluminum ${y()}.`,
      keywords: buildDynamicCommodityKeywords("aluminum", y().toString(), yn().toString()),
    },
    zinc: {
      title: `Zinc Price Today ${y()} — MCX Live Rate | International LME Zinc`,
      desc: `Track real-time zinc prices today ${y()} on MCX. Monitor international LME zinc benchmarks, inventory levels, and industrial demand for zinc.`,
      keywords: buildDynamicCommodityKeywords("zinc", y().toString(), yn().toString()),
    },
    lead: {
      title: `Lead Price Today ${y()} — MCX Live Rate | International LME Lead`,
      desc: `Live lead rate today ${y()} in India per kg. Monitor international LME lead prices, battery sector demand, and global lead market shifts.`,
      keywords: buildDynamicCommodityKeywords("lead", y().toString(), yn().toString()),
    },
    nickel: {
      title: `Nickel Price Today ${y()} — MCX Live Rate | International LME Nickel`,
      desc: `Track real-time nickel prices today ${y()} on MCX. Monitor stainless steel and EV battery demand impact on international LME nickel rates.`,
      keywords: buildDynamicCommodityKeywords("nickel", y().toString(), yn().toString()),
    },
    "natural-gas": {
      title: `Natural Gas Price Today ${y()} — MCX Live Rate | NYMEX Nat Gas`,
      desc: `Live natural gas rate today ${y()} on MCX. Track NYMEX natural gas benchmarks, inventory reports, and global energy market trends.`,
      keywords: buildDynamicCommodityKeywords("natural-gas", y().toString(), yn().toString()),
    },
    "brent-oil": {
      title: `Brent Crude Oil Price Today ${y()} — Global Benchmark Live Rate`,
      desc: `Track real-time Brent Crude oil prices today ${y()}. Monitor international North Sea benchmarks and global energy market news.`,
      keywords: buildDynamicCommodityKeywords("brent-oil", y().toString(), yn().toString()),
    },
    cotton: {
      title: `Cotton Price Today ${y()} — MCX Live Rate | ICE Cotton Benchmark`,
      desc: `Live cotton rate today ${y()} on MCX. Track international ICE cotton benchmarks and local harvest impact on cotton prices in India.`,
      keywords: buildDynamicCommodityKeywords("cotton", y().toString(), yn().toString()),
    },
    cpo: {
      title: `Crude Palm Oil (CPO) Price Today ${y()} — MCX Live Rate | BMD Malaysia`,
      desc: `Track real-time CPO prices today ${y()} on MCX. Monitor BMD (Malaysia) palm oil benchmarks and global edible oil market trends.`,
      keywords: buildDynamicCommodityKeywords("cpo", y().toString(), yn().toString()),
    },
    rubber: {
      title: `Rubber Price Today ${y()} — MCX Live Rate | Global Rubber Benchmarks`,
      desc: `Live rubber rate today ${y()} in India. Monitor international rubber benchmarks and automotive sector impact on rubber prices ${y()}.`,
      keywords: buildDynamicCommodityKeywords("rubber", y().toString(), yn().toString()),
    },
  };
  const data = map[commodity] ?? map.gold;
  const finalKeywords = mixWithGlobalKeywords(data.keywords, [commodity, `${commodity} price`, `${commodity} rate`]);
  const url = `${SITE_URL}/commodities/${commodity}`;
  return {
    title: data.title,
    description: data.desc,
    keywords: finalKeywords,
    openGraph: { title: data.title, description: data.desc, url, type: "article", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: data.title }] },
    twitter: { card: "summary_large_image", title: data.title, description: data.desc, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}


// ─── COMMODITIES PAGE META ───────────────────────────────────────────────────
export function getCommoditiesMeta(): Metadata {
  const title = `Commodities Hub — Live Gold, Silver & Crude Oil Prices | World Market Rates ${y()}`;
  const description = `Stay updated with real-time world commodity prices today ${y()}. Monitor live 24K/22K Gold, Silver, and Crude Oil (Brent/WTI) rates across Indian and international benchmarks.`;
  const specificKeywords = [
    "gold rate today india", "gold price today", "today gold rate", "live gold price",
    "24k gold price today", "22k gold price today", "gold price per gram india",
    "gold rate mumbai today", "gold rate delhi today", "gold rate chennai today",
    "gold rate bangalore today", "gold rate hyderabad today", "gold rate kolkata today",
    "gold price in dubai today", "gold price in london today", "gold price in usa today",
    "gold price in usd today", "gold price in aed today", "gold price in sar today",
    "XAUUSD today", "mcx gold price today", "spot gold price",
    "gold price this week", "gold 1 week price change", "gold weekly gain loss",
    "gold price prediction 2025", "sovereign gold bond", "digital gold price today",
    "gold etf india", "sone ka bhav aaj", "gold price chart",
    "silver rate today india", "silver price today", "today silver rate",
    "silver price per gram today", "silver price per kg india",
    "silver price in dubai today", "silver price usd today", "XAGUSD today",
    "mcx silver price today", "silver 1 week price change", "silver weekly gain loss",
    "chandi ka bhav aaj", "silver vs gold ratio today",
    "crude oil price today india", "crude oil price today", "brent crude oil price today",
    "wti crude oil price today", "mcx crude oil price today",
    "oil barrel price today", "crude oil 1 week price change", "crude oil weekly change",
    "petrol price india vs crude oil", "opec news today",
    "natural gas price today india", "copper price today india",
    "platinum price today india", "commodity market india live",
    "mcx prices today", "commodity market live india",
    `top 20 commodity stocks ${y()}`,
    "commodity market news today", "precious metals price today",
    "commodity prices this week", "commodity weekly change",
    "gold price in usa today", "gold price in america", "gold price new york", "comex gold today",
    "gold price in uk today", "gold price in london", "london gold fixing today",
    "gold price in germany", "gold price in france", "gold price in europe today",
    "gold price in canada today", "gold price in australia today", "gold price in aud",
    "gold price in singapore today", "gold price in sgd",
    "gold price in hong kong today", "gold price hkd",
    "gold price in china today", "gold price in cny", "gold price in japan today",
    "gold price in south korea today", "gold price in malaysia today",
    "gold price in thailand today", "gold price in indonesia today",
    "gold price in turkey today", "gold price in iran today",
    "gold price in pakistan today", "gold price in pkr",
    "gold price in bangladesh today", "gold price in bdt",
    "gold price in sri lanka", "gold price in nepal today",
    "gold price in nigeria today", "gold price in south africa today",
    "gold price in kenya today", "gold price in egypt today",
    "gold price in brazil today", "gold price in argentina today",
    "gold price in mexico today", "gold price in russia today",
    "gold price in philippines today", "gold price in vietnam today",
    "silver price in usa today", "silver price usd per ounce",
    "silver price in uk today", "silver price gbp",
    "silver price in europe today", "silver price in germany",
    "silver price in australia today", "silver price aud",
    "silver price in canada today", "silver price cad",
    "silver price in pakistan today", "silver price in uae today",
    "silver price in saudi arabia today", "silver price in singapore today",
    "crude oil price usa today", "crude oil price europe today",
    "crude oil price middle east", "saudi aramco oil price",
    "brent crude uk price today", "wti oil price america today",
    "crude oil price australia today", "crude oil price japan today",
    "crude oil price china today", "crude oil price germany today",
    "opec monthly report", "oil price russia ukraine war impact",
    "commodity prices worldwide", "global commodity market today",
    "international commodity prices", "commodity exchange worldwide",
    `commodity market ${y()} world`, `gold price ${y()} global`
  ];
  const keywords = mixWithGlobalKeywords(specificKeywords, ["Gold Rate", "Silver Rate", "Crude Oil Price", "Commodities", "Global Commodities"]);
  const url = `${SITE_URL}/commodities`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Global Commodities Hub" }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── STOCKS HUB META ─────────────────────────────────────────────────────────
export function getStocksMeta(): Metadata {
  const title = `Stocks Hub — Real-Time NSE & BSE Share Prices Today | Nifty 50, Sensex ${y()}`;
  const description = `Live Indian stock market dashboard today ${y()}. Track Nifty 50, Sensex benchmarks, top gainers, losers, and most active stocks with detailed share price charts.`;
  const specificKeywords = [
    "stock market today india", "share price today nse bse", "nifty 50 stocks today",
    "sensex stocks today", "top gainers today", "top losers today nse",
    "most active stocks today", "52 week high stocks india", "52 week low stocks today",
    "breakout stocks today", "intraday stocks for today", "best stocks to buy 2025",
    "stock market live india", "nse live tracking", "bse live data",
    "market cap ranking india", "blue chip stocks india", "penny stocks today india",
    "dividend stocks india", "multibagger stocks 2025", "stock market news today india"
  ];
  const keywords = mixWithGlobalKeywords(specificKeywords, ["Stock Market", "Share Price", "NSE", "BSE", "Indian Stocks", "Multibagger Stocks"]);
  const url = `${SITE_URL}/stocks`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Indian Stocks Hub" }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── IPO META ─────────────────────────────────────────────────────────────────
export function getIpoMeta(): Metadata {
  const title = `IPO Tracker ${y()} — All Upcoming, Open & Recently Listed IPOs in India`;
  const description =
    `Ultimate IPO dashboard today ${y()}. Monitor upcoming Mainboard and SME IPOs, real-time Grey Market Premiums (GMP), allotment status, and listing gains live.`;
  const specificKeywords = [
    "ipo today india", "upcoming ipo list 2025", "live ipo gmp today",
    "ipo allotment status check", "mainboard ipo vs sme ipo", "new ipo calendar 2025",
    "how to apply for ipo today", "ipo listing gain calculator", "ipo reviews today"
  ];
  const keywords = mixWithGlobalKeywords(specificKeywords, ["IPO India", "Upcoming IPO", "IPO GMP", "Allotment Status"]);
  const url = `${SITE_URL}/ipo`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `IPO India ${y()}` }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── TOP STOCKS META ──────────────────────────────────────────────────────────
export function getTopStocksMeta(type: "gainers" | "losers" | "most-active"): Metadata {
  const map = {
    gainers: {
      title: `Top 20 Gainers Today ${y()} — NSE/BSE Best Performing Stocks`,
      description: `Live tracker for today's top 20 gaining stocks in India ${y()}. Monitor price action, volume spikes, and sectoral leaders on NSE and BSE benchmarks.`,
      keywords: buildDynamicTopStocksKeywords("gainers", y().toString(), yn().toString()).join(", "),
    },
    losers: {
      title: `Top 20 Losers Today NSE/BSE ${y()} | Falling Stocks India Live`,
      description: `View today's top 20 losing stocks on NSE and BSE ${y()}. Real-time list of top losers with price, % change, 1-week decline, 52-week low, volume and market cap. Identify falling stocks and short-selling opportunities.`,
      keywords: buildDynamicTopStocksKeywords("losers", y().toString(), yn().toString()).join(", "),
    },
    "most-active": {
      title: `Top 20 Most Active Stocks Today NSE/BSE ${y()} | Highest Volume`,
      description: `View most actively traded stocks on NSE and BSE today by volume and turnover ${y()}. High volume stocks signal institutional activity and breakout potential. Track live trading volumes across all sectors.`,
      keywords: buildDynamicTopStocksKeywords("most-active", y().toString(), yn().toString()).join(", "),
    },
  };
  const d = map[type];
  const url = `${SITE_URL}/top-stocks/${type}`;
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    openGraph: { title: d.title, description: d.description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: d.title }] },
    twitter: { card: "summary_large_image", title: d.title, description: d.description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}
// ─── NEWS PAGE META ───────────────────────────────────────────────────────────
export function getNewsMeta(category?: string): Metadata {
  const catText = category && category !== "All" ? `${category} News & ` : "";
  const title = `${catText}Live Financial Intelligence ${y()} | Global Market Updates — MoneyPlant`;
  const description = `Access real-time ${category?.toLowerCase() ?? "global"} financial news, corporate earnings, and economic indicators. Stay ahead with MoneyPlant's live intelligence feed.`;

  let specificKeywords = ["financial news", "market updates", "breaking news", "economy news"];
  if (category === "Crypto") {
    specificKeywords = ["crypto news today", "bitcoin news live", "ethereum updates", "crypto regulation india", "altcoin news"];
  } else if (category === "Stocks") {
    specificKeywords = ["stock market news india", "nifty 50 news today", "sensex updates live", "corporate earnings news", "bonus issue news"];
  } else if (category === "IPO") {
    specificKeywords = ["ipo news today", "upcoming ipo updates", "gmp live news", "ipo allotment news", "listing gains news"];
  }

  const keywords = mixWithGlobalKeywords([], specificKeywords);
  const url = `${SITE_URL}/news${category && category !== "All" ? `?cat=${category}` : ""}`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Global News Hub" }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── MARKETS PAGE META ────────────────────────────────────────────────────────
export function getMarketsMeta(type: "global" | "india" | "all"): Metadata {
  const typeText = type === "global" ? "Global" : type === "india" ? "India" : "All";
  const title = `${typeText} Market Dashboard ${y()} | Live Indices & Benchmark Tracking`;
  const description = `Monitor ${typeText.toLowerCase()} market health with real-time dashboards. Track Nifty, Sensex, Dow Jones, and NASDAQ in a single premium terminal view.`;

  let specificKeywords: string[] = [];

  if (type === "india") {
    specificKeywords = [
      "indian stock market live", "nifty 50 today", "sensex live tracking", "nse bse live data",
      "indian indices performance", "bank nifty live", "midcap nifty today", "nifty next 50 live",
      "stock market india today", "live market india", "nse bse live today",
      "india stock market world ranking", "nse ranking in world", "bse vs nse live"
    ];
  } else if (type === "global") {
    specificKeywords = [
      "global markets live", "s&p 500 today", "dow jones live", "nasdaq tracking", "world market performance",
      "us market open today", "us pre market today", "us after hours today", "us tech stocks today",
      "apple nvidia tesla stock today", "uk stock market today", "ftse 100 live", "london stock exchange today",
      "european stock market", "dax live today", "cac 40 live", "nikkei 225 live", "hang seng live today",
      "asx 200 live", "emerging markets vs developed markets", "global market ranking 2025"
    ];
  } else {
    // MARKETS HUB (All) - EXHAUSTIVE RESTORATION
    specificKeywords = [
      "stock market india today", "live market india", "nse bse live today",
      "nifty 50 today", "sensex today", "bank nifty live",
      "global markets live", "world indices today", "s&p 500 today",
      "dow jones today", "nasdaq today", "ftse 100 today", "nikkei 225 today",
      "forex rates today", "usd to inr today", "dollar rate today india",
      "gold rate today india", "silver rate today india", "crude oil price today india",
      "bitcoin price india today", "crypto price india today",
      "top gainers today nse", "top losers today nse",
      "52 week high stocks india", "52 week low stocks today",
      "most active stocks india", "breakout stocks today",
      "s&p 500 live today", "dow jones live today", "nasdaq live today",
      "us market open today", "us pre market today", "us after hours today",
      "apple nvidia tesla stock today", "us tech stocks today",
      "uk stock market today", "ftse 100 live today", "london stock exchange today",
      "uk shares today", "british stocks today", "london market open today",
      "european stock market today", "dax live today", "cac 40 live today",
      "german stock market today", "french stock market today",
      "euronext today", "european shares today",
      "asian stock market today", "nikkei 225 live today", "hang seng live today",
      "shanghai composite live today", "kospi live today", "asx 200 live today",
      "japan stock market today", "china stock market today", "hong kong market today",
      "singapore market today", "australian stock market today",
      "middle east stock market today", "saudi stock market today", "tadawul live",
      "dubai stock market today", "dfm live today", "adx abu dhabi today",
      "qatar stock exchange today", "kuwait stock exchange today",
      "india vs usa stock market", "nifty vs dow jones today",
      "emerging markets vs developed markets", "asia vs europe stocks today",
      "global market crash today", "global market rally today",
      `world stock markets ${y()}`, `global market overview ${y()}`,
      "india stock market world ranking", "top stock exchanges ranking", "world's largest stock markets",
    ];
  }

  const dynamicMarkets = buildDynamicGlobalMarkets();
  const keywords = mixWithGlobalKeywords([...specificKeywords, ...dynamicMarkets], [
    "Stock Market", "Market Dashboard", "World Markets", "Indian Market"
  ]);
  const url = `${SITE_URL}/markets${type !== "all" ? `/${type}` : ""}`;
  return {
    title, description, keywords,
    openGraph: { title, description, url, type: "website", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Market Dashboard" }] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
    alternates: { canonical: url },
  };
}

// ─── TOOLS PAGE META ──────────────────────────────────────────────────────────
export function getToolsMeta(toolName?: string): Metadata {
  let specificKeywords: string[] = ["financial tools", "calculators", "money tools"];
  let title = `Financial Calculators & Tools ${y()} | SIP, EMI, Tax & Lumpsum`;
  let description = "Access a suite of professional financial calculators including SIP, EMI, Tax, and Lumpsum tools for your investment planning.";

  if (toolName === "SIP") {
    title = `SIP Calculator ${y()} | Estimate Mutual Fund Returns — MoneyPlant`;
    description = `Use our advanced SIP calculator to estimate the future value of your mutual fund investments today ${y()}. Plan your retirement and long-term wealth with precision.`;
    specificKeywords = [
      "sip calculator today", "mutual fund sip calculator", "sip returns estimator live",
      "wealth builder calculator", "investment calculator india", "monthly sip planner",
      "sip calculator online free", "best sip calculator 2025", "sip maturity amount calculator",
      "how much wealth will i have after 10 years", "sip calculator 1000 per month",
      "sip calculator 5000 per month", "sip calculator 10000 per month",
      "retirement planner sip", "child future planner sip", "higher education sip planner",
      "marriage fund sip calculator", "house purchase sip planner today",
      "sip returns 12 percent", "sip returns 15 percent", "sip returns 18 percent",
      "sip vs fd returns calculator", "sip vs rd returns", "sip vs gold returns",
      "sip vs real estate returns", "stock market sip calculator", "bitcoin sip calculator",
      "gold sip calculator india", "ppf vs sip calculator", "nps vs sip returns",
      "elss sip tax saving calculator", "sip calculator for beginners",
      "compound interest sip calculator", "inflation adjusted sip calculator",
      "step up sip calculator", "sip step up yearly 10 percent", "top up sip calculator",
      "quatrterly sip calculator", "weekly sip calculator today",
      "daily sip calculator returns", "best mutual funds for sip 2025",
      "top 20 sip stocks india", "index fund sip calculator today",
      "nifty 50 sip calculator", "sensex sip calculator live",
      "sip calculator usa", "sip calculator uk", "sip calculator uae dubai",
      "sip calculator australia", "sip calculator canada", "global mutual fund planner",
      "wealth tracker moneyplant", "sip profit vs investment calculator",
      `best wealth tools ${y()}`, `top 20 sip apps ${y()}`,
      "sip return chart nse bse", "historical sip returns data"
    ];
  } else if (toolName === "EMI") {
    title = `EMI Calculator ${y()} | Home, Car & Personal Loan Planner`;
    description = `Calculate your loan EMI instantly today ${y()}. Plan your Home Loan, Car Loan, or Personal Loan repayments with detailed interest schedules and principal breakdowns.`;
    specificKeywords = [
      "emi calculator today", "loan emi calculator live", "home loan emi calculator",
      "car loan emi calculator", "personal loan emi planner", "education loan emi calculator",
      "bike loan emi calculator", "mortgage emi calculator", "instant emi quote",
      "emi calculator india", "emi calculator usa", "emi calculator uk", "emi calculator uae",
      "emi calculator dubai", "emi calculator saudi arabia", "emi calculator canada",
      "emi calculator australia", "sbi home loan emi calculator", "hdfc car loan emi",
      "icici personal loan emi", "axis bank emi planner today", "bajaj finance emi calculator",
      "loan repayment calculator global", "interest only loan calculator", "reducing balance emi",
      "flat rate vs reducing rate calculator", "loan amortization schedule today",
      "how to calculate emi manually", "formula for emi calculation",
      "emi for 10 lakh home loan", "emi for 20 lakh home loan", "emi for 30 lakh home loan",
      "emi for 50 lakh home loan", "emi for 1 crore home loan", "loan eligibility calculator",
      "prepayment impact on emi", "part payment vs emi reduction", "loan tenure impact on interest",
      "low interest loan emi calculator", "best banks for emi in india",
      "foreclosure charges calculator", "lap loan against property emi",
      "gold loan emi calculator today", "business loan emi planner",
      "startup loan emi calculator", "msme loan emi calculator",
      "property loan emi calculator", "emi starting from today",
      `best loan planner ${y()}`, `top 20 emi calculators ${y()}`,
      "emi calculator online free", "emi calculator with graph and table",
      "emi calculator monthly reducing", "yearly vs monthly emi"
    ];
  } else if (toolName === "Income Tax") {
    title = `Income Tax Calculator FY 2024-25 & 2025-26 | New vs Old Regime`;
    description = `Compare New vs Old Tax Regimes for FY 2024-25 (AY 2025-26) today ${y()}. Check which regime saves you more money based on your salary and investments.`;
    specificKeywords = [
      "income tax calculator today", "new tax regime calculator india", "old tax regime vs new tax regime",
      "tax planner fy 2024-25", "income tax slabs 2025 india", "section 80c calculator",
      "standard deduction india today", "tax savings calculator", "tax for 10 lakh salary",
      "income tax calculator fy 2024-25", "income tax calculator india today",
      "new vs old tax regime calculator", "income tax slabs 2024-25 budget",
      "income tax calculator ay 2025-26", "tax savings calculator india",
      "salary tax calculator india", "take home salary calculator india",
      "standard deduction fy 2024-25", "section 80c tax savings list",
      "calculate tax on 10 lakh salary", "calculate tax on 15 lakh salary",
      "calculate tax on 5 lakh salary", "calculate tax on 20 lakh salary",
      "new tax regime slabs budget 2024", "rebate section 87a income tax",
      "marginal relief calculator india", "hra exemption calculator",
      "home loan interest tax benefit section 24b", "80d health insurance tax saving",
      "nps tax benefit section 80ccd", "tax on capital gains india",
      "stcg ltcg tax calculator india", "tax on share market profit",
      "tax on mutual fund returns india", "crypto tax india 2025",
      "30 percent crypto tax india", "tds on crypto today",
      "income tax return itr 1 filing today", "itr 2 tax calculator",
      "business income tax calculator india", "freelance tax calculator india",
      "professional tax calculator india", "tax planning for salaried employees",
      "best tax saving investments today", "ppf vs nps vs elss for tax saving",
      "income tax refund status today", "calculate surcharge on high income",
      "health and education cess calculator", "income tax calculator sbi",
      "income tax calculator moneycontrol", "cleartax income tax calculator alternative",
      "income tax india gov in calculator", "tax planning guide 2025 india",
      `income tax fy 2025-26 ${y()}`, `tax planning ${y()}`,
      "new tax regime benefits", "how to save 1 lakh tax in india",
      "tax zero on 7 lakh income how", "standard deduction for pensioners",
      "senior citizen tax slabs fy 2024-25", "super senior citizen tax calculator"
    ];
  } else if (toolName === "Lumpsum") {
    title = `Lumpsum Calculator ${y()} | Mutual Fund Returns Estimator`;
    description = `Calculate potential returns on your one-time lumpsum mutual fund investments today ${y()}. Plan your wealth growth with precision and compare with SIP.`;
    specificKeywords = [
      "lumpsum calculator today", "one time investment calculator", "mutual fund lumpsum estimator",
      "lump sum return calculator live", "investment returns estimator worldwide",
      "finance tools moneyplant", "best lumpsum calculator 2025", "wealth growth calculator",
      "calculate returns on 1 lakh", "calculate returns on 5 lakh", "calculate returns on 10 lakh",
      "fd vs mutual fund lumpsum", "lumpsum return after 5 years", "lumpsum return after 10 years",
      "lumpsum return after 20 years", "stock market lumpsum calculator",
      "crypto lumpsum return calculator", "gold lumpsum returns india",
      "compound interest lumpsum calculator", "future value of one time investment",
      "retirement corpus lumpsum calculator", "child education lumpsum planner",
      "lumpsum calculator india", "lumpsum calculator usa", "lumpsum calculator uk",
      "lumpsum calculator uae", "lumpsum calculator saudi arabia",
      "best way to invest 10 lakh today", "where to invest lumpsum money 2025",
      "lumpsum returns 12 percent", "lumpsum returns 15 percent", "lumpsum returns 20 percent",
      "inflation adjusted lumpsum calculator", "tax impact on lumpsum withdrawal india",
      "major cap gain tax calculator", "lumpsum profit vs investment",
      "mutual fund lumpsum returns chart", "historical lumpsum returns nse bse",
      "nifty 50 lumpsum performance idag", "sensex lumpsum returns history",
      "real estate vs lumpsum fund returns", "gold bullion vs lumpsum investment",
      "lumpsum return formula", "how is lumpsum return calculated",
      `best investment tools ${y()}`, `top 20 financial apps ${y()}`,
      "moneyplant wealth estimator", "lumpsum returns on index funds"
    ];
  }

  const keywords = mixWithGlobalKeywords(specificKeywords, [
    toolName ? `${toolName} Calculator` : "Financial Tools",
    "Investment Calculator", "Wealth Planner"
  ]);
  const url = `${SITE_URL}/tools${toolName ? `/${toolName.toLowerCase().replace(" ", "-")}` : ""}`;

  return {
    title, description, keywords,
    openGraph: { title, description, url, images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: toolName || "Financial Tools" }] },
    twitter: { title, description },
    alternates: { canonical: url },
  };
}

// ─── COMMON PAGES META ────────────────────────────────────────────────────────
export function getCommonMeta(pageName: string, path: string): Metadata {
  const title = `${pageName} | MoneyPlant — Premium Finance Portal ${y()}`;
  const description = `Read our ${pageName.toLowerCase()} and understand how we operate. MoneyPlant is committed to transparency and excellence in financial data.`;
  return {
    title, description,
    openGraph: { title, description, url: `${SITE_URL}${path}` },
    twitter: { title, description },
    alternates: { canonical: `${SITE_URL}${path}` },
  };
}
