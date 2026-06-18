"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { WishlistBook } from "../../types/wishListInterface";
import { EditReviewModal } from "./EditReviewModal";
import Image from "next/image";

interface WishlistCardProps {
  collection: WishlistBook[];
  onRemove: (id: number, title: string) => void;
  onSuccessUpdate: (id: number, rating: number, review: string) => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ collection, onRemove, onSuccessUpdate }) => {

  const [selectedBook, setSelectedBook] = useState<WishlistBook | null>(null);

return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {collection.map((book: WishlistBook, index: number) => (
      <div
        key={book.id}
        className="bg-card border border-border rounded-xl transition-all duration-300 flex flex-col overflow-hidden group h-[465px]"
      >
        {/* Image Container */}
        <div className="relative w-full h-52 bg-muted/30 flex items-center justify-center overflow-hidden border-b border-border shrink-0">
          {book.cover_image ? (
            <>
              <Image src={book.cover_image} alt="" fill priority={index < 5}
                className="object-cover blur-md opacity-30 scale-110 pointer-events-none"
                sizes="(max-width: 768px) 100vw, 20vw"
              />
              <Image src={book.cover_image} alt={book.title} width={160} height={240} priority={index < 5}
                sizes="(max-width: 768px) 80vw, 15vw"
                className="relative z-10 max-w-[80%] max-h-[85%] object-contain rounded shadow-[0_6px_12px_rgba(0,0,0,0.2)] border border-white/20"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <Icon icon="mdi:book-open-page-variant" className="text-muted-foreground/50" width="44" height="44" />
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 z-20 bg-background/90 backdrop-blur-xs px-2 py-1 rounded-lg flex items-center gap-1 border border-border">
            <Icon icon="mdi:star" className="text-amber-400" width="14" />
            <span className="text-xs font-bold text-foreground">{book.rating}/5</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 justify-between min-h-0 bg-card">
          <div className="space-y-2 min-h-0 overflow-hidden">
            <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-snug group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors" title={book.title}>
              {book.title}
            </h3>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon key={star} icon="mdi:star"
                  className={star <= book.rating ? "text-amber-400" : "text-muted-foreground/20"}
                  width="16"
                />
              ))}
            </div>
            <div className="pt-1">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                My Review:
              </p>
              <p className="text-xs text-muted-foreground italic line-clamp-4 leading-relaxed mt-0.5">
                {book.review || "No thoughts added for this book."}
              </p>
            </div>
          </div>

          {/* Command Bar */}
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between shrink-0">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Icon icon="mdi:calendar" width="12" />
              {book.created_at ? new Date(book.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short" }) : "Recent"}
            </span>
            <button type="button"
              onClick={(e) => { e.stopPropagation(); setSelectedBook(book); }}
              className="flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-white hover:bg-green-600 border border-green-200 dark:border-green-800 hover:border-green-600 px-2.5 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              <Icon icon="mdi:square-edit-outline" width="14" />
              Edit
            </button>
            <button type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(book.id, book.title); }}
              className="flex items-center gap-1 text-xs font-semibold text-destructive hover:text-white hover:bg-destructive border border-destructive/30 hover:border-destructive px-2.5 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              <Icon icon="mdi:trash-can-outline" width="14" />
              Remove
            </button>
          </div>
        </div>
      </div>
    ))}
    <EditReviewModal isOpen={selectedBook !== null} onClose={() => setSelectedBook(null)} book={selectedBook} onSuccessUpdate={onSuccessUpdate} />
  </div>
);
};