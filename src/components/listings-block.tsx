import Link from "next/link";
import { site } from "@/config/site";
import type { Listing } from "@/types/listing";

const TIER_LABEL: Record<Listing["tier"], string> = {
  featured: "Featured — paid placement",
  exclusive: "Exclusive — paid placement",
  standard: "Listing",
};

export function ListingsBlock({ listings }: { listings: Listing[] }) {
  return (
    <section id="listings" className="mt-10">
      <h2 className="font-heading text-xl font-semibold sm:text-2xl">
        Listings on this URL
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {site.name} does not invent company names, phone numbers, or licenses.
        Featured spots are paid and labeled.
      </p>

      {listings.length === 0 ? (
        <EmptyListingState />
      ) : (
        <ul className="mt-4 space-y-3">
          {listings.map((listing) => (
            <li
              key={`${listing.tier}-${listing.name}`}
              className="rounded-[16px] border border-border bg-card p-4 shadow-[0_8px_24px_rgba(21,32,43,0.08)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                {listing.tier !== "standard" ? (
                  <span
                    className={
                      listing.tier === "featured"
                        ? "rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground"
                        : "rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground"
                    }
                  >
                    {TIER_LABEL[listing.tier]}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">
                    {TIER_LABEL.standard}
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-heading text-lg font-semibold">
                {listing.profile_url ? (
                  <a href={listing.profile_url} className="hover:underline">
                    {listing.name}
                  </a>
                ) : (
                  listing.name
                )}
              </h3>
              {listing.blurb ? (
                <p className="mt-1 text-sm text-muted-foreground">{listing.blurb}</p>
              ) : null}
              <dl className="mt-3 grid gap-1 text-sm">
                {listing.areas_served.length > 0 ? (
                  <div>
                    <dt className="inline font-medium">Areas served: </dt>
                    <dd className="inline">{listing.areas_served.join(", ")}</dd>
                  </div>
                ) : null}
                {listing.phone ? (
                  <div>
                    <dt className="inline font-medium">Phone: </dt>
                    <dd className="inline">
                      <a href={`tel:${listing.phone.replace(/\D/g, "")}`} className="underline">
                        {listing.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {listing.license_id ? (
                  <div>
                    <dt className="inline font-medium">License: </dt>
                    <dd className="inline">{listing.license_id}</dd>
                  </div>
                ) : null}
              </dl>
              {listing.name ? (
                <p className="mt-3">
                  <a
                    href="#quote"
                    className="text-sm font-medium underline-offset-2 hover:underline"
                  >
                    Request a quote and mention this listing
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Empty city × service — exact copy and Featured badge from the SHIP #1 brief. */
export function EmptyListingState() {
  return (
    <div className="mt-4 rounded-[16px] border border-dashed border-border bg-card p-5">
      <p>
        No live listings on this URL yet. Use the form — we take the request
        and hold it. We do not invent companies.
      </p>
      <p className="mt-3">
        <span className="mr-2 inline-flex rounded-full bg-accent px-2 py-0.5 text-[13px] leading-[18px] font-semibold text-accent-foreground">
          Featured — paid placement
        </span>
      </p>
      <p className="mt-3">
        <Link
          href="/for-pros/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-[15px] leading-5 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Get Featured — $99/month
        </Link>
      </p>
    </div>
  );
}
