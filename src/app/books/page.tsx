
"use client";
import {  GutenbergBook } from "../../types/bookInterface";
import { NavBar } from "../../components/ui/NavBar";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/ui/Spinner";
import { BookCard } from "../../components/ui/BookCard";
import { SearchBar } from "../../components/ui/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";
import { getBooks } from "../../api/booksApi";
import { handleError } from "../../utils/handleError";


const BookLists = () => {

  const [bookList, setBookList] = useState<GutenbergBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serchValue, setSerchValue] = useState<string>("");

// debounce the search value to avoid making API calls on every keystroke
  const debouncedSearchvalue = useDebounce(serchValue, 500);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        setIsLoading(true); const url = debouncedSearchvalue
          ? `https://project-gutenberg-free-books-api1.p.rapidapi.com/books?q=${debouncedSearchvalue}`
          : `https://project-gutenberg-free-books-api1.p.rapidapi.com/books`;

        const response = await getBooks(url);

        if (response.status !== 200) {
          throw new Error(`Error fetching books: ${response.statusText}`);
        }
        setBookList(response.data.results);
      } catch (err:unknown) {
       handleError(err, "An unexpected error occurred while fetching books.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, [debouncedSearchvalue]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        ) : (
          <BookCard books={bookList} />
        )}
      </main>
    </div>
  );


};

export default BookLists;