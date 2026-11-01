"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "@/locales/en.json";
import hiTranslations from "@/locales/hi.json";

export type Language = "en" | "hi";

type TranslationDict = typeof enTranslations;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const translations: Record<Language, any> = {
  en: enTranslations,
  hi: hiTranslations,
};

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (path: string) => path,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("preferred_lang") as Language;
    if (saved && (saved === "en" || saved === "hi")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_lang", lang);
    document.documentElement.lang = lang;
  };

  const t = (path: string, params?: Record<string, string | number>): string => {
    const keys = path.split(".");
    let current = translations[language];

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = translations.en;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === "object" && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current !== "string") {
      return path;
    }

    let result = current;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{{${k}}}`, "g"), String(v));
      });
    }

    return result;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
