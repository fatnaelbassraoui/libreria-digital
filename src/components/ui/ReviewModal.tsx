import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { GutenbergBook } from "../../types/bookInterface";
import { supabase } from "../../lib/supabase";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: GutenbergBook;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, book }) => {
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try{
  // Chiamata RPC a Supabase
      const { error: rpcError } = await supabase.rpc('add_to_wishlist', {
        p_book_id: book.id,
        p_title: book.title,
        p_cover_image: book.cover_image ?? null,
        p_rating: rating,
        p_review: review.trim() || null
      });

      // Il client di Supabase non lancia sempre un'eccezione con rpc(), va controllato l'oggetto error restituito
      if (rpcError) throw rpcError;

      toast.success(`${book.title} added to your collection!`);
      onClose(); // Chiudiamo il modal SOLO in caso di successo
      setReview(""); // Resettiamo il form
}catch (err: any) {
      console.error("Error adding book to wishlist:", err);
      const msg = err.message || "An unexpected error occurred";
      setError(msg);
      toast.error(`Failed to save: ${msg}`);}finally{
  setIsLoading(false);
}
  
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5 bg-gray-50/50">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-gray-900">Add to your Collection</h3>
            <p className="text-xs text-gray-500 truncate max-w-[280px]" title={book?.title}>
              {book?.title}
            </p>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-700 rounded-xl text-sm w-8 h-8 inline-flex justify-center items-center transition-colors"
          >
            <Icon icon="mdi:close" width="20" height="20" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/*  Rating section (1-5 stars) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90"
                >
                  <Icon 
                    icon={star <= rating ? "mdi:star" : "mdi:star-outline"} 
                    className={star <= rating ? "text-amber-400" : "text-gray-300"} 
                    width="28" 
                    height="28" 
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded">
                {rating} / 5
              </span>
            </div>
          </div>

          {/* Review section */}
          <div className="space-y-2">
            <label htmlFor="review" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Review / Thoughts (Optional)
            </label>
            <textarea
              id="review"
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="block w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-green-100 focus:border-green-700 p-3.5 shadow-xs placeholder:text-gray-400 outline-hidden transition-all resize-none"
              placeholder="What did you think about this literary masterpiece?"
            />
          </div>

          {/* Modal Footer / Azioni */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
            >
              Cancel
            </button>
           {isLoading?(
            <div className="px-6 py-2 flex items-center justify-center">
                <Spinner />
              </div>
           ):( <button 
              type="submit" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-green-700 hover:bg-green-800 px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              
               Save
            </button>) }
          </div>
        </form>
      </div>
    </div>
  );
};