import { getSession, updateSession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};


const shouldRedirect = (url: string) => {
  const unprotectedRoutes = ["/", "/blog", "/login", "/register"];
  let flag = true;
  const urlPath = new URL(url).pathname;
  for (let i = 0; i < unprotectedRoutes.length; i++) {
    if (urlPath === unprotectedRoutes[i]) {
      flag = false;
      break;
    }
  }
  if (
    urlPath.startsWith("/blog") &&
    !["/blog/new", "/blog/edit"].includes(urlPath)
  ) {
    flag = false;
  }
  return flag;
};

export async function middleware(request: NextRequest) {
  const tokenPayload = await getSession(request);
  if (tokenPayload) {
    return updateSession(request);
  }

  if (!tokenPayload && shouldRedirect(request.url)) {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}