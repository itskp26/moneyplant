import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { BIRLA_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("birla" as "adani", BIRLA_STOCKS);
export const revalidate = 60;

export default function BirlaPage() {
  return (
    <ConglomeratePage
      emoji="💎"
      groupKey="birla"
      groupName="Aditya Birla Group"
      tagline="Metals, Cement, Telecom, Fashion — A global powerhouse from India"
      description="Aditya Birla Group is a global conglomerate present in 40+ countries. Its flagship listed companies include Grasim Industries (conglomerate), UltraTech Cement (India's largest cement maker), Hindalco (India's largest aluminium producer), Aditya Birla Capital (financial services), Aditya Birla Fashion & Retail (Pantaloons, Louis Philippe, Van Heusen), and Vodafone Idea (telecom, Vi). Founded by Ghanshyam Das Birla, now led by Kumar Mangalam Birla."
      stocks={BIRLA_STOCKS}
      chips={[
        { label: "Listed Companies", value: "8+" },
        { label: "Countries", value: "40+" },
        { label: "Founded", value: "1857" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Revenue FY24", value: "$60B+" },
        { label: "Employees", value: "1.5L+" },
        { label: "Cement Capacity", value: "#1 India" },
        { label: "Chairman", value: "Kumar Mangalam Birla" },
      ]}
      faqs={[
        { q: "What is Grasim Industries and what does it make?", a: "Grasim Industries (GRASIM) is the holding company of the Aditya Birla Group with businesses in viscose staple fibre (VSF), chemicals, cement (via UltraTech), and B2B e-commerce (Birla OpKo). It is also investing heavily in paints through Birla Opus." },
        { q: "Is UltraTech Cement the largest cement company in India?", a: "Yes. UltraTech Cement (ULTRACEMCO) is India's largest cement manufacturer with a capacity of 150+ MT per annum. It is also the 3rd largest cement company in the world outside China." },
        { q: "What is Hindalco's global presence?", a: "Hindalco (HINDALCO) is India's largest aluminium and copper producer. Through its subsidiary Novelis (USA-listed), it is the world's largest recycled aluminium producer, supplying to automotive, beverage can, and aerospace industries." },
        { q: "What is Vodafone Idea (Vi)?", a: "Vodafone Idea (IDEA) is India's 3rd largest telecom operator formed by the merger of Vodafone India and Idea Cellular in 2018. Aditya Birla Group is the largest individual promoter. Vi has ~200M subscribers but faces significant debt challenges." },
        { q: "What fashion brands does Aditya Birla Fashion & Retail (ABFRL) own?", a: "ABFRL owns Louis Philippe, Van Heusen, Allen Solly, Peter England, Pantaloons, Reebok India licensing, and luxury brands Simon Carter, Ted Baker (India), Sabyasachi (partial), Tarun Tahiliani (partial)." },
      ]}
      badgeColor="blue"
    />
  );
}
