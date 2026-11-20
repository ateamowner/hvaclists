import type { City } from "@/config/site";
import type { Faq } from "@/lib/content";
import { costGuideCopy } from "@/lib/content";
import type { CostGuideContent } from "./index";

/**
 * No-heat emergency + Ohio Winter Crisis Program block, drafted 2026-11-15
 * by SEO & AEO Desk (seo-tracking/refresh/2026-11-15/01-hvaclists-no-heat-winter-crisis.md).
 * National figures only. The Winter Crisis paragraph and FAQ show on Ohio
 * pages only. Every line keeps the source link from the draft.
 */

const src = {
  angi: {
    label: "Angi, 2026 HVAC Repairs Cost",
    href: "https://www.angi.com/articles/how-much-hvac-repair-cost.htm",
  },
  cpsc: {
    label: "CPSC, Carbon Monoxide Information Center",
    href: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center",
  },
  odjfs: {
    label: "ODJFS, Winter Crisis Program Opens Nov. 1 (Oct 23, 2026)",
    href: "https://content.govdelivery.com/accounts/OHDJFS/bulletins/4304419",
  },
} as const;

export function costGuide(city: City): CostGuideContent {
  const base = costGuideCopy(city);
  return {
    ...base,
    extraCitations: [
      ...base.extraCitations,
      {
        ...src.angi,
        line: "Furnace repair (by unit type): $130–$1,200; heat pump repair $200–$2,000 (Angi 2026 table).",
      },
      {
        ...src.angi,
        line: "After-hours premium: emergency HVAC repairs outside normal business hours often add $40–$80 per hour on top of standard rates.",
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
  const ohio = city.stateAbbr === "OH";
  return (
    <section id="no-heat-freeze" className="mt-10">
      <h2 className="font-heading text-xl font-semibold sm:text-2xl">
        No heat in a freeze: what to do first
      </h2>
      <p className="mt-3 text-base leading-7">
        <strong>Short answer:</strong> If a CO alarm is sounding or anyone
        feels sick, get everyone outside and call 911 before you call any HVAC
        company. If it is only &quot;no heat,&quot; check the thermostat and
        breaker, then call a listed company and say &quot;no heat&quot; on the
        form.
      </p>

      <h3 className="mt-6 font-heading text-lg font-semibold">
        Carbon monoxide comes first
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7">
        <li>
          CO is colorless and odorless. Symptoms include headache, dizziness,
          weakness, nausea, vomiting, sleepiness and confusion. If you suspect
          CO poisoning, get outside to fresh air immediately, then call 911.
        </li>
        <li>
          CPSC recommends CO alarms (battery-operated or with battery backup)
          on every level of the home and outside sleeping areas.
        </li>
        <li>
          Never run a portable generator indoors or in a garage; CPSC says to
          use generators outside only, at least 20 feet from the home with
          exhaust facing away.
        </li>
      </ul>
      <p className="mt-3 text-base leading-7">
        <Cite {...src.cpsc} />
      </p>

      <h3 className="mt-6 font-heading text-lg font-semibold">
        Before you call (two minutes)
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7">
        <li>
          Thermostat set to Heat and above room temperature, with fresh
          batteries if it uses them.
        </li>
        <li>
          Furnace switch (it looks like a light switch near the unit) on, and
          the breaker not tripped.
        </li>
      </ul>

      <h3 className="mt-6 font-heading text-lg font-semibold">
        When to pay the emergency rate vs. wait for morning
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7">
        <li>
          Pay for emergency service: no heat with outdoor temps near or below
          freezing, a gas smell (leave the house and call the gas utility&apos;s
          emergency line from outside), or a CO alarm after 911 has cleared the
          house.
        </li>
        <li>
          Can usually wait for a weekday visit: the furnace still runs but
          short-cycles, one room is cold, or the house holds temperature with
          space heaters used safely. The after-hours premium (above) is the
          reason to ask.
        </li>
      </ul>

      {ohio ? (
        <>
          <h3 className="mt-6 font-heading text-lg font-semibold">
            Help paying for heat in Ohio (Winter Crisis Program)
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-7">
            <li>
              The Home Energy Assistance Winter Crisis Program runs{" "}
              <strong>Nov. 1, 2026 through March 31, 2027</strong>. It offers
              one-time help to income-eligible households facing disconnection,
              already disconnected, needing to set up or transfer service, or
              with 25% or less of bulk fuel in their tank.
            </li>
            <li>
              Eligibility: gross annual household income at or below 175% of
              the federal poverty level ($57,750 for a family of four, per
              ODJFS).
            </li>
            <li>
              Apply: start online at energyhelp.ohio.gov, then schedule an
              appointment with your local energy assistance provider. Bring
              recent energy bills, a list of household members with proof of
              income for the last 30 days, proof of U.S. citizenship or legal
              residency, and proof of disability if it applies.
            </li>
          </ul>
          <p className="mt-3 text-base leading-7">
            <Cite {...src.odjfs} />
          </p>
          <p className="mt-3 text-base leading-7">
            HVACLists is not an energy assistance agency. The program helps
            with heating bills and fuel, not repair invoices; ask the local
            provider what it covers.
          </p>
        </>
      ) : null}
    </section>
  );
}

function isCostQuestion(faq: Faq): boolean {
  return faq.question.startsWith("What does ") && faq.question.includes(" cost in ");
}

export function faqs(city: City, base: Faq[]): Faq[] {
  if (city.stateAbbr !== "OH") return base;
  const added: Faq = {
    question: `Is there help paying for heat in ${city.name} this winter?`,
    answer:
      "Ohio's HEAP Winter Crisis Program runs Nov. 1, 2026 through March 31, 2027 for households at or below 175% of the federal poverty level ($57,750 for a family of four) that face a shut-off, are disconnected, need new or transferred service, or have 25% or less bulk fuel left. Start at energyhelp.ohio.gov and book an appointment with your local provider (ODJFS, Oct 23, 2026).",
  };
  const i = base.findIndex(isCostQuestion);
  if (i < 0) return [...base, added];
  return [...base.slice(0, i + 1), added, ...base.slice(i + 1)];
}
