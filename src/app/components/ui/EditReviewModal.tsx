"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../lib/supabase";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";
import { WishlistBook } from "../../types/wishListInterface";
import { handleError } from "../../utils/handleError";

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: WishlistBook | null; // Riceve direttamente il libro della tua collezione
  onSuccessUpdate: (id: number, rating: number, review: string) => void;
}

export const EditReviewModal: React.FC<EditReviewModalProps> = ({
  isOpen,
  onClose,
  book,
  onSuccessUpdate,
}) => {
  // state to track the previous book ID and avoid unnecessary state updates when the same book is passed again
  const [prevBookId, setPrevBookId] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sincronizzazione immediata durante il render (sostituisce lo useEffect)
  if (book && book.id !== prevBookId) {
    setPrevBookId(book.id);
    setRating(book.rating);
    setReview(book.review || "");
  }

  if (!isOpen || !book) return null;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: updateError } = await supabase
        .from("wishlist")
        .update({
          rating: rating,
          review: review.trim() || null,
        })
        .eq("id", book.id);

      if (updateError) throw updateError;
      toast.success(`"${book.title}" review updated successfully!`);
      onSuccessUpdate(book.id, rating, review.trim());
      onClose();
    } catch (err: unknown) {
      handleError(err, "Failed to update the review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5 bg-muted/40">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-card-foreground">
              Edit your Review
            </h3>
            <p
              className="text-xs text-muted-foreground truncate max-w-[280px]"
              title={book.title}
            >
              {book.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted rounded-xl p-1.5 cursor-pointer transition-colors"
          >
            <Icon icon="mdi:close" width="20" height="20" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Rating */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="cursor-pointer transition-transform active:scale-90"
                >
                  <Icon
                    icon={star <= rating ? "mdi:star" : "mdi:star-outline"}
                    className={
                      star <= rating
                        ? "text-amber-400"
                        : "text-muted-foreground/40"
                    }
                    width="28"
                    height="28"
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-muted-foreground ml-2 bg-muted px-2 py-0.5 rounded">
                {rating} / 5
              </span>
            </div>
          </div>

          {/* Review */}
          <div className="space-y-2">
            <label
              htmlFor="review"
              className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Review / Thoughts
            </label>
            <textarea
              id="review"
              rows={4}
              value={review}
              maxLength={200}
              onChange={(e) => setReview(e.target.value)}
              className="block w-full bg-background border border-border text-foreground text-sm rounded-xl p-3.5 focus:border-green-700 outline-hidden resize-none transition-all placeholder:text-muted-foreground/50"
              placeholder="Update your thoughts about this book..."
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-muted-foreground bg-muted hover:bg-muted/70 rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            {isLoading ? (
              <div className="px-6 py-2">
                <Spinner />
              </div>
            ) : (
              <button
                type="submit"
                className="text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 px-4 py-2.5 rounded-xl shadow-md active:scale-95 cursor-pointer transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
