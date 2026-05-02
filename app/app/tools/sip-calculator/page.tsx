import type { Metadata } from "next";
import Link from "next/link";
import { 
  PiggyBank, ArrowLeft, HelpCircle, AlertCircle, Info
} from "lucide-react";
import SipCalculator from "@/components/SipCalculator";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

import { getToolsMeta } from "@/lib/meta";

export const metadata: Metadata = getToolsMeta("SIP");

export default function SipCalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "SIP Calculator", url: "/tools/sip-calculator" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "2.5rem" }}>
          <Link href="/tools" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", textDecoration: "none", fontSize: "0.85rem", marginBottom: "1rem" }}>
            <ArrowLeft size={14} /> Back to Tools
          </Link>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>SIP Calculator</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
             Calculate how much wealth you can create by investing small amounts monthly.
          </p>
        </div>

        <SipCalculator />

        {/* SEO Content Section */}
        <section style={{ marginTop: "5rem", maxWidth: "800px" }}>
           <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>What is an SIP?</h2>
           <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              A **Systematic Investment Plan (SIP)** is a method of investing in mutual funds where an investor contributes a fixed amount at regular intervals (monthly, quarterly) rather than a one-time lump sum. This technique leverages the power of compounding and rupee cost averaging.
           </p>

           <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>How does this calculator work?</h3>
           <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "2rem" }}>
              The SIP calculator uses the future value formula for an annuity due. You provide the monthly investment, expected rate of return, and the number of years. The tool then instantly computes the total amount invested, the interest earned, and the final maturity amount.
           </p>

           <div className="card" style={{ padding: "1.5rem", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                 <Info size={24} color="#8b5cf6" />
                 <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>Historical Performance</h4>
                    <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6 }}>
                       While the calculator allows you to input any percentage, historically, diversified Indian equity mutual funds have delivered **12-15% annually** over 10+ year periods. Past performance is not a guarantee of future returns.
                    </p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </>
  );
}
