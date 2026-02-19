import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const FAQ = [
  { q: "Как пополнить баланс?", a: "Перейдите в раздел «Вывод» → «Пополнение». Поддерживаются переводы в USDT через TRC-20, ERC-20 и BEP-20 сети." },
  { q: "Какая комиссия за торговлю?", a: "Комиссия составляет 0.1% от суммы сделки. Для VIP-уровней предусмотрены скидки до 0.02%." },
  { q: "Сколько времени занимает вывод?", a: "Обработка заявки — до 30 минут. Зачисление зависит от сети: TRC-20 — 1-5 мин, ERC-20 — 5-15 мин." },
  { q: "Как повысить лимиты?", a: "Пройдите верификацию (KYC) второго уровня в разделе «Профиль». Лимит вывода увеличится до $100,000/день." },
];

const TICKETS = [
  { id: "T-1024", subject: "Задержка вывода BTC", status: "open", date: "19.02.2026" },
  { id: "T-1019", subject: "Вопрос по верификации", status: "closed", date: "17.02.2026" },
];

const SupportView = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">Поддержка</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Помощь и обратная связь</p>
      </div>

      <Card className="p-5 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="HelpCircle" size={16} className="text-primary" />
          Частые вопросы
        </h3>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                {item.q}
                <Icon
                  name="ChevronDown"
                  size={14}
                  className={`text-muted-foreground transition-transform ${expandedFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-3 text-xs text-muted-foreground leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Ticket" size={16} className="text-primary" />
          Мои обращения
        </h3>
        {TICKETS.length > 0 ? (
          <div className="space-y-2">
            {TICKETS.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between px-4 py-3 bg-secondary/30 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">{ticket.id}</span>
                    <Badge
                      variant={ticket.status === "open" ? "default" : "secondary"}
                      className="text-[10px] h-5"
                    >
                      {ticket.status === "open" ? "Открыт" : "Закрыт"}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground mt-1">{ticket.subject}</p>
                </div>
                <span className="text-xs text-muted-foreground">{ticket.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">Нет обращений</p>
        )}
      </Card>

      <Card className="p-5 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Send" size={16} className="text-primary" />
          Новое обращение
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Тема</label>
            <Input
              placeholder="Опишите проблему кратко..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-secondary border-border text-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Сообщение</label>
            <Textarea
              placeholder="Подробно опишите вашу проблему..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="bg-secondary border-border text-foreground resize-none"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Icon name="Send" size={14} />
            Отправить
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SupportView;
