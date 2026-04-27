import type { Metadata } from "next";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, Activity, Coins, 
  ShieldCheck, Globe, Zap
} from "lucide-react";
import { fetchCryptoList } from "@/lib/crypto";
import CryptoTable from "@/components/CryptoTable";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { StatWidget } from "@/components/VisualCards";

export const metadata: Metadata = {
  title: `Crypto Hub — Real-Time Cryptocurrency Prices INR & USD | Bitcoin, Ethereum ${new Date().getFullYear()}`,
  description: `Live cryptocurrency market terminal today ${new Date().getFullYear()}. Track Bitcoin, Ethereum, and 1000+ digital assets with real-time INR/USD exchange rates and world market cap trends.`,
  keywords: [
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
    `top 20 cryptocurrencies ${new Date().getFullYear()}`, `best crypto to buy ${new Date().getFullYear()}`,
    `top 20 crypto ${new Date().getFullYear()}`, `crypto bull run ${new Date().getFullYear()}`,
    "buy crypto india", "crypto investment india", "how to buy bitcoin india",
    "wazirx prices", "coindcx prices", "zebpay prices", "binance india",
    "crypto tax india", "30% crypto tax india", "tds crypto india",
    "crypto regulations india 2025", "sebi crypto india", "rbi crypto india",
    "altcoin season 2025", "defi tokens today", "nft market today", "web3 india",
    "crypto fear greed index", "ethereum gas fees today", "bitcoin atm india",
    "usdt to inr today", "tether price inr", "stablecoin india",
    "crypto portfolio tracker india", "crypto market analysis today",
    "live cryptocurrency rates india", "bitcoin to rupee today",
    // GLOBAL — USA
    "bitcoin price usa", "bitcoin price usd today", "btc price usd",
    "ethereum price usa", "crypto price usa today", "buy bitcoin usa",
    "crypto exchange usa", "coinbase prices", "kraken crypto prices",
    "best crypto usa 2025", "crypto tax usa", "irs crypto tax",
    // GLOBAL — UK
    "bitcoin price uk today", "bitcoin price gbp", "btc price gbp",
    "ethereum price uk", "crypto price uk", "buy bitcoin uk",
    "crypto exchange uk", "binance uk", "coinbase uk",
    "bitcoin price in pounds today", "crypto regulation uk",
    // GLOBAL — UAE / Dubai
    "bitcoin price uae today", "bitcoin price dubai", "btc price aed",
    "ethereum price uae", "crypto price dubai", "buy bitcoin dubai",
    "crypto in uae", "crypto exchange dubai", "binance dubai",
    "bitcoin price in dirhams", "crypto regulations uae",
    // GLOBAL — Saudi Arabia
    "bitcoin price saudi arabia", "bitcoin price sar today", "btc sar price",
    "crypto price riyadh", "crypto investment saudi arabia", "buy bitcoin saudi",
    // GLOBAL — Pakistan
    "bitcoin price pakistan today", "bitcoin price pkr", "btc pkr price",
    "ethereum price pakistan", "crypto price pakistan", "buy bitcoin pakistan",
    "crypto regulations pakistan", "sbp crypto pakistan",
    // GLOBAL — Bangladesh
    "bitcoin price bangladesh today", "bitcoin price bdt", "btc bdt price",
    "crypto price bangladesh", "buy bitcoin bangladesh",
    // GLOBAL — Singapore
    "bitcoin price singapore", "bitcoin price sgd", "buy bitcoin singapore",
    "crypto exchange singapore", "mas crypto singapore",
    // GLOBAL — Australia
    "bitcoin price australia today", "bitcoin price aud", "btc aud price",
    "crypto price australia", "buy bitcoin australia", "swyftx crypto",
    // GLOBAL — Canada
    "bitcoin price canada today", "bitcoin price cad", "btc cad price",
    "crypto price canada", "buy bitcoin canada",
    // GLOBAL — Europe
    "bitcoin price euro today", "bitcoin price eur", "btc eur price",
    "ethereum price europe", "crypto price germany", "crypto price france",
    "bitcoin price netherlands", "crypto regulation europe", "mica regulation crypto",
    // GLOBAL — Africa / Others
    "bitcoin price nigeria today", "bitcoin price ngn", "crypto price nigeria",
    "bitcoin price kenya", "bitcoin price south africa", "bitcoin price philippines",
    "bitcoin price malaysia today", "bitcoin price indonesia", "btc price thailand",
    "bitcoin price turkey", "bitcoin price brazil", "bitcoin price argentina",
    // GLOBAL — General World
    "crypto price live world", "global crypto market today",
    "world cryptocurrency prices", "international crypto exchange",
    "crypto prices across countries", "bitcoin price in all currencies",
    "crypto in dollars euros pounds dirhams",
    `best crypto to buy worldwide ${new Date().getFullYear()}`,
    `global crypto market ${new Date().getFullYear()}`,
  ].join(", "),
};

export const revalidate = 60;

export default async function CryptoHubPage() {
  const coins = await fetchCryptoList();
  
  const gainers = [...coins].sort((a, b) => b.change24h - a.change24h).slice(0, 5);
  const losers = [...coins].sort((a, b) => a.change24h - b.change24h).slice(0, 5);

  const numFmt = (n: number | undefined, d = 2) => 
    n !== undefined ? n.toLocaleString("en-IN", { maximumFractionDigits: d }) : "—";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Cryptocurrency", url: "/crypto" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#3b82f6", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Coins size={16} /> Digital Assets Hub
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>Cryptocurrency Market</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Real-time tracking of 500+ digital currencies in INR. Compare prices across Indian exchanges and monitor global liquidity.
          </p>
        </div>

        {/* Top Movers Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }} className="movers-grid">
           {/* Gainers */}
           <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                 <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#10b981", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase" }}>
                   <TrendingUp size={16} /> 24h Top Gainers
                 </h3>
                 <Link href="/crypto/gainers" style={{ fontSize: "0.75rem", color: "#64748b", textDecoration: "none" }}>View all</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                 {gainers.map((c, i) => (
                   <StatWidget 
                     key={c.id}
                     label={c.symbol}
                     value={c.priceInr}
                     changePercent={c.change24h}
                     href={`/crypto/${c.id}`}
                     icon={<Coins />}
                     compact
                     delay={0.1 + i * 0.05}
                     prefix="₹"
                   />
                 ))}
              </div>
           </div>

           {/* Losers */}
           <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                 <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ef4444", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase" }}>
                   <TrendingDown size={16} /> 24h Top Losers
                 </h3>
                 <Link href="/crypto/losers" style={{ fontSize: "0.75rem", color: "#64748b", textDecoration: "none" }}>View all</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
                 {losers.map((c, i) => (
                   <StatWidget 
                     key={c.id}
                     label={c.symbol}
                     value={c.priceInr}
                     changePercent={c.change24h}
                     href={`/crypto/${c.id}`}
                     icon={<Coins />}
                     compact
                     delay={0.4 + i * 0.05}
                     prefix="₹"
                   />
                 ))}
              </div>
           </div>
        </div>

        {/* Global Market Overview */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 350px", 
          gap: "2.5rem" 
        }} className="content-grid">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <CryptoTable coins={coins} title="Market Cap Rankings" />
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
             {/* Ecosystem Links */}
             <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1.25rem" }}>Crypto Resources</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                   <Link href="/crypto/learn/wallets" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem", display: "flex", justifyContent: "space-between" }}>
                     <span>Best Wallets 2025</span>
                     <span>↗</span>
                   </Link>
                   <Link href="/crypto/learn/exchanges" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem", display: "flex", justifyContent: "space-between" }}>
                     <span>Top India Exchanges</span>
                     <span>↗</span>
                   </Link>
                   <Link href="/crypto/tax-india" style={{ textDecoration: "none", color: "#94a3b8", fontSize: "0.9rem", display: "flex", justifyContent: "space-between" }}>
                     <span>Crypto Tax Guide</span>
                     <span>↗</span>
                   </Link>
                </div>
             </div>

             {/* Live Activity Feed Placeholder */}
             <div className="card" style={{ padding: "1.5rem", border: "1px solid rgba(59, 130, 246, 0.1)" }}>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "6px" }}>
                   <Activity size={14} color="#3b82f6" /> Global Market Activity
                </h3>
                <div style={{ fontSize: "0.85rem", color: "#64748b", display: "flex", flexDirection: "column", gap: "12px" }}>
                   <div style={{ borderLeft: "2px solid #334155", paddingLeft: "12px" }}>
                      <div style={{ fontSize: "0.7rem", color: "#475569" }}>2 mins ago</div>
                      <div>Large whale movement: 500 BTC moved to Binance</div>
                   </div>
                   <div style={{ borderLeft: "2px solid #334155", paddingLeft: "12px" }}>
                      <div style={{ fontSize: "0.7rem", color: "#475569" }}>15 mins ago</div>
                      <div>Ethereum network gas prices hit 6-month low</div>
                   </div>
                </div>
             </div>

             {/* CTA */}
             <div className="card" style={{ 
               background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
               padding: "1.5rem",
               border: "1px solid rgba(59, 130, 246, 0.2)",
               textAlign: "center"
             }}>
               <ShieldCheck size={32} color="#10b981" style={{ margin: "0 auto 1rem" }} />
               <h3 style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>Safe Trading</h3>
               <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "1.25rem" }}>Always use regulated Indian exchanges for INR deposits.</p>
               <Link href="/crypto/exchanges" className="btn btn-primary" style={{ width: "100%", textAlign: "center" }}>Compare Exchanges</Link>
             </div>
          </aside>

        </div>
      </div>

      <style>{`
        .btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
          border: none;
        }
        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
