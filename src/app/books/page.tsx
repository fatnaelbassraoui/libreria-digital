
"use client";
import {  GutenbergBook } from "../types/bookInterface";
import { useEffect, useState } from "react";
import { BookCard } from "../components/ui/BookCard";
import { SearchBar } from "../components/ui/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import { handleError } from "../utils/handleError";
import { fetchGutenbergBooks } from "../api/books/booksApi";
import { BookCardSkeleton } from "../components/ui/BookCardSkeleton";


const BookLists = () => {

  const [bookList, setBookList] = useState<GutenbergBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serchValue, setSerchValue] = useState<string>("");

// debounce the search value to avoid making API calls on every keystroke
  const debouncedSearchvalue = useDebounce(serchValue, 500);

  useEffect(() => {
   
   const loadBooks = async () => {
     setIsLoading(true);
    try {
      const books = await fetchGutenbergBooks(
        debouncedSearchvalue
      );
      
      setBookList(books.results);

    } catch (error) {
      handleError(
        error,
        "An unexpected error occurred while fetching books."
      );
    } finally {
      setIsLoading(false);
    }
  };

  loadBooks();
  }, [debouncedSearchvalue]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex-1 max-w-md mx-auto w-full">
          <SearchBar
            value={serchValue}
            setQuery={setSerchValue}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Available Books</h2>
          <p className="text-sm text-gray-500">Explore literary classics</p>
        </div>

        {isLoading ? (
          
            <BookCardSkeleton />
          
        ) : (
          <BookCard books={bookList} />
        )}
      </div>
    </div>
  );


};

export default BookLists;