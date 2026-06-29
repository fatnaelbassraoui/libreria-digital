export const getBookByIdFromRapidApi = async (id: string) => {
  const url = `https://project-gutenberg-free-books-api1.p.rapidapi.com/books/${id}/text?cleaning_mode=super`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": "ac3f1e1331msh496e7bb743ac44cp13fd85jsncb9b8a085861",
      "X-RapidAPI-Host": "project-gutenberg-free-books-api1.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
};
