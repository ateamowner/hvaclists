import type { ReactNode } from "react";
import type { City, Service } from "@/config/site";
import type { costGuideCopy, Faq } from "@/lib/content";
import * as furnace202611 from "./furnace-2026-11";
import { seasonalRegistry } from "./registry";

export type CostGuideContent = ReturnType<typeof costGuideCopy>;

/** A seasonal block: optional cost-guide replacement, section, and FAQ edits. */
export type SeasonalBlock = {
  costGuide?: (city: City) => CostGuideContent;
  Section?: (props: { city: City }) => ReactNode;
  faqs?: (city: City, base: Faq[]) => Faq[];
};

const blocks: Record<string, SeasonalBlock> = {
  "furnace-2026-11": furnace202611,
};

function blockFor(city: City, service: Service): SeasonalBlock | undefined {
  const id = seasonalRegistry[`${city.slug}:${service.slug}`];
  return id ? blocks[id] : undefined;
}

/** Replacement cost guide for a listed page, or undefined to keep the default. */
export function seasonalCostGuide(
  city: City,
  service: Service
): CostGuideContent | undefined {
  return blockFor(city, service)?.costGuide?.(city);
}

/** FAQ list for the page (visible list and FAQPage JSON-LD use the same array). */
export function seasonalFaqs(city: City, service: Service, base: Faq[]): Faq[] {
  const block = blockFor(city, service);
  return block?.faqs ? block.faqs(city, base) : base;
}

export function SeasonalSection({ city, service }: { city: City; service: Service }) {
  const Section = blockFor(city, service)?.Section;
  return Section ? <Section city={city} /> : null;
}
