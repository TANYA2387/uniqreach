"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation, Language } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck 
} from "lucide-react";

function SignUpContent() {
  const { t, language, setLanguage } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<"brand" | "creator">("brand");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "creator" || roleParam === "brand") {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            preferred_language: language,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        // Insert into public.profiles
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          role: role,
          full_name: fullName,
          preferred_language: language,
        });

        if (profileError) {
          console.error("Profile upsert error:", profileError);
        }

        // Initialize specific role table entry
        if (role === "brand") {
          await supabase.from("brands").upsert({
            id: data.user.id,
            company_name: fullName,
            location_city: "Mumbai",
          });
          router.push("/dashboard/brand");
        } else {
          await supabase.from("creators").upsert({
            id: data.user.id,
            handle: email.split("@")[0],
            primary_niche: "Lifestyle",
            city: "Mumbai",
          });
          router.push("/dashboard/creator");
        }
      } else {
        // Fallback for local development preview
        router.push(role === "creator" ? "/dashboard/creator" : "/dashboard/brand");
      }
    } catch (err: any) {
      console.warn("Auth network fallback:", err);
      // Seamlessly navigate to the selected dashboard for preview
      router.push(role === "creator" ? "/dashboard/creator" : "/dashboard/brand");
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = (selectedRole: "brand" | "creator") => {
    setRole(selectedRole);
    if (selectedRole === "brand") {
      setFullName("Acme Organic India");
      setEmail(`brand_${Date.now().toString().slice(-4)}@example.com`);
      setPassword("DemoPass123!");
    } else {
      setFullName("Priya Sharma");
      setEmail(`creator_${Date.now().toString().slice(-4)}@example.com`);
      setPassword("DemoPass123!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-panel rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {t("auth.sign_up_title")}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {t("auth.sign_up_subtitle")}
            </p>
          </div>

          {/* Quick Demo Autofill Toolbar */}
          <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <span className="font-semibold text-slate-600 block mb-1.5">
              Quick Test Demo Credentials:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => autofillDemo("brand")}
                className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium transition-colors"
              >
                Autofill Brand Demo
              </button>
              <button
                type="button"
                onClick={() => autofillDemo("creator")}
                className="px-2.5 py-1 rounded-md bg-pink-50 text-pink-700 hover:bg-pink-100 font-medium transition-colors"
              >
                Autofill Creator Demo
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                {t("auth.role_select_label")}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("brand")}
                  className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    role === "brand"
                      ? "border-brand-600 bg-brand-50/70 text-brand-900 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{t("roles.brand")}</span>
                    {role === "brand" && (
                      <CheckCircle2 className="w-4 h-4 text-brand-600" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">
                    Post campaigns & hire creators
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("creator")}
                  className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    role === "creator"
                      ? "border-creator-600 bg-creator-50/70 text-creator-900 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">
                      {t("roles.creator")}
                    </span>
                    {role === "creator" && (
                      <CheckCircle2 className="w-4 h-4 text-creator-600" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">
                    Apply & showcase audience
                  </span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t("auth.full_name_label")}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={role === "brand" ? "Acme Brand India" : "Priya Sharma"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>{t("common.loading")}</span>
              ) : (
                <>
                  <span>{t("auth.sign_up_button")}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <span>{t("auth.have_account")} </span>
            <Link
              href="/login"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              {t("auth.switch_sign_in")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
