import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { GODREJ_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("godrej" as "adani", GODREJ_STOCKS);
export const revalidate = 60;

export default function GodrejPage() {
  return (
    <ConglomeratePage
      emoji="🏛️"
      groupKey="godrej"
      groupName="Godrej Group"
      tagline="India's most beloved household brand — FMCG, Real Estate & Agri"
      description="Godrej Group is one of India's most iconic conglomerates founded in 1897 by Ardeshir Godrej. The group spans FMCG (Godrej Consumer — Cinthol, HIT, Goodknight), real estate (Godrej Properties — premium apartments), agri-inputs (Godrej Agrovet), and industrial products. The group recently underwent a landmark restructuring to separate Jamshyd Godrej and Nadir Godrej family businesses."
      stocks={GODREJ_STOCKS}
      chips={[
        { label: "Listed Companies", value: "4" },
        { label: "Founded", value: "1897" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Countries", value: "18+" },
        { label: "Godrej Properties Rank", value: "India's #1 Real Estate" },
        { label: "Employees", value: "28,000+" },
      ]}
      faqs={[
        { q: "What brands does Godrej Consumer Products (GODREJCP) own?", a: "Godrej Consumer Products owns Cinthol (soaps), Godrej No.1 (soaps), HIT (pest control), Goodknight (mosquito repellents), Aer (air fresheners), Expert (hair colour), and Nupur Henna. Internationally it owns Darling (Africa), Wet n Wild (discontinued), and many more." },
        { q: "Is Godrej Properties the largest real estate developer?", a: "Godrej Properties (GODREJPROP) is consistently ranked as India's most trusted and often largest real estate developer by new bookings. It has projects in Mumbai, Pune, Bangalore, Delhi NCR, and Hyderabad." },
        { q: "Did Godrej Group split recently?", a: "Yes. In 2024, the Godrej family announced a restructuring where Jamshyd Godrej's family will own Godrej Industries (holding GCPL, GPL, Godrej Agrovet) while Adi Godrej's family will own Godrej Enterprises (locks, appliances, aviation, IT parks). The split is being formalized." },
        { q: "What does Godrej Agrovet do?", a: "Godrej Agrovet (GODREJAGROVET) manufactures animal feed, crop protection chemicals, oil palm, dairy (Godrej Jersey) and poultry products. It is one of India's leading agri-business companies." },
      ]}
      badgeColor="green"
    />
  );
}
