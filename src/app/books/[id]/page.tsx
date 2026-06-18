"use client"; // 1. Obbligatorio per usare useState e useEffect

import { useState, useEffect, use } from "react"; // 2. Importa "use" per sbloccare params
import { getBookByIdFromRapidApi } from "../../lib/booksService";
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{bookDetail.title}</h1>
      <p className="mt-4 whitespace-pre-wrap">{bookDetail.text}</p>
    </div>
  );
}

