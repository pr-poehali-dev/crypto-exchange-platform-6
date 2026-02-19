import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { CRYPTO_ASSETS, formatUSD } from "@/lib/crypto-data";

const WithdrawView = () => {
  const [mode, setMode] = useState<"withdraw" | "transfer">("withdraw");
  const [selectedCrypto, setSelectedCrypto] = useState("USDT");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [address, setAddress] = useState("");
  const [recipientId, setRecipientId] = useState("");

  const balance = 12847.53;

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">Вывод и переводы</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Управление средствами</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Wallet" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Доступно к выводу</span>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{formatUSD(balance)}</p>
          <p className="text-xs text-muted-foreground mt-1">USDT</p>
        </Card>
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-xs text-muted-foreground">На обработке</span>
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{formatUSD(1000)}</p>
          <p className="text-xs text-muted-foreground mt-1">1 заявка</p>
        </Card>
      </div>

      <Card className="p-5 bg-card border-border">
        <Tabs value={mode} onValueChange={(v) => setMode(v as "withdraw" | "transfer")} className="mb-5">
          <TabsList className="w-full bg-secondary">
            <TabsTrigger value="withdraw" className="flex-1">
              <Icon name="ArrowUpRight" size={14} className="mr-1.5" />
              Вывести
            </TabsTrigger>
            <TabsTrigger value="transfer" className="flex-1">
              <Icon name="ArrowRight" size={14} className="mr-1.5" />
              Перевести
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {mode === "withdraw" ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Валюта</label>
              <div className="grid grid-cols-4 gap-2">
                {["USDT", "BTC", "ETH", "SOL"].map((crypto) => (
                  <button
                    key={crypto}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${
                      selectedCrypto === crypto
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "bg-secondary text-muted-foreground border border-transparent hover:text-foreground"
                    }`}
                  >
                    {crypto}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Сеть</label>
              <div className="grid grid-cols-3 gap-2">
                {["TRC-20", "ERC-20", "BEP-20"].map((net) => (
                  <button
                    key={net}
                    className="py-2 rounded-lg text-xs font-medium bg-secondary text-muted-foreground hover:text-foreground transition-colors border border-transparent first:border-primary/30 first:bg-primary/10 first:text-primary"
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Адрес кошелька</label>
              <Input
                placeholder="Введите адрес..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-secondary border-border text-foreground font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Сумма ({selectedCrypto})</label>
              <Input
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-muted-foreground">Комиссия: 1 USDT</span>
                <button className="text-[10px] text-primary hover:underline">Максимум</button>
              </div>
            </div>

            <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 flex gap-2">
              <Icon name="AlertTriangle" size={14} className="text-warning flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-warning/80">
                Проверьте адрес и сеть перед выводом. Средства, отправленные на неверный адрес, не подлежат возврату.
              </p>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Icon name="ArrowUpRight" size={16} />
              Вывести средства
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">ID получателя</label>
              <Input
                placeholder="Например: #48291"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Сумма (USDT)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Комиссия</span>
                <span className="text-success font-medium">Бесплатно</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Время</span>
                <span className="text-foreground">Мгновенно</span>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Icon name="ArrowRight" size={16} />
              Перевести
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WithdrawView;
