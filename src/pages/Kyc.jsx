import React, { useState } from "react";
import { ShieldCheck, Info, RefreshCw, LifeBuoy, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { USER } from "@/lib/mockData";

export default function Kyc() {
  const [status, setStatus] = useState(USER.kycStatus); // unverified | pending | verified | rejected
  const [starting, setStarting] = useState(false);
  const rejectionReason = "The ID document uploaded was blurry and the date of birth was not clearly visible. Please re-upload a clear, unexpired government-issued ID.";

  const start = () => {
    setStarting(true);
    setTimeout(() => { setStarting(false); setStatus("pending"); }, 1500);
  };

  return (
    <div>
      <PageHeader title="Identity verification (KYC)" subtitle="Handled securely by our verification provider" icon={ShieldCheck} />

      {/* Provider note */}
      <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 mb-6">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          KYC is processed and approved by our regulated verification provider — not manually by EVRST staff. Your documents are encrypted and never stored on EVRST servers.
        </p>
      </div>

      {/* Status card */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={
            "w-14 h-14 rounded-2xl flex items-center justify-center " +
            (status === "verified" ? "bg-positive/10" : status === "rejected" ? "bg-destructive/10" : status === "pending" ? "bg-blue-500/10" : "bg-amber-500/10")
          }>
            {status === "verified" ? <CheckCircle2 className="w-7 h-7 text-positive" /> :
             status === "rejected" ? <XCircle className="w-7 h-7 text-destructive" /> :
             status === "pending" ? <Loader2 className="w-7 h-7 text-blue-500 animate-spin" /> :
             <ShieldCheck className="w-7 h-7 text-amber-500" />}
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current status</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg font-bold text-foreground capitalize">{status}</span>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">Country</div>
            <div className="font-medium text-foreground mt-0.5">{USER.country}</div>
          </div>
          <div className="rounded-xl bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">Verification provider</div>
            <div className="font-medium text-foreground mt-0.5">Smile ID</div>
          </div>
        </div>
      </div>

      {/* Rejection / correction */}
      {status === "rejected" && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 mb-6">
          <h3 className="font-semibold text-destructive mb-2">Verification rejected</h3>
          <p className="text-sm text-muted-foreground mb-1">Reason:</p>
          <p className="text-sm text-foreground mb-4">{rejectionReason}</p>
          <div className="rounded-xl bg-card border border-border p-3">
            <p className="text-sm font-medium text-foreground mb-1">How to fix:</p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Use a well-lit, non-glare environment.</li>
              <li>Upload a clear photo of an unexpired ID (NIN slip, passport, driver's licence, or voter's card).</li>
              <li>Ensure all four corners of the document are visible.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Pending state */}
      {status === "pending" && (
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            <h3 className="font-semibold text-foreground">Verification in progress</h3>
          </div>
          <p className="text-sm text-muted-foreground">Your documents are being reviewed by the provider. This usually takes a few minutes. You'll get a notification when it's done.</p>
        </div>
      )}

      {/* Verified state */}
      {status === "verified" && (
        <div className="rounded-2xl border border-positive/30 bg-positive/5 p-5 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-positive" />
            <h3 className="font-semibold text-positive">You're verified</h3>
          </div>
          <p className="text-sm text-muted-foreground">Your identity is verified. You can trade, deposit and withdraw on EVRST.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {status === "unverified" && (
          <Button onClick={start} disabled={starting}>
            {starting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Starting…</> : "Start KYC"}
          </Button>
        )}
        {status === "rejected" && (
          <Button onClick={start} disabled={starting}>
            {starting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Retrying…</> : <><RefreshCw className="w-4 h-4 mr-2" /> Retry KYC</>}
          </Button>
        )}
        <Button variant="outline" asChild><a href="/support">Contact support</a></Button>
      </div>
    </div>
  );
}