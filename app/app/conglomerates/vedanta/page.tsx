import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { VEDANTA_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("vedanta" as "adani", VEDANTA_STOCKS);
export const revalidate = 60;

export default function VedantaPage() {
  return (
    <ConglomeratePage
      emoji="🪨"
      groupKey="vedanta"
      groupName="Vedanta Group"
      tagline="India's natural resources giant — Zinc, Aluminium, Oil & Copper"
      description="Vedanta Group, led by Anil Agarwal, is one of India's largest natural resource companies listed on NSE, BSE, and LSE (London). Vedanta Limited (VEDL) produces zinc (Hindustan Zinc is world's 2nd largest zinc miner), aluminium, copper, iron ore, and oil. The group aims to demerge into 6 separate listed entities to unlock value. Track all Vedanta group stocks live."
      stocks={VEDANTA_STOCKS}
      chips={[
        { label: "Zinc Production", value: "World #2" },
        { label: "Listed Companies", value: "3" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "UK Listing", value: "LSE (London)" },
        { label: "Chairman", value: "Anil Agarwal" },
        { label: "Oil Production", value: "200K bbl/day" },
      ]}
      faqs={[
        { q: "Is Hindustan Zinc part of Vedanta?", a: "Yes. Hindustan Copper (HINDCOPPER) is not Hindustan Zinc. Hindustan Zinc Ltd is a subsidiary of Vedanta Limited (64.9% stake). Hindustan Zinc is the world's 2nd largest integrated zinc producer. Note: Hindcopper (HINDCOPPER) is a separate PSU under Ministry of Mines." },
        { q: "What is the Vedanta demerger plan?", a: "In 2024, Vedanta announced a demerger into 6 separate listed companies: Vedanta Aluminium, Vedanta Oil & Gas, Vedanta Power, Vedanta Steel & Ferrous, Vedanta Base Metals, and Vedanta Limited (residual). This is pending regulatory approvals." },
        { q: "What commodities does Vedanta produce?", a: "Vedanta produces zinc-lead-silver (through Hindustan Zinc), aluminium (Lanjigarh refinery), copper (Silvassa and Tuticorin), iron ore (Goa), oil & gas (Rajasthan fields via Cairn India - now merged), and pig iron." },
        { q: "Is Vedanta also listed in London?", a: "Vedanta Resources PLC is the UK-based holding company of Vedanta Limited. It was listed on LSE (London Stock Exchange) and was delisted in 2018 to focus on the India listing of Vedanta Limited." },
      ]}
      badgeColor="gold"
    />
  );
}
