import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, TrendingUp, TrendingDown, Clock, Users } from "lucide-react";
import { formatVolume, formatPct } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function MarketCard({ market, compact = false }) {
  const [followed, setFollowed] = useState(false);
  const up = market.change >= 0;

  return (
    <Link
      to={`/market/${market.id}`}
      className="group block rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden"
    >
      {!compact && market.image && (
        <div className="relative h-28 overflow-hidden">
          <img src={market.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-card/80 backdrop-blur text-foreground border border-border">{market.categoryLabel}</span>
            {market.tag && <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">{market.tag}</span>}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setFollowed(!followed); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Follow market"
          >
            <Star className={cn("w-4 h-4", followed && "fill-current text-primary")} />
          </button>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start gap-2">
          {compact && (
            <button onClick={(e) => { e.preventDefault(); setFollowed(!followed); }} className="mt-0.5 shrink-0" aria-label="Follow">
              <Star className={cn("w-4 h-4 text-muted-foreground hover:text-primary", followed && "fill-current text-primary")} />
            </button>
          )}
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {market.question}
          </h3>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {market.closesIn}</span>
          <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {market.followers.toLocaleString()}</span>
          <span className="inline-flex items-center gap-1">{formatVolume(market.volume)} vol</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="rounded-xl bg-positive/10 border border-positive/20 px-3 py-2.5 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-positive">Yes</div>
            <div className="text-lg font-bold text-positive leading-tight">{market.yesPrice.toFixed(2)}¢</div>
            <div className="text-[11px] text-positive/70">{formatPct(market.probability)} chance</div>
          </div>
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-destructive">No</div>
            <div className="text-lg font-bold text-destructive leading-tight">{market.noPrice.toFixed(2)}¢</div>
            <div className="text-[11px] text-destructive/70">{formatPct(100 - market.probability)} chance</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs">
          <span className={cn("inline-flex items-center gap-1 font-medium", up ? "text-positive" : "text-destructive")}>
            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {up ? "+" : ""}{(market.change * 100).toFixed(1)}¢
          </span>
          <span className="text-muted-foreground">Liq {formatVolume(market.liquidity)}</span>
        </div>
      </div>
    </Link>
  );
}