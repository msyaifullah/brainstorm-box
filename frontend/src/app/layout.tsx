import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./keyboard.css";
import { I18nProvider } from "../components/i18n-provider";
import { DynamicLangAttribute } from "../components/dynamic-lang-attribute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive Keyboard Demo",
  description: "Interactive keyboard component demonstration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="/sw-register.js" defer></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <I18nProvider>
          <DynamicLangAttribute />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
