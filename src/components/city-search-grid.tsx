"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";

export type CityCardItem = {
  slug: string;
  name: string;
  stateAbbr: string;
  href: string;
};

/** Homepage-only live city cards with client search by city name. */
export function CitySearchGrid({ cities }: { cities: CityCardItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return cities;
    return cities.filter((city) => city.name.toLowerCase().includes(needle));
  }, [cities, query]);

  return (
    <div>
      <label htmlFor="city-search" className="sr-only">
        Search cities
      </label>
      <input
        id="city-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by city name"
        autoComplete="off"
        className="h-11 w-full max-w-md rounded-[14px] border border-input bg-card px-3 text-[16px] leading-[26px] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />

      {filtered.length === 0 ? (
        <p className="mt-6 text-muted-foreground">
          No cities match that name. Use the form — we still hold your request.
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((city) => (
            <li key={city.slug}>
              <Link
                href={city.href}
                className="flex h-full flex-col rounded-[14px] border border-border bg-card p-5 shadow-[0_12px_32px_rgba(19,32,43,.10)] transition-transform hover:-translate-y-[2px]"
              >
                <h3 className="font-heading text-xl font-semibold">
                  {city.name}, {city.stateAbbr}
                </h3>
                <p className="mt-2 text-sm font-medium text-primary">HVAC / AC</p>
                <p className="mt-4 text-sm font-medium underline underline-offset-2">
                  Best AC Repair in {city.name} — {site.year}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
