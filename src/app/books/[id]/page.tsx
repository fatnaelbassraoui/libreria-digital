"use client"; // 1. Obbligatorio per usare useState e useEffect

import { useState, useEffect, use } from "react"; // 2. Importa "use" per sbloccare params
import { getBookByIdFromRapidApi } from "../../lib/bookByIdService";
import { BookDetailResponse } from "../../types/bookInterface";
import { Skeleton } from "@/components/ui/skeleton";
import { handleError } from "../../utils/handleError"; // 3. Importa handleError per gestire gli errori
import { error } from "console";
import { AlertComponent } from "../../components/ui/Alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRightIcon, Link } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

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
        handleError(error, "Impossible to fetch book details");
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full min-w-full bg-background pt-24 p-6 flex justify-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Bottone di ritorno finto */}
          <Skeleton className="h-10 w-36 bg-zinc-800/80 rounded-xl" />

          {/* Titolo finto del libro più grande (h-12) */}
          <Skeleton className="h-12 w-3/4 mx-auto bg-zinc-950/40 border border-violet-900/20 rounded-xl mb-12" />

          {/* Paragrafi di testo finti ingranditi e distribuiti a tutta larghezza */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-3.5 pb-6 border-b border-zinc-900/40"
            >
              {/* Righe del paragrafo larghe che simulano testo reale del libro */}
              <Skeleton className="h-5 w-full bg-zinc-800/50 rounded-md" />
              <Skeleton className="h-5 w-full bg-zinc-800/50 rounded-md" />
              <Skeleton className="h-5 w-11/12 bg-zinc-800/50 rounded-md" />
              <Skeleton className="h-5 w-full bg-zinc-800/50 rounded-md" />
              {/* L'ultima riga del paragrafo è volutamente più corta */}
              <Skeleton className="h-5 w-3/5 bg-zinc-800/50 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!bookDetail)
    return (
      <AlertComponent
        title="Error"
        description="Impossible to fetch book details"
        variant="error"
      />
    );

  const paragraphs = bookDetail.text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);

  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen w-full min-w-full bg-background mt-6 p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex items-start gap-2 w-full mb-4 ">
          <div className="flex items-start gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleBackClick}
              className="border-violet-600 text-white text-foreground hover:bg-violet-800 hover:text-white backdrop-blur-sm rounded-xl transition-all duration-200"
            >
              <ArrowLeft />
              Back to Books
            </Button>
          </div>
        </div>
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
