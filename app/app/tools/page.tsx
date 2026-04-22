import type { Metadata } from "next";
import Link from "next/link";
import {
   Calculator, PiggyBank, CreditCard, Percent,
   ChevronRight, HelpCircle, Activity, TrendingUp
} from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { PremiumFeatureCard } from "@/components/VisualCards";

export const metadata: Metadata = {
   title: `Finance Tools & Calculators ${new Date().getFullYear()} — Professional SIP, EMI, Lumpsum & Tax Planning`,
   description: `Free professional financial toolkit today ${new Date().getFullYear()}. Plan your wealth with precision using our SIP, EMI, Lumpsum calculators, and comprehensive Indian Income Tax planners.`,
   keywords: [
      "financial calculators india", "sip calculator india", "emi calculator india",
      "lumpsum calculator india", "income tax calculator india",
      "investment calculator india", "tax calculator india",
      "mutual fund calculator india", "sip returns calculator",
      "monthly sip return", "sip maturity amount", "sip profit calculator",
      "home loan emi calculator", "personal loan emi calculator", "car loan emi calculator",
      "emi for 50 lakh home loan", "emi for 10 lakh loan", "emi for 1 crore home loan",
      // GLOBAL / GENERAL KEYWORDS
      "retirement planner calculator", "child education planner", "marriage fund planning",
      "wealth builder calculator", "compound interest calculator global",
      "investment return estimator world", "loan payoff calculator",
      "mortgage emi calculator usa", "personal finance tools 2025",
      "online finance calculators", "free money tools moneyplant",
      "best financial tools globally", "savings goal calculator",
      "inflation adjusted sip calculator", "fire calculator early retirement",
      "pension calculator today", "mutual fund sip chart india",
      "ppf calculator india", "els calculator tax savings",
      "income tax vs new tax regime", "best tax saving investments today",
      "how to save tax in india today", "new tax slabs fy 2024-25 india",
      "sip vs lumpsum which is better", "when to use sip or lumpsum",
      "compound growth calculator nse bse", "stock market calculator today",
      "bitcoin investment return calculator", "gold investment return calculator",
      "real estate vs mutual fund return", "fixed deposit vs sip returns",
      "recurring deposit rd calculator", "nsc kvp calculator india",
      "swp calculator systematic withdrawal", "stwp calculator",
      "xirr calculator for mutual funds", "cagr calculator online",
      "step up sip calculator", "sip calculator with annual increment",
      "car loan emi calculator dubai", "home loan calculator uae",
      "personal loan planner saudi arabia", "mortgage rates calculator uk",
      "best finance tools moneyplant global",
      `top 20 financial tools ${new Date().getFullYear()}`,
      `best calculators for wealth ${new Date().getFullYear()}`,
      "income tax calculator 2025-26 india", "tax planning guide 2025",
      "one time investment calculator", "lump sum return calculator",
      "compound interest calculator india", "wealth growth calculator",
      "new tax regime calculator india", "old tax regime calculator",
      "new vs old tax regime 2025", "income tax slab 2025 india",
      "ltcg tax calculator india", "stcg tax calculator india",
      "capital gains tax calculator india", "crypto tax calculator india",
      "section 80c calculator", "hra calculation india", "take home salary calculator",
      "sip for retirement india", "how much sip for 1 crore", "sip 5000 per month 10 years return",
      "best sip mutual fund 2025", "elss sip calculator india",
      `sip calculator ${new Date().getFullYear()}`, `emi calculator ${new Date().getFullYear()}`,
      `income tax ${new Date().getFullYear()} calculator`,
      `tax saving tips ${new Date().getFullYear()} india`,
      `best investment ${new Date().getFullYear()} india`,
      "retirement corpus calculator", "financial goal planner india",
      "education fund calculator india", "home loan down payment calculator",
      "loan repayment calculator india", "advance tax calculator india",
      "cagr calculator india", "roi calculator india", "xirr calculator india",
      "free financial tools india", "financial planning india",
   ].join(", "),
};

export default function ToolsHubPage() {
   const tools = [
      {
         id: "sip-calculator",
         name: "SIP Calculator",
         desc: "Calculate potential returns on your Mutual Fund Systematic Investment Plan (SIP) with ease.",
         icon: <PiggyBank />,
         color: "#10b981"
      },
      {
         id: "emi-calculator",
         name: "EMI Calculator",
         desc: "Plan your loans effectively with instant EMI calculations for Home, Car, and Personal Loans.",
         icon: <CreditCard />,
         color: "#3b82f6"
      },
      {
         id: "lumpsum-calculator",
         name: "Lumpsum Calculator",
         desc: "Estimate wealth growth for one-time mutual fund investments based on expected returns.",
         icon: <Activity />,
         color: "#f59e0b"
      },
      {
         id: "tax-calculator",
         name: "Income Tax Calculator",
         desc: "Quickly estimate your taxes under New vs Old tax regimes for the current financial year.",
         icon: <Calculator />,
         color: "#8b5cf6"
      }
   ];

   return (
      <>
         <JsonLd data={breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
         ])} />

         <div className="container section">
            <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
               <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem" }}>Financial Planning Tools</h1>
               <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}>
                  Powerful, easy-to-use calculators designed to help you plan your investments and manage your debt with precision.
               </p>
            </div>

            {/* Tools Grid */}
            <div style={{
               display: "grid",
               gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
               gap: "1.5rem",
               marginBottom: "4rem"
            }}>
               {tools.map((tool, i) => (
                  <PremiumFeatureCard 
                    key={tool.id}
                    title={tool.name}
                    desc={tool.desc}
                    icon={tool.icon}
                    accentColor={tool.color}
                    actionText="Open Calculator"
                    href={`/tools/${tool.id}`}
                    delay={i * 0.1}
                  />
               ))}
            </div>

            {/* Info Section */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }}>
               <div className="card" style={{ padding: "2.5rem", background: "rgba(30, 41, 59, 0.4)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem", color: "#3b82f6" }}>
                     <TrendingUp size={24} />
                     <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>Smart Planning</h3>
                  </div>
                  <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                     Whether you are planning for retirement, your child's education, or your next dream car, our calculators provide realistic projections based on historical market trends in India.
                  </p>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", display: "flex", alignItems: "center", gap: "8px" }}>
                     <HelpCircle size={16} /> Data updated for FY 2024-25 Tax Rules.
                  </div>
               </div>

               <div style={{ padding: "0 1rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.5rem" }}>Why use our tools?</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "1.25rem", listStyle: "none", padding: 0 }}>
                     <li style={{ display: "flex", gap: "12px" }}>
                        <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", background: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900 }}>✓</div>
                        <span style={{ color: "#94a3b8" }}>100% Free: All tools are free to use, forever.</span>
                     </li>
                     <li style={{ display: "flex", gap: "12px" }}>
                        <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", background: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900 }}>✓</div>
                        <span style={{ color: "#94a3b8" }}>No Data Storage: We don't save your financial numbers.</span>
                     </li>
                     <li style={{ display: "flex", gap: "12px" }}>
                        <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", background: "#10b981", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900 }}>✓</div>
                        <span style={{ color: "#94a3b8" }}>Mobile Friendly: Plan your finances on the go.</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         <style>{`
        .tool-card:hover {
          background: rgba(30, 41, 59, 0.6) !important;
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.4) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
      `}</style>
      </>
   );
}
