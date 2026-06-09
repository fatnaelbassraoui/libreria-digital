
//"use server";
import axios from "axios";
import { GutenbergApiResponse, GutenbergBook } from "../types/bookInterface";
import { handleError } from "../utils/handleError";


export const getBooks =async (url:string)=>{
    const response = await axios.get<GutenbergApiResponse>(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST || ''

          }
        }
        );
     return response;
 //  return response.data.results;
}



export const fetchGutenbergBooks = async (
  search: string
): Promise<GutenbergBook[]> => {

  const url = search
    ? `/api/books?q=${encodeURIComponent(search)}`
    : "/api/books";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();

  return data.results;
};