"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { isForProsPath } from "@/lib/shell";

/**
 * Shared directory conversion shell — separate For Pros band.
 * Uses the existing Stripe Featured $99 URL. Hidden on /for-pros/.
 */
export function ForProsBand() {
  const pathname = usePathname();
  if (isForProsPath(pathname)) return null;

  return (
    <section className="border-t border-border bg-accent">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-heading text-xl font-semibold text-accent-foreground">
            For HVAC companies
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-accent-foreground">
            Buy a labeled Featured — paid placement on a city × service URL.
            $99/month on Stripe. Not exclusive. No lead-count SLA. The
            homeowner form has no credit-card field.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.featuredCheckoutUrl}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90"
          >
            Featured — $99/month
          </a>
          <Link
            href="/for-pros/"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-5 text-base font-medium hover:bg-card/80"
          >
            For Pros
          </Link>
        </div>
      </div>
    </section>
  );
}
