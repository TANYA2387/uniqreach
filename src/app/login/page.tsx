"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        // Fetch role from profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        const role = profile?.role || "brand";
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else if (role === "creator") {
          router.push("/dashboard/creator");
        } else {
          router.push("/dashboard/brand");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || t("auth.auth_error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole: "brand" | "creator" | "admin") => {
    // Quick routing for MVP review
    if (demoRole === "admin") router.push("/dashboard/admin");
    else if (demoRole === "creator") router.push("/dashboard/creator");
    else router.push("/dashboard/brand");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-panel rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {t("auth.sign_in_title")}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {t("auth.sign_in_subtitle")}
            </p>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600 block mb-1.5">
              Instant Preview (Demo Access):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("brand")}
                className="py-1.5 px-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium text-center transition-colors"
              >
                Brand Dashboard
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("creator")}
                className="py-1.5 px-2 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 font-medium text-center transition-colors"
              >
                Creator Dashboard
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="py-1.5 px-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 font-medium text-center transition-colors"
              >
                Admin Command
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("auth.email_label")}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("auth.password_label")}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>{t("common.loading")}</span>
              ) : (
                <>
                  <span>{t("auth.sign_in_button")}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <span>{t("auth.no_account")} </span>
            <Link
              href="/signup"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              {t("auth.switch_sign_up")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
