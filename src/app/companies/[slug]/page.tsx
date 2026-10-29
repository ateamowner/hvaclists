import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { QuoteFormLoader } from "@/components/quote-form-loader";
import { cityPath, servicePath, site } from "@/config/site";
import {
  companyProfiles,
  formatChecked,
  getProfile,
  listedPageCount,
  listedPages,
  profileBusinessSchema,
  profilePath,
  profileWebPageSchema,
} from "@/lib/company-profiles";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { shareMeta } from "@/lib/share-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return companyProfiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfile(slug);
  if (!profile) return {};
  return {
    title: { absolute: profile.title },
    description: profile.meta_description,
    alternates: { canonical: profilePath(profile) },
    ...shareMeta(profile.title, profile.meta_description, profilePath(profile)),
  };
}

function SourceLink({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      rel="nofollow noopener"
      target="_blank"
      className="ml-1 text-xs text-muted-foreground underline underline-offset-2"
    >
      source
    </a>
  );
}

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getProfile(slug);
  if (!profile) notFound();

  const pages = listedPages(profile);
  const pageCount = listedPageCount(profile);
  const checked = formatChecked(profile.checked);
  const others = companyProfiles.filter((item) => item.slug !== profile.slug);
  // "Huber Plumbing Inc." at the end of a sentence must not print "Inc..".
  const endName = profile.name.replace(/\.$/, "");

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          profileWebPageSchema(profile),
          profileBusinessSchema(profile),
          faqPageSchema(profile.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Company profiles", path: "/companies/" },
            { name: profile.name, path: profilePath(profile) },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/companies/", label: "Company profiles" },
          { href: profilePath(profile), label: profile.name },
        ]}
      />

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_1fr]">
        <header id="hero" className="lg:col-start-1">
          <p className="text-sm font-medium text-primary">
            Independent directory profile · {profile.base_location}
          </p>
          <h1 className="mt-2 font-heading tracking-tight text-balance">
            {profile.headline}
          </h1>
          <p className="mt-3 rounded-md border border-border bg-muted/60 px-3 py-2 text-sm">
            {site.name} is an independent directory, not an HVAC contractor. This profile
            was compiled by {site.name} from public records. It is not written,
            paid for, or endorsed by {endName}, and {site.name} is not
            affiliated with the company.
          </p>
          {profile.summary.map((paragraph) => (
            <p key={paragraph} className="mt-4">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-sm text-muted-foreground">
            Facts last checked against the sources below on {checked}.
          </p>
        </header>

        <aside className="lg:col-start-2 lg:row-span-2 lg:self-start lg:sticky lg:top-24">
          <p className="mb-3 rounded-md border border-border bg-card px-3 py-2 text-sm">
            {`This form goes to ${site.name}, not to ${endName}.`}
            {profile.phone
              ? ` To reach ${endName} directly, call ${profile.phone.number}.`
              : ""}
          </p>
          <QuoteFormLoader listingId={`profile:${profile.slug}`} />
        </aside>

        <div className="lg:col-start-1">
          <section id="at-a-glance" className="mt-2">
            <h2 className="font-heading text-xl font-semibold sm:text-2xl">
              {profile.name} at a glance
            </h2>
            <dl className="mt-4 divide-y divide-border rounded-[14px] border border-border bg-card text-sm shadow-[0_12px_32px_rgba(19,32,43,.10)]">
              {profile.legal_name ? (
                <div className="grid gap-1 p-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="font-medium">Name on state license</dt>
                  <dd>{profile.legal_name}</dd>
                </div>
              ) : null}
              {profile.also_known_as?.length ? (
                <div className="grid gap-1 p-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="font-medium">Also known as</dt>
                  <dd>{profile.also_known_as.join("; ")}</dd>
                </div>
              ) : null}
              {profile.address ? (
                <div className="grid gap-1 p-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="font-medium">Address</dt>
                  <dd>
                    {profile.address.street}, {profile.address.locality},{" "}
                    {profile.address.region} {profile.address.postal_code}
                    <SourceLink href={profile.address.source} />
                  </dd>
                </div>
              ) : null}
              {profile.phone ? (
                <div className="grid gap-1 p-3 sm:grid-cols-[12rem_1fr]">
                  <dt className="font-medium">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${profile.phone.number.replace(/\D/g, "")}`}
                      className="underline"
                    >
                      {profile.phone.number}
                    </a>
                    <SourceLink href={profile.phone.source} />
                  </dd>
                </div>
              ) : null}
              <div className="grid gap-1 p-3 sm:grid-cols-[12rem_1fr]">
                <dt className="font-medium">Website</dt>
                <dd>
                  {profile.website ? (
                    <a
                      href={profile.website}
                      rel="nofollow noopener"
                      target="_blank"
                      className="underline"
                    >
                      {profile.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  ) : (
                    "None found in public records we checked"
                  )}
                </dd>
              </div>
              {profile.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-1 p-3 sm:grid-cols-[12rem_1fr]"
                >
                  <dt className="font-medium">{fact.label}</dt>
                  <dd>
                    {fact.value}
                    <SourceLink href={fact.source} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="license" className="mt-10">
            <h2 className="font-heading text-xl font-semibold sm:text-2xl">
              License and registration status
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ohio requires a state contractor license from the Ohio
              Construction Industry Licensing Board (OCILB) for commercial HVAC
              and plumbing contractors, and many cities, including Dayton and
              Springfield, keep their own registration lists. Status below is as of{" "}
              {checked}; re-check before you hire.
            </p>
            <ul className="mt-4 space-y-3">
              {profile.licenses.map((license) => (
                <li
                  key={`${license.authority}-${license.number}`}
                  className="rounded-[14px] border border-border bg-card p-4 text-sm shadow-[0_12px_32px_rgba(19,32,43,.10)]"
                >
                  <p className="font-heading text-base font-semibold">
                    {license.authority}: {license.credential}
                  </p>
                  <dl className="mt-2 grid gap-1">
                    <div>
                      <dt className="inline font-medium">Number: </dt>
                      <dd className="inline">{license.number}</dd>
                    </div>
                    {license.holder ? (
                      <div>
                        <dt className="inline font-medium">Holder: </dt>
                        <dd className="inline">{license.holder}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="inline font-medium">Status: </dt>
                      <dd className="inline">{license.status}</dd>
                    </div>
                    {license.expires ? (
                      <div>
                        <dt className="inline font-medium">Expires: </dt>
                        <dd className="inline">{formatChecked(license.expires)}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {license.note ? (
                    <p className="mt-2 text-muted-foreground">{license.note}</p>
                  ) : null}
                  <p className="mt-2">
                    <a
                      href={license.source}
                      rel="nofollow noopener"
                      target="_blank"
                      className="text-xs underline underline-offset-2"
                    >
                      Check this record yourself
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section id="services" className="mt-10">
            <h2 className="font-heading text-xl font-semibold sm:text-2xl">
              Services
            </h2>
            {profile.services.length ? (
              <>
                <ul className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  {profile.services.map((service) => (
                    <li key={service} className="list-inside list-disc">
                      {service}
                    </li>
                  ))}
                </ul>
                {profile.services_source ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    As listed by the company.
                    <SourceLink href={profile.services_source} />
                  </p>
                ) : null}
              </>
            ) : (
              <p className="mt-3 text-sm">
                We could not find a published service list for this company.
                Ask what is included before booking.
              </p>
            )}
          </section>

          <section id="service-area" className="mt-10">
            <h2 className="font-heading text-xl font-semibold sm:text-2xl">
              Service area
            </h2>
            {profile.areas_served.length ? (
              <>
                <p className="mt-3 text-sm">{profile.areas_served.join(", ")}</p>
                {profile.areas_source ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    As listed by the company.
                    <SourceLink href={profile.areas_source} />
                  </p>
                ) : null}
              </>
            ) : (
              <p className="mt-3 text-sm">
                The company does not publish a service-area list that we could
                find. Call to confirm they cover your address.
              </p>
            )}
          </section>

          <section id="on-hvaclists" className="mt-10">
            <h2 className="font-heading text-xl font-semibold sm:text-2xl">
              Where {profile.name} appears on {site.name}
            </h2>
            {pages.length ? (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  Listed on {pageCount} city and service{" "}
                  {pageCount === 1 ? "page" : "pages"}. Each page compares it
                  with other verified local companies.
                </p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {pages.map(({ city, services }) => (
                    <li key={city.slug} className="text-sm">
                      <Link
                        href={cityPath(city)}
                        className="font-medium underline-offset-2 hover:underline"
                      >
                        {city.name}, {city.stateAbbr}
                      </Link>
                      <span className="text-muted-foreground">: </span>
                      {services.map((service, index) => (
                        <span key={service.slug}>
                          {index > 0 ? ", " : ""}
                          <Link
                            href={servicePath(city, service)}
                            className="underline underline-offset-2"
                          >
                            {service.name.toLowerCase()}
                          </Link>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-2 text-sm">
                {`${endName} is not listed on our Dayton-area city pages.`}
              </p>
            )}
            {profile.related_links?.length ? (
              <ul className="mt-4 space-y-2 text-sm">
                {profile.related_links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-medium underline">
                      {link.label}
                    </Link>
                    <span className="text-muted-foreground"> · {link.why}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>

          {profile.notes.length ? (
            <section id="good-to-know" className="mt-10">
              <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                Good to know before you call
              </h2>
              <div className="mt-3 space-y-4">
                {profile.notes.map((note) => (
                  <div key={note.title}>
                    <h3 className="font-heading text-base font-semibold">
                      {note.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6">{note.body}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <FaqList faqs={profile.faqs} />

          <section id="sources" className="mt-10">
            <h2 className="font-heading text-xl font-semibold sm:text-2xl">
              Sources
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Checked {checked}. We do not publish star ratings, review counts,
              or prices for this company. Spot an error?{" "}
              <a href={`mailto:${site.email}`} className="underline">
                Email {site.email}
              </a>
              .
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-1 text-sm">
              {profile.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    rel="nofollow noopener"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          {others.length ? (
            <section className="mt-10">
              <h2 className="font-heading text-xl font-semibold">
                Other company profiles
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={profilePath(item)}
                      className="inline-flex min-h-10 items-center underline-offset-2 hover:underline"
                    >
                      {item.name} ({item.base_location})
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
