"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  ShieldCheck, 
  DollarSign, 
  Calendar,
  Layers
} from "lucide-react";

export default function CreateCampaignBriefPage() {
  const router = useRouter();
  const [productName, setProductName] = useState("Squalane Glow Face Oil");
  const [category, setCategory] = useState("Skincare");
  const [targetAudience, setTargetAudience] = useState("Women 20-35, Tier 1/2 Cities (Mumbai, Delhi, Bengaluru)");
  const [budget, setBudget] = useState("75000");
  const [deliverables, setDeliverables] = useState("1 Instagram Reel (30-60s) + 2 Story Frames with Swipe Link");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<any>(null);

  const handleGenerateBrief = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedBrief({
        title: `${productName} Festive Glow Campaign`,
        objective: "Build high-intent purchase demand and authentic product demonstrations for festive season.",
        compliance: {
          asciNotice: "Mandatory #Ad or #Collab tag in first 3 words of caption.",
          claimsRule: "No unsubstantiated medical claims (e.g., do NOT claim 'cures acne permanently').",
          musicRights: "Use only commercial-cleared audio from Meta Sound Collection.",
        },
        concepts: [
          {
            title: "Concept A: The 7-Day Barrier Repair Transformation",
            format: "Reel (45s)",
            hook: "Stop stripping your skin barrier before Diwali party season.",
            storyboard: "Creator shows microscope/close-up macro skin shot, applies 3 drops of squalane oil, highlights natural dewy glow without greasy residue.",
          },
          {
            title: "Concept B: Dermatologist Ingredient Breakdown (Derm-Approved)",
            format: "Educational Reel (60s)",
            hook: "Why plant-derived squalane outperforms traditional heavy face oils.",
            storyboard: "Creator splits screen comparing hydration levels, shows fast absorption test on paper, walks through clean ingredients list.",
          },
          {
            title: "Concept C: Golden Hour Festive GRWM (Get Ready With Me)",
            format: "Aesthetic Lifestyle Reel (30s)",
            hook: "My secret base prep before heavy festive makeup.",
            storyboard: "Creator demonstrates skin prep routine under natural golden hour light, finishes with radiant festive look.",
          },
        ],
      });
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <Link
            href="/brand/dashboard"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Brand Portal</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="grow-badge grow-badge-primary text-[10px]">AI Strategic Brief Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Create AI Campaign Brief & Concepts
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="grow-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
              Campaign Specifications
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Niche Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Skincare">Skincare & Clean Beauty</option>
                <option value="Fashion">Fashion & Ethnic Wear</option>
                <option value="Haircare">Haircare & Ayurvedic Formulations</option>
                <option value="Lifestyle">Luxury Lifestyle & Fragrances</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Audience & Cities</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total Campaign Budget (₹ INR)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Required Deliverables</label>
              <textarea
                rows={2}
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleGenerateBrief}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? "Synthesizing Brief & Concepts..." : "Generate AI Brief & 3 Concepts"}</span>
            </button>
          </div>
        </div>

        {/* AI Output Preview Column */}
        <div className="lg:col-span-7">
          {generatedBrief ? (
            <div className="grow-card p-6 space-y-6 border-indigo-500/30">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="grow-badge grow-badge-verified text-[10px] mb-1">AI Generated Brief Ready</div>
                  <h3 className="text-lg font-bold text-white">{generatedBrief.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-indigo-400">Budget: ₹{Number(budget).toLocaleString()}</span>
                </div>
              </div>

              {/* ASCI & Regulatory Guardrails */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5 text-xs text-amber-200">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Mandatory Compliance & Claims Guardrail:</span>
                </div>
                <div className="text-[11px] leading-relaxed">
                  • {generatedBrief.compliance.asciNotice}<br />
                  • {generatedBrief.compliance.claimsRule}<br />
                  • {generatedBrief.compliance.musicRights}
                </div>
              </div>

              {/* 3 Creative Concepts */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  AI Creative Concepts (Select Preferred Angle)
                </div>

                {generatedBrief.concepts.map((concept: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{concept.title}</span>
                      <span className="grow-badge grow-badge-primary text-[10px]">{concept.format}</span>
                    </div>
                    <div className="text-xs text-indigo-300 font-medium">
                      <strong>Hook:</strong> "{concept.hook}"
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      <strong>Visual Treatment:</strong> {concept.storyboard}
                    </div>
                  </div>
                ))}
              </div>

              {/* Approval & Advance to Discovery */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => router.push("/brand/discover")}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all"
                >
                  <span>Approve Brief & Discover Creators</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grow-card p-12 text-center border-dashed border-white/10 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">AI Brief Generator Idle</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Fill in your product parameters on the left and click Generate to receive structured concepts, audience fit metrics, and ASCI compliance checks.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
