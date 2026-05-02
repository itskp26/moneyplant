// Manual counts based on lib files
const COUNTRIES = 250;
const INDIAN_STATES = 36;
const INDIAN_CITIES = 100;
const GLOBAL_MAJOR_CITIES = 150; // Approximated from GLOBAL_CITY_MAP

const TOTAL_LOCATIONS = 536; // 250 + 36 + 100 + 150
const TEMPLATES = 36;

// Indices in GLOBAL_MARKET_DATA
const INDEX_NAMES = 35; // Nifty, Sensex, S&P 500, etc.
const CURRENCY_TERMS = 60; // USD, GBP, EUR, etc. + "to INR" terms

console.log(`--- SEO Footprint Calculation ---`);
console.log(`Estimated Locations: ${TOTAL_LOCATIONS}`);
console.log(`Templates per Asset: ${TEMPLATES}`);

// HUB PAGES
const hubConfigs = [
  { name: "Indices Hub", assets: INDEX_NAMES + 5 },
  { name: "Forex Hub", assets: CURRENCY_TERMS + 5 },
  { name: "Crypto Hub", assets: 10 },
  { name: "Commodities Hub", assets: 8 },
  { name: "Stocks Hub", assets: 6 },
  { name: "Home", assets: 5 },
  { name: "Markets Dashboard", assets: 10 }
];

let hubTotal = 0;
console.log(`\nHub Keywords:`);
hubConfigs.forEach(h => {
  const count = h.assets * TOTAL_LOCATIONS * TEMPLATES;
  console.log(`- ${h.name}: ${count.toLocaleString()}`);
  hubTotal += count;
});

console.log(`\nTotal Hub Keywords: ${hubTotal.toLocaleString()}`);

// ASSET PAGES (Programmatic Pages)
const assetPages = [
  { type: "Stocks", count: 1000, assets: 3 }, // Top 1000 stocks
  { type: "Crypto", count: 500, assets: 3 },  // Top 500 coins
  { type: "Forex", count: 100, assets: 3 },   // Major pairs
  { type: "Indices", count: 50, assets: 3 },  // Major indices
  { type: "Commodities", count: 20, assets: 3 }
];

let assetTotal = 0;
assetPages.forEach(p => {
  assetTotal += p.count * p.assets * TOTAL_LOCATIONS * TEMPLATES;
});

console.log(`Total Asset Page Keywords: ${assetTotal.toLocaleString()}`);

console.log(`\n================================`);
console.log(`GRAND TOTAL GLOBAL KEYWORDS: ${(hubTotal + assetTotal).toLocaleString()}`);
console.log(`================================`);
