import React from "react";
import { Icon } from "@iconify/react";
import { WishlistBook } from "../../types/wishListInterface";

interface WishlistGridProps {
  collection: WishlistBook[];
  onRemove: (id: number, title: string) => void;
}

export const WishlistGrid: React.FC<WishlistGridProps> = ({ collection, onRemove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {collection.map((book: WishlistBook) => (
        <div
          key={book.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group h-[460px]"
        >
          {/* Image Container */}
          <div className="relative w-full h-52 bg-gray-900/5 flex items-center justify-center overflow-hidden border-b border-gray-100 shrink-0">
            {book.cover_image ? (
              <>
                <img
                  src={book.cover_image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none"
                />
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="relative z-10 max-w-[80%] max-h-[85%] object-contain rounded shadow-[0_6px_12px_rgba(0,0,0,0.2)] border border-white/20"
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <Icon icon="mdi:book-open-page-variant" className="text-gray-400" width="44" height="44" />
              </div>
            )}

            <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-lg shadow-xs flex items-center gap-1 border border-gray-100">
              <Icon icon="mdi:star" className="text-amber-400" width="14" />
              <span className="text-xs font-bold text-gray-800">{book.rating}/5</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4 justify-between min-h-0 bg-white">
            <div className="space-y-2 min-h-0 overflow-hidden">
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-green-800 transition-colors" title={book.title}>
                {book.title}
              </h3>

              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    icon="mdi:star"
                    className={star <= book.rating ? "text-amber-400" : "text-gray-200"}
                    width="16"
                  />
                ))}
              </div>

              <div className="pt-1">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                  My Review:
                </p>
                <p className="text-xs text-gray-600 italic line-clamp-4 leading-relaxed mt-0.5">
                  {book.review ? `"${book.review}"` : "No thoughts added for this book."}
                </p>
              </div>
            </div>

            {/* Command Bar */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Icon icon="mdi:calendar" width="12" />
                {book.created_at ? new Date(book.created_at).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                }) : "Recent"}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(book.id, book.title);
                }}
                className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 px-2.5 py-1.5 rounded-lg transition-all active:scale-95 shadow-2xs cursor-pointer"
                title="Remove from collection"
              >
                <Icon icon="mdi:trash-can-outline" width="14" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};