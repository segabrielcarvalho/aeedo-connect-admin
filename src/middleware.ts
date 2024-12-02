import settings from "@/config";
import routes from "@/routes";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get(settings.tokenKey)?.value;
  // const pathname = request.nextUrl.pathname;

  // const publicRoutes = [routes.auth.login.path, routes.auth.register.path];

  // if (publicRoutes.some((route) => pathname === route))
  //   return NextResponse.next();

  // if (token) {
  //   const isValid = await verifyToken(token);
  //   if (isValid) return NextResponse.next();
  // }

  // if (!publicRoutes.some((route) => pathname === routes.auth.login.path)) {
  //   return redirectToLogin(request);
  // }

  return NextResponse.next();
}

const redirectToLogin = (request: NextRequest) => {
  const loginUrl = new URL(routes.auth.login.path, request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
};

export const config = {
  matcher: ["/:path*"],
};

const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(settings.jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};
