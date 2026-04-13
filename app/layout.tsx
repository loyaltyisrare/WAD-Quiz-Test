import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { BackgroundSystem } from "@/components/BackgroundSystem";

export const metadata: Metadata = {
  title: "Women Are Drugs | What Are You Really Addicted To?",
  description: "Six quick questions to reveal whether you’re drawn to a woman’s depth, power, and rarity, or just the surface.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen relative overflow-x-hidden">
        <BackgroundSystem />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
      {/* Add GA if needed */}
    </html>
  );
}
