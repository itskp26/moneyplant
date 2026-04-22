import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { RELIANCE_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("reliance", RELIANCE_STOCKS);
export const revalidate = 60;

export default function ReliancePage() {
  return (
    <ConglomeratePage
      emoji="⚡"
      groupKey="reliance"
      groupName="Reliance Group"
      tagline="India's most valuable company — Telecom, Retail, Oil & Gas, Green Energy"
      description="Reliance Group encompasses both Mukesh Ambani's Reliance Industries (RELIANCE) — India's largest company by market cap with subsidiaries Jio Platforms (4G/5G), Reliance Retail (India's largest retailer), and Rel Petro — and Anil Ambani's ADAG group (Reliance Power, Reliance Infrastructure, etc.). Track all listed Reliance group entities live on NSE and BSE."
      stocks={RELIANCE_STOCKS}
      chips={[
        { label: "Market Cap (RIL)", value: "₹19+ Lakh Cr" },
        { label: "Listed Companies", value: "8+" },
        { label: "Jio Subscribers", value: "480M+" },
        { label: "Retail Stores", value: "18,000+" },
        { label: "RIL Employees", value: "2.4L+" },
        { label: "Founded (RIL)", value: "1966" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Revenue FY24", value: "$109B+" },
      ]}
      faqs={[
        { q: "Is Reliance Retail listed on the stock market?", a: "No. Reliance Retail Ventures Limited (RRVL) is a wholly owned subsidiary of Reliance Industries and is NOT separately listed on NSE or BSE as of 2025. To invest in Reliance Retail, you must buy shares of RELIANCE on NSE/BSE." },
        { q: "What is Jio Financial Services (JIOFIN)?", a: "Jio Financial Services (JIOFINANCE) was demerged from Reliance Industries in 2023 and is separately listed on NSE and BSE. It offers lending, payments, insurance broking, and asset management services under the Jio brand." },
        { q: "What is the difference between Reliance Industries and Reliance Power?", a: "Reliance Industries (RELIANCE) is Mukesh Ambani's flagship company. Reliance Power (RPOWER) and Reliance Infrastructure (RELINFRA) belong to the ADAG group founded by Anil Ambani — a completely separate corporate entity after the Ambani family split." },
        { q: "What are Reliance Industries' main businesses?", a: "Reliance Industries has 5 main verticals: (1) Oil-to-Chemicals (O2C) — world's largest refinery at Jamnagar, (2) Jio Platforms — India's largest 4G/5G telecom operator, (3) Reliance Retail — India's largest retailer, (4) Media & Entertainment (Network18, JioCinema), (5) New Energy — solar, green hydrogen." },
        { q: "Where is Reliance Jio listed?", a: "Jio Platforms Limited is not directly listed. However, Jio Financial Services — the fintech arm — IS listed as JIOFINANCE on NSE and BSE since August 2023." },
        { q: "What is Reliance's stake in Network18?", a: "Reliance Industries has majority ownership of Network18 Media & Investments, which operates TV channels (CNN-News18, CNBC TV18, Colors TV, MTV India) and digital platforms (Moneycontrol, News18)." },
        { q: "What is the 5G rollout of Jio?", a: "Jio launched India's fastest 5G rollout in October 2022. As of 2024, Jio True 5G is available in 6,000+ towns across India, making it the world's largest 5G network by geographic reach." },
      ]}
      badgeColor="blue"
    />
  );
}
