import { supabase } from '../lib/supabase';
import { GutenbergBook } from '../types/bookInterface';



export const addBookToWishList = async ({ book, rating, review}: {
    book: GutenbergBook;
    rating: number;
    review: string | null;
}) => {
    const { error: rpcError } = await supabase.rpc('add_to_wishlist', {
        p_book_id: book.id,
        p_title: book.title,
        p_cover_image: book.cover_image ?? null,
        p_rating: rating,
        p_review: review?.trim() || null
    });

    //the Supabase client does not always throw an exception with rpc(), the returned error object must be checked
    if (rpcError) throw rpcError;

}
