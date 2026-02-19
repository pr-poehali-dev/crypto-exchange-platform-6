import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import PriceChart from "@/components/PriceChart";
import { MOCK_PORTFOLIO, formatUSD, generatePriceHistory } from "@/lib/crypto-data";

const PortfolioView = () => {
  const totalValue = MOCK_PORTFOLIO.reduce((sum, item) => sum + item.amount * item.asset.price, 0);
  const totalCost = MOCK_PORTFOLIO.reduce((sum, item) => sum + item.amount * item.avgBuyPrice, 0);
  const totalPnL = totalValue - totalCost;
  const totalPnLPercent = (totalPnL / totalCost) * 100;
  const balanceUSDT = 12847.53;
  const totalBalance = totalValue + balanceUSDT;

  const portfolioHistory = useMemo(() => generatePriceHistory(totalBalance, 60), []);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">Портфель</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Обзор ваших активов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Wallet" size={16} className="text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Общий баланс</span>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{formatUSD(totalBalance)}</p>
          <p className={`text-xs font-medium mt-1 ${totalPnL >= 0 ? "text-success" : "text-danger"}`}>
            {totalPnL >= 0 ? "+" : ""}{formatUSD(totalPnL)} ({totalPnLPercent >= 0 ? "+" : ""}{totalPnLPercent.toFixed(2)}%)
          </p>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="Coins" size={16} className="text-warning" />
            </div>
            <span className="text-xs text-muted-foreground">В криптовалюте</span>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{formatUSD(totalValue)}</p>
          <p className="text-xs text-muted-foreground mt-1">{MOCK_PORTFOLIO.length} активов</p>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Icon name="DollarSign" size={16} className="text-blue-400" />
            </div>
            <span className="text-xs text-muted-foreground">Свободные средства</span>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{formatUSD(balanceUSDT)}</p>
          <p className="text-xs text-muted-foreground mt-1">USDT</p>
        </Card>
      </div>

      <Card className="p-5 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Динамика портфеля (30д)</h3>
        <div className="h-40 w-full">
          <PriceChart
            data={portfolioHistory}
            color={totalPnL >= 0 ? "hsl(142, 71%, 45%)" : "hsl(0, 72%, 51%)"}
            width={800}
            height={150}
          />
        </div>
      </Card>

      <Card className="bg-card border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Активы</h3>
        </div>
        <div className="divide-y divide-border">
          {MOCK_PORTFOLIO.map((item) => {
            const value = item.amount * item.asset.price;
            const cost = item.amount * item.avgBuyPrice;
            const pnl = value - cost;
            const pnlPercent = (pnl / cost) * 100;
            const history = generatePriceHistory(item.asset.price, 24);

            return (
              <div key={item.asset.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors">
                <span className="text-xl" style={{ color: item.asset.color }}>{item.asset.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.asset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.amount} {item.asset.symbol} · Ср. цена {formatUSD(item.avgBuyPrice)}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <PriceChart data={history} color={pnl >= 0 ? "hsl(142,71%,45%)" : "hsl(0,72%,51%)"} width={80} height={30} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground tabular-nums">{formatUSD(value)}</p>
                  <p className={`text-xs font-medium ${pnl >= 0 ? "text-success" : "text-danger"}`}>
                    {pnl >= 0 ? "+" : ""}{formatUSD(pnl)} ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(1)}%)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default PortfolioView;
