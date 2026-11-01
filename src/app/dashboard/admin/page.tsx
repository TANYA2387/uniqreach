"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { 
  ShieldAlert, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  FileText, 
  Sparkles, 
  Search, 
  AlertTriangle 
} from "lucide-react";

export default function AdminDashboard() {
  const { t } = useTranslation();

  const [flaggedCreators, setFlaggedCreators] = useState([
    {
      id: "flag-1",
      creator_name: "Rahul Tech Reviews",
      handle: "@rahul_tech",
      reason: "Unusual follower spike: +45,000 followers in 48 hours without viral media",
      authenticity_score: 41,
      confidence: 88,
      status: "pending_review",
    },
    {
      id: "flag-2",
      creator_name: "Style By Kavya",
      handle: "@kavya_fashion",
      reason: "Automated repetitive comments ratio exceeds 60%",
      authenticity_score: 52,
      confidence: 79,
      status: "pending_review",
    },
  ]);

  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: "ver-1",
      creator_name: "Chef Vikram",
      handle: "@vikram_kitchen",
      platform: "YouTube",
      submitted_evidence: "Analytics PDF + Channel Studio screenshots",
      submitted_at: "2026-10-31",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="pb-8 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{t("roles.admin")} Command Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {t("admin_dashboard.title")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin_dashboard.subtitle")}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {t("admin_dashboard.total_brands")}
          </div>
          <div className="text-2xl font-bold text-slate-900">142</div>
          <span className="text-xs text-emerald-600 font-medium">+12 this week</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {t("admin_dashboard.total_creators")}
          </div>
          <div className="text-2xl font-bold text-slate-900">890</div>
          <span className="text-xs text-emerald-600 font-medium">680 verified</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {t("admin_dashboard.active_campaigns")}
          </div>
          <div className="text-2xl font-bold text-slate-900">38</div>
          <span className="text-xs text-indigo-600 font-medium">₹1.8M GMV</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-amber-200 bg-amber-50/50">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            {t("admin_dashboard.flagged_accounts")}
          </div>
          <div className="text-2xl font-bold text-amber-900">2</div>
          <span className="text-xs text-amber-700 font-medium">Requires action</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-blue-200 bg-blue-50/50">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-800 mb-1">
            {t("admin_dashboard.pending_verifications")}
          </div>
          <div className="text-2xl font-bold text-blue-900">1</div>
          <span className="text-xs text-blue-700 font-medium">Manual submission</span>
        </div>
      </div>

      {/* Fraud & Authenticity Review Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Fraud & Authenticity Review Queue</span>
            </h2>
          </div>

          <div className="space-y-3">
            {flaggedCreators.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 rounded-2xl border border-amber-200/80 bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.creator_name}</h3>
                    <span className="text-xs text-slate-500">{item.handle}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      Score: {item.authenticity_score}/100
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Confidence: {item.confidence}%
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <strong>Trigger:</strong> {item.reason}
                </p>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                    View Raw Audit Trail
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">
                    Confirm Exclusion Flag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Analytics Verification Queue */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>Manual Analytics Verification</span>
            </h2>
          </div>

          <div className="space-y-3">
            {pendingVerifications.map((item) => (
              <div
                key={item.id}
                className="glass-card p-5 rounded-2xl border border-slate-200 bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.creator_name}</h3>
                    <span className="text-xs text-slate-500">{item.handle} • {item.platform}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    Awaiting Review
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  <strong>Evidence:</strong> {item.submitted_evidence}
                </p>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">
                    Reject Evidence
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors">
                    Approve & Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
