import type { Metadata } from "next";
import { CitySearchGrid } from "@/components/city-search-grid";
import { Disclosure } from "@/components/disclosure";
import { FaqList } from "@/components/faq-list";
import { ForProsBand } from "@/components/for-pros-band";
import { HeroSplit } from "@/components/hero-split";
import { JsonLd } from "@/components/json-ld";
import { QuoteFormLoader } from "@/components/quote-form-loader";
import { TrustStrip } from "@/components/trust-strip";
import {
  cities,
  liveCitySlugs,
  servicePath,
  services,
  site,
} from "@/config/site";
import { homeFaqs } from "@/lib/content";
import {
  faqPageSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: `${site.name} — HVAC directory`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const live = cities.filter((city) => liveCitySlugs.includes(city.slug));
  const questions = homeFaqs();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          websiteSchema(),
          organizationSchema(),
          faqPageSchema(questions),
        ]}
      />
      <HeroSplit form={<QuoteFormLoader />}>
        <h1 className="font-heading tracking-tight text-balance">
          AC out? Start with a real local request.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {site.name} is a directory, not a contractor. Paid spots are labeled.
        </p>
        <Disclosure className="mt-3 max-w-2xl" />
      </HeroSplit>

      <TrustStrip className="mt-10" />

      <section id="cities" className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">Cities</h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">
          Live markets only. Search by city name — we do not invent listings.
        </p>
        <div className="mt-6">
          <CitySearchGrid
            cities={live.map((city) => ({
              slug: city.slug,
              name: city.name,
              stateAbbr: city.stateAbbr,
              href: servicePath(city, "ac-repair"),
            }))}
          />
        </div>
      </section>

      <ForProsBand />

      <FaqList faqs={questions} />

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">
          What is on a city page
        </h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            "A locked H1: Best {Service} in {City} — 2026",
            "A disclosure that this is a directory and paid spots are labeled",
            "How to choose: license, local jobs, written scope, reviews with addresses, who shows up, warranty, emergency vs planned",
            "National cost ranges cited to Angi — not a local survey",
            "Five FAQs that match the on-page questions in FAQPage JSON-LD",
            "Listings from a data file, or an empty state with the quote form plus a Featured and For Pros path — no invented companies",
          ].map((item) => (
            <li
              key={item}
              className="rounded-[14px] border border-border bg-card px-4 py-3 text-sm leading-6"
            >
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">Services we index</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <span className="font-medium">{service.name}.</span>{" "}
              <span className="text-muted-foreground">{service.blurb}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
