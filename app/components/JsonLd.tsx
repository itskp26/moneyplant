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
    alternateName: ["MoneyPlant24", "MoneyPlant Finance", "MoneyPlant India"],
    url: "https://moneyplant24.com",
    description:
      "World's premier live finance portal. Track S&P 500, NASDAQ, Bitcoin, BSE/NSE stocks, crypto prices, forex rates, gold prices, and global markets.",
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
      alternateName: "MoneyPlant24",
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
    "@type": "FinancialService",
    name: "MoneyPlant",
    alternateName: ["MoneyPlant24", "MoneyPlant Finance"],
    url: "https://moneyplant24.com",
    logo: "https://moneyplant24.com/logo.png",
    description:
      "MoneyPlant is a global finance portal providing live stock market data, cryptocurrency tracking, forex exchange rates, and international market benchmarks.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi", "Spanish", "French"],
    },
    areaServed: "Worldwide",
    serviceType: "Financial Market Data",
    knowsAbout: [
      "Global Stock Market",
      "S&P 500",
      "NASDAQ",
      "Cryptocurrency Tracker",
      "Forex Rates",
      "Gold Rate Live",
      "Stock Market India",
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

export function cryptoSchema(id: string, name: string, symbol: string, priceUsd: number) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `${name} (${symbol})`,
    description: `Real-time ${name} (${symbol}) cryptocurrency price, volume, market cap, and live historical charts on MoneyPlant.`,
    url: `https://moneyplant24.com/crypto/${id.toLowerCase()}`,
    provider: {
      "@type": "Organization",
      name: "MoneyPlant",
      url: "https://moneyplant24.com",
    },
    offers: {
      "@type": "Offer",
      price: priceUsd,
      priceCurrency: "USD",
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
