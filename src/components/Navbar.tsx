"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  Briefcase, 
  UserCheck, 
  ShieldAlert, 
  Globe, 
  ChevronDown, 
  Layers, 
  CheckCircle2, 
  Compass, 
  MessageSquare,
  Lock
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const { t, language, setLanguage } = useTranslation();
  const [activePersona, setActivePersona] = useState("Brand Owner");
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const personas = [
    { name: "Brand Owner (Pilgrim D2C)", role: "brand", sub: "Full budget & deposit rights" },
    { name: "Brand Approver (Creative Lead)", role: "brand_approver", sub: "Review & revision rights only" },
    { name: "Creator (Priya Sharma)", role: "creator", sub: "85K Followers • Verified KYC" },
    { name: "Admin (Signatory / Maker)", role: "admin", sub: "Ledger & Maker-Checker" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F17]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Tagline */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                    GrowOS
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    INDIA D2C
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  Creator Intelligence & Marketing OS
                </span>
              </div>
            </Link>
          </div>

          {/* Three Portals Selector */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-white/10">
            <Link
              href="/brand/dashboard"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pathname.startsWith("/brand")
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Brand Portal</span>
            </Link>

            <Link
              href="/creator/dashboard"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pathname.startsWith("/creator")
                  ? "bg-pink-600 text-white shadow-md shadow-pink-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Creator Portal</span>
            </Link>

            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pathname.startsWith("/admin")
                  ? "bg-amber-600 text-white shadow-md shadow-amber-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Center</span>
            </Link>
          </nav>

          {/* Right Controls: Persona Switcher, Language & Status */}
          <div className="flex items-center gap-3">
            
            {/* Quick Demo Persona Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 hover:bg-white/10 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-slate-300 hidden lg:inline">Active Persona:</span>
                <span className="font-semibold text-white">{activePersona}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-2 z-50">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Switch Test Persona
                  </div>
                  {personas.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setActivePersona(p.name);
                        setShowPersonaMenu(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-start justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{p.name}</div>
                        <div className="text-[10px] text-slate-400">{p.sub}</div>
                      </div>
                      {activePersona === p.name && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  language === "en"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  language === "hi"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
