"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation, Language } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { 
  Globe, 
  Sparkles, 
  LayoutDashboard, 
  Briefcase, 
  Compass, 
  MessageSquare, 
  LogOut, 
  User, 
  ShieldCheck 
} from "lucide-react";

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    async function fetchSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();
          if (profile) setRole(profile.role);
        }
      } catch (err) {
        console.warn("Auth session check skipped:", err);
      }
    }
    fetchSession();

    let authSubscription: any = null;
    try {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
            setRole(null);
          }
        }
      );
      authSubscription = authListener?.subscription;
    } catch (err) {
      console.warn("Auth listener skipped:", err);
    }

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  const getDashboardHref = () => {
    if (role === "brand") return "/dashboard/brand";
    if (role === "creator") return "/dashboard/creator";
    if (role === "admin") return "/dashboard/admin";
    return "/dashboard/brand";
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-creator-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-brand-700 bg-clip-text text-transparent">
                  {t("app_name")}
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline -mt-1 font-medium">
                  {t("tagline")}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links for Authenticated Users */}
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href={getDashboardHref()}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                {t("nav.dashboard")}
              </Link>

              {role === "brand" && (
                <>
                  <Link
                    href="/explore"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <Compass className="w-4 h-4" />
                    {t("nav.explore_creators")}
                  </Link>
                  <Link
                    href="/campaigns/create"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <Briefcase className="w-4 h-4" />
                    {t("nav.create_campaign")}
                  </Link>
                </>
              )}

              {role === "creator" && (
                <Link
                  href="/campaigns"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <Briefcase className="w-4 h-4" />
                  {t("nav.explore_campaigns")}
                </Link>
              )}

              <Link
                href="/messages"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                {t("nav.messages")}
              </Link>
            </nav>
          )}

          {/* Fast Workspace Nav */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <Link
              href="/dashboard/creator"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pathname.startsWith("/dashboard/creator")
                  ? "bg-white text-creator-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Creator Portal
            </Link>
            <Link
              href="/dashboard/brand"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pathname.startsWith("/dashboard/brand")
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Brand Portal
            </Link>
            <Link
              href="/dashboard/admin"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pathname.startsWith("/dashboard/admin")
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Right Controls: Language Selector & Auth */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100/90 rounded-lg p-1 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === "en"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === "hi"
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                {role && (
                  <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {t(`roles.${role}`)}
                  </span>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t("nav.logout")}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-sm transition-all"
                >
                  {t("nav.signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
