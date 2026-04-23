import type { Metadata, Viewport } from "next";
import "./globals.css";
import { baseMetadata } from "@/lib/meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TickerBar from "@/components/TickerBar";
import Script from "next/script";

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "MoneyPlant — Live Stock Market India | Nifty 50, Sensex, Crypto & Forex",
    template: "%s | MoneyPlant",
  },
  description:
    "MoneyPlant — India's premier live finance portal. Track Nifty 50, Sensex, BSE/NSE stocks, crypto prices in INR, forex rates, gold & silver prices, IPOs and global markets in real time.",
  keywords: [
    "moneyplant",
    "nifty 50 today",
    "sensex today",
    "nse live",
    "bse live",
    "stock market india",
    "share market india today",
    "live stock price india",
    "bitcoin price india",
    "crypto price inr",
    "usd to inr today",
    "gold rate today india",
    "silver rate today india",
    "forex rate india",
    "ipo today india",
    "top stocks india",
    "adani stocks",
    "reliance share price",
    "tata stocks",
    "nifty 50 live",
    "bank nifty live",
    "intraday tips india",
    "stock analysis india",
    "commodity price india",
    "crude oil price india",
    "investment india",
    "mutual fund india",
    "sip investment india",
    "top gainers today nse",
    "top losers today nse",
    "s&p 500 today",
    "nasdaq today",
    "dow jones today",
    "global stock market",
    "ethereum price india",
    "dogecoin price india",
    "top 10 stocks india",
    "best stocks 2025 india",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="category" content="Finance, Stock Market, Investment, Cryptocurrency" />
        <meta name="classification" content="Finance/Investment" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="India, Global" />
        <meta name="DC.publisher" content="MoneyPlant" />
        <meta name="DC.subject" content="Finance, Stock Market, Nifty 50, Sensex, Crypto, Forex, Gold" />
        <meta name="DC.type" content="Text" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MoneyPlant" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="news_keywords" content="Nifty 50, Sensex, BSE, NSE, stock market India, bitcoin India, forex India, gold rate India" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* AdSense placeholder — add data-ad-client when ready */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" /> */}
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-89J05EY8C9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-89J05EY8C9');
          `}
        </Script>
        <TickerBar />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
