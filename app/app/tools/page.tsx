import type { Metadata } from "next";
import Link from "next/link";
import {
   Calculator, PiggyBank, CreditCard, Percent,
   ChevronRight, HelpCircle, Activity, TrendingUp
} from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { PremiumFeatureCard } from "@/components/VisualCards";

import { getToolsMeta } from "@/lib/meta";

export const metadata: Metadata = getToolsMeta();

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
