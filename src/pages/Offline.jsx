import React, { useState, useEffect } from "react";
import { WifiOff, RefreshCw, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MARKETS } from "@/lib/mockData";

export default function Offline() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
          <WifiOff className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="text-2xl font-black text-foreground">You're offline</h1>
        <p className="text-muted-foreground mt-2">EVRST needs a connection for live prices, trading, deposits and withdrawals.</p>

        <div className="flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 mt-6 text-left">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">While offline you cannot:</p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Deposit, withdraw or convert funds</li>
              <li>Place or cancel trades</li>
            </ul>
            <p className="mt-2">We never cache sensitive balance, KYC or support data offline.</p>
          </div>
        </div>

        <Button className="mt-6" onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" /> Reconnect
        </Button>

        {/* Cached public markets */}
        <div className="mt-8 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-foreground">Cached public markets</h3>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500">OUTDATED</span>
          </div>
          <div className="space-y-2">
            {MARKETS.slice(0, 4).map((m) => (
              <div key={m.id} className="rounded-xl border border-border bg-card p-3 opacity-70">
                <div className="text-sm font-medium text-foreground truncate">{m.question}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">YES {m.yesPrice.toFixed(2)}¢</span>
                  <span className="text-xs text-muted-foreground">cached · may be stale</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}