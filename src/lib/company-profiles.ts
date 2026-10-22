import profilesFile from "../../data/company-profiles.json";
import listingsFile from "../../data/listings.json";
import {
  cities,
  getCity,
  getService,
  servicePath,
  site,
  type City,
  type Service,
} from "@/config/site";
import type { Faq } from "@/lib/content";

/**
 * Independent company profiles (/companies/<slug>/).
 *
 * Every fact lives in data/company-profiles.json with the public source it
 * came from (company site, Ohio OCILB roster, City of Dayton registry, BBB).
 * Nothing here is written or paid for by the company. If a fact could not be
 * verified it is left out, never guessed: no ratings, no review counts, no
 * hours unless the company publishes them consistently.
 */

export type ProfileSource = { label: string; url: string };

export type ProfileLicense = {
  authority: string;
  credential: string;
  number: string;
  holder?: string;
  status: string;
  expires?: string;
  note?: string;
  source: string;
};

export type ProfileFact = { label: string; value: string; source?: string };

export type CompanyProfile = {
  slug: string;
  name: string;
  legal_name?: string;
  also_known_as?: string[];
  /** Exact `name` values in data/listings.json that are this company. */
  listing_names: string[];
  schema_type: string;
  title: string;
  meta_description: string;
  headline: string;
  base_location: string;
  summary: string[];
  address?: {
    street: string;
    locality: string;
    region: string;
    postal_code: string;
    source: string;
  };
  phone?: { number: string; source: string };
  website?: string;
  facts: ProfileFact[];
  licenses: ProfileLicense[];
  services: string[];
  services_source?: string;
  areas_served: string[];
  areas_source?: string;
  /** Extra on-site links when the company has no (or few) listings here. */
  related_links?: { href: string; label: string; why: string }[];
  notes: { title: string; body: string }[];
  faqs: Faq[];
  sources: ProfileSource[];
  checked: string;
};

export const companyProfiles = profilesFile as unknown as CompanyProfile[];

type ListingRow = { name: string; city_slug: string; service_slug: string };
const listingRows = listingsFile as unknown as ListingRow[];

export function profilePath(profile: Pick<CompanyProfile, "slug">) {
  return `/companies/${profile.slug}/`;
}

export function getProfile(slug: string) {
  return companyProfiles.find((profile) => profile.slug === slug);
}

const byListingName = new Map<string, CompanyProfile>();
for (const profile of companyProfiles) {
  for (const name of profile.listing_names) byListingName.set(name, profile);
}

/** Profile for a listing card, matched on the exact listings.json name. */
export function profileForListing(name: string) {
  return byListingName.get(name);
}

export type ProfilePageLink = { city: City; services: Service[] };

/** City/service pages on this site where the company is listed, by city. */
export function listedPages(profile: CompanyProfile): ProfilePageLink[] {
  const names = new Set(profile.listing_names);
  const grouped = new Map<string, Set<string>>();
  for (const row of listingRows) {
    if (!names.has(row.name)) continue;
    const set = grouped.get(row.city_slug) ?? new Set<string>();
    set.add(row.service_slug);
    grouped.set(row.city_slug, set);
  }
  const order = cities.map((city) => city.slug);
  return [...grouped.entries()]
    .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
    .flatMap(([citySlug, serviceSlugs]) => {
      const city = getCity(citySlug);
      if (!city) return [];
      const list = [...serviceSlugs]
        .map((slug) => getService(slug))
        .filter((service): service is Service => Boolean(service));
      return [{ city, services: list }];
    });
}

export function listedPageCount(profile: CompanyProfile) {
  return listedPages(profile).reduce((n, item) => n + item.services.length, 0);
}

export function listedServicePaths(profile: CompanyProfile) {
  return listedPages(profile).flatMap(({ city, services }) =>
    services.map((service) => servicePath(city, service))
  );
}

function origin() {
  return site.url.replace(/\/$/, "");
}

/** Business schema for the profiled company. No ratings, no invented fields. */
export function profileBusinessSchema(profile: CompanyProfile) {
  const url = `${origin()}${profilePath(profile)}`;
  return {
    "@context": "https://schema.org",
    "@type": profile.schema_type,
    "@id": `${url}#business`,
    name: profile.name,
    ...(profile.legal_name ? { legalName: profile.legal_name } : {}),
    ...(profile.also_known_as?.length
      ? { alternateName: profile.also_known_as }
      : {}),
    description: profile.summary[0],
    url,
    mainEntityOfPage: url,
    ...(profile.website ? { sameAs: [profile.website] } : {}),
    ...(profile.phone ? { telephone: profile.phone.number } : {}),
    ...(profile.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: profile.address.street,
            addressLocality: profile.address.locality,
            addressRegion: profile.address.region,
            postalCode: profile.address.postal_code,
            addressCountry: "US",
          },
        }
      : {}),
    ...(profile.areas_served.length
      ? {
          areaServed: profile.areas_served.map((name) => ({
            "@type": "Place",
            name,
          })),
        }
      : {}),
    ...(profile.licenses.length
      ? {
          hasCredential: profile.licenses.map((license) => ({
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: `${license.authority} ${license.credential} ${license.number}`,
            recognizedBy: { "@type": "Organization", name: license.authority },
            ...(license.expires ? { validUntil: license.expires } : {}),
          })),
        }
      : {}),
    ...(profile.services.length
      ? { knowsAbout: profile.services }
      : {}),
  };
}

/** WebPage wrapper that names the directory as publisher, not the company. */
export function profileWebPageSchema(profile: CompanyProfile) {
  const url = `${origin()}${profilePath(profile)}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name: profile.title,
    description: profile.meta_description,
    dateModified: profile.checked,
    about: { "@id": `${url}#business` },
    publisher: { "@id": `${origin()}/#organization` },
  };
}

export function formatChecked(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
