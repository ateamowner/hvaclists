import Link from "next/link";
import { HeaderPrimaryCta } from "@/components/header-primary-cta";
import { site } from "@/config/site";

/** Shared directory conversion shell — sticky header. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="group min-w-0">
          <p className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {site.name}
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            HVAC directory
          </p>
        </Link>
        <nav
          aria-label="Primary"
          className="flex shrink-0 items-center gap-3 text-sm font-medium sm:gap-5"
        >
          <Link href="/#cities" className="hover:underline">
            Cities
          </Link>
          <Link href="/for-pros/" className="hover:underline">
            For Pros
          </Link>
          <HeaderPrimaryCta />
        </nav>
      </div>
    </header>
  );
}
