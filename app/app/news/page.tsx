import type { Metadata } from "next";
import Link from "next/link";
import { 
  Newspaper, TrendingUp, Clock, Share2, 
  ExternalLink, Bookmark, Search, Filter,
  ArrowUpRight, Mail, Bell, Globe, Bitcoin, RefreshCw
} from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { fetchMarketNews } from "@/lib/news";
import NewsImage from "@/components/NewsImage";

export const metadata: Metadata = {
  title: "Financial News Hub — Live Stocks, Crypto & Forex Updates | MoneyPlant",
  description: "Stay ahead of the markets with real-time financial news, expert analysis, and global economic updates on MoneyPlant News Hub.",
};

interface Props {
  searchParams: Promise<{ cat?: string }>;
}

export default async function NewsHubPage({ searchParams }: Props) {
  const { cat = "All" } = await searchParams;
  const news = await fetchMarketNews(cat);

  const categories = ["All", "Markets", "Corporate", "Economy", "Crypto", "Forex"];

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "News", url: "/news" },
      ])} />

      <div className="container section">
        {/* Hero Section */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px", 
            color: "#10b981", 
            fontWeight: 700, 
            fontSize: "0.85rem", 
            textTransform: "uppercase", 
            marginBottom: "0.75rem",
            letterSpacing: "0.1em"
          }}>
            <div style={{ width: "20px", height: "1px", background: "#10b981" }}></div>
            Live Intelligence
          </div>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
            fontWeight: 900, 
            marginBottom: "1rem",
            letterSpacing: "-0.03em",
            lineHeight: 1.1
          }}>
            Market <span style={{ color: "rgba(255,255,255,0.4)" }}>Perspective.</span>
          </h1>
          
          {/* Category Filter */}
          <div style={{ 
             display: "flex", 
             gap: "8px", 
             overflowX: "auto", 
             paddingBottom: "1.5rem", 
             marginTop: "2rem",
             scrollbarWidth: "none"
          }}>
             {categories.map((c) => (
                <Link 
                  key={c} 
                  href={c === "All" ? "/news" : `/news?cat=${c}`}
                  style={{ 
                    background: cat === c ? "#3b82f6" : "rgba(30, 41, 59, 0.4)",
                    color: cat === c ? "white" : "#94a3b8",
                    border: "1px solid rgba(51, 65, 85, 0.5)",
                    padding: "8px 20px",
                    borderRadius: "100px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
                  }}
                >
                   {c}
                </Link>
             ))}
          </div>
        </div>

        {/* News Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "3.5rem" }} className="news-content-grid">
           
           <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {news.length > 0 ? news.map((item, i) => (
                <article 
                  key={item.id} 
                  className="card story-card" 
                  style={{ 
                    padding: 0, 
                    overflow: "hidden", 
                    display: "flex", 
                    border: "1px solid rgba(51, 65, 85, 0.3)",
                    background: "rgba(15, 23, 42, 0.3)"
                  }}
                >
                   <div style={{ width: "280px", position: "relative", flexShrink: 0 }} className="story-image-container">
                      <NewsImage 
                        src={item.image} 
                        alt={item.title} 
                        category={item.category} 
                      />
                   </div>
                   <div style={{ flex: 1, padding: "1.75rem", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                           {item.category === "Crypto" && <Bitcoin size={14} color="#f59e0b" />}
                           {item.category === "Forex" && <RefreshCw size={14} color="#3b82f6" />}
                           <span style={{ 
                             fontSize: "0.7rem", 
                             fontWeight: 800, 
                             color: item.category === "Crypto" ? "#f59e0b" : item.category === "Forex" ? "#3b82f6" : "#10b981",
                             textTransform: "uppercase" 
                           }}>{item.category}</span>
                         </div>
                         <span style={{ fontSize: "0.7rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {item.time}</span>
                      </div>
                      <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "14px", lineHeight: 1.4 }}>{item.title}</h2>
                      <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{item.desc}</p>
                      
                      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800 }}>
                            {item.author[0]}
                          </div>
                          <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>{item.author}</span>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                           <Link href={item.url} target="_blank" className="read-more-btn">
                              Read Article <ArrowUpRight size={14} />
                           </Link>
                        </div>
                      </div>
                   </div>
                </article>
              )) : (
                <div style={{ padding: "4rem", textAlign: "center", color: "#64748b" }}>
                  <Newspaper size={48} style={{ marginBottom: "1rem", opacity: 0.2 }} />
                  <p>No news items found for this category.</p>
                </div>
              )}
           </div>

           <aside style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {/* Specialized News Hubs */}
              <div className="card bento-mini" style={{ padding: "1.5rem" }}>
                 <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.25rem", color: "#f1f5f9" }}>Specialized Hubs</h3>
                 <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Link href="/news/crypto" className="hub-link" style={{ borderColor: "rgba(245, 158, 11, 0.2)" }}>
                       <div className="hub-icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}><Bitcoin size={18} /></div>
                       <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>Crypto News</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Web3 & Blockchain</div>
                       </div>
                    </Link>
                    <Link href="/news/forex" className="hub-link" style={{ borderColor: "rgba(59, 130, 246, 0.2)" }}>
                       <div className="hub-icon" style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" }}><RefreshCw size={18} /></div>
                       <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>Forex News</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>G10 & EM Pairs</div>
                       </div>
                    </Link>
                 </div>
              </div>

              {/* Hot Topics */}
              <div className="card" style={{ padding: "1.5rem" }}>
                 <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
                   <TrendingUp size={18} color="#10b981" /> Buzzing Now
                 </h3>
                 <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["#FedPivot", "#BitcoinATH", "#RupeeStability", "#AIEquity", "#GoldSurge", "#OilVolatility"].map(tag => (
                      <span key={tag} style={{ 
                        background: "rgba(30, 41, 59, 0.6)", 
                        color: "#cbd5e1", 
                        padding: "6px 12px", 
                        borderRadius: "8px", 
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: "1px solid rgba(51, 65, 85, 0.4)",
                        cursor: "pointer"
                      }} className="tag-hover">
                         {tag}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Premium Newsletter CTA */}
              <div className="card newsletter-card" style={{ 
                padding: "2.25rem", 
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(59, 130, 246, 0.3)"
              }}>
                 <div className="decor-circle"></div>
                 <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                    <div style={{ 
                      width: "48px", height: "48px", borderRadius: "12px", background: "rgba(59, 130, 246, 0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem",
                      color: "#3b82f6", border: "1px solid rgba(59, 130, 246, 0.2)"
                    }}>
                      <Mail size={24} />
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>The Daily Edge</h3>
                    <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "1.75rem", lineHeight: 1.5 }}>
                      Professional-grade market synthesis delivered to your inbox daily before markets open.
                    </p>
                    <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        style={{ background: "rgba(2, 6, 23, 0.5)", border: "1px solid rgba(51, 65, 85, 0.8)", padding: "12px 1rem", borderRadius: "8px", color: "white", fontSize: "0.9rem" }} 
                      />
                      <button className="btn btn-primary" style={{ height: "46px", background: "#3b82f6", border: "none", borderRadius: "8px", fontWeight: 700 }}>
                        Get Market Access
                      </button>
                    </div>
                 </div>
              </div>

           </aside>

        </div>
      </div>

      <style>{`
        .story-card {
           transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .story-card:hover {
           transform: translateY(-4px);
           border-color: rgba(59, 130, 246, 0.4) !important;
           box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        .story-card:hover .story-image-container img {
           transform: scale(1.05);
        }
        .story-image-container img {
           transition: transform 0.6s ease;
        }
        .image-overlay {
           position: absolute;
           inset: 0;
           background: linear-gradient(to right, transparent 0%, rgba(15,23,42,0.2) 100%);
        }
        .read-more-btn {
           display: flex;
           align-items: center;
           gap: 6px;
           color: #3b82f6;
           text-decoration: none;
           font-size: 0.85rem;
           font-weight: 700;
           padding: 6px 12px;
           border-radius: 6px;
           background: rgba(59, 130, 246, 0.1);
           transition: all 0.2s;
        }
        .read-more-btn:hover {
           background: rgba(59, 130, 246, 0.2);
           gap: 10px;
        }
        .hub-link {
           display: flex;
           align-items: center;
           gap: 12px;
           padding: 12px;
           border: 1px solid rgba(51, 65, 85, 0.3);
           border-radius: 12px;
           text-decoration: none;
           color: #f1f5f9;
           transition: all 0.2s;
        }
        .hub-link:hover {
           background: rgba(30, 41, 59, 0.4);
           transform: translateX(4px);
        }
        .hub-icon {
           width: 40px;
           height: 40px;
           border-radius: 10px;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        .tag-hover:hover {
           border-color: #3b82f6 !important;
           color: #3b82f6 !important;
        }
        .decor-circle {
           position: absolute;
           top: -50px;
           right: -50px;
           width: 150px;
           height: 150px;
           background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
           border-radius: 50%;
        }
        @media (max-width: 1200px) {
           .news-content-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
           .story-card { flex-direction: column; }
           .story-image-container { width: 100% !important; height: 200px; }
        }
      `}</style>
    </>
  );
}
