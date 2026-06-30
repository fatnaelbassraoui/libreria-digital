"use client"; // 1. Obbligatorio per usare useState e useEffect

import { useState, useEffect, use } from "react"; // 2. Importa "use" per sbloccare params
import { getBookByIdFromRapidApi } from "../../lib/bookByIdService";
import { BookDetailResponse } from "../../types/bookInterface";
import { title } from "process";

interface PageProps {
  params: Promise<{ id: string }>;
}
type Chapter = {
  title: string;
  content: string;
};

export default function BookDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const [bookDetail, setBookDetail] = useState<BookDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

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

  const paragraphs = bookDetail.text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);

  return (
    <div className="min-h-screen min-w-full bg-background mt-6 p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold text-foreground tracking-tight text-balance mb-4">
          {bookDetail.title}
        </h1>
        <article className="space-y-6 mt-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="
              text-lg
              leading-8
             text-foreground
              text-justify
            "
            >
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </div>
  );
}
