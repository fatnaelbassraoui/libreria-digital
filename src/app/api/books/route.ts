import { NextResponse } from "next/server";
import { getBooksFromRapidApi } from "../../lib/booksService";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "";

    const data = await getBooksFromRapidApi(query);

    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json(
      { error: `"Failed to fetch books:"${error}` },
      { status: 500 }
    );
  }
}