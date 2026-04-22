import type { Metadata } from "next";
import Link from "next/link";
import { fetchMultipleQuotes } from "@/lib/stocks";
import {
  NIFTY50_STOCKS, NIFTY_NEXT50,
  ADANI_STOCKS, RELIANCE_STOCKS, TATA_STOCKS,
  BAJAJ_STOCKS, MAHINDRA_STOCKS, BIRLA_STOCKS,
  HDFC_STOCKS, ICICI_STOCKS, SBI_STOCKS,
  LT_STOCKS, JSW_STOCKS, ITC_STOCKS,
  PHARMA_STOCKS, IT_STOCKS, AUTO_STOCKS,
  BANK_STOCKS, FMCG_STOCKS, REALTY_STOCKS, PSU_STOCKS,
  INDICES,
} from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import { MiniTrekCard, WideStatCard, GroupSidebar } from "@/components/VisualCards";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Indian Stock Market Today ${new Date().getFullYear()} | NSE BSE Live | All Sectors & Groups | MoneyPlant`,
  description:
    `Track the complete Indian stock market live ${new Date().getFullYear()} — Nifty 50, Sensex, all NSE/BSE sectors (IT, Banking, Pharma, Auto, FMCG, Real Estate), conglomerates (Adani, Reliance, Tata, Bajaj, Birla, HDFC, ICICI, SBI, L&T, ITC, JSW, Vedanta, Godrej, Mahindra) and 500+ stocks in one place.`,
  keywords: [
    "indian stock market today", "nse bse live today", "nifty 50 live", "sensex today",
    "all indian stocks live", "india market today", "nse live market", "bse live market",
    "adani reliance tata stocks", "top 50 stocks india", "nifty 50 stocks list price",
    "nifty next 50 stocks", "it stocks india live", "banking stocks india live",
    "pharma stocks india", "auto stocks nse", "fmcg stocks india", "psu stocks today",
    "real estate stocks india", "top gainers india today", "top losers india today",
    "most traded stocks india", "blue chip stocks india", "large cap stocks india",
    "midcap stocks today", "smallcap stocks india",
    `best stocks to buy today india ${new Date().getFullYear()}`,
    "stock market india sectors", "nse sector performance today", "india equity market live",
    "share market india update", "market breadth india", "advance decline ratio india",
    "52 week high stocks india", "52 week low stocks india",
    "stock market holiday india", "nse trading hours india", "bse trading hours india",
    // NEW: Year-dynamic top-20
    `top 20 stocks india ${new Date().getFullYear()}`,
    `top 20 nse stocks ${new Date().getFullYear()}`,
    `top 20 bse stocks ${new Date().getFullYear()}`,
    `top 20 indian stocks to buy ${new Date().getFullYear()}`,
    `best 20 stocks india ${new Date().getFullYear()}`,
    `multibagger stocks ${new Date().getFullYear()} india`,
    `stocks to watch ${new Date().getFullYear()} india`,
    // NEW: Weekly time-period
    "nifty 50 this week", "nifty 50 weekly gain loss", "nifty 50 1 week change",
    "sensex this week", "sensex weekly performance", "sensex 1 week return",
    "indian stocks this week", "best nse stocks this week", "top gainers this week nse",
    "stocks rising this week india", "weekly top gainers bse", "market rally this week",
    "stocks 52 week high this week", "breakout stocks this week india",
    // NEW: Conglomerates
    "adani group stocks live", "reliance group stocks live", "tata group stocks live",
    "bajaj group stocks", "mahindra group stocks", "birla group stocks",
    "hdfc group stocks", "icici group stocks", "sbi group stocks",
    "lt group stocks", "itc stocks", "jsw group stocks",
    "vedanta stocks", "godrej group stocks",
    // NEW: Sector-specific
    "nifty bank live", "bank stocks nse today", "psu bank stocks india",
    "private bank stocks india", "tcs infosys wipro hcl share price",
    "sun pharma cipla drreddy share price", "maruti tata motors mmm share price",
    "hul nestle itc share price", "ongc ntpc coal india share price",
    "dlf godrej properties oberoi realty share price",
    // NEW: FII/DII
    "fii buying today india", "dii buying today", "fii selling today", "dpi data today",
    "foreign institutional investor india today", "institutional activity india",
    // NEW: Results season
    "quarterly results today india", "q4 results india", "earnings season india",
    "results beat miss today india", "dividend declaration today",
    // GLOBAL — NRI & International investors watching India
    "india stock market from usa", "india stock market from uk",
    "india stock market from dubai", "india stock market from canada",
    "india stock market from singapore", "india stock market from australia",
    "how to invest in indian market from abroad", "nri invest india stocks",
    "foreign investor buy india stocks", "fpi india today",
    "india market in usd today", "nifty 50 in usd today",
    "sensex in usd today", "india market cap usd",
    "india stock market world ranking", "india vs china stock market",
    "india vs usa stock market comparison", "india emerging market",
    "msci india index today", "ftse india index today",
    // GLOBAL — India economic context
    "india gdp growth today", "india inflation today",
    "rbi interest rate india", "rbi monetary policy today",
    "india budget impact stocks", "india forex reserves today",
    "india trade balance today", "india rupee outlook today",
    // GLOBAL — Specific countries watching India
    "indian stocks popular in usa", "adani reliance tata global investors",
    "tata motors jlr stock uk", "wipro infosys tcs stock usa",
    "hdfc bank adr us", "infosys us market", "dr reddy us market",
    `india market global outlook ${new Date().getFullYear()}`,
  ].join(", "),
  openGraph: {
    title: `Indian Stock Market Today ${new Date().getFullYear()} | NSE BSE Live | All Sectors | MoneyPlant`,
    description: `Complete Indian stock market live ${new Date().getFullYear()} coverage — Nifty 50, Sensex, all sectors, conglomerates, and 500+ stocks.`,
    url: "https://moneyplant24.com/markets/india",
  },
  alternates: { canonical: "https://moneyplant24.com/markets/india" },
};

const SECTOR_SECTIONS = [
  { id: "conglomerates", label: "🏦 Conglomerates", desc: "Major Indian business groups" },
  { id: "nifty50", label: "📊 Nifty 50", desc: "India's benchmark 50 stocks" },
  { id: "banking", label: "🏛️ Banking", desc: "PSU & Private Banks" },
  { id: "it", label: "💻 IT / Technology", desc: "Indian IT services leaders" },
  { id: "pharma", label: "🏥 Pharmaceuticals", desc: "Healthcare & Drugs" },
  { id: "auto", label: "🚗 Automobiles", desc: "Two-wheelers, Cars & EVs" },
  { id: "fmcg", label: "🛒 FMCG", desc: "Consumer & Household goods" },
  { id: "psu", label: "🏗️ PSU / Govt", desc: "Public Sector Undertakings" },
  { id: "realty", label: "🏠 Real Estate", desc: "Developers & Builders" },
];

const CONGLOMERATES_DIR = [
  { label: "Adani Group", href: "/conglomerates/adani", emoji: "🏦", count: 14, desc: "Ports, Power, Energy, Cement" },
  { label: "Reliance Group", href: "/conglomerates/reliance", emoji: "⚡", count: 8, desc: "Telecom, Retail, Oil & Gas" },
  { label: "Tata Group", href: "/conglomerates/tata", emoji: "🔷", count: 18, desc: "IT, Auto, Steel, Hotels" },
  { label: "Bajaj Group", href: "/conglomerates/bajaj", emoji: "🅱️", count: 6, desc: "Finance, Auto, Electricals" },
  { label: "Mahindra Group", href: "/conglomerates/mahindra", emoji: "🚙", count: 9, desc: "SUVs, IT, Finance, Agri" },
  { label: "Aditya Birla Group", href: "/conglomerates/birla", emoji: "💎", count: 10, desc: "Cement, Metals, Telecom, Fashion" },
  { label: "HDFC Group", href: "/conglomerates/hdfc", emoji: "🏛️", count: 4, desc: "Banking, Insurance, AMC" },
  { label: "ICICI Group", href: "/conglomerates/icici", emoji: "🦁", count: 4, desc: "Bank, Insurance, Broking" },
  { label: "SBI Group", href: "/conglomerates/sbi", emoji: "🏦", count: 3, desc: "PSU Bank, Cards, Life Insurance" },
  { label: "L&T Group", href: "/conglomerates/lt", emoji: "⚙️", count: 5, desc: "Engineering, IT, Finance" },
  { label: "ITC Group", href: "/conglomerates/itc", emoji: "🌿", count: 2, desc: "FMCG, Tobacco, Hotels" },
  { label: "JSW Group", href: "/conglomerates/jsw", emoji: "🏗️", count: 4, desc: "Steel, Energy, Infra" },
  { label: "Vedanta Group", href: "/conglomerates/vedanta", emoji: "🪨", count: 3, desc: "Zinc, Aluminium, Copper, Oil" },
  { label: "Godrej Group", href: "/conglomerates/godrej", emoji: "🏛️", count: 4, desc: "FMCG, Real Estate, Agri" },
];

async function getData() {
  const [niftyIndices, nifty50, banking, it, pharma, auto, fmcg, psu] = await Promise.all([
    fetchMultipleQuotes(INDICES.slice(0, 6).map((i) => i.symbol)),
    fetchMultipleQuotes(NIFTY50_STOCKS.slice(0, 10)),
    fetchMultipleQuotes(BANK_STOCKS.slice(0, 10).map((s) => s.symbol)),
    fetchMultipleQuotes(IT_STOCKS.slice(0, 10).map((s) => s.symbol)),
    fetchMultipleQuotes(PHARMA_STOCKS.slice(0, 10).map((s) => s.symbol)),
    fetchMultipleQuotes(AUTO_STOCKS.slice(0, 10).map((s) => s.symbol)),
    fetchMultipleQuotes(FMCG_STOCKS.slice(0, 10).map((s) => s.symbol)),
    fetchMultipleQuotes(PSU_STOCKS.slice(0, 10).map((s) => s.symbol)),
  ]);
  return { niftyIndices, nifty50, banking, it, pharma, auto, fmcg, psu };
}

export default async function IndiaMarketsPage() {
  const { niftyIndices, nifty50, banking, it, pharma, auto, fmcg, psu } = await getData();
  
  const nifty = niftyIndices.find(q => q.symbol === "^NSEI");
  const sensex = niftyIndices.find(q => q.symbol === "^BSESN");

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://moneyplant24.com" },
        { name: "Indian Markets", url: "https://moneyplant24.com/markets/india" },
      ])} />
      {/* ... (faqSchema unchanged) */}

      <div className="container section">
        {/* Page header (re-aligned) */}
        <div style={{ marginBottom: "3rem" }}>
          <nav style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "1.25rem", display: "flex", gap: "4px" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#94a3b8" }}>Indian Markets</span>
          </nav>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
                🇮🇳 Indian Stock Market
              </h1>
              <p style={{ color: "#64748b", fontSize: "1.05rem", maxWidth: "800px", lineHeight: 1.7 }}>
                Real-time tracking of NSE & BSE benchmarks, sectoral leaders, and the 50 stocks that power the Indian economy.
              </p>
            </div>
          </div>
        </div>

        {/* Top Direct Benchmarks (Wide Cards) */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem", flexWrap: "wrap" }}>
           {nifty && (
             <WideStatCard 
               label="NIFTY 50" 
               value={nifty.price} 
               changePercent={nifty.changePercent} 
               change={nifty.change} 
               href="/indices/nifty-50"
               delay={0.1}
             />
           )}
           {sensex && (
             <WideStatCard 
               label="SENSEX" 
               value={sensex.price} 
               changePercent={sensex.changePercent} 
               change={sensex.change} 
               href="/indices/sensex"
               delay={0.2}
             />
           )}
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 340px", 
          gap: "2.5rem" 
        }} className="india-grid">
          
          {/* Main Content Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {/* Nifty 50 Detail (Matches user request/screenshot for "Performance") */}
            <section id="nifty50">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>📊 Nifty 50 Performance</h2>
                <Link href="/indices/nifty-50" style={{ fontSize: "0.9rem", color: "#3b82f6", textDecoration: "none", fontWeight: 700 }}>View Full Composition ›</Link>
              </div>
              <MarketTable quotes={nifty50} showRank />
            </section>

            {/* Other Indian Indices */}
            <section>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Live Sectoral Indices</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
                {niftyIndices.slice(2).map((q, i) => {
                  const idx = INDICES.find((idx) => idx.symbol === q.symbol);
                  return (
                    <MiniTrekCard 
                      key={q.symbol}
                      label={idx?.name || q.symbol}
                      symbol={q.symbol}
                      price={q.price}
                      changePercent={q.changePercent}
                      href={`/indices/${idx?.id ?? q.symbol}`}
                      delay={0.1 + i * 0.05}
                    />
                  );
                })}
              </div>
            </section>

            {/* Banking Sector */}
            <section id="banking">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>🏛️ Banking Leaders</h2>
              <MarketTable quotes={banking} showRank />
            </section>

            {/* IT Sector */}
            <section id="it">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>💻 IT & Tech</h2>
              <MarketTable quotes={it} showRank />
            </section>
          </div>

          {/* Sidebar Area */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <GroupSidebar groups={CONGLOMERATES_DIR.map(g => ({ label: g.label, href: g.href }))} />
            
            {/* Sector Jump Links (Ported here) */}
            <div className="card" style={{ padding: "1.5rem" }}>
               <h3 style={{ fontSize: "0.9rem", fontWeight: 800, marginBottom: "1rem", color: "#64748b", textTransform: "uppercase" }}>Quick Navigation</h3>
               <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {SECTOR_SECTIONS.slice(2).map(s => (
                    <a key={s.id} href={`#${s.id}`} style={{
                      padding: "0.6rem 0.85rem",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#94a3b8",
                      textDecoration: "none",
                      borderRadius: "8px",
                      background: "rgba(30, 41, 59, 0.4)",
                      border: "1px solid rgba(51, 65, 85, 0.4)",
                      transition: "all 0.2s"
                    }} className="nav-pill">
                      {s.label}
                    </a>
                  ))}
               </div>
            </div>
          </aside>
        </div>

        {/* Banking Sector */}
        <section id="banking" style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>🏛️ Banking Stocks</h2>
              <p style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>PSU Banks + Private Banks — Live NSE</p>
            </div>
          </div>
          <MarketTable quotes={banking} showRank />
        </section>

        {/* IT Sector */}
        <section id="it" style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>💻 IT & Technology Stocks</h2>
              <p style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>TCS, Infosys, Wipro, HCL, Tech Mahindra & more</p>
            </div>
          </div>
          <MarketTable quotes={it} showRank />
        </section>

        {/* Pharma */}
        <section id="pharma" style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>🏥 Pharma & Healthcare Stocks</h2>
            <p style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>Sun Pharma, Dr Reddy's, Cipla, Divi's, Biocon & more</p>
          </div>
          <MarketTable quotes={pharma} showRank />
        </section>

        {/* Auto */}
        <section id="auto" style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>🚗 Auto & EV Stocks</h2>
            <p style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>Maruti, Tata Motors, M&M, Hero, Bajaj Auto, TVS & more</p>
          </div>
          <MarketTable quotes={auto} showRank />
        </section>

        {/* FMCG */}
        <section id="fmcg" style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>🛒 FMCG Stocks</h2>
            <p style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>HUL, ITC, Nestle, Britannia, Godrej CP, Dabur & more</p>
          </div>
          <MarketTable quotes={fmcg} showRank />
        </section>

        {/* PSU */}
        <section id="psu" style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>🏗️ PSU / Government Stocks</h2>
            <p style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>ONGC, BPCL, NTPC, Power Grid, Coal India, HAL, BEL, IRCTC & more</p>
          </div>
          <MarketTable quotes={psu} showRank />
        </section>

        {/* Quick links to more */}
        <section style={{ marginTop: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "📈 Top Gainers", href: "/top-stocks/gainers" },
              { label: "📉 Top Losers", href: "/top-stocks/losers" },
              { label: "🔥 Most Active", href: "/top-stocks/most-active" },
              { label: "📋 IPO Tracker", href: "/ipo" },
              { label: "🌍 Global Markets", href: "/markets/global" },
              { label: "₿ Crypto", href: "/crypto" },
              { label: "💱 Forex", href: "/forex" },
              { label: "🥇 Gold Rate", href: "/commodities/gold" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "0.9rem 1.1rem", fontWeight: 600, fontSize: "0.88rem", color: "#94a3b8" }}>
                  {l.label}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .nav-pill:hover {
          background: rgba(59, 130, 246, 0.2) !important;
          color: #3b82f6 !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
        }
        @media (max-width: 1024px) {
          .india-grid {
            grid-template-columns: 1fr !important;
          }
          aside {
            order: -1; /* Sidebar above content on tablet/mobile */
          }
        }
      `}</style>
    </>
  );
}
