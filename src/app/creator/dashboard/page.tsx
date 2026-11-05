"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Instagram, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lock, 
  UploadCloud, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText, 
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Share2
} from "lucide-react";

export default function CreatorDashboard() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"workspace" | "earnings" | "mediakit">("workspace");

  const copyMediaKit = () => {
    navigator.clipboard.writeText("https://growos.in/c/priyasharma");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Creator Profile Header with Official Verification Badges */}
      <div className="grow-card p-6 border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 p-0.5">
            <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-xl font-bold text-white">
              PS
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-white">Priya Sharma</h1>
              <span className="grow-badge grow-badge-verified text-[11px]">
                <ShieldCheck className="w-3 h-3" />
                Meta API Connected
              </span>
              <span className="grow-badge grow-badge-verified text-[11px]">
                PAN & Bank KYC Approved
              </span>
            </div>
            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
              <span>@priyabeauty.in</span>
              <span>•</span>
              <span>85.4K Verified Instagram Followers</span>
              <span>•</span>
              <span>Clean Skincare & D2C Beauty</span>
            </div>
          </div>
        </div>

        {/* Media Kit Public URL Share */}
        <div className="flex items-center gap-3">
          <button
            onClick={copyMediaKit}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copiedLink ? "Media Kit Copied!" : "Copy Public Media Kit"}</span>
          </button>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 flex items-center gap-2 shadow-lg shadow-pink-600/20 transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Official Meta Account</span>
          </a>
        </div>
      </div>

      {/* Trust & Provenance Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="grow-card p-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
            Official Authenticity Score
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            94 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span className="text-emerald-400 font-semibold">[Meta API Verified]</span> 89% genuine India reach
          </div>
        </div>

        <div className="grow-card p-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
            Average Reel Views
          </div>
          <div className="text-2xl font-bold text-white">42,800</div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span className="text-emerald-400 font-semibold">[API Verified]</span> 4.8% Engagement Rate
          </div>
        </div>

        <div className="grow-card p-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
            Escrow Secured Earnings
          </div>
          <div className="text-2xl font-bold text-white">₹45,000</div>
          <div className="text-[11px] text-amber-400 mt-1">
            Funds in delayed settlement; unlocks upon live post
          </div>
        </div>
      </div>

      {/* Main Collaboration Workspace */}
      <div className="grow-card p-6 border-white/10 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Active Collaboration Workspace</h2>
              <p className="text-xs text-slate-400">Brand: Pilgrim Skincare • Campaign: Vitamin C Squalane Glow Serum</p>
            </div>
            <span className="grow-badge grow-badge-primary">
              Contract Agreement E-Signed
            </span>
          </div>
        </div>

        {/* 4-Step Visual Lifecycle */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="text-xs font-bold text-slate-200">Publication & Payout Protocol:</div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            {/* Step 1 */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>1. Draft Approved</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                SHA-256 hash locked
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Brand Authorisation</span>
              </div>
              <div className="text-[10px] text-slate-300 mt-1">
                Waiting for brand to issue posting consent
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>3. Publish & Meta Verify</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Requires Authorisation first
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-slate-500">
              <div className="flex items-center gap-1.5 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>4. Bank Settlement</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Direct NEFT / IMPS via RBI Provider
              </div>
            </div>
          </div>
        </div>

        {/* Creator Content Version Submission Box */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-white text-sm">Submitted Deliverable: Version 1.0</span>
            </div>
            <span className="grow-badge grow-badge-verified text-[10px]">
              Brand Approved
            </span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs space-y-1">
            <div className="text-slate-400">Asset: <span className="text-slate-200">priya_serum_v1.mp4 (48.2 MB)</span></div>
            <div className="text-slate-400 truncate">SHA-256 Checksum: <span className="text-indigo-300">7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</span></div>
            <div className="text-slate-400">Mandatory Tagging: <span className="text-pink-300">#Ad #PilgrimCleanGlow @pilgrimindia</span></div>
          </div>

          {/* Posting Gated Notice */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-xs text-amber-200">
                <strong>Publishing Disabled:</strong> The brand has approved this draft, but has not yet issued the separate <em>Publishing Authorisation</em>. Do not post to Instagram until authorization is granted.
              </div>
            </div>
            <button
              disabled
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-white/5 border border-white/10 cursor-not-allowed opacity-60 flex-shrink-0"
            >
              Instagram Publish Locked
            </button>
          </div>
        </div>

        {/* Earnings & Invoicing Summary (No internal commission exposed) */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-bold text-white text-sm">Commercial Compensation Summary</div>
            <div className="text-slate-400">Agreed Net Quotation: ₹45,000 • TDS Sec 194J (10%): ₹4,500 • Net Payable: ₹40,500</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="grow-badge grow-badge-primary">
              GST Invoice Auto-Generated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
