export const getBooksFromRapidApi = async (query?: string) => {
  const url = query
    ? `https://project-gutenberg-free-books-api1.p.rapidapi.com/books?q=${query}`
    : `https://project-gutenberg-free-books-api1.p.rapidapi.com/books`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST!,
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
};


