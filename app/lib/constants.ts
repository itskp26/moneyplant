export const SITE_NAME = "MoneyPlant";
export const SITE_URL = "https://moneyplant24.com";
export const SITE_DESCRIPTION =
  "MoneyPlant — India's premier live finance portal. Track Nifty 50, Sensex, BSE/NSE stocks, crypto prices in INR, forex rates, gold & silver prices, IPOs, mutual funds and global markets in real time.";
export const SITE_TWITTER = "@moneyplantindia";
export const OG_IMAGE = "/og/default.png";

// ─── ADANI GROUP (14+ companies) ─────────────────────────────────────────────
export const ADANI_STOCKS = [
  { symbol: "ADANIENT",   name: "Adani Enterprises",          sector: "Conglomerate" },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ",           sector: "Infrastructure" },
  { symbol: "ADANIPOWER", name: "Adani Power",                 sector: "Energy" },
  { symbol: "ADANIGREEN", name: "Adani Green Energy",          sector: "Renewable Energy" },
  { symbol: "ATGL",       name: "Adani Total Gas",             sector: "Gas Distribution" },
  { symbol: "ADANITRANS", name: "Adani Transmission",          sector: "Power Transmission" },
  { symbol: "AWL",        name: "Adani Wilmar",                sector: "FMCG" },
  { symbol: "NDTV",       name: "NDTV (Adani)",                sector: "Media" },
  { symbol: "ACC",        name: "ACC Cement (Adani)",          sector: "Cement" },
  { symbol: "AMBUJACEM",  name: "Ambuja Cements (Adani)",      sector: "Cement" },
  { symbol: "SANGHIIND",  name: "Sanghi Industries",           sector: "Cement" },
  { symbol: "GUJGAS",     name: "Gujarat Gas",                 sector: "Gas Distribution" },
  { symbol: "ADANIENSOL", name: "Adani Energy Solutions",      sector: "Energy" },
  { symbol: "SRHHYPOLTD", name: "SRHHL (Adani Roads)",         sector: "Infrastructure" },
];

// ─── RELIANCE GROUP (Mukesh Ambani) ──────────────────────────────────────────
export const RELIANCE_MK_STOCKS = [
  { symbol: "RELIANCE",   name: "Reliance Industries",         sector: "Conglomerate" },
  { symbol: "JIOFINANCE", name: "Jio Financial Services",      sector: "Financial Services" },
  // unlisted subsidiaries listed for info
  { symbol: "RELIANCE_RETAIL", name: "Reliance Retail (Unlisted)", sector: "Retail", unlisted: true },
  { symbol: "RELIANCE_JIO",    name: "Jio Platforms (Unlisted)",    sector: "Telecom/Tech", unlisted: true },
];

// ─── RELIANCE ADAG GROUP (Anil Ambani) ───────────────────────────────────────
export const RELIANCE_ADAG_STOCKS = [
  { symbol: "RPOWER",     name: "Reliance Power",              sector: "Energy" },
  { symbol: "RELINFRA",   name: "Reliance Infrastructure",     sector: "Infrastructure" },
  { symbol: "RCOM",       name: "Reliance Communications",     sector: "Telecom" },
  { symbol: "RHFL",       name: "Reliance Home Finance",       sector: "Finance" },
  { symbol: "RNAVAL",     name: "Reliance Naval & Engineering", sector: "Defence" },
  { symbol: "RCAPITAL",   name: "Reliance Capital",            sector: "Finance" },
];

// All Reliance for conglomerate page
export const RELIANCE_STOCKS = [...RELIANCE_MK_STOCKS, ...RELIANCE_ADAG_STOCKS];

// ─── TATA GROUP (16 listed companies) ────────────────────────────────────────
export const TATA_STOCKS = [
  { symbol: "TCS",        name: "Tata Consultancy Services",   sector: "IT Services" },
  { symbol: "TATAMOTORS", name: "Tata Motors",                 sector: "Automobile" },
  { symbol: "TATASTEEL",  name: "Tata Steel",                  sector: "Steel / Metals" },
  { symbol: "TITAN",      name: "Titan Company",               sector: "Consumer Goods" },
  { symbol: "TATAPOWER",  name: "Tata Power",                  sector: "Energy" },
  { symbol: "TATACONSUM", name: "Tata Consumer Products",      sector: "FMCG" },
  { symbol: "TRENT",      name: "Trent (Zara/Westside)",       sector: "Retail" },
  { symbol: "TATACOMM",   name: "Tata Communications",         sector: "Telecom" },
  { symbol: "TATAELXSI",  name: "Tata Elxsi",                  sector: "Design / Tech" },
  { symbol: "TATATECH",   name: "Tata Technologies",           sector: "IT" },
  { symbol: "INDHOTEL",   name: "Indian Hotels (Taj Hotels)",  sector: "Hospitality" },
  { symbol: "TATACHEM",   name: "Tata Chemicals",              sector: "Chemicals" },
  { symbol: "VOLTAS",     name: "Voltas",                      sector: "Consumer Durables" },
  { symbol: "RALLIS",     name: "Rallis India",                sector: "Agro Chemicals" },
  { symbol: "NELCO",      name: "Nelco",                       sector: "Technology" },
  { symbol: "TINPLATE",   name: "Tinplate Company of India",   sector: "Packaging" },
  { symbol: "TCNSBRANDS", name: "TCNS Clothing (W/Aurelia)",   sector: "Retail" },
  { symbol: "ARTEDZ",     name: "Artedz Fabs",                 sector: "Textiles" },
];

// ─── BAJAJ GROUP ──────────────────────────────────────────────────────────────
export const BAJAJ_STOCKS = [
  { symbol: "BAJFINANCE", name: "Bajaj Finance",               sector: "NBFC" },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv",               sector: "Financial Services" },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto",                  sector: "Automobile" },
  { symbol: "BAJAJELEC",  name: "Bajaj Electricals",           sector: "Consumer Durables" },
  { symbol: "BAJAJHLDNG", name: "Bajaj Holdings & Investment", sector: "Investment" },
  { symbol: "MUKANDLTD",  name: "Mukand Ltd",                  sector: "Steel" },
  { symbol: "BAJAJCON",   name: "Bajaj Consumer Care",         sector: "FMCG" },
];

// ─── MAHINDRA GROUP ───────────────────────────────────────────────────────────
export const MAHINDRA_STOCKS = [
  { symbol: "M&M",        name: "Mahindra & Mahindra",         sector: "Automobile" },
  { symbol: "TECHM",      name: "Tech Mahindra",               sector: "IT Services" },
  { symbol: "MAHINDCIE",  name: "Mahindra CIE Automotive",     sector: "Auto Parts" },
  { symbol: "MAHSCOOTER", name: "Maharashtra Scooters",        sector: "Automobile" },
  { symbol: "MFSL",       name: "Mahindra Finance",            sector: "NBFC" },
  { symbol: "MAHLOG",     name: "Mahindra Logistics",          sector: "Logistics" },
  { symbol: "MAHLIFE",    name: "Mahindra Lifespace Dev.",      sector: "Real Estate" },
  { symbol: "MHRIL",      name: "Mahindra Holidays",           sector: "Hospitality" },
  { symbol: "NAUKRI",     name: "Info Edge (Naukri/Jeevansathi)", sector: "Internet" },
  { symbol: "SSLT",       name: "Sterlite Technologies",       sector: "Technology" },
];

// ─── ADITYA BIRLA GROUP ───────────────────────────────────────────────────────
export const BIRLA_STOCKS = [
  { symbol: "GRASIM",     name: "Grasim Industries",           sector: "Conglomerate / Cement" },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement",            sector: "Cement" },
  { symbol: "HINDALCO",   name: "Hindalco Industries",         sector: "Aluminium / Metals" },
  { symbol: "NOVELIS",    name: "Novelis (Hindalco Sub.)",     sector: "Aluminium", unlisted: true },
  { symbol: "ABCAPITAL",  name: "Aditya Birla Capital",        sector: "Financial Services" },
  { symbol: "ABFRL",      name: "Aditya Birla Fashion & Retail", sector: "Retail / Fashion" },
  { symbol: "IDEA",       name: "Vodafone Idea (Vi)",          sector: "Telecom" },
  { symbol: "ABIRLANUVO", name: "Aditya Birla Nuvo",           sector: "Diversified" },
  { symbol: "MOFSL",      name: "Motilal Oswal Financial",     sector: "Broking / Finance" },
  { symbol: "BIRLAMONEY",  name: "Aditya Birla Money",         sector: "Broking" },
  { symbol: "BIRLACABLE", name: "Birla Cable",                 sector: "Cables" },
];

// ─── HDFC GROUP ───────────────────────────────────────────────────────────────
export const HDFC_STOCKS = [
  { symbol: "HDFCBANK",   name: "HDFC Bank",                   sector: "Private Bank" },
  { symbol: "HDFCLIFE",   name: "HDFC Life Insurance",         sector: "Life Insurance" },
  { symbol: "HDFCAMC",    name: "HDFC AMC",                    sector: "Asset Management" },
  { symbol: "HDFCERGO",   name: "HDFC ERGO (Subsidiary)",      sector: "General Insurance", unlisted: true },
  { symbol: "HDFC",       name: "HDFC Ltd (merged with HDFCBANK)", sector: "Housing Finance", unlisted: true },
];

// ─── ICICI GROUP ──────────────────────────────────────────────────────────────
export const ICICI_STOCKS = [
  { symbol: "ICICIBANK",  name: "ICICI Bank",                  sector: "Private Bank" },
  { symbol: "ICICIGI",    name: "ICICI Lombard General Ins.",  sector: "General Insurance" },
  { symbol: "ICICIPRULI", name: "ICICI Prudential Life Ins.",  sector: "Life Insurance" },
  { symbol: "I-PRUMF",    name: "ICICI Prudential AMC",        sector: "Asset Management", unlisted: true },
  { symbol: "ICICISEC",   name: "ICICI Securities",            sector: "Broking / Finance" },
];

// ─── SBI GROUP ────────────────────────────────────────────────────────────────
export const SBI_STOCKS = [
  { symbol: "SBIN",       name: "State Bank of India",         sector: "PSU Bank" },
  { symbol: "SBICARD",    name: "SBI Cards & Payment",         sector: "Credit Cards / NBFC" },
  { symbol: "SBILIFE",    name: "SBI Life Insurance",          sector: "Life Insurance" },
  { symbol: "SBIMF",      name: "SBI Mutual Fund (Unlisted)",  sector: "Asset Management", unlisted: true },
];

// ─── KOTAK GROUP ──────────────────────────────────────────────────────────────
export const KOTAK_STOCKS = [
  { symbol: "KOTAKBANK",  name: "Kotak Mahindra Bank",         sector: "Private Bank" },
  { symbol: "KOTAKGI",    name: "Kotak General Insurance",     sector: "General Insurance", unlisted: true },
  { symbol: "KIE",        name: "Kotak Investment Advisors",   sector: "Investment", unlisted: true },
  { symbol: "KMBL",       name: "Kotak Life Insurance",        sector: "Life Insurance", unlisted: true },
];

// ─── GODREJ GROUP ─────────────────────────────────────────────────────────────
export const GODREJ_STOCKS = [
  { symbol: "GODREJCP",   name: "Godrej Consumer Products",    sector: "FMCG" },
  { symbol: "GODREJPROP", name: "Godrej Properties",           sector: "Real Estate" },
  { symbol: "GODREJIND",  name: "Godrej Industries",           sector: "Conglomerate" },
  { symbol: "GODREJAGROVET", name: "Godrej Agrovet",           sector: "Agri / FMCG" },
  { symbol: "GODREJAGRO", name: "Godrej Seeds (Subsidiary)",   sector: "Agriculture", unlisted: true },
];

// ─── JSW GROUP ────────────────────────────────────────────────────────────────
export const JSW_STOCKS = [
  { symbol: "JSWSTEEL",   name: "JSW Steel",                   sector: "Steel / Metals" },
  { symbol: "JSWENERGY",  name: "JSW Energy",                  sector: "Energy" },
  { symbol: "JSWINFRA",   name: "JSW Infrastructure",          sector: "Infrastructure" },
  { symbol: "JSHL",       name: "JSW Holdings",                sector: "Investment" },
  { symbol: "JSWMG",      name: "JSW MG Motor India",          sector: "Automobile", unlisted: true },
  { symbol: "JSWCEMENT",  name: "JSW Cement",                  sector: "Cement", unlisted: true },
];

// ─── VEDANTA GROUP ────────────────────────────────────────────────────────────
export const VEDANTA_STOCKS = [
  { symbol: "VEDL",       name: "Vedanta Limited",             sector: "Mining / Metals" },
  { symbol: "HINDCOPPER", name: "Hindustan Copper",            sector: "Copper" },
  { symbol: "BALCO",      name: "Bharat Aluminium (BALCO)",    sector: "Aluminium", unlisted: true },
  { symbol: "CAIRN",      name: "Cairn India (merged Vedanta)", sector: "Oil & Gas", unlisted: true },
];

// ─── ITC GROUP ────────────────────────────────────────────────────────────────
export const ITC_STOCKS = [
  { symbol: "ITC",        name: "ITC Limited",                 sector: "FMCG / Tobacco" },
  { symbol: "ITCHOTEL",   name: "ITC Hotels",                  sector: "Hospitality" },
  { symbol: "ITCINFRA",   name: "ITC Infotech (Subsidiary)",   sector: "IT", unlisted: true },
];

// ─── L&T GROUP ────────────────────────────────────────────────────────────────
export const LT_STOCKS = [
  { symbol: "LT",         name: "Larsen & Toubro",             sector: "Engineering / Construction" },
  { symbol: "LTIM",       name: "LTIMindtree",                 sector: "IT Services" },
  { symbol: "LTTS",       name: "L&T Technology Services",     sector: "Engineering IT" },
  { symbol: "LTTECHNO",   name: "L&T Technology Services",     sector: "Technology" },
  { symbol: "LTFH",       name: "L&T Finance Holdings",        sector: "NBFC" },
  { symbol: "LXCHEM",     name: "L&T Special Steels",          sector: "Steel", unlisted: true },
];

// ─── WIPRO GROUP ──────────────────────────────────────────────────────────────
export const WIPRO_STOCKS = [
  { symbol: "WIPRO",      name: "Wipro Limited",               sector: "IT Services" },
  { symbol: "PREMIERENR", name: "Premier Energies",            sector: "Solar Energy" },
  { symbol: "AZIMPHARM", name: "Azim Premji Invest. (Unlisted)", sector: "Investment", unlisted: true },
];

// ─── INFOSYS GROUP ────────────────────────────────────────────────────────────
export const INFOSYS_STOCKS = [
  { symbol: "INFY",       name: "Infosys Limited",             sector: "IT Services" },
  { symbol: "EDGEVERVE",  name: "EdgeVerve Systems (Subsidiary)", sector: "IT", unlisted: true },
];

// ─── HCL GROUP ────────────────────────────────────────────────────────────────
export const HCL_STOCKS = [
  { symbol: "HCLTECH",    name: "HCL Technologies",            sector: "IT Services" },
  { symbol: "HCLINFOSYS", name: "HCL Infosystems",             sector: "IT Hardware" },
  { symbol: "SONACOMS",   name: "Sonata Software",             sector: "IT" },
];

// ─── MARUTI / SUZUKI GROUP ────────────────────────────────────────────────────
export const MARUTI_STOCKS = [
  { symbol: "MARUTI",     name: "Maruti Suzuki India",         sector: "Automobile" },
  { symbol: "MSIL",       name: "Maruti Suzuki (alt ticker)",  sector: "Automobile" },
];

// ─── BHARAT GROUP (PSU) ───────────────────────────────────────────────────────
export const PSU_STOCKS = [
  { symbol: "ONGC",       name: "ONGC",                        sector: "Oil & Gas (PSU)" },
  { symbol: "BPCL",       name: "Bharat Petroleum (BPCL)",     sector: "Oil & Gas (PSU)" },
  { symbol: "IOC",        name: "Indian Oil Corporation",      sector: "Oil & Gas (PSU)" },
  { symbol: "HPCL",       name: "Hindustan Petroleum (HPCL)",  sector: "Oil & Gas (PSU)" },
  { symbol: "GAIL",       name: "GAIL India",                  sector: "Gas (PSU)" },
  { symbol: "POWERGRID",  name: "Power Grid Corporation",      sector: "Power (PSU)" },
  { symbol: "NTPC",       name: "NTPC Limited",                sector: "Power (PSU)" },
  { symbol: "COALINDIA",  name: "Coal India",                  sector: "Mining (PSU)" },
  { symbol: "BHEL",       name: "Bharat Heavy Electricals",    sector: "Engineering (PSU)" },
  { symbol: "HAL",        name: "Hindustan Aeronautics (HAL)", sector: "Defence (PSU)" },
  { symbol: "BEL",        name: "Bharat Electronics",         sector: "Defence (PSU)" },
  { symbol: "IRCTC",      name: "IRCTC",                       sector: "Travel (PSU)" },
  { symbol: "IRFC",       name: "Indian Railway Finance Corp", sector: "Finance (PSU)" },
  { symbol: "RAILVIKAS",  name: "Rail Vikas Nigam (RVNL)",     sector: "Railway (PSU)" },
  { symbol: "RVNL",       name: "Rail Vikas Nigam",            sector: "Railway (PSU)" },
  { symbol: "RECLTD",     name: "REC Limited",                 sector: "Power Finance (PSU)" },
  { symbol: "PFC",        name: "Power Finance Corporation",   sector: "Finance (PSU)" },
  { symbol: "SJVN",       name: "SJVN Limited",                sector: "Renewable (PSU)" },
  { symbol: "NFL",        name: "National Fertilizers",        sector: "Fertilizers (PSU)" },
  { symbol: "NHAI",       name: "NHAI (Bonds only)",           sector: "Infrastructure (PSU)", unlisted: true },
];

// ─── PHARMA MAJORS ────────────────────────────────────────────────────────────
export const PHARMA_STOCKS = [
  { symbol: "SUNPHARMA",  name: "Sun Pharmaceutical Industries", sector: "Pharmaceuticals" },
  { symbol: "DRREDDY",    name: "Dr. Reddy's Laboratories",    sector: "Pharmaceuticals" },
  { symbol: "CIPLA",      name: "Cipla",                       sector: "Pharmaceuticals" },
  { symbol: "DIVISLAB",   name: "Divi's Laboratories",         sector: "Pharmaceuticals" },
  { symbol: "BIOCON",     name: "Biocon",                      sector: "Biotech / Pharma" },
  { symbol: "AUROPHARMA", name: "Aurobindo Pharma",            sector: "Pharmaceuticals" },
  { symbol: "LUPIN",      name: "Lupin Limited",               sector: "Pharmaceuticals" },
  { symbol: "GLENMARK",   name: "Glenmark Pharmaceuticals",    sector: "Pharmaceuticals" },
  { symbol: "TORNTPHARM", name: "Torrent Pharmaceuticals",     sector: "Pharmaceuticals" },
  { symbol: "ALKEM",      name: "Alkem Laboratories",          sector: "Pharmaceuticals" },
  { symbol: "IPCALAB",    name: "IPCA Laboratories",           sector: "Pharmaceuticals" },
  { symbol: "ABBOTINDIA", name: "Abbott India",                sector: "Pharmaceuticals" },
];

// ─── IT MAJORS ────────────────────────────────────────────────────────────────
export const IT_STOCKS = [
  { symbol: "TCS",        name: "Tata Consultancy Services",   sector: "IT Services" },
  { symbol: "INFY",       name: "Infosys",                     sector: "IT Services" },
  { symbol: "WIPRO",      name: "Wipro",                       sector: "IT Services" },
  { symbol: "HCLTECH",    name: "HCL Technologies",            sector: "IT Services" },
  { symbol: "TECHM",      name: "Tech Mahindra",               sector: "IT Services" },
  { symbol: "LTIM",       name: "LTIMindtree",                 sector: "IT Services" },
  { symbol: "LTTS",       name: "L&T Technology Services",     sector: "Engineering IT" },
  { symbol: "TATAELXSI",  name: "Tata Elxsi",                  sector: "Design / Tech" },
  { symbol: "MPHASIS",    name: "Mphasis",                     sector: "IT Services" },
  { symbol: "COFORGE",    name: "Coforge",                     sector: "IT Services" },
  { symbol: "PERSISTENT", name: "Persistent Systems",          sector: "IT Services" },
  { symbol: "KPITTECH",   name: "KPIT Technologies",           sector: "Automotive IT" },
  { symbol: "ROUTE",      name: "Route Mobile",                sector: "CPaaS / IT" },
  { symbol: "MASTEK",     name: "Mastek",                      sector: "IT Services" },
  { symbol: "HEXAWARE",   name: "Hexaware Technologies",       sector: "IT Services" },
];

// ─── BANKING MAJORS ───────────────────────────────────────────────────────────
export const BANK_STOCKS = [
  { symbol: "HDFCBANK",   name: "HDFC Bank",                   sector: "Private Bank" },
  { symbol: "ICICIBANK",  name: "ICICI Bank",                  sector: "Private Bank" },
  { symbol: "SBIN",       name: "State Bank of India",         sector: "PSU Bank" },
  { symbol: "KOTAKBANK",  name: "Kotak Mahindra Bank",         sector: "Private Bank" },
  { symbol: "AXISBANK",   name: "Axis Bank",                   sector: "Private Bank" },
  { symbol: "INDUSINDBK", name: "IndusInd Bank",               sector: "Private Bank" },
  { symbol: "BANKBARODA", name: "Bank of Baroda",              sector: "PSU Bank" },
  { symbol: "PNB",        name: "Punjab National Bank",        sector: "PSU Bank" },
  { symbol: "CANBK",      name: "Canara Bank",                 sector: "PSU Bank" },
  { symbol: "UNIONBANK",  name: "Union Bank of India",         sector: "PSU Bank" },
  { symbol: "FEDERALBNK", name: "Federal Bank",                sector: "Private Bank" },
  { symbol: "IDFCFIRSTB", name: "IDFC First Bank",             sector: "Private Bank" },
  { symbol: "RBLBANK",    name: "RBL Bank",                    sector: "Private Bank" },
  { symbol: "YESBANK",    name: "Yes Bank",                    sector: "Private Bank" },
  { symbol: "BANDHANBNK", name: "Bandhan Bank",                sector: "Small Finance Bank" },
  { symbol: "AUBANK",     name: "AU Small Finance Bank",       sector: "Small Finance Bank" },
  { symbol: "DCBBANK",    name: "DCB Bank",                    sector: "Private Bank" },
  { symbol: "TMVFINANCE", name: "TMV Finance",                 sector: "NBFC" },
];

// ─── AUTO MAJORS ──────────────────────────────────────────────────────────────
export const AUTO_STOCKS = [
  { symbol: "MARUTI",     name: "Maruti Suzuki India",         sector: "Passenger Vehicles" },
  { symbol: "TATAMOTORS", name: "Tata Motors",                 sector: "Commercial & Passenger Vehicles" },
  { symbol: "M&M",        name: "Mahindra & Mahindra",         sector: "SUVs / Tractors" },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto",                  sector: "Two Wheelers / Three Wheelers" },
  { symbol: "HEROMOTOCO", name: "Hero MotoCorp",               sector: "Two Wheelers" },
  { symbol: "EICHERMOT",  name: "Eicher Motors (Royal Enfield)", sector: "Two Wheelers" },
  { symbol: "TVSMOTOR",   name: "TVS Motor Company",           sector: "Two Wheelers" },
  { symbol: "ASHOKLEY",   name: "Ashok Leyland",               sector: "Commercial Vehicles" },
  { symbol: "MOTHERSON",  name: "Samvardhana Motherson",       sector: "Auto Components" },
  { symbol: "BOSCHLTD",   name: "Bosch India",                 sector: "Auto Components" },
  { symbol: "EXIDEIND",   name: "Exide Industries",            sector: "Batteries / Auto" },
  { symbol: "AMARAJABAT", name: "Amara Raja Energy",           sector: "Batteries / EV" },
  { symbol: "OLECTRA",    name: "Olectra Greentech (EV Bus)",  sector: "EV" },
  { symbol: "TIINDIA",    name: "Tube Investments of India",   sector: "Auto Components" },
  { symbol: "EIHOTEL",    name: "EIH Limited (Oberoi Hotels)", sector: "Hospitality" },
];

// ─── FMCG MAJORS ─────────────────────────────────────────────────────────────
export const FMCG_STOCKS = [
  { symbol: "HINDUNILVR", name: "Hindustan Unilever (HUL)",    sector: "FMCG" },
  { symbol: "ITC",        name: "ITC Limited",                 sector: "FMCG / Tobacco" },
  { symbol: "NESTLEIND",  name: "Nestle India",                sector: "Food & Beverages" },
  { symbol: "BRITANNIA",  name: "Britannia Industries",        sector: "Food Products" },
  { symbol: "GODREJCP",   name: "Godrej Consumer Products",    sector: "FMCG" },
  { symbol: "DABUR",      name: "Dabur India",                 sector: "FMCG / Ayurveda" },
  { symbol: "MARICO",     name: "Marico Limited",              sector: "FMCG" },
  { symbol: "EMAMILTD",   name: "Emami Limited",               sector: "Personal Care" },
  { symbol: "COLPAL",     name: "Colgate-Palmolive India",     sector: "Personal Care" },
  { symbol: "PGHH",       name: "P&G Hygiene & Health",        sector: "FMCG" },
  { symbol: "VBL",        name: "Varun Beverages (PepsiCo India)", sector: "Beverages" },
  { symbol: "UBL",        name: "United Breweries (Kingfisher)", sector: "Beverages / Alcohol" },
  { symbol: "MCDOWELL-N", name: "United Spirits (Johnnie Walker)", sector: "Alcohol / FMCG" },
  { symbol: "RADICO",     name: "Radico Khaitan",              sector: "Alcohol" },
];

// ─── REAL ESTATE ──────────────────────────────────────────────────────────────
export const REALTY_STOCKS = [
  { symbol: "DLF",        name: "DLF Limited",                 sector: "Real Estate" },
  { symbol: "GODREJPROP", name: "Godrej Properties",           sector: "Real Estate" },
  { symbol: "OBEROIRLTY", name: "Oberoi Realty",               sector: "Real Estate" },
  { symbol: "PRESTIGE",   name: "Prestige Estates Projects",   sector: "Real Estate" },
  { symbol: "PHOENIXLTD", name: "Phoenix Mills",               sector: "Real Estate / Malls" },
  { symbol: "SOBHA",      name: "Sobha Limited",               sector: "Real Estate" },
  { symbol: "MAHLIFE",    name: "Mahindra Lifespace",          sector: "Real Estate" },
  { symbol: "Brigade",    name: "Brigade Enterprises",         sector: "Real Estate" },
  { symbol: "PURAVANKARA", name: "Puravankara Limited",        sector: "Real Estate" },
  { symbol: "LODHA",      name: "Macrotech Developers (Lodha)", sector: "Real Estate" },
  { symbol: "NUVAMA",     name: "Nuvama Wealth Management",    sector: "Wealth Mgmt" },
];

// ─── NIFTY 50 COMPLETE LIST ───────────────────────────────────────────────────
export const NIFTY50_STOCKS = [
  "ADANIENT", "ADANIPORTS", "APOLLOHOSP", "ASIANPAINT", "AXISBANK",
  "BAJAJ-AUTO", "BAJFINANCE", "BAJAJFINSV", "BHARTIARTL", "BPCL",
  "BRITANNIA", "CIPLA", "COALINDIA", "DIVISLAB", "DRREDDY",
  "EICHERMOT", "GRASIM", "HCLTECH", "HDFCBANK", "HDFCLIFE",
  "HEROMOTOCO", "HINDALCO", "HINDUNILVR", "ICICIBANK", "INDUSINDBK",
  "INFY", "ITC", "JSWSTEEL", "KOTAKBANK", "LT",
  "M&M", "MARUTI", "NESTLEIND", "NTPC", "ONGC",
  "POWERGRID", "RELIANCE", "SBILIFE", "SBIN", "SHRIRAMFIN",
  "SUNPHARMA", "TATACONSUM", "TATAMOTORS", "TATASTEEL", "TCS",
  "TECHM", "TITAN", "ULTRACEMCO", "WIPRO", "LTIM",
];

// ─── NIFTY NEXT 50 ────────────────────────────────────────────────────────────
export const NIFTY_NEXT50 = [
  "ABB", "ADANIGREEN", "ATGL", "AWL", "BANDHANBNK",
  "BANKBARODA", "BEL", "BERGEPAINT", "BHARATFORG", "BIOCON",
  "BOSCHLTD", "CHOLAFIN", "DABUR", "DLF", "FEDERALBNK",
  "GAIL", "GODREJCP", "GODREJPROP", "HAL", "HAVELLS",
  "ICICIPRULI", "INDUSTOWER", "IRCTC", "LICI", "LODHA",
  "LUPIN", "MAXHEALTH", "MFSL", "MOTHERSON", "MUTHOOTFIN",
  "NAUKRI", "NHPC", "NMDC", "OFSS", "PAGEIND",
  "PAYTM", "PIIND", "PNB", "RECLTD", "SBICARD",
  "SHREECEM", "SIEMENS", "TATACOMM", "TATACHEM", "TATAPOWER",
  "TRENT", "UBL", "VEDL", "VBL", "ZOMATO",
];

// ─── MAJOR INDICES ────────────────────────────────────────────────────────────
export const INDICES = [
  { id: "nifty-50",           symbol: "^NSEI",      name: "Nifty 50",            exchange: "NSE", country: "India" },
  { id: "sensex",             symbol: "^BSESN",     name: "BSE Sensex",          exchange: "BSE", country: "India" },
  { id: "bank-nifty",         symbol: "^NSEBANK",   name: "Bank Nifty",          exchange: "NSE", country: "India" },
  { id: "nifty-it",           symbol: "^CNXIT",     name: "Nifty IT",            exchange: "NSE", country: "India" },
  { id: "nifty-midcap-100",   symbol: "^CNXMIDCAP", name: "Nifty Midcap 100",    exchange: "NSE", country: "India" },
  { id: "nifty-smallcap-100", symbol: "^CNXSC",     name: "Nifty Smallcap 100",  exchange: "NSE", country: "India" },
  { id: "nifty-auto",         symbol: "^CNXAUTO",   name: "Nifty Auto",          exchange: "NSE", country: "India" },
  { id: "nifty-pharma",       symbol: "^CNXPHARMA", name: "Nifty Pharma",        exchange: "NSE", country: "India" },
  { id: "nifty-fmcg",         symbol: "^CNXFMCG",   name: "Nifty FMCG",          exchange: "NSE", country: "India" },
  { id: "nifty-metal",        symbol: "^CNXMETAL",  name: "Nifty Metal",         exchange: "NSE", country: "India" },
  { id: "nifty-realty",       symbol: "^CNXREALTY", name: "Nifty Realty",        exchange: "NSE", country: "India" },
  { id: "nifty-energy",       symbol: "^CNXENERGY", name: "Nifty Energy",        exchange: "NSE", country: "India" },
];

// ─── GLOBAL INDICES (Americas) ────────────────────────────────────────────────
export const US_INDICES = [
  { symbol: "^GSPC",    name: "S&P 500",          country: "USA",    exchange: "NYSE/NASDAQ", id: "sp500" },
  { symbol: "^DJI",     name: "Dow Jones",         country: "USA",    exchange: "NYSE", id: "dow-jones" },
  { symbol: "^IXIC",    name: "NASDAQ Composite",  country: "USA",    exchange: "NASDAQ", id: "nasdaq" },
  { symbol: "^RUT",     name: "Russell 2000",      country: "USA",    exchange: "NYSE", id: "russell-2000" },
  { symbol: "^VIX",     name: "CBOE VIX (Fear)",   country: "USA",    exchange: "CBOE", id: "vix" },
  { symbol: "^GSPTSE",  name: "S&P/TSX Composite", country: "Canada", exchange: "TSX", id: "tsx" },
  { symbol: "^BVSP",    name: "Bovespa",            country: "Brazil", exchange: "B3", id: "bovespa" },
  { symbol: "^MXX",     name: "IPC Mexico",         country: "Mexico", exchange: "BMV", id: "ipc-mexico" },
];

// ─── GLOBAL INDICES (Europe) ──────────────────────────────────────────────────
export const EUROPE_INDICES = [
  { symbol: "^FTSE",    name: "FTSE 100",           country: "UK",          exchange: "LSE", id: "ftse-100" },
  { symbol: "^GDAXI",   name: "DAX",                country: "Germany",     exchange: "XETRA", id: "dax" },
  { symbol: "^FCHI",    name: "CAC 40",             country: "France",      exchange: "Euronext", id: "cac-40" },
  { symbol: "^IBEX",    name: "IBEX 35",            country: "Spain",       exchange: "BME", id: "ibex-35" },
  { symbol: "^SSMI",    name: "SMI (Switzerland)",  country: "Switzerland", exchange: "SIX", id: "smi" },
  { symbol: "FTSEMIB.MI", name: "FTSE MIB (Italy)", country: "Italy",      exchange: "Borsa Italiana", id: "ftse-mib" },
  { symbol: "^AEX",     name: "AEX (Netherlands)", country: "Netherlands",  exchange: "Euronext Amsterdam", id: "aex" },
  { symbol: "^STOXX50E", name: "Euro Stoxx 50",    country: "Eurozone",     exchange: "Euronext", id: "eurostoxx50" },
];

// ─── GLOBAL INDICES (Asia-Pacific) ───────────────────────────────────────────
export const ASIA_INDICES = [
  { symbol: "^N225",    name: "Nikkei 225",         country: "Japan",       exchange: "TSE", id: "nikkei-225" },
  { symbol: "^HSI",     name: "Hang Seng",           country: "Hong Kong",   exchange: "HKEX", id: "hang-seng" },
  { symbol: "000001.SS", name: "Shanghai Composite", country: "China",       exchange: "SSE", id: "shanghai" },
  { symbol: "^AXJO",    name: "ASX 200",             country: "Australia",   exchange: "ASX", id: "asx-200" },
  { symbol: "^KS11",    name: "KOSPI",               country: "South Korea", exchange: "KRX", id: "kospi" },
  { symbol: "^TWII",    name: "Taiwan Weighted",     country: "Taiwan",      exchange: "TWSE", id: "taiwan-weighted" },
  { symbol: "^STI",     name: "Straits Times Index", country: "Singapore",   exchange: "SGX", id: "sti" },
  { symbol: "^KLSE",    name: "KLCI",                country: "Malaysia",    exchange: "Bursa", id: "klci" },
  { symbol: "^JKSE",    name: "IDX Composite",       country: "Indonesia",   exchange: "IDX", id: "idx" },
  { symbol: "^NSEI",    name: "Nifty 50",            country: "India",       exchange: "NSE", id: "nifty-50" },
  { symbol: "^BSESN",   name: "BSE Sensex",          country: "India",       exchange: "BSE", id: "sensex" },
  { symbol: "^SET.BK",  name: "SET Index",           country: "Thailand",    exchange: "SET", id: "set" },
  { symbol: "^PSEi",    name: "PSEi",                country: "Philippines", exchange: "PSE", id: "psei" },
];

// ─── GLOBAL INDICES (Middle East & Africa) ────────────────────────────────────
export const MEA_INDICES = [
  { symbol: "^TASI.SR", name: "Tadawul (Saudi Arabia)", country: "Saudi Arabia", exchange: "Tadawul", id: "tadawul" },
  { symbol: "^DFMGI",   name: "DFM General Index",      country: "UAE (Dubai)",   exchange: "DFM", id: "dfm" },
  { symbol: "^ADI",     name: "ADX General Index",      country: "UAE (Abu Dhabi)", exchange: "ADX", id: "adx" },
  { symbol: "^QSI",     name: "Qatar SE General Index", country: "Qatar",         exchange: "QSE", id: "qsi" },
  { symbol: "^TA125.TA", name: "Tel Aviv 125",          country: "Israel",        exchange: "TASE", id: "ta125" },
  { symbol: "EGX30.CA", name: "EGX 30",                 country: "Egypt",         exchange: "EGX", id: "egx30" },
];

// All global indices combined
export const GLOBAL_INDICES = [...US_INDICES, ...EUROPE_INDICES, ...ASIA_INDICES, ...MEA_INDICES];

// ─── CRYPTO ───────────────────────────────────────────────────────────────────
export const CRYPTO_LIST = [
  { id: "bitcoin",          symbol: "BTC",   name: "Bitcoin" },
  { id: "ethereum",         symbol: "ETH",   name: "Ethereum" },
  { id: "tether",           symbol: "USDT",  name: "Tether" },
  { id: "binancecoin",      symbol: "BNB",   name: "BNB" },
  { id: "solana",           symbol: "SOL",   name: "Solana" },
  { id: "ripple",           symbol: "XRP",   name: "XRP" },
  { id: "usd-coin",         symbol: "USDC",  name: "USD Coin" },
  { id: "staked-ether",     symbol: "STETH", name: "Lido Staked ETH" },
  { id: "cardano",          symbol: "ADA",   name: "Cardano" },
  { id: "avalanche-2",      symbol: "AVAX",  name: "Avalanche" },
  { id: "dogecoin",         symbol: "DOGE",  name: "Dogecoin" },
  { id: "tron",             symbol: "TRX",   name: "TRON" },
  { id: "polkadot",         symbol: "DOT",   name: "Polkadot" },
  { id: "matic-network",    symbol: "MATIC", name: "Polygon" },
  { id: "shiba-inu",        symbol: "SHIB",  name: "Shiba Inu" },
  { id: "chainlink",        symbol: "LINK",  name: "Chainlink" },
  { id: "litecoin",         symbol: "LTC",   name: "Litecoin" },
  { id: "uniswap",          symbol: "UNI",   name: "Uniswap" },
  { id: "cosmos",           symbol: "ATOM",  name: "Cosmos" },
  { id: "stellar",          symbol: "XLM",   name: "Stellar" },
  { id: "internet-computer", symbol: "ICP",  name: "Internet Computer" },
  { id: "aptos",            symbol: "APT",   name: "Aptos" },
  { id: "optimism",         symbol: "OP",    name: "Optimism" },
  { id: "arbitrum",         symbol: "ARB",   name: "Arbitrum" },
  { id: "near",             symbol: "NEAR",  name: "NEAR Protocol" },
  { id: "bitcoin-cash",     symbol: "BCH",   name: "Bitcoin Cash" },
  { id: "filecoin",         symbol: "FIL",   name: "Filecoin" },
  { id: "hedera-hashgraph", symbol: "HBAR",  name: "Hedera" },
  { id: "vechain",          symbol: "VET",   name: "VeChain" },
  { id: "the-graph",        symbol: "GRT",   name: "The Graph" },
];

// ─── FOREX PAIRS ──────────────────────────────────────────────────────────────
export const FOREX_PAIRS = [
  { id: "usd-to-inr",  symbol: "USDINR=X",  base: "USD", quote: "INR", name: "US Dollar to Indian Rupee" },
  { id: "eur-to-inr",  symbol: "EURINR=X",  base: "EUR", quote: "INR", name: "Euro to Indian Rupee" },
  { id: "gbp-to-inr",  symbol: "GBPINR=X",  base: "GBP", quote: "INR", name: "British Pound to Indian Rupee" },
  { id: "jpy-to-inr",  symbol: "JPYINR=X",  base: "JPY", quote: "INR", name: "Japanese Yen to Indian Rupee" },
  { id: "aud-to-inr",  symbol: "AUDINR=X",  base: "AUD", quote: "INR", name: "Australian Dollar to Indian Rupee" },
  { id: "cad-to-inr",  symbol: "CADINR=X",  base: "CAD", quote: "INR", name: "Canadian Dollar to Indian Rupee" },
  { id: "chf-to-inr",  symbol: "CHFINR=X",  base: "CHF", quote: "INR", name: "Swiss Franc to Indian Rupee" },
  { id: "sgd-to-inr",  symbol: "SGDINR=X",  base: "SGD", quote: "INR", name: "Singapore Dollar to Indian Rupee" },
  { id: "aed-to-inr",  symbol: "AEDINR=X",  base: "AED", quote: "INR", name: "UAE Dirham to Indian Rupee" },
  { id: "sar-to-inr",  symbol: "SARINR=X",  base: "SAR", quote: "INR", name: "Saudi Riyal to Indian Rupee" },
  { id: "hkd-to-inr",  symbol: "HKDINR=X",  base: "HKD", quote: "INR", name: "Hong Kong Dollar to Indian Rupee" },
  { id: "cny-to-inr",  symbol: "CNYINR=X",  base: "CNY", quote: "INR", name: "Chinese Yuan to Indian Rupee" },
  { id: "myr-to-inr",  symbol: "MYRINR=X",  base: "MYR", quote: "INR", name: "Malaysian Ringgit to Indian Rupee" },
  { id: "nzd-to-inr",  symbol: "NZDINR=X",  base: "NZD", quote: "INR", name: "New Zealand Dollar to Indian Rupee" },
  { id: "krw-to-inr",  symbol: "KRWINR=X",  base: "KRW", quote: "INR", name: "South Korean Won to Indian Rupee" },
  { id: "try-to-inr",  symbol: "TRYINR=X",  base: "TRY", quote: "INR", name: "Turkish Lira to Indian Rupee" },
  // ─── GLOBAL MAJORS ──────────────────────────────────────────────────────────
  { id: "eur-to-usd",  symbol: "EURUSD=X",  base: "EUR", quote: "USD", name: "Euro to US Dollar" },
  { id: "usd-to-jpy",  symbol: "USDJPY=X",  base: "USD", quote: "JPY", name: "US Dollar to Japanese Yen" },
  { id: "gbp-to-usd",  symbol: "GBPUSD=X",  base: "GBP", quote: "USD", name: "British Pound to US Dollar" },
  { id: "aud-to-usd",  symbol: "AUDUSD=X",  base: "AUD", quote: "USD", name: "Australian Dollar to US Dollar" },
  { id: "usd-to-cad",  symbol: "USDCAD=X",  base: "USD", quote: "CAD", name: "US Dollar to Canadian Dollar" },
  { id: "usd-to-chf",  symbol: "USDCHF=X",  base: "USD", quote: "CHF", name: "US Dollar to Swiss Franc" },
  { id: "nzd-to-usd",  symbol: "NZDUSD=X",  base: "NZD", quote: "USD", name: "New Zealand Dollar to US Dollar" },
  // ─── GLOBAL CROSSES ─────────────────────────────────────────────────────────
  { id: "eur-to-gbp",  symbol: "EURGBP=X",  base: "EUR", quote: "GBP", name: "Euro to British Pound" },
  { id: "eur-to-jpy",  symbol: "EURJPY=X",  base: "EUR", quote: "JPY", name: "Euro to Japanese Yen" },
  { id: "gbp-to-jpy",  symbol: "GBPJPY=X",  base: "GBP", quote: "JPY", name: "British Pound to Japanese Yen" },
  { id: "eur-to-aud",  symbol: "EURAUD=X",  base: "EUR", quote: "AUD", name: "Euro to Australian Dollar" },
];

// ─── COMMODITIES ──────────────────────────────────────────────────────────────
export const COMMODITIES = [
  {
    id: "gold",
    symbol: "GC=F",
    name: "Gold (24K)",
    shortName: "Gold",
    unit: "10g",
    unitLabel: "per 10 grams",
    factor: 0.3215,          // troy oz → 10g: 1 oz = 31.1g → 10g = 10/31.1035 oz
    exchange: "MCX / COMEX",
    description: "Gold is the world's most traded precious metal and a key safe-haven asset. MCX India gold price is estimated from COMEX spot rate converted to INR, including approximate import duty.",
    color: "#f59e0b",
    relatedSymbols: ["GC=F", "SI=F", "PL=F"],
  },
  {
    id: "silver",
    symbol: "SI=F",
    name: "Silver",
    shortName: "Silver",
    unit: "1kg",
    unitLabel: "per kilogram",
    factor: 32.1507,         // troy oz → kg: 1 kg = 32.1507 oz
    exchange: "MCX / COMEX",
    description: "Silver is a widely-traded precious and industrial metal. MCX India silver price is estimated from COMEX spot rate converted to INR, including approximate duties and charges.",
    color: "#94a3b8",
    relatedSymbols: ["SI=F", "GC=F", "HG=F"],
  },
  {
    id: "crude-oil",
    symbol: "CL=F",
    name: "Crude Oil (WTI)",
    shortName: "Crude Oil",
    unit: "Barrel",
    unitLabel: "per barrel",
    factor: 1,               // price is already per barrel
    exchange: "MCX / NYMEX",
    description: "West Texas Intermediate (WTI) crude oil is the primary global oil benchmark. MCX crude oil price in India closely tracks the WTI rate, converted to INR per barrel.",
    color: "#3b82f6",
    relatedSymbols: ["CL=F", "BZ=F", "NG=F"],
  },
  {
    id: "brent-oil",
    symbol: "BZ=F",
    name: "Brent Crude Oil",
    shortName: "Brent Crude",
    unit: "Barrel",
    unitLabel: "per barrel",
    factor: 1,
    exchange: "ICE / MCX",
    description: "Brent Crude is the international oil price benchmark, sourced from the North Sea. It is used as the pricing standard for roughly two-thirds of global crude oil trading.",
    color: "#6366f1",
    relatedSymbols: ["BZ=F", "CL=F", "NG=F"],
  },
  {
    id: "natural-gas",
    symbol: "NG=F",
    name: "Natural Gas",
    shortName: "Nat. Gas",
    unit: "MMBtu",
    unitLabel: "per MMBtu",
    factor: 1,
    exchange: "MCX / NYMEX",
    description: "Natural Gas is a key energy commodity traded globally. MCX natural gas price in India is derived from NYMEX rates converted to INR per MMBtu.",
    color: "#10b981",
    relatedSymbols: ["NG=F", "CL=F", "BZ=F"],
  },
  {
    id: "platinum",
    symbol: "PL=F",
    name: "Platinum",
    shortName: "Platinum",
    unit: "10g",
    unitLabel: "per 10 grams",
    factor: 0.3215,
    exchange: "MCX / NYMEX",
    description: "Platinum is rarer than gold and used heavily in automotive catalytic converters and jewellery. MCX India platinum price is estimated from NYMEX spot rate converted to INR.",
    color: "#e2e8f0",
    relatedSymbols: ["PL=F", "GC=F", "SI=F"],
  },
  {
    id: "copper",
    symbol: "HG=F",
    name: "Copper",
    shortName: "Copper",
    unit: "kg",
    unitLabel: "per kilogram",
    factor: 2.2046,          // lbs → kg: 1 lb = 0.4536 kg → price per lb × 2.2046 = price per kg
    exchange: "MCX / COMEX",
    description: "Copper is an industrial metal closely tied to global economic activity. MCX India copper price is estimated from COMEX spot rate (USD/lb) converted to INR per kg.",
    color: "#f97316",
    relatedSymbols: ["HG=F", "CL=F", "GC=F"],
  },
  {
    id: "aluminum",
    symbol: "ALI=F",
    name: "Aluminum",
    shortName: "Aluminum",
    unit: "kg",
    unitLabel: "per kilogram",
    factor: 2.2046,
    exchange: "MCX / LME",
    description: "Aluminum is a lightweight metal essential for aerospace, packaging, and construction. MCX India aluminum price tracks global LME benchmarks.",
    color: "#94a3b8",
    relatedSymbols: ["ALI=F", "HG=F", "ZNC=F"],
  },
  {
    id: "zinc",
    symbol: "ZNC=F",
    name: "Zinc",
    shortName: "Zinc",
    unit: "kg",
    unitLabel: "per kilogram",
    factor: 2.2046,
    exchange: "MCX / LME",
    description: "Zinc is primarily used for galvanizing steel to prevent corrosion. MCX India zinc price is influenced by LME spot and future rates.",
    color: "#64748b",
    relatedSymbols: ["ZNC=F", "LED=F", "HG=F"],
  },
  {
    id: "lead",
    symbol: "LED=F",
    name: "Lead",
    shortName: "Lead",
    unit: "kg",
    unitLabel: "per kilogram",
    factor: 2.2046,
    exchange: "MCX / LME",
    description: "Lead is widely used in batteries and radiation shielding. MCX India lead prices track international benchmarks in INR per kg.",
    color: "#475569",
    relatedSymbols: ["LED=F", "ZNC=F", "ALI=F"],
  },
  {
    id: "nickel",
    symbol: "NI=F",
    name: "Nickel",
    shortName: "Nickel",
    unit: "kg",
    unitLabel: "per kilogram",
    factor: 2.2046,
    exchange: "MCX / LME",
    description: "Nickel is a critical component in stainless steel and EV batteries. MCX nickel prices follow international LME trends.",
    color: "#1e293b",
    relatedSymbols: ["NI=F", "ALI=F", "HG=F"],
  },
  {
    id: "cotton",
    symbol: "CT=F",
    name: "Cotton",
    shortName: "Cotton",
    unit: "Bale",
    unitLabel: "per bale",
    factor: 1,
    exchange: "MCX / ICE",
    description: "Cotton is a major agricultural commodity. MCX India cotton prices are influenced by global ICE cotton futures and local harvest conditions.",
    color: "#f8fafc",
    relatedSymbols: ["CT=F", "CPO=F", "JR=F"],
  },
  {
    id: "cpo",
    symbol: "CPO=F",
    name: "Crude Palm Oil",
    shortName: "CPO",
    unit: "10kg",
    unitLabel: "per 10 kg",
    factor: 1,
    exchange: "MCX / BMD",
    description: "Crude Palm Oil (CPO) is the most widely consumed vegetable oil. MCX India CPO prices track BMD (Malaysia) benchmarks.",
    color: "#ea580c",
    relatedSymbols: ["CPO=F", "CT=F", "NG=F"],
  },
  {
    id: "rubber",
    symbol: "JR=F",
    name: "Rubber",
    shortName: "Rubber",
    unit: "kg",
    unitLabel: "per kilogram",
    factor: 1,
    exchange: "MCX / JPX",
    description: "Natural Rubber is vital for the tire and automotive industries. MCX India rubber prices are influenced by global benchmarks and local production.",
    color: "#0f172a",
    relatedSymbols: ["JR=F", "CT=F", "HG=F"],
  },
];
