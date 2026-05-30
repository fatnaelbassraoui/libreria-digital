import axios from "axios";
import { GutenbergApiResponse } from "../types/bookInterface";

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
}