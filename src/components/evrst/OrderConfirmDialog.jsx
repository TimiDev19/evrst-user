import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, Loader2 } from "lucide-react";
import { formatNaira } from "@/lib/mockData";

export default function OrderConfirmDialog({ open, onOpenChange, market, side, amount = 5000 }) {
  const [refreshing, setRefreshing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [priceMoved, setPriceMoved] = useState(false);

  const price = side === "YES" ? market?.yesPrice : market?.noPrice;
  const shares = price ? Math.round((amount / (price * 100)) * 100) : 0;
  const fee = Math.round(amount * 0.01);
  const maxReturn = Math.round(shares * 100 - amount - fee);
  const maxLoss = amount + fee;

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); setPriceMoved(true); }, 900);
  };

  const submit = () => {
    setConfirmed(true);
    setTimeout(() => { setConfirmed(false); onOpenChange(false); }, 1200);
  };

  if (!market) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm order</DialogTitle>
          <DialogDescription className="line-clamp-2">{market.question}</DialogDescription>
        </DialogHeader>

        {priceMoved && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Price has changed. Please review and confirm the new price before submitting.</span>
          </div>
        )}

        <div className="space-y-2.5 text-sm">
          <Row label="Side" value={<span className={side === "YES" ? "text-positive font-semibold" : "text-destructive font-semibold"}>{side}</span>} />
          <Row label="Amount" value={formatNaira(amount)} />
          <Row label="Avg. price" value={`${price?.toFixed(2)}¢`} />
          <Row label="Est. shares" value={shares.toLocaleString()} />
          <Row label="Fees" value={formatNaira(fee)} />
          <div className="h-px bg-border my-1" />
          <Row label="Max possible return" value={<span className="text-positive font-semibold">{formatNaira(maxReturn)}</span>} />
          <Row label="Max possible loss" value={<span className="text-destructive font-semibold">{formatNaira(maxLoss)}</span>} />
          <Row label="Slippage tolerance" value="1.0%" />
        </div>

        <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <span>Trading involves risk. You may lose your entire stake. Only trade what you can afford to lose. EVRST never trades on your behalf.</span>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={submit} disabled={confirmed} className="w-full">
            {confirmed ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…</> : "Confirm order"}
          </Button>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={refresh} disabled={refreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} /> Refresh price
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}