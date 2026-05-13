// ─── CoinGecko Crypto Fetcher ─────────────────────────────────────────────────
const CG_BASE = "https://api.coingecko.com/api/v3";

export interface CryptoQuote {
  id: string;
  symbol: string;
  name: string;
  image: string;
  priceInr: number;
  priceUsd: number;
  change24h: number;
  marketCapInr: number;
  volume24hInr: number;
  high24hInr: number;
  low24hInr: number;
  allTimeHighInr?: number;
  allTimeLowInr?: number;
  circulatingSupply?: number;
  totalSupply?: number;
  marketCapRank?: number;
}

export async function fetchCryptoList(ids?: string[]): Promise<CryptoQuote[]> {
  try {
    const idsParam = ids?.join(",") ?? "bitcoin,ethereum,tether,binancecoin,solana,ripple,usd-coin,cardano,avalanche-2,dogecoin,tron,polkadot,matic-network,shiba-inu,chainlink,litecoin,uniswap,cosmos,stellar,staked-ether";
    const url = `${CG_BASE}/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h&locale=en`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((c: Record<string, unknown>) => ({
      id: c.id as string,
      symbol: (c.symbol as string).toUpperCase(),
      name: c.name as string,
      image: c.image as string,
      priceInr: 0, 
      priceUsd: (c.current_price as number) ?? 0,
      change24h: (c.price_change_percentage_24h as number) ?? 0,
      marketCapInr: 0,
      volume24hInr: 0,
      high24hInr: 0,
      low24hInr: 0,
      allTimeHighInr: undefined,
      allTimeLowInr: undefined,
      circulatingSupply: (c.circulating_supply as number) ?? undefined,
      totalSupply: (c.total_supply as number) ?? undefined,
      marketCapRank: (c.market_cap_rank as number) ?? undefined,
    }));
  } catch {
    return [];
  }
}

export async function fetchCryptoDetail(coinId: string): Promise<CryptoQuote | null> {
  try {
    const url = `${CG_BASE}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    const c = await res.json();
    const md = c.market_data;
    return {
      id: c.id,
      symbol: c.symbol?.toUpperCase(),
      name: c.name,
      image: c.image?.large,
      priceInr: md?.current_price?.inr ?? 0,
      priceUsd: md?.current_price?.usd ?? 0,
      change24h: md?.price_change_percentage_24h ?? 0,
      marketCapInr: md?.market_cap?.inr ?? 0,
      volume24hInr: md?.total_volume?.inr ?? 0,
      high24hInr: md?.high_24h?.inr ?? 0,
      low24hInr: md?.low_24h?.inr ?? 0,
      allTimeHighInr: md?.ath?.inr ?? undefined,
      allTimeLowInr: md?.atl?.inr ?? undefined,
      circulatingSupply: md?.circulating_supply ?? undefined,
      totalSupply: md?.total_supply ?? undefined,
      marketCapRank: c.market_cap_rank ?? undefined,
    };
  } catch {
    return null;
  }
}
