export interface Author {
  id: number;
  name: string;
}

export interface Formats {
  "text/plain"?: string;
  "text/html; charset=utf-8"?: string;
  "text/plain; charset=us-ascii"?: string;
  "text/html"?: string;
  "application/epub+zip"?: string;
  "application/x-mobipocket-ebook"?: string;
  "text/plain; charset=utf-8"?: string;
  "application/rdf+xml"?: string;
  "image/jpeg"?: string;
  "application/octet-stream"?: string;
  "application/zip"?: string;
}

export interface GutenbergBook {
  id: number;
  title: string;
  alternative_title: string | null;
  authors: Author[];
  subjects: string[];
  bookshelves: string[];
  formats: Formats;
  download_count: number;
  issued: string;
  summary: string;
  reading_ease_score: string;
  cover_image: string;
  removed_from_catalog: boolean | null;
}


export interface GutenbergApiResponse {
  next: string | null;
  previous: string | null;
  results: GutenbergBook[];
}

export interface BookDetailResponse {
  book_id: number;
  title: string;
  alternative_title: string | null;
  cleaning_mode: string;
  text: string;
  metadata: {
    original_length: number;
    cleaned_length: number;
    source_format: string;
    source_url: string;
  };
}
