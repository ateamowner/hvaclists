import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CostGuide } from "@/components/cost-guide";
import { Disclosure } from "@/components/disclosure";
import { FaqList } from "@/components/faq-list";
import { HeroSplit } from "@/components/hero-split";
import { HowToChoose } from "@/components/how-to-choose";
import {
  NearbyCityLinks,
  RelatedServiceLinks,
} from "@/components/internal-links";
import { JsonLd } from "@/components/json-ld";
import { ListingsBlock } from "@/components/listings-block";
import { QuoteFormLoader } from "@/components/quote-form-loader";
import { TrustStrip } from "@/components/trust-strip";
import {
  cities,
  cityPath,
  getCity,
  getService,
  lockedH1,
  pageTitle,
  servicePath,
  services,
  site,
} from "@/config/site";
import {
  costGuideCopy,
  faqs,
  howToChoose,
  introParagraphs,
  metaDescription,
} from "@/lib/content";
import { getListings } from "@/lib/listings";
import {
  faqPageSchema,
  publisherLocalBusiness,
  servicePageBreadcrumbs,
} from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.flatMap((city) =>
    services.map((service) => ({
      city: city.slug,
      service: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return {};

  const title = pageTitle(service, city);
  const description = metaDescription(city, service);
  return {
    title,
    description,
    alternates: { canonical: servicePath(city, service) },
    openGraph: {
      title,
      description,
      url: servicePath(city, service),
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  const heading = lockedH1(service, city);
  const intro = introParagraphs(city, service);
  const choose = howToChoose(city, service);
  const cost = costGuideCopy(city);
  const questions = faqs(city, service);
  const listings = getListings(city.slug, service.slug);
  const empty = listings.length === 0;

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={[
          publisherLocalBusiness(city),
          faqPageSchema(questions),
          servicePageBreadcrumbs(city, service),
        ]}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: cityPath(city), label: `${city.name}, ${city.stateAbbr}` },
          { href: servicePath(city, service), label: service.name },
        ]}
      />

      <div className="mt-4">
        <HeroSplit form={<QuoteFormLoader city={city} service={service} />}>
          <p className="text-sm font-medium text-primary">
            {city.name}, {city.stateAbbr}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {heading}
          </h1>
          <p className="mt-3 rounded-md border border-border bg-muted/60 px-3 py-2 text-sm">
            {site.disclosure}
          </p>
          <Disclosure className="mt-3" />
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7">
              {paragraph}
            </p>
          ))}
        </HeroSplit>
      </div>

      <TrustStrip className="mt-10" />

      {empty ? <ListingsBlock listings={listings} /> : null}

      <HowToChoose content={choose} />
      <CostGuide content={cost} />
      <FaqList faqs={questions} />
      {empty ? null : <ListingsBlock listings={listings} />}
      <RelatedServiceLinks city={city} current={service} />
      <NearbyCityLinks city={city} serviceSlug={service.slug} />
    </article>
  );
}
