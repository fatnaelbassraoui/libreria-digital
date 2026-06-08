
import { supabase } from "../lib/supabase";
import { WishlistBook } from "../types/wishListInterface";

// Fetch user's book collection
export const getCollection = async (userId: string): Promise<WishlistBook[]> => {

  const { data, error } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  if (!data) throw new Error("Failed to fetch collection");
  
  return data;
};

// Delete book from collection
export const removeFromCollection = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('id', id);

  if (error) throw error;
};