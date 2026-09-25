import React, { useState } from "react";
import { PlusCircle, ArrowDownLeft, AlertTriangle, Loader2, Building2, CreditCard, Smartphone } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { USER, DEPOSITS, formatNaira } from "@/lib/mockData";

const METHODS = [
  { id: "bank", label: "Bank Transfer", desc: "GTB, Access, Zenith, UBA & more", icon: Building2, fee: "Free", time: "Instant – 24h" },
  { id: "card", label: "Debit / Credit Card", desc: "Visa, Mastercard, Verve", icon: CreditCard, fee: "1.5%", time: "Instant" },
  { id: "ussd", label: "USSD", desc: "*737#, *901#, *966#", icon: Smartphone, fee: "Free", time: "Instant" },
];

export default function Fund() {
  const [method, setMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(null);

  const create = () => {
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      setCreated({ id: "dep-8830", amount: Number(amount) || 0, method: METHODS.find((m) => m.id === method).label });
    }, 1400);
  };

  return (
    <div>
      <PageHeader title="Fund account" subtitle="Deposit naira into your EVRST balance" icon={PlusCircle} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Balance summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs text-muted-foreground">Total balance</div>
              <div className="text-2xl font-black text-foreground mt-1">{formatNaira(USER.totalBalance)}</div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs text-muted-foreground">Available balance</div>
              <div className="text-2xl font-black text-positive mt-1">{formatNaira(USER.availableBalance)}</div>
            </div>
          </div>

          {/* Method selection */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Choose deposit method</h3>
            <div className="space-y-2">
              {METHODS.map((m) => (
                <button key={m.id} onClick={() => setMethod(m.id)}
                  className={"w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors " + (method === m.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted")}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><m.icon className="w-5 h-5 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-medium text-foreground">{m.fee}</div>
                    <div className="text-xs text-muted-foreground">{m.time}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label className="text-sm font-medium text-foreground">Amount (NGN)</label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₦</span>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
                  className="w-full h-12 pl-8 pr-4 rounded-xl bg-muted border border-border text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
              </div>
              <div className="flex gap-2 mt-2">
                {[5000, 20000, 50000, 100000].map((q) => (
                  <button key={q} onClick={() => setAmount(String(q))} className="px-3 py-1 rounded-lg text-xs font-medium border border-border hover:bg-muted">{formatNaira(q)}</button>
                ))}
              </div>
            </div>

            <Button className="w-full mt-5" onClick={create} disabled={creating || !amount}>
              {creating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating deposit intent…</> : "Create deposit intent"}
            </Button>
          </div>

          {created && (
            <div className="rounded-2xl border border-positive/30 bg-positive/5 p-5">
              <div className="flex items-center gap-2 mb-2"><ArrowDownLeft className="w-4 h-4 text-positive" /><h3 className="font-semibold text-positive">Deposit intent created</h3></div>
              <p className="text-sm text-muted-foreground mb-3">Reference <code className="font-mono text-foreground">{created.id}</code> · {created.method} · {formatNaira(created.amount)}</p>
              <p className="text-sm text-muted-foreground">Complete the transfer using the details sent to your registered method. Status updates appear in your deposit history below.</p>
            </div>
          )}
        </div>

        {/* Deposit history */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Deposit history</h3>
          <div className="space-y-2">
            {DEPOSITS.map((d) => (
              <div key={d.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{d.method}</span>
                  <StatusBadge status={d.status} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{d.date}</span>
                  <span className="text-sm font-semibold text-foreground">{formatNaira(d.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 mt-6 text-xs text-muted-foreground">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>If a provider is temporarily unavailable, deposits may be delayed. Never deposit to an unverified account. Always show currency and confirm fees before paying.</span>
      </div>
    </div>
  );
}