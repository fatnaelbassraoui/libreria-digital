import { NextResponse } from "next/server";
import { getBooksFromRapidApi } from "../../lib/booksService";
import { getBookByIdFromRapidApi } from "../../lib/bookByIdService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const id = searchParams.get("id");

    let data;

    if (id) {
      data = await getBookByIdFromRapidApi(id);
    } else {
      data = await getBooksFromRapidApi(query);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch books: ${error}` }, // 👈 Sistemate le virgolette qui
      { status: 500 },
    );
  }
}
