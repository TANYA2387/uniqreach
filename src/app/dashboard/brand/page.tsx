"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  CheckCircle, 
  PlusCircle, 
  Compass, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  AlertCircle 
} from "lucide-react";

export default function BrandDashboard() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<any>({ full_name: "Acme Brand India" });
  const [campaigns, setCampaigns] = useState<any[]>([
    {
      id: "demo-camp-1",
      title: "Festive Season Organic Tea Launch",
      category: "Food & Beverage",
      budget: 50000,
      platform: "Instagram",
      content_format: "Reels",
      status: "active",
      deadline: "2026-11-20",
      applicant_count: 8,
      shortlisted_creator: null,
    },
    {
      id: "demo-camp-2",
      title: "Eco-Friendly Travel Luggage Series",
      category: "Travel",
      budget: 85000,
      platform: "Instagram & YouTube",
      content_format: "Reel + Video",
      status: "shortlisted",
      deadline: "2026-11-15",
      applicant_count: 14,
      shortlisted_creator: "Arjun Verma (@arjun_travels)",
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
            .from("campaigns")
            .select("*")
            .eq("brand_id", user.id)
            .order("created_at", { ascending: false });
          if (c && c.length > 0) setCampaigns(c);
        }
      } catch (err) {
        console.warn("Brand dashboard fetch skipped:", err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("roles.brand")} Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t("brand_dashboard.welcome", { name: profile.full_name || "Brand Partner" })}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t("brand_dashboard.subtitle")}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-slate-500" />
            <span>{t("brand_dashboard.cta_explore_creators")}</span>
          </Link>
          <Link
            href="/campaigns/create"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t("brand_dashboard.cta_create_campaign")}</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("brand_dashboard.active_campaigns")}
            </span>
            <Briefcase className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">2</div>
          <span className="text-xs text-emerald-600 font-medium">1 currently in shortlisting</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("brand_dashboard.pending_applications")}
            </span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">22</div>
          <span className="text-xs text-slate-500">Across 2 open campaigns</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("brand_dashboard.shortlisted_creators")}
            </span>
            <UserCheck className="w-4 h-4 text-creator-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">1</div>
          <span className="text-xs text-creator-600 font-medium">1 Creator active in gated chat</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("brand_dashboard.completed_collaborations")}
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">5</div>
          <span className="text-xs text-slate-500">Recorded in history</span>
        </div>
      </div>

      {/* Campaigns Overview */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {t("brand_dashboard.recent_campaigns")}
          </h2>
          <Link
            href="/campaigns"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>{t("common.view_all")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="glass-card p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{camp.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                      camp.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span>Category: {camp.category}</span>
                  <span>•</span>
                  <span>Platform: {camp.platform} ({camp.content_format})</span>
                  <span>•</span>
                  <span>Budget: ₹{camp.budget?.toLocaleString()}</span>
                  <span>•</span>
                  <span>Applicants: {camp.applicant_count || 0}</span>
                </div>

                {camp.shortlisted_creator && (
                  <div className="mt-2 text-xs font-medium text-creator-700 bg-creator-50 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 border border-creator-200/60">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Active Selected Creator: {camp.shortlisted_creator}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/campaigns/${camp.id}/applicants`}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Review Applicants
                </Link>
                {camp.shortlisted_creator && (
                  <Link
                    href={`/messages?campaign=${camp.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-creator-600 hover:bg-creator-700 shadow-sm transition-colors"
                  >
                    Open Gated Chat
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
