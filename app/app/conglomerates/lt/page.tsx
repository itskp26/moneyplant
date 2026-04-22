import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { LT_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("lt" as "adani", LT_STOCKS);
export const revalidate = 60;

export default function LtPage() {
  return (
    <ConglomeratePage
      emoji="⚙️"
      groupKey="lt"
      groupName="L&T Group"
      tagline="Engineering India's future — Infrastructure, IT, Defence & Finance"
      description="Larsen & Toubro (L&T) is India's largest engineering and construction company, building India's infrastructure since 1938. L&T's diversified portfolio spans heavy engineering, construction (metro, highways, airports, defense), technology (LTIMindtree — Top 5 IT company, L&T Technology Services — embedded engineering), financial services (L&T Finance), and hydrocarbon engineering. L&T is the backbone of India's infrastructure buildout."
      stocks={LT_STOCKS}
      chips={[
        { label: "Listed Companies", value: "5" },
        { label: "Founded", value: "1938" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Order Book", value: "₹5L Cr+" },
        { label: "Countries", value: "50+" },
        { label: "L&T Market Cap", value: "₹4+ Lakh Cr" },
        { label: "Revenue FY24", value: "₹2.2L Cr" },
        { label: "Employees", value: "4L+" },
      ]}
      faqs={[
        { q: "What projects has L&T built in India?", a: "L&T has built some of India's most iconic projects including Mumbai Metro, Delhi Airport T3, Bandra-Worli Sea Link, Statue of Unity, Bengaluru Kempegowda International Airport, and multiple defence missile systems (Agni, Pinaka)." },
        { q: "What is LTIMindtree and how is it related to L&T?", a: "LTIMindtree (LTIM) is formed by the merger of L&T Infotech and Mindtree (2022), creating India's 5th largest IT company. L&T holds approximately 70% stake in LTIMindtree." },
        { q: "What does L&T Technology Services (LTTS) specialize in?", a: "L&T Technology Services (LTTS) provides engineering R&D services to global companies in automotive (ADAS, EV), aerospace, industrial, telecom, and medical devices. It is distinct from LTIMindtree which focuses on enterprise IT." },
        { q: "What is L&T Finance Holdings?", a: "L&T Finance Holdings (LTFH) is the NBFC arm of L&T Group, providing loans for farm equipment, two-wheelers, homes, and SME businesses. L&T is gradually reducing its stake and LTFH is becoming more independent." },
      ]}
      badgeColor="blue"
    />
  );
}
