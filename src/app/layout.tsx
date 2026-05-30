import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Analytics } from "@vercel/analytics/next";

// defining the fonts with next/font for optimized loading and performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // optimize for performance by using font-display: swap
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata for the application, important for SEO and social sharing
export const metadata: Metadata = {
  title: "La Mia Libreria Digitale",
  description: "Gestisci la tua collezione personale di libri, aggiungi recensioni e voti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it" 
      suppressHydrationWarning
      
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        suppressHydrationWarning={true} 
        className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans"
      >
        <AuthProvider>
          <main className="flex-grow">
            {children}
          </main>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}