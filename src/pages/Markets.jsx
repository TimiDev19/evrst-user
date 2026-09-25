import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Flame, Sparkles, Clock, TrendingUp, ArrowRight } from "lucide-react";
import MarketCard from "@/components/evrst/MarketCard";
import { MARKETS, CATEGORIES } from "@/lib/mockData";
import { cn } from "@/lib/utils";

function Section({ icon: Icon, title, accent, children, cta }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Icon className={cn("w-5 h-5", accent)} /> {title}
        </h2>
        {cta}
      </div>
      {children}
    </section>
  );
}

export default function Markets() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return MARKETS.filter((m) => {
      const catOk = category === "all" || m.category === category;
      const qOk = !query || m.question.toLowerCase().includes(query.toLowerCase());
      return catOk && qOk;
    });
  }, [category, query]);

  const featured = MARKETS.filter((m) => m.featured);
  const trending = MARKETS.filter((m) => m.trending);
  const endingSoon = [...MARKETS].sort((a, b) => parseDays(a.closesIn) - parseDays(b.closesIn)).slice(0, 4);
  const newest = MARKETS.slice(-4).reverse();

  return (
    <div>
      {/* Hero strip */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-card to-card p-6 sm:p-8 mb-8">
        <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-primary/20 blur-[100px]" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 2,400+ live markets · Nigeria & Ghana
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground max-w-2xl">
            Trade YES or NO on the events shaping your world.
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base">
            Politics, sports, crypto, economy. Real prices, real liquidity. Browse freely — sign in to trade.
          </p>
        </div>
      </div>

      {/* Search + categories */}
      <div className="mb-6">
        <div className="relative sm:hidden mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search markets…"
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "shrink-0 px-4 h-9 rounded-full text-sm font-medium border transition-colors",
                category === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {category !== "all" || query ? (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">
            {query ? `Results for "${query}"` : CATEGORIES.find((c) => c.id === category)?.label}
            <span className="text-muted-foreground font-normal text-sm ml-2">({filtered.length})</span>
          </h2>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground text-sm">No markets found. Try a different search or category.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((m) => <MarketCard key={m.id} market={m} />)}
            </div>
          )}
        </div>
      ) : (
        <>
          <Section icon={Sparkles} title="Featured markets" accent="text-primary"
            cta={<Link to="/market/m1" className="text-sm text-primary hover:underline inline-flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((m) => <MarketCard key={m.id} market={m} />)}
            </div>
          </Section>

          <Section icon={Flame} title="Trending now" accent="text-amber-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trending.map((m) => <MarketCard key={m.id} market={m} />)}
            </div>
          </Section>

          <div className="grid lg:grid-cols-2 gap-8">
            <Section icon={Clock} title="Ending soon" accent="text-destructive">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {endingSoon.map((m) => <MarketCard key={m.id} market={m} compact />)}
              </div>
            </Section>
            <Section icon={TrendingUp} title="New markets" accent="text-positive">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {newest.map((m) => <MarketCard key={m.id} market={m} compact />)}
              </div>
            </Section>
          </div>
        </>
      )}
    </div>
  );
}

function parseDays(s) {
  const n = parseInt(s);
  if (s.endsWith("h")) return n / 24;
  return n;
}