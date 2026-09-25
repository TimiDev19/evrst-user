import React, { useState } from "react";
import { Shield, KeyRound, Lock, Smartphone, LogOut, Loader2, Check } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function Security() {
  const [pwOpen, setPwOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = (close) => { setSaved(true); setTimeout(() => { setSaved(false); close(false); }, 1200); };

  return (
    <div>
      <PageHeader title="Security" subtitle="Protect your account and funds" icon={Shield} />

      <div className="space-y-4 max-w-2xl">
        {/* Password */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Lock className="w-5 h-5 text-primary" /></div>
            <div><h3 className="font-semibold text-foreground">Password</h3><p className="text-xs text-muted-foreground">Change your login password</p></div>
          </div>
          <Button variant="outline" onClick={() => setPwOpen(true)}>Change password</Button>
        </div>

        {/* Withdrawal PIN */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><KeyRound className="w-5 h-5 text-amber-500" /></div>
            <div><h3 className="font-semibold text-foreground">Withdrawal PIN</h3><p className="text-xs text-muted-foreground">Required for every withdrawal</p></div>
          </div>
          <Button variant="outline" onClick={() => setPinOpen(true)}>Reset withdrawal PIN</Button>
        </div>

        {/* Sessions */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-positive/10 flex items-center justify-center"><Smartphone className="w-5 h-5 text-positive" /></div>
            <div><h3 className="font-semibold text-foreground">Sessions & devices</h3><p className="text-xs text-muted-foreground">Manage where you're logged in</p></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3 text-sm">
              <div><div className="font-medium text-foreground">Lagos · Chrome (current)</div><div className="text-xs text-muted-foreground">Active now</div></div>
              <span className="text-xs text-positive font-medium">This device</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/40 p-3 text-sm">
              <div><div className="font-medium text-foreground">Accra · EVRST Mobile App</div><div className="text-xs text-muted-foreground">2 hours ago</div></div>
              <button className="text-xs text-destructive hover:underline">Revoke</button>
            </div>
          </div>
        </div>

        {/* 2FA */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"><Shield className="w-5 h-5 text-muted-foreground" /></div>
            <div><h3 className="font-semibold text-foreground">Two-factor authentication</h3><p className="text-xs text-muted-foreground">Add an extra layer of security (coming soon)</p></div>
          </div>
          <Button variant="outline" disabled>Enable 2FA — soon</Button>
        </div>

        {/* Logout */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-center justify-between">
            <div><h3 className="font-semibold text-foreground">Log out</h3><p className="text-xs text-muted-foreground">Sign out of this device</p></div>
            <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10"><LogOut className="w-4 h-4 mr-2" /> Log out</Button>
          </div>
        </div>
      </div>

      {/* Password modal */}
      <Dialog open={pwOpen} onOpenChange={setPwOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Change password</DialogTitle><DialogDescription>Choose a strong, unique password.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <div><Label>Current password</Label><Input type="password" className="mt-1.5" /></div>
            <div><Label>New password</Label><Input type="password" className="mt-1.5" /></div>
            <div><Label>Confirm new password</Label><Input type="password" className="mt-1.5" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPwOpen(false)}>Cancel</Button>
            <Button onClick={() => save(setPwOpen)}>{saved ? <><Check className="w-4 h-4 mr-2 text-positive" /> Changed</> : "Change password"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PIN modal */}
      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Reset withdrawal PIN</DialogTitle><DialogDescription>Enter your current PIN, then choose a new one.</DialogDescription></DialogHeader>
          <div className="space-y-3">
            <div><Label>Current PIN</Label><Input type="password" maxLength={4} className="mt-1.5 tracking-[0.5em] text-center text-lg" /></div>
            <div><Label>New PIN</Label><Input type="password" maxLength={4} className="mt-1.5 tracking-[0.5em] text-center text-lg" /></div>
            <div><Label>Confirm new PIN</Label><Input type="password" maxLength={4} className="mt-1.5 tracking-[0.5em] text-center text-lg" /></div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPinOpen(false)}>Cancel</Button>
            <Button onClick={() => save(setPinOpen)}>{saved ? <><Check className="w-4 h-4 mr-2 text-positive" /> Reset</> : "Reset PIN"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}