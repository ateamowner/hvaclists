import listingsFile from "../../data/listings.json";
import type { Listing } from "@/types/listing";

const TIER_ORDER = { exclusive: 0, featured: 1, standard: 2 } as const;
const listingsData = listingsFile as unknown as Listing[];

function isListing(value: unknown): value is Listing {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Listing>;
  return (
    typeof item.name === "string" &&
    Array.isArray(item.areas_served) &&
    typeof item.phone === "string" &&
    typeof item.license_id === "string" &&
    typeof item.blurb === "string" &&
    (item.tier === "standard" ||
      item.tier === "featured" ||
      item.tier === "exclusive") &&
    typeof item.profile_url === "string" &&
    typeof item.city_slug === "string" &&
    typeof item.service_slug === "string"
  );
}

export function getListings(citySlug: string, serviceSlug: string): Listing[] {
  const rows = Array.isArray(listingsData) ? listingsData : [];
  return rows
    .filter(isListing)
    .filter(
      (listing) =>
        listing.city_slug === citySlug && listing.service_slug === serviceSlug
    )
    .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);
}

export type CityListingEntry = {
  listing: Listing;
  /** Service slugs on this city where the company is listed. */
  serviceSlugs: string[];
};

/** Unique companies listed anywhere on a city, for the city hub. Paid tiers first, then A to Z. */
export function getCityListings(citySlug: string): CityListingEntry[] {
  const rows = Array.isArray(listingsData) ? listingsData : [];
  const byName = new Map<string, CityListingEntry>();
  for (const listing of rows.filter(isListing)) {
    if (listing.city_slug !== citySlug) continue;
    const existing = byName.get(listing.name);
    if (existing) {
      if (!existing.serviceSlugs.includes(listing.service_slug)) {
        existing.serviceSlugs.push(listing.service_slug);
      }
      if (TIER_ORDER[listing.tier] < TIER_ORDER[existing.listing.tier]) {
        existing.listing = listing;
      }
    } else {
      byName.set(listing.name, { listing, serviceSlugs: [listing.service_slug] });
    }
  }
  return [...byName.values()].sort(
    (a, b) =>
      TIER_ORDER[a.listing.tier] - TIER_ORDER[b.listing.tier] ||
      a.listing.name.localeCompare(b.listing.name)
  );
}

/** Newest last_verified date across these listings (real verify dates only, never the build time). */
export function newestVerifiedDate(listings: Listing[]): string | undefined {
  const dates = listings
    .map((listing) => listing.last_verified)
    .filter((d): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort();
  return dates.length ? dates[dates.length - 1] : undefined;
}

/** "2026-10-26" -> "October 26, 2026" (UTC, so the date never shifts). */
export function formatVerifiedDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
