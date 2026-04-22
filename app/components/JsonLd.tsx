interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Prebuilt schema generators ────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MoneyPlant",
    url: "https://moneyplant24.com",
    description:
      "India's premier live finance portal. Track Nifty 50, Sensex, BSE/NSE stocks, crypto prices in INR, forex rates, gold & silver prices, IPOs and global markets.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://moneyplant24.com/stocks/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "MoneyPlant",
      url: "https://moneyplant24.com",
      logo: {
        "@type": "ImageObject",
        url: "https://moneyplant24.com/logo.png",
        width: 200,
        height: 60,
      },
      sameAs: [
        "https://twitter.com/moneyplantindia",
        "https://www.linkedin.com/company/moneyplantindia",
      ],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MoneyPlant",
    url: "https://moneyplant24.com",
    logo: "https://moneyplant24.com/logo.png",
    description:
      "MoneyPlant is India's premier financial data and education platform providing live stock prices, crypto, forex, gold rates, and IPO tracking.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
    areaServed: "IN",
    knowsAbout: [
      "Stock Market India",
      "Nifty 50",
      "Sensex",
      "Cryptocurrency",
      "Forex",
      "Gold Rate India",
      "IPO",
      "Mutual Funds India",
    ],
  };
}

export function stockSchema(symbol: string, name: string, price: number, exchange: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${name} (${symbol})`,
    description: `${name} share price live on ${exchange}. Real-time stock price, chart, 52-week data, and fundamentals.`,
    url: `https://moneyplant24.com/stocks/${symbol.toLowerCase()}`,
    provider: {
      "@type": "Organization",
      name: "MoneyPlant",
      url: "https://moneyplant24.com",
    },
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "INR",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
