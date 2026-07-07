import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { GutenbergBook } from "../../types/bookInterface";
import { Spinner } from "./Spinner";
import { handleError } from "../../utils/handleError";
import { toast } from "react-toastify";
import { addBookToWishLists } from "../../lib/wishListService";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: GutenbergBook;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addBookToWishLists({ book, rating, review });
      toast.success(`"${book.title}" added to your collection!`);
      onClose();
    } catch (err: unknown) {
      handleError(
        err,
        "An error occurred while adding the book to your collection. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-5 bg-muted/40">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-card-foreground">
              Add to your Collection
            </h3>
            <p
              className="text-xs text-muted-foreground truncate max-w-[280px]"
              title={book?.title}
            >
              {book?.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted rounded-xl w-8 h-8 inline-flex justify-center items-center transition-colors cursor-pointer"
          >
            <Icon icon="mdi:close" width="20" height="20" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Body */}
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
                  className="transition-transform active:scale-90 cursor-pointer"
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
              Review / Thoughts (Optional)
            </label>
            <textarea
              id="review"
              rows={4}
              value={review}
              maxLength={200}
              onChange={(e) => setReview(e.target.value)}
              className="block w-full bg-background border border-border text-foreground text-sm rounded-xl focus:ring-2 focus:ring-green-700/20 focus:border-green-700 p-3.5 placeholder:text-muted-foreground/50 outline-hidden transition-all resize-none"
              placeholder="What did you think about this literary masterpiece?"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-muted-foreground bg-muted hover:bg-muted/70 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            {isLoading ? (
              <div className="px-6 py-2 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 px-4 py-2.5 rounded-xl transition-colors shadow-md active:scale-95"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
