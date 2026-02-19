import { useState } from "react";
import Icon from "@/components/ui/icon";
import API_URLS from "@backend/func2url.json";

interface AuthViewProps {
  onLogin: (user: { id: number; email: string; username: string }, balances: { currency: string; amount: string }[]) => void;
}

const AuthView = ({ onLogin }: AuthViewProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const action = mode === "register" ? "register" : "login";
    const body: Record<string, string> = { email, password };
    if (mode === "register") body.username = username;

    try {
      const res = await fetch(`${API_URLS.auth}?action=${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Произошла ошибка");
        return;
      }

      localStorage.setItem("cv_token", data.token);
      localStorage.setItem("cv_user", JSON.stringify(data.user));
      localStorage.setItem("cv_balances", JSON.stringify(data.balances));
      onLogin(data.user, data.balances);
    } catch {
      setError("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="Zap" size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">CryptoVault</h1>
          <p className="text-sm text-muted-foreground mt-1">Trading Terminal</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex mb-6 bg-secondary rounded-lg p-1">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "register" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Имя пользователя</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                  minLength={3}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                required
                minLength={6}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2">
                <Icon name="AlertCircle" size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>

          {mode === "register" && (
            <div className="mt-4 flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2.5">
              <Icon name="Gift" size={16} className="text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-semibold">Бонус:</span> 1 BTC на баланс при регистрации
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
