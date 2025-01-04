import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Retrieve the user's token from cookies
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const url = req.nextUrl;

  // If there is no token, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.status;

  // Define role-based access rules
  const roleRoutes = {
    Lecturer: ["/admin", "/student"],
    Student: ["/lecturer", "/admin"],
    Admin: ["/lecturer", "/student"],
  };

  // Check if the user is trying to access a restricted route
  if (
    role &&
    roleRoutes[role]?.some((restrictedRoute) =>
      url.pathname.startsWith(restrictedRoute)
    )
  ) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home or default page
  }

  return NextResponse.next(); // Allow access if no restrictions are violated
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/lecturer/:path*"], // Static routes to apply middleware
};
