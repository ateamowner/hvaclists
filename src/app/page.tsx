import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure } from "@/components/disclosure";
import { ForProsBand } from "@/components/for-pros-band";
import { HeroSplit } from "@/components/hero-split";
import { QuoteFormLoader } from "@/components/quote-form-loader";
import { TrustStrip } from "@/components/trust-strip";
import {
  cities,
  liveCitySlugs,
  servicePath,
  services,
  site,
  type City,
} from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — HVAC directory`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const live = cities.filter((city) => liveCitySlugs.includes(city.slug));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <HeroSplit form={<QuoteFormLoader />}>
        <p className="text-sm font-medium text-primary">{site.tagline}</p>
        <h1 className="mt-2 font-heading tracking-tight text-balance">
          Find HVAC by city. Request a quote. Skip the fake shop page.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {site.name} is a lead-generation directory for HVAC companies. We
          are not a contractor. We do not send a truck, and we do not invent
          company names, star ratings, or city-specific prices. Each city has
          its own URL. Featured spots are paid and labeled.
        </p>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Homeowners use the form. Companies buy a Featured — paid placement
          listing on the{" "}
          <Link href="/for-pros/" className="underline underline-offset-2">
            For pros
          </Link>{" "}
          page. Until a listing goes live on a URL, we still take the request
          and hold it.
        </p>
        <Disclosure className="mt-3 max-w-2xl" />
      </HeroSplit>

      <TrustStrip className="mt-10" />

      <div id="cities">
        <section className="mt-14">
          <h2 className="font-heading text-2xl font-semibold">
            Dayton / Miami Valley cities
          </h2>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            Live markets. Nearby-city pages exist so internal links do not 404.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {live
              .filter((city) => city.stateAbbr === "OH")
              .map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-heading text-2xl font-semibold">
            Tennessee cities
          </h2>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            Live markets. Nearby links only point at cities that already exist on
            this site — Knoxville has no in-repo neighbor yet.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {live
              .filter((city) => city.stateAbbr === "TN")
              .map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
          </ul>
        </section>
      </div>

      <ForProsBand />

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
              className="rounded-[16px] border border-border bg-card px-4 py-3 text-sm leading-6"
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

function CityCard({ city }: { city: City }) {
  return (
    <li className="flex flex-col rounded-[16px] border border-border bg-card p-5">
      <h3 className="font-heading text-xl font-semibold">
        {city.name}, {city.stateAbbr}
      </h3>
      <p className="mt-2 line-clamp-1 text-muted-foreground">{city.setting}</p>
      <p className="mt-4">
        <Link
          href={servicePath(city, "ac-repair")}
          className="font-medium underline underline-offset-2"
        >
          Best AC Repair in {city.name} — {site.year}
        </Link>
      </p>
    </li>
  );
}
