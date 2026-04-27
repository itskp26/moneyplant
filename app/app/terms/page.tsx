import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | MoneyPlant",
  description: "Terms of Service for MoneyPlant.",
};

export default function TermsPage() {
  return (
    <div className="container section" style={{ maxWidth: "800px", padding: "6rem 1rem", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "2rem", fontFamily: "var(--font-sora)" }}>Terms of Service</h1>
      <div style={{ color: "#94a3b8", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
          <p>By accessing and using MoneyPlant (the "Website"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Website.</p>
        </section>

        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>2. Informational Purposes Only</h2>
          <p>All data, prices, indices, charts, and financial information provided on MoneyPlant are for general informational purposes only. The information does not constitute investment advice, financial advice, or trading advice. You should not make any investment decisions based solely on the information provided on this Website.</p>
        </section>

        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>3. Data Accuracy and Delays</h2>
          <p>While we strive to provide accurate and up-to-date information, market data is sourced from third-party APIs (such as Yahoo Finance) and may be delayed as specified by financial exchanges. MoneyPlant does not guarantee the accuracy, completeness, or timeliness of any data presented. We are not liable for any losses or damages arising from your reliance on the data provided.</p>
        </section>

        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>4. Third-Party Links</h2>
          <p>The Website may contain links to third-party websites or services that are not owned or controlled by MoneyPlant. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>
        </section>

        <section>
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", marginBottom: "1rem" }}>5. Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. We will indicate the date of the latest revision at the top of this page. Your continued use of the Website after any changes constitutes acceptance of the new Terms.</p>
        </section>
      </div>
    </div>
  );
}
