import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TickerBar from "@/components/TickerBar";
import TradeView from "@/components/TradeView";
import PortfolioView from "@/components/PortfolioView";
import HistoryView from "@/components/HistoryView";
import WithdrawView from "@/components/WithdrawView";
import ProfileView from "@/components/ProfileView";
import SupportView from "@/components/SupportView";
import AuthView from "@/components/AuthView";

export interface UserData {
  id: number;
  email: string;
  username: string;
}

export interface Balance {
  currency: string;
  amount: string;
}

const VIEWS: Record<string, React.ComponentType> = {
  trade: TradeView,
  portfolio: PortfolioView,
  history: HistoryView,
  withdraw: WithdrawView,
  profile: ProfileView,
  support: SupportView,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("trade");
  const [user, setUser] = useState<UserData | null>(null);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("cv_user");
    const savedBalances = localStorage.getItem("cv_balances");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (savedBalances) setBalances(JSON.parse(savedBalances));
    }
    setLoaded(true);
  }, []);

  const handleLogin = (userData: UserData, userBalances: Balance[]) => {
    setUser(userData);
    setBalances(userBalances);
  };

  const handleLogout = () => {
    localStorage.removeItem("cv_token");
    localStorage.removeItem("cv_user");
    localStorage.removeItem("cv_balances");
    setUser(null);
    setBalances([]);
  };

  if (!loaded) return null;

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  const ActiveView = VIEWS[activeTab] || TradeView;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        username={user.username}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TickerBar />
        <main className="flex-1 p-6 max-w-5xl">
          <ActiveView />
        </main>
      </div>
    </div>
  );
};

export default Index;
