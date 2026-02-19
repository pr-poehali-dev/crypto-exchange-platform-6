export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  icon: string;
  color: string;
}

export interface PortfolioItem {
  asset: CryptoAsset;
  amount: number;
  avgBuyPrice: number;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdraw" | "transfer";
  asset: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export const CRYPTO_ASSETS: CryptoAsset[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", price: 67432.18, change24h: -1.24, volume24h: 28_400_000_000, marketCap: 1_324_000_000_000, icon: "₿", color: "#F7931A" },
  { id: "eth", name: "Ethereum", symbol: "ETH", price: 3521.47, change24h: 2.18, volume24h: 15_200_000_000, marketCap: 423_000_000_000, icon: "Ξ", color: "#627EEA" },
  { id: "xrp", name: "Ripple", symbol: "XRP", price: 0.5234, change24h: -0.87, volume24h: 1_800_000_000, marketCap: 28_700_000_000, icon: "✕", color: "#00AAE4" },
  { id: "ltc", name: "Litecoin", symbol: "LTC", price: 84.12, change24h: 1.45, volume24h: 890_000_000, marketCap: 6_300_000_000, icon: "Ł", color: "#BFBBBB" },
  { id: "sol", name: "Solana", symbol: "SOL", price: 148.73, change24h: 4.32, volume24h: 3_400_000_000, marketCap: 65_000_000_000, icon: "◎", color: "#9945FF" },
  { id: "ada", name: "Cardano", symbol: "ADA", price: 0.4521, change24h: -2.11, volume24h: 620_000_000, marketCap: 16_000_000_000, icon: "₳", color: "#0033AD" },
  { id: "dot", name: "Polkadot", symbol: "DOT", price: 7.23, change24h: 0.67, volume24h: 340_000_000, marketCap: 9_800_000_000, icon: "●", color: "#E6007A" },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.0812, change24h: -3.45, volume24h: 1_100_000_000, marketCap: 11_500_000_000, icon: "Ð", color: "#C2A633" },
  { id: "avax", name: "Avalanche", symbol: "AVAX", price: 35.67, change24h: 1.89, volume24h: 780_000_000, marketCap: 13_200_000_000, icon: "▲", color: "#E84142" },
  { id: "matic", name: "Polygon", symbol: "MATIC", price: 0.7134, change24h: -0.23, volume24h: 450_000_000, marketCap: 7_100_000_000, icon: "⬡", color: "#8247E5" },
];

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  { asset: CRYPTO_ASSETS[0], amount: 0.0234, avgBuyPrice: 62100 },
  { asset: CRYPTO_ASSETS[1], amount: 1.45, avgBuyPrice: 3200 },
  { asset: CRYPTO_ASSETS[4], amount: 12.5, avgBuyPrice: 135.2 },
  { asset: CRYPTO_ASSETS[7], amount: 5000, avgBuyPrice: 0.092 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "buy", asset: "BTC", amount: 0.0234, price: 67432.18, total: 1577.91, date: "2026-02-19 14:32", status: "completed" },
  { id: "2", type: "sell", asset: "ETH", amount: 0.5, price: 3521.47, total: 1760.74, date: "2026-02-19 12:15", status: "completed" },
  { id: "3", type: "buy", asset: "SOL", amount: 5.0, price: 148.73, total: 743.65, date: "2026-02-18 22:45", status: "completed" },
  { id: "4", type: "deposit", asset: "USDT", amount: 5000, price: 1, total: 5000, date: "2026-02-18 10:00", status: "completed" },
  { id: "5", type: "withdraw", asset: "USDT", amount: 1000, price: 1, total: 1000, date: "2026-02-17 18:20", status: "pending" },
  { id: "6", type: "transfer", asset: "BTC", amount: 0.01, price: 67432.18, total: 674.32, date: "2026-02-17 09:10", status: "completed" },
  { id: "7", type: "buy", asset: "DOGE", amount: 5000, price: 0.0812, total: 406.0, date: "2026-02-16 15:33", status: "completed" },
  { id: "8", type: "sell", asset: "XRP", amount: 200, price: 0.5234, total: 104.68, date: "2026-02-16 11:05", status: "failed" },
];

export function formatUSD(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1000) return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(4)}`;
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function generatePriceHistory(basePrice: number, points = 48): number[] {
  const data: number[] = [];
  let price = basePrice * 0.97;
  for (let i = 0; i < points; i++) {
    const volatility = (Math.random() - 0.52) * basePrice * 0.008;
    price = Math.max(price + volatility, basePrice * 0.9);
    price = Math.min(price, basePrice * 1.1);
    data.push(price);
  }
  data[data.length - 1] = basePrice;
  return data;
}
