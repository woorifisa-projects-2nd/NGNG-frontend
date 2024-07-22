import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// npm i jwt-decode

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log(request.cookies.getAll());

  // const requestHeadres = new Headers(request.headers);
  // const token = requestHeadres.get("authorization");
  // console.log(requestHeadres.get("referer"));
  // console.log(requestHeadres);

  const token = request.cookies.get("refreshToken")?.value;

  const role = token && (jwtDecode(token) as any).role;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (role != "ADMIN") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  const userPathMatch = ["/my_page", "/chat"];

  if (
    userPathMatch.some((prefix) => request.nextUrl.pathname.startsWith(prefix))
  ) {
    if (role != "USER") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ["/admin/:path*", "/my_page/:path*"],
  matcher: ["/admin/:path*"],
};
