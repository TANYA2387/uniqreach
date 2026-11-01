"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  MessageSquare, 
  CheckCircle, 
  ArrowUpRight, 
  Lock, 
  Clock, 
  FileEdit, 
  Award 
} from "lucide-react";

export default function CreatorDashboard() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<any>({ full_name: "Priya Sharma" });
  const [creatorData, setCreatorData] = useState<any>({
    handle: "priya_creates",
    primary_niche: "Lifestyle & Travel",
    overall_authenticity_score: 94,
    verification_status: "verified",
  });

  const [applications, setApplications] = useState<any[]>([
    {
      id: "app-1",
      campaign_title: "Eco-Friendly Travel Luggage Series",
      brand_name: "Wanderlust Gear Co.",
      quote: 45000,
      status: "shortlisted", // Shortlisted - Chat enabled!
      applied_at: "2026-10-30",
    },
    {
      id: "app-2",
      campaign_title: "Festive Season Organic Tea Launch",
      brand_name: "Acme Organic India",
      quote: 30000,
      status: "applied", // Chat disabled
      applied_at: "2026-11-01",
    },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: p } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          if (p) setProfile(p);

          const { data: c } = await supabase
            .from("creators")
            .select("*")
            .eq("id", user.id)
            .single();
          if (c) setCreatorData(c);
        }
      } catch (err) {
        console.warn("Creator dashboard fetch skipped:", err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("roles.creator")} Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t("creator_dashboard.welcome", { name: profile.full_name || "Creator" })}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t("creator_dashboard.subtitle")}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/profile/edit"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2"
          >
            <FileEdit className="w-4 h-4 text-slate-500" />
            <span>{t("creator_dashboard.cta_update_profile")}</span>
          </Link>
          <Link
            href="/campaigns"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-creator-600 to-creator-700 hover:from-creator-700 hover:to-creator-800 shadow-md shadow-pink-500/20 transition-all flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>{t("creator_dashboard.cta_explore_campaigns")}</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("creator_dashboard.authenticity_score")}
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {creatorData.overall_authenticity_score || 94}
            <span className="text-sm font-normal text-slate-500"> / 100</span>
          </div>
          <span className="text-xs text-emerald-600 font-medium">
            {t("creator_dashboard.verification_verified")}
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("creator_dashboard.active_applications")}
            </span>
            <Briefcase className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">2</div>
          <span className="text-xs text-slate-500">Under review</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("creator_dashboard.shortlisted_count")}
            </span>
            <Award className="w-4 h-4 text-creator-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">1</div>
          <span className="text-xs text-creator-600 font-medium">Chat unlocked with brand</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Completed Collabs
            </span>
            <CheckCircle className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">4</div>
          <span className="text-xs text-slate-500">100% positive reviews</span>
        </div>
      </div>

      {/* Applications Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {t("creator_dashboard.recent_applications")}
          </h2>
          <Link
            href="/applications"
            className="text-xs font-semibold text-creator-600 hover:text-creator-700 flex items-center gap-1"
          >
            <span>{t("common.view_all")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass-card p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{app.campaign_title}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                      app.status === "shortlisted"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Brand: {app.brand_name}</span>
                  <span>•</span>
                  <span>My Quote: ₹{app.quote?.toLocaleString()}</span>
                  <span>•</span>
                  <span>Applied: {app.applied_at}</span>
                </div>
              </div>

              {/* Chat Gating Verification: Only shortlisted creator gets chat! */}
              <div>
                {app.status === "shortlisted" ? (
                  <Link
                    href={`/messages?application=${app.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-creator-600 hover:bg-creator-700 shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Brand Chat</span>
                  </Link>
                ) : (
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-medium cursor-not-allowed">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Chat Locked (Pending Shortlist)</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
