import { clerkMiddleware, createRouteMatcher,authMiddleware} from "@clerk/nextjs/server";

// const isProtected = createRouteMatcher([
//   '/'
// ])
// const isPublic = createRouteMatcher([
//   '/api/webhooks/clerk'
// ])
// export default clerkMiddleware((auth,req)=>{
//   if (isProtected(req)) {
//     auth().protect(); 
//   }
// });
export default authMiddleware({
  publicRoutes:[
    "/",
    "/api/webhooks(.*)",
    "/api/uploadthing",
    "/:username",
    "/search"
  ]
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
}