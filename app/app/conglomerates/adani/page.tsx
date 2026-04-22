import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { ADANI_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("adani", ADANI_STOCKS);
export const revalidate = 60;

export default function AdaniPage() {
  return (
    <ConglomeratePage
      emoji="🏦"
      groupKey="adani"
      groupName="Adani Group"
      tagline="India's largest infrastructure & energy conglomerate — Navi Mumbai to Mundra"
      description="Adani Group is one of India's largest and fastest-growing multinational conglomerates, founded by Gautam Adani. The group has business interests spanning ports, logistics, power generation, renewable energy (world's largest solar developer), gas distribution, airports, cement (via ACC & Ambuja), FMCG (Adani Wilmar), media (NDTV), and data centres. Track all listed Adani Group companies live on NSE and BSE."
      stocks={ADANI_STOCKS}
      chips={[
        { label: "Listed Companies", value: "14+" },
        { label: "Exchanges", value: "NSE + BSE" },
        { label: "Sectors", value: "12+" },
        { label: "Founded", value: "1988" },
        { label: "Founder", value: "Gautam Adani" },
        { label: "HQ", value: "Ahmedabad, Gujarat" },
        { label: "Ports Operated", value: "13+" },
        { label: "Airports Operated", value: "7" },
      ]}
      faqs={[
        { q: "How many companies are in the Adani Group?", a: "Adani Group has 14+ publicly listed companies on NSE and BSE, including Adani Enterprises (flagship), Adani Ports, Adani Power, Adani Green Energy, Adani Total Gas (ATGL), NDTV, ACC, Ambuja Cements, Gujarat Gas, Adani Wilmar, and Adani Energy Solutions." },
        { q: "What is Adani Enterprises (ADANIENT) share price today?", a: "Adani Enterprises Limited (ADANIENT) is the flagship incubator of the Adani Group. Its live share price is updated every minute on MoneyPlant. Track it at /stocks/adanient." },
        { q: "What does Adani Ports (ADANIPORTS) do?", a: "Adani Ports and SEZ (ADANIPORTS) is India's largest private port developer and operator, managing 13+ ports across India including Mundra Port, Hazira, Dahej, Kattupalli, Vizhinjam International Seaport, and more." },
        { q: "Is Adani Green Energy (ADANIGREEN) a good investment?", a: "Adani Green Energy (ADANIGREEN) is India's largest renewable energy company with a goal of 50 GW capacity by 2030. Investment decisions require research and SEBI-registered financial advisor guidance." },
        { q: "What is Adani Total Gas (ATGL)?", a: "Adani Total Gas Ltd (ATGL) is a city gas distribution company operating in 53+ geographical areas, distributing piped natural gas (PNG) to homes and CNG to vehicles. It is a joint venture between Adani Group and TotalEnergies." },
        { q: "How did Adani acquire ACC and Ambuja Cement?", a: "In 2022, the Adani Group acquired Swiss cement giant Holcim's India operations — ACC and Ambuja Cements — in a $10.5 billion deal, making Adani one of India's largest cement producers." },
        { q: "What is NDTV's connection to Adani Group?", a: "Adani Group acquired a majority stake in NDTV (New Delhi Television) in 2022, becoming the largest shareholder. This gives Adani Group a significant presence in Indian media through NDTV and its channels including NDTV 24x7, NDTV India, and NDTV Profit." },
        { q: "What is Adani Wilmar (AWL)?", a: "Adani Wilmar Ltd (AWL) is a FMCG company that makes Fortune-branded edible oils, food products, and FMCG goods. It is a 50:50 joint venture between Adani Group and Wilmar International of Singapore." },
      ]}
      badgeColor="blue"
    />
  );
}
