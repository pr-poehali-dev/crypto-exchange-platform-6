import { CRYPTO_ASSETS, formatUSD } from "@/lib/crypto-data";

const TickerBar = () => {
  const items = [...CRYPTO_ASSETS, ...CRYPTO_ASSETS];

  return (
    <div className="border-b border-border bg-card/50 overflow-hidden h-8 flex items-center">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((asset, i) => (
          <div key={`${asset.id}-${i}`} className="flex items-center gap-1.5 px-4 text-[11px]">
            <span style={{ color: asset.color }}>{asset.icon}</span>
            <span className="font-medium text-foreground">{asset.symbol}</span>
            <span className="text-muted-foreground tabular-nums">{formatUSD(asset.price)}</span>
            <span className={`font-medium ${asset.change24h >= 0 ? "text-success" : "text-danger"}`}>
              {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
