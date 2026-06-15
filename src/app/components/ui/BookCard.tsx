
"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react"
import { GutenbergBook } from "../../types/bookInterface";
import { ReviewModal } from "./ReviewModal";
interface BookCardProps {
  books: GutenbergBook[];
}

export const BookCard: React.FC<BookCardProps> = ({ books }) => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<GutenbergBook | null>(null);

  const handleAddToList = (book: GutenbergBook) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book: GutenbergBook, index: number) => (
        <div
          key={book.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group h-[440px]"
        >
          {/*Images Container  */}
          <div className="relative w-full h-60 bg-gray-900/5 flex items-center justify-center overflow-hidden border-b border-gray-100 shrink-0">
            {book.cover_image ? (
              <>
                {/* Blurred background image, scaled up slightly to create a subtle depth effect behind the main cover image. 
                  It is set to be non-interactive and has reduced opacity to ensure it doesn't overpower the main image. */}
                <Image
                  src={book.cover_image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  priority={index < 5}
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none"
                />
                {/* Main cover image, centered and constrained to a maximum size to ensure it fits well within the card. 
                It has a subtle shadow and border to make it stand out against the blurred background. */}
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  width={160}  // Imposta una larghezza base indicativa per l'ottimizzazione
                  height={240}
                  priority={index < 5}
                  sizes="(max-width: 768px) 80vw, 15vw"
                  className="relative z-10 max-w-[80%] max-h-[85%] object-contain rounded shadow-[0_6px_12px_rgba(0,0,0,0.2)] border border-white/20"
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100/50">
                <Icon icon="mdi:book-open-page-variant" className="text-green-400/80" width="48" height="48" />
              </div>
            )}
          </div>

          {/* details container */}
          <div className="flex flex-col flex-1 p-4 justify-between min-h-0">
            <div className="space-y-1.5 min-h-0 overflow-hidden">
              {/* Title */}
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-green-800 transition-colors" title={book.title}>
                {book.title}
              </h3>

              {/* Author */}
              <p className="text-xs font-semibold text-gray-500 truncate">
                {book.authors && book.authors.length > 0
                  ? book.authors.map(a => a.name).join(", ")
                  : "Unknown Author"}
              </p>

              {/* Brief Description */}
              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                {book.summary || "No description available for this volume."}
              </p>
            </div>

            {/* Command Bar at the Bottom of the Card */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
              <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                <Icon icon="mdi:download" width="13" className="text-gray-400" />
                {book.download_count?.toLocaleString() || 0}
              </span>

              <button
                className="flex items-center gap-1 text-xs font-semibold text-white bg-green-700 hover:bg-green-800 px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95"
                onClick={() => handleAddToList(book)}
              >
                <Icon icon="mdi:plus" width="14" />
                Add to List
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
  )
}