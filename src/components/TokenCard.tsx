
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  name: string;
  ticker: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image?: string;
}

export const TokenCard = ({
  name,
  ticker,
  price,
  change24h,
  volume24h,
  marketCap,
  image
}: TokenCardProps) => {
  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };
  
  const isPositiveChange = change24h >= 0;
  
  return (
    <Card className="token-card hover:scale-[1.02] transition-all duration-200 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            {image ? (
              <img src={image} alt={name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-bitcoin/20 flex items-center justify-center">
                <span className="text-bitcoin font-bold">{ticker.substring(0, 2)}</span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-white">{name}</h3>
              <p className="text-sm text-muted-foreground">{ticker}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-bold text-white">${price.toFixed(6)}</p>
            <p className={cn(
              "text-sm font-medium",
              isPositiveChange ? "text-green-500" : "text-red-500"
            )}>
              {isPositiveChange ? "+" : ""}{change24h.toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-muted-foreground">Volume (24h)</p>
            <p className="font-medium text-white">{formatNumber(volume24h)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="font-medium text-white">{formatNumber(marketCap)}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="w-full rounded-lg py-2 text-sm font-medium bg-bitcoin/10 text-bitcoin hover:bg-bitcoin/20 transition-colors">
            Trade {ticker}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
