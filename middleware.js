export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/lecturer", "/admin", "/student"],
};