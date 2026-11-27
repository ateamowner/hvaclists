import type { ListingTier } from "@/config/site";

export type Listing = {
  name: string;
  areas_served: string[];
  phone: string;
  license_id: string;
  blurb: string;
  tier: ListingTier;
  profile_url: string;
  city_slug: string;
  service_slug: string;
  /** Cited BBB profile URL, when one was verified. Preferred over google_profile. */
  bbb_profile?: string;
  /** Cited Google Business profile URL, used only when no BBB profile could be verified. */
  google_profile?: string;
  /** Optional verified street address (from the city registration list or the company's own site). */
  address?: {
    street: string;
    locality: string;
    region: string;
    postal_code: string;
  };
  /** Public URLs used to verify this listing (registration list, BBB, company site). */
  sources?: string[];
};
