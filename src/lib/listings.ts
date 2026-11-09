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
