import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, TrendingDown, Activity, BarChart2, Globe, Coins, DollarSign, Gem, Flame, HardHat, Shield, Zap, FileText, RefreshCw, Bitcoin } from "lucide-react";
import { ICON_MAP } from "@/lib/icons";
import { getHomeMeta } from "@/lib/meta";
import { fetchMultipleQuotes } from "@/lib/stocks";
import { fetchCryptoList } from "@/lib/crypto";
import { fetchAllForexRates } from "@/lib/forex";
import { fetchMarketNews } from "@/lib/news";
import { NIFTY50_STOCKS, CRYPTO_LIST, GLOBAL_INDICES, ADANI_STOCKS, RELIANCE_STOCKS } from "@/lib/constants";
import { IntelligenceCard } from "@/components/VisualCards";
import MarketTable from "@/components/MarketTable";
import JsonLd, { websiteSchema, organizationSchema, breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import HeroV2 from "@/components/HeroV2";
import DashboardSidebarCard from "@/components/DashboardSidebarCard";
import HomeFAQs from "@/components/HomeFAQs";
import { getGlobalFaqs } from "@/lib/faqs";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = getHomeMeta();
export const revalidate = 3600; // 1 hour

const HOMEPAGE_FAQS = [
  { q: "How can I track global market indices in real-time?", a: "MoneyPlant provides live data for major global indices including the S&P 500, NASDAQ Composite, Dow Jones, FTSE 100, and Nikkei 225. You can view real-time charts and technical analysis on our Global Markets page." },
  { q: "What are the trading hours for the New York Stock Exchange (NYSE)?", a: "The NYSE and NASDAQ are open Monday through Friday from 9:30 AM to 4:00 PM Eastern Time (ET). MoneyPlant provides a live countdown to market open and close for all major global exchanges." },
  { q: "Where can I check live Bitcoin and Ethereum prices?", a: "Live cryptocurrency prices for Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and over 1,000 other digital assets are available on MoneyPlant. We provide prices in USD, EUR, and other major fiat currencies with second-by-second updates." },
  { q: "How are forex exchange rates calculated?", a: "Our forex rates are sourced from major global liquidity providers and updated in real-time. We cover major pairs like EUR/USD, GBP/USD, and USD/JPY, as well as emerging market currencies." },
  { q: "What is the current global price of Gold and Silver?", a: "Global commodity prices for Gold, Silver, and Crude Oil are tracked via COMEX and NYMEX futures. MoneyPlant provides live spot prices and daily change analysis for precious metals." },
  { q: "Can I track international stocks on MoneyPlant?", a: "Yes, you can monitor top global stocks from the US, Europe, and Asia. Our dashboard allows you to create a global watchlist to track your favorite international companies across multiple exchanges." },
  { q: "What is market sentiment and how is it measured?", a: "Market sentiment reflects the overall attitude of investors toward a particular market or asset. MoneyPlant uses the VIX (Volatility Index) and other technical indicators to provide a live Fear & Greed sentiment analysis." },
  { q: "How often is the market data updated?", a: "Most of our global indices, crypto, and forex data is updated every minute or in real-time during active trading sessions to ensure you have the most accurate financial intelligence." },
];

async function getData() {
  const [globalHeroStats, globalIndices, cryptos, forex, adaniPrices, reliancePrices] = await Promise.all([
    fetchMultipleQuotes(["GC=F", "SI=F", "CL=F", "^GSPC", "^IXIC", "^DJI", "^N225"]),
    fetchMultipleQuotes(GLOBAL_INDICES.slice(0, 10).map((i) => i.symbol)),
    fetchCryptoList(CRYPTO_LIST.slice(0, 20).map((c) => c.id)),
    fetchAllForexRates(),
    fetchMultipleQuotes(ADANI_STOCKS.slice(0, 6).map((s) => s.symbol)),
    fetchMultipleQuotes(RELIANCE_STOCKS.slice(0, 5).map((s) => s.symbol)),
  ]);
  return { globalHeroStats, globalIndices, cryptos, forex, adaniPrices, reliancePrices };
}

function StatCard({
  label,
  value,
  change,
  changePercent,
  icon,
  href,
}: {
  label: string;
  value: string;
  change?: number;
  changePercent?: number;
  icon: React.ReactNode;
  href: string;
}) {
  const pos = (changePercent ?? 0) > 0;
  const neg = (changePercent ?? 0) < 0;
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        className="card card-hover"
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {label}
          </span>
          <span style={{ color: "#334155" }}>{icon}</span>
        </div>
        <div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f1f5f9", fontFamily: "var(--font-sora)" }}>
            {value}
          </div>
          {changePercent !== undefined && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
              {pos ? <TrendingUp size={13} color="#10b981" /> : neg ? <TrendingDown size={13} color="#ef4444" /> : null}
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: pos ? "#10b981" : neg ? "#ef4444" : "#94a3b8" }}>
                {pos ? "+" : ""}{changePercent.toFixed(2)}%
              </span>
              {change !== undefined && (
                <span style={{ fontSize: "0.75rem", color: "#475569" }}>
                  ({pos ? "+" : ""}{change.toFixed(2)})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const { globalHeroStats, globalIndices, cryptos, forex, adaniPrices, reliancePrices } = await getData();

  const gold = globalHeroStats.find(q => q.symbol === "GC=F");
  const silver = globalHeroStats.find(q => q.symbol === "SI=F");
  const btc = cryptos.find((c) => c.id === "bitcoin");
  const eth = cryptos.find((c) => c.id === "ethereum");
  const sol = cryptos.find((c) => c.id === "solana");
  const bnb = cryptos.find((c) => c.id === "binancecoin");
  const sp500 = globalHeroStats.find(q => q.symbol === "^GSPC");
  const nasdaq = globalHeroStats.find(q => q.symbol === "^IXIC");
  const dow = globalHeroStats.find(q => q.symbol === "^DJI");
  const nikkei = globalHeroStats.find(q => q.symbol === "^N225");
  const usdInr = forex.find((f) => f.pair === "USDINR=X");
  const eurUsd = forex.find((f) => f.pair === "EURUSD=X");
  const gbpUsd = forex.find((f) => f.pair === "GBPUSD=X");

  const dynamicFaqs = getGlobalFaqs();

  const fmt = (n: number, d = 2) =>
    n > 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: d }) : n.toFixed(d);

  const jsonLdData = [
    websiteSchema(),
    organizationSchema(),
    breadcrumbSchema([{ name: "Home", url: "https://moneyplant24.com" }]),
    faqSchema(HOMEPAGE_FAQS),
  ];

  return (
    <>
      {jsonLdData.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}

      {/* ── Hero V2: Framer Motion + Three.js 3D Globe ── */}
      <HeroV2
        statCards={[
          ...(btc ? [{ label: "Bitcoin (USD)", value: `$${fmt(btc.priceUsd)}`, changePercent: btc.change24h, icon: <Bitcoin size={18} />, href: "/crypto/bitcoin" }] : []),
          ...(sp500 ? [{ label: "S&P 500", value: `${fmt(sp500.price)}`, changePercent: sp500.changePercent, icon: <BarChart2 size={18} color="#10b981" />, href: "/indices/sp500" }] : []),
          ...(eurUsd ? [{ label: "EUR / USD", value: `${eurUsd.rate.toFixed(4)}`, changePercent: eurUsd.changePercent, icon: <DollarSign size={18} color="#3b82f6" />, href: "/forex/eur-to-usd" }] : []),
          ...(nasdaq ? [{ label: "NASDAQ", value: `${fmt(nasdaq.price)}`, changePercent: nasdaq.changePercent, icon: <Activity size={18} color="#8b5cf6" />, href: "/indices/nasdaq" }] : []),
          ...(eth ? [{ label: "Ethereum (USD)", value: `$${fmt(eth.priceUsd)}`, changePercent: eth.change24h, icon: <Gem size={18} color="#6366f1" />, href: "/crypto/ethereum" }] : []),
          ...(gold ? [{ label: "Gold (oz)", value: `$${fmt(gold.price)}`, changePercent: gold.changePercent, icon: <Gem size={18} color="#f59e0b" />, href: "/commodities/gold" }] : []),
          ...(gbpUsd ? [{ label: "GBP / USD", value: `${gbpUsd.rate.toFixed(4)}`, changePercent: gbpUsd.changePercent, icon: <DollarSign size={18} color="#10b981" />, href: "/forex/gbp-to-usd" }] : []),
          ...(sol ? [{ label: "Solana (USD)", value: `$${fmt(sol.priceUsd)}`, changePercent: sol.change24h, icon: <Zap size={18} color="#8b5cf6" />, href: "/crypto/solana" }] : []),
          ...(dow ? [{ label: "Dow Jones", value: `${fmt(dow.price)}`, changePercent: dow.changePercent, icon: <TrendingUp size={18} color="#ef4444" />, href: "/indices/dow-jones" }] : []),
          ...(nikkei ? [{ label: "Nikkei 225", value: `${fmt(nikkei.price)}`, changePercent: nikkei.changePercent, icon: <Globe size={18} color="#3b82f6" />, href: "/indices/nikkei-225" }] : []),
          ...(silver ? [{ label: "Silver (oz)", value: `$${fmt(silver.price)}`, changePercent: silver.changePercent, icon: <HardHat size={18} color="#94a3b8" />, href: "/commodities/silver" }] : []),
          ...(bnb ? [{ label: "BNB (USD)", value: `$${fmt(bnb.priceUsd)}`, changePercent: bnb.change24h, icon: <Coins size={18} color="#facc15" />, href: "/crypto/binancecoin" }] : []),
          ...(usdInr ? [{ label: "USD to INR", value: `₹${usdInr.rate.toFixed(2)}`, changePercent: usdInr.changePercent, icon: <DollarSign size={18} />, href: "/forex/usd-to-inr" }] : []),
        ]}
      />




      {/* ── Main Content ── */}
      <div className="container section">
        {/* Quick links */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
            paddingBottom: "1.5rem",
            borderBottom: "1px solid rgba(51,65,85,0.3)",
          }}
        >
          {[
            { label: "Top Gainers", href: "/top-stocks/gainers", Icon: ICON_MAP.gainers },
            { label: "Top Losers", href: "/top-stocks/losers", Icon: ICON_MAP.losers },
            { label: "Most Active", href: "/top-stocks/most-active", Icon: ICON_MAP.active },
            { label: "CBOE VIX Index", href: "/indices/vix", Icon: Shield },
            { label: "AUD to USD", href: "/forex/aud-to-usd", Icon: DollarSign },
            { label: "Bitcoin Price", href: "/crypto/bitcoin", Icon: Bitcoin },
            { label: "Stocks Directory", href: "/stocks/directory", Icon: BarChart2 },
            { label: "Adani Stocks", href: "/conglomerates/adani", Icon: ICON_MAP.adani },
            { label: "Reliance", href: "/conglomerates/reliance", Icon: ICON_MAP.reliance },
            { label: "Tata Stocks", href: "/conglomerates/tata", Icon: ICON_MAP.tata },
            { label: "Crypto Hub", href: "/crypto", Icon: ICON_MAP.crypto },
            { label: "Forex rates", href: "/forex", Icon: ICON_MAP.forex },
            { label: "Gold Spot", href: "/commodities/gold", Icon: Gem },
            { label: "Silver Spot", href: "/commodities/silver", Icon: RefreshCw },
            { label: "IPO Tracker", href: "/ipo", Icon: ICON_MAP.ipo },
            { label: "Market News", href: "/news", Icon: FileText },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="tag-link"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <link.Icon size={14} />
              {link.label}
            </Link>
          ))}
        </div>

        <AdUnit slot="6022839401" format="horizontal" />

        {/* ── Market Intelligence Hub ── */}
        <section style={{ marginBottom: "4rem" }}>
          <div className="intelligence-grid">
            <IntelligenceCard
              title="Global Markets"
              href="/markets/global"
              accentColor="#3b82f6"
              icon={<Globe size={20} />}
              messages={[
                "Track S&P 500, Dow Jones, and NASDAQ in real-time.",
                "Monitor US market hours and global sentiment in IST time.",
                "Analyze European (FTSE, DAX) and Asian (Nikkei) indices.",
                "Real-time volatility alerts and global market correlations."
              ]}
            />
            <IntelligenceCard
              title="Crypto Hub"
              href="/crypto"
              accentColor="#f59e0b"
              icon={<Coins size={20} />}
              messages={[
                "Bitcoin, Ethereum, and 1000+ altcoins with live data.",
                "Real-time INR prices and 24h market cap analysis.",
                "Track DeFi tokens, Layer 2s, and NFT floor prices.",
                "Monitor whale movements and social sentiment for digital assets."
              ]}
            />
            <IntelligenceCard
              title="Forex Terminal"
              href="/forex"
              accentColor="#10b981"
              icon={<DollarSign size={20} />}
              messages={[
                "USD to INR, EUR, and GBP. Live exchange rates.",
                "RBI reference data and global currency pair movements.",
                "Track emerging market currencies and G10 volatility.",
                "Monitor central bank rate decisions and inflation data."
              ]}
            />
          </div>
        </section>

        <div className="content-grid">
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Global Markets */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="section-title" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ICON_MAP.global size={22} className="text-gradient" />
                  Global Market Indices
                </h2>
                <Link href="/markets/global" style={{ fontSize: "0.82rem", color: "#3b82f6", textDecoration: "none" }}>
                  View All →
                </Link>
              </div>
              <MarketTable quotes={globalIndices} linkPrefix="/indices" />
            </section>

            {/* Crypto Hub Preview */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="section-title" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ICON_MAP.crypto size={22} className="text-gradient" />
                  Top Cryptocurrencies (USD)
                </h2>
                <Link href="/crypto" style={{ fontSize: "0.82rem", color: "#3b82f6", textDecoration: "none" }}>
                  Explore Hub →
                </Link>
              </div>
              <MarketTable 
                quotes={cryptos.slice(0, 6).map(c => ({
                  symbol: c.symbol,
                  name: c.name,
                  price: c.priceUsd,
                  change: 0, // Simplified for preview
                  changePercent: c.change24h,
                  volume: 0,
                  marketCap: 0,
                  currency: "USD",
                  currencySymbol: "$"
                }))} 
                showRank 
              />
            </section>

            {/* Adani Group Preview */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <ICON_MAP.adani size={18} />
                  Adani Group
                </h3>
                <Link href="/conglomerates/adani" style={{ fontSize: "0.75rem", color: "#64748b", textDecoration: "none" }}>
                  View More
                </Link>
              </div>
              <MarketTable quotes={adaniPrices} />
            </section>

            {/* Reliance Group Preview */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f1f5f9", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <ICON_MAP.reliance size={18} />
                  Reliance Group
                </h3>
                <Link href="/conglomerates/reliance" style={{ fontSize: "0.75rem", color: "#64748b", textDecoration: "none" }}>
                  View More
                </Link>
              </div>
              <MarketTable quotes={reliancePrices} />
            </section>

            {/* FAQ Accordion (for SEO) */}
            <section style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "4px", height: "18px", background: "linear-gradient(to bottom, #10b981, #3b82f6)", borderRadius: "2px" }} />
                <h2 className="section-title" style={{ marginBottom: 0 }}>Frequently Asked Questions</h2>
              </div>
              <HomeFAQs faqs={dynamicFaqs} />
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* News Widget - Driving traffic to News Hub */}
            <DashboardSidebarCard
              title="Market Intelligence"
              icon={<FileText size={18} color="#10b981" />}
              viewAllHref="/news"
              shuffle={true}
              items={(await fetchMarketNews("All")).slice(0, 15).map((n) => ({
                id: n.id.toString(),
                name: n.author,
                symbol: n.category,
                value: n.title,
                href: "/news",
                image: n.category === "Crypto" ? "https://cdn-icons-png.flaticon.com/512/6001/6001331.png" : "https://cdn-icons-png.flaticon.com/512/2965/2965306.png"
              }))}
            />

            {/* Crypto Widget */}
            <DashboardSidebarCard
              title="Top Crypto — USD"
              icon={<ICON_MAP.crypto size={18} color="#f59e0b" />}
              viewAllHref="/crypto"
              items={cryptos.slice(0, 20).map((c) => ({
                id: c.id,
                name: c.name,
                symbol: c.symbol.toUpperCase(),
                value: `$${fmt(c.priceUsd)}`,
                changePercent: c.change24h,
                image: c.image,
                href: `/crypto/${c.id}`,
              }))}
            />

            {/* Forex Widget */}
            <DashboardSidebarCard
              title="Forex Rates"
              icon={<ICON_MAP.forex size={18} color="#3b82f6" />}
              viewAllHref="/forex"
              items={forex.slice(0, 20).map((f) => ({
                id: f.pair,
                name: f.name.split(" to ")[0],
                symbol: `${f.base}/${f.quote}`,
                value: `${f.quote === "INR" ? "₹" : f.quote === "USD" ? "$" : f.quote === "EUR" ? "€" : ""}${f.rate.toFixed(2)}`,
                changePercent: f.changePercent,
                href: `/forex/${f.base.toLowerCase()}-to-${f.quote.toLowerCase()}`,
              }))}
            />
          </div>
        </div>

        <section style={{ marginTop: "4rem", marginBottom: "4rem", padding: "2rem", background: "rgba(8, 15, 33, 0.95)", borderRadius: "1.5rem", border: "1px solid rgba(148, 163, 184, 0.12)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.75rem", alignItems: "stretch" }} className="about-feature-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <ICON_MAP.global size={24} className="text-gradient" />
                <div>
                  <p style={{ fontSize: "0.88rem", color: "#7dd3fc", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "0.5rem" }}>About MoneyPlant</p>
                  <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: 0, lineHeight: 1.1 }}>A smarter way to follow markets, from India to global finance.</h2>
                </div>
              </div>
              <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
                MoneyPlant brings live market intelligence, quick calculators, and focused market summaries into a single platform. We build each page to help users discover opportunity — not just display numbers. The site is optimized for fast decision-making and strong context, whether you want Indian stock pulse, crypto outlooks, or forex momentum.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
                This is a high-value finance portal with meaningful content, clear navigation, and a strong emphasis on unique original descriptions. We support active traders, long-term investors, and anyone who wants actual market insight without distractions.
              </p>
              <Link href="/about" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "fit-content", padding: "0.95rem 1.8rem", borderRadius: "999px", background: "linear-gradient(135deg, #22c55e, #3b82f6)", color: "white", fontWeight: 700, textDecoration: "none", boxShadow: "0 16px 40px -20px rgba(59, 130, 246, 0.55)" }}>
                Learn more about us
              </Link>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              {[
                { title: "Unique finance coverage", description: "Market insights across stocks, crypto, forex, commodities, and leading Indian conglomerates." },
                { title: "Live updates with context", description: "Real-time quotes plus quick summaries so users understand the move right away." },
                { title: "Tools built for investors", description: "SIP, EMI, lumpsum, and tax calculators designed for practical decision-making." },
                { title: "Focused UX & SEO", description: "Clear page structure, quality headings, and dedicated legal content for better publisher compliance." },
              ].map((card) => (
                <div key={card.title} style={{ background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(56, 189, 248, 0.1)", borderRadius: "1rem", padding: "1.35rem", minHeight: "120px" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.85rem", color: "#f8fafc" }}>{card.title}</h3>
                  <p style={{ color: "#94a3b8", lineHeight: 1.75, margin: 0 }}>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .intelligence-grid { grid-template-columns: 1fr !important; }
          .about-feature-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
