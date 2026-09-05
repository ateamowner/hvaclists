import { cities, services } from "@/config/site";

/** Shared directory shell helpers. Copy with the shell components to other *lists sites. */

const FORMLESS = new Set([
  "/privacy",
  "/privacy/",
  "/for-pros",
  "/for-pros/",
  "/request-sent",
  "/request-sent/",
]);

export function pageHasQuoteForm(pathname: string): boolean {
  if (!pathname || FORMLESS.has(pathname)) return false;
  const path =
    pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  if (path === "/" || path === "") return true;
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 1 && cities.some((city) => city.slug === parts[0])) {
    return true;
  }
  if (
    parts.length === 2 &&
    cities.some((city) => city.slug === parts[0]) &&
    services.some((service) => service.slug === parts[1])
  ) {
    return true;
  }
  return false;
}

export function quoteHref(pathname: string): string {
  return pageHasQuoteForm(pathname) ? "#quote" : "/#quote";
}

export function isForProsPath(pathname: string): boolean {
  return pathname === "/for-pros" || pathname === "/for-pros/";
}
