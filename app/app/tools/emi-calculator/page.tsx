import type { Metadata } from "next";
import Link from "next/link";
import { 
  CreditCard, ArrowLeft, Info, Landmark, HelpCircle
} from "lucide-react";
import EmiCalculator from "@/components/EmiCalculator";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `EMI Calculator — Home, Car & Personal Loan Planner ${new Date().getFullYear()} | MoneyPlant`,
  description: `Calculate your loan EMI instantly with our free EMI calculator today ${new Date().getFullYear()}. Plan your Home Loan, Car Loan, or Personal Loan repayments with detailed interest schedules and principal breakdowns.`,
  keywords: [
    "emi calculator today", "loan emi calculator live", "home loan emi calculator",
    "car loan emi calculator", "personal loan emi planner", "education loan emi calculator",
    "bike loan emi calculator", "mortgage emi calculator", "instant emi quote",
    "emi calculator india", "emi calculator usa", "emi calculator uk", "emi calculator uae",
    "emi calculator dubai", "emi calculator saudi arabia", "emi calculator canada",
    "emi calculator australia", "sbi home loan emi calculator", "hdfc car loan emi",
    "icici personal loan emi", "axis bank emi planner today", "bajaj finance emi calculator",
    "loan repayment calculator global", "interest only loan calculator", "reducing balance emi",
    "flat rate vs reducing rate calculator", "loan amortization schedule today",
    "how to calculate emi manually", "formula for emi calculation",
    "emi for 10 lakh home loan", "emi for 20 lakh home loan", "emi for 30 lakh home loan",
    "emi for 50 lakh home loan", "emi for 1 crore home loan", "loan eligibility calculator",
    "prepayment impact on emi", "part payment vs emi reduction", "loan tenure impact on interest",
    "low interest loan emi calculator", "best banks for emi in india",
    "foreclosure charges calculator", "lap loan against property emi",
    "gold loan emi calculator today", "business loan emi planner",
    "startup loan emi calculator", "msme loan emi calculator",
    "property loan emi calculator", "emi starting from today",
    `best loan planner ${new Date().getFullYear()}`, `top 20 emi calculators ${new Date().getFullYear()}`,
    "emi calculator online free", "emi calculator with graph and table",
    "emi calculator monthly reducing", "yearly vs monthly emi",
  ].join(", "),
};

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
