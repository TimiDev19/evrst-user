import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Star, Clock, Users, TrendingUp, TrendingDown, ShieldCheck,
  BookOpen, AlertTriangle, Wallet
} from "lucide-react";
import { MARKETS, ORDER_BOOK, USER, formatVolume, formatPct, formatNaira } from "@/lib/mockData";
import StatusBadge from "@/components/evrst/StatusBadge";
import TradeGate from "@/components/evrst/TradeGate";
import OrderConfirmDialog from "@/components/evrst/OrderConfirmDialog";
import { cn } from "@/lib/utils";

export default function MarketDetail() {
  const { id } = useParams();
  const market = MARKETS.find((m) => m.id === id) || MARKETS[0];

  const [followed, setFollowed] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [riskAck, setRiskAck] = useState(false);
  const [gate, setGate] = useState(null); // null | login | kyc | wallet | funds
  const [order, setOrder] = useState(null); // null | { side }

  const userPosition = { side: "YES", shares: 1200, avgPrice: 0.58, value: 744, unrealized: 24 };

  const buy = (side) => {
    if (USER.kycStatus !== "verified") { setGate("kyc"); return; }
    if (USER.walletStatus !== "linked") { setGate("wallet"); return; }
    if (USER.tradingBalance <= 0) { setGate("funds"); return; }
    if (!acknowledged) { setRulesOpen(true); return; }
    setOrder({ side });
  };

  const maxBid = Math.max(...ORDER_BOOK.bids.map((b) => b.price));
  const minAsk = Math.min(...ORDER_BOOK.asks.map((a) => a.price));
  const totalBidSize = ORDER_BOOK.bids.reduce((s, b) => s + b.size, 0);
  const totalAskSize = ORDER_BOOK.asks.reduce((s, a) => s + a.size, 0);

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to markets
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {market.image && (
              <div className="relative h-40">
                <img src={market.image} alt="" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card/80 backdrop-blur border border-border">{market.categoryLabel}</span>
                  {market.tag && <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/20 text-primary">{market.tag}</span>}
                </div>
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">{market.question}</h1>
                <button onClick={() => setFollowed(!followed)} className="shrink-0 p-2 rounded-xl border border-border hover:bg-muted">
                  <Star className={cn("w-5 h-5", followed ? "fill-current text-primary" : "text-muted-foreground")} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><StatusBadge status={market.status} /> </span>
                <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> Closes {market.closingDate}</span>
                <span className="inline-flex items-center gap-1"><Users className="w-4 h-4" /> {market.followers.toLocaleString()} followers</span>
                <span className="inline-flex items-center gap-1">{formatVolume(market.volume)} volume</span>
              </div>
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-positive/30 bg-positive/10 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-positive uppercase tracking-wide">Yes</span>
                <TrendingUp className="w-4 h-4 text-positive" />
              </div>
              <div className="text-4xl font-black text-positive mt-2">{market.yesPrice.toFixed(2)}¢</div>
              <div className="text-sm text-positive/70 mt-1">{formatPct(market.probability)} implied probability</div>
            </div>
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-destructive uppercase tracking-wide">No</span>
                <TrendingDown className="w-4 h-4 text-destructive" />
              </div>
              <div className="text-4xl font-black text-destructive mt-2">{market.noPrice.toFixed(2)}¢</div>
              <div className="text-sm text-destructive/70 mt-1">{formatPct(100 - market.probability)} implied probability</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Volume" value={formatVolume(market.volume)} />
            <Stat label="Liquidity" value={formatVolume(market.liquidity)} />
            <Stat label="Best bid" value={`${maxBid.toFixed(2)}¢`} />
            <Stat label="Best ask" value={`${minAsk.toFixed(2)}¢`} />
          </div>

          {/* Order book */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold text-foreground mb-4">Live order book</h3>
            <div className="grid grid-cols-2 gap-x-6">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Bids (Yes)</div>
                {ORDER_BOOK.bids.map((b, i) => (
                  <div key={i} className="relative flex items-center justify-between py-1.5 text-sm">
                    <div className="absolute right-0 top-0 bottom-0 bg-positive/10 rounded" style={{ width: `${(b.size / totalBidSize) * 100}%` }} />
                    <span className="relative text-positive font-medium">{b.price.toFixed(2)}¢</span>
                    <span className="relative text-muted-foreground">{(b.size / 1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Asks (No)</div>
                {ORDER_BOOK.asks.map((a, i) => (
                  <div key={i} className="relative flex items-center justify-between py-1.5 text-sm">
                    <div className="absolute left-0 top-0 bottom-0 bg-destructive/10 rounded" style={{ width: `${(a.size / totalAskSize) * 100}%` }} />
                    <span className="relative text-destructive font-medium">{a.price.toFixed(2)}¢</span>
                    <span className="relative text-muted-foreground">{(a.size / 1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-2 font-semibold text-foreground"><BookOpen className="w-4 h-4 text-primary" /> Resolution rules</h3>
              <button onClick={() => setRulesOpen(!rulesOpen)} className="text-sm text-primary hover:underline">{rulesOpen ? "Hide" : "Read"}</button>
            </div>
            {rulesOpen ? (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Resolution source:</span> {market.resolutionSource}</p>
                <p>This market resolves YES if the stated event occurs on or before the closing date ({market.closingDate}). Otherwise it resolves NO. Resolution is determined solely by the cited official source. EVRST does not manually resolve markets.</p>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} className="mt-0.5 w-4 h-4 rounded accent-[#8833D2]" />
                  <span className="text-sm text-foreground">I have read and understood the resolution rules for this market.</span>
                </label>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Resolution source: {market.resolutionSource}. Click "Read" to view full rules and acknowledge before trading.</p>
            )}
          </div>
        </div>

        {/* Sidebar — trade panel */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 sticky top-20">
            <h3 className="font-semibold text-foreground mb-1">Place a trade</h3>
            <p className="text-xs text-muted-foreground mb-4">You authorize every order. EVRST never trades for you.</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button onClick={() => buy("YES")} className="h-12 rounded-xl bg-positive/15 border border-positive/30 text-positive font-bold hover:bg-positive/25 transition-colors">
                Buy YES<br /><span className="text-xs font-normal">{market.yesPrice.toFixed(2)}¢</span>
              </button>
              <button onClick={() => buy("NO")} className="h-12 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive font-bold hover:bg-destructive/25 transition-colors">
                Buy NO<br /><span className="text-xs font-normal">{market.noPrice.toFixed(2)}¢</span>
              </button>
            </div>

            {userPosition && (
              <div className="rounded-xl bg-muted/50 p-3 mb-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Your position</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-positive font-medium">{userPosition.shares} YES</span>
                  <span className="text-muted-foreground">@ {userPosition.avgPrice.toFixed(2)}¢</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Unrealized</span>
                  <span className={userPosition.unrealized >= 0 ? "text-positive" : "text-destructive"}>{userPosition.unrealized >= 0 ? "+" : ""}{formatNaira(userPosition.unrealized)}</span>
                </div>
                <button className="w-full mt-3 h-9 rounded-lg border border-border text-sm font-medium hover:bg-muted">Sell position</button>
              </div>
            )}

            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Trading is risky. You can lose your full stake. First trade requires rules acknowledgement.</span>
            </div>

            {!acknowledged && (
              <p className="text-xs text-center text-amber-500 mt-2">Acknowledge rules to enable trading.</p>
            )}
          </div>
        </div>
      </div>

      <TradeGate open={!!gate} onOpenChange={() => setGate(null)} reason={gate || "login"} />
      <OrderConfirmDialog open={!!order} onOpenChange={() => setOrder(null)} market={market} side={order?.side} />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-foreground mt-0.5">{value}</div>
    </div>
  );
}