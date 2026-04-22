"use client";
import Link from "next/link";
import { useState } from "react";
import { TrendingUp, Menu, X, ChevronDown } from "lucide-react";
import { ICON_MAP } from "@/lib/icons";
import BrandLogo from "./BrandLogo";

const NAV = [
  {
    label: "Markets",
    href: "/markets",
    children: [
      { label: "India Markets", href: "/markets/india" },
      { label: "Global Markets", href: "/markets/global" },
      { label: "Top Gainers", href: "/top-stocks/gainers" },
      { label: "Top Losers", href: "/top-stocks/losers" },
      { label: "Most Active", href: "/top-stocks/most-active" },
    ],
  },
  {
    label: "Stocks",
    href: "/stocks",
    children: [
      { label: "All NSE/BSE Stocks", href: "/stocks" },
      { label: "Nifty 50 Stocks", href: "/indices/nifty-50" },
      { label: "── Conglomerates ──", href: "/markets/india#conglomerates" },
      { label: "Adani Group", href: "/conglomerates/adani" },
      { label: "Reliance Group", href: "/conglomerates/reliance" },
      { label: "Tata Group", href: "/conglomerates/tata" },
      { label: "Bajaj Group", href: "/conglomerates/bajaj" },
      { label: "Mahindra Group", href: "/conglomerates/mahindra" },
      { label: "Aditya Birla Group", href: "/conglomerates/birla" },
      { label: "HDFC Group", href: "/conglomerates/hdfc" },
      { label: "ICICI Group", href: "/conglomerates/icici" },
      { label: "SBI Group", href: "/conglomerates/sbi" },
      { label: "L&T Group", href: "/conglomerates/lt" },
      { label: "ITC Group", href: "/conglomerates/itc" },
      { label: "JSW Group", href: "/conglomerates/jsw" },
      { label: "Vedanta Group", href: "/conglomerates/vedanta" },
      { label: "Godrej Group", href: "/conglomerates/godrej" },
    ],
  },
  {
    label: "Sectors",
    href: "/markets/india",
    children: [
      { label: "IT Stocks", href: "/markets/india#it" },
      { label: "Banking Stocks", href: "/markets/india#banking" },
      { label: "Pharma Stocks", href: "/markets/india#pharma" },
      { label: "Auto Stocks", href: "/markets/india#auto" },
      { label: "FMCG Stocks", href: "/markets/india#fmcg" },
      { label: "PSU Stocks", href: "/markets/india#psu" },
      { label: "Real Estate", href: "/markets/india#realty" },
    ],
  },
  {
    label: "Indices",
    href: "/indices",
    children: [
      { label: "Nifty 50", href: "/indices/nifty-50" },
      { label: "BSE Sensex", href: "/indices/sensex" },
      { label: "Bank Nifty", href: "/indices/bank-nifty" },
      { label: "Nifty IT", href: "/indices/nifty-it" },
      { label: "Nifty Midcap 100", href: "/indices/nifty-midcap-100" },
      { label: "S&P 500 (USA)", href: "/markets/global#americas" },
      { label: "FTSE 100 (UK)", href: "/markets/global#europe" },
      { label: "Nikkei 225 (Japan)", href: "/markets/global#asia" },
      { label: "Hang Seng (HK)", href: "/markets/global#asia" },
    ],
  },
  { label: "Crypto", href: "/crypto" },
  { label: "Forex", href: "/forex" },
  {
    label: "Commodities",
    href: "/commodities",
    children: [
      { label: "Gold Rate", href: "/commodities/gold" },
      { label: "Silver Rate", href: "/commodities/silver" },
      { label: "Crude Oil", href: "/commodities/crude-oil" },
    ],
  },
  { label: "IPO", href: "/ipo" },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "SIP Calculator", href: "/tools/sip-calculator" },
      { label: "EMI Calculator", href: "/tools/emi-calculator" },
      { label: "Lumpsum Calculator", href: "/tools/lumpsum-calculator" },
      { label: "Tax Calculator", href: "/tools/tax-calculator" },
    ],
  },
  {
    label: "News",
    href: "/news",
    children: [
      { label: "Market News", href: "/news" },
      { label: "Forex News", href: "/news/forex" },
      { label: "Crypto News", href: "/news/crypto" },
      { label: "Economy Hub", href: "/news?cat=Economy" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("india")) return ICON_MAP.india;
    if (l.includes("global")) return ICON_MAP.global;
    if (l.includes("gainers")) return ICON_MAP.gainers;
    if (l.includes("losers")) return ICON_MAP.losers;
    if (l.includes("active")) return ICON_MAP.active;
    if (l.includes("adani")) return ICON_MAP.adani;
    if (l.includes("reliance")) return ICON_MAP.reliance;
    if (l.includes("tata")) return ICON_MAP.tata;
    if (l.includes("bajaj")) return ICON_MAP.bajaj;
    if (l.includes("mahindra")) return ICON_MAP.mahindra;
    if (l.includes("birla")) return ICON_MAP.birla;
    if (l.includes("hdfc")) return ICON_MAP.hdfc;
    if (l.includes("icici")) return ICON_MAP.icici;
    if (l.includes("sbi")) return ICON_MAP.sbi;
    if (l.includes("lt")) return ICON_MAP.lt;
    if (l.includes("itc")) return ICON_MAP.itc;
    if (l.includes("jsw")) return ICON_MAP.jsw;
    if (l.includes("vedanta")) return ICON_MAP.vedanta;
    if (l.includes("godrej")) return ICON_MAP.godrej;
    if (l.includes("it stocks")) return ICON_MAP.it;
    if (l.includes("banking")) return ICON_MAP.banking;
    if (l.includes("pharma")) return ICON_MAP.pharma;
    if (l.includes("auto")) return ICON_MAP.auto;
    if (l.includes("fmcg")) return ICON_MAP.fmcg;
    if (l.includes("psu")) return ICON_MAP.psu;
    if (l.includes("real estate")) return ICON_MAP.realty;
    if (l.includes("nifty 50")) return ICON_MAP.nifty;
    if (l.includes("sensex")) return ICON_MAP.sensex;
    if (l.includes("bank nifty")) return ICON_MAP.banknifty;
    if (l.includes("nifty it")) return ICON_MAP.itindex;
    if (l.includes("gold")) return ICON_MAP.gold;
    if (l.includes("silver")) return ICON_MAP.silver;
    if (l.includes("oil")) return ICON_MAP.oil;
    if (l.includes("sip")) return ICON_MAP.sip;
    if (l.includes("emi")) return ICON_MAP.emi;
    if (l.includes("news")) return ICON_MAP.news;
    return null;
  };

  return (
    <header
      style={{
        background: "rgba(2, 8, 23, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(51, 65, 85, 0.5)",
        position: "sticky",
        top: "36px",
        zIndex: 50,
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", height: "60px", gap: "2rem" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.7rem", textDecoration: "none" }}>
          {/* New Premium Logo */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="MoneyPlant Logo" width={30} height={30} style={{ objectFit: "contain" }} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 800,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #10b981, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.2))",
            }}
          >
            MoneyPlant
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: 1 }} className="hidden-mobile">
          {NAV.map((item) => (
            <div
              key={item.label}
              style={{ position: "relative" }}
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#cbd5e1",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#f1f5f9";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(30,41,59,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#cbd5e1";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {item.label}
                {item.children && <ChevronDown size={13} />}
              </Link>

              {/* Dropdown */}
              {item.children && activeDropdown === item.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    minWidth: item.label === "Stocks" ? "460px" : "200px",
                    background: "#0f172a",
                    border: "1px solid rgba(51,65,85,0.7)",
                    borderRadius: "10px",
                    padding: "0.5rem",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                    zIndex: 60,
                  }}
                >
                  {(() => {
                    const isLarge = item.label === "Stocks";

                    if (isLarge) {
                      const topLinks = item.children!.slice(0, 2);
                      const conglomerates = item.children!.slice(3);

                      return (
                        <div style={{ padding: "0.25rem" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "12px" }}>
                            {topLinks.map((child) => {
                              const slug = child.href.split("/").pop() || "";
                              const Icon = getIcon(child.label);
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: "6px",
                                    fontSize: "0.85rem",
                                    color: "#f1f5f9",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    transition: "background 0.15s",
                                  }}
                                  className="dropdown-link"
                                >
                                  <BrandLogo domainKey={slug} fallback={Icon ? <Icon size={16} /> : <TrendingUp size={16} />} size={16} />
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>

                          <div style={{
                            padding: "0.5rem 0.75rem",
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            color: "#3b82f6",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            borderBottom: "1px solid rgba(51, 65, 85, 0.4)",
                            marginBottom: "8px"
                          }}>
                            Business Conglomerates
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                            {conglomerates.map((child) => {
                              const slug = child.href.split("/").pop() || "";
                              const Icon = getIcon(child.label);
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "0.5rem 0.75rem",
                                    borderRadius: "6px",
                                    fontSize: "0.82rem",
                                    color: "#94a3b8",
                                    textDecoration: "none",
                                    transition: "all 0.15s",
                                  }}
                                  className="dropdown-link"
                                >
                                  <BrandLogo domainKey={slug} fallback={Icon ? <Icon size={14} /> : <TrendingUp size={14} />} size={14} />
                                  {child.label.replace(" Group", "")}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    return item.children!.map((child) => {
                      const slug = child.href.split("/").pop() || "";
                      const Icon = getIcon(child.label);

                      return (
                        <Link
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            color: "#94a3b8",
                            textDecoration: "none",
                            transition: "background 0.15s, color 0.15s",
                          }}
                          className="dropdown-link"
                        >
                          <BrandLogo
                            domainKey={slug}
                            fallback={Icon ? <Icon size={16} /> : <TrendingUp size={16} />}
                            size={16}
                            style={{ filter: "brightness(1.2)" }}
                          />
                          {child.label}
                        </Link>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Live Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: "999px",
            padding: "4px 10px",
            fontSize: "0.75rem",
            color: "#10b981",
            fontWeight: 600,
            marginLeft: "auto",
          }}
          className="hidden-mobile"
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
              animation: "pulse-green 2s infinite",
            }}
          />
          LIVE
        </div>

        {/* Mobile Burger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            padding: "6px",
            display: "none",
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            background: "#0f172a",
            borderTop: "1px solid rgba(51,65,85,0.5)",
            padding: "1rem",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
          className="show-mobile"
        >
          {NAV.map((item) => (
            <div key={item.label} style={{ marginBottom: "0.25rem" }}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "0.65rem 0.75rem",
                  borderRadius: "8px",
                  color: "#cbd5e1",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div style={{ paddingLeft: "1rem" }}>
                  {item.children.map((child) => {
                    const slug = child.href.split("/").pop() || "";
                    const Icon = getIcon(child.label);
                    return (
                      <Link
                        key={`${child.label}-${child.href}`}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "6px",
                          color: "#64748b",
                          textDecoration: "none",
                          fontSize: "0.85rem",
                        }}
                      >
                        <BrandLogo
                          domainKey={slug}
                          fallback={Icon ? <Icon size={14} /> : <TrendingUp size={14} />}
                          size={14}
                        />
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
        }
        .dropdown-link:hover {
          background: rgba(30, 41, 59, 0.9) !important;
          color: #f1f5f9 !important;
        }
      `}</style>
    </header>
  );
}
