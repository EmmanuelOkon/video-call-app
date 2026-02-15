import { URLS } from "@/utils/routes";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  URLS.HOME,
  URLS.PERSONAL_ROOM,
  URLS.RECORDINGS,
  URLS.UPCOMING_MEETINGS,
  URLS.PREVIOUS_MEETINGS,
  URLS.MEETING,
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
