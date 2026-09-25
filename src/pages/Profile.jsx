import React, { useState } from "react";
import { User as UserIcon, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import PageHeader from "@/components/evrst/PageHeader";
import StatusBadge from "@/components/evrst/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER } from "@/lib/mockData";

export default function Profile() {
  const [nickname, setNickname] = useState(USER.nickname);
  const [saved, setSaved] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(USER.leaderboardVisible);
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }, 1000);
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account details" icon={UserIcon} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center text-primary font-black text-2xl">{nickname[0]}</div>
              <div>
                <div className="text-lg font-bold text-foreground">{nickname}</div>
                <div className="text-sm text-muted-foreground">{USER.email}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <StatusBadge status={USER.kycStatus} />
                  <span className="text-xs text-muted-foreground">{USER.country}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Edit profile</h3>
            <div className="space-y-4">
              <div>
                <Label>Nickname (public on leaderboard)</Label>
                <Input value={nickname} onChange={(e) => setNickname(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={USER.email} disabled className="mt-1.5 opacity-60" />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed here. Contact support to update it.</p>
              </div>
              <div>
                <Label>Country</Label>
                <Input value={USER.country} disabled className="mt-1.5 opacity-60" />
              </div>

              <div className="flex items-center justify-between rounded-xl bg-muted/40 border border-border p-3">
                <div>
                  <div className="text-sm font-medium text-foreground">Leaderboard identity</div>
                  <div className="text-xs text-muted-foreground">{leaderboardVisible ? "Your nickname is visible on the leaderboard" : "You appear as 'Private User'"}</div>
                </div>
                <button onClick={() => setLeaderboardVisible(!leaderboardVisible)} className="inline-flex items-center gap-2 text-sm text-primary">
                  {leaderboardVisible ? <><Eye className="w-4 h-4" /> Visible</> : <><EyeOff className="w-4 h-4" /> Hidden</>}
                </button>
              </div>

              <Button onClick={save} disabled={saving} className="w-full sm:w-auto">
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : saved ? <><Check className="w-4 h-4 mr-2 text-positive" /> Saved</> : "Save changes"}
              </Button>
            </div>
          </div>
        </div>

        {/* Side */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground text-sm mb-3">Account summary</h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd className="text-foreground font-medium truncate ml-2">{USER.email}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Country</dt><dd className="text-foreground font-medium">{USER.country}</dd></div>
              <div className="flex justify-between items-center"><dt className="text-muted-foreground">KYC</dt><dd><StatusBadge status={USER.kycStatus} /></dd></div>
              <div className="flex justify-between items-center"><dt className="text-muted-foreground">Wallet</dt><dd><StatusBadge status={USER.walletStatus} /></dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Level</dt><dd className="text-foreground font-medium">{USER.level}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Points</dt><dd className="text-foreground font-medium">{USER.points.toLocaleString()}</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground text-sm mb-2">Privacy</h3>
            <p className="text-xs text-muted-foreground">Your legal name, email, wallet and balances are never shown publicly. Only your chosen nickname and points appear on the leaderboard — and you can hide even that.</p>
          </div>
        </div>
      </div>
    </div>
  );
}