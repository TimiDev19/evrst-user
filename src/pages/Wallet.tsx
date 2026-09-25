import React, { useState } from "react";
import { Wallet as WalletIcon, Copy, Check, Link2, AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { USER } from "@/lib/mockData";

export default function Wallet() {
  const [status, setStatus] = useState(USER.walletStatus);
  const [copied, setCopied] = useState(false);
  const [linking, setLinking] = useState(false);

  const address = USER.walletAddress;

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const init = () => { setLinking(true); setTimeout(() => { setLinking(false); setStatus("initialized"); }, 1400); };
  const linkPrivy = () => { setLinking(true); setTimeout(() => { setLinking(false); setStatus("linked"); }, 1600); };

  return (
    <div>
      <PageHeader title="Wallet" subtitle="Your on-chain wallet and ledger mapping" icon={WalletIcon} />

      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          EVRST will <span className="font-semibold text-foreground">never</span> ask for your private keys or seed phrase. Keep them secret and offline.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><WalletIcon className="w-6 h-6 text-primary" /></div>
            <div>
              <div className="text-sm text-muted-foreground">Wallet status</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-bold text-foreground capitalize">{status.replace("_", " ")}</span>
                <StatusBadge status={status} />
              </div>
            </div>
          </div>
        </div>

        {status !== "not_initialized" && (
          <div className="rounded-xl bg-muted/40 border border-border p-4">
            <div className="text-xs text-muted-foreground mb-1">Wallet address</div>
            <div className="flex items-center justify-between gap-3">
              <code className="text-sm font-mono text-foreground truncate">{address}</code>
              <Button variant="outline" size="sm" onClick={copy} className="shrink-0">
                {copied ? <><Check className="w-3.5 h-3.5 mr-1.5 text-positive" /> Copied</> : <><Copy className="w-3.5 h-3.5 mr-1.5" /> Copy</>}
              </Button>
            </div>
          </div>
        )}
      </div>

      {status === "not_initialized" && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4"><WalletIcon className="w-7 h-7 text-muted-foreground" /></div>
          <h3 className="font-semibold text-foreground">Wallet not initialized</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto mb-5">Initialize your EVRST wallet to receive deposits and map your trading balance.</p>
          <Button onClick={init} disabled={linking}>{linking ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Initializing…</> : "Initialize wallet"}</Button>
        </div>
      )}

      {status === "initialized" && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-1">Link your Privy wallet</h3>
          <p className="text-sm text-muted-foreground mb-4">Your wallet is initialized but not yet linked to a Privy account. Link it to enable on-chain mapping.</p>
          <Button onClick={linkPrivy} disabled={linking}>
            {linking ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Linking…</> : <><Link2 className="w-4 h-4 mr-2" /> Link Privy wallet</>}
          </Button>
        </div>
      )}

      {status === "linked" && (
        <div className="rounded-2xl border border-positive/30 bg-positive/5 p-6 mb-6">
          <div className="flex items-center gap-2 mb-1"><Check className="w-4 h-4 text-positive" /><h3 className="font-semibold text-positive">Wallet linked</h3></div>
          <p className="text-sm text-muted-foreground">Your wallet is linked and mapped. Deposits and trading balances sync automatically.</p>
        </div>
      )}

      <h3 className="font-semibold text-foreground mb-3">Ledger accounts</h3>
      <div className="space-y-2">
        {[
          { name: "Available balance (USDC)", addr: address, balance: "94.6 USDC" },
          { name: "Trading balance (USDC)", addr: "0x7a3F…trd1", balance: "65.5 USDC" },
          { name: "Reserved in orders", addr: "0x7a3F…rsv2", balance: "29.6 USDC" },
        ].map((a) => (
          <div key={a.name} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <div className="text-sm font-medium text-foreground">{a.name}</div>
              <code className="text-xs text-muted-foreground font-mono">{a.addr}</code>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">{a.balance}</div>
              <button className="text-xs text-primary hover:underline inline-flex items-center gap-1">View <ExternalLink className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        If linking fails, or your wallet is already linked to another account, contact support — never share your seed phrase.
      </p>
    </div>
  );
}