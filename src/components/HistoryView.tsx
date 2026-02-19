import { useState } from "react";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { MOCK_TRANSACTIONS, formatUSD } from "@/lib/crypto-data";

const TYPE_CONFIG = {
  buy: { label: "Покупка", icon: "ArrowDownLeft", color: "text-success", bg: "bg-success/10" },
  sell: { label: "Продажа", icon: "ArrowUpRight", color: "text-danger", bg: "bg-danger/10" },
  deposit: { label: "Пополнение", icon: "Plus", color: "text-blue-400", bg: "bg-blue-500/10" },
  withdraw: { label: "Вывод", icon: "Minus", color: "text-warning", bg: "bg-warning/10" },
  transfer: { label: "Перевод", icon: "ArrowRight", color: "text-purple-400", bg: "bg-purple-500/10" },
} as const;

const STATUS_CONFIG = {
  completed: { label: "Выполнен", variant: "default" as const },
  pending: { label: "В обработке", variant: "secondary" as const },
  failed: { label: "Отклонён", variant: "destructive" as const },
};

const HistoryView = () => {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all"
    ? MOCK_TRANSACTIONS
    : MOCK_TRANSACTIONS.filter((t) => t.type === filter);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">История</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Все ваши операции</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "Все" },
          { id: "buy", label: "Покупки" },
          { id: "sell", label: "Продажи" },
          { id: "deposit", label: "Пополнения" },
          { id: "withdraw", label: "Выводы" },
          { id: "transfer", label: "Переводы" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              filter === f.id
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map((tx) => {
            const cfg = TYPE_CONFIG[tx.type];
            const status = STATUS_CONFIG[tx.status];
            return (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors">
                <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={cfg.icon} size={16} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{cfg.label}</p>
                    <Badge variant={status.variant} className="text-[10px] h-5">
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {tx.amount} {tx.asset} · {tx.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold tabular-nums ${
                    tx.type === "buy" || tx.type === "deposit" ? "text-success" : "text-foreground"
                  }`}>
                    {tx.type === "sell" || tx.type === "withdraw" ? "-" : "+"}{formatUSD(tx.total)}
                  </p>
                  {tx.type !== "deposit" && tx.type !== "withdraw" && (
                    <p className="text-[10px] text-muted-foreground">@ {formatUSD(tx.price)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Icon name="Inbox" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Нет операций</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryView;
