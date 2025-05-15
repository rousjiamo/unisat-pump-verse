
import { TokenCard } from "./TokenCard";

// Mock data for trending tokens
const trendingTokens = [
  {
    id: "1",
    name: "Bitcoin Frogs",
    ticker: "FROGS",
    price: 0.000452,
    change24h: 24.5,
    volume24h: 2450000,
    marketCap: 12500000,
  },
  {
    id: "2",
    name: "Sats Names",
    ticker: "SATS",
    price: 0.000128,
    change24h: -5.2,
    volume24h: 890000,
    marketCap: 4200000,
  },
  {
    id: "3",
    name: "Ordinal Punks",
    ticker: "PUNKS",
    price: 0.000315,
    change24h: 12.8,
    volume24h: 1200000,
    marketCap: 8900000,
  },
  {
    id: "4",
    name: "Bitmap",
    ticker: "BITMAP",
    price: 0.000089,
    change24h: 18.2,
    volume24h: 750000,
    marketCap: 3100000,
  },
  {
    id: "5",
    name: "Taproot Assets",
    ticker: "TAPR",
    price: 0.000245,
    change24h: -2.8,
    volume24h: 980000,
    marketCap: 6700000,
  },
  {
    id: "6",
    name: "Ordinals",
    ticker: "ORDI",
    price: 0.000572,
    change24h: 9.6,
    volume24h: 3200000,
    marketCap: 18500000,
  }
];

export const TrendingTokens = () => {
  return (
    <section id="tokens" className="py-16 container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Trending Tokens</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingTokens.map((token) => (
          <TokenCard
            key={token.id}
            name={token.name}
            ticker={token.ticker}
            price={token.price}
            change24h={token.change24h}
            volume24h={token.volume24h}
            marketCap={token.marketCap}
          />
        ))}
      </div>
    </section>
  );
};
