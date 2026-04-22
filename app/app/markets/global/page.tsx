import type { Metadata } from "next";
import Link from "next/link";
import { fetchMultipleQuotes } from "@/lib/stocks";
import { US_INDICES, EUROPE_INDICES, ASIA_INDICES, MEA_INDICES } from "@/lib/constants";
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd";

export const revalidate = 120;

export const metadata: Metadata = {
  title: `Global Stock Markets Live Today ${new Date().getFullYear()} | S&P 500, Dow Jones, Nikkei, FTSE, Hang Seng | MoneyPlant`,
  description:
    `Track all global stock market indices live ${new Date().getFullYear()} — S&P 500, Dow Jones, NASDAQ, FTSE 100, DAX, CAC 40, Nikkei 225, Hang Seng, Shanghai, KOSPI, ASX 200, Tadawul, DFM and all major world indices in real time. Weekly global market performance and 52-week highs.`,
  keywords: [
    "global stock market today", "world stock markets live",
    "s&p 500 today", "dow jones today", "nasdaq today",
    "ftse 100 today", "dax today", "nikkei 225 today",
    "hang seng today", "shanghai composite today", "kospi today",
    "asx 200 today", "cac 40 today", "ibex 35 today",
    "us stock market live", "european stock market live", "asian stock market live",
    "middle east stock market", "global indices live", "world indices live",
    "international stock market", "nyse live", "nasdaq live",
    "london stock exchange live", "tokyo stock exchange live",
    "hong kong stock exchange live", "global stock market india time",
    "world market today india", "us market closing today",
    "pre market us stock market", "after hours us stock market",
    "vix today", "russell 2000 today", "euro stoxx 50 today",
    "bovespa today", "tsx canada today", "tadawul today",
    "dfm dubai today", "sensex vs dow jones", "nifty vs s&p 500",
    // NEW: Year-dynamic
    `global markets ${new Date().getFullYear()}`, `world stock market ${new Date().getFullYear()}`,
    `top 20 global stocks ${new Date().getFullYear()}`, `best global indices ${new Date().getFullYear()}`,
    `s&p 500 ${new Date().getFullYear()} performance`, `dow jones ${new Date().getFullYear()}`,
    `nasdaq ${new Date().getFullYear()} outlook`, `nikkei 225 ${new Date().getFullYear()}`,
    // NEW: Weekly market performance
    "s&p 500 this week", "s&p 500 weekly gain loss", "s&p 500 1 week return",
    "dow jones this week", "dow jones weekly performance", "dow jones 1 week change",
    "nasdaq this week", "nasdaq weekly gain loss", "nasdaq 1 week return",
    "ftse 100 this week", "ftse 100 weekly change", "nikkei this week",
    "global market weekly summary", "world market this week",
    "best performing market this week", "worst performing market this week",
    "global stocks 52 week high", "us stocks 52 week high today",
    // NEW: US stocks
    "apple share price today", "microsoft share price today", "nvidia share price today",
    "amazon share price today", "tesla share price today", "google share price today",
    "meta share price today", "us stock market india impact",
    // NEW: Market hours
    "us market open time india", "us market close time india",
    "london market open time india", "tokyo market open time india",
    "what time does us market open india", "global market hours ist",
    // NEW: Global macro
    "fed rate decision today", "ecb rate decision", "bank of england news",
    "dollar index dxy today", "us treasury yield today", "10 year bond yield today",
    "global inflation today", "world recession news", "emerging markets news today",
    // COUNTRY-LEVEL STOCK MARKET SEARCHES
    "us stock market today", "uk stock market today", "japan stock market today",
    "china stock market today", "germany stock market today", "france stock market today",
    "canada stock market today", "australia stock market today", "south korea stock market today",
    "hong kong stock market today", "singapore stock market today", "india stock market today",
    "brazil stock market today", "saudi arabia stock market today", "uae stock market today",
    "malaysia stock market today", "indonesia stock market today", "thailand stock market today",
    "philippines stock market today", "vietnam stock market today", "turkey stock market today",
    "nigeria stock market today", "south africa stock market today", "egypt stock market today",
    "mexico stock market today", "argentina stock market today", "russia stock market today",
    "pakistan stock market today", "bangladesh stock market today", "sri lanka stock market today",
    "new zealand stock market today", "taiwan stock market today", "israel stock market today",
    // SEARCH PATTERNS BY COUNTRY
    "best stocks to buy in usa today", "best stocks to buy in uk today",
    "best stocks to buy in australia today", "best stocks to buy in canada today",
    "which stocks are rising today usa", "which stocks are rising today uk",
    "sp500 stocks up today", "ftse 100 stocks up today", "nikkei stocks up today",
    "hang seng stocks up today", "dax stocks up today",
    // GLOBAL COMPARISONS
    "best stock market in the world today", "top performing country stock market today",
    "worst performing stock market today", "global market winners losers today",
    "stock market open now world", "which country market is open now",
    `best stock market ${new Date().getFullYear()} country`,
    `highest return stock market ${new Date().getFullYear()} world`,
  ].join(", "),
  openGraph: {
    title: `Global Stock Markets Live ${new Date().getFullYear()} | S&P 500, Dow, FTSE, Nikkei, Hang Seng | MoneyPlant`,
    description: `All global stock market indices live ${new Date().getFullYear()} — USA, Europe, Asia, Middle East & more.`,
    url: "https://moneyplant24.com/markets/global",
  },
  alternates: { canonical: "https://moneyplant24.com/markets/global" },
};

const FLAG: Record<string, string> = {
  USA: "🇺🇸", UK: "🇬🇧", Germany: "🇩🇪", France: "🇫🇷", Spain: "🇪🇸",
  Switzerland: "🇨🇭", Italy: "🇮🇹", Netherlands: "🇳🇱", Eurozone: "🇪🇺",
  Japan: "🇯🇵", "Hong Kong": "🇭🇰", China: "🇨🇳", Australia: "🇦🇺",
  "South Korea": "🇰🇷", Taiwan: "🇹🇼", Singapore: "🇸🇬", Malaysia: "🇲🇾",
  Indonesia: "🇮🇩", India: "🇮🇳", Thailand: "🇹🇭", Philippines: "🇵🇭",
  "Saudi Arabia": "🇸🇦", "UAE (Dubai)": "🇦🇪", "UAE (Abu Dhabi)": "🇦🇪",
  Qatar: "🇶🇦", Israel: "🇮🇱", Egypt: "🇪🇬", Canada: "🇨🇦",
  Brazil: "🇧🇷", Mexico: "🇲🇽",
};

function IndexCard({ name, country, value, changePercent, id }: {
  name: string; country: string; value?: number; changePercent?: number; id?: string;
}) {
  const pos = (changePercent ?? 0) >= 0;
  return (
    <div className="card" style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}>
          {FLAG[country] ?? "🌐"} {country}
        </span>
        {id && (
          <Link href={`/indices/${id}`} style={{ fontSize: "0.7rem", color: "#3b82f6", textDecoration: "none" }}>
            Details →
          </Link>
        )}
      </div>
      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>{name}</div>
      {value != null ? (
        <>
          <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#f1f5f9", fontFamily: "var(--font-sora)" }}>
            {value.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: pos ? "#10b981" : "#ef4444" }}>
            {pos ? "▲" : "▼"} {Math.abs(changePercent ?? 0).toFixed(2)}%
          </div>
        </>
      ) : (
        <div className="shimmer" style={{ height: "36px", borderRadius: "6px", marginTop: "4px" }} />
      )}
    </div>
  );
}

async function getData() {
  const [us, europe, asia, mea] = await Promise.all([
    fetchMultipleQuotes(US_INDICES.map((i) => i.symbol)),
    fetchMultipleQuotes(EUROPE_INDICES.map((i) => i.symbol)),
    fetchMultipleQuotes(ASIA_INDICES.map((i) => i.symbol)),
    fetchMultipleQuotes(MEA_INDICES.slice(0, 4).map((i) => i.symbol)),
  ]);
  return { us, europe, asia, mea };
}

function mergeWithData(
  indices: { symbol: string; name: string; country: string; id: string }[],
  quotes: { symbol: string; price: number; changePercent: number }[]
) {
  return indices.map((idx) => {
    const q = quotes.find((q) => q.symbol === idx.symbol);
    return { ...idx, value: q?.price, changePercent: q?.changePercent };
  });
}

export default async function GlobalMarketsPage() {
  const { us, europe, asia, mea } = await getData();

  const usData = mergeWithData(US_INDICES, us);
  const euData = mergeWithData(EUROPE_INDICES, europe);
  const asData = mergeWithData(ASIA_INDICES, asia);
  const meaData = mergeWithData(MEA_INDICES, mea);

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://moneyplant24.com" },
        { name: "Markets", url: "https://moneyplant24.com/markets" },
        { name: "Global Markets", url: "https://moneyplant24.com/markets/global" },
      ])} />
      <JsonLd data={faqSchema([
        { q: "What time does the US stock market open in India time (IST)?", a: "US markets (NYSE & NASDAQ) open at 9:30 AM EST which is 7:00 PM IST in summer (EDT) and 8:00 PM IST in winter (EST). They close at 10:00 PM IST (summer) / 11:00 PM IST (winter)." },
        { q: "What time does the London Stock Exchange (FTSE) trade in IST?", a: "FTSE 100 trades from 9:00 AM to 5:30 PM GMT, which is 2:30 PM to 11:00 PM IST." },
        { q: "What time does the Tokyo Stock Exchange (Nikkei) trade in IST?", a: "Tokyo Stock Exchange (TSE) trades from 9:00 AM to 3:30 PM JST, which is 5:30 AM to 12:00 PM IST." },
        { q: "How does S&P 500 affect Indian markets?", a: "The S&P 500 movements heavily influence Indian markets via FII/FPI flows. When the S&P 500 falls significantly, Indian Nifty 50 often opens lower the next day as foreign institutional investors reduce emerging market exposure." },
        { q: "What is the VIX index?", a: "CBOE VIX (sometimes called the 'Fear Index') measures expected market volatility in the next 30 days derived from S&P 500 options. High VIX (above 30) indicates fear/uncertainty; Low VIX (below 15) signals calm markets. India NSE also has its own India VIX." },
      ])} />

      <div className="container section">
        <nav style={{ fontSize: "0.78rem", color: "#475569", marginBottom: "1.5rem", display: "flex", gap: "4px" }}>
          <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/markets" style={{ color: "#64748b", textDecoration: "none" }}>Markets</Link>
          <span>/</span>
          <span style={{ color: "#94a3b8" }}>Global</span>
        </nav>

        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "0.75rem" }}>
          🌍 Global Stock Markets — Live Today
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "800px", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          Real-time coverage of world stock market indices across Americas, Europe, Asia-Pacific, and Middle East & Africa.
          Track S&P 500, Dow Jones, NASDAQ, FTSE 100, DAX, Nikkei 225, Hang Seng, and 30+ global indices in one view.
        </p>

        {/* Jump links */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {[
            { label: "🇺🇸 Americas", href: "#americas" },
            { label: "🇪🇺 Europe", href: "#europe" },
            { label: "🌏 Asia-Pacific", href: "#asia" },
            { label: "🌍 Middle East & Africa", href: "#mea" },
          ].map((l) => (
            <a key={l.label} href={l.href} style={{
              background: "rgba(30,41,59,0.8)", border: "1px solid rgba(51,65,85,0.5)",
              borderRadius: "8px", padding: "0.4rem 0.9rem",
              fontSize: "0.82rem", fontWeight: 600, color: "#94a3b8", textDecoration: "none",
            }}>{l.label}</a>
          ))}
          <Link href="/markets/india" style={{
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "8px", padding: "0.4rem 0.9rem",
            fontSize: "0.82rem", fontWeight: 600, color: "#10b981", textDecoration: "none",
          }}>🇮🇳 Indian Markets</Link>
        </div>

        {/* Americas */}
        <section id="americas" style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">🇺🇸 Americas</h2>
          <p className="section-subtitle">NYSE, NASDAQ, TSX, B3 — Major American indices</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {usData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
          </div>
          <div style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: "8px", fontSize: "0.78rem", color: "#475569" }}>
            ⏰ <strong>US Market Hours in IST:</strong> Pre-market 5:30 PM–7:00 PM · Regular 7:00 PM–1:30 AM · After-hours 1:30 AM–3:30 AM (summer). Add 30 min in winter.
          </div>
        </section>

        {/* Top US Stocks Quick Reference */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">🇺🇸 Top US Stocks (Quick Reference)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
            {[
              { name: "Apple Inc.", sym: "AAPL", desc: "iPhone, Mac, Services" },
              { name: "Microsoft", sym: "MSFT", desc: "Cloud, Windows, Xbox" },
              { name: "Nvidia", sym: "NVDA", desc: "AI GPUs, Chips" },
              { name: "Amazon", sym: "AMZN", desc: "E-commerce, AWS" },
              { name: "Meta (Facebook)", sym: "META", desc: "Social Media, VR" },
              { name: "Google (Alphabet)", sym: "GOOGL", desc: "Search, YouTube, GCP" },
              { name: "Tesla", sym: "TSLA", desc: "EVs, Energy, Robotics" },
              { name: "Berkshire Hathaway", sym: "BRK-B", desc: "Buffett — Insurance, Value" },
              { name: "JPMorgan Chase", sym: "JPM", desc: "Banking, Finance" },
              { name: "Eli Lilly", sym: "LLY", desc: "Pharma — Ozempic rival" },
              { name: "Visa Inc.", sym: "V", desc: "Payments Network" },
              { name: "UnitedHealth", sym: "UNH", desc: "Healthcare Insurance" },
            ].map((s) => (
              <div key={s.sym} className="card" style={{ padding: "0.9rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#3b82f6", fontFamily: "var(--font-sora)" }}>{s.sym}</span>
                  <span className="badge badge-blue" style={{ fontSize: "0.65rem" }}>NYSE/NASDAQ</span>
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#e2e8f0" }}>{s.name}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "3px" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Europe */}
        <section id="europe" style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">🇪🇺 Europe</h2>
          <p className="section-subtitle">FTSE, DAX, CAC 40, IBEX, SMI, AEX — European indices</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {euData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
          </div>
          <div style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: "8px", fontSize: "0.78rem", color: "#475569" }}>
            ⏰ <strong>European Market Hours in IST:</strong> FTSE/DAX/CAC open at 2:30 PM IST and close at 11:00 PM IST (summer). Adjust by -30 min in winter (GMT+1).
          </div>
        </section>

        {/* Asia-Pacific */}
        <section id="asia" style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">🌏 Asia-Pacific</h2>
          <p className="section-subtitle">Nikkei, Hang Seng, Shanghai, KOSPI, ASX, Nifty & more</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {asData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
          </div>
          <div style={{ marginTop: "1rem", padding: "0.85rem 1.1rem", background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: "8px", fontSize: "0.78rem", color: "#475569" }}>
            ⏰ <strong>Asian Market Hours in IST:</strong> Tokyo opens 5:30 AM · Shanghai opens 6:30 AM · Hong Kong opens 6:45 AM · Singapore opens 6:30 AM · India opens 9:15 AM · Australia opens 4:00 AM.
          </div>
        </section>

        {/* Middle East & Africa */}
        <section id="mea" style={{ marginBottom: "3rem" }}>
          <h2 className="section-title">🌍 Middle East & Africa</h2>
          <p className="section-subtitle">Tadawul (Saudi), DFM (Dubai), ADX (Abu Dhabi), QSE & more</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.85rem" }}>
            {meaData.map((idx) => (
              <IndexCard key={idx.symbol} {...idx} />
            ))}
            {/* Add Middle East static cards for context */}
            {[
              { name: "Boursa Kuwait (BKK)", country: "Kuwait" },
              { name: "Bahrain Bourse", country: "Bahrain" },
              { name: "Muscat Stock Exchange", country: "Oman" },
              { name: "Casablanca Stock Exchange", country: "Morocco" },
              { name: "JSE (Johannesburg)", country: "South Africa" },
              { name: "Nigeria Stock Exchange (NGX)", country: "Nigeria" },
            ].map((idx) => (
              <div key={idx.name} className="card" style={{ padding: "1rem" }}>
                <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: "4px" }}>
                  {FLAG[idx.country] ?? "🌍"} {idx.country}
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#e2e8f0" }}>{idx.name}</div>
                <div className="shimmer" style={{ height: "28px", borderRadius: "6px", marginTop: "8px" }} />
              </div>
            ))}
          </div>
        </section>

        {/* Global Market Hours Reference */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 className="section-title">⏰ World Market Hours (in IST)</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exchange</th>
                  <th>Country</th>
                  <th>Open (IST)</th>
                  <th>Close (IST)</th>
                  <th>Index</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { exchange: "Tokyo Stock Exchange", country: "🇯🇵 Japan", open: "5:30 AM", close: "12:00 PM", index: "Nikkei 225" },
                  { exchange: "Shanghai Stock Exchange", country: "🇨🇳 China", open: "6:30 AM", close: "12:30 PM", index: "Shanghai Composite" },
                  { exchange: "Hong Kong Stock Exchange", country: "🇭🇰 Hong Kong", open: "6:45 AM", close: "1:30 PM", index: "Hang Seng" },
                  { exchange: "Singapore Exchange (SGX)", country: "🇸🇬 Singapore", open: "6:30 AM", close: "2:00 PM", index: "STI" },
                  { exchange: "Bombay Stock Exchange", country: "🇮🇳 India", open: "9:15 AM", close: "3:30 PM", index: "Sensex" },
                  { exchange: "National Stock Exchange", country: "🇮🇳 India", open: "9:15 AM", close: "3:30 PM", index: "Nifty 50" },
                  { exchange: "Australian Securities Exchange", country: "🇦🇺 Australia", open: "4:00 AM", close: "12:30 PM", index: "ASX 200" },
                  { exchange: "Tadawul (Saudi Arabia)", country: "🇸🇦 Saudi", open: "12:00 PM", close: "4:00 PM", index: "TASI" },
                  { exchange: "DFM (Dubai)", country: "🇦🇪 UAE", open: "11:30 AM", close: "3:30 PM", index: "DFMGI" },
                  { exchange: "London Stock Exchange", country: "🇬🇧 UK", open: "2:30 PM", close: "11:00 PM", index: "FTSE 100" },
                  { exchange: "Frankfurt (XETRA)", country: "🇩🇪 Germany", open: "2:30 PM", close: "11:30 PM", index: "DAX" },
                  { exchange: "Euronext Paris", country: "🇫🇷 France", open: "2:30 PM", close: "11:00 PM", index: "CAC 40" },
                  { exchange: "NYSE / NASDAQ", country: "🇺🇸 USA", open: "7:00 PM*", close: "1:30 AM*", index: "S&P 500 / Dow / NASDAQ" },
                  { exchange: "Toronto Stock Exchange", country: "🇨🇦 Canada", open: "7:30 PM*", close: "2:00 AM*", index: "S&P/TSX" },
                  { exchange: "B3 Bovespa", country: "🇧🇷 Brazil", open: "6:30 PM*", close: "1:00 AM*", index: "Bovespa" },
                ].map((row) => (
                  <tr key={row.exchange}>
                    <td style={{ fontWeight: 600 }}>{row.exchange}</td>
                    <td>{row.country}</td>
                    <td style={{ color: "#10b981", fontWeight: 600 }}>{row.open}</td>
                    <td style={{ color: "#ef4444", fontWeight: 600 }}>{row.close}</td>
                    <td style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{row.index}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.75rem" }}>
            * Times with asterisk are for summer (daylight saving). Add 30 min during winter for US/Canada/Brazil. All times are IST (UTC+5:30).
          </p>
        </section>
      </div>
    </>
  );
}
