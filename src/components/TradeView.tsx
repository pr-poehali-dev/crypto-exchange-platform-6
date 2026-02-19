import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import PriceChart from "@/components/PriceChart";
import { CRYPTO_ASSETS, formatUSD, formatNumber, generatePriceHistory } from "@/lib/crypto-data";
import type { CryptoAsset } from "@/lib/crypto-data";

const TradeView = () => {
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset>(CRYPTO_ASSETS[0]);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState("market");

  const priceHistory = useMemo(() => generatePriceHistory(selectedAsset.price), [selectedAsset.id]);
  const total = amount ? parseFloat(amount) * selectedAsset.price : 0;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Торговля</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Покупка и продажа криптовалют</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Рынок открыт
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1">
        <div className="flex gap-2 pb-2 min-w-max">
          {CRYPTO_ASSETS.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all whitespace-nowrap ${
                selectedAsset.id === asset.id
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card hover:border-border hover:bg-secondary/50"
              }`}
            >
              <span className="text-lg" style={{ color: asset.color }}>{asset.icon}</span>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground">{asset.symbol}</p>
                <p className="text-[10px] text-muted-foreground">{formatUSD(asset.price)}</p>
              </div>
              <span className={`text-[10px] font-medium ${asset.change24h >= 0 ? "text-success" : "text-danger"}`}>
                {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" style={{ color: selectedAsset.color }}>{selectedAsset.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{selectedAsset.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedAsset.symbol}/USDT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground tabular-nums">{formatUSD(selectedAsset.price)}</p>
              <p className={`text-sm font-medium ${selectedAsset.change24h >= 0 ? "text-success" : "text-danger"}`}>
                {selectedAsset.change24h >= 0 ? "+" : ""}{selectedAsset.change24h}%
                <span className="text-muted-foreground ml-2 text-xs">24ч</span>
              </p>
            </div>
          </div>

          <div className="h-48 w-full mb-4">
            <PriceChart
              data={priceHistory}
              color={selectedAsset.change24h >= 0 ? "hsl(142, 71%, 45%)" : "hsl(0, 72%, 51%)"}
              width={700}
              height={180}
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Объём 24ч", value: formatUSD(selectedAsset.volume24h) },
              { label: "Капитализация", value: formatUSD(selectedAsset.marketCap) },
              { label: "Макс 24ч", value: formatUSD(selectedAsset.price * 1.02) },
              { label: "Мин 24ч", value: formatUSD(selectedAsset.price * 0.97) },
            ].map((stat) => (
              <div key={stat.label} className="bg-secondary/50 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                <p className="text-sm font-semibold text-foreground mt-1 tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as "buy" | "sell")} className="mb-4">
            <TabsList className="w-full bg-secondary">
              <TabsTrigger value="buy" className="flex-1 data-[state=active]:bg-success data-[state=active]:text-black">
                Купить
              </TabsTrigger>
              <TabsTrigger value="sell" className="flex-1 data-[state=active]:bg-danger data-[state=active]:text-white">
                Продать
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            <div className="flex gap-2">
              {["market", "limit"].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                    orderType === type
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type === "market" ? "Рыночный" : "Лимитный"}
                </button>
              ))}
            </div>

            {orderType === "limit" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Цена (USDT)</label>
                <Input
                  type="number"
                  placeholder={selectedAsset.price.toString()}
                  className="bg-secondary border-border text-foreground"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Количество ({selectedAsset.symbol})</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {["25%", "50%", "75%", "100%"].map((pct) => (
                <button
                  key={pct}
                  className="py-1.5 text-[10px] font-medium text-muted-foreground bg-secondary rounded hover:text-foreground transition-colors"
                >
                  {pct}
                </button>
              ))}
            </div>

            <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Цена</span>
                <span className="text-foreground tabular-nums">{formatUSD(selectedAsset.price)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Комиссия (0.1%)</span>
                <span className="text-foreground tabular-nums">{formatUSD(total * 0.001)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Итого</span>
                <span className="text-foreground font-bold tabular-nums">{formatUSD(total)}</span>
              </div>
            </div>

            <Button
              className={`w-full font-semibold ${
                tradeType === "buy"
                  ? "bg-success hover:bg-success/90 text-black"
                  : "bg-danger hover:bg-danger/90 text-white"
              }`}
            >
              <Icon name={tradeType === "buy" ? "ArrowDownLeft" : "ArrowUpRight"} size={16} />
              {tradeType === "buy" ? "Купить" : "Продать"} {selectedAsset.symbol}
            </Button>

            <p className="text-[10px] text-center text-muted-foreground">
              Баланс: {formatUSD(12847.53)} USDT
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Книга ордеров</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wide mb-2 px-2">
              <span>Цена (USDT)</span>
              <span>Объём ({selectedAsset.symbol})</span>
            </div>
            {Array.from({ length: 6 }).map((_, i) => {
              const price = selectedAsset.price * (1 - (i + 1) * 0.001);
              const vol = Math.random() * 2 + 0.1;
              const width = 20 + Math.random() * 80;
              return (
                <div key={`bid-${i}`} className="relative flex justify-between px-2 py-1 text-xs tabular-nums">
                  <div className="absolute inset-y-0 right-0 bg-success/8 rounded-sm" style={{ width: `${width}%` }} />
                  <span className="text-success relative z-10">{formatNumber(price, 2)}</span>
                  <span className="text-foreground relative z-10">{formatNumber(vol, 4)}</span>
                </div>
              );
            })}
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wide mb-2 px-2">
              <span>Цена (USDT)</span>
              <span>Объём ({selectedAsset.symbol})</span>
            </div>
            {Array.from({ length: 6 }).map((_, i) => {
              const price = selectedAsset.price * (1 + (i + 1) * 0.001);
              const vol = Math.random() * 2 + 0.1;
              const width = 20 + Math.random() * 80;
              return (
                <div key={`ask-${i}`} className="relative flex justify-between px-2 py-1 text-xs tabular-nums">
                  <div className="absolute inset-y-0 right-0 bg-danger/8 rounded-sm" style={{ width: `${width}%` }} />
                  <span className="text-danger relative z-10">{formatNumber(price, 2)}</span>
                  <span className="text-foreground relative z-10">{formatNumber(vol, 4)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TradeView;
