import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { MAHINDRA_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("mahindra" as "adani", MAHINDRA_STOCKS);
export const revalidate = 60;

export default function MahindraPage() {
  return (
    <ConglomeratePage
      emoji="🚙"
      groupKey="mahindra"
      groupName="Mahindra Group"
      tagline="Rise — India's leading SUV maker, IT giant, and farming solutions provider"
      description="Mahindra & Mahindra Group is one of India's largest multinationals, best known for its SUVs (Scorpio, Thar, XUV700) and tractors. The group also owns Tech Mahindra (Top 5 IT company), Mahindra Finance, Mahindra Logistics, Mahindra Lifespaces, and Club Mahindra holidays. Track all Mahindra group stocks live with real-time NSE/BSE prices."
      stocks={MAHINDRA_STOCKS}
      chips={[
        { label: "Listed Companies", value: "8+" },
        { label: "Founded", value: "1945" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Tractors (India)", value: "#1" },
        { label: "SUVs (India)", value: "Market Leader" },
        { label: "Tech Mahindra Emp.", value: "1.5L+" },
        { label: "Countries", value: "100+" },
      ]}
      faqs={[
        { q: "What are Mahindra's most popular SUVs?", a: "Mahindra's popular SUVs include the Thar (iconic off-roader), Scorpio-N, XUV700, XUV3XO, Bolero (India's best-selling UV), and BE 6e (electric). Mahindra is India's largest SUV maker by volume." },
        { q: "What is Tech Mahindra's specialization?", a: "Tech Mahindra (TECHM) is a top-5 Indian IT company specializing in telecom technology, 5G services, enterprise IT, digital transformation, and BPO services. It serves 700+ global clients in 90+ countries." },
        { q: "What does Mahindra Finance do?", a: "Mahindra Finance (MFSL) provides vehicle financing (two-wheelers, tractors, cars) and SME loans primarily to rural and semi-urban India. It is one of India's largest NBFCs by rural loan book." },
        { q: "What is Club Mahindra?", a: "Club Mahindra (MHRIL — Mahindra Holidays & Resorts) is India's largest vacation ownership company with 120+ resorts in India and abroad. It's a listed subsidiary of Mahindra Group." },
      ]}
      badgeColor="green"
    />
  );
}
