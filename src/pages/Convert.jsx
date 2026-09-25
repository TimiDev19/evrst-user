import React, { useState } from "react";
import { ArrowLeftRight, Loader2, Clock, Info } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CONVERSIONS, formatNaira } from "@/lib/mockData";

const RATE = 1505.2; // NGN per USDC

export default function Convert() {
  const [from, setFrom] = useState("NGN");
  const [to, setTo] = useState("USDC");
  const [amount, setAmount] = useState("100000");
  const [quoting, setQuoting] = useState(false);
  const [quote, setQuote] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [done, setDone] = useState(false);

  const providerFee = 0.01; // 1%
  const evrstFee = 0.005; // 0.5%
  const totalFeeRate = providerFee + evrstFee;

  const getQuote = () => {
    setQuoting(true);
    setTimeout(() => {
      const amt = Number(amount) || 0;
      const gross = from === "NGN" ? amt / RATE : amt * RATE;
      const fees = gross * totalFeeRate;
      const received = gross - fees;
      setQuote({
        rate: RATE, from, to, amount: amt,
        gross, providerFee: gross * providerFee, evrstFee: gross * evrstFee,
        received, expiresAt: "60s",
      });
      setQuoting(false);
    }, 1000);
  };

  const confirm = () => {
    setConfirmOpen(false);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  const swap = () => { setFrom(to); setTo(from); setQuote(null); };

  return (
    <div>
      <PageHeader title="Convert" subtitle="Swap between naira and USDC" icon={ArrowLeftRight} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            {/* From */}
            <div className="rounded-xl bg-muted/40 border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">From</span>
                <span className="text-xs text-muted-foreground">Available: {from === "NGN" ? formatNaira(142300) : "94.6 USDC"}</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="number" value={amount} onChange={(e) => { setAmount(e.target.value); setQuote(null); }}
                  className="flex-1 bg-transparent text-2xl font-bold focus:outline-none" placeholder="0.00" />
                <select value={from} onChange={(e) => { setFrom(e.target.value); setQuote(null); }}
                  className="bg-card border border-border rounded-xl px-3 h-11 text-sm font-semibold focus:outline-none">
                  <option value="NGN">NGN</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <button onClick={swap} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center border-4 border-card hover:opacity-90">
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To */}
            <div className="rounded-xl bg-muted/40 border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">To</span>
                <span className="text-xs text-muted-foreground">{to}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-2xl font-bold text-muted-foreground">
                  {quote ? (from === "NGN" ? quote.received.toFixed(2) : formatNaira(Math.round(quote.received))) : "0.00"}
                </div>
                <select value={to} onChange={(e) => { setTo(e.target.value); setQuote(null); }}
                  className="bg-card border border-border rounded-xl px-3 h-11 text-sm font-semibold focus:outline-none">
                  <option value="USDC">USDC</option>
                  <option value="NGN">NGN</option>
                </select>
              </div>
            </div>

            <Button className="w-full mt-5" onClick={getQuote} disabled={quoting || !amount}>
              {quoting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Getting quote…</> : "Get quote"}
            </Button>
          </div>

          {/* Quote details */}
          {quote && (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Quote</h3>
                <span className="inline-flex items-center gap-1 text-xs text-amber-500"><Clock className="w-3 h-3" /> Expires in {quote.expiresAt}</span>
              </div>
              <div className="space-y-2 text-sm">
                <Row label="Rate" value={`1 USDC = ${formatNaira(quote.rate)}`} />
                <Row label="Provider fee (1%)" value={from === "NGN" ? `${(quote.providerFee).toFixed(2)} USDC` : formatNaira(Math.round(quote.providerFee))} />
                <Row label="EVRST fee (0.5%)" value={from === "NGN" ? `${(quote.evrstFee).toFixed(2)} USDC` : formatNaira(Math.round(quote.evrstFee))} />
                <div className="h-px bg-border my-1" />
                <Row label="Estimated received" value={<span className="text-positive font-bold text-base">{from === "NGN" ? `${quote.received.toFixed(2)} USDC` : formatNaira(Math.round(quote.received))}</span>} />
              </div>
              <Button className="w-full mt-4" onClick={() => setConfirmOpen(true)}>Confirm conversion</Button>
            </div>
          )}

          {done && (
            <div className="rounded-2xl border border-positive/30 bg-positive/5 p-4 mt-4 text-sm text-positive font-medium">
              ✓ Conversion completed. Your balance has been updated.
            </div>
          )}
        </div>

        {/* History */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Conversion history</h3>
          <div className="space-y-2">
            {CONVERSIONS.map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{c.from} → {c.to}</span>
                  <StatusBadge status={c.status} />
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                  <span>{c.date}</span>
                  <span>{c.from === "NGN" ? formatNaira(c.amount) : c.amount + " USDC"} → {c.received} {c.to}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 mt-4 text-xs text-muted-foreground">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>Quotes expire fast. If the rate changes significantly, you'll be asked to confirm again.</span>
          </div>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm conversion</DialogTitle>
            <DialogDescription>Please review the details before confirming.</DialogDescription>
          </DialogHeader>
          {quote && (
            <div className="space-y-2 text-sm">
              <Row label="You pay" value={`${quote.amount} ${quote.from}`} />
              <Row label="Rate" value={`1 USDC = ${formatNaira(quote.rate)}`} />
              <Row label="Total fees" value={from === "NGN" ? `${(quote.providerFee + quote.evrstFee).toFixed(2)} USDC` : formatNaira(Math.round(quote.providerFee + quote.evrstFee))} />
              <div className="h-px bg-border my-1" />
              <Row label="You receive" value={<span className="text-positive font-bold">{from === "NGN" ? `${quote.received.toFixed(2)} USDC` : formatNaira(Math.round(quote.received))}</span>} />
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={confirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
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