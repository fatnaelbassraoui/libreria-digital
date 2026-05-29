import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

// Configurazione ottimizzata dei font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ottimizza il caricamento del font evitando flash di testo invisibile
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadati reali e professionali (Ottimo per la SEO e per fare colpo!)
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
      lang="it" // Impostato su "it" visto che l'app è in italiano
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        suppressHydrationWarning={true} // Risolve il bug delle estensioni del browser (es. Grammarly)
        className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans"
      >
        <AuthProvider>
          {/* Struttura semantica: usiamo un tag <main> per racchiudere il contenuto dell'app */}
          <main className="flex-grow">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}