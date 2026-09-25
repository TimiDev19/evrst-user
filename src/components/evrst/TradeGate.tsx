import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, ShieldCheck, Wallet, PlusCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";

// reason: login | kyc | wallet | funds
export default function TradeGate({ open, onOpenChange, reason = "login" }) {
  const config = {
    login: { icon: LogIn, title: "Sign in to trade", body: "Create an account or log in to buy YES or NO on this market.", action: "Log in / Create account", to: "/login" },
    kyc: { icon: ShieldCheck, title: "Complete KYC to trade", body: "Verify your identity before you can place any trades on EVRST.", action: "Start KYC", to: "/kyc" },
    wallet: { icon: Wallet, title: "Connect wallet to trade", body: "Link your wallet so EVRST can map your trading balance.", action: "Link wallet", to: "/wallet" },
    funds: { icon: PlusCircle, title: "Add funds to trade", body: "Your trading balance is empty. Add funds to start trading.", action: "Fund account", to: "/fund" },
  }[reason];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
            <config.icon className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.body}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Link to={config.to} className="w-full">
            <Button className="w-full">{config.action}</Button>
          </Link>
          <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>Not now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}