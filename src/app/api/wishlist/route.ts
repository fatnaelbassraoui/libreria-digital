import { NextResponse } from "next/server";
import {
  addBookToWishLists,
  getWishlistBooks,
  removeFromWishlist,
} from "../../lib/wishListService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 },
      );
    }

    const data = await getWishlistBooks(userId);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: `"Failed to fetch wishlist"${message}` },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { book, rating, reviwe } = await request.json();

    if (!book || !rating) {
      return NextResponse.json(
        { error: "Missing required fields: book and rating" },
        { status: 400 },
      );
    }

    await addBookToWishLists({ book, rating, review: reviwe });
    return NextResponse.json(
      { message: "Book added to wishlist" },
      { status: 201 },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: `Failed to add book to wishlist: ${message}`,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const id = await request.json();
    if (!id) {
      return NextResponse.json(
        {
          error: "Missing required id field",
        },
        { status: 400 },
      );
    }

    await removeFromWishlist(id);
    return NextResponse.json(
      { message: "book removed from wishlist" },
      { status: 200 },
    );
  } catch (error: unknown) {
    const messsage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to remove book from wishlist: ${messsage}` },
      { status: 500 },
    );
  }
}
