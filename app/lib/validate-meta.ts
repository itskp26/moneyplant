import { 
  getHomeMeta, getStockMeta, getCryptoMeta, 
  getForexMeta, getCommoditiesMeta, getCommodityMeta, getIpoMeta, 
  getTopStocksMeta, getIndexMeta, getConglomerateMeta,
  getNewsMeta, getMarketsMeta, getToolsMeta, getCommonMeta, getStocksMeta
} from './meta';

function validate(name: string, meta: any, expectedKeywords: string[] = []) {
  console.log(`\n--- Validating ${name} ---`);
  console.log(`Title: ${meta.title}`);
  
  const keywords = meta.keywords || "";
  console.log(`Keywords Length: ${keywords.length}`);

  if (keywords.length < 100) {
    console.error(`❌ WARNING: ${name} has very few keywords!`);
    throw new Error(`${name} lacks keywords`);
  }

  // Check for specific requested test cases
  for (const expected of expectedKeywords) {
    if (!keywords.toLowerCase().includes(expected.toLowerCase())) {
      console.error(`❌ MISSING KEYWORD: "${expected}" not found in ${name}`);
      throw new Error(`Missing keyword: ${expected}`);
    } else {
      console.log(`✅ FOUND: "${expected}"`);
    }
  }

  // Check for global localization (sample cities)
  const sampleCities = ["London", "Dubai", "New York", "Mumbai"];
  let cityCount = 0;
  for (const city of sampleCities) {
    if (keywords.toLowerCase().includes(city.toLowerCase())) {
      cityCount++;
    }
  }
  
  if (cityCount > 0) {
    console.log(`✅ LOCALIZATION: Found ${cityCount} sample cities.`);
  } else if (name !== "Privacy") {
    console.error(`❌ WARNING: ${name} has no global city localization!`);
  }

  console.log(`✅ OK: ${name} passed.`);
}

try {
  // Test Case 1: Markets Hub
  validate("Markets (Global)", getMarketsMeta("global"), [
    "emerging markets vs developed markets",
    "global market ranking 2025",
    "London", "Dubai"
  ]);

  // Test Case 2: India Markets
  validate("Markets (India)", getMarketsMeta("india"), [
    "india stock market world ranking",
    "nse ranking in world"
  ]);

  // Test Case 3: Income Tax Tool
  validate("Tools (Tax)", getToolsMeta("Income Tax"), [
    "calculate tax on 5 lakh salary",
    "new tax regime calculator india",
    "London"
  ]);

  // Test Case 4: SIP Tool
  validate("Tools (SIP)", getToolsMeta("SIP"), [
    "sip return chart nse bse",
    "Dubai"
  ]);

  // Test Case 5: Indices Hub
  validate("Indices Hub", getIndexMeta(), [
    "nifty 50 live today",
    "nasdaq today",
    "London"
  ]);

  // Test Case 6: Forex Hub
  validate("Forex Hub", getForexMeta(), [
    "usd to inr today",
    "aed to inr today",
    "dirham to rupee"
  ]);

  // Test Case 7: Stocks Hub
  validate("Stocks Hub", getStocksMeta(), [
    "multibagger stocks 2025",
    "Mumbai"
  ]);

  // Test Case 8: Commodities Hub
  validate("Commodities Hub", getCommoditiesMeta(), [
    "gold rate today india",
    "crude oil price today",
    "Dubai"
  ]);

  // General check for the rest
  validate("Home", getHomeMeta());
  validate("Crypto Hub", getCryptoMeta());
  validate("IPO", getIpoMeta());

  console.log("\n🚀 ALL TEST CASES PASSED! METADATA ENGINE IS ROBUST.");
} catch (e: any) {
  console.error("\n❌ TEST CASE FAILED:", e.message);
  process.exit(1);
}
