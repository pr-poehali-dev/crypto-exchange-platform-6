import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const ProfileView = () => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">Профиль</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Настройки аккаунта</p>
      </div>

      <Card className="p-5 bg-card border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="User" size={28} className="text-muted-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground">Трейдер #48291</h3>
              <Badge className="bg-success/10 text-success border-0 text-[10px]">Верифицирован</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Зарегистрирован 15 января 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
            <Input value="trader48291@mail.ru" readOnly className="bg-secondary border-border text-foreground" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Телефон</label>
            <Input value="+7 (999) ***-**-42" readOnly className="bg-secondary border-border text-foreground" />
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Shield" size={16} className="text-primary" />
          Безопасность
        </h3>
        <div className="space-y-4">
          {[
            { label: "Двухфакторная аутентификация", desc: "Google Authenticator", enabled: true, icon: "Smartphone" },
            { label: "Email-уведомления", desc: "О входах и транзакциях", enabled: true, icon: "Mail" },
            { label: "Anti-phishing код", desc: "Проверка подлинности писем", enabled: false, icon: "Lock" },
            { label: "Белый список адресов", desc: "Вывод только на проверенные адреса", enabled: false, icon: "ListChecks" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name={item.icon} size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Switch checked={item.enabled} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="BarChart3" size={16} className="text-primary" />
          Торговая статистика
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Всего сделок", value: "147" },
            { label: "Успешных", value: "89 (60.5%)" },
            { label: "Объём торгов", value: "$48,291" },
            { label: "Уровень", value: "Silver" },
          ].map((stat) => (
            <div key={stat.label} className="bg-secondary/50 rounded-lg p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              <p className="text-sm font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
          <Icon name="Download" size={14} />
          Экспорт данных
        </Button>
        <Button variant="outline" className="border-danger/30 text-danger hover:bg-danger/10">
          <Icon name="LogOut" size={14} />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;
