export const fetchGutenbergBooks = async (query: string) => {
  const response = await fetch(`/api/books?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};
