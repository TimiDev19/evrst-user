import React, { useState } from "react";
import { Users, Copy, Check, Info } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { REFERRALS } from "@/lib/mockData";

const STEPS = [
  "Registers with your referral code",
  "Completes KYC verification",
  "Makes their first valid deposit",
  "Completes one genuine settled trade",
  "Remains in good standing for 30 days",
];

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const code = "ADA-EVRST-7X2";
  const link = `https://evrst.app/r/${code}`;
  const copy = (text) => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const completed = REFERRALS.filter((r) => r.status === "completed").length;
  const pending = REFERRALS.filter((r) => r.status === "pending").length;

  return (
    <div>
      <PageHeader title="Referrals" subtitle="Invite friends and earn points" icon={Users} />

      {/* Referral code card */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-1">Your referral link</h3>
        <p className="text-sm text-muted-foreground mb-4">Share this link. You earn points when your referral completes all steps.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 rounded-xl bg-card border border-border px-4 h-12 flex items-center font-mono text-sm text-foreground overflow-x-auto">{link}</div>
          <Button onClick={() => copy(link)}>{copied ? <><Check className="w-4 h-4 mr-2 text-positive" /> Copied</> : <><Copy className="w-4 h-4 mr-2" /> Copy link</>}</Button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Code:</span>
          <code className="font-mono font-semibold text-primary">{code}</code>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-black text-foreground">{REFERRALS.length}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-black text-amber-500">{pending}</div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-center">
          <div className="text-2xl font-black text-positive">{completed}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
      </div>

      {/* Referral list */}
      <h3 className="font-semibold text-foreground mb-3">Your referrals</h3>
      <div className="rounded-2xl border border-border bg-card divide-y divide-border mb-6">
        {REFERRALS.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4">
            <div>
              <div className="text-sm font-medium text-foreground">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.date}</div>
            </div>
            <div className="flex items-center gap-3">
              {r.points > 0 && <span className="text-sm font-semibold text-positive">+{r.points} pts</span>}
              <StatusBadge status={r.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Rules */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3"><Info className="w-4 h-4 text-primary" /><h3 className="font-semibold text-foreground">How referrals become final</h3></div>
        <p className="text-sm text-muted-foreground mb-4">Referral points become final only after the referred user completes all of the following:</p>
        <ol className="space-y-2.5">
          {STEPS.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</span>
              <span className="text-foreground pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}