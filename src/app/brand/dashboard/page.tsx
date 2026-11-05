"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  PlusCircle, 
  Compass, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  FileCheck, 
  Lock, 
  Eye, 
  Send, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Video
} from "lucide-react";

export default function BrandDashboard() {
  const [selectedRole, setSelectedRole] = useState<"Owner" | "Approver" | "Finance">("Owner");
  
  // Collaborations tracking the strict 4-step immutable payout rule
  const [collaborations, setCollaborations] = useState([
    {
      id: "collab-101",
      creatorName: "Priya Sharma",
      handle: "@priyabeauty.in",
      followers: "85K",
      niche: "Skincare / Clean Beauty",
      campaign: "Vitamin C Squalane Glow Serum Launch",
      budget: 45000,
      depositRef: "RZP_DEP_99214_SECURED",
      depositStatus: "Funds Secured (Delayed Settlement)",
      contentDraftUrl: "https://assets.growos.in/drafts/priya_serum_v1.mp4",
      contentHash: "sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      isContentApproved: true,      // Step 1: Content Approved
      isPublishAuthorized: false,    // Step 2: SEPARATE Publishing Authorisation (NOT done yet!)
      metaApiVerified: false,        // Step 3: Meta API Live verification (Pending)
      payoutReleased: false,         // Step 4: Payout Locked
      authenticityScore: 94,
    },
    {
      id: "collab-102",
      creatorName: "Ananya Lifestyle",
      handle: "@ananya_vlogs",
      followers: "120K",
      niche: "Fashion & Lifestyle",
      campaign: "Festive Silk Sari Collection",
      budget: 65000,
      depositRef: "RZP_DEP_99288_SECURED",
      depositStatus: "Funds Secured (Delayed Settlement)",
      contentDraftUrl: "https://assets.growos.in/drafts/ananya_festive_v2.mp4",
      contentHash: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      isContentApproved: true,      // Step 1: Approved
      isPublishAuthorized: true,     // Step 2: Separate Authorisation Granted!
      metaApiVerified: true,         // Step 3: Meta Graph API Confirmed Live!
      metaPostUrl: "https://instagram.com/p/DB129X0sk",
      payoutReleased: true,          // Step 4: Payout Executed!
      authenticityScore: 91,
    },
  ]);

  const [authorisingId, setAuthorisingId] = useState<string | null>(null);

  const handleGrantAuthorisation = (id: string) => {
    setAuthorisingId(id);
    setTimeout(() => {
      setCollaborations((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, isPublishAuthorized: true } : c
        )
      );
      setAuthorisingId(null);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Brand Header Banner with GSTIN verification */}
      <div className="grow-card p-6 border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="grow-badge grow-badge-primary">
              <Sparkles className="w-3 h-3" />
              Brand Operations
            </span>
            <span className="grow-badge grow-badge-verified">
              <ShieldCheck className="w-3 h-3" />
              GSTIN Verified: 27AABCP1330L1ZM
            </span>
            <span className="grow-badge grow-badge-primary">
              Pilgrim Skincare India
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Pilgrim Marketing Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fashion, Skincare & Lifestyle Influencer Intelligence Pipeline (India D2C)
          </p>
        </div>

        {/* Team Role Selector & Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 text-xs">
            <span className="text-slate-400 pl-2">Role:</span>
            {(["Owner", "Approver", "Finance"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedRole === r
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <Link
            href="/brand/campaigns/create"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>AI Campaign Brief</span>
          </Link>
          <Link
            href="/brand/discover"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Discover Creators</span>
          </Link>
        </div>
      </div>

      {/* Critical Core Rule Notice Bar */}
      <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-200 leading-relaxed">
          <strong>GrowOS Immutable Payout Rule:</strong> Funds in delayed settlement deposit are released to a creator <em>ONLY AFTER</em>:
          <strong> (1) Content Approval</strong> (reviewing creative brief and SHA-256 hash), 
          <strong> (2) Separate Publishing Authorisation</strong> (explicit brand consent to post), and 
          <strong> (3) Official Meta Graph API Verification</strong> of the live Instagram post.
        </div>
      </div>

      {/* Real Financial & Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="grow-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>TOTAL SECURED DEPOSIT</span>
            <DollarSign className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">₹1,10,000</div>
          <span className="text-[11px] text-emerald-400 font-medium">Held via Razorpay Route</span>
        </div>

        <div className="grow-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>ACTIVE COLLABORATIONS</span>
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-bold text-white">2 Creators</div>
          <span className="text-[11px] text-slate-400">1 awaiting publication</span>
        </div>

        <div className="grow-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>AWAITING PUBLISH AUTH</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">1 Video Draft</div>
          <span className="text-[11px] text-slate-400">Content approved; Auth required</span>
        </div>

        <div className="grow-card p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>VERIFIED META POSTS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">1 Completed</div>
          <span className="text-[11px] text-emerald-300">Live & tracked via Graph API</span>
        </div>
      </div>

      {/* Collaborations Workflow Table */}
      <div className="grow-card p-6 border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Collaborations & Two-Step Authorisation Engine</h2>
            <p className="text-xs text-slate-400">Real-time status of content drafts, hashes, publishing authorisations, and Meta API verification.</p>
          </div>
        </div>

        <div className="space-y-4">
          {collaborations.map((collab) => (
            <div
              key={collab.id}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-4"
            >
              {/* Top Details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{collab.creatorName}</span>
                    <span className="text-xs text-slate-400">{collab.handle}</span>
                    <span className="grow-badge grow-badge-verified text-[10px]">
                      Authenticity: {collab.authenticityScore}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Campaign: <span className="text-slate-200 font-medium">{collab.campaign}</span> • Niche: {collab.niche}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white">₹{collab.budget.toLocaleString()}</div>
                  <div className="text-[10px] text-indigo-400 font-mono">{collab.depositRef}</div>
                </div>
              </div>

              {/* Four-Step Visual Gate Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                {/* Step 1: Content Approval */}
                <div className={`p-3 rounded-xl border ${collab.isContentApproved ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-white/10 text-slate-400"}`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {collab.isContentApproved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>1. Content Approval</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {collab.contentHash.slice(0, 22)}...
                  </div>
                </div>

                {/* Step 2: SEPARATE Publishing Authorisation */}
                <div className={`p-3 rounded-xl border ${collab.isPublishAuthorized ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-amber-950/30 border-amber-500/40 text-amber-300"}`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {collab.isPublishAuthorized ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                    <span>2. Publishing Authorisation</span>
                  </div>
                  <div className="text-[10px]">
                    {collab.isPublishAuthorized ? "Authorised by Brand" : "Pending Separate Action"}
                  </div>
                </div>

                {/* Step 3: Meta Graph API Verification */}
                <div className={`p-3 rounded-xl border ${collab.metaApiVerified ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-white/10 text-slate-400"}`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {collab.metaApiVerified ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>3. Meta API Verified</span>
                  </div>
                  <div className="text-[10px]">
                    {collab.metaApiVerified ? "Live on Instagram" : "Awaiting Publication"}
                  </div>
                </div>

                {/* Step 4: Payout Release */}
                <div className={`p-3 rounded-xl border ${collab.payoutReleased ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-white/10 text-slate-400"}`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {collab.payoutReleased ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
                    <span>4. Creator Payout</span>
                  </div>
                  <div className="text-[10px]">
                    {collab.payoutReleased ? "Settled (TDS Deducted)" : "Strictly Locked"}
                  </div>
                </div>
              </div>

              {/* Action Controls for Step 2 Separation */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <a
                    href={collab.contentDraftUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Inspect Draft Video</span>
                  </a>
                  <Link
                    href={`/brand/collaborations/${collab.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Workspace & Audit Log</span>
                  </Link>
                </div>

                {/* THE SEPARATE AUTHORISATION BUTTON */}
                {!collab.isPublishAuthorized && collab.isContentApproved && (
                  <button
                    onClick={() => handleGrantAuthorisation(collab.id)}
                    disabled={authorisingId === collab.id}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 shadow-md shadow-amber-600/20 flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {authorisingId === collab.id ? "Recording Authorisation..." : "Action 2: Grant Publishing Authorisation"}
                    </span>
                  </button>
                )}

                {collab.metaApiVerified && (
                  <a
                    href={collab.metaPostUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-900/40"
                  >
                    <span>View Verified Live Post ↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
