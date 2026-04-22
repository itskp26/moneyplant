import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { ICICI_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("icici" as "adani", ICICI_STOCKS);
export const revalidate = 60;

export default function IciciPage() {
  return (
    <ConglomeratePage
      emoji="🦁"
      groupKey="icici"
      groupName="ICICI Group"
      tagline="India's largest private bank by assets & iconic banking ecosystem"
      description="ICICI Group is one of India's largest financial services conglomerates. ICICI Bank is the largest private sector bank by assets. The ecosystem includes ICICI Lombard (general insurance), ICICI Prudential Life Insurance, ICICI Prudential AMC (mutual funds), and ICICI Securities (broking). The group is known for its digital-first iMobile app, FastTag, and wide NRI banking network."
      stocks={ICICI_STOCKS}
      chips={[
        { label: "ICICI Bank Rank", value: "#1 Private Bank India" },
        { label: "Listed Companies", value: "4+" },
        { label: "Founded", value: "1994" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Branches", value: "6,700+" },
        { label: "ATMs", value: "16,600+" },
        { label: "Countries", value: "17" },
        { label: "iMobile Users", value: "3 Cr+" },
      ]}
      faqs={[
        { q: "What is the difference between ICICI Bank, ICICI Lombard, and ICICI Prudential?", a: "ICICI Bank (ICICIBANK) is the bank. ICICI Lombard (ICICIGI) is ICICI's general insurance company (JV with Fairfax Financial). ICICI Prudential Life Insurance (ICICIPRULI) is the life insurance arm (JV with Prudential UK). All three are separately listed on NSE/BSE." },
        { q: "What is ICICI Securities?", a: "ICICI Securities (ICICISEC) is the broking and investment banking subsidiary of ICICI Group. It operates ICICIdirect.com, one of India's largest retail broking platforms with 7M+ customers. It was delisted in 2024 post merger with ICICI Bank." },
        { q: "Is ICICI Bank the largest bank in India?", a: "ICICI Bank is India's largest private sector bank by total assets and loan book. State Bank of India (SBI) is the largest bank overall including PSU banks." },
        { q: "What is ICICI Prudential AMC's market standing?", a: "ICICI Prudential AMC is India's largest asset management company by AUM (₹8+ lakh crore), managing over 200 mutual fund schemes across equity, debt, hybrid, and ETF categories." },
      ]}
      badgeColor="blue"
    />
  );
}
