import React from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Brand panel */}
      <div className="hidden lg:flex w-[44%] relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-[#160F22] via-[#1a0f2e] to-[#0A0710]">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-positive/20 blur-[120px]" />
        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-black text-white text-lg">E</div>
          <span className="text-2xl font-black tracking-tight text-lilac">EVRST</span>
        </Link>
        <div className="relative">
          <h2 className="text-3xl font-bold text-[#F1E9FA] leading-tight">
            Trade the future.<br />Settle on reality.
          </h2>
          <p className="text-[#F1E9FA]/60 mt-4 max-w-sm">
            Nigeria & Ghana's prediction market. Buy YES or NO on real-world events — politics, sports, crypto, and more.
          </p>
          <div className="flex items-center gap-6 mt-8 text-[#F1E9FA]/70 text-sm">
            <div><span className="block text-2xl font-bold text-[#F1E9FA]">2,400+</span>live markets</div>
            <div><span className="block text-2xl font-bold text-[#F1E9FA]">₦1.2B</span>volume traded</div>
          </div>
        </div>
        <p className="relative text-xs text-[#F1E9FA]/40">© EVRST Markets · Trading involves risk</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-white text-lg">E</div>
            <span className="text-2xl font-black tracking-tight text-foreground">EVRST</span>
          </Link>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4 shadow-lg shadow-primary/30">
              {Icon && <Icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-1.5 text-sm">{subtitle}</p>}
          </div>
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8">
            {children}
          </div>
          {footer && <p className="text-center text-sm text-muted-foreground mt-6">{footer}</p>}
        </div>
      </div>
    </div>
  );
}