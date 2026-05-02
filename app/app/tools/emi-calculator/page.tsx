import type { Metadata } from "next";
import Link from "next/link";
import { 
  CreditCard, ArrowLeft, Info, Landmark, HelpCircle
} from "lucide-react";
import EmiCalculator from "@/components/EmiCalculator";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

import { getToolsMeta } from "@/lib/meta";

export const metadata: Metadata = getToolsMeta("EMI");

export default function EmiCalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "EMI Calculator", url: "/tools/emi-calculator" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "2.5rem" }}>
          <Link href="/tools" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", textDecoration: "none", fontSize: "0.85rem", marginBottom: "1rem" }}>
            <ArrowLeft size={14} /> Back to Tools
          </Link>
          <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>EMI Calculator</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
             Calculate your monthly loan repayments and interest cost in seconds.
          </p>
        </div>

        <EmiCalculator />

        {/* SEO Content Section */}
        <section style={{ marginTop: "5rem", maxWidth: "800px" }}>
           <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>What is an EMI?</h2>
           <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              An **Equated Monthly Installment (EMI)** is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month, so that over a specified number of years, the loan is paid off in full.
           </p>

           <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>Components of EMI</h3>
           <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "2rem" }}>
              Every EMI you pay consists of two parts: the **Principal** amount (the actual money borrowed) and the **Interest** (the cost of borrowing). In the early years of your loan, a larger portion of the EMI goes toward interest, whereas in the later years, more of it goes toward principal repayment.
           </p>

           <div className="card" style={{ padding: "1.5rem", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                 <HelpCircle size={24} color="#3b82f6" />
                 <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>Reducing Balance Method</h4>
                    <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.6 }}>
                       This calculator uses the **Monthly Reducing Balance** method, which is the standard used by banks like SBI, HDFC, and ICICI for home and car loans in India.
                    </p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </>
  );
}
