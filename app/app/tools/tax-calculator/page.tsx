import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, Landmark, ShieldCheck, 
  HelpCircle, ChevronRight, Calculator,
  ExternalLink, TrendingDown
} from "lucide-react";
import TaxCalculator from "@/components/TaxCalculator";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Income Tax Calculator FY 2024-25 & 2025-26 | New vs Old Regime`,
  description: `Calculate your Indian Income Tax for FY 2024-25 (AY 2025-26). Compare between the New Tax Regime and Old Tax Regime to find the best tax savings for you today ${new Date().getFullYear()}.`,
  keywords: [
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
    `income tax fy 2025-26 ${new Date().getFullYear()}`, `tax planning ${new Date().getFullYear()}`,
    "new tax regime benefits", "how to save 1 lakh tax in india",
    "tax zero on 7 lakh income how", "standard deduction for pensioners",
    "senior citizen tax slabs fy 2024-25", "super senior citizen tax calculator",
  ].join(", "),
};

export default function TaxPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "Income Tax Calculator", url: "/tools/tax-calculator" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <Link 
            href="/tools" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              color: "#3b82f6", 
              fontSize: "0.85rem", 
              textDecoration: "none",
              fontWeight: 700,
              marginBottom: "1rem"
            }}
          >
            <ArrowLeft size={14} /> Back to Finance Tools
          </Link>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#8b5cf6", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Landmark size={16} /> Regulatory Compliance
          </div>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem", margin: 0 }}>Income Tax Calculator</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Compare New vs Old Tax Regimes for FY 2024-25 (Assessment Year 2025-26). Check which regime saves you more money based on your salary and investments.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2.5rem" }} className="content-grid">
          
          <div>
            <TaxCalculator />

            <div style={{ marginTop: "4rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                <ShieldCheck size={24} color="#10b981" /> FY 2024-25 Tax Slab Update
              </h2>
              <div style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.8 }}>
                <p style={{ marginBottom: "1.25rem" }}>
                   The Union Budget 2024 has introduced significant changes to the <strong>New Tax Regime</strong>. The standard deduction has been increased to ₹75,000, and tax slabs have been further simplified to provide more relief to middle-income earners.
                </p>
                
                <h3 style={{ color: "#f1f5f9", fontSize: "1.1rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>New Regime Slabs (FY 2024-25)</h3>
                <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Taxable Income (₹)</th>
                        <th>Tax Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>0 - 3 Lakh</td><td>Nil</td></tr>
                      <tr><td>3 - 6 Lakh</td><td>5%</td></tr>
                      <tr><td>6 - 9 Lakh</td><td>10%</td></tr>
                      <tr><td>9 - 12 Lakh</td><td>15%</td></tr>
                      <tr><td>12 - 15 Lakh</td><td>20%</td></tr>
                      <tr><td>Above 15 Lakh</td><td>30%</td></tr>
                    </tbody>
                  </table>
                </div>

                <p style={{ marginBottom: "1.25rem" }}>
                   Under the New Regime, if your total income after standard deduction is up to ₹7 Lakh, you are eligible for a rebate under Section 87A, making your effective tax zero.
                </p>
              </div>
            </div>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Guide Card */}
            <div className="card" style={{ padding: "1.5rem", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Calculator size={18} color="#8b5cf6" /> Planning Guide
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                 <a href="#" style={{ fontSize: "0.85rem", color: "#94a3b8", textDecoration: "none", display: "flex", justifyContent: "space-between" }}>
                    <span>80C Investment List</span>
                    <ExternalLink size={14} />
                 </a>
                 <a href="#" style={{ fontSize: "0.85rem", color: "#94a3b8", textDecoration: "none", display: "flex", justifyContent: "space-between" }}>
                    <span>HRA Exemption Rules</span>
                    <ExternalLink size={14} />
                 </a>
                 <a href="#" style={{ fontSize: "0.85rem", color: "#94a3b8", textDecoration: "none", display: "flex", justifyContent: "space-between" }}>
                    <span>Standard Deduction FAQs</span>
                    <ExternalLink size={14} />
                 </a>
              </div>
            </div>

            {/* Other Tools */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "1.25rem" }}>Other Useful Tools</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { name: "SIP Calculator", href: "/tools/sip-calculator" },
                  { name: "EMI Calculator", href: "/tools/emi-calculator" },
                  { name: "Lumpsum Calculator", href: "/tools/lumpsum-calculator" }
                ].map(tool => (
                  <Link 
                    key={tool.name} 
                    href={tool.href} 
                    style={{ 
                      fontSize: "0.85rem", 
                      color: "#94a3b8", 
                      textDecoration: "none", 
                      display: "flex", 
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(30, 41, 59, 0.4)",
                      border: "1px solid rgba(51, 65, 85, 0.3)"
                    }}
                  >
                    <span>{tool.name}</span>
                    <ChevronRight size={14} style={{ opacity: 0.5 }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad Space */}
            <div style={{ 
               background: "rgba(15, 23, 42, 0.8)", 
               border: "1px dashed rgba(51, 65, 85, 0.6)", 
               borderRadius: "12px",
               padding: "5rem 1.5rem",
               textAlign: "center",
               color: "#334155",
               fontSize: "0.8rem"
             }}>
               Advertisement
             </div>
          </aside>

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
