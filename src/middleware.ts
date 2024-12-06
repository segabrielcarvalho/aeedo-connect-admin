import routes from "@/routes";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [routes.auth.login.path, routes.auth.register.path];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path);

  if (
    isPublicPath ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token");

  if (accessToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL(routes.auth.login.path, request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|static).*)"],
};
