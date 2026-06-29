"use client"; // 1. Obbligatorio per usare useState e useEffect

import { useState, useEffect, use } from "react"; // 2. Importa "use" per sbloccare params
import { getBookByIdFromRapidApi } from "../../lib/bookByIdService";
import { BookDetailResponse } from "../../types/bookInterface";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookDetailPage({ params }: PageProps) {
  // 3. In Next.js 15, nei client component i params si leggono così:
  const { id } = use(params);

  // Rimosso l'array [] dal tipo se l'API restituisce un oggetto singolo
  const [bookDetail, setBookDetail] = useState<BookDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("Book:", bookDetail?.title)
  // 4. Sposta la logica asincrona dentro useEffect
  useEffect(() => {
    async function loadBook() {
      try {
        const response = await getBookByIdFromRapidApi(id);
        setBookDetail(response);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

  if (loading) return <div className="p-6">Caricamento...</div>;
  if (!bookDetail) return <div className="p-6">Libro non trovato.</div>;

// const filteredText = bookDetail?.text.find((text:string) => text.includes("CHAPTER"))

  return (
    <div className="min-h-screen min-w-full bg-background mt-6 p-6">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold text-foreground tracking-tight text-balance">
  {bookDetail.title}
</h1>
  <p className="text-xl leading-7 text-muted-foreground [&:not(:first-child)]:mt-6 text-center text-foreground">
     {bookDetail?.text}
    </p>
  </div>
    </div>
  );
}

