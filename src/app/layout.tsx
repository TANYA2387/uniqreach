import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrowOS - Creator Intelligence & Influencer Marketing OS",
  description:
    "AI-powered creator intelligence and influencer marketing marketplace for India (Fashion, Beauty, Skincare, Lifestyle).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#0B0F17] text-slate-100`}>
        <I18nProvider>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
