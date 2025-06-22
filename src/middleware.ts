import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/api/webhook(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    console.log("Middleware: Processing request for:", req.url);
    console.log("Middleware: Is public route:", isPublicRoute(req));
    
    if (!isPublicRoute(req)) {
        console.log("Middleware: Protected route, checking auth...");
        try {
            await auth.protect();
            console.log("Middleware: Auth protection passed");
        } catch (error) {
            console.log("Middleware: Auth protection failed:", error);
            throw error;
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};