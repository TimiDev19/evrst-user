import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import { EmptyState } from "@/components/evrst/States";
import { POINTS_HISTORY, USER } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all", label: "All" },
  { id: "earned", label: "Earned" },
  { id: "pending", label: "Pending" },
  { id: "reversed", label: "Reversed" },
  { id: "expired", label: "Expired" },
];

const TONE = {
  earned: "text-positive",
  pending: "text-amber-500",
  reversed: "text-destructive",
  expired: "text-muted-foreground",
};

export default function PointsHistory() {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? POINTS_HISTORY : POINTS_HISTORY.filter((p) => p.type === tab);

  return (
    <div>
      <PageHeader title="Points history" subtitle="EVRST points · no monetary value" icon={Sparkles} />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <div className="text-xs text-muted-foreground">Total points</div>
          <div className="text-3xl font-black text-primary mt-1">{USER.points.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs text-muted-foreground">Pending</div>
          <div className="text-3xl font-black text-amber-500 mt-1">{POINTS_HISTORY.filter((p) => p.type === "pending").reduce((s, p) => s + p.points, 0)}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs text-muted-foreground">Level</div>
          <div className="text-lg font-bold text-foreground mt-1">{USER.level}</div>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 mb-5 text-xs text-muted-foreground">
        <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <span>Withdrawals never reduce your points. Points can be earned, held pending, reversed, or expired — but never deducted by a withdrawal.</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("shrink-0 px-3.5 h-9 rounded-full text-sm font-medium border",
              tab === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Sparkles} title="No points yet" description="Earn points by trading, referring friends and staying active." />
      ) : (
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4">
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground">{p.reason}</div>
                <div className="text-xs text-muted-foreground capitalize">{p.type} · {p.date}</div>
              </div>
              <div className={cn("text-sm font-bold", TONE[p.type])}>{p.points > 0 ? "+" : ""}{p.points}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}