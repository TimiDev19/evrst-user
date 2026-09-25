import React, { useState } from "react";
import { ArrowUpRight, Plus, KeyRound, AlertTriangle, Loader2, Clock, X } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER, WITHDRAWALS, WITHDRAWAL_DESTINATIONS, formatNaira } from "@/lib/mockData";

export default function Withdrawals() {
  const [history, setHistory] = useState(WITHDRAWALS);
  const [destinations, setDestinations] = useState(WITHDRAWAL_DESTINATIONS);
  const [pinOpen, setPinOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [pinCreated, setPinCreated] = useState(false);

  const [newBank, setNewBank] = useState("");
  const [newAcct, setNewAcct] = useState("");

  const [wAmount, setWAmount] = useState("");
  const [wDest, setWDest] = useState(WITHDRAWAL_DESTINATIONS[0].id);
  const [wPin, setWPin] = useState("");

  const addDestination = () => {
    setDestinations((d) => [...d, { id: "d" + Date.now(), label: `${newBank} ••••${newAcct.slice(-4)}`, type: "Bank Account", status: "waiting", added: "2026-09-22", availableIn: "24h 00m" }]);
    setAddOpen(false); setNewBank(""); setNewAcct("");
  };

  const requestWithdrawal = () => {
    setHistory((h) => [{ id: "wd-" + Date.now(), destination: destinations.find((d) => d.id === wDest)?.label, amount: Number(wAmount) || 0, status: "processing", date: "2026-09-22 16:20" }, ...h]);
    setWithdrawOpen(false); setWAmount(""); setWPin("");
  };

  return (
    <div>
      <PageHeader title="Withdrawals" subtitle="Withdraw naira to your bank (V1 supports fiat only)" icon={ArrowUpRight}
        actions={<><Button variant="outline" onClick={() => setPinOpen(true)}><KeyRound className="w-4 h-4 mr-2" /> Create PIN</Button>
                  <Button onClick={() => setWithdrawOpen(true)}><Plus className="w-4 h-4 mr-2" /> Request withdrawal</Button></>} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Balance */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground uppercase">Withdrawal balance</div>
            <div className="text-3xl font-black text-foreground mt-1">{formatNaira(USER.availableBalance)}</div>
            <div className="text-xs text-muted-foreground mt-1">Available to withdraw</div>
          </div>

          {/* Destinations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Saved destinations</h3>
              <Button variant="outline" size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-1.5" /> Add</Button>
            </div>
            <div className="space-y-2">
              {destinations.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{d.label}</div>
                    <div className="text-xs text-muted-foreground">{d.type} · added {d.added}</div>
                  </div>
                  {d.status === "waiting" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-medium"><Clock className="w-3.5 h-3.5" /> {d.availableIn}</span>
                  ) : (
                    <StatusBadge status={d.status} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Withdrawal history</h3>
            <div className="rounded-2xl border border-border bg-card divide-y divide-border">
              {history.map((w) => (
                <div key={w.id} className="flex items-center justify-between p-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{w.destination}</div>
                    <div className="text-xs text-muted-foreground">{w.date} · {w.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">{formatNaira(w.amount)}</div>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <StatusBadge status={w.status} />
                      {w.status === "processing" && <button className="text-xs text-destructive hover:underline inline-flex items-center gap-0.5"><X className="w-3 h-3" /> Cancel</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side notice */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4 text-amber-500" /><h3 className="font-semibold text-foreground text-sm">24-hour waiting period</h3></div>
            <p className="text-sm text-muted-foreground">New withdrawal destinations must wait 24 hours before they can be used. This protects your funds from fraud.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground text-sm mb-2">PIN required</h3>
            <p className="text-sm text-muted-foreground mb-3">A withdrawal PIN is required for every withdrawal request. Never share your PIN with anyone — including EVRST support.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => setPinOpen(true)}>{pinCreated ? "Reset PIN" : "Create withdrawal PIN"}</Button>
          </div>
        </div>
      </div>

      {/* PIN modal */}
      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Create withdrawal PIN</DialogTitle>
            <DialogDescription>Set a 4-digit PIN for withdrawals. You'll need it for every withdrawal.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <div><Label>New PIN</Label><Input type="password" maxLength={4} placeholder="••••" className="mt-1.5 tracking-[0.5em] text-center text-lg" /></div>
            <div><Label>Confirm PIN</Label><Input type="password" maxLength={4} placeholder="••••" className="mt-1.5 tracking-[0.5em] text-center text-lg" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPinOpen(false)}>Cancel</Button>
            <Button onClick={() => { setPinCreated(true); setPinOpen(false); }}>Create PIN</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add destination modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Add withdrawal destination</DialogTitle>
            <DialogDescription>V1 supports bank accounts only. A 24-hour waiting period applies.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <div><Label>Bank name</Label><Input value={newBank} onChange={(e) => setNewBank(e.target.value)} placeholder="e.g. Guaranty Trust Bank" className="mt-1.5" /></div>
            <div><Label>Account number</Label><Input value={newAcct} onChange={(e) => setNewAcct(e.target.value)} placeholder="10-digit account number" className="mt-1.5" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={addDestination} disabled={!newBank || newAcct.length < 10}>Add destination</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw modal */}
      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Request withdrawal</DialogTitle>
            <DialogDescription>Confirm the details and enter your PIN.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <div><Label>Amount (NGN)</Label><Input type="number" value={wAmount} onChange={(e) => setWAmount(e.target.value)} placeholder="0.00" className="mt-1.5" /></div>
            <div>
              <Label>Destination</Label>
              <select value={wDest} onChange={(e) => setWDest(e.target.value)} className="w-full h-10 mt-1.5 px-3 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                {destinations.filter((d) => d.status === "active").map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div><Label>Withdrawal PIN</Label><Input type="password" maxLength={4} value={wPin} onChange={(e) => setWPin(e.target.value)} placeholder="••••" className="mt-1.5 tracking-[0.5em] text-center text-lg" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setWithdrawOpen(false)}>Cancel</Button>
            <Button onClick={requestWithdrawal} disabled={!wAmount || wPin.length < 4}>Confirm withdrawal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}