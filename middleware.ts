import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: any) {
  const response = intlMiddleware(req);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img/|favicon.ico).*)"],
};
