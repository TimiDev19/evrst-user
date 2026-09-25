import React, { useState } from "react";
import { Receipt } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { EmptyState } from "@/components/evrst/States";
import { LEDGER, formatNaira } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const TYPES = [
  { id: "all", label: "All" },
  { id: "deposit", label: "Deposits" },
  { id: "conversion", label: "Conversions" },
  { id: "transfer", label: "Trading transfers" },
  { id: "reservation", label: "Order reservations" },
  { id: "withdrawal", label: "Withdrawals" },
  { id: "fee", label: "Fees" },
];

export default function Ledger() {
  const [type, setType] = useState("all");
  const filtered = type === "all" ? LEDGER : LEDGER.filter((l) => l.type === type);

  return (
    <div>
      <PageHeader title="Ledger" subtitle="Full transaction history" icon={Receipt} />

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4">
        {TYPES.map((t) => (
          <button key={t.id} onClick={() => setType(t.id)}
            className={cn("shrink-0 px-3.5 h-9 rounded-full text-sm font-medium border",
              type === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Receipt} title="No transactions" description="Transactions will appear here as you use EVRST." />
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-xs text-muted-foreground uppercase border-b border-border">
                <th className="text-left font-semibold px-4 py-3">Description</th>
                <th className="text-left font-semibold px-4 py-3">Type</th>
                <th className="text-right font-semibold px-4 py-3">Amount</th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-left font-semibold px-4 py-3">Date / time</th>
                <th className="text-left font-semibold px-4 py-3">Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{l.label}</td>
                  <td className="px-4 py-3"><span className="capitalize text-muted-foreground">{l.type}</span></td>
                  <td className={cn("px-4 py-3 text-right font-semibold", l.amount > 0 ? "text-positive" : "text-foreground")}>{l.amount > 0 ? "+" : ""}{formatNaira(Math.abs(l.amount))}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{l.date}</td>
                  <td className="px-4 py-3"><code className="text-xs font-mono text-muted-foreground">{l.ref}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}