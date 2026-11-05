"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Lock, 
  Users, 
  Activity, 
  FileCheck, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [activeAdmin, setActiveAdmin] = useState<"Admin 1 (Maker)" | "Admin 2 (Checker)">("Admin 2 (Checker)");

  // Maker-Checker Override Queue
  const [makerCheckerQueue, setMakerCheckerQueue] = useState([
    {
      id: "MC-881",
      actionType: "Deposit Refund to Brand",
      brandName: "Foxtale D2C India",
      amount: 35000,
      reason: "Creator unresponsiveness after 7 business days past brief deadline",
      initiatedBy: "Admin 1 (Maker) [admin1@growos.in]",
      status: "Awaiting Checker Approval",
      isExecuted: false,
    },
    {
      id: "MC-882",
      actionType: "Manual Payout Override",
      creatorName: "Kavya Beauty",
      amount: 50000,
      reason: "Meta Webhook timeout; manual Instagram permalink verified by senior lead",
      initiatedBy: "Admin 1 (Maker) [admin1@growos.in]",
      status: "Awaiting Checker Approval",
      isExecuted: false,
    },
  ]);

  const [executingId, setExecutingId] = useState<string | null>(null);

  const handleCheckerApprove = (id: string) => {
    if (activeAdmin === "Admin 1 (Maker)") {
      alert("Security Violation: Maker-Checker Policy blocks Admin 1 from approving their own request. Please switch active persona to Admin 2 (Checker).");
      return;
    }

    setExecutingId(id);
    setTimeout(() => {
      setMakerCheckerQueue((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Executed & Ledger Updated", isExecuted: true } : item
        )
      );
      setExecutingId(null);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="grow-card p-6 border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="grow-badge grow-badge-danger">
              <ShieldAlert className="w-3 h-3" />
              GrowOS Super Admin
            </span>
            <span className="grow-badge grow-badge-verified">
              Maker-Checker Protocol Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Compliance & Financial Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Double-Entry Ledger, RBI Delayed Settlement Audits, and Fraud Intelligence
          </p>
        </div>

        {/* Persona Toggle for Testing Maker-Checker Rule */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs">
          <span className="text-slate-400 pl-2">Current Admin:</span>
          {(["Admin 1 (Maker)", "Admin 2 (Checker)"] as const).map((adm) => (
            <button
              key={adm}
              onClick={() => setActiveAdmin(adm)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeAdmin === adm
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {adm}
            </button>
          ))}
        </div>
      </div>

      {/* Double-Entry Financial Ledger Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="grow-card p-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
            Total Secured Deposits
          </div>
          <div className="text-2xl font-bold text-white">₹14,50,000</div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">
            Held in RBI Escrow / Split
          </div>
        </div>

        <div className="grow-card p-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
            Settled Creator Payouts
          </div>
          <div className="text-2xl font-bold text-indigo-400">₹9,80,000</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Meta API Verified Only
          </div>
        </div>

        <div className="grow-card p-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
            GrowOS Retained Commission
          </div>
          <div className="text-2xl font-bold text-amber-400">₹1,95,000</div>
          <div className="text-[11px] text-slate-400 mt-1">
            10-15% Platform Margin
          </div>
        </div>

        <div className="grow-card p-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-1">
            TDS Remitted (Sec 194J)
          </div>
          <div className="text-2xl font-bold text-emerald-400">₹98,000</div>
          <div className="text-[11px] text-slate-400 mt-1">
            10% Income Tax Remittance
          </div>
        </div>
      </div>

      {/* Maker-Checker Refund & Override Queue */}
      <div className="grow-card p-6 border-amber-500/30 bg-amber-950/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Maker-Checker Authorization Desk</h2>
          </div>
          <span className="text-xs text-amber-300 font-medium">
            Rule: Single-admin financial executions are strictly blocked.
          </span>
        </div>

        <div className="space-y-3">
          {makerCheckerQueue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.actionType}</span>
                  <span className="text-xs font-mono text-indigo-400">[{item.id}]</span>
                  <span className={`grow-badge text-[10px] ${item.isExecuted ? "grow-badge-verified" : "grow-badge-pending"}`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  Target: <strong>{item.brandName || item.creatorName}</strong> • Amount: <strong className="text-white">₹{item.amount.toLocaleString()}</strong>
                </div>
                <div className="text-xs text-slate-400">
                  Initiated by: {item.initiatedBy} • Reason: {item.reason}
                </div>
              </div>

              {!item.isExecuted && (
                <button
                  onClick={() => handleCheckerApprove(item.id)}
                  disabled={executingId === item.id}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 shadow-md shadow-emerald-600/20 flex-shrink-0 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {executingId === item.id ? "Validating Ledger..." : "Checker: Sign & Execute"}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fraud Intelligence & Meta Anomaly Review Queue */}
      <div className="grow-card p-6 border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Authenticity & Fraud Intelligence Queue</h2>
            <p className="text-xs text-slate-400">Only verified Meta API telemetry used. Risk language employed without false accusations.</p>
          </div>
          <span className="grow-badge grow-badge-primary">
            Official Meta Webhooks: Active (38ms latency)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">@lifestyle_rahul</span>
              <span className="grow-badge grow-badge-danger text-[10px]">
                High Anomaly (Score: 38/100)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trigger: Sudden +38,000 follower spike in 24h accompanied by 0.3% comments ratio and non-Indian audience geographic concentration (64% outside IN).
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button className="px-3 py-1 rounded-lg text-xs text-slate-300 hover:text-white bg-white/5">
                Download Evidence Pack
              </button>
              <button className="px-3 py-1 rounded-lg text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30">
                Flag For Manual Review
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">@fashion_diva_mumbai</span>
              <span className="grow-badge grow-badge-verified text-[10px]">
                Low Anomaly (Score: 92/100)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trigger: High saves-to-likes ratio (14.2%) and organic comment distribution across Mumbai, Pune, and Bengaluru. 100% verified authentic.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button className="px-3 py-1 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30">
                Verified Clean
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
