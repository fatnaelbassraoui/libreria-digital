"use client";
import { Spinner } from "@/src/components/ui/Spinner";
import { NavBar } from "../../components/ui/NavBar";
import { supabase } from "../../lib/supabase";
import { WishlistBook } from "@/src/types/wishListInterface";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { WishlistGrid } from "../../components/ui/WishlistGrid";
import { EmptyState } from "../../components/ui/EmptyState";

const BooksCollection = () => {
    const [collection, setCollection] = React.useState<WishlistBook[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
  
useEffect(() => {
        const fetchCollection = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await supabase.from('wishlist').select('*');
                if (!response.data) {
                    throw new Error("Failed to fetch collection");
                }

                setCollection(response.data);

            } catch (error) {
                console.error("Error fetching collection:", error);
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
            }

        
        fetchCollection()
      
    },[]);

    const handleRemove = async (id: number) => {
    try {
      const { error: deleteError } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setCollection((prev) => prev.filter((book) => book.id !== id));
      toast.success("Book removed from your collection");
    } catch (err: any) {
      console.error("Error deleting book:", err);
      toast.error("Failed to remove the book. Try again.");
    }
  };
  
    return (
        <div className="min-h-screen bg-gray-50">
              <NavBar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                    <div className="mb-8">
  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Wishlist</h2>
  
</div>
                     {isLoading ? (
                              <div className="flex items-center justify-center h-64">
                                <Spinner />
                              </div>
                            ) : error ? (
                              <div className="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200">
                                {error.message}
                              </div>
                            ) :  collection.length === 0 ? (
          /* empty statement management */
         <EmptyState />
        ) : (
          <WishlistGrid collection={collection} onRemove={handleRemove} />
        )}
        </main>
        </div>
    );
};

export default BooksCollection;