import {
  absoluteUrl,
  cityPath,
  lockedH1,
  servicePath,
  site,
  type City,
  type Service,
} from "@/config/site";
import type { Faq } from "@/lib/content";
import type { Listing } from "@/types/listing";

export function organizationId() {
  return `${absoluteUrl("/")}#organization`;
}

/** City/hub publisher. Organization, not LocalBusiness, this directory is not a contractor. */
export function publisherLocalBusiness(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(),
    name: site.legalName,
    alternateName: site.name,
    description: `${site.name} is a directory that publishes city pages for HVAC and routes quote requests to listed companies. ${site.disclosure}`,
    url: absoluteUrl("/"),
    email: site.email,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: city.state,
      },
    },
    knowsAbout: "HVAC directory",
  };
}

/** Homepage only. Directory publisher, no phone, address, reviews, or AggregateRating. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hvaclists.com/#organization",
    name: "HVACLists",
    url: "https://hvaclists.com/",
    email: "owner@ateamcontractings.com",
    description:
      "Lead-generation directory for HVAC companies. Paid placements are labeled. Not an HVAC contractor.",
  };
}

/** Homepage only. No SearchAction, this site has no site search. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    publisher: {
      "@id": organizationId(),
    },
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function servicePageBreadcrumbs(city: City, service: Service) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `${city.name}, ${city.stateAbbr}`, path: cityPath(city) },
    { name: service.name, path: servicePath(city, service) },
  ]);
}

export function hubBreadcrumbs(city: City) {
  return breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: `${city.name}, ${city.stateAbbr}`, path: cityPath(city) },
  ]);
}

export function servicePageHeadline(city: City, service: Service) {
  return lockedH1(service, city);
}

/** ItemList of real listed HVAC companies, never AggregateRating. Empty → omit. */
export function listingsItemListSchema(
  city: City,
  service: Service,
  listings: Listing[]
) {
  if (!listings.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${service.name} companies in ${city.name}, ${city.stateAbbr}`,
    numberOfItems: listings.length,
    itemListElement: listings.map((listing, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "HVACBusiness",
        name: listing.name,
        telephone: listing.phone,
        description: listing.blurb,
        ...(listing.profile_url ? { url: listing.profile_url } : {}),
        ...(listing.license_id
          ? { identifier: listing.license_id }
          : {}),
        ...(listing.address
          ? {
              address: {
                "@type": "PostalAddress",
                streetAddress: listing.address.street,
                addressLocality: listing.address.locality,
                addressRegion: listing.address.region,
                postalCode: listing.address.postal_code,
                addressCountry: "US",
              },
            }
          : {}),
        areaServed: listing.areas_served.map((area) => ({
          "@type": "City",
          name: area,
        })),
      },
    })),
  };
}
