"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

interface Props {
  faqs: FAQ[];
}

function FAQItem({ faq, delay }: { faq: FAQ; delay: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      style={{
        background: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(51, 65, 85, 0.4)",
        borderRadius: "14px",
        overflow: "hidden",
        marginBottom: "0.75rem",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "1.1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <span style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "0.95rem" }}>{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: "#10b981" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              style={{
                padding: "0 1.5rem 1.5rem",
                color: "#94a3b8",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              <div style={{ paddingTop: "0.5rem", borderTop: "1px solid rgba(51, 65, 85, 0.2)" }}>
                {faq.a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HomeFAQs({ faqs }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {faqs.map((faq, idx) => (
        <FAQItem key={faq.q} faq={faq} delay={0.1 + idx * 0.1} />
      ))}
    </div>
  );
}
