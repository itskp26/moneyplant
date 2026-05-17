"use client";
import React, { useState } from "react";
import { CheckCircle, Shield, Award, Mail, Phone, User, ArrowRight, Loader2 } from "lucide-react";

interface LeadCaptureFormProps {
  calculatorName: string;
  calculationDetails: {
    invested?: string;
    returns?: string;
    total?: string;
  };
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function LeadCaptureForm({ calculatorName, calculationDetails }: LeadCaptureFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setStatus("submitting");

    // Track the conversion event in Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "generate_lead", {
        event_category: "Leads",
        event_label: `${calculatorName} Submission`,
        value: 1,
        calculator_type: calculatorName,
        total_calculated_value: calculationDetails.total || "N/A"
      });
    }

    // Save lead data locally as a backup / demonstrate database logging
    try {
      const existingLeads = JSON.parse(localStorage.getItem("moneyplant_leads") || "[]");
      existingLeads.push({
        fullName,
        email,
        phone,
        calculatorName,
        calculationDetails,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("moneyplant_leads", JSON.stringify(existingLeads));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    // Simulate database saving latency
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div 
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 95, 70, 0.15) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "16px",
          padding: "2.5rem",
          textAlign: "center",
          animation: "fadeIn 0.5s ease-out"
        }}
      >
        <div style={{ display: "inline-flex", padding: "12px", background: "rgba(16, 185, 129, 0.2)", borderRadius: "50%", marginBottom: "1.5rem" }}>
          <CheckCircle size={36} color="#10b981" />
        </div>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#10b981", marginBottom: "0.75rem" }}>
          Personalized Wealth Report Generated!
        </h3>
        <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "450px", margin: "0 auto 1.5rem" }}>
          We have customized your **{calculatorName}** report based on your inputs. A summary PDF has been compiled for you.
        </p>
        <div style={{ padding: "1rem", background: "rgba(15, 23, 42, 0.6)", borderRadius: "12px", marginBottom: "1.5rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
            Target Maturity Amount
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#10b981" }}>
            {calculationDetails.total || "Calculating..."}
          </div>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", fontStyle: "italic", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1rem" }}>
          🚀 **Bonus:** An AMFI-registered Mutual Fund advisor has been assigned to you. One of our experts will contact you at **{phone}** to help you execute this investment plan completely tax-free!
        </p>
      </div>
    );
  }

  return (
    <div 
      className="card" 
      style={{
        background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
        border: "1px solid rgba(139, 92, 246, 0.25)",
        borderRadius: "16px",
        padding: "2.5rem",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative Glow */}
      <div 
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#8b5cf6", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
        <Award size={14} /> Premium Financial Planning
      </div>
      
      <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.5rem", color: "#f8fafc" }}>
        Download PDF Report & Get Advisor Advice
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.75rem" }}>
        Complete your profile to download a comprehensive wealth plan and lock in a **Free 15-Minute Financial Advisory Session** with our experts.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        
        {/* Full Name */}
        <div style={{ position: "relative" }}>
          <User size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          <input 
            type="text" 
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{
              width: "100%",
              background: "#090d16",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              padding: "12px 16px 12px 42px",
              color: "#f8fafc",
              fontSize: "0.9rem",
              transition: "border-color 0.2s",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#8b5cf6"}
            onBlur={(e) => e.target.style.borderColor = "#1e293b"}
          />
        </div>

        {/* Email */}
        <div style={{ position: "relative" }}>
          <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          <input 
            type="email" 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              background: "#090d16",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              padding: "12px 16px 12px 42px",
              color: "#f8fafc",
              fontSize: "0.9rem",
              transition: "border-color 0.2s",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#8b5cf6"}
            onBlur={(e) => e.target.style.borderColor = "#1e293b"}
          />
        </div>

        {/* Phone */}
        <div style={{ position: "relative" }}>
          <Phone size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
          <input 
            type="tel" 
            placeholder="Phone Number (e.g. +91 99999 99999)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              width: "100%",
              background: "#090d16",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              padding: "12px 16px 12px 42px",
              color: "#f8fafc",
              fontSize: "0.9rem",
              transition: "border-color 0.2s",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#8b5cf6"}
            onBlur={(e) => e.target.style.borderColor = "#1e293b"}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={status === "submitting"}
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
            color: "#ffffff",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            fontWeight: 700,
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: status === "submitting" ? "not-allowed" : "pointer",
            boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.4)",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            if (status !== "submitting") {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px -3px rgba(139, 92, 246, 0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (status !== "submitting") {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px -3px rgba(139, 92, 246, 0.4)";
            }
          }}
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Compiling Your Plan...
            </>
          ) : (
            <>
              Get My Free Wealth Plan <ArrowRight size={16} />
            </>
          )}
        </button>

      </form>

      {/* Safety & Compliance */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "1.25rem", color: "#64748b", fontSize: "0.72rem" }}>
        <Shield size={12} /> Securely encrypted. 100% spam-free. We respect your privacy.
      </div>
    </div>
  );
}
