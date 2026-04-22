import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { SBI_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("sbi" as "adani", SBI_STOCKS);
export const revalidate = 60;

export default function SbiPage() {
  return (
    <ConglomeratePage
      emoji="🏦"
      groupKey="sbi"
      groupName="SBI Group"
      tagline="India's largest bank — 200 years of trust, 500M+ accounts"
      description="State Bank of India (SBI) is India's largest public sector bank with 22,000+ branches and 500M+ account holders — making it one of the world's largest banks by customer base. The SBI ecosystem includes SBI Cards & Payments (listed), SBI Life Insurance (listed), and SBI Mutual Fund (unlisted, India's largest mutual fund by AUM). Track all SBI Group stocks live on NSE/BSE."
      stocks={SBI_STOCKS}
      chips={[
        { label: "Rank", value: "#1 PSU Bank India" },
        { label: "Listed Subsidiaries", value: "2" },
        { label: "Founded", value: "1806" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Branches", value: "22,000+" },
        { label: "ATMs", value: "65,000+" },
        { label: "Customers", value: "50 Cr+" },
        { label: "Countries", value: "31" },
      ]}
      faqs={[
        { q: "Is SBI a government bank?", a: "Yes. State Bank of India (SBI) is a public sector undertaking (PSU). The Government of India holds ~57% stake in SBI, making it a majority government-owned bank. It is listed on both NSE and BSE." },
        { q: "What is SBI Cards (SBICARD)?", a: "SBI Cards & Payment Services (SBICARD) is India's 2nd largest credit card company by outstanding cards and spends. It is a subsidiary of SBI (listed separately since 2020) and offers 50+ credit card variants including SBI SimplyCLICK and SBI Elite." },
        { q: "What is SBI Life Insurance (SBILIFE)?", a: "SBI Life Insurance (SBILIFE) is India's largest private life insurer by New Business Premium (NBP). It is a joint venture between SBI (55.5%) and BNP Paribas Cardif (22%)." },
        { q: "How large is SBI Mutual Fund (SBIMF)?", a: "SBI Mutual Fund is the largest asset management company in India by AUM at ₹10+ lakh crore. Popular schemes include SBI Bluechip Fund, SBI Small Cap Fund, and SBI Magnum Gilt Fund. SBIMF is NOT listed separately." },
      ]}
      badgeColor="blue"
    />
  );
}
