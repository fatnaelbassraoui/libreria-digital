// middleware.ts (nella cartella principale del progetto, fuori da /app)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  // add a custom header to the request to pass the current path to the layout
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  // this matcher indicates that the middleware should run for all routes except for API routes, static files, and the favicon
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
