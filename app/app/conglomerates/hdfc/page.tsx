import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { HDFC_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("hdfc" as "adani", HDFC_STOCKS);
export const revalidate = 60;

export default function HdfcPage() {
  return (
    <ConglomeratePage
      emoji="🏛️"
      groupKey="hdfc"
      groupName="HDFC Group"
      tagline="India's most trusted banking and financial services group"
      description="HDFC Group is India's largest private sector banking and financial services conglomerate. After the landmark merger of HDFC Ltd with HDFC Bank in 2023, HDFC Bank became the world's 4th largest bank by market cap. The group also includes HDFC Life Insurance, HDFC AMC (mutual funds), and HDFC ERGO (general insurance). Track all HDFC Group stocks live on NSE."
      stocks={HDFC_STOCKS}
      chips={[
        { label: "Listed Companies", value: "3+" },
        { label: "HDFC Bank Rank", value: "World Top 5 by MCAP" },
        { label: "Founded", value: "1977" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Branches", value: "8,000+" },
        { label: "ATMs", value: "19,000+" },
        { label: "Customers", value: "10 Cr+" },
        { label: "AUM (HDFC AMC)", value: "₹7L Cr+" },
      ]}
      faqs={[
        { q: "Did HDFC Ltd merge with HDFC Bank?", a: "Yes. In July 2023, HDFC Ltd (the housing finance company) merged with HDFC Bank in India's largest-ever merger. HDFC Bank is now a full-service bank with a large housing loan book. HDFC Ltd no longer trades separately." },
        { q: "What does HDFC Life Insurance (HDFCLIFE) do?", a: "HDFC Life Insurance (HDFCLIFE) is one of India's largest private life insurance companies, offering term plans, ULIPs, savings plans, and pension products. It is a JV between HDFC Bank and Standard Life Aberdeen of UK." },
        { q: "What is HDFC AMC's market share?", a: "HDFC AMC (HDFCAMC) is India's 2nd largest asset management company by AUM (₹7+ lakh crore). It manages HDFC Mutual Fund with 100+ schemes including popular ones like HDFC Top 100 and HDFC Flexi Cap Fund." },
        { q: "Is HDFC ERGO listed?", a: "HDFC ERGO General Insurance Company is NOT listed. It is a joint venture between HDFC Bank (50.5%) and ERGO International AG (Germany, 49.5%). It is a subsidiary of HDFC Bank." },
      ]}
      badgeColor="blue"
    />
  );
}
