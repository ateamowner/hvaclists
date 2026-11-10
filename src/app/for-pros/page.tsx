import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure } from "@/components/disclosure";
import { liveCitySlugs, servicePath, site } from "@/config/site";
import { shareMeta } from "@/lib/share-meta";

const title = `For HVAC Companies: Featured Listings on ${site.name}`;
const description =
  `How contractors buy ${site.name} Featured (paid placement): $99/month, self-serve on Stripe. Featured puts your business in the top spot on every page you're listed on. No lead guarantee.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/for-pros/" },
  ...shareMeta(title, description, "/for-pros/"),
};

export default function ForProsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading tracking-tight">For HVAC companies</h1>
      <p className="mt-4">
        {site.name} sells labeled listings on city × service URLs. Homeowners
        see a directory, not a fake contractor homepage. You are not buying a
        website. You are buying a labeled place on a page people already use to
        request a callback.
      </p>
      <Disclosure className="mt-4" />

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        What you can buy
      </h2>
      <ul className="mt-4 space-y-4">
        <li className="rounded-lg border border-border bg-card p-4">
          <p className="font-semibold">Standard listing</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Name, areas served, phone, license ID, short blurb, and an optional
            profile URL. No star ratings. We will not invent a license number
            for you.
          </p>
        </li>
        <li className="rounded-lg border border-border bg-card p-4">
          <p className="font-semibold">Featured (paid placement)</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            $99/month Featured puts your business in the top spot on every page
            you&apos;re listed on: each city and service page on {site.name}
            that lists your company. It is labeled “Featured (paid placement)”
            so homeowners can tell it is an ad. If another company on the same
            page is also Featured, Featured listings share the top of that
            page, above every standard listing.
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Featured does not change where any page ranks in Google and does
            not add you to pages you are not listed on. Leads are not
            guaranteed: we do not promise any number of calls, quote requests,
            or jobs.
          </p>
          <p className="mt-3 text-sm leading-6">
            {site.name} Featured (paid placement): $99/month subscription.
            Checkout is handled securely by Stripe; this site never sees or
            stores your card number.
          </p>
          <a
            href={site.featuredCheckoutUrl}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-[15px] leading-5 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Subscribe, $99/month
          </a>
        </li>
      </ul>

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        How leads work
      </h2>
      <p className="mt-3 leading-7">
        The form collects required phone, email, ZIP, service type, timing, and
        privacy consent. SMS consent is on the form. Name, property type, and
        message sit behind More details. Hidden fields carry page URL, city,
        state, and service. The homeowner quote form never asks for a card
        number.
      </p>
      <p className="mt-3 leading-7">
        Every request posts to Formsubmit and emails {site.leadsEmail}. If a
        listing is live for that URL, we route to that company. If the URL is
        empty, we still take the request and follow up, we do not invent a
        contractor to fill the gap.
      </p>

      <h2 className="mt-10 font-heading text-2xl font-semibold">Pricing</h2>
      <p className="mt-3 leading-7">
        Featured (paid placement) is $99/month, self-serve. Use the Subscribe
        button above or{" "}
        <a href={site.featuredCheckoutUrl} className="underline">
          this Stripe checkout
        </a>
        . Checkout is handled securely by Stripe; this site never sees or
        stores your card number. Featured puts your business in the top spot
        on every page you&apos;re listed on. Leads are not guaranteed.
      </p>
      <p className="mt-3 leading-7">
        Standard listing city rates are not published on this page.
      </p>
      <p className="mt-3 leading-7">
        Contact:{" "}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
        .
      </p>

      <h2 className="mt-10 font-heading text-2xl font-semibold">Live URLs</h2>
      <ul className="mt-3 space-y-2">
        {liveCitySlugs.map((slug) => (
          <li key={slug}>
            <Link
              href={servicePath(slug, "ac-repair")}
              className="underline underline-offset-2"
            >
              {servicePath(slug, "ac-repair")}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
