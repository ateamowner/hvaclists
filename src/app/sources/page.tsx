import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/config/site";
import { shareMeta } from "@/lib/share-meta";

const PATH = "/sources/";
const title = `Sources, ${site.name}`;
const description =
  "Named sources HVACLists cites for national cost ranges, safety guidance, and energy-assistance facts. We do not invent city-specific prices.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  ...shareMeta(title, description, PATH),
};

const sources = [
  {
    name: "Angi, 2026 HVAC Repairs Cost",
    href: "https://www.angi.com/articles/how-much-hvac-repair-cost.htm",
    usedFor:
      "National HVAC repair ranges, furnace and heat-pump repair-by-type figures, and the after-hours premium on emergency HVAC pages.",
  },
  {
    name: "CPSC, Carbon Monoxide Information Center",
    href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center",
    usedFor:
      "Carbon monoxide symptoms, CO alarm placement, and portable generator placement guidance on emergency HVAC pages.",
  },
  {
    name: "ODJFS, Winter Crisis Program Opens Nov. 1 (Oct 23, 2026)",
    href: "https://content.govdelivery.com/accounts/OHDJFS/bulletins/4304419",
    usedFor:
      "Ohio Home Energy Assistance Winter Crisis Program dates (Nov. 1, 2026 through March 31, 2027), 175% FPL eligibility including $57,750 for a family of four, and how to apply.",
  },
  {
    name: "Angi 2026 HVAC replacement guide",
    href: "https://www.angi.com/articles/insider-s-price-guide-new-heating-and-cooling-system.htm",
    usedFor: "National HVAC replacement range already cited in the cost guide.",
  },
  {
    name: "Angi 2026 furnace repair guide",
    href: "https://www.angi.com/articles/how-much-does-common-furnace-repair-cost.htm",
    usedFor: "National furnace repair range already cited in the cost guide.",
  },
];

export default function SourcesPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: PATH, label: "Sources" },
        ]}
      />
      <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight">
        Sources
      </h1>
      <p className="mt-4 text-base leading-7">
        {site.name} cites national published ranges and official guidance. We
        do not invent city-specific prices, star ratings, or license numbers.
        If a page is wrong, use the quote form on this site with the page
        link.
      </p>
      <ul className="mt-8 space-y-4">
        {sources.map((source) => (
          <li
            key={source.href + source.name}
            className="rounded-md border border-border bg-card p-5"
          >
            <a
              href={source.href}
              className="font-medium underline underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              {source.name}
            </a>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {source.usedFor}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm leading-6">
        <Link href="/how-we-list/" className="underline underline-offset-2">
          How we list companies
        </Link>
      </p>
    </article>
  );
}
