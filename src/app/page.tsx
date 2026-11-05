"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  TrendingUp, 
  Instagram, 
  DollarSign, 
  FileText, 
  Clock 
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-600/20 blur-[130px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center relative z-10">
        
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>GrowOS • The Operating System for Indian D2C Influencer Marketing</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          AI-Powered Creator Intelligence & Guaranteed Payout Escrow for{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Fashion & Beauty Brands
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Not a basic directory. A complete commercial pipeline: AI brief generation, Meta-verified discovery, 
          delayed settlement deposits, two-step brand authorizations, and payouts released <strong>only after live Instagram verification</strong>.
        </p>

        {/* 3 Direct Portal Launchpads */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/brand/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 transition-all group"
          >
            <Briefcase className="w-4 h-4" />
            <span>Launch Brand Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/creator/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 shadow-xl shadow-pink-600/25 flex items-center justify-center gap-2.5 transition-all group"
          >
            <UserCheck className="w-4 h-4" />
            <span>Launch Creator Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/dashboard"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Admin Center</span>
          </Link>
        </div>

        {/* Regulatory & Security Compliance Tags */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-white/5 pt-8">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>RBI-Compliant Delayed Settlement</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>GST & TDS (Sec 194J) Automation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Meta Graph API Integration</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ASCI #Ad Disclosure Enforcement</span>
          </div>
        </div>
      </section>

      {/* The Immutable 4-Step Payout Security Protocol */}
      <section className="max-w-6xl mx-auto px-4 pb-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="grow-badge grow-badge-primary mb-2">Core Security Architecture</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The Immutable Payout Gate</h2>
          <p className="text-sm text-slate-400 mt-2">
            GrowOS strictly guarantees that creator payouts are never released on upload or before separate brand authorisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="grow-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              1
            </div>
            <h3 className="font-bold text-white text-base">Content Approval</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Brand reviews exact video draft, SHA-256 hash, music rights, and claims compliance. Content approved != permission to post.
            </p>
          </div>

          <div className="grow-card p-6 space-y-3 border-amber-500/30 bg-amber-950/10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              2
            </div>
            <h3 className="font-bold text-white text-base">Separate Authorisation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Brand explicitly issues an independent, cryptographic Publishing Authorisation with exact schedule and target date window.
            </p>
          </div>

          <div className="grow-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
              3
            </div>
            <h3 className="font-bold text-white text-base">Meta API Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              GrowOS queries official Instagram Graph API to verify live existence, caption tokens (#Ad, #Collab), and hash match.
            </p>
          </div>

          <div className="grow-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              4
            </div>
            <h3 className="font-bold text-white text-base">Settlement Payout</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Funds in delayed settlement are credited to creator bank account via NEFT/IMPS with TDS deducted and double-entry logged.
            </p>
          </div>
        </div>
      </section>

      {/* The 10-Step Full Journey Overview */}
      <section className="max-w-6xl mx-auto px-4 pb-24 relative z-10 border-t border-white/10 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Full Commercial Lifecycle</h2>
          <p className="text-sm text-slate-400 mt-2">
            From initial product onboarding to long-term performance attribution.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {[
            { step: "01", name: "AI Campaign Brief", desc: "Product, goals & deliverables" },
            { step: "02", name: "Content Concepts", desc: "2-3 tailored creative angles" },
            { step: "03", name: "Creator Discovery", desc: "Meta-verified search & fit score" },
            { step: "04", name: "Gated Negotiation", desc: "Strict private chat & capped offers" },
            { step: "05", name: "Legal E-Sign", desc: "Bilateral signed agreements" },
            { step: "06", name: "Secured Escrow", desc: "Delayed settlement deposit hold" },
            { step: "07", name: "Draft & Hash Review", desc: "Brand creative approval" },
            { step: "08", name: "Publishing Consent", desc: "Separate brand authorization" },
            { step: "09", name: "Instagram Publish", desc: "Live Meta API verification" },
            { step: "10", name: "Payout & Snapshots", desc: "24h, 7d, 30d performance tracking" },
          ].map((item) => (
            <div key={item.step} className="grow-card p-4 space-y-1">
              <span className="font-mono text-[10px] text-indigo-400 font-bold">{item.step}</span>
              <div className="font-bold text-white text-xs">{item.name}</div>
              <div className="text-[11px] text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
