import { Country, State, City } from "country-state-city";

function y() { return new Date().getFullYear(); }
function yn() { return new Date().getFullYear() + 1; }

// Helper for caching the locations so we don't recalculate on every request
let cachedLocations: string[] | null = null;

function getGlobalLocations(): string[] {
  if (cachedLocations) return cachedLocations;

  const locations = new Set<string>();

  // 1. PRIORITY GLOBAL FINANCIAL HUBS (Added first to ensure they are never sliced out)
  const priorityGlobal = [
    "london", "new york", "dubai", "tokyo", "paris", "frankfurt", "hong kong", "sydney",
    "singapore", "shanghai", "beijing", "toronto", "zurich", "san francisco", "chicago",
    "boston", "seoul", "amsterdam", "los angeles", "geneva", "washington dc", "riyadh",
    "doha", "abu dhabi", "kuwait city", "manama", "muscat", "jakarta", "kuala lumpur",
    "bangkok", "manila", "ho chi minh city", "hanoi", "taipei", "melbourne", "auckland",
    "sao paulo", "buenos aires", "mexico city", "santiago", "bogota", "lima", "cape town",
    "johannesburg", "cairo", "nairobi", "lagos", "casablanca", "tel aviv", "istanbul",
    "moscow", "warsaw", "prague", "budapest", "vienna", "milan", "rome", "madrid",
    "barcelona", "lisbon", "dublin", "stockholm", "copenhagen", "oslo", "helsinki",
    "brussels", "luxembourg", "munich", "berlin", "hamburg", "edinburgh"
  ];
  priorityGlobal.forEach(c => locations.add(c.toLowerCase()));

  // 2. PRIORITY INDIAN CITIES (Added next)
  const priorityIndian = ["mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad", "chennai", "kolkata", "surat", "pune", "jaipur"];
  priorityIndian.forEach(c => locations.add(c.toLowerCase()));

  // 3. ALL Countries
  const allCountries = Country.getAllCountries();
  for (const c of allCountries) {
    locations.add(c.name.toLowerCase());
  }

  // 4. All States in India
  const indiaStates = State.getStatesOfCountry("IN");
  for (const s of indiaStates) {
    locations.add(s.name.toLowerCase());
  }

  // 5. EXHAUSTIVE INDIAN CITIES (Full List Restored)
  const exhaustiveIndianCities = [
    "lucknow", "kanpur", "nagpur", "indore", "thane", "bhopal", "visakhapatnam", "pimpri-chinchwad", "patna", "vadodara", "ghaziabad",
    "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "kalyan-dombivli", "vasai-virar", "varanasi", "srinagar", "aurangabad", 
    "dhanbad", "amritsar", "navi mumbai", "allahabad", "howrah", "ranchi", "gwalior", "jabalpur", "coimbatore", "vijayawada", "jodhpur", 
    "madurai", "raipur", "kota", "guwahati", "chandigarh", "solapur", "hubli-dharwad", "bareilly", "moradabad", "mysore", "gurgaon", 
    "aligarh", "jalandhar", "tiruchirappalli", "bhubaneswar", "salem", "mira-bhayandar", "warangal", "thiruvananthapuram", "guntur", 
    "bhiwandi", "saharanpur", "gorakhpur", "bikaner", "amravati", "noida", "jamshedpur", "bhilai", "cuttack", "firozabad", "kochi",
    "bhavnagar", "dehradun", "durgapur", "asansol", "nanded", "kolhapur", "ajmer", "gulbarga", "jamnagar", "ujjain", "loni", "siliguri", 
    "jhansi", "ulhasnagar", "nellore", "jammu", "sangli-miraj", "belgaum", "mangalore", "ambattur", "tirunelveli", "malegaon", "gaya", 
    "jalgaon", "udaipur", "maheshtala", "davangere", "kozhikode", "kurnool", "rajpur sonarpur", "rajahmundry", "bokaro", "south dumdum", 
    "bellary", "patiala", "gopalpur", "agartala", "bhagalpur", "muzaffarnagar", "bhatpara", "panihati", "latur", "dhule", "tirupati", 
    "rohtak", "korba", "bhilwara", "berhampur", "muzaffarpur", "ahmednagar", "mathura", "kollam", "avadi", "kadapa", "kamarhati",
    "sambalpur", "bilaspur", "shahjahanpur", "satara", "bijapur", "rampur", "shivamogga", "chandrapur", "junagadh", "thrissur", "alwar", 
    "bardhaman", "kulti", "kakinada", "nizamabad", "parbhani", "tumkur", "khammam", "uzhavarkarai", "bihar sharif", "panipat", "darbhanga", 
    "bally", "aizawl", "dewas", "ichalkaranji", "karnal", "bathinda", "jalna", "eluru", "barasat", "kirari suleman nagar", "purnia",
    "satna", "mau", "sonipat", "farrukhabad", "sagar", "rourkela", "durg", "imphal", "ratlam", "hapur", "arrah", "karimnagar", "anantapur", 
    "etawah", "ambernath", "bharatpur", "begusarai", "new delhi", "gandhinagar", "barmer", "sikar", "cleveland", "pali", "vapi", "navsari", 
    "morbi", "bhuj", "gandhidham", "porbandar", "godhra", "bharuch", "anand", "nadiad", "surendranagar", "valsad"
  ];
  exhaustiveIndianCities.forEach(c => locations.add(c.toLowerCase()));

  // 5. Broad Global Regions (like 'europe', 'asia')
  const regions = ["europe", "asia", "africa", "north america", "south america", "middle east"];
  for (const r of regions) {
    locations.add(r);
  }

  cachedLocations = Array.from(locations).filter(Boolean);
  return cachedLocations;
}

// Separate helper for India-only locations (useful for India-specific assets)
function getIndiaLocations(): string[] {
  const locations = new Set<string>();
  locations.add("india");

  // All States in India
  const indiaStates = State.getStatesOfCountry("IN");
  for (const s of indiaStates) {
    locations.add(s.name.toLowerCase());
  }

  // Top Major Indian Cities
  const topIndianCities = [
    "mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad", "chennai", "kolkata",
    "surat", "pune", "jaipur", "lucknow", "kanpur", "nagpur", "indore", "thane",
    "bhopal", "visakhapatnam", "pimpri-chinchwad", "patna", "vadodara", "ghaziabad",
    "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "kalyan-dombivli",
    "vasai-virar", "varanasi", "srinagar", "aurangabad", "dhanbad", "amritsar",
    "navi mumbai", "allahabad", "howrah", "ranchi", "gwalior", "jabalpur", "coimbatore",
    "vijayawada", "jodhpur", "madurai", "raipur", "kota", "guwahati", "chandigarh",
    "solapur", "hubli-dharwad", "bareilly", "moradabad", "mysore", "gurgaon", "aligarh",
    "jalandhar", "tiruchirappalli", "bhubaneswar", "salem", "mira-bhayandar", "warangal",
    "thiruvananthapuram", "guntur", "bhiwandi", "saharanpur", "gorakhpur", "bikaner",
    "amravati", "noida", "jamshedpur", "bhilai", "cuttack", "firozabad", "kochi",
    "bhavnagar", "dehradun", "durgapur", "asansol", "nanded", "kolhapur", "ajmer",
    "gulbarga", "jamnagar", "ujjain", "loni", "siliguri", "jhansi", "ulhasnagar",
    "nellore", "jammu", "sangli-miraj", "belgaum", "mangalore", "ambattur", "tirunelveli",
    "malegaon", "gaya", "jalgaon", "udaipur", "maheshtala", "davangere", "kozhikode",
    "kurnool", "rajpur sonarpur", "rajahmundry", "bokaro", "south dumdum", "bellary",
    "patiala", "gopalpur", "agartala", "bhagalpur", "muzaffarnagar", "bhatpara",
    "panihati", "latur", "dhule", "tirupati", "rohtak", "korba", "bhilwara", "berhampur",
    "muzaffarpur", "ahmednagar", "mathura", "kollam", "avadi", "kadapa", "kamarhati",
    "sambalpur", "bilaspur", "shahjahanpur", "satara", "bijapur", "rampur", "shivamogga",
    "chandrapur", "junagadh", "thrissur", "alwar", "bardhaman", "kulti", "kakinada",
    "nizamabad", "parbhani", "tumkur", "khammam", "uzhavarkarai", "bihar sharif",
    "panipat", "darbhanga", "bally", "aizawl", "dewas", "ichalkaranji", "karnal",
    "bathinda", "jalna", "eluru", "barasat", "kirari suleman nagar", "purnia",
    "satna", "mau", "sonipat", "farrukhabad", "sagar", "rourkela", "durg", "imphal",
    "ratlam", "hapur", "arrah", "karimnagar", "anantapur", "etawah", "ambernath",
    "bharatpur", "begusarai", "new delhi", "gandhinagar", "barmer", "sikar", "cleveland",
    "pali", "vapi", "navsari", "morbi", "bhuj", "gandhidham", "porbandar", "godhra",
    "bharuch", "anand", "nadiad", "surendranagar", "valsad"
  ];
  for (const city of topIndianCities) {
    locations.add(city.toLowerCase());
  }

  return Array.from(locations).filter(Boolean);
}

// Ensure unique keywords
function unique(list: string[]) {
  return [...new Set(list.map((s) => s.trim().toLowerCase()).filter(Boolean))];
}

const TEMPLATES = [
  "price {asset} in {location}",
  "todays {asset} price {location}",
  "{asset} price in {location}",
  "{asset} rate {location} today",
  "{asset} price {location} today",
  "best {asset} price in {location}",
  "live {asset} price {location}",
  "current {asset} rate in {location}",
  "{asset} value {location} live",
  "{location} {asset} price update",
  "best place to track {asset} in {location}",
  "{asset} investment guide {location}",
  "{asset} trading in {location} today",
  "real time {asset} rate {location}",
  "market price of {asset} in {location}",
  "{location} {asset} exchange rates",
  "{asset} historical prices {location}",
  "compare {asset} price in {location}",
  "is {asset} price high in {location} today",
  "local {asset} price {location}",
  "{asset} trends in {location}",
  "{asset} analysis for {location} investors",
  "how much is {asset} in {location}",
  "top {asset} rates in {location}",
  "{location} financial hub {asset} data",
  "buy {asset} in {location} at best price",
  "sell {asset} in {location} today",
  "{asset} price benchmark {location}",
  "official {asset} rate in {location}",
  "{location} {asset} market status",
  "accurate {asset} price {location}",
  "lowest {asset} price in {location} today",
  "highest {asset} price in {location} today",
  "world market {asset} price in {location}",
  "{asset} cost in {location} today",
  "latest {asset} quotes {location}"
];

/**
 * Builds LLM-style long-tail keywords for an asset combined with global locations.
 * @param baseAsset The core asset name (e.g. "bitcoin", "gold", "usd to inr")
 */
export function buildGlobalSeoKeywords(baseAsset: string, locationCount: number = 300, templateCount: number = 5): string[] {
  const locations = getGlobalLocations().slice(0, locationCount);
  const templates = TEMPLATES.slice(0, templateCount);
  const keywords: string[] = [];
  const asset = baseAsset.toLowerCase();

  for (const location of locations) {
    for (const template of templates) {
      keywords.push(template.replace(/{asset}/g, asset).replace(/{location}/g, location));
    }
  }

  return unique(keywords);
}

/**
 * Combines existing keywords with the newly generated location-based keywords.
 * Uses a tiered approach to prevent 'Single item size exceeds maxSize' errors while maintaining high reach.
 */
export function mixWithGlobalKeywords(existing: string[], assetNames: string[]): string {
  let combined = [...existing];
  
  // TIER 1: Top 5 assets get global coverage (All locations, Top 8 templates)
  // This produces 5 * 300 * 8 = 12,000 keywords (~480KB)
  const tier1 = assetNames.slice(0, 5);
  for (const asset of tier1) {
    combined = combined.concat(buildGlobalSeoKeywords(asset, 300, 8));
  }

  // TIER 2: Next 10 assets get moderate coverage (Top 50 locations, Top 3 templates)
  // This produces 10 * 50 * 3 = 1,500 keywords (~60KB)
  const tier2 = assetNames.slice(5, 15);
  for (const asset of tier2) {
    combined = combined.concat(buildGlobalSeoKeywords(asset, 50, 3));
  }

  // TIER 3: Remaining assets get basic coverage (Just name and price)
  const tier3 = assetNames.slice(15);
  for (const asset of tier3) {
    combined.push(asset, `${asset} price`, `${asset} live`, `${asset} rate today`);
  }

  // FINAL SAFETY CAP: We cap at 50,000 chars.
  // This resolves Vercel edge network limits (403/404) once and for all.
  // 50KB is still 1,000+ high-quality keywords, ensuring extreme SEO performance.
  const joined = unique(combined).join(", ");
  if (joined.length > 50000) {
    return joined.substring(0, 50000);
  }
  return joined;
}

export const GLOBAL_MARKET_DATA = [
  { country: "usa", indices: ["s&p 500", "dow jones", "nasdaq", "nyse"], currency: "usd" },
  { country: "uk", indices: ["ftse 100"], currency: "gbp", currencyName: "pound" },
  { country: "uae", indices: ["dfm", "adx"], currency: "aed", currencyName: "dirham" },
  { country: "saudi arabia", indices: ["tadawul", "tasi index"], currency: "sar", currencyName: "riyal" },
  { country: "kuwait", indices: [], currency: "kwd" },
  { country: "qatar", indices: [], currency: "qar" },
  { country: "bahrain", indices: [], currency: "bhd" },
  { country: "oman", indices: [], currency: "omr" },
  { country: "pakistan", indices: ["kse 100", "psx"], currency: "pkr" },
  { country: "bangladesh", indices: ["dse", "cse dhaka"], currency: "bdt" },
  { country: "singapore", indices: ["sti index", "sgx"], currency: "sgd" },
  { country: "australia", indices: ["asx 200", "asx"], currency: "aud" },
  { country: "canada", indices: ["tsx", "s&p tsx"], currency: "cad" },
  { country: "europe", indices: ["dax", "cac 40", "ftse"], currency: "eur", currencyName: "euro" },
  { country: "japan", indices: ["nikkei 225", "topix"], currency: "jpy" },
  { country: "china", indices: ["shanghai index", "hang seng"], currency: "cny" },
  { country: "korea", indices: ["kospi", "kosdaq"], currency: "krw" },
  { country: "malaysia", indices: ["klci"], currency: "myr" },
  { country: "indonesia", indices: ["jci"], currency: "idr" },
  { country: "philippines", indices: ["pse index"], currency: "php" },
  { country: "thailand", indices: ["set index"], currency: "thb" },
  { country: "vietnam", indices: ["vni index"], currency: "vnd" },
  { country: "nigeria", indices: ["ngx"], currency: "ngn" },
  { country: "south africa", indices: ["jse"], currency: "zar" },
  { country: "kenya", indices: ["nse kenya"], currency: "kes" },
  { country: "egypt", indices: ["egx"], currency: "egp" },
  { country: "brazil", indices: ["bovespa", "b3"], currency: "brl" },
  { country: "mexico", indices: ["ipc index"], currency: "mxn" },
  { country: "argentina", indices: ["merval"], currency: "ars" },
];

/**
 * Returns all major international indices from the global market data.
 */
export function getGlobalIndexNames(): string[] {
  const indices = new Set<string>();
  GLOBAL_MARKET_DATA.forEach(m => m.indices.forEach(idx => indices.add(idx)));
  return Array.from(indices);
}

/**
 * Returns all currency codes and names from the global market data for forex targeting.
 */
export function getGlobalCurrencyTerms(): string[] {
  const terms = new Set<string>();
  GLOBAL_MARKET_DATA.forEach(m => {
    if (m.currency) {
      terms.add(m.currency);
      terms.add(`${m.currency} to INR`);
      terms.add(`${m.currency} to USD`);
    }
    if (m.currencyName) {
      terms.add(m.currencyName);
      terms.add(`${m.currencyName} to Rupee`);
    }
  });
  return Array.from(terms);
}

export function buildDynamicGlobalMarkets(): string[] {
  const keywords: string[] = [];
  
  // 1. Generate the highly specific index/currency terms
  for (const market of GLOBAL_MARKET_DATA) {
    keywords.push(`stock market ${market.country} today`);
    if (market.indices.length > 0) {
      market.indices.forEach(idx => keywords.push(`${idx} today`, `${idx} live`));
    }
    keywords.push(`bitcoin price ${market.country}`);
    keywords.push(`bitcoin price ${market.country} today`);
    keywords.push(`gold price ${market.country} today`);
    keywords.push(`gold rate ${market.country} today`);
    
    if (market.currency) {
      keywords.push(`${market.currency} to inr today`, `${market.currency} to usd today`);
    }
    if (market.currencyName) {
      keywords.push(`${market.currencyName} rate today`);
    }
  }

  // 2. Enhance with generic location templates across ALL locations (cities, states, countries)
  const locations = getGlobalLocations();
  for (const loc of locations) {
    keywords.push(
      `stock market ${loc} today`,
      `${loc} market live`,
      `${loc} shares live today`,
      `bitcoin price ${loc} today`,
      `gold price in ${loc} today`,
      `gold rate ${loc} today`,
      `best stocks to buy in ${loc}`,
      `dollar rate today ${loc}`,
      `${loc} stock exchange live`,
      `trading in ${loc} today`,
      `${loc} financial news`,
      `investing in ${loc} markets`,
      `${loc} index rate today`,
      `live ${loc} market terminal`,
      `${loc} economic updates`,
      `share price in ${loc} today`,
      `crypto rates in ${loc}`,
      `silver price ${loc} today`,
      `commodity market ${loc}`,
      `forex rate ${loc} today`,
      `currency converter ${loc}`,
      `exchange rate in ${loc}`,
      `top gainers in ${loc} today`,
      `top losers in ${loc} today`,
      `market cap of ${loc} stocks`,
      `is it good to invest in ${loc} today`,
      `how to buy stocks in ${loc}`,
      `best investment in ${loc} ${y()}`,
      `${loc} finance portal`,
      `${loc} market opening time`,
      `${loc} market closing time`
    );
  }

  return unique(keywords);
}

/**
 * Builds the massive dynamic block for the homepage by cross-referencing
 * intent-based templates with Indian and Global locations.
 */
export function buildDynamicHomeMetaKeywords(y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();

  // GROUP 1: India-centric stock market queries
  const indiaStockBases = [
    "nifty 50 today", "nifty 50 live price", "nifty today", "nifty 50 price today",
    "sensex today", "sensex live", "bse sensex today", "stock market today",
    "nse live", "bse live", "share market today", "top 10 stocks",
    "top 10 stocks nse today", "best stocks to buy today", "nifty 50 stocks list",
    "stock market opening today", "stock market news", "market today",
    "stock price today", "best shares to buy today", "where to invest money",
    "mutual funds", "live market data", "top gainers nse today",
    "top losers nse today", "most active stocks", "52 week high stocks",
    "52 week low stocks", "market cap", "stock market index",
    "nifty bank today", "bank nifty live", "nifty it today", "nifty pharma today",
    "nifty auto today", "nifty fmcg", "nifty metal", "nifty real estate",
    "smallcap stocks", "midcap stocks", "large cap stocks",
    "blue chip stocks", "penny stocks", "stock tips",
    "zerodha market watch", "groww market", "moneycontrol live",
    "economic times markets", "screener.in stocks", "trading today",
    "intraday stocks today", "swing trading", "value investing",
    "rakesh jhunjhunwala portfolio", "warren buffett stocks",
    "FII DII data today", "foreign institutional investors",
    `top 20 stocks ${y}`, `top 20 stocks to buy ${y}`,
    `best 20 stocks ${y}`, `top 20 stocks nse ${y}`, `top 20 stocks bse ${y}`,
    `top 20 stocks ${yn}`, `best stocks to invest ${y}`, `top stocks ${y}`,
    `multibagger stocks ${y}`, `best performing stocks ${y}`, `stocks to watch ${y}`,
    `best investment ${y}`, `where to invest in ${y}`, `stock picks ${y}`,
    `top 20 gainers ${y}`, `top 20 losers ${y}`, `most active stocks ${y}`,
    "52 week high stocks list today", "52 week high stocks list nse bse",
    "stocks hitting 52 week high today", "breakout stocks today",
    "stocks at all time high today", "which stocks are up today",
    "which stocks are down today", "stocks to buy today nse",
    "stocks to avoid today", "best intraday stock today",
    "pre market gainers", "after hours movers",
    "what is happening in stock market today", "why market is up today",
    "why market is down today", "market crash today",
    "today stock market news", "market rally today",
    "real time market rates", "financial dashboard",
    "market overview today", "fear and greed index",
    "inflation rate today", "commodity prices today",
    "investment tracker", "portfolio tracker",
    "ipo today", "upcoming ipo 2025"
  ];

  for (const loc of indiaLocs) {
    for (const base of indiaStockBases) {
      keywords.push(
        `${base} ${loc}`,
        `${loc} ${base}`,
        `${base} in ${loc}`,
        `best ${base} in ${loc}`,
        `live ${base} ${loc} news`,
        `how to track ${base} in ${loc}`,
        `real time ${base} ${loc}`,
        `current ${base} ${loc} today`,
        `${loc} market update ${base}`,
        `${base} terminal ${loc}`
      );
    }
  }

  // GROUP 2: Global Assets (Crypto, Forex, Gold, Silver, Oil) against ALL locations
  // We'll use the existing `buildGlobalSeoKeywords` internally for base assets.
  const globalAssets = [
    "bitcoin", "crypto", "ethereum", "usd to inr", "dollar",
    "gold", "silver", "crude oil", "forex", "currency"
  ];
  
  for (const asset of globalAssets) {
    // This calls the other function which maps against getGlobalLocations()
    keywords.push(...buildGlobalSeoKeywords(asset));
  }

  // Inject some specific static ones the user explicitly had that don't fit templates well
  keywords.push(
    "bitcoin price in rupees", "btc price inr",
    `dow jones vs nifty ${y}`, `nasdaq vs sensex ${y}`,
    "india vs us stock market today", "emerging markets today",
    "nifty 50 vs s&p 500", "global market impact india today",
    "world stock market live", "global financial news today",
    "world economy today", "global recession news", "world market hours today",
    "international finance news", "world currency rates today",
    "global investment news today", "world markets live today",
    `world finance ${y}`, `global investment ${y}`,
    `top 20 stocks world ${y}`, `best global assets ${y}`
  );

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for commodities (Gold, Silver, etc.)
 */
export function buildDynamicCommodityKeywords(commodity: string, y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();
  const globalLocs = getGlobalLocations();

  const c = commodity.toLowerCase();

  const baseTermsMap: Record<string, string[]> = {
    gold: [
      "gold rate", "gold price", "24k gold price", "22k gold price", "18k gold price",
      "gold price per gram", "gold price 10 gram", "mcx gold price", "gold etf",
      "sovereign gold bond", "digital gold", "gold futures", "gold import",
      "gold price history", "international gold price", "today gold rate 22 carat",
      "today gold rate 24 carat", "1 tola gold price", "gold jewellery rate",
      "is gold good investment", "gold price this week", "gold 1 week price",
      "gold price last 7 days", "gold weekly price change", "gold weekly gain",
      "gold weekly loss", "gold price increase this week", "gold price decrease this week",
      "how much gold changed this week", "gold price 7 days chart",
      "gold price 30 days chart", "gold price 1 month change", "gold monthly performance",
      "gold vs last week", "gold price last month", "gold price last year vs today",
      "gold price 1 year change", "gold price 5 year chart", "gold price 10 year chart",
      "gold price dubai", "gold rate uae", "gold price london", "gold price usa",
      "gold price america", "gold price saudi arabia", "gold price pakistan",
      "gold price qatar", "gold price kuwait", "gold price singapore",
      "gold price hong kong", "international gold price today", "spot gold price",
      "gold bullion price", "gold bar price", "gold coin price", "gold futures comex",
      "gold price per ounce", "gold price per troy ounce", "gold price prediction",
      "gold investment", "top 20 gold stocks", "gold stocks", "gold etf returns",
      "sovereign gold bond returns", "best gold etf", "gold vs equity", "gold vs fd",
      "is gold good to buy", "gold rate", "gold price", "gold forecast",
      "why gold price rising", "why gold price falling", "should i buy gold today",
      "is now good time to buy gold", "gold rate prediction tomorrow",
      "gold rate next week", "gold price on monday", "gold market holiday today",
      "gold price vs inflation", "gold vs bitcoin", "gold vs silver price",
      "gold silver ratio", "hallmark gold price today", "bis hallmark gold rate",
      "22 carat vs 24 carat gold difference", "making charges gold jewellery",
      "sgb vs gold etf vs digital gold", "sone ka bhav aaj", "aaj ka sone ka rate",
      "sone ki kimat aaj", "gold karo becho aaj ka rate", "gold price news"
    ],
    silver: [
      "silver rate", "silver price", "silver price per kg", "silver price per gram",
      "mcx silver price", "silver futures", "999 silver price", "silver bar price",
      "silver coin price", "silver jewellery rate", "silver etf", "investment silver",
      "silver price this week", "silver 1 week price", "silver price last 7 days",
      "silver weekly price change", "silver weekly gain", "silver weekly loss",
      "how much did silver change this week", "silver 7 days chart",
      "silver 30 days chart", "silver 1 month change", "silver monthly performance",
      "silver price last year vs today", "silver price 1 year change",
      "silver price 5 year chart", "silver 10 year history", "silver price in dubai",
      "silver price usd today", "silver price in uae", "silver price london today",
      "silver price usa", "silver spot price today", "silver bullion price",
      "silver price per ounce", "silver vs gold ratio today", "gold silver ratio live",
      "comex silver price today", "silver futures comex", "lme silver price",
      "silver price prediction", "silver rate", "silver etf returns", "best silver etf",
      "silver vs gold", "silver investment", "is silver good to buy", "silver price",
      "silver forecast", "why silver price rising today", "why silver price falling today",
      "should i buy silver today", "silver vs gold which is better", "chandi ka bhav aaj",
      "aaj ka chandi ka rate", "solar panel silver demand", "ev silver demand",
      "industrial silver demand"
    ],
    "crude-oil": [
      "crude oil price", "crude oil rate", "wti crude oil price", "brent crude oil price",
      "mcx crude oil price", "oil barrel price today", "petroleum price",
      "crude oil futures", "opec", "crude oil chart", "petrol price vs crude oil",
      "crude oil news", "oil price this week", "oil price 1 week change",
      "crude oil weekly price", "oil price weekly gain loss", "crude oil 7 day chart",
      "oil price last 7 days", "oil price 1 month change", "crude oil monthly performance",
      "brent crude weekly", "wti weekly price change", "crude oil price prediction",
      "oil price forecast", "crude oil price", "oil price outlook", "opec news",
      "why oil price rising today", "why crude oil falling today",
      "petrol diesel price tomorrow", "opec production cut today",
      "oil price vs rupee today", "crude oil russia ukraine", "iran oil ban news",
      "natural gas price today", "natural gas weekly price change",
      "carbon credit price", "renewables vs crude oil trend"
    ],
    platinum: [
      "platinum rate", "platinum price", "platinum price per gram",
      "platinum vs gold price", "platinum jewellery", "platinum investment",
      "platinum price", "platinum weekly price change", "platinum 1 week performance",
      "palladium price today", "platinum etf"
    ],
    aluminum: [
      "aluminum price", "aluminum rate", "mcx aluminum", "aluminum price per kg",
      "lme aluminum price today", "aluminum futures", "aluminum scrap price",
      "aluminum alloys price", "industrial aluminum demand", "aluminum inventory lme"
    ],
    zinc: [
      "zinc price", "zinc rate", "mcx zinc price", "zinc price per kg",
      "lme zinc price today", "zinc futures", "zinc galvanizing demand",
      "zinc smelting news", "zinc global production"
    ],
    lead: [
      "lead price", "lead rate", "mcx lead price", "lead price per kg",
      "lme lead price today", "lead futures", "battery lead price",
      "lead recycling market", "lead inventory lme"
    ],
    nickel: [
      "nickel price", "nickel rate", "mcx nickel price", "nickel price per kg",
      "lme nickel price today", "nickel futures", "ev battery nickel demand",
      "stainless steel nickel price", "nickel supply news"
    ],
    "natural-gas": [
      "natural gas price", "natural gas rate", "mcx natural gas", "natural gas price today",
      "nymex natural gas", "natural gas futures", "natural gas inventory report",
      "natural gas news", "lng price today", "natural gas demand"
    ],
    "brent-oil": [
      "brent crude price", "brent oil rate", "international oil benchmark",
      "brent vs wti price", "brent oil news", "north sea oil price",
      "brent crude futures", "global oil prices today"
    ],
    cotton: [
      "cotton price", "cotton rate", "mcx cotton", "cotton price per bale",
      "ice cotton price today", "cotton futures", "cotton harvest news india",
      "textile industry cotton demand", "shankar 6 cotton price"
    ],
    cpo: [
      "cpo price", "crude palm oil rate", "mcx cpo price", "bmd palm oil today",
      "palm oil price per 10kg", "cpo futures", "edible oil prices india",
      "malaysia palm oil news"
    ],
    rubber: [
      "rubber price", "rubber rate", "mcx rubber price", "rubber price per kg",
      "jpx rubber price today", "natural rubber price", "rss4 rubber price india",
      "tyre industry rubber demand"
    ],
    copper: [
      "copper price", "copper rate", "mcx copper price", "copper price per kg",
      "lme copper price today", "copper futures", "copper scrap price",
      "copper cable demand", "dr copper economic indicator"
    ]
  };

  const bases = baseTermsMap[c] || [c, `${c} price`, `${c} rate`];

  // Map against Indian locations
  for (const loc of indiaLocs) {
    for (const base of bases) {
      keywords.push(
        `${base} today ${loc}`,
        `${loc} ${base} today`,
        `${base} ${loc}`,
        `live ${base} rate in ${loc}`,
        `current ${base} price ${loc}`,
        `${loc} ${base} market news`,
        `best place to buy ${base} in ${loc}`,
        `${base} price chart ${loc}`,
        `${base} rate history ${loc}`,
        `${base} market ${loc} live`,
        `is ${base} cheap in ${loc}`,
        `where to sell ${base} in ${loc}`,
        `${base} price per tola ${loc}`,
        `${base} price per gram ${loc}`,
        `hallmark ${base} in ${loc}`,
        `bis certified ${base} ${loc}`,
        `${loc} ${base} price prediction`,
        `${base} rate tomorrow in ${loc}`,
        `lowest ${base} rate ${loc}`,
        `highest ${base} rate ${loc}`
      );
    }
  }

  // Map against Global locations (if it's not a highly localized term)
  for (const loc of globalLocs) {
    for (const base of bases) {
      keywords.push(
        `${base} in ${loc}`,
        `${loc} ${base} price`,
        `${loc} ${base} rate today`,
        `live ${base} market ${loc}`,
        `${base} updates ${loc}`,
        `global ${base} price ${loc}`,
        `international ${base} rate in ${loc}`,
        `${loc} ${base} investment guide`,
        `trading ${base} in ${loc}`,
        `${base} market hours ${loc}`
      );
    }
  }

  // Dynamic year-based
  for (const base of bases) {
    keywords.push(`${base} ${y}`, `${base} forecast ${y}`, `${base} outlook ${yn}`);
  }

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for Top Stocks (Gainers, Losers, Active)
 */
export function buildDynamicTopStocksKeywords(type: string, y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();

  const baseTermsMap: Record<string, string[]> = {
    gainers: [
      "top gainers", "nse top gainers", "bse top gainers", "best stocks today",
      "stocks up today", "top gainers nse bse", "biggest gainers today",
      "stocks rising today", "top performing stocks", "best stocks to trade today",
      "top 20 gainers today", "top 20 stocks nse", "top 20 gainers nse",
      "top 20 stocks india", "top gainers india", "top gainers this week",
      "top gainers 1 week nse", "weekly top gainers", "stocks with highest gain this week",
      "top gainers last 7 days nse", "top gainers this month", "monthly top gainers nse bse",
      "52 week high stocks today", "stocks hitting new high today", "breakout stocks today",
      "upper circuit stocks today", "stocks with huge volume today",
      "institutional buying stocks today", "fii bought stocks today",
      "delivery based gainers today", "which stocks are best today", "stocks rallying today",
      "top 20 stocks to buy", "best 20 stocks"
    ],
    losers: [
      "top losers", "nse top losers", "bse top losers", "stocks down today",
      "falling stocks india", "biggest losers today", "stocks declining today",
      "worst performing stocks india", "stocks to avoid today", "bearish stocks india",
      "top 20 losers today", "top 20 falling stocks", "top losers india",
      "top losers this week", "weekly top losers", "stocks losing this week",
      "stocks with largest decline this week", "top losers last 7 days",
      "top losers this month", "monthly losers nse bse", "52 week low stocks today",
      "stocks hitting new lows today", "lower circuit stocks today", "stocks crashing today",
      "why stock price falling today", "stocks to short today", "which stocks to sell today",
      "fii selling stocks today", "top 20 stocks to avoid", "worst 20 stocks"
    ],
    "most-active": [
      "most active stocks", "high volume stocks", "most traded stocks nse",
      "highest volume stocks bse", "most active stocks nse today", "stocks with high volume",
      "institutional activity stocks", "breakout stocks", "intraday stocks high volume",
      "top 20 most active stocks", "top 20 volume stocks nse", "most active stocks india",
      "most active stocks this week", "weekly volume leaders nse",
      "highest traded stocks this week", "top volume stocks last 7 days",
      "operator stocks today", "bulk deals nse today", "block deals bse today",
      "delivery percentage stocks today", "fno stocks with high oi today",
      "options chain high oi stocks", "open interest analysis today",
      "top 20 active stocks", "most traded"
    ]
  };

  const bases = baseTermsMap[type] || [type, `top ${type} stocks`];

  for (const loc of indiaLocs) {
    for (const base of bases) {
      keywords.push(
        `${base} in ${loc}`,
        `${loc} ${base} today`,
        `${base} today ${loc}`,
        `live ${base} list in ${loc}`,
        `${loc} stock market ${base}`,
        `trading ${base} today ${loc}`,
        `${base} shares in ${loc} today`,
        `${loc} market ${base} news`,
        `best ${base} to buy in ${loc}`,
        `how to pick ${base} in ${loc}`,
        `${base} signals ${loc}`,
        `intraday ${base} for ${loc} traders`
      );
    }
  }

  // Dynamic year-based
  for (const base of bases) {
    keywords.push(`${base} ${y}`, `${base} list ${y}`, `${base} ${yn}`);
  }

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for IPOs
 */
export function buildDynamicIpoKeywords(y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();

  const ipoBases = [
    "ipo today", "upcoming ipo", "new ipo", "ipo list", "ipo open today",
    "ipo subscription today", "ipo allotment status", "ipo listing today",
    "nse ipo", "bse ipo", "ipo gmp today", "grey market premium ipo",
    "ipo review", "best ipo to apply", "sme ipo", "mainboard ipo", "ipo price band",
    "ipo lot size", "ipo allotment date", "ipo listing date", "ipo profit",
    "how to apply ipo zerodha", "how to apply ipo groww", "ipo status check",
    "ipo registrar status", "ipo news today", "upcoming ipo next week",
    "top ipo", "ipo returns", "ipo calendar", "ipo pipeline", "ipo this week",
    "ipo next week", "ipo this month", "ipo grey market premium today live",
    "ipo gmp list today", "which ipo to apply this week", "best ipo to buy today",
    "ipo allotment chances how to increase", "ipo cutoff price meaning",
    "ipo hni qib retail subscription today", "ipo anchor allotment",
    "should i apply ipo today", "ipo expected listing price today",
    "ipo valuation expensive or cheap", "ipo refund when credited",
    "ipo shares when credited to demat", "ipo unlocking date",
    "ipo lock in period", "promoter lock in ipo"
  ];

  for (const loc of indiaLocs) {
    for (const base of ipoBases) {
      keywords.push(
        `${base} in ${loc}`,
        `${loc} ${base} today`,
        `${base} today ${loc}`,
        `${loc} ${base} details`,
        `how to check ${base} in ${loc}`,
        `new ${base} news ${loc}`,
        `${loc} upcoming ${base} list`,
        `${base} status in ${loc} today`,
        `${base} gmp live in ${loc}`,
        `is ${base} good to apply in ${loc}`,
        `${base} allotment date ${loc}`,
        `${base} listing gain expected ${loc}`
      );
    }
  }

  // Dynamic year-based
  for (const base of ipoBases) {
    keywords.push(`${base} ${y}`, `${base} list ${y}`, `${base} ${yn}`);
  }

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for specific Stocks
 */
export function buildDynamicStockKeywords(symbol: string, name: string, y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();
  const s = symbol.toLowerCase();
  const n = name.toLowerCase();

  const stockBases = [
    `${n} share price`, `${s} share price`, `${n} stock price today`,
    `${s} nse`, `${s} bse`, `${n} today`, `${n} price today`, `${n} live price`,
    `${n} stock`, `${n} share price live`, `${s} stock price`, `${n} 52 week high`,
    `${n} 52 week low`, `${n} market cap`, `${n} target price`, `${n} chart`,
    `${n} technical analysis`, `${n} fundamental analysis`, `${n} eps`, `${n} pe ratio`,
    `${n} book value`, `${n} roe`, `${n} promoter holding`, `${n} fii holding`,
    `${n} dii holding`, `${n} quarterly results`, `${n} financial results`,
    `${n} stock analysis`, `${n} buy or sell`, `${n} today news`, `is ${n} good to buy`,
    `${s} price history`, `${s} all time high`, `${s} nse share price`,
    `${s} bse share price`, `${s} live`, `buy ${n} stock`, `${n} investors`,
    `${n} prediction`, `${s} target`, `should i buy ${s} today`,
    `${n} 1 week performance`, `${n} 1 month return`, `${n} 52 week return`,
    `${n} 3 month performance`, `${n} 6 month performance`, `${n} ytd return`,
    `${n} weekly gain loss`, `${n} weekly change`, `is ${n} in top 20 stocks`,
    `${n} upcoming events`, `${n} next earnings date`
  ];

  for (const loc of indiaLocs) {
    for (const base of stockBases) {
      keywords.push(
        `${base} in ${loc}`,
        `${loc} ${base} today`,
        `${base} today ${loc}`,
        `live ${base} ${loc}`,
        `current price of ${n} in ${loc}`,
        `where to buy ${n} shares in ${loc}`
      );
    }
  }

  // Dynamic year-based
  for (const base of stockBases) {
    keywords.push(`${base} ${y}`, `${base} ${yn}`);
  }

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for Indices
 */
export function buildDynamicIndexKeywords(indexName: string, y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();
  const n = indexName.toLowerCase();

  const indexBases = [
    `${n} today`, `${n} live`, `${n} price today`, `${n} chart`,
    `${n} value today`, `${n} 52 week high`, `${n} 52 week low`, `${n} all time high`,
    `${n} historical data`, `${n} stocks list`, `${n} composition`, `${n} weightage`,
    `${n} performance today`, `${n} opening time`, `${n} closing time`,
    "nse india live", "share market index today", "stock index india",
    "indian stock market index today", "nifty 50 today", "sensex today",
    "bank nifty today", "nse live chart", "nifty pe ratio today",
    "nse index today", "bse index today", `${n} performance`, `${n} return`,
    `${n} weekly change`, `${n} weekly gain`, `${n} weekly loss`, `${n} 1 week return`,
    `${n} 1 month return`, `${n} 3 month return`, `${n} ytd return`,
    `${n} target`, `${n} prediction`, `top 20 nifty stocks`,
    `top 20 index stocks`, `best index fund india`, `${n} etf india`
  ];

  for (const loc of indiaLocs) {
    for (const base of indexBases) {
      keywords.push(
        `${base} in ${loc}`,
        `${loc} ${base} today`,
        `${base} today ${loc}`,
        `live ${n} rate in ${loc}`,
        `${loc} market ${n} update`
      );
    }
  }

  // Dynamic year-based
  for (const base of indexBases) {
    keywords.push(`${base} ${y}`, `${base} ${yn}`);
  }

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for Crypto
 */
export function buildDynamicCryptoKeywords(coinName: string, symbol: string, y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();
  const globalLocs = getGlobalLocations();
  const n = coinName.toLowerCase();
  const s = symbol.toLowerCase();

  const cryptoBases = [
    `${n} price`, `${n} price in india`, `${n} price today`, `${n} price inr`,
    `${s} price`, `${s} price india`, `${s} price in rupees`, `${n} to inr`,
    `${n} live price`, `1 ${n} in rupees`, `${n} market cap`, `${n} all time high`,
    `${n} chart inr`, `${n} buy india`, `how to buy ${n} india`,
    `${n} prediction`, `${n} target`, `${n} news today`,
    "crypto price india today", "cryptocurrency price india", "best crypto to buy india",
    "bitcoin price india today", "btc price inr today", "crypto in rupees",
    "digital currency india", "crypto investment india", "blockchain india",
    "cryptocurrency market india", "crypto tax india", "wazirx coindcx coinswitch india",
    `${n} price prediction`, `${n} target price`, `should i buy ${n}`,
    `${n} 1 week price`, `${n} weekly gain`, `${n} weekly loss`, `${n} 7 day change`,
    `${n} 1 month return`, `${n} 30 day change`, `${n} weekly performance`,
    `${s} 1 week`, `${s} weekly chart`, `${n} down this week`, `${n} up this week`,
    `${n} drop this week`, `why is ${n} falling today`, `why is ${n} rising today`,
    `best time to buy ${n}`, `${n} dip today`, `${n} correction today`,
    `${n} bull run`, `is ${n} a good investment`, `${n} vs bitcoin`,
    `${s} usd inr converter`, `convert ${s} to inr`, `${s} to usd`,
    "altcoin season", "defi tokens today", "crypto gainers today",
    "top crypto this week", "which crypto is performing best this week",
    "crypto fear greed index", "bitcoin dominance today", "crypto market cap today"
  ];

  for (const loc of indiaLocs) {
    for (const base of cryptoBases) {
      keywords.push(
        `${base} today ${loc}`,
        `${loc} ${base} today`,
        `${base} ${loc}`,
        `live ${n} rate in ${loc}`,
        `current ${n} price ${loc}`
      );
    }
  }

  for (const loc of globalLocs) {
    for (const base of cryptoBases) {
      keywords.push(`${base} in ${loc}`, `${loc} ${base} price`);
    }
  }

  // Dynamic year-based
  for (const base of cryptoBases) {
    keywords.push(`${base} ${y}`, `${base} ${yn}`);
  }

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for Forex
 */
export function buildDynamicForexKeywords(base: string, quote: string, y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();
  const globalLocs = getGlobalLocations();
  const b = base.toLowerCase();
  const q = quote.toLowerCase();

  const forexBases = [
    `${b} to ${q}`, `${b} to ${q} today`, `${b} ${q} live rate`,
    `${b} ${q} exchange rate`, `${b} rate today india`, `1 ${b} in ${q}`,
    `${b} to rupee`, `${b} vs ${q}`, `${b} ${q} chart`, `${b} ${q} forecast`,
    `${b} ${q} rbi rate`, "forex rate india", "currency converter india",
    "live forex india", "dollar rate today india", "usd inr today",
    "rbi reference rate", "forex market india", "currency exchange rate india",
    "international money transfer india", "send money to india",
    "currency rate india today", "live exchange rate india", `${b} ${q} buy sell`,
    `${b} to ${q} rate`, `${b} ${q} 1 week change`, `${b} ${q} weekly gain loss`,
    `${b} ${q} last 7 days change`, `${b} weekly performance vs ${q}`,
    `how much did ${b} change this week`, `${b} to ${q} 1 month change`,
    `${b} ${q} monthly return`, `${b} to ${q} rate prediction`,
    `${b} ${q} forecast`, `why is ${b} falling against ${q}`,
    `why is ${b} rising today`, `${b} strength today`, `${b} weakness today`,
    `${b} all time high vs ${q}`, `best exchange rate ${b} to ${q}`,
    `bank forex rate ${b} to ${q}`, `sbi ${b} ${q} rate today`,
    `hdfc forex rate ${b}`, `nri transfer rate ${b} to inr`,
    "dollar index today DXY", "us dollar strength weak", "currency war",
    "forex trading india"
  ];

  for (const loc of indiaLocs) {
    for (const fb of forexBases) {
      keywords.push(
        `${fb} today ${loc}`,
        `${loc} ${fb} today`,
        `${fb} ${loc}`,
        `best exchange rate ${b} to ${q} in ${loc}`,
        `money transfer ${b} to ${q} ${loc}`
      );
    }
  }

  for (const loc of globalLocs) {
    for (const fb of forexBases) {
      keywords.push(`${fb} in ${loc}`, `${loc} ${fb} rate`);
    }
  }

  // Dynamic year-based
  for (const fb of forexBases) {
    keywords.push(`${fb} ${y}`, `${fb} ${yn}`);
  }

  return unique(keywords);
}

/**
 * Builds dynamic location-based keywords for Conglomerates / Sectors
 */
export function buildDynamicConglomerateKeywords(groupName: string, stockNames: string[], y: string, yn: string): string[] {
  const keywords: string[] = [];
  const indiaLocs = getIndiaLocations();
  const gn = groupName.toLowerCase();

  const conglomerateBases = [
    `${gn} stocks`, `${gn} stocks list`, `${gn} share price today`,
    `all ${gn} companies`, `${gn} group stocks price today`,
    `${gn} group companies nse`, `top ${gn} stocks`,
    `how many companies does ${gn} own`, `${gn} group company list`,
    `${gn} market cap`, `invest in ${gn} group`, `best ${gn} stock to buy`,
    `${gn} group stocks nse bse`, `best ${gn} stock`, `${gn} stocks performance`,
    `top 20 ${gn} stocks`, `${gn} group stocks`, `${gn} stocks 1 week performance`,
    `${gn} stocks weekly gain loss`, `${gn} group 52 week high low`,
    `${gn} group latest news`, `should i invest in ${gn} group`,
    `${gn} group dividend`, `${gn} top performing stock`,
    `${gn} worst performing stock today`, `${gn} group revenue profit`,
    "adani reliance tata birla comparison", "best indian business group to invest",
    "top 10 conglomerates in india", "list of all listed companies in india",
    "conglomerate stocks nse bse today", "diversified business groups india",
    "adani enterprises vs reliance industries", "tata motors vs mahindra",
    "hdfc vs icici group performance", "bajaj finance vs jio financial",
    "indian family business stocks", "wealth creators of india today",
    "multibagger stocks from conglomerates", "blue chip conglomerate stocks india",
    "adani group news live today", "reliance industries news live",
    "tata group latest updates india", "birla group share price today",
    "vedanta jsw steel group news", "lt hcl to infosys it sector",
    "india business news today", "moneyplant conglomerate tracker",
    "adani wealth of gautam adani today", "reliance mukesh ambani net worth impact",
    "tata sons shareholding structure", "how to buy all adani stocks",
    "best tata stocks for long term", "is reliance a good buy today",
    "adani group debt news today", "tata group dividend history",
    "conglomerate discount india stocks", "holding company discount india",
    "nifty 50 conglomerate weightage", "sensex business group analysis",
    "adani total gas vs gujarat gas", "reliance retail vs avenue supermarts",
    "tata tech vs ltimindtree", "adani green vs tata power",
    "top 20 indian conglomerates", "best business groups",
    "adani hindenburg saga latest", "reliance disney merger impact",
    "tata group semiconductor news", "adani airport biz news",
    "conglomerate stocks price list today", "market cap of adani group today",
    "market cap of tata group live", "reliance industries m-cap live",
    "indian billionaire stocks today", "promoter holding of conglomerates",
    "pledge shares of indian conglomerates", "debt to equity ratio conglomerates"
  ];

  // Add individual stock names to the base
  for (const sn of stockNames) {
    conglomerateBases.push(`${sn.toLowerCase()} share price`);
  }

  for (const loc of indiaLocs) {
    for (const base of conglomerateBases) {
      keywords.push(
        `${base} in ${loc}`,
        `${loc} ${base} today`,
        `${base} today ${loc}`,
        `invest in ${gn} in ${loc}`,
        `${loc} business news ${gn}`
      );
    }
  }

  // Dynamic year-based
  for (const base of conglomerateBases) {
    keywords.push(`${base} ${y}`, `${base} ${yn}`);
  }

  return unique(keywords);
}
