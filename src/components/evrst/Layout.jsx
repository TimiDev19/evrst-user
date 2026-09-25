import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutGrid, Wallet, Landmark, Trophy, LineChart, Award, LifeBuoy, User,
  Search, Menu, X, Bell, ShieldCheck, ChevronRight, LogOut
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { USER, formatNaira } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Markets", path: "/", icon: LayoutGrid },
  { label: "Dashboard", path: "/dashboard", icon: Landmark },
  { label: "Wallet", path: "/wallet", icon: Wallet },
  { label: "Fund", path: "/fund", icon: LineChart },
  { label: "Portfolio", path: "/portfolio", icon: Trophy },
  { label: "Leaderboard", path: "/leaderboard", icon: Award },
  { label: "Support", path: "/support", icon: LifeBuoy },
  { label: "Profile", path: "/profile", icon: User },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-black text-white text-lg shadow-lg shadow-primary/30">E</div>
      <span className="text-xl font-black tracking-tight text-foreground">EVRST</span>
    </Link>
  );
}

function NavItems({ onNavigate }) {
  const location = useLocation();
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <item.icon className="w-4.5 h-4.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function KycBanner() {
  if (USER.kycStatus === "verified") return null;
  return (
    <Link to="/kyc" className="block mx-4 mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 hover:bg-amber-500/15 transition-colors">
      <div className="flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground">Complete KYC to trade</p>
          <p className="text-[11px] text-muted-foreground truncate">Verify your identity to unlock trading.</p>
        </div>
        <ChevronRight className="w-4 h-4 text-amber-500 ml-auto shrink-0" />
      </div>
    </Link>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border bg-sidebar">
        <div className="p-5"><Logo /></div>
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3">
          <NavItems />
          <KycBanner />
        </div>
        <div className="p-3 border-t border-border">
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors">
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm">
              {USER.nickname[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{USER.nickname}</p>
              <p className="text-xs text-muted-foreground truncate">{formatNaira(USER.availableBalance)}</p>
            </div>
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 max-w-[80%] bg-sidebar flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Logo />
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3"><NavItems onNavigate={() => setMobileOpen(false)} /></div>
            <KycBanner />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
            <button className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search markets…"
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <ThemeToggle />
              <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-muted">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
              </Link>
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg border border-border hover:bg-muted">
                <Wallet className="w-4 h-4 text-positive" />
                <span className="text-sm font-semibold text-foreground">{formatNaira(USER.availableBalance)}</span>
              </Link>
              <Link to="/login" className="px-3 h-9 inline-flex items-center rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted">Log in</Link>
              <Link to="/register" className="px-3.5 h-9 inline-flex items-center rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90">Create account</Link>
            </div>
          </div>
        </header>

        <main key={location.pathname} className="p-4 sm:p-6 max-w-7xl mx-auto animate-fade-in">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex items-center justify-around h-16 px-1">
            {NAV.slice(0, 5).map((item) => {
              const active = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
              return (
                <Link key={item.path} to={item.path} className={cn("flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground")}>
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      <div className="lg:hidden h-16" />
    </div>
  );
}