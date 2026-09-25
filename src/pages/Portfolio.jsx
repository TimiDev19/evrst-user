import React, { useState } from "react";
import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { USER, POSITIONS, PORTFOLIO_SERIES, formatNaira } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const FILTERS = ["Today", "7 days", "1 month", "All time"];

export default function Portfolio() {
  const [filter, setFilter] = useState("7 days");
  const open = POSITIONS.filter((p) => p.status === "open");
  const settled = POSITIONS.filter((p) => p.status === "settled");
  const totalUnrealized = open.reduce((s, p) => s + p.unrealized, 0);
  const totalRealized = settled.reduce((s, p) => s + (p.realized || 0), 0);

  return (
    <div>
      <PageHeader title="Portfolio" subtitle="Your positions, performance and balances" icon={Trophy}
        actions={<div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
          {FILTERS.map((f) => <button key={f} onClick={() => setFilter(f)} className={cn("px-3 h-7 rounded-md text-xs font-medium", filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{f}</button>)}
        </div>} />

      {/* Balance grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Card label="Total balance" value={formatNaira(USER.totalBalance)} />
        <Card label="Available" value={formatNaira(USER.availableBalance)} />
        <Card label="Trading" value={formatNaira(USER.tradingBalance)} positive />
        <Card label="Reserved in orders" value={formatNaira(USER.reservedInOrders)} />
      </div>

      {/* P/L + chart */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs text-muted-foreground">Unrealized P/L</div>
          <div className={cn("text-2xl font-black mt-1", totalUnrealized >= 0 ? "text-positive" : "text-destructive")}>{totalUnrealized >= 0 ? "+" : ""}{formatNaira(totalUnrealized)}</div>
          <div className="flex items-center gap-1 text-xs mt-1 text-muted-foreground">{totalUnrealized >= 0 ? <TrendingUp className="w-3 h-3 text-positive" /> : <TrendingDown className="w-3 h-3 text-destructive" />} Across {open.length} open positions</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs text-muted-foreground">Realized P/L</div>
          <div className="text-2xl font-black text-positive mt-1">+{formatNaira(totalRealized)}</div>
          <div className="text-xs text-muted-foreground mt-1">From {settled.length} settled markets</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs text-muted-foreground">Potential payout</div>
          <div className="text-2xl font-black text-foreground mt-1">{formatNaira(open.reduce((s, p) => s + p.payout, 0))}</div>
          <div className="text-xs text-muted-foreground mt-1">If all open positions win</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Performance</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={PORTFOLIO_SERIES}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Open positions */}
      <h3 className="font-semibold text-foreground mb-3">Open positions</h3>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border mb-6">
        {open.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4">
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{p.market}</div>
              <div className="text-xs text-muted-foreground">{p.shares} {p.side} @ {p.avgPrice.toFixed(2)}¢</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">{formatNaira(p.value)}</div>
              <div className={cn("text-xs font-medium", p.unrealized >= 0 ? "text-positive" : "text-destructive")}>{p.unrealized >= 0 ? "+" : ""}{formatNaira(p.unrealized)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Settled */}
      <h3 className="font-semibold text-foreground mb-3">Settled markets</h3>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {settled.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4">
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{p.market}</div>
              <div className="text-xs text-muted-foreground">{p.shares} {p.side} @ {p.avgPrice.toFixed(2)}¢</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-positive">+{formatNaira(p.realized)}</div>
              <StatusBadge status="settled" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ label, value, positive }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={cn("text-xl font-black mt-1", positive ? "text-positive" : "text-foreground")}>{value}</div>
    </div>
  );
}