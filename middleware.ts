import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Create the middleware for internationalization
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: any) {
  // Extract pathname from the request to determine the route
  const { pathname } = req.nextUrl;

  // Apply the i18n middleware
  const response = intlMiddleware(req);

  // Get cookies
  const cookieStore = cookies();
  const adminCookie = cookieStore.get("admin");
  console.log(adminCookie);

  // Check if the user is trying to access the dashboard
  if (pathname.startsWith("/dashboard")) {
    // If there is no admin cookie, redirect to the login page
    if (!adminCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If the admin cookie is present or not trying to access the dashboard, continue as normal
  return response;
}

export const config = {
  // Match only internationalized pathnames and the dashboard
  matcher: [
    "/dashboard",
    "/((?!api|_next/static|_next/image|img/|favicon.ico).*)",
  ],
};
