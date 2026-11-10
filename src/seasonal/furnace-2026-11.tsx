import type { City } from "@/config/site";
import type { Faq } from "@/lib/content";
import type { CostGuideContent } from "./index";

/**
 * Furnace-season block, drafted 2026-11-01 by SEO & AEO Desk
 * (seo-tracking/refresh/2026-11-01/02-hvaclists-furnace-season.md).
 * National figures only. Every line keeps the source link from the draft.
 */

const src = {
  newFurnace: {
    label: "Angi, How Much Does a New Furnace Cost in 2026?",
    href: "https://www.angi.com/articles/how-much-does-it-cost-install-new-furnace.htm",
  },
  repair: {
    label: "Angi, Furnace repair cost 2026",
    href: "https://www.angi.com/articles/how-much-does-common-furnace-repair-cost.htm",
  },
  inspection: {
    label: "Angi, Furnace inspection cost 2026",
    href: "https://www.angi.com/articles/furnace-inspection-cost.htm",
  },
  irs: {
    label: "IRS, Energy Efficient Home Improvement Credit",
    href: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit",
  },
  tariff: {
    label: "CenterPoint Energy Ohio gas tariff, P.U.C.O. No. 5",
    href: "https://assets.centerpointenergy.com/api/public/content/ohio-gas-tariff-2028-ohio-gas-tariff-2028?v=cfadbee2",
  },
  sale: {
    label: "CenterPoint Energy, Ohio gas business sale",
    href: "https://www.centerpointenergy.com/en-us/about-us/ohio-gas-update",
  },
} as const;

/**
 * Cities on the "Locations served" list (Sheet No. 3) of the CenterPoint Energy
 * Ohio gas tariff, as listed in the draft. The utility paragraph shows only here.
 */
const CENTERPOINT_TARIFF_CITIES = new Set([
  "Dayton",
  "Kettering",
  "Beavercreek",
  "Centerville",
  "Huber Heights",
  "Fairborn",
  "Miamisburg",
  "Xenia",
  "Vandalia",
  "Springfield",
  "Tipp City",
  "Oakwood",
  "West Carrollton",
  "Trotwood",
  "Englewood",
  "Riverside",
  "Moraine",
  "Bellbrook",
  "Springboro",
  "Troy",
  "Clayton",
  "Brookville",
]);

function onCenterPointTariff(city: City): boolean {
  return city.stateAbbr === "OH" && CENTERPOINT_TARIFF_CITIES.has(city.name);
}

export function costGuide(city: City): CostGuideContent {
  return {
    heading: `Cost guide (national ranges, not a ${city.name} survey)`,
    paragraphs: [
      "New furnace installed: national average about $4,814; most homeowners pay $2,823–$6,897. Natural gas furnace installed: $3,800–$10,000 (Angi 2026 by-type table).",
      `These are national published ranges, not a ${city.name}-area survey. HVACLists does not invent city-specific dollar amounts. Permits, old-unit removal and ductwork can add to a replacement; ask for each as its own line on a written quote.`,
    ],
    citation: src.newFurnace,
    extraCitations: [
      {
        ...src.repair,
        line: "Furnace repair: national average about $318; most pay $133–$505, with a published range of $64–$1,475.",
      },
      {
        ...src.inspection,
        line: "Inspection and tune-up: basic inspection about $80–$100; an advanced inspection with cleaning and tune-up about $125–$200.",
      },
    ],
  };
}

function Cite({ label, href }: { label: string; href: string }) {
  return (
    <cite className="not-italic">
      Source:{" "}
      <a
        href={href}
        className="underline underline-offset-2"
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
      </a>
      .
    </cite>
  );
}

export function Section({ city }: { city: City }) {
  return (
    <div id="furnace-credit-rebates" className="mt-6">
      <h3 className="font-heading text-lg font-semibold">
        Federal furnace tax credit: ended after 2025
      </h3>
      <p className="mt-2 text-base leading-7">
        The Energy Efficient Home Improvement Credit (which covered qualifying
        natural gas furnaces up to $600 per item) could be claimed “for
        improvements made through December 31, 2025.” A furnace installed in
        late 2026 does not qualify. If a quote mentions a federal furnace tax
        credit, ask the company to explain it in writing. <Cite {...src.irs} />
      </p>

      {onCenterPointTariff(city) ? (
        <>
          <h3 className="mt-6 font-heading text-lg font-semibold">
            Gas utility rebates: check before you buy
          </h3>
          <p className="mt-2 text-base leading-7">
            {city.name} is on the “Locations served” list in the gas tariff of
            CenterPoint Energy Ohio (Vectren Energy Delivery of Ohio).{" "}
            <Cite {...src.tariff} />
          </p>
          <p className="mt-3 text-base leading-7">
            CenterPoint has agreed to sell its Ohio gas business to National
            Fuel Gas Company; it says accounts transfer automatically and the
            sale was expected to close in the fourth quarter of 2026.{" "}
            <Cite {...src.sale} />
          </p>
          <p className="mt-3 text-base leading-7">
            Because the utility is changing hands, rebate programs and amounts
            may change. Before you buy a high-efficiency furnace, check your gas
            utility’s current Ohio rebate terms and ask the installer whether
            they apply an instant discount. HVACLists does not quote a rebate
            amount here.
          </p>
        </>
      ) : null}

      <h3 className="mt-6 font-heading text-lg font-semibold">
        When to call now vs. book a tune-up
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7">
        <li>
          No heat in freezing weather, a gas smell, or a carbon monoxide alarm:
          treat it as an emergency. For a gas smell, leave the house and call the
          gas utility’s emergency line from outside.
        </li>
        <li>
          Furnace runs but short-cycles, or the house won’t reach the set
          temperature: book a diagnostic this week.
        </li>
        <li>
          No problems, but no service in over a year: book a tune-up before the
          first long cold snap.
        </li>
      </ul>
    </div>
  );
}

function isCostQuestion(faq: Faq): boolean {
  return faq.question.startsWith("What does ") && faq.question.includes(" cost in ");
}

export function faqs(city: City, base: Faq[]): Faq[] {
  const cost: Faq = {
    question: `What does a furnace cost in ${city.name}?`,
    answer: `HVACLists does not publish a ${city.name}-specific price. National published figures from Angi (2026): a new furnace installed averages about $4,814 (most pay $2,823–$6,897), a natural gas furnace installed runs $3,800–$10,000, and furnace repair averages about $318. The federal furnace tax credit ended after December 31, 2025, per the IRS. Get a written quote from a company that has looked at your system.`,
  };
  const credit: Faq = {
    question: `Is there still a tax credit or rebate for a new furnace in ${city.name}?`,
    answer: onCenterPointTariff(city)
      ? "The federal Energy Efficient Home Improvement Credit only covered improvements made through December 31, 2025 (IRS). Gas utility rebates may exist, but CenterPoint Energy Ohio’s gas business is being sold to National Fuel Gas Company, so check the current Ohio rebate terms before you buy."
      : "The federal Energy Efficient Home Improvement Credit only covered improvements made through December 31, 2025 (IRS). Gas utility rebates may exist, so check your gas utility’s current rebate terms before you buy.",
  };
  const out: Faq[] = [];
  let placed = false;
  for (const faq of base) {
    if (!placed && isCostQuestion(faq)) {
      out.push(cost, credit);
      placed = true;
    } else {
      out.push(faq);
    }
  }
  if (!placed) out.push(cost, credit);
  return out;
}
