import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MailCheck, Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState("verifying"); // verifying | success | invalid

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    const t = setTimeout(() => {
      // Simulate: tokens containing "expired" or "invalid" fail
      setState(/expired|invalid/i.test(token) ? "invalid" : "success");
    }, 1800);
    return () => clearTimeout(t);
  }, [token]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5">
      <div className="max-w-md w-full text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-white text-lg">E</div>
          <span className="text-2xl font-black tracking-tight text-foreground">EVRST</span>
        </Link>

        {state === "verifying" && (
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Verifying your email…</h1>
            <p className="text-sm text-muted-foreground mt-2">Please wait while we confirm your email address.</p>
          </div>
        )}

        {state === "success" && (
          <div className="bg-card rounded-2xl border border-positive/30 bg-positive/5 p-8">
            <div className="w-16 h-16 rounded-2xl bg-positive/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-positive" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Email verified</h1>
            <p className="text-sm text-muted-foreground mt-2 mb-6">Your email has been confirmed. You can now log in to EVRST.</p>
            <Link to="/login"><Button className="w-full">Continue to log in</Button></Link>
          </div>
        )}

        {state === "invalid" && (
          <div className="bg-card rounded-2xl border border-destructive/30 bg-destructive/5 p-8">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Link invalid or expired</h1>
            <p className="text-sm text-muted-foreground mt-2 mb-6">This verification link is no longer valid. Request a new one below.</p>
            <div className="space-y-2">
              <Link to="/register"><Button className="w-full"><Mail className="w-4 h-4 mr-2" /> Resend verification</Button></Link>
              <Link to="/support"><Button variant="outline" className="w-full">Contact support</Button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}