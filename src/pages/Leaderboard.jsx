import React, { useState } from "react";
import { Award, Crown, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import { LEADERBOARD } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { id: "combined", label: "Combined" },
  { id: "Nigeria", label: "Nigeria" },
  { id: "Ghana", label: "Ghana" },
];
const PERIODS = [
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "alltime", label: "All time" },
];

export default function Leaderboard() {
  const [country, setCountry] = useState("combined");
  const [period, setPeriod] = useState("weekly");

  let rows = LEADERBOARD[period];
  if (country !== "combined") rows = rows.filter((r) => r.country === country);

  return (
    <div>
      <PageHeader title="Leaderboard" subtitle="EVRST points ranking · points have no monetary value" icon={Award} />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          {COUNTRIES.map((c) => <button key={c.id} onClick={() => setCountry(c.id)} className={cn("px-3.5 h-8 rounded-md text-sm font-medium", country === c.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{c.label}</button>)}
        </div>
        <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          {PERIODS.map((p) => <button key={p.id} onClick={() => setPeriod(p.id)} className={cn("px-3.5 h-8 rounded-md text-sm font-medium", period === p.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{p.label}</button>)}
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 mb-5 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <span>Ranking uses public nicknames only. We never show legal names, emails, wallet addresses, balances, deposits, profits or trade sizes. Users may appear as "Private User".</span>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {rows.map((r, i) => (
          <div key={r.rank + r.nickname + i} className={cn("flex items-center gap-4 p-4 border-b border-border last:border-0", r.isYou && "bg-primary/5")}>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0",
              r.rank === 1 ? "bg-amber-500/15 text-amber-500" : r.rank === 2 ? "bg-slate-400/15 text-slate-400" : r.rank === 3 ? "bg-orange-700/15 text-orange-700" : "bg-muted text-muted-foreground")}>
              {r.rank <= 3 ? <Crown className="w-5 h-5" /> : r.rank}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground truncate">{r.nickname}</span>
                {r.isYou && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">YOU</span>}
              </div>
              <div className="text-xs text-muted-foreground">{r.country} · {r.level}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-bold text-foreground">{r.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}