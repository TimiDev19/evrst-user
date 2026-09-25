import React, { useState } from "react";
import { Bell, ShieldCheck, Landmark, ArrowLeftRight, ListOrdered, Sparkles, Award, LifeBuoy, Megaphone } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import { EmptyState } from "@/components/evrst/States";
import { NOTIFICATIONS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const CATS = [
  { id: "all", label: "All", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "kyc", label: "KYC", icon: ShieldCheck },
  { id: "deposits", label: "Money", icon: Landmark },
  { id: "orders", label: "Orders", icon: ListOrdered },
  { id: "followed", label: "Markets", icon: ArrowLeftRight },
  { id: "points", label: "Points", icon: Award },
  { id: "support", label: "Support", icon: LifeBuoy },
  { id: "product", label: "Product", icon: Megaphone },
];

const CAT_TONE = {
  security: "text-destructive bg-destructive/10",
  kyc: "text-amber-500 bg-amber-500/10",
  deposits: "text-positive bg-positive/10",
  orders: "text-primary bg-primary/10",
  followed: "text-blue-500 bg-blue-500/10",
  points: "text-primary bg-primary/10",
  support: "text-amber-500 bg-amber-500/10",
  product: "text-muted-foreground bg-muted",
};

export default function Notifications() {
  const [cat, setCat] = useState("all");
  const [items, setItems] = useState(NOTIFICATIONS);
  const filtered = cat === "all" ? items : items.filter((n) => n.category === cat);
  const unread = items.filter((n) => n.status === "unread").length;

  const markRead = (id) => setItems((arr) => arr.map((n) => n.id === id ? { ...n, status: "read" } : n));

  return (
    <div>
      <PageHeader title="Notifications" subtitle={`${unread} unread`} icon={Bell}
        actions={unread > 0 && <button onClick={() => setItems((a) => a.map((n) => ({ ...n, status: "read" })))} className="text-sm text-primary hover:underline">Mark all read</button>} />

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4">
        {CATS.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={cn("shrink-0 inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-sm font-medium border",
              cat === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground")}>
            <c.icon className="w-3.5 h-3.5" /> {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
      ) : (
        <div className="space-y-2">
          {filtered.map((n) => (
            <button key={n.id} onClick={() => markRead(n.id)} className={cn("w-full text-left flex items-start gap-3 rounded-2xl border p-4 transition-colors",
              n.status === "unread" ? "border-primary/30 bg-primary/5" : "border-border bg-card hover:bg-muted/30")}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", CAT_TONE[n.category])}>
                {(() => { const C = CATS.find((c) => c.id === n.category)?.icon || Bell; return <C className="w-5 h-5" />; })()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{n.title}</span>
                  {n.status === "unread" && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                  {n.action && <span className="text-xs text-primary font-medium">{n.action} →</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}