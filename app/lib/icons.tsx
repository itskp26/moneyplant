import {
  Building2,
  Zap,
  Shield,
  CircleDot,
  Car,
  Gem,
  Library,
  Cpu,
  Settings,
  Leaf,
  HardHat,
  Mountain,
  Monitor,
  Activity,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Flame,
  Globe,
  BarChart3,
  BarChart2,
  PieChart,
  Calculator,
  LineChart,
  Percent,
  Award,
  Droplets,
  FileText,
  Bitcoin,
  RefreshCw,
  Share2,
  Play,
  Camera,
  Users,
  Landmark,
  Factory,
  Bike,
  Tractor,
  Construction,
  Home,
  Briefcase,
  Newspaper,
} from "lucide-react";

export const ICON_MAP = {
  // Conglomerates
  adani: Factory,
  reliance: Zap,
  tata: Globe,
  bajaj: Bike,
  mahindra: Tractor,
  birla: Factory,
  hdfc: Landmark,
  icici: Landmark,
  sbi: Landmark,
  lt: Construction,
  itc: Leaf,
  jsw: HardHat,
  vedanta: Mountain,
  godrej: Home,

  // Sectors
  it: Monitor,
  pharma: Activity,
  auto: Car,
  banking: Landmark,
  fmcg: ShoppingBag,
  psu: Building2,
  realty: Construction,

  // Markets
  india: Zap,
  global: Globe,
  gainers: TrendingUp,
  losers: TrendingDown,
  active: Flame,

  // Commodities
  gold: Award,
  silver: Award,
  oil: Droplets,

  // Indices
  nifty: BarChart2,
  sensex: LineChart,
  banknifty: Landmark,
  itindex: Monitor,

  // Tools/Misc
  ipo: FileText,
  crypto: Bitcoin,
  forex: RefreshCw,
  sip: PieChart,
  emi: Calculator,
  news: Newspaper,
} as const;

export const BRAND_LOGOS: Record<string, string> = {
  // Conglomerates
  adani: "adani.com",
  reliance: "ril.com",
  tata: "tata.com",
  bajaj: "bajajfinserv.in",
  mahindra: "mahindra.com",
  birla: "adityabirla.com",
  aditya: "adityabirla.com",
  hdfc: "hdfcbank.com",
  icici: "icicibank.com",
  sbi: "sbi.co.in",
  lt: "larsentoubro.com",
  itc: "itcportal.com",
  jsw: "jsw.in",
  vedanta: "vedantalimited.com",
  godrej: "godrej.com",

  // Commodities
  gold: "https://img.icons8.com/color/512/gold-bars.png",
  silver: "https://img.icons8.com/color/512/silver-bars.png",
  "crude-oil": "https://img.icons8.com/color/512/oil-industry.png",

  // Indices
  "nifty-50": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/National_Stock_Exchange_of_India_logo.svg/200px-National_Stock_Exchange_of_India_logo.svg.png",
  sensex: "https://upload.wikimedia.org/wikipedia/en/f/f7/Bombay_Stock_Exchange_logo.png",
  "bank-nifty": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/National_Stock_Exchange_of_India_logo.svg/200px-National_Stock_Exchange_of_India_logo.svg.png",
  "nifty-it": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/National_Stock_Exchange_of_India_logo.svg/200px-National_Stock_Exchange_of_India_logo.svg.png",
  "nifty-midcap-100": "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/National_Stock_Exchange_of_India_logo.svg/200px-National_Stock_Exchange_of_India_logo.svg.png",

  // Crypto
  bitcoin: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  ethereum: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  solana: "https://cryptologos.cc/logos/solana-sol-logo.png",
};

export function getBrandLogo(key: string): string | null {
  const k = key.toLowerCase();
  const val = BRAND_LOGOS[k];
  if (!val) return null;
  if (val.startsWith("http")) return val; // Direct URL for assets
  return `https://logos.hunter.io/${val}`; // Hunter API for domains
}

export type IconKey = keyof typeof ICON_MAP;

export const SOCIAL_ICONS = {
  twitter: Share2,
  youtube: Play,
  instagram: Camera,
  linkedin: Users,
} as const;
