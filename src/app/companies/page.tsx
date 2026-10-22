import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/config/site";
import {
  companyProfiles,
  listedPageCount,
  profilePath,
} from "@/lib/company-profiles";
import { breadcrumbSchema } from "@/lib/schema";
import { shareMeta } from "@/lib/share-meta";

const title = `HVAC company profiles: licenses and service areas | ${site.name}`;
const description = `Independent ${site.name} profiles of Ohio heating and cooling companies: state license status, city registration, services, and service area, each with public sources. Not affiliated with the companies.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/companies/" },
  ...shareMeta(title, description, "/companies/"),
};

export default function CompaniesIndexPage() {
  const sorted = [...companyProfiles].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Company profiles", path: "/companies/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${site.name} company profiles`,
            numberOfItems: sorted.length,
            itemListElement: sorted.map((profile, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${site.url.replace(/\/$/, "")}${profilePath(profile)}`,
              name: profile.name,
            })),
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/companies/", label: "Company profiles" },
        ]}
      />
      <h1 className="mt-4 font-heading tracking-tight">
        HVAC company profiles
      </h1>
      <p className="mt-3">
        Independent profiles of heating and air conditioning companies people search for by name.
        Each one shows the company&apos;s Ohio license status, any city
        registration, the services and areas it lists, and links to
        every public source. {site.name} is not affiliated with these companies
        and they did not pay for these pages.
      </p>
      <ul className="mt-6 space-y-3">
        {sorted.map((profile) => {
          const count = listedPageCount(profile);
          return (
            <li
              key={profile.slug}
              className="rounded-[14px] border border-border bg-card p-4 shadow-[0_12px_32px_rgba(19,32,43,.10)]"
            >
              <h2 className="font-heading text-lg font-semibold">
                <Link href={profilePath(profile)} className="hover:underline">
                  {profile.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.base_location}
                {count ? ` · listed on ${count} ${site.name} pages` : ""}
              </p>
              <p className="mt-2 text-sm">{profile.meta_description}</p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
