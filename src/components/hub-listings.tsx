import Link from "next/link";
import { getService, servicePath, site, type City } from "@/config/site";
import { formatVerifiedDate, type CityListingEntry } from "@/lib/listings";

/** City hub: every verified company listed on this city's service pages, with links to those pages. */
export function HubListings({
  city,
  entries,
}: {
  city: City;
  entries: CityListingEntry[];
}) {
  if (entries.length === 0) return null;
  return (
    <section id="listed-companies" className="mt-8">
      <h2 className="font-heading text-xl font-semibold">
        {`Companies listed in ${city.name}, ${city.stateAbbr} (${entries.length})`}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Every company below is listed on at least one {city.name} service page,
        with its license or registration and sources cited there. Listed A to Z,
        not ranked. {site.name} is a directory, not an HVAC contractor, and does not
        invent companies, phone numbers, licenses, or ratings. Featured spots
        are paid and labeled.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        How we list these companies: each one is checked against the city&apos;s
        own registered-contractor list where the city keeps one, its own website,
        and its BBB profile where one exists. We show only facts those sources
        state (services, emergency service, years in business, service area,
        license or registration) and leave a field out when no source says it.
        No ratings, no paid ranking; Featured spots are labeled. Full method:{" "}
        <Link href="/how-we-list/" className="underline underline-offset-2">
          How we list companies
        </Link>
        .
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {entries.map(({ listing, serviceSlugs }) => (
          <li
            key={listing.name}
            className="rounded-[14px] border border-border bg-card p-4 shadow-[0_12px_32px_rgba(19,32,43,.10)]"
          >
            {listing.tier !== "standard" ? (
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                {listing.tier === "featured"
                  ? "Featured (paid placement)"
                  : "Exclusive (paid placement)"}
              </span>
            ) : null}
            <h3 className="mt-1 font-heading text-base font-semibold">
              {listing.profile_url ? (
                <a href={listing.profile_url} rel="noopener" className="hover:underline">
                  {listing.name}
                </a>
              ) : (
                listing.name
              )}
            </h3>
            <dl className="mt-2 grid gap-1 text-sm">
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
              {listing.services && listing.services.length > 0 ? (
                <div>
                  <dt className="inline font-medium">Services: </dt>
                  <dd className="inline">{listing.services.join(", ")}</dd>
                </div>
              ) : null}
              {listing.emergency === true ? (
                <div>
                  <dt className="inline font-medium">Emergency / 24-hour: </dt>
                  <dd className="inline">Yes (per company site)</dd>
                </div>
              ) : null}
              {listing.in_business_since ? (
                <div>
                  <dt className="inline font-medium">In business since: </dt>
                  <dd className="inline">{listing.in_business_since}</dd>
                </div>
              ) : null}
              {listing.areas_served.length > 0 ? (
                <div>
                  <dt className="inline font-medium">Service area: </dt>
                  <dd className="inline">{listing.areas_served.join(", ")}</dd>
                </div>
              ) : null}
              {listing.bbb_url ? (
                <div>
                  <dt className="inline font-medium">BBB profile: </dt>
                  <dd className="inline">
                    <a href={listing.bbb_url} rel="noopener nofollow" className="underline">
                      View on BBB.org
                    </a>
                  </dd>
                </div>
              ) : null}
              {listing.last_verified ? (
                <div>
                  <dt className="inline font-medium">Last verified: </dt>
                  <dd className="inline">
                    <time dateTime={listing.last_verified}>
                      {formatVerifiedDate(listing.last_verified)}
                    </time>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="inline font-medium">Listed for: </dt>
                <dd className="inline">
                  {serviceSlugs.map((slug, i) => {
                    const service = getService(slug);
                    if (!service) return null;
                    return (
                      <span key={slug}>
                        {i > 0 ? ", " : null}
                        <Link
                          href={`${servicePath(city, service)}#listings`}
                          className="underline underline-offset-2"
                        >
                          {service.name}
                        </Link>
                      </span>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
