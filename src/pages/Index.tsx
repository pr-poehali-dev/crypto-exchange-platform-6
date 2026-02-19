import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TickerBar from "@/components/TickerBar";
import TradeView from "@/components/TradeView";
import PortfolioView from "@/components/PortfolioView";
import HistoryView from "@/components/HistoryView";
import WithdrawView from "@/components/WithdrawView";
import ProfileView from "@/components/ProfileView";
import SupportView from "@/components/SupportView";

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
  const ActiveView = VIEWS[activeTab] || TradeView;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
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
