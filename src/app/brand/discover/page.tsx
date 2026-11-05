"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Search, 
  Filter, 
  ShieldCheck, 
  Instagram, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Users, 
  Award,
  Zap
} from "lucide-react";

export default function DiscoverCreatorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [shortlistedCreatorId, setShortlistedCreatorId] = useState<string | null>("creator-1");

  const creators = [
    {
      id: "creator-1",
      name: "Priya Sharma",
      handle: "@priyabeauty.in",
      avatar: "PS",
      niche: "Skincare & Clean Beauty",
      city: "Mumbai, India",
      followers: "85.4K",
      avgViews: "42.8K",
      engagementRate: "4.8%",
      rateReel: "₹45,000",
      authenticityScore: 94,
      fitScore: 96,
      fitStrengths: "Consistent squalane & serum tutorial history; 91% female audience in Tier-1 metros.",
      provenance: "Meta API Verified",
    },
    {
      id: "creator-2",
      name: "Ananya Deshmukh",
      handle: "@ananya_vlogs",
      avatar: "AD",
      niche: "Fashion & Lifestyle",
      city: "Pune, India",
      followers: "120K",
      avgViews: "55.2K",
      engagementRate: "3.9%",
      rateReel: "₹60,000",
      authenticityScore: 91,
      fitScore: 84,
      fitStrengths: "High festive engagement; great visual styling; lower direct skincare tutorial ratio.",
      provenance: "Meta API Verified",
    },
    {
      id: "creator-3",
      name: "Rohan Verma",
      handle: "@rohan_grooming",
      avatar: "RV",
      niche: "Men's Grooming & Lifestyle",
      city: "Delhi NCR, India",
      followers: "64.2K",
      avgViews: "28.5K",
      engagementRate: "4.2%",
      rateReel: "₹35,000",
      authenticityScore: 88,
      fitScore: 72,
      fitStrengths: "Strong male audience segment; good educational tone.",
      provenance: "Meta API Verified",
    },
  ];

  const handleShortlist = (id: string) => {
    setShortlistedCreatorId(id);
    alert(`GrowOS Single Shortlist Rule: Creator successfully selected for campaign chat. Other applicants are now locked from direct messaging.`);
    router.push("/brand/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="grow-badge grow-badge-primary text-[10px]">Creator Intelligence Directory</span>
            <span className="grow-badge grow-badge-verified text-[10px]">Official Meta Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Discover Verified Creators (India D2C)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse authentic creators with API-verified reach, authenticity scores, and campaign fit matching.
          </p>
        </div>

        <Link
          href="/brand/dashboard"
          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="grow-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by creator name, niche, handle, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "Skincare", "Fashion", "Grooming"].map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedNiche === niche
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {niche}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {creators.map((c) => {
          const isShortlisted = shortlistedCreatorId === c.id;

          return (
            <div
              key={c.id}
              className={`grow-card p-6 flex flex-col justify-between space-y-5 ${
                isShortlisted ? "border-indigo-500/60 bg-indigo-950/20" : ""
              }`}
            >
              {/* Creator Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                      {c.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{c.name}</h3>
                      <div className="text-xs text-slate-400">{c.handle}</div>
                    </div>
                  </div>

                  <span className="grow-badge grow-badge-verified text-[10px]">
                    <ShieldCheck className="w-3 h-3" />
                    {c.provenance}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">{c.niche}</span> • {c.city}
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Followers</div>
                    <div className="text-xs font-bold text-white mt-0.5">{c.followers}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Avg Reel Views</div>
                    <div className="text-xs font-bold text-white mt-0.5">{c.avgViews}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Engagement</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5">{c.engagementRate}</div>
                  </div>
                </div>

                {/* AI Fit Score & Rationale */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      AI Campaign Fit Score
                    </span>
                    <span className="text-white font-mono">{c.fitScore}/100</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {c.fitStrengths}
                  </p>
                </div>

                {/* Authenticity & Quotation */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Authenticity Score:</span>
                  <span className="font-bold text-emerald-400">{c.authenticityScore}% Verified</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Base Quotation (Reel):</span>
                  <span className="font-bold text-white">{c.rateReel}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <Link
                  href="/creator/dashboard"
                  className="w-1/2 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 text-center border border-white/10 transition-colors"
                >
                  View Media Kit
                </Link>

                <button
                  onClick={() => handleShortlist(c.id)}
                  className={`w-1/2 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isShortlisted
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
                  }`}
                >
                  {isShortlisted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Shortlist</span>
                    </>
                  ) : (
                    <span>Shortlist & Chat</span>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
