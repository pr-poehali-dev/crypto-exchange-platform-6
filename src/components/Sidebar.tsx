import Icon from "@/components/ui/icon";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  username?: string;
  onLogout?: () => void;
}

const NAV_ITEMS = [
  { id: "trade", label: "Торговля", icon: "TrendingUp" },
  { id: "portfolio", label: "Портфель", icon: "PieChart" },
  { id: "history", label: "История", icon: "Clock" },
  { id: "withdraw", label: "Вывод", icon: "ArrowUpRight" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "support", label: "Поддержка", icon: "MessageCircle" },
];

const Sidebar = ({ activeTab, onTabChange, username, onLogout }: SidebarProps) => {
  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-foreground">CryptoVault</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Trading Terminal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === item.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon name={item.icon} size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="User" size={14} className="text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{username || "Пользователь"}</p>
            <p className="text-[10px] text-muted-foreground">Верифицирован</p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Выйти"
            >
              <Icon name="LogOut" size={14} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
