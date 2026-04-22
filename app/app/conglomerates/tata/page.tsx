import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { TATA_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("tata", TATA_STOCKS);
export const revalidate = 60;

export default function TataPage() {
  return (
    <ConglomeratePage
      emoji="🔷"
      groupKey="tata"
      groupName="Tata Group"
      tagline="India's most trusted conglomerate — IT, Auto, Steel, Hotels, Consumer & more"
      description="Tata Group is India's most diversified and globally respected business conglomerate with 30+ listed/unlisted companies. Its portfolio spans IT (TCS — India's largest IT company), automobiles (Tata Motors, Jaguar Land Rover), steel (Tata Steel — Europe's 2nd largest), consumer goods (Titan, Westside), FMCG (Tata Consumer), hospitality (Taj Hotels), power (Tata Power), and technology (Tata Elxsi, Tata Tech). Track all Tata Group stocks live on NSE."
      stocks={TATA_STOCKS}
      chips={[
        { label: "Listed Companies", value: "18+" },
        { label: "Countries", value: "100+" },
        { label: "Employees", value: "9 Lakh+" },
        { label: "Revenue FY24", value: "$165B+" },
        { label: "Founded", value: "1868" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "TCS Market Cap", value: "₹13+ Lakh Cr" },
        { label: "Founder", value: "Jamsetji Tata" },
      ]}
      faqs={[
        { q: "Which is the largest Tata Group company?", a: "Tata Consultancy Services (TCS) is the largest Tata Group company by both revenue and market capitalization, consistently among the top 5 most valuable Indian companies." },
        { q: "Does Tata Motors own Jaguar Land Rover?", a: "Yes. Tata Motors acquired Jaguar Land Rover (JLR) from Ford Motor Company in 2008 for $2.3 billion. JLR contributes over 70% of Tata Motors' global revenue." },
        { q: "What is Trent and what brands does it own?", a: "Trent Limited is the retail arm of Tata Group. It operates Westside (apparel department stores), Zudio (value fashion) and has a partnership with Inditex to operate Zara outlets in India." },
        { q: "What is the difference between Tata Elxsi and Tata Technologies?", a: "Tata Elxsi (TATAELXSI) focuses on design and technology services for automotive, media, and healthcare industries. Tata Technologies (TATATECH) provides engineering R&D and digital transformation services specifically to global automotive OEMs." },
        { q: "What does Indian Hotels (INDHOTEL) do?", a: "Indian Hotels Company Limited (IHCL/INDHOTEL) operates the Taj Hotels brand — India's most iconic luxury hotel chain with properties across India, UK, USA, and 12+ countries." },
        { q: "Is Tata Steel profitable?", a: "Tata Steel operates India's largest steel plant (Jamshedpur, 10 MT capacity) and UK plants (Tata Steel Europe). Profitability varies — Indian operations are more profitable than the European operations which face energy cost headwinds." },
        { q: "What is Titan Company's core business?", a: "Titan Company (TITAN) is a Tata Group company and India's largest manufacturer of watches, jewellery (Tanishq — India's largest jewellery brand), eyewear (Titan Eyeplus), and accessories. Tanishq contributes over 85% of Titan's revenue." },
      ]}
      badgeColor="blue"
    />
  );
}
