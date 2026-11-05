"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lock, 
  AlertTriangle, 
  Video, 
  FileText, 
  Send, 
  DollarSign, 
  ExternalLink,
  FileCheck
} from "lucide-react";

export default function CollaborationWorkspacePage({ params }: { params: { id: string } }) {
  const [contentApproved, setContentApproved] = useState(true);
  const [publishAuthorized, setPublishAuthorized] = useState(false);
  const [metaVerified, setMetaVerified] = useState(false);
  const [payoutReleased, setPayoutReleased] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Authorisation execution
  const executeAuthorisation = () => {
    setLoadingAction("auth");
    setTimeout(() => {
      setPublishAuthorized(true);
      setLoadingAction(null);
    }, 700);
  };

  // Simulate Meta Graph API check
  const simulateMetaCheck = () => {
    if (!publishAuthorized) {
      alert("GrowOS Immutable Rule: Cannot verify Instagram post before Brand issues separate Publishing Authorisation.");
      return;
    }
    setLoadingAction("meta");
    setTimeout(() => {
      setMetaVerified(true);
      setLoadingAction(null);
    }, 1000);
  };

  // Simulate Payout Release (Strictly Gated!)
  const executePayout = () => {
    if (!contentApproved || !publishAuthorized || !metaVerified) {
      alert("Security Violation: Payout is strictly blocked until (1) Content Approved, (2) Separate Authorisation Granted, and (3) Meta Graph API Confirmed Live.");
      return;
    }
    setLoadingAction("payout");
    setTimeout(() => {
      setPayoutReleased(true);
      setLoadingAction(null);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link
            href="/brand/dashboard"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <span className="grow-badge grow-badge-primary text-[10px]">Active Collaboration</span>
            <span className="grow-badge grow-badge-verified text-[10px]">Bilateral Agreement E-Signed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pilgrim Skincare × Priya Sharma
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Campaign: Vitamin C Squalane Glow Face Oil • Deliverable: 1 Instagram Reel (30-60s)
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm font-bold text-white">Agreed Quote: ₹45,000</div>
          <div className="text-[10px] text-emerald-400 font-mono">RZP_DEP_99214_SECURED (Funds Held)</div>
        </div>
      </div>

      {/* The 4-Step Verification Gate Progress */}
      <div className="grow-card p-6 border-white/10 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Immutable Payout Security Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Step 1 */}
          <div className={`p-4 rounded-xl border ${contentApproved ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-white/10 text-slate-400"}`}>
            <div className="flex items-center justify-between font-bold mb-1">
              <span>1. Content Approval</span>
              {contentApproved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Draft v1.0 creative checks passed & SHA-256 hash verified.
            </p>
          </div>

          {/* Step 2 */}
          <div className={`p-4 rounded-xl border ${publishAuthorized ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-amber-950/30 border-amber-500/40 text-amber-300"}`}>
            <div className="flex items-center justify-between font-bold mb-1">
              <span>2. Separate Authorisation</span>
              {publishAuthorized ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-[11px] text-slate-400">
              {publishAuthorized ? "Explicit brand consent to publish granted." : "Independent second action pending brand sign-off."}
            </p>
          </div>

          {/* Step 3 */}
          <div className={`p-4 rounded-xl border ${metaVerified ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-white/10 text-slate-400"}`}>
            <div className="flex items-center justify-between font-bold mb-1">
              <span>3. Meta Graph API</span>
              {metaVerified ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-slate-500" />}
            </div>
            <p className="text-[11px] text-slate-400">
              {metaVerified ? "Live Instagram Reel confirmed with #Ad tags." : "Awaiting creator publication & API discovery."}
            </p>
          </div>

          {/* Step 4 */}
          <div className={`p-4 rounded-xl border ${payoutReleased ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-white/10 text-slate-400"}`}>
            <div className="flex items-center justify-between font-bold mb-1">
              <span>4. Payout Settlement</span>
              {payoutReleased ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-slate-500" />}
            </div>
            <p className="text-[11px] text-slate-400">
              {payoutReleased ? "Released via IMPS; TDS Sec 194J recorded." : "Guaranteed locked until Steps 1-3 complete."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Submitted Deliverable Asset & Verification */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grow-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Submitted Video Deliverable (v1.0)
              </h3>
              <span className="grow-badge grow-badge-verified text-[10px]">
                File Hash Check Passed
              </span>
            </div>

            {/* Video Player Placeholder with Hash */}
            <div className="aspect-video w-full rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-2">
              <Video className="w-10 h-10 text-indigo-400" />
              <div className="text-xs font-bold text-white">priya_serum_v1.mp4 (45s • 1080x1920 Reel)</div>
              <div className="font-mono text-[10px] text-slate-400 break-all max-w-md">
                SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </div>
            </div>

            {/* Claims & Brief Audit Check */}
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2 text-xs">
              <div className="font-bold text-slate-300">AI Compliance Guardrail Scan:</div>
              <div className="space-y-1 text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Product bottle clearly visible in first 3 seconds</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mandatory #Ad disclosure included in caption draft</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>No unsubstantiated medical claims detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Two-Step Separate Actions Trigger */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grow-card p-6 space-y-5 border-indigo-500/30">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Brand Authorization Triggers
            </h3>

            {/* Step 1 Status */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-semibold">Action 1: Content Approved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Step 2: Separate Authorisation Button */}
            <div className="space-y-2">
              <div className="text-xs text-slate-300">
                <strong>Action 2: Separate Publishing Authorisation</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Grants legal consent for the creator to publish this specific draft to Instagram.
                </p>
              </div>

              {publishAuthorized ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <span className="font-semibold">Authorisation Signed & Sent</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ) : (
                <button
                  onClick={executeAuthorisation}
                  disabled={loadingAction === "auth"}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 shadow-md shadow-amber-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loadingAction === "auth" ? "Recording Authorisation..." : "Execute Publishing Authorisation"}</span>
                </button>
              )}
            </div>

            {/* Step 3: Meta Live Check */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="text-xs text-slate-300">
                <strong>Action 3: Meta Graph API Live Check</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Verifies that the creator published the authorized video to their Instagram feed.
                </p>
              </div>

              {metaVerified ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <span className="font-semibold">Confirmed Live on Instagram</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ) : (
                <button
                  onClick={simulateMetaCheck}
                  disabled={!publishAuthorized || loadingAction === "meta"}
                  className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    publishAuthorized
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                      : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{loadingAction === "meta" ? "Querying Meta Graph API..." : "Query Meta Graph API (Verify Live)"}</span>
                </button>
              )}
            </div>

            {/* Step 4: Payout Execution */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <div className="text-xs text-slate-300">
                <strong>Action 4: Creator Payout Settlement</strong>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Disburses ₹45,000 from delayed settlement with TDS deduction recorded.
                </p>
              </div>

              {payoutReleased ? (
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>Payout Settled Successfully</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Net: ₹40,500 transferred to Creator • TDS (10%): ₹4,500 remitted.
                  </div>
                </div>
              ) : (
                <button
                  onClick={executePayout}
                  disabled={!metaVerified || loadingAction === "payout"}
                  className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    metaVerified
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                      : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>{loadingAction === "payout" ? "Executing Bank Payout..." : "Release Creator Payout"}</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
