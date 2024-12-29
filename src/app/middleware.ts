import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/firebase";

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  try {
    await checkAuth();
  } catch {
    // If user is not authenticated, proceed with the request
    if (pathname.startsWith("/auth")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // Redirect authenticated users to /admin if they try to access /auth
  if (pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Apply authentication check for /admin routes
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ["/admin/*", "/auth/*", "/api/*"],
};
