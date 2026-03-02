import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { studioPath } from "./sanity/env";

const blockedStudioPath = "/studio";
const internalStudioPath = "/studio-internal";

const unauthorized = () =>
  new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="TSOL Sanity Studio"',
    },
  });

const notFound = () => new NextResponse("Not Found", { status: 404 });

const isPathOrChild = (pathname: string, basePath: string) =>
  pathname === basePath || pathname.startsWith(`${basePath}/`);

const parseBasicAuth = (authorizationHeader: string | null) => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Basic ")) {
    return null;
  }

  const encoded = authorizationHeader.slice(6);

  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    isPathOrChild(pathname, blockedStudioPath) ||
    isPathOrChild(pathname, internalStudioPath)
  ) {
    return notFound();
  }

  if (!isPathOrChild(pathname, studioPath)) {
    return NextResponse.next();
  }

  const username = process.env.SANITY_STUDIO_USERNAME;
  const password = process.env.SANITY_STUDIO_PASSWORD;

  if (!username || !password) {
    return notFound();
  }

  const auth = parseBasicAuth(request.headers.get("authorization"));

  if (!auth || auth.username !== username || auth.password !== password) {
    return unauthorized();
  }

  const suffix = pathname === studioPath ? "" : pathname.slice(studioPath.length);
  const rewrittenUrl = request.nextUrl.clone();
  rewrittenUrl.pathname = `${internalStudioPath}${suffix}`;

  return NextResponse.rewrite(rewrittenUrl);
}

export const config = {
  matcher: "/:path*",
};
