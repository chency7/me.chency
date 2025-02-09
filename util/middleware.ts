import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function projectsAuthMiddleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/projects")) {
    // 从 localStorage 获取认证状态
    const hasAuth = request.cookies.get("projectAuth") || localStorage.getItem("projectAuth");
    if (!hasAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/projects/:path*",
};
