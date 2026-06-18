"use client";

import React, { useEffect } from "react";
import { WishlistBook } from "@/src/app/types/wishListInterface";
import { toast } from "react-toastify";
import { WishlistCard } from "../components/ui/WishlistCard";
import { EmptyState } from "../components/ui/EmptyState";
import { useAuth } from "../context/AuthContext";
import { handleError } from "../utils/handleError";
import { getWishlistBooks, removeFromWishlist } from "../lib/wishListService";
import { BookCardSkeleton } from "../components/ui/BookCardSkeleton";

const BooksCollection = () => {
  const [collection, setCollection] = React.useState<WishlistBook[]>([]);
  const [isLoading, setIsLoading] = React.useState(true); // setted to true to show spinner on initial load and avoid flash of empty state

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // if user is not logged in, skip fetching

    let isMounted = true;

    const fetchCollection = async () => {
      setIsLoading(true);
      try {
        const data = await getWishlistBooks(user.id);
        setCollection(data);

      } catch (error: unknown) {
       
        if (!isMounted) return;
  handleError(error, "Errore nel caricamento della collezione");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();

    return () => {
      isMounted = false; // ← cleanup: prevent state updates if component unmounts before fetch completes
    };
  }, [user]);

  const handleRemove = async (id: number, title: string) => {
    // confirmation dialog before deletion using browser's built-in confirm function
    if (!confirm(`Are you sure you want to remove "${title}" from your collection?`)) {
      return;
    }

    try {
      await removeFromWishlist(id);

      setCollection((prev) => prev.filter((book) => book.id !== id));
      toast.success(`"${title}" removed from your collection`);
      
    } catch (err: unknown) {
      handleError(err, "Failed to remove the book. Try again.");
    }
  };

  const handleUpdateLocalState = (id: number, newRating: number, newReview: string) => {
    setCollection((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, rating: newRating, review: newReview } : book
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Wishlist
          </h2>
        </div>
        {isLoading ? (
          <BookCardSkeleton />
        ) : collection.length === 0 ? (
          <EmptyState />
        ) : (
          <WishlistCard
            collection={collection}
            onRemove={handleRemove}
            onSuccessUpdate={handleUpdateLocalState}
          />
        )}
      </div>
    </div>
  );
};

export default BooksCollection;

