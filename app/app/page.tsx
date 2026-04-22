import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, TrendingDown, Activity, BarChart2, Globe, Coins, DollarSign, Gem, Flame, HardHat, Shield, Zap, FileText, RefreshCw, Bitcoin } from "lucide-react";
import { ICON_MAP } from "@/lib/icons";
import { getHomeMeta } from "@/lib/meta";
import { fetchMultipleQuotes } from "@/lib/stocks";
import { fetchCryptoList } from "@/lib/crypto";
import { fetchAllForexRates } from "@/lib/forex";
import { NIFTY50_STOCKS, CRYPTO_LIST, GLOBAL_INDICES, ADANI_STOCKS, RELIANCE_STOCKS } from "@/lib/constants";
import MarketTable from "@/components/MarketTable";
import JsonLd, { websiteSchema, organizationSchema, breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import HeroV2 from "@/components/HeroV2";
import DashboardSidebarCard from "@/components/DashboardSidebarCard";
import HomeFAQs from "@/components/HomeFAQs";

export const metadata: Metadata = getHomeMeta();
export const revalidate = 60;

const HOMEPAGE_FAQS = [
  { q: "What is Nifty 50?", a: "Nifty 50 is the benchmark stock market index of the National Stock Exchange (NSE) of India. It represents the weighted average of 50 of the largest Indian companies across 13 sectors." },
  { q: "What is the NSE trading time in India?", a: "NSE and BSE trading hours in India are Monday to Friday, 9:15 AM to 3:30 PM IST. Pre-market session runs from 9:00 AM to 9:15 AM." },
  { q: "Where can I check Bitcoin price in Indian Rupees (INR)?", a: "You can check live Bitcoin price in INR on MoneyPlant's crypto section. We provide real-time BTC/INR data updated every minute." },
  { q: "What is USD to INR rate today?", a: "The USD to INR exchange rate is updated live on MoneyPlant's forex section. The rate changes during market hours and reflects the current RBI reference rate." },
  { q: "What is the gold rate today in India?", a: "Today's gold rate in India varies by city. Check MoneyPlant's Gold Rate page for 24K, 22K, and 18K gold prices across major Indian cities including Mumbai, Delhi, Chennai, Bangalore and Hyderabad." },
  { q: "How to invest in stocks in India?", a: "To invest in Indian stocks, you need a Demat account with a SEBI-registered broker like Zerodha, Groww, Upstox, or Angel One. Then you can buy stocks listed on NSE and BSE." },
  { q: "What is Adani Group?", a: "Adani Group is one of India's largest conglomerates with businesses in ports, power, green energy, gas, airports, and FMCG. It has 14+ listed companies on NSE and BSE." },
  { q: "What is Reliance Industries?", a: "Reliance Industries Limited (RELIANCE) is India's largest company by market cap, with businesses spanning telecom (Jio), retail, oil & gas, and renewable energy. It is listed on NSE and BSE." },
];

async function getData() {
  const [nifty50, globalIndices, cryptos, forex, adaniPrices, reliancePrices] = await Promise.all([
    fetchMultipleQuotes(["^NSEI", "^BSESN", "^NSEBANK", "^CNXIT"]),
    fetchMultipleQuotes(GLOBAL_INDICES.slice(0, 6).map((i) => i.symbol)),
    fetchCryptoList(CRYPTO_LIST.slice(0, 10).map((c) => c.id)),
    fetchAllForexRates(),
    fetchMultipleQuotes(ADANI_STOCKS.slice(0, 6).map((s) => s.symbol)),
    fetchMultipleQuotes(RELIANCE_STOCKS.slice(0, 5).map((s) => s.symbol)),
  ]);
  return { nifty50, globalIndices, cryptos, forex, adaniPrices, reliancePrices };
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
  const { nifty50, globalIndices, cryptos, forex, adaniPrices, reliancePrices } = await getData();

  const niftyIdx = nifty50.find((q) => q.symbol === "^NSEI");
  const sensex = nifty50.find((q) => q.symbol === "^BSESN");
  const bankNifty = nifty50.find((q) => q.symbol === "^NSEBANK");
  const niftyIt = nifty50.find((q) => q.symbol === "^CNXIT");

  const btc = cryptos.find((c) => c.id === "bitcoin");
  const eth = cryptos.find((c) => c.id === "ethereum");
  const usdInr = forex.find((f) => f.base === "USD");

  const fmt = (n: number, d = 2) =>
    n > 1000 ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : n.toFixed(d);

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
          ...(niftyIdx ? [{ label: "Nifty 50", value: `₹${fmt(niftyIdx.price)}`, change: niftyIdx.change, changePercent: niftyIdx.changePercent, icon: <Activity size={18} />, href: "/indices/nifty-50" }] : []),
          ...(sensex ? [{ label: "BSE Sensex", value: `₹${fmt(sensex.price)}`, change: sensex.change, changePercent: sensex.changePercent, icon: <BarChart2 size={18} />, href: "/indices/sensex" }] : []),
          ...(bankNifty ? [{ label: "Bank Nifty", value: `₹${fmt(bankNifty.price)}`, change: bankNifty.change, changePercent: bankNifty.changePercent, icon: <TrendingUp size={18} />, href: "/indices/bank-nifty" }] : []),
          ...(niftyIt ? [{ label: "Nifty IT", value: `₹${fmt(niftyIt.price)}`, change: niftyIt.change, changePercent: niftyIt.changePercent, icon: <Globe size={18} />, href: "/indices/nifty-it" }] : []),
          ...(btc ? [{ label: "Bitcoin (INR)", value: `₹${btc.priceInr.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, changePercent: btc.change24h, icon: <Coins size={18} />, href: "/crypto/bitcoin" }] : []),
          ...(eth ? [{ label: "Ethereum (INR)", value: `₹${eth.priceInr.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, changePercent: eth.change24h, icon: <Coins size={18} />, href: "/crypto/ethereum" }] : []),
          ...(usdInr ? [{ label: "USD to INR", value: `₹${usdInr.rate.toFixed(2)}`, change: usdInr.change, changePercent: usdInr.changePercent, icon: <DollarSign size={18} />, href: "/forex/usd-to-inr" }] : []),
          { label: "Gold Rate (10g)", value: "Live ↗", icon: <Gem size={18} />, href: "/commodities/gold" },
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
            { label: "Adani Stocks", href: "/conglomerates/adani", Icon: ICON_MAP.adani },
            { label: "Reliance Stocks", href: "/conglomerates/reliance", Icon: ICON_MAP.reliance },
            { label: "Tata Stocks", href: "/conglomerates/tata", Icon: ICON_MAP.tata },
            { label: "Crypto", href: "/crypto", Icon: ICON_MAP.crypto },
            { label: "Forex", href: "/forex", Icon: ICON_MAP.forex },
            { label: "Gold", href: "/commodities/gold", Icon: ICON_MAP.gold },
            { label: "IPO", href: "/ipo", Icon: ICON_MAP.ipo },
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
        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem" }} className="content-grid">
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Adani Group Preview */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="section-title" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ICON_MAP.adani size={22} className="text-gradient" />
                  Adani Group Stocks
                </h2>
                <Link href="/conglomerates/adani" style={{ fontSize: "0.82rem", color: "#3b82f6", textDecoration: "none" }}>
                  View All 14+ →
                </Link>
              </div>
              <MarketTable quotes={adaniPrices} showRank />
            </section>

            {/* Reliance Group Preview */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="section-title" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ICON_MAP.reliance size={22} className="text-gradient" />
                  Reliance Group Stocks
                </h2>
                <Link href="/conglomerates/reliance" style={{ fontSize: "0.82rem", color: "#3b82f6", textDecoration: "none" }}>
                  View All →
                </Link>
              </div>
              <MarketTable quotes={reliancePrices} showRank />
            </section>

            {/* Global Markets */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="section-title" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <ICON_MAP.global size={22} className="text-gradient" />
                  Global Markets
                </h2>
                <Link href="/markets/global" style={{ fontSize: "0.82rem", color: "#3b82f6", textDecoration: "none" }}>
                  View All →
                </Link>
              </div>
              <MarketTable quotes={globalIndices} linkPrefix="/markets" />
            </section>

            {/* FAQ Accordion (for SEO) */}
            <section style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "4px", height: "18px", background: "linear-gradient(to bottom, #10b981, #3b82f6)", borderRadius: "2px" }} />
                <h2 className="section-title" style={{ marginBottom: 0 }}>Frequently Asked Questions</h2>
              </div>
              <HomeFAQs faqs={HOMEPAGE_FAQS} />
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Crypto Widget */}
            <DashboardSidebarCard
              title="Top Crypto — INR"
              icon={<ICON_MAP.crypto size={18} color="#f59e0b" />}
              viewAllHref="/crypto"
              items={cryptos.slice(0, 8).map((c) => ({
                id: c.id,
                name: c.name,
                symbol: c.symbol.toUpperCase(),
                value: `₹${c.priceInr.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
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
              items={forex.slice(0, 8).map((f) => ({
                id: f.pair,
                name: f.name.split(" to ")[0],
                symbol: `${f.base}/${f.quote}`,
                value: `₹${f.rate.toFixed(2)}`,
                changePercent: f.changePercent,
                href: `/forex/${f.base.toLowerCase()}-to-${f.quote.toLowerCase()}`,
              }))}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
