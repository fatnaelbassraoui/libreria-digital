"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { GutenbergBook } from "../../types/bookInterface";
import { ReviewModal } from "./ReviewModal";
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
                <Image
                  src={book.cover_image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  priority={index < 5}
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-25 scale-110 pointer-events-none"
                />
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  width={160}
                  height={240}
                  priority={index < 5}
                  sizes="(max-width: 768px) 80vw, 15vw"
                  className="relative z-10 max-w-[72%] max-h-[83%] object-contain rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
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
                className="text-sm font-bold text-foreground line-clamp-2 leading-snug group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors cursor-pointer"
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
                className="flex items-center gap-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-full transition-all active:scale-95"
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
  //  return (
  //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" onClick={(e) => e.stopPropagation()}>
  //     {books.map((book: GutenbergBook, index: number) => (
  //       <div
  //         key={book.id}
  //         className="bg-card border border-border rounded-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group h-[440px]"
  //         onDoubleClick ={(e:React.MouseEvent<HTMLDivElement>) =>(
  //           e.preventDefault(),
  //            onBookClick && onBookClick(book.id))
  //           }
  //       >
  //         {/* Image Container */}
  //         <div className="relative w-full h-60 bg-muted/30 flex items-center justify-center overflow-hidden border-b border-border shrink-0">
  //           {book.cover_image ? (
  //             <>
  //               <Image src={book.cover_image} alt="" fill sizes="(max-width: 768px) 100vw, 20vw" priority={index < 5}
  //                 className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none"
  //               />
  //               <Image src={book.cover_image} alt={book.title} width={160} height={240} priority={index < 5}
  //                 sizes="(max-width: 768px) 80vw, 15vw"
  //                 className="relative z-10 max-w-[80%] max-h-[85%] object-contain rounded shadow-[0_6px_12px_rgba(0,0,0,0.2)] border border-white/20"
  //               />
  //             </>
  //           ) : (
  //             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100/50 dark:from-green-950/30 dark:to-emerald-900/20">
  //               <Icon icon="mdi:book-open-page-variant" className="text-green-400/80" width="48" height="48" />
  //             </div>
  //           )}
  //         </div>

  //         {/* Details */}
  //         <div className="flex flex-col flex-1 p-4 justify-between min-h-0">
  //           <div className="space-y-1.5 min-h-0 overflow-hidden">
  //             <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-snug group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors" title={book.title}>
  //               {book.title}
  //             </h3>
  //             <p className="text-xs font-semibold text-muted-foreground truncate">
  //               {book.authors?.length > 0 ? book.authors.map(a => a.name).join(", ") : "Unknown Author"}
  //             </p>
  //             <p className="text-xs text-muted-foreground/70 line-clamp-3 leading-relaxed">
  //               {book.summary || "No description available for this volume."}
  //             </p>
  //           </div>

  //           {/* Command Bar */}
  //           <div className="mt-4 pt-3 border-t border-border flex items-center justify-between shrink-0">
  //             <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
  //               <Icon icon="mdi:download" width="13" className="text-muted-foreground/60" />
  //               {book.download_count?.toLocaleString() || 0}
  //             </span>
  //             <button
  //               className="flex items-center gap-1 text-xs font-semibold text-white bg-green-700 hover:bg-green-800 px-3 py-1.5 rounded-lg transition-all active:scale-95"
  //               onClick={() => handleAddToList(book)}
  //             >
  //               <Icon icon="mdi:plus" width="14" />
  //               Add to List
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //     {isModalOpen && (
  //       <ReviewModal book={selectedBook!} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  //     )}
  //   </div>
  // );
};
