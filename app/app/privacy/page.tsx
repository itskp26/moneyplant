import type { Metadata } from "next";

import { getCommonMeta } from "@/lib/meta";

export const metadata: Metadata = getCommonMeta("Privacy Policy", "/privacy");

export default function PrivacyPage() {
  return (
    <div className="container section" style={{ maxWidth: "800px", padding: "6rem 1rem", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "2rem", fontFamily: "var(--font-sora)" }}>Privacy Policy</h1>
      <div style={{ color: "#94a3b8", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
          <p>MoneyPlant is primarily an informational platform. We do not require you to create an account to view financial data. However, if you use our calculators or interactive tools, that data is processed locally in your browser and is not stored on our servers. We use standard analytics tools (like Google Analytics) to monitor site traffic and performance.</p>
        </section>

        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>2. Use of Data</h2>
          <p>We use analytics data to understand user behavior and improve our platform's design and features. We do not sell, rent, or share your personal data with third parties for their marketing purposes.</p>
        </section>

        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>3. Cookies and Tracking</h2>
          <p>We use cookies to ensure you get the best experience on our website. This includes saving your theme preferences (dark/light mode) and keeping track of your recently viewed stocks. You can choose to disable cookies through your browser settings.</p>
        </section>

        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>4. Third-Party Services</h2>
          <p>Our market data is sourced from third-party providers (such as Yahoo Finance API). These services may have their own privacy policies regarding the data they collect. MoneyPlant is not responsible for the privacy practices of these third-party providers.</p>
        </section>
      </div>
    </div>
  );
}
