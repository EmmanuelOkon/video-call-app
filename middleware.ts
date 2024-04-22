import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { URLS } from "@/utils/routes";

const protectedRoutes = createRouteMatcher([
  URLS.HOME,
  URLS.PERSONAL_ROOM,
  URLS.RECORDINGS,
  URLS.UPCOMING_MEETINGS,
  URLS.PREVIOUS_MEETINGS,
  URLS.MEETING,
]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
