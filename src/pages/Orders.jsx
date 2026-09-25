import React, { useState } from "react";
import { ListOrdered, X } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { EmptyState } from "@/components/evrst/States";
import { ORDERS, formatNaira } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "partial", label: "Partial" },
  { id: "filled", label: "Filled" },
  { id: "cancelled", label: "Cancelled" },
  { id: "rejected", label: "Rejected" },
];

export default function Orders() {
  const [tab, setTab] = useState("all");
  const [orders, setOrders] = useState(ORDERS);

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  const cancel = (id) => setOrders((o) => o.map((x) => x.id === id ? { ...x, status: "cancelled" } : x));

  return (
    <div>
      <PageHeader title="Orders" subtitle="Your open, filled and cancelled orders" icon={ListOrdered} />

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
        <EmptyState icon={ListOrdered} title="No orders here" description="Orders you place will appear in this list." />
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="hidden md:grid grid-cols-6 gap-2 px-4 py-3 text-xs font-semibold text-muted-foreground uppercase border-b border-border">
            <div>Market</div><div>Side</div><div>Amount</div><div>Price</div><div>Filled</div><div className="text-right">Status</div>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((o) => (
              <div key={o.id} className="grid md:grid-cols-6 gap-2 px-4 py-3.5 items-center text-sm">
                <div className="min-w-0">
                  <div className="font-medium text-foreground truncate">{o.market}</div>
                  <div className="text-xs text-muted-foreground">{o.id} · {o.date}</div>
                </div>
                <div><span className={cn("font-semibold", o.side === "YES" ? "text-positive" : "text-destructive")}>{o.side}</span> <span className="text-xs text-muted-foreground">{o.type}</span></div>
                <div className="font-medium text-foreground">{formatNaira(o.amount)}</div>
                <div className="text-muted-foreground">{o.price.toFixed(2)}¢</div>
                <div>
                  <div className="text-foreground">{(o.filled * 100).toFixed(0)}%</div>
                  <div className="w-full h-1.5 rounded-full bg-muted mt-1 overflow-hidden"><div className={cn("h-full", o.filled > 0 ? "bg-positive" : "bg-muted-foreground/30")} style={{ width: `${o.filled * 100}%` }} /></div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <StatusBadge status={o.status} />
                  {o.status === "open" && <button onClick={() => cancel(o.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive" title="Cancel"><X className="w-3.5 h-3.5" /></button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}