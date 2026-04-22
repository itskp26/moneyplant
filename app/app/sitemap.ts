import { MetadataRoute } from 'next';
import { 
  NIFTY50_STOCKS, NIFTY_NEXT50, ADANI_STOCKS, RELIANCE_STOCKS, TATA_STOCKS, 
  BAJAJ_STOCKS, MAHINDRA_STOCKS, BIRLA_STOCKS, HDFC_STOCKS, ICICI_STOCKS, 
  SBI_STOCKS, KOTAK_STOCKS, GODREJ_STOCKS, JSW_STOCKS, VEDANTA_STOCKS, 
  ITC_STOCKS, LT_STOCKS, WIPRO_STOCKS, INFOSYS_STOCKS, HCL_STOCKS, 
  MARUTI_STOCKS, PSU_STOCKS, PHARMA_STOCKS, IT_STOCKS, BANK_STOCKS, 
  AUTO_STOCKS, FMCG_STOCKS, REALTY_STOCKS, INDICES, GLOBAL_INDICES,
  CRYPTO_LIST, FOREX_PAIRS, COMMODITIES, SITE_URL 
} from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 1. CORE HUB PAGES
  const hubs = [
    '', '/stocks', '/indices', '/crypto', '/forex', '/ipo', '/markets', 
    '/markets/india', '/markets/global', '/commodities', '/news', 
    '/news/crypto', '/news/forex', '/tools', '/tools/emi-calculator', 
    '/tools/sip-calculator', '/tools/lumpsum-calculator', '/tools/tax-calculator'
  ].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  // 2. CONGLOMERATES
  const conglomerateIds = [
    'adani', 'reliance', 'tata', 'bajaj', 'mahindra', 'birla', 'godrej', 
    'hdfc', 'icici', 'itc', 'jsw', 'lt', 'sbi', 'vedanta'
  ];
  const conglomerates = conglomerateIds.map(id => ({
    url: `${SITE_URL}/conglomerates/${id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 3. TOP STOCKS SCANNER
  const topStocks = ['gainers', 'losers', 'most-active'].map(type => ({
    url: `${SITE_URL}/top-stocks/${type}`,
    lastModified,
    changeFrequency: 'always' as const,
    priority: 0.8,
  }));

  // 4. INDIVIDUAL STOCKS (Deep Indexing)
  // Collect all unique listed symbols from all groups
  const allStockGroups = [
    NIFTY50_STOCKS,
    NIFTY_NEXT50,
    ADANI_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    RELIANCE_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    TATA_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    BAJAJ_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    MAHINDRA_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    BIRLA_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    HDFC_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    ICICI_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    SBI_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    KOTAK_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    GODREJ_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    JSW_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    VEDANTA_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    ITC_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    LT_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    WIPRO_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    INFOSYS_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    HCL_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    MARUTI_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    PSU_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    PHARMA_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    IT_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    BANK_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    AUTO_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    FMCG_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
    REALTY_STOCKS.filter((s: any) => !s.unlisted).map(s => s.symbol),
  ];

  const uniqueStocks = Array.from(new Set(allStockGroups.flat()));
  const stocks = uniqueStocks.map(symbol => ({
    url: `${SITE_URL}/stocks/${symbol}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  // 5. INDIVIDUAL INDICES
  const allIndices = [...INDICES, ...GLOBAL_INDICES];
  const indices = allIndices.map(idx => ({
    url: `${SITE_URL}/indices/${idx.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // 6. INDIVIDUAL CRYPTO
  const cryptos = CRYPTO_LIST.map(coin => ({
    url: `${SITE_URL}/crypto/${coin.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // 7. INDIVIDUAL FOREX
  const forex = FOREX_PAIRS.map(pair => ({
    url: `${SITE_URL}/forex/${pair.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // 8. INDIVIDUAL COMMODITIES
  const commodities = COMMODITIES.map(comm => ({
    url: `${SITE_URL}/commodities/${comm.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [
    ...hubs,
    ...conglomerates,
    ...topStocks,
    ...stocks,
    ...indices,
    ...cryptos,
    ...forex,
    ...commodities,
  ];
}
