import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { ITC_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("itc" as "adani", ITC_STOCKS);
export const revalidate = 60;

export default function ItcPage() {
  return (
    <ConglomeratePage
      emoji="🌿"
      groupKey="itc"
      groupName="ITC Group"
      tagline="FMCG, Tobacco, Hotels, Agribusiness & Packaging powerhouse"
      description="ITC Limited is one of India's foremost multi-business enterprises, spanning cigarettes (largest in India), FMCG (Sunfeast, Aashirvaad, Bingo, Fiama, Savlon, YiPPee!), hotels (ITC Hotels — luxury chain), agribusiness, paperboards & packaging, and IT (ITC Infotech). ITC is focused on sustainability and aims to become a ₹1 lakh crore FMCG company by 2030. ITC Hotels was separately listed in 2025."
      stocks={ITC_STOCKS}
      chips={[
        { label: "Market Cap", value: "₹5+ Lakh Cr" },
        { label: "Listed Entities", value: "2" },
        { label: "Founded", value: "1910" },
        { label: "HQ", value: "Kolkata, West Bengal" },
        { label: "FMCG Brands", value: "25+" },
        { label: "Hotel Properties", value: "120+" },
        { label: "Employees", value: "35,000+" },
        { label: "Cigarette Market", value: "#1 India" },
      ]}
      faqs={[
        { q: "What FMCG brands does ITC own?", a: "ITC owns Aashirvaad (atta, spices — India's #1 atta brand), Sunfeast (biscuits, noodles, pasta), Bingo! (snacks), YiPPee! (noodles), Fiama (soaps, shampoos), Engage (deodorants), Savlon (hand sanitizers, antiseptic), ClassMate (notebooks), and Mangaldeep (agarbatti)." },
        { q: "Why is ITC a good dividend stock?", a: "ITC has historically paid high dividends (yield of 3-5% per annum) due to its strong cash flow from the cigarette business. It is considered a classic defensive dividend stock in Indian equity markets." },
        { q: "Is ITC Hotels separately listed?", a: "Yes. ITC Hotels Limited (ITCHOTEL) was separately listed on NSE and BSE in January 2025 following its demerger from ITC Limited. ITC Hotels is one of India's largest luxury hotel chains with properties ITC Grand Chola, ITC Maurya, ITC Sonar, and WelcomHotels." },
        { q: "What is ITC's agribusiness division?", a: "ITC's agribusiness (eChoupal) directly connects with 4M+ farmers across 35,000 villages, procuring wheat, rice, soya, coffee, and other commodities. This is one of India's largest private sector rural digital initiatives." },
      ]}
      badgeColor="green"
    />
  );
}
