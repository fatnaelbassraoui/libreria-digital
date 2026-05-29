
"use client";
import { GutenbergApiResponse, GutenbergBook } from "../../types/bookInterface";
import { NavBar } from "../../components/ui/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/ui/Spinner";
import { BookCard } from "../../components/ui/BookCard";

type ApiError = {
  message: string;
  code: number;
};
const BookLists = () => {

  const [bookList, setBookList] = useState<GutenbergBook[]>([]);
  console.log('book lists:', bookList);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get<GutenbergApiResponse>("https://project-gutenberg-free-books-api1.p.rapidapi.com/books", {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST || ''

          }
        }
        );
        if (response.status !== 200) {
          throw new Error(`Error fetching books: ${response.statusText}`);
        }
        setBookList(response.data.results);
      } catch (err) {
        if (axios.isAxiosError<ApiError>(err)) {
          console.error(err.response?.data.message);
          setError(new Error(`API Error: ${err.response?.data.message} (Status: ${err.response?.status})`));
        } else {
          setError(err instanceof Error ? err : new Error("An unexpected error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);

 return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

        <div className="mb-8">
  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Available Books</h2>
  <p className="text-sm text-gray-500">Explore literary classics</p>
</div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg border border-red-200">
            {error.message}
          </div>
        ) : (
         <BookCard books={bookList} />
        )}
      </main>
    </div>
  );
    
  
};

export default BookLists;