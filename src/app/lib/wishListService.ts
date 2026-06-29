import { supabase } from "../lib/supabase";
import { GutenbergBook } from "../types/bookInterface";
import { WishlistBook } from "../types/wishListInterface";

// Fetch user's book collection
export const getWishlistBooks = async (
  userId: string,
): Promise<WishlistBook[]> => {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  if (!data) throw new Error("Failed to fetch wishlist");

  return data;
};

export const addBookToWishLists = async ({
  book,
  rating,
  review,
}: {
  book: GutenbergBook;
  rating: number;
  review: string | null;
}) => {
  const { error: rpcError } = await supabase.rpc("add_to_wishlist", {
    p_book_id: book.id,
    p_title: book.title,
    p_cover_image: book.cover_image ?? null,
    p_rating: rating,
    p_review: review?.trim() || null,
  });

  //the Supabase client does not always throw an exception with rpc(), the returned error object must be checked
  if (rpcError) throw rpcError;
};

// Delete book from wishlist
export const removeFromWishlist = async (id: number): Promise<void> => {
  const { error } = await supabase.from("wishlist").delete().eq("id", id);

  if (error) throw error;
};
