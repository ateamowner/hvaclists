import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Disclosure } from "@/components/disclosure";
import { JsonLd } from "@/components/json-ld";
import { getCity, servicePath, services, site } from "@/config/site";
import { getListings } from "@/lib/listings";
import { shareMeta } from "@/lib/share-meta";
import type { Listing } from "@/types/listing";

/**
 * "Best HVAC companies in Dayton, OH 2027" guide.
 * Built only from the verified rows in data/listings.json for dayton-oh.
 * No rankings, ratings, prices, or review counts are invented here.
 * Companies are listed A to Z. Paid tiers (if any) are labeled.
 */

const PATH = "/best-hvac-companies-dayton-oh-2027/";
const CITY_SLUG = "dayton-oh";

type Company = {
  name: string;
  phone: string;
  license: string;
  url: string;
  areas: string[];
  tiers: Listing["tier"][];
  services: { slug: string; name: string }[];
  sources: string[];
};

function sourcesFrom(blurb: string): string[] {
  const found = blurb.match(/https?:\/\/[^\s)]+/g) ?? [];
  return Array.from(new Set(found.map((u) => u.replace(/[.,;]+$/, ""))));
}

function daytonCompanies(): Company[] {
  const byName = new Map<string, Company>();
  for (const service of services) {
    for (const listing of getListings(CITY_SLUG, service.slug)) {
      const existing = byName.get(listing.name);
      const company: Company = existing ?? {
        name: listing.name,
        phone: listing.phone,
        license: listing.license_id,
        url: listing.profile_url,
        areas: listing.areas_served,
        tiers: [],
        services: [],
        sources: [],
      };
      company.tiers.push(listing.tier);
      if (!company.services.some((s) => s.slug === service.slug)) {
        company.services.push({ slug: service.slug, name: service.name });
      }
      for (const src of sourcesFrom(listing.blurb)) {
        if (!company.sources.includes(src)) company.sources.push(src);
      }
      byName.set(listing.name, company);
    }
  }
  return Array.from(byName.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

const companies = daytonCompanies();
const paidCount = companies.filter((c) =>
  c.tiers.some((t) => t !== "standard")
).length;

const title = `Best HVAC Companies in Dayton, OH (2027): ${companies.length} Registered Contractors`;
const description = `${companies.length} Dayton heating and cooling companies we checked against the City of Dayton heating contractor registry. Listed A to Z, not ranked, paid spots labeled.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  ...shareMeta(title, description, PATH),
};

const faqs = [
  {
    question: "How did you pick these Dayton HVAC companies?",
    answer:
      "Every company here is on the City of Dayton Registered Heating Contractors list and has a public website and phone number we checked. We list them A to Z. We do not rank them by quality, reviews, or price.",
  },
  {
    question: "Did any company pay to be on this page?",
    answer:
      paidCount === 0
        ? `No. As of this update, none of the ${companies.length} companies paid for a spot. If a company buys a Featured spot later, it will be labeled Featured (paid placement).`
        : `${paidCount} of the companies below have a paid Featured or Exclusive spot, and each one is labeled. Paying does not change whether a company is verified.`,
  },
  {
    question: "How do I check an HVAC company's registration in Dayton?",
    answer:
      "The City of Dayton publishes its Registered Heating Contractors list as a PDF on daytonohio.gov. Ask the company for its registration or Ohio HVAC license number and match it to that list before work starts.",
  },
  {
    question: "Is HVACLists an HVAC contractor?",
    answer:
      "No. HVACLists is a directory. We do not do heating or cooling work, and we do not set prices for the companies listed here.",
  },
];

export default function BestHvacDayton2027() {
  const city = getCity(CITY_SLUG);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Registered HVAC companies serving Dayton, OH (2027)",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: companies.length,
    itemListElement: companies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: c.url,
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd data={[itemList, faqSchema]} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/dayton-oh/", label: "Dayton, OH" },
          { href: PATH, label: "Best HVAC companies 2027" },
        ]}
      />
      <h1 className="mt-4 font-heading tracking-tight">
        Best HVAC companies in Dayton, OH for 2027
      </h1>
      <p className="mt-4 text-base leading-7">
        Here are {companies.length} heating and cooling companies that serve Dayton and
        are on the City of Dayton Registered Heating Contractors list. We
        checked each one by hand, and they are listed A to Z, not ranked.
      </p>
      <p className="mt-3 rounded-md border border-border bg-muted/60 px-3 py-2 text-sm">
        {paidCount === 0
          ? "No company paid to be on this page. Paid spots, if any are added later, are labeled Featured (paid placement)."
          : `${paidCount} paid spot(s) on this page are labeled Featured (paid placement). Paying does not skip verification.`}
      </p>

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        What &quot;best&quot; means on this page
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>
          On the City of Dayton Registered Heating Contractors list (checked
          against the copy dated 6/4/2026).
        </li>
        <li>A working public phone number and website.</li>
        <li>Says it serves Dayton on its own site or is based here.</li>
        <li>
          We do not use star ratings, review counts, or prices, because we
          cannot verify them for every company the same way.
        </li>
      </ul>

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        The {companies.length} companies (A to Z)
      </h2>
      <ol className="mt-4 space-y-4">
        {companies.map((c) => (
          <li
            key={c.name}
            className="rounded-[14px] border border-border bg-card p-4 shadow-[0_12px_32px_rgba(19,32,43,.10)]"
          >
            {c.tiers.some((t) => t !== "standard") ? (
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                Featured (paid placement)
              </span>
            ) : null}
            <h3 className="mt-1 font-heading text-lg font-semibold">
              <a href={c.url} className="hover:underline" rel="nofollow">
                {c.name}
              </a>
            </h3>
            <dl className="mt-2 grid gap-1 text-sm">
              <div>
                <dt className="inline font-medium">Listed for: </dt>
                <dd className="inline">
                  {c.services.map((s, i) => (
                    <span key={s.slug}>
                      {i > 0 ? ", " : ""}
                      <Link
                        href={servicePath(CITY_SLUG, s.slug)}
                        className="underline"
                      >
                        {s.name} in Dayton
                      </Link>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="inline font-medium">Phone: </dt>
                <dd className="inline">
                  <a
                    href={`tel:${c.phone.replace(/\D/g, "")}`}
                    className="underline"
                  >
                    {c.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="inline font-medium">Registration: </dt>
                <dd className="inline">{c.license}</dd>
              </div>
              {c.areas.length > 0 ? (
                <div>
                  <dt className="inline font-medium">Areas served: </dt>
                  <dd className="inline">{c.areas.join(", ")}</dd>
                </div>
              ) : null}
            </dl>
          </li>
        ))}
      </ol>

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        How to pick one
      </h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
        <li>Match the job to the company. A new system install is different work than a same-day repair.</li>
        <li>Ask for the registration number and check it on the city list.</li>
        <li>Get the price in writing before work starts, and ask what a diagnostic fee covers.</li>
        <li>For a new system, ask for a written load calculation and duct check, not just a unit size.</li>
      </ol>

      <h2 className="mt-10 font-heading text-2xl font-semibold">Questions</h2>
      <dl className="mt-3 space-y-4">
        {faqs.map((f) => (
          <div key={f.question}>
            <dt className="font-semibold">{f.question}</dt>
            <dd className="mt-1 leading-7">{f.answer}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-sm text-muted-foreground">
        Source:{" "}
        <a
          href="https://www.daytonohio.gov/DocumentCenter/View/254/Registered-Heating-Contractors-PDF"
          className="underline"
        >
          City of Dayton Registered Heating Contractors (PDF)
        </a>
        . Company details come from each company&apos;s own website. Need help
        now? <Link href="/dayton-oh/ac-repair/" className="underline">Request an HVAC company in {city?.name ?? "Dayton"}</Link>.
      </p>
      <Disclosure className="mt-4" />
      <p className="mt-2 text-xs text-muted-foreground">Updated for 2027. {site.name} is not an HVAC contractor.</p>
    </article>
  );
}
