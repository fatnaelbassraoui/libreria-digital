export interface WishlistBook {
  id: number;           
  user_id: string;     
  book_id: number;      
  title: string;       
  cover_image: string | null; 
  rating: number;       
  review: string | null; 
  created_at: string;   
}