import type { Metadata } from "next";
import Link from "next/link";
import { 
  Rocket, Calendar, BadgeCheck, BarChart3, 
  Search, Info, HelpCircle, ExternalLink, ShieldAlert
} from "lucide-react";
import { getIpoMeta } from "@/lib/meta";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = getIpoMeta();

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

import { PremiumFeatureCard } from "@/components/VisualCards";

export default async function IpoHubPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const selectedYear = (typeof resolvedParams.year === "string" ? resolvedParams.year : "2026");

  const AVAILABLE_YEARS = ["2026", "2025", "2024"];

  const IPO_DATABASE: Record<string, any> = {
    "2026": {
      open: [
        { name: "EcoEnergy Tech", price: "210 - 225", date: "Apr 18 - Apr 21", gmp: "₹45", status: "Open" },
      ],
      upcoming: [
        { name: "Swiggy Limited", price: "TBA", date: "May 2026", gmp: "₹140", status: "Upcoming" },
        { name: "Hyundai Motors India", price: "TBA", date: "Jul 2026", gmp: "₹280", status: "Upcoming" },
      ],
      recentlyListed: [
        { name: "Aether AI Systems", price: "₹450", listedAt: "₹620", gain: "+37.7%", date: "Mar 10" },
        { name: "Urban Space Infra", price: "₹180", listedAt: "₹175", gain: "-2.8%", date: "Feb 22" },
      ]
    },
    "2025": {
      open: [],
      upcoming: [],
      recentlyListed: [
        { name: "Aadhar Housing Finance", price: "₹315", listedAt: "₹345", gain: "+9.5%", date: "May 15" },
        { name: "Go Digit Insurance", price: "₹272", listedAt: "₹282", gain: "+3.6%", date: "May 23" },
        { name: "FirstCry (Brainbees)", price: "₹465", listedAt: "₹650", gain: "+39.7%", date: "Aug 12" },
        { name: "Ola Electric", price: "₹76", listedAt: "₹91", gain: "+19.7%", date: "Aug 09" },
      ]
    },
    "2024": {
      open: [],
      upcoming: [],
      recentlyListed: [
        { name: "Tata Technologies", price: "₹500", listedAt: "₹1200", gain: "+140.0%", date: "Nov 30" },
        { name: "IREDA", price: "₹32", listedAt: "₹50", gain: "+56.2%", date: "Nov 29" },
        { name: "DOMS Industries", price: "₹790", listedAt: "₹1400", gain: "+77.2%", date: "Dec 20" },
      ]
    }
  };

  const ipos = IPO_DATABASE[selectedYear] || IPO_DATABASE["2026"];

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "IPO", url: "/ipo" },
      ])} />

      <div className="container section">
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <Rocket size={16} /> IPO Investment Hub
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "0.75rem", margin: 0 }}>IPO Tracker {selectedYear}</h1>
            <div style={{ display: "flex", gap: "10px" }}>
              {AVAILABLE_YEARS.map(y => (
                <Link 
                  key={y} 
                  href={`/ipo?year=${y}`}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    border: selectedYear === y ? "1px solid #3b82f6" : "1px solid rgba(51, 65, 85, 0.5)",
                    background: selectedYear === y ? "rgba(59, 130, 246, 0.1)" : "transparent",
                    color: selectedYear === y ? "#3b82f6" : "#94a3b8",
                    transition: "all 0.2s"
                  }}
                >
                  {y}
                </Link>
              ))}
            </div>
          </div>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px" }}>
            Track upcoming, open and closed IPOs in India. Get real-time Grey Market Premium (GMP), allotment status, and listing price analysis for Mainboard and SME IPOs.
          </p>
        </div>

        {/* Action Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
           <PremiumFeatureCard 
             title="Check Allotment"
             desc="Check your IPO allotment status on Karvy, Link Intime and more with direct portal access."
             icon={<Search />}
             accentColor="#3b82f6"
             actionText="Check Now"
             href="#"
             delay={0.1}
           />
           <PremiumFeatureCard 
             title="Live GMP Today"
             desc="Monitor real-time grey market premiums to estimate potential listing gains before the debut."
             icon={<BarChart3 />}
             accentColor="#10b981"
             actionText="View GMP Hub"
             href="#"
             delay={0.2}
           />
           <PremiumFeatureCard 
             title="Expert Reviews"
             desc="Detailed analysis and 'Apply' or 'Avoid' ratings from seasoned market analysts."
             icon={<BadgeCheck />}
             accentColor="#8b5cf6"
             actionText="Read Reviews"
             href="#"
             delay={0.3}
           />
        </div>

        {/* Tables Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2.5rem" }} className="content-grid">
           
           <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
              {/* Ongoing / Open */}
              {ipos.open.length > 0 && (
                <section>
                   <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                     <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }} /> Open IPOs
                   </h2>
                   <div className="card" style={{ overflow: "hidden" }}>
                      <div style={{ overflowX: "auto" }}>
                         <table className="data-table">
                            <thead>
                               <tr>
                                  <th>Issuer Company</th>
                                  <th>Price Band</th>
                                  <th>Open Date</th>
                                  <th style={{ textAlign: "right" }}>GMP</th>
                                  <th style={{ textAlign: "right" }}>Action</th>
                               </tr>
                            </thead>
                            <tbody>
                               {ipos.open.map((ipo: any) => (
                                 <tr key={ipo.name}>
                                    <td style={{ fontWeight: 700, color: "#f1f5f9" }}>{ipo.name}</td>
                                    <td style={{ color: "#94a3b8" }}>{ipo.price}</td>
                                    <td style={{ color: "#94a3b8" }}>{ipo.date}</td>
                                    <td style={{ textAlign: "right", color: "#10b981", fontWeight: 700 }}>{ipo.gmp}</td>
                                    <td style={{ textAlign: "right" }}>
                                       <a href="#" style={{ color: "#3b82f6", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>APPLY →</a>
                                    </td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                   </div>
                </section>
              )}

              {/* Upcoming */}
              {ipos.upcoming.length > 0 && (
                <section>
                   <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                     <Calendar size={24} color="#f59e0b" /> Upcoming IPOs
                   </h2>
                   <div className="card" style={{ overflow: "hidden" }}>
                      <div style={{ overflowX: "auto" }}>
                         <table className="data-table">
                            <thead>
                               <tr>
                                  <th>Company Name</th>
                                  <th>Est. Price</th>
                                  <th>Listing Date</th>
                                  <th style={{ textAlign: "right" }}>GMP</th>
                               </tr>
                            </thead>
                            <tbody>
                               {ipos.upcoming.map((ipo: any) => (
                                 <tr key={ipo.name}>
                                    <td style={{ fontWeight: 700, color: "#cbd5e1" }}>{ipo.name}</td>
                                    <td style={{ color: "#64748b" }}>{ipo.price}</td>
                                    <td style={{ color: "#64748b" }}>{ipo.date}</td>
                                    <td style={{ textAlign: "right", color: "#f59e0b", fontWeight: 700 }}>{ipo.gmp}</td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                   </div>
                </section>
              )}

              {/* Recently Listed */}
              {ipos.recentlyListed.length > 0 ? (
                 <section>
                   <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
                     <BadgeCheck size={24} color="#3b82f6" /> Recently Listed
                   </h2>
                   <div className="card" style={{ overflow: "hidden" }}>
                    <div style={{ overflowX: "auto" }}>
                       <table className="data-table">
                          <thead>
                             <tr>
                                <th>Company</th>
                                <th>Offer Price</th>
                                <th>Listing Price</th>
                                <th style={{ textAlign: "right" }}>Gain/Loss</th>
                             </tr>
                          </thead>
                          <tbody>
                             {ipos.recentlyListed.map((ipo: any) => (
                               <tr key={ipo.name}>
                                  <td style={{ fontWeight: 700, color: "#cbd5e1" }}>{ipo.name}</td>
                                  <td style={{ color: "#64748b" }}>{ipo.price}</td>
                                  <td style={{ color: "#cbd5e1" }}>{ipo.listedAt}</td>
                                  <td style={{ textAlign: "right", color: ipo.gain.startsWith("+") ? "#10b981" : "#ef4444", fontWeight: 700 }}>{ipo.gain}</td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </section>
              ) : (
                <div style={{ padding: "3rem", textAlign: "center", color: "#64748b", background: "rgba(30, 41, 59, 0.4)", borderRadius: "12px" }}>
                   No established IPO data available for this year.
                </div>
              )}
           </div>

           <aside style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {/* IPO Guide */}
              <div style={{ 
                padding: "2rem", 
                background: "rgba(15, 23, 42, 0.4)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(51, 65, 85, 0.4)",
                borderRadius: "20px"
              }}>
                 <h3 style={{ fontSize: "1.1rem", fontWeight: 900, marginBottom: "1.5rem", color: "#f8fafc" }}>IPO Guide for Beginners</h3>
                 <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      "How to apply for an IPO?",
                      "What is Grey Market Premium (GMP)?",
                      "Mainboard vs SME IPOs",
                      "Cut-off price explained",
                      "IPO Allotment Process"
                    ].map(link => (
                      <Link key={link} href="#" style={{ 
                        fontSize: "0.9rem", 
                        color: "#94a3b8", 
                        textDecoration: "none", 
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                        borderBottom: "1px solid rgba(51, 65, 85, 0.1)",
                        transition: "all 0.2s"
                      }} className="guide-link">
                         <span>{link}</span>
                         <HelpCircle size={14} style={{ opacity: 0.5 }} />
                      </Link>
                    ))}
                 </div>
              </div>

              {/* Ad Space */}
              <div style={{ 
                background: "rgba(15, 23, 42, 0.6)", 
                border: "1px dashed rgba(51, 65, 85, 0.4)", 
                borderRadius: "20px",
                padding: "5rem 1.5rem",
                textAlign: "center",
                color: "#334155",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em"
              }}>
                ADVERTISEMENT
              </div>

              {/* Disclaimer */}
              <div style={{ 
                padding: "1.5rem", 
                background: "rgba(239, 68, 68, 0.03)",
                border: "1px solid rgba(239, 68, 68, 0.15)",
                borderRadius: "16px",
                backdropFilter: "blur(10px)"
              }}>
                 <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "#ef4444" }}>
                    <ShieldAlert size={18} />
                    <h4 style={{ fontSize: "0.9rem", margin: 0, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em" }}>Risk Warning</h4>
                 </div>
                 <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>
                   Investing in IPOs involves high risk. All financial figures and GMP data are for educational purposes. No listing gains are guaranteed. Read the RHP (Red Herring Prospectus) carefully.
                 </p>
              </div>
           </aside>

        </div>
      </div>

      <style>{`
        .btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .btn-outline {
          background: transparent;
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .btn-outline:hover {
          background: rgba(30, 41, 59, 0.5);
          color: #f1f5f9;
        }
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
