"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { GutenbergBook } from "../../types/bookInterface";
import { ReviewModal } from "./ReviewModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "lucide-react";
interface BookCardProps {
  books: GutenbergBook[];
  onBookClick?: (bookId: number) => void; // Optional callback for book click
}

export const BookCard: React.FC<BookCardProps> = ({ books, onBookClick }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<GutenbergBook | null>(
    null,
  );

  const handleAddToList = (book: GutenbergBook) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book: GutenbergBook, index: number) => (
        <div
          key={book.id}
          className="bg-card border border-border rounded-2xl transition-all duration-300 flex flex-col overflow-hidden group hover:shadow-xl hover:-translate-y-1"
        >
          {/* Image + Read more overlay */}
          <div className="relative h-56 bg-muted/30 flex items-center justify-center overflow-hidden shrink-0">
            {book.cover_image ? (
              <>
                {/* Background decorativo */}
                <Image
                  src={book.cover_image}
                  alt=""
                  fill
                  aria-hidden="true"
                  sizes="(max-width: 768px) 100vw, 20vw"
                  loading="lazy"
                  unoptimized
                  className="absolute inset-0 object-cover blur-xl opacity-20 scale-110 pointer-events-none select-none"
                />

                {/* Copertina */}
                <Image
                  src={book.cover_image}
                  alt={`Cover of ${book.title}`}
                  width={160}
                  height={240}
                  priority={index < 3}
                  sizes="160px"
                  unoptimized
                  className="relative z-10 h-auto w-auto max-w-[72%] max-h-[83%] rounded-md object-contain shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/40">
                <Icon
                  icon="mdi:book-open-page-variant"
                  className="text-green-400/60"
                  width="44"
                  height="44"
                />
              </div>
            )}

            {/* Overlay solo con Read more */}
            <div className="absolute inset-0 z-20 bg-black/55 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250">
              <button
                onClick={() => onBookClick && onBookClick(book.id)}
                className="flex items-center gap-2 text-xs font-semibold text-white border-2 border-white/70 hover:bg-white hover:text-gray-900 px-5 py-2 rounded-full transition-all"
              >
                <Icon icon="mdi:book-open-outline" width="14" />
                Read more
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-4 gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <h3
                className="text-sm font-bold text-foreground line-clamp-2 leading-snug group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors"
                title={book.title}
                onClick={() => onBookClick && onBookClick(book.id)}
              >
                {book.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {book.authors?.length > 0
                  ? book.authors.map((a) => a.name).join(", ")
                  : "Unknown Author"}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Icon
                  icon="mdi:download"
                  width="12"
                  className="text-muted-foreground/50"
                />
                {book.download_count?.toLocaleString() || 0}
              </span>

              <button
                onClick={() => handleAddToList(book)}
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 px-4 py-1.5 rounded-full transition-all active:scale-95"
              >
                <Icon icon="mdi:plus" width="13" />
                Add
              </button>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <ReviewModal
          book={selectedBook!}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
