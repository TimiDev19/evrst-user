import React, { useState } from "react";
import { ArrowLeftRight, ArrowDownRight, ArrowUpRight, Loader2 } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import { Button } from "@/components/ui/button";
import { USER, TRADING_TRANSFERS, formatNaira } from "@/lib/mockData";

export default function TradingBalance() {
  const [transfers, setTransfers] = useState(TRADING_TRANSFERS);
  const [amount, setAmount] = useState("");
  const [moving, setMoving] = useState(null);

  const move = (direction) => {
    setMoving(direction);
    setTimeout(() => {
      setTransfers((t) => [
        { id: "tt-" + Date.now(), direction, amount: Number(amount) || 0, date: "2026-09-22 16:20" },
        ...t,
      ]);
      setMoving(null);
      setAmount("");
    }, 1200);
  };

  return (
    <div>
      <PageHeader title="Trading balance" subtitle="Move USDC between available and trading balances" icon={ArrowLeftRight} />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Available USDC</div>
          <div className="text-3xl font-black text-foreground mt-1">{(USER.availableBalance / 1505).toFixed(2)} <span className="text-base font-semibold text-muted-foreground">USDC</span></div>
          <div className="text-xs text-muted-foreground mt-1">{formatNaira(USER.availableBalance)}</div>
        </div>
        <div className="rounded-2xl border border-positive/30 bg-positive/5 p-5">
          <div className="text-xs text-positive uppercase tracking-wide">Trading USDC</div>
          <div className="text-3xl font-black text-positive mt-1">{(USER.tradingBalance / 1505).toFixed(2)} <span className="text-base font-semibold text-positive/70">USDC</span></div>
          <div className="text-xs text-muted-foreground mt-1">{formatNaira(USER.tradingBalance)}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <label className="text-sm font-medium text-foreground">Amount (USDC)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00"
          className="w-full h-12 px-4 mt-1.5 rounded-xl bg-muted border border-border text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline" onClick={() => move("in")} disabled={moving || !amount}>
            {moving === "in" ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Moving…</> : <><ArrowDownRight className="w-4 h-4 mr-2 text-positive" /> Move to trading</>}
          </Button>
          <Button variant="outline" onClick={() => move("out")} disabled={moving || !amount}>
            {moving === "out" ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Moving…</> : <><ArrowUpRight className="w-4 h-4 mr-2" /> Move to available</>}
          </Button>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-3">Transfer history</h3>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {transfers.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className={"w-9 h-9 rounded-lg flex items-center justify-center " + (t.direction === "in" ? "bg-positive/10" : "bg-muted")}>
                {t.direction === "in" ? <ArrowDownRight className="w-4 h-4 text-positive" /> : <ArrowUpRight className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{t.direction === "in" ? "To trading balance" : "To available balance"}</div>
                <div className="text-xs text-muted-foreground">{t.date}</div>
              </div>
            </div>
            <div className={"text-sm font-semibold " + (t.direction === "in" ? "text-positive" : "text-foreground")}>
              {t.direction === "in" ? "+" : "−"}{t.amount} USDC
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}