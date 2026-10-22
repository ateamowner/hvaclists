import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { MIN_INDEXABLE_LISTINGS, site } from "@/config/site";
import listingsFile from "../../../data/listings.json";
import {
  breadcrumbSchema,
  faqPageSchema,
  organizationId,
} from "@/lib/schema";
import { shareMeta } from "@/lib/share-meta";
import type { Listing } from "@/types/listing";

const PATH = "/how-we-list/";
const title = `How We List HVAC Contractors, ${site.name}`;
const description = `How ${site.name} picks the HVAC contractors on each Dayton-area page: public registration checks, cited sources, labeled paid spots, and no invented ratings.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  ...shareMeta(title, description, PATH),
};

const rows = listingsFile as unknown as Listing[];
const companyCount = new Set(rows.map((row) => row.name)).size;
const pageCount = new Set(
  rows.map((row) => `${row.city_slug}/${row.service_slug}`)
).size;

const faqs = [
  {
    question: `Do companies pay to be listed on ${site.name}?`,
    answer: `No. Standard listings are free and are not for sale. A company can buy a Featured spot, and every Featured spot is labeled "paid placement" on the page so you can tell it is an ad.`,
  },
  {
    question: `Why doesn't ${site.name} show star ratings?`,
    answer: `We only publish facts we can point to: the company name, phone, areas served, and its registration or license number with the source. We do not copy or invent star ratings or review counts.`,
  },
  {
    question: `Why do some pages have no companies listed?`,
    answer: `A page needs at least ${MIN_INDEXABLE_LISTINGS} checked companies before we call it a list. Until then it stays out of search results and you can still send a quote request.`,
  },
  {
    question: `How do I get a listing fixed or removed?`,
    answer: `Email ${site.email} with the page link and what is wrong. We check the public source again and correct or remove the listing.`,
  },
];

export default function HowWeListPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: title,
            description,
            url: `${site.url}${PATH}`,
            publisher: { "@id": organizationId() },
          },
          faqPageSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How we list companies", path: PATH },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: PATH, label: "How we list companies" },
        ]}
      />
      <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight">
        How we list HVAC contractors
      </h1>
      <p className="mt-4 leading-7">
        {site.name} is a directory of HVAC contractors in Dayton and the Miami Valley.
        We are not a HVAC contractor and we do not send a truck. Right now the site
        lists {companyCount} companies across {pageCount} city and service
        pages. This page explains how a company gets on a page, how the list is
        ordered, and what we will not do.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">
        What a company needs to be listed
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>
          It appears on a public registration list, usually the City of
          Dayton&apos;s{" "}
          <a href="https://www.daytonohio.gov/DocumentCenter/View/254/Registered-Heating-Contractors-PDF" className="underline" rel="nofollow">
            Registered Heating Contractors
          </a>{" "}
          list, or it publishes an Ohio HVAC license number (issued through the Ohio Construction Industry Licensing Board, OCILB).
        </li>
        <li>
          It serves the city on the page. We check the areas the company lists
          on its own website.
        </li>
        <li>
          Its phone number and website come from the company itself, and each
          listing names the sources we used.
        </li>
      </ul>

      <h2 className="mt-8 font-heading text-2xl font-semibold">
        How each list is ordered
      </h2>
      <p className="mt-3 leading-7">
        Featured companies (paid placement) appear first and carry a label.
        Standard listings are free. For those we weigh registration or license
        status, public review history, and years in business, and we pick up to
        three per page. We do not sell the order of standard listings.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">
        What we will not do
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        <li>Invent a company, phone number, or license to fill a page.</li>
        <li>Publish star ratings, review counts, or prices we cannot source.</li>
        <li>
          Call a page a &quot;best&quot; list before it has at least{" "}
          {MIN_INDEXABLE_LISTINGS} checked companies.
        </li>
        <li>Hide that a Featured spot is paid.</li>
      </ul>

      <h2 className="mt-8 font-heading text-2xl font-semibold">
        Before you hire anyone
      </h2>
      <p className="mt-3 leading-7">
        A listing is a starting point, not a guarantee. Before work on a furnace, AC unit, or heat pump,
        ask for the license or registration number, proof of insurance, and a
        written quote, and check whether the job needs a permit in your city.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">
        Corrections
      </h2>
      <p className="mt-3 leading-7">
        See something wrong? Email{" "}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>{" "}
        with the page link. Companies that want a labeled Featured spot can
        start on the <Link href="/for-pros/" className="underline">For HVAC companies</Link>{" "}
        page.
      </p>

      <h2 className="mt-8 font-heading text-2xl font-semibold">
        Common questions
      </h2>
      <FaqList faqs={faqs} />
    </article>
  );
}
