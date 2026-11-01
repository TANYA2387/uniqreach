"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { 
  Sparkles, 
  Target, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight,
  UserCheck,
  Briefcase,
  ShieldAlert
} from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-brand-500/20 via-creator-500/15 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>{t("tagline")}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Connect with the right creator. Reach{" "}
          <span className="bg-gradient-to-r from-brand-600 to-creator-600 bg-clip-text text-transparent">
            new, verified audiences
          </span>{" "}
          every campaign.
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The marketplace where each campaign is assigned to <strong>one authentic creator</strong>. 
          Maximize engagement, eliminate audience fatigue, and prevent fake engagement.
        </p>

        {/* Primary Role Portal Buttons (100% Clickable & Direct) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard/creator"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-creator-600 to-creator-700 hover:from-creator-700 hover:to-creator-800 shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2.5 group"
          >
            <UserCheck className="w-5 h-5" />
            <span>Open Creator Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/dashboard/brand"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2.5 group"
          >
            <Briefcase className="w-5 h-5" />
            <span>Open Brand Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/dashboard/admin"
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-5 h-5 text-slate-600" />
            <span>Admin Center</span>
          </Link>
        </div>

        {/* Core Principles */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              One Creator per Campaign
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Zero clutter and maximum focus. Every campaign is assigned to exactly one creator for accountability and high-impact deliverables.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-creator-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              New Audience & Authenticity
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automated cool-down rules prioritize fresh audiences, while statistical checks detect fake engagement and follower anomalies.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Restricted Chat & Translation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Private chat unlocks only when a creator is shortlisted. Built-in auto-translation seamlessly bridges English and Hindi conversations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
