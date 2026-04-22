import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { BAJAJ_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("bajaj", BAJAJ_STOCKS);
export const revalidate = 60;

export default function BajajPage() {
  return (
    <ConglomeratePage
      emoji="🅱️"
      groupKey="bajaj"
      groupName="Bajaj Group"
      tagline="India's premier two-wheeler & financial services powerhouse"
      description="Bajaj Group is one of India's oldest and most respected business houses, founded by Jamnalal Bajaj. The group's marquee companies include Bajaj Finance (India's most valuable NBFC), Bajaj Finserv (financial services holding company), and Bajaj Auto (world's 4th largest two-wheeler maker). The Bajaj family holds significant stakes across consumer durables and financial services sectors. Track all Bajaj Group stocks live."
      stocks={BAJAJ_STOCKS}
      chips={[
        { label: "listed Companies", value: "6" },
        { label: "Founded", value: "1926" },
        { label: "HQ", value: "Pune, Maharashtra" },
        { label: "Bajaj Finance MCAP", value: "₹4+ Lakh Cr" },
        { label: "Bajaj Auto Units/yr", value: "4M+" },
        { label: "Bajaj Finance Loans", value: "₹3.5L Cr+" },
      ]}
      faqs={[
        { q: "What is Bajaj Finance and why is it valued so high?", a: "Bajaj Finance (BAJFINANCE) is India's most profitable non-banking financial company (NBFC). It lends to consumers and SMEs for electronics, two-wheelers, personal loans, and housing. Its high valuation reflects exceptional growth, asset quality, and digital-first approach." },
        { q: "Is Bajaj Finserv the same as Bajaj Finance?", a: "No. Bajaj Finserv (BAJAJFINSV) is the holding company that owns 52.6% stake in Bajaj Finance and also holds stakes in Bajaj Allianz General Insurance and Bajaj Allianz Life Insurance. Bajaj Finance is the listed NBFC subsidiary." },
        { q: "What two-wheelers does Bajaj Auto make?", a: "Bajaj Auto (BAJAJ-AUTO) makes Pulsar, Platina, CT, Avenger, and Dominar motorcycles. It also produces RE auto-rickshaws and exports heavily. Bajaj owns KTM and Husqvarna brands via a JV with KTM AG of Austria." },
        { q: "What does Bajaj Electricals make?", a: "Bajaj Electricals (BAJAJELEC) manufactures fans, LED lights, water heaters, appliances, and EPC (power distribution) projects. It is one of India's leading consumer appliance brands." },
      ]}
      badgeColor="gold"
    />
  );
}
