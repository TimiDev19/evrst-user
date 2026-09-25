import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Wallet, PlusCircle, LayoutGrid, Trophy, ArrowUpRight,
  ArrowDownRight, Clock, AlertCircle, ChevronRight
} from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { USER, LEDGER, formatNaira, formatVolume } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const QUICK = [
  { label: "Complete KYC", to: "/kyc", icon: ShieldCheck, tone: "amber", done: USER.kycStatus === "verified" },
  { label: "Link wallet", to: "/wallet", icon: Wallet, tone: "primary", done: USER.walletStatus === "linked" },
  { label: "Fund account", to: "/fund", icon: PlusCircle, tone: "positive" },
  { label: "Browse markets", to: "/", icon: LayoutGrid, tone: "primary" },
  { label: "View portfolio", to: "/portfolio", icon: Trophy, tone: "positive" },
  { label: "Withdraw", to: "/withdrawals", icon: ArrowUpRight, tone: "amber" },
];

export default function Dashboard() {
  const pending = LEDGER.filter((l) => l.status === "pending" || l.status === "processing");

  return (
    <div>
      <PageHeader title="Account overview" subtitle="Your balances, status and recent activity" icon={LayoutGrid} />

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <BalanceCard label="Total balance" value={formatNaira(USER.totalBalance)} sub="Across all balances" highlight />
        <BalanceCard label="Available balance" value={formatNaira(USER.availableBalance)} sub="Ready to use" />
        <BalanceCard label="Trading balance" value={formatNaira(USER.tradingBalance)} sub="In trading account" positive />
      </div>

      {/* Status row */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-amber-500" /></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">KYC status</div>
            <StatusBadge status={USER.kycStatus} />
          </div>
          <Link to="/kyc" className="text-sm text-primary hover:underline">{USER.kycStatus === "verified" ? "View" : "Complete"}</Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Wallet status</div>
            <StatusBadge status={USER.walletStatus} />
          </div>
          <Link to="/wallet" className="text-sm text-primary hover:underline">Manage</Link>
        </div>
      </div>

      {/* Pending actions */}
      {pending.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-foreground text-sm">Pending actions</h3>
          </div>
          <div className="space-y-2">
            {pending.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{p.label}</span>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <h3 className="font-semibold text-foreground mb-3">Quick actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {QUICK.map((q) => (
          <Link key={q.label} to={q.to} className="group rounded-2xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3",
              q.tone === "amber" && "bg-amber-500/10 text-amber-500",
              q.tone === "primary" && "bg-primary/10 text-primary",
              q.tone === "positive" && "bg-positive/10 text-positive")}>
              <q.icon className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-foreground flex items-center gap-1">
              {q.label}
              {q.done && <span className="text-positive text-xs">✓</span>}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Recent activity</h3>
          <Link to="/ledger" className="text-sm text-primary hover:underline inline-flex items-center gap-1">View ledger <ChevronRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="space-y-1">
          {LEDGER.slice(0, 5).map((l) => {
            const positive = l.amount > 0;
            return (
              <div key={l.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                    positive ? "bg-positive/10" : "bg-muted")}>
                    {positive ? <ArrowDownRight className="w-4 h-4 text-positive" /> : <ArrowUpRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{l.label}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2"><Clock className="w-3 h-3" /> {l.date}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={cn("text-sm font-semibold", positive ? "text-positive" : "text-foreground")}>
                    {positive ? "+" : ""}{formatNaira(Math.abs(l.amount))}
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BalanceCard({ label, value, sub, highlight, positive }) {
  return (
    <div className={cn("rounded-2xl border p-5", highlight ? "border-primary/40 bg-gradient-to-br from-primary/10 to-card" : "border-border bg-card")}>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</div>
      <div className={cn("text-2xl sm:text-3xl font-black mt-1.5", positive ? "text-positive" : "text-foreground")}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}