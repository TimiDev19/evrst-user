import React from "react";
import { Loader2, Inbox, AlertTriangle, Lock } from "lucide-react";

export function LoadingState({ label = "Loading…", rows = 3 }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
        <Loader2 className="w-4 h-4 animate-spin" /> {label}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 rounded-xl bg-muted/60 animate-pulse-soft" />
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", description = "Please try again in a moment.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-destructive" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          Try again
        </button>
      )}
    </div>
  );
}

export function RestrictedState({ title = "Access restricted", description = "You don't have permission to view this.", action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
        <Lock className="w-7 h-7 text-amber-500" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function PageStates({ loading, error, empty, emptyProps, errorProps, children }) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState {...errorProps} />;
  if (empty) return <EmptyState {...emptyProps} />;
  return children;
}