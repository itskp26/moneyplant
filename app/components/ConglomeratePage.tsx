import Link from "next/link";
import { fetchMultipleQuotes } from "@/lib/stocks";
import MarketTable from "@/components/MarketTable";
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import BrandLogo from "./BrandLogo";
import { type LucideIcon, ChevronRight, Building2 } from "lucide-react";
import { ICON_MAP, getBrandLogo } from "@/lib/icons";

interface Stock {
  symbol: string;
  name: string;
  sector: string;
  unlisted?: boolean;
}

interface ConglomeratePageProps {
  emoji?: string;
  Icon?: LucideIcon;
  groupKey: string;
  groupName: string;
  tagline: string;
  description: string;
  stocks: Stock[];
  chips: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  badgeColor?: "blue" | "green" | "gold" | "purple";
}

export default async function ConglomeratePage({
  Icon,
  groupKey,
  groupName,
  tagline,
  description,
  stocks,
  chips,
  faqs,
  badgeColor = "blue",
}: ConglomeratePageProps) {
  const listedStocks = stocks.filter((s) => !s.unlisted);
  const quotes = await fetchMultipleQuotes(listedStocks.map((s) => s.symbol));

  const badgeClass = {
    blue: "badge-blue",
    green: "badge-green",
    gold: "badge-gold",
    purple: "",
  }[badgeColor];

  // Helper to get icon for other groups
  const getIconForGroup = (href: string) => {
    if (href.includes("adani")) return ICON_MAP.adani;
    if (href.includes("reliance")) return ICON_MAP.reliance;
    if (href.includes("tata")) return ICON_MAP.tata;
    if (href.includes("bajaj")) return ICON_MAP.bajaj;
    if (href.includes("mahindra")) return ICON_MAP.mahindra;
    if (href.includes("birla")) return ICON_MAP.birla;
    if (href.includes("hdfc")) return ICON_MAP.hdfc;
    if (href.includes("icici")) return ICON_MAP.icici;
    if (href.includes("sbi")) return ICON_MAP.sbi;
    if (href.includes("lt")) return ICON_MAP.lt;
    if (href.includes("itc")) return ICON_MAP.itc;
    if (href.includes("jsw")) return ICON_MAP.jsw;
    if (href.includes("vedanta")) return ICON_MAP.vedanta;
    if (href.includes("godrej")) return ICON_MAP.godrej;
    if (href.includes("#it")) return ICON_MAP.it;
    if (href.includes("#pharma")) return ICON_MAP.pharma;
    if (href.includes("#auto")) return ICON_MAP.auto;
    if (href.includes("#banking")) return ICON_MAP.banking;
    if (href.includes("#fmcg")) return ICON_MAP.fmcg;
    if (href.includes("#realty")) return ICON_MAP.realty;
    return ChevronRight;
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://moneyplant24.com" },
        { name: "Markets", url: "https://moneyplant24.com/markets/india" },
        { name: groupName, url: `https://moneyplant24.com/conglomerates/${groupKey}` },
      ])} />
      <JsonLd data={faqSchema(faqs)} />

      <div className="container section">
        {/* Breadcrumb */}
        <nav style={{ fontSize: "0.78rem", color: "#475569", marginBottom: "1.5rem", display: "flex", gap: "4px", alignItems: "center" }}>
          <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/markets/india" style={{ color: "#64748b", textDecoration: "none" }}>Indian Markets</Link>
          <span>/</span>
          <span style={{ color: "#94a3b8" }}>{groupName}</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#fff",
              border: "1px solid rgba(51,65,85,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f1f5f9",
              padding: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              {(() => {
                const FallbackIcon = Icon ?? ICON_MAP[groupKey as keyof typeof ICON_MAP] ?? Building2;
                return (
                  <BrandLogo
                    domainKey={groupKey}
                    fallback={<FallbackIcon size={40} />}
                    size={40}
                    style={{ width: "100%", height: "100%" }}
                  />
                );
              })()}
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", marginBottom: "4px" }}>
                {groupName} Stocks — All Companies Live Price
              </h1>
              <p style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 600 }}>{tagline}</p>
            </div>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.93rem", lineHeight: 1.8, maxWidth: "780px" }}>
            {description}
          </p>
        </div>

        {/* Stat chips */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {chips.map((chip) => (
            <div key={chip.label} className="card" style={{ padding: "0.6rem 1.1rem" }}>
              <div style={{ fontSize: "0.65rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>{chip.label}</div>
              <div style={{ fontSize: "0.93rem", fontWeight: 700, color: "#e2e8f0", marginTop: "2px" }}>{chip.value}</div>
            </div>
          ))}
        </div>

        {/* Live Table */}
        <MarketTable quotes={quotes} title={`${groupName} — Live Stock Prices (NSE/BSE)`} showRank />

        {/* All companies grid (including unlisted) */}
        <section style={{ marginTop: "2.5rem" }}>
          <h2 className="section-title">All {groupName} Companies</h2>
          <p className="section-subtitle">
            {stocks.length} companies · {listedStocks.length} listed on NSE/BSE · {stocks.length - listedStocks.length} unlisted subsidiaries
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: "1rem",
          }}>
            {stocks.map((stock) => {
              const q = quotes.find((q) =>
                q.symbol.replace(".NS", "").replace(".BO", "") === stock.symbol
              );
              return (
                <div key={stock.symbol} className="card" style={{ padding: "1.1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <span style={{
                      fontWeight: 700,
                      color: stock.unlisted ? "#f59e0b" : "#3b82f6",
                      fontSize: "0.82rem",
                      fontFamily: "var(--font-sora)",
                    }}>
                      {stock.unlisted ? "UNLISTED" : stock.symbol}
                    </span>
                    <span className={`badge ${stock.unlisted ? "badge-gold" : badgeClass}`} style={{ fontSize: "0.65rem" }}>
                      {stock.sector}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#e2e8f0", fontWeight: 600, marginBottom: "0.5rem" }}>
                    {stock.name}
                  </div>
                  {stock.unlisted ? (
                    <div style={{ fontSize: "0.75rem", color: "#475569", fontStyle: "italic" }}>
                      Not listed — subsidiary / private
                    </div>
                  ) : q ? (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#f1f5f9", fontFamily: "var(--font-sora)" }}>
                        ₹{q.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </span>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: q.changePercent >= 0 ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                        color: q.changePercent >= 0 ? "#10b981" : "#ef4444",
                      }}>
                        {q.changePercent >= 0 ? "+" : ""}{q.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  ) : (
                    <div className="shimmer" style={{ height: "24px", borderRadius: "6px" }} />
                  )}
                  {!stock.unlisted && (
                    <Link
                      href={`/stocks/${stock.symbol.toLowerCase()}`}
                      style={{
                        display: "block",
                        marginTop: "0.5rem",
                        fontSize: "0.72rem",
                        color: "#3b82f6",
                        textDecoration: "none",
                      }}
                    >
                      View full details →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Pages */}
        <section style={{ marginTop: "2.5rem" }}>
          <h2 className="section-title">Explore Other Groups</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {[
              { label: "Adani Group",        href: "/conglomerates/adani" },
              { label: "Reliance Group",      href: "/conglomerates/reliance" },
              { label: "Tata Group",           href: "/conglomerates/tata" },
              { label: "Bajaj Group",          href: "/conglomerates/bajaj" },
              { label: "Mahindra Group",       href: "/conglomerates/mahindra" },
              { label: "Aditya Birla Group",   href: "/conglomerates/birla" },
              { label: "HDFC Group",           href: "/conglomerates/hdfc" },
              { label: "ICICI Group",          href: "/conglomerates/icici" },
              { label: "SBI Group",            href: "/conglomerates/sbi" },
              { label: "L&T Group",            href: "/conglomerates/lt" },
              { label: "ITC Group",            href: "/conglomerates/itc" },
              { label: "JSW Group",           href: "/conglomerates/jsw" },
              { label: "Vedanta Group",        href: "/conglomerates/vedanta" },
              { label: "Godrej Group",         href: "/conglomerates/godrej" },
              { label: "IT Sector",            href: "/markets/india#it" },
              { label: "Pharma Sector",        href: "/markets/india#pharma" },
              { label: "Auto Sector",          href: "/markets/india#auto" },
              { label: "Banking Sector",       href: "/markets/india#banking" },
              { label: "FMCG Sector",          href: "/markets/india#fmcg" },
              { label: "Real Estate",          href: "/markets/india#realty" },
            ].filter((l) => !l.href.includes(groupKey)).map((link) => {
              const LinkIcon = getIconForGroup(link.href);
              return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  background: "rgba(30,41,59,0.8)",
                  border: "1px solid rgba(51,65,85,0.6)",
                  borderRadius: "8px",
                  padding: "0.4rem 0.9rem",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  whiteSpace: "nowrap",
                }}
              >
                <LinkIcon size={14} />
                {link.label}
              </Link>
            )})}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ marginTop: "3rem" }}>
          <h2 className="section-title">Frequently Asked Questions — {groupName}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq) => (
              <details key={faq.q} className="card" style={{ padding: "1rem 1.25rem" }}>
                <summary style={{
                  cursor: "pointer",
                  fontWeight: 600,
                  color: "#e2e8f0",
                  fontSize: "0.9rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  listStyle: "none",
                }}>
                  {faq.q}
                  <span style={{ color: "#10b981", flexShrink: 0, marginLeft: "1rem" }}>+</span>
                </summary>
                <p style={{ marginTop: "0.75rem", color: "#94a3b8", fontSize: "0.87rem", lineHeight: 1.75 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
