# 📚 Digital Library

<img width="1046" height="858" alt="Cattura" src="https://github.com/user-attachments/assets/13f5318a-7237-4148-858a-bf156603112b" />


**Digital Library** is a web application that allows users to explore a vast catalog of books from the Gutenberg library. Users can search for their favorite volumes and build a personal collection, where they can track their reading by adding personal reviews, thoughts, and ratings.



## 🚀 Tech Stack

- Next
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Supabase** — Authentication & Database
- **Gutenberg API** (via RapidAPI) — Books catalog

## ✨ Features

- 🔐 Authentication (Sign In / Sign Up)
- 🔍 Search books from the Gutenberg catalog
- 📖 Add books to your personal collection
- ⭐ Rate and review your books
- ✏️ Edit your reviews
- 🗑️ Remove books from your collection
- 📱 Responsive design

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [RapidAPI](https://rapidapi.com) account with access to the [Gutenberg API](https://rapidapi.com/composer/api/project-gutenberg-free-books-api1)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/libreria-digitale.git
cd libreria-digitale
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root of the project:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_RAPID_API_KEY=your_rapidapi_key
NEXT_PUBLIC_RAPID_API_HOST=project-gutenberg-free-books-api1.p.rapidapi.com
```

4. Set up the Supabase database — run this SQL in the Supabase SQL Editor:
```sql
-- 1. Create the wishlist table
CREATE TABLE public.wishlist (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  book_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  cover_image TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_book UNIQUE (user_id, book_id)
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies for authenticated users
CREATE POLICY "Users can manage their own wishlist"
ON public.wishlist FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. Create the RPC function matching the TypeScript API call
CREATE OR REPLACE FUNCTION public.add_to_wishlist(
  p_book_id INT,
  p_title TEXT,
  p_cover_image TEXT DEFAULT NULL,
  p_rating INT DEFAULT NULL,
  p_review TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  INSERT INTO public.wishlist (user_id, book_id, title, cover_image, rating, review)
  VALUES (auth.uid(), p_book_id, p_title, p_cover_image, p_rating, p_review)
  ON CONFLICT (user_id, book_id) 
  DO UPDATE SET 
    rating = EXCLUDED.rating,
    review = EXCLUDED.review,
    created_at = NOW();
END;
$$;

```
### 💡 Database Architecture Note: The "Upsert" Pattern
Instead of managing separate "insert" and "update" endpoints from the frontend, this project uses a custom PostgreSQL Remote Procedure Call (RPC) named `add_to_wishlist`.

**Why this approach?**
- **Atomic Operations:** It leverages Postgres's `ON CONFLICT (user_id, book_id) DO UPDATE` (Upsert). If a user adds a new book, it creates a record; if they re-submit the modal, it updates their rating and review seamlessly without throwing duplicate key errors.
- **Server-Side Security:** It injects `auth.uid()` directly inside the database function. The frontend never passes the user ID manually, preventing malicious identity spoofing.
- **Performance:** It reduces network latency by cutting down the required API roundtrips from two (check existence + save) to exactly one.


5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
  api/
    addBookToWishListApi.ts # Handles adding/updating books via Supabase RPC
    booksApi.ts             # Fetches data from the Gutenberg external API
    booksCollectionApi.ts   # Manages retrieval and updates for the user's collection
  app/                      # Next.js App Router (Application pages)
    auth/                   # Authentication routes (signIn and signUp pages)
    books/                  # Books catalog page featuring search and filters
    bookscollection/        # User's personal collection page
    globals.css             # Global Tailwind CSS configurations and styles
    layout.tsx              # Root application layout and global context wrapping
    page.tsx                # Main entry point landing page
  components/
    auth/                   # Authentication form and custom auth layout components
    ui/                     # Reusable UI primitives (Cards, Modals, Spinners)
  context/
    AuthContext.tsx         # Global React context for managing session state
  hooks/
    useDebounce.ts          # Custom hook for search bar query optimization
  lib/
    supabase.ts             # Supabase client SDK initialization
  types/
    bookInterface.ts        # TypeScript types for Gutenberg API models
    wishListInterface.ts    # TypeScript types for stored collection books
  utils/
    handleError.ts          # Centralized error handler and alert generator

```

