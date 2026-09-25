import React from "react";
import { cn } from "@/lib/utils";

const STYLES = {
  pending: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  processing: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  completed: "bg-positive/15 text-positive border-positive/30",
  failed: "bg-destructive/15 text-destructive border-destructive/30",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
  cancelled: "bg-muted text-muted-foreground border-border",
  verified: "bg-positive/15 text-positive border-positive/30",
  unverified: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  restricted: "bg-destructive/15 text-destructive border-destructive/30",
  "resolution-pending": "bg-amber-500/15 text-amber-500 border-amber-500/30",
  "provider-unavailable": "bg-destructive/15 text-destructive border-destructive/30",
  open: "bg-positive/15 text-positive border-positive/30",
  waiting: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  active: "bg-positive/15 text-positive border-positive/30",
};

const LABELS = {
  "resolution-pending": "Resolution Pending",
  "provider-unavailable": "Provider Unavailable",
};

export default function StatusBadge({ status, className, dot = true }) {
  const key = String(status).toLowerCase();
  const style = STYLES[key] || "bg-muted text-muted-foreground border-border";
  const label = LABELS[key] || key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", style, className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {label}
    </span>
  );
}