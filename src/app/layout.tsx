import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniqReach - AI-Powered Brand & Creator Marketplace",
  description:
    "One Campaign. One Selected Creator. The Right Audience. Discover authentic creators with unique audiences using AI matching.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <I18nProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
