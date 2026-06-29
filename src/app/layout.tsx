import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../app/context/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "./components/ui/NavBar";
import { ThemeProvider } from "./components/ui/theme-provider";
import { headers } from "next/headers";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     const headerList = await headers();
     const pathname = headerList.get("x-current-path") || "";

  // 3. Verifica se l'utente si trova in una pagina di autenticazione
    const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/signup";

  return (
    <html
      lang="it"
      suppressHydrationWarning

      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning={true}
        className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans"
      ><ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          <AuthProvider>
            <main className="flex-grow">
           { !isAuthPage &&  <NavBar />}
              {children}
            </main>
            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              style={{ zIndex: 999999 }}
            />
            <Analytics />

          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}