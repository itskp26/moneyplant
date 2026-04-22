import type { Metadata } from "next";
import { getConglomerateMeta } from "@/lib/meta";
import { JSW_STOCKS } from "@/lib/constants";
import ConglomeratePage from "@/components/ConglomeratePage";

export const metadata: Metadata = getConglomerateMeta("jsw" as "adani", JSW_STOCKS);
export const revalidate = 60;

export default function JswPage() {
  return (
    <ConglomeratePage
      emoji="🏗️"
      groupKey="jsw"
      groupName="JSW Group"
      tagline="India's largest steel producer & fast-growing energy and infra conglomerate"
      description="JSW Group, led by Sajjan Jindal, is one of India's fastest-growing conglomerates. JSW Steel is India's largest steel manufacturer with 29 MT capacity. The group also includes JSW Energy (power), JSW Infrastructure (ports), and JSW Cement. JSW is also co-owner of MG Motor India (JV with SAIC/Morris Garages), making in India's first mass-market EV. Track all JSW Group stocks live."
      stocks={JSW_STOCKS}
      chips={[
        { label: "JSW Steel Capacity", value: "29 MT" },
        { label: "Listed Companies", value: "4" },
        { label: "Founded", value: "1994" },
        { label: "HQ", value: "Mumbai, Maharashtra" },
        { label: "Chairman", value: "Sajjan Jindal" },
        { label: "Revenue FY24", value: "$22B+" },
      ]}
      faqs={[
        { q: "Is JSW Steel the largest steel company in India?", a: "Yes. JSW Steel (JSWSTEEL) is India's largest steel producer with a crude steel capacity of 29 MTPA. It is also one of India's largest exporters of flat-rolled steel products." },
        { q: "What does JSW Infrastructure (JSWINFRA) do?", a: "JSW Infrastructure (JSWINFRA) operates ports across India's west and east coasts, including Nandgaon Port, Jaigarh Port, and Dharamtar Port. It handles cargo for JSW Steel and third-party customers." },
        { q: "Does JSW own MG Motor India?", a: "Yes. JSW Group acquired a 35% stake in MG Motor India (a subsidiary of China's SAIC Motor) in late 2023. The new JV manufactures MG Hector, MG Astor, and MG Windsor EV in India." },
        { q: "What is JSW Cement?", a: "JSW Cement is a subsidiary of JSW Group with grinding units in Nandyal, Salboni, and Shiva Cement. It has a capacity of 20 MT and is NOT listed. It may pursue an IPO." },
      ]}
      badgeColor="blue"
    />
  );
}
