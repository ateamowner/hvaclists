import type { Metadata } from "next";
import Link from "next/link";
import { Disclosure } from "@/components/disclosure";
import { liveCitySlugs, servicePath, site } from "@/config/site";

export const metadata: Metadata = {
  title: `For HVAC companies — ${site.name}`,
  description: `How contractors buy ${site.name} Featured — paid placement. $99/month self-serve on Stripe. Not exclusive. No lead-count SLA. The homeowner form has no credit-card field.`,
  alternates: { canonical: "/for-pros/" },
};

export default function ForProsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        For HVAC companies
      </h1>
      <p className="mt-4 text-lg leading-8">
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
          <p className="font-semibold">Featured — paid placement</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            A paid upgrade. It is visually labeled “Featured — paid placement”
            so homeowners can tell it is an ad. Featured sits above standard.
            This is not exclusive. There is no lead-count SLA.
          </p>
          <p className="mt-3 text-sm leading-6">
            HVACLists Featured — paid placement. $99/month subscription.
            Checkout is on Stripe, not on the homeowner quote form.
          </p>
          <a
            href={site.featuredCheckoutUrl}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground hover:bg-primary/90"
          >
            Subscribe — $99/month
          </a>
        </li>
      </ul>

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        How leads work
      </h2>
      <p className="mt-3 leading-7">
        The form collects name, phone, email, ZIP, service type, timing,
        optional property type and message, SMS consent, and required privacy
        consent. Hidden fields carry page URL, city, state, and service. There
        is no credit-card field on the homeowner quote form.
      </p>
      <p className="mt-3 leading-7">
        Every request posts to Formsubmit and emails {site.leadsEmail}. If a
        listing is live for that URL, we route to that company. If the URL is
        empty, we still take the request and hold it — we do not invent a
        contractor to fill the gap.
      </p>

      <h2 className="mt-10 font-heading text-2xl font-semibold">Pricing</h2>
      <p className="mt-3 leading-7">
        Featured — paid placement is $99/month, self-serve. Use the Subscribe
        button above or{" "}
        <a href={site.featuredCheckoutUrl} className="underline">
          this Stripe checkout
        </a>
        . Featured is not exclusive. There is no lead-count SLA.
      </p>
      <p className="mt-3 leading-7">
        Standard listing city rates are not published on this page. Do not send
        card numbers to the homeowner form.
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
