import {
  costGuide,
  getNearbyCities,
  lockedH1,
  site,
  type City,
  type Service,
} from "@/config/site";
import { uniqueLocalCopy } from "@/lib/local-copy";

export type Faq = { question: string; answer: string };

export function introParagraphs(city: City, service: Service): string[] {
  const directory = `${site.disclosure} Featured — paid placement spots on this page are labeled as such. If the listings block is empty, use the form anyway. We route the request — or hold it until a company that covers your ZIP is available.`;

  return [
    `This page is ${site.name}'s ${city.name}, ${city.stateAbbr} listing for ${service.name.toLowerCase()}. ${directory}`,
    uniqueLocalCopy(city, service),
    serviceIntro(city, service),
    `${city.setting} ${city.winter} ${city.summer}`,
  ];
}

/** Regional phrase so Ohio pages still say Miami Valley; other live cities use their own region. */
export function regionLabel(city: City): string {
  if (city.stateAbbr === "OH") return "Miami Valley";
  if (city.stateAbbr === "TN") return "East Tennessee";
  return city.state;
}

function serviceIntro(city: City, service: Service): string {
  switch (service.slug) {
    case "ac-repair":
      return `${city.name} homeowners use this URL to request a callback when cooling is short-cycling, icing, or not keeping up with ${regionLabel(city)} summer AC load. ${site.name} does not send a tech of its own.`;
    case "furnace":
      return `Use this ${city.name} page when heat will not start, you smell something off, or an older furnace needs a honest repair-versus-replace talk after ${city.stateAbbr === "OH" ? "ice season" : "a freeze night"}. Ask for a written scope that names the heat exchanger.`;
    case "hvac-installation":
      return `This ${city.name} page is for a full system or matched furnace-and-AC changeout. A written scope should cover load, duct, pad, and flue — not a same-day upsell.`;
    case "emergency-hvac":
      return `Use this ${city.name} page for no heat in a freeze, no cooling in a heat wave, or a leak or smell that cannot wait. Say so on the form. Emergency work is priced and scheduled differently than a planned visit.`;
    default:
      return service.blurb;
  }
}

/** Hub service-card blurb. Ohio cities keep the shared Miami Valley service.blurb. */
export function serviceCardBlurb(city: City, service: Service): string {
  if (city.stateAbbr === "OH") return service.blurb;
  switch (service.slug) {
    case "ac-repair":
      return `A cooling system that is not keeping up, short-cycling, or icing in ${city.name} humidity — diagnosis and a written repair scope.`;
    case "furnace":
      return `Heat that will not start after a freeze night, a cracked-heat-exchanger worry, or an older furnace that needs a honest repair-vs-replace talk.`;
    case "hvac-installation":
      return `A full system or matched furnace-and-AC changeout: load, duct, and a written scope — not a same-day upsell.`;
    case "emergency-hvac":
      return `No heat after a freeze night, no cooling in a humid heat wave, or a smell or leak that cannot wait for a weekday slot.`;
    default:
      return service.blurb;
  }
}

export function hubIntro(city: City): string[] {
  return [
    `This is the ${city.name}, ${city.stateAbbr} hub on ${site.name} — a directory, not a contractor homepage. From here you can open AC repair, furnace, HVAC installation, and emergency HVAC pages. Each has its own quote form.`,
    city.setting,
    `${city.housing} ${city.winter} ${city.summer}`,
    city.localNote,
    site.disclosure,
  ];
}

export function howToChoose(
  city: City,
  service: Service
): {
  lead: string;
  items: { title: string; body: string }[];
} {
  return {
    lead: `How to choose a ${service.name.toLowerCase()} company in ${city.name} — the same checks apply whether you found a listing here or a truck on the street.`,
    items: [
      {
        title: "License",
        body: `Ask for the HVAC license or registration the company uses to work in ${city.state}. Write down the number. ${site.name} does not invent license IDs on this page.`,
      },
      {
        title: "Local jobs",
        body: `Ask for recent addresses in ${city.name} or the surrounding ${regionLabel(city)} towns — not a generic photo set. Ice, older furnaces, and summer AC load change the job.`,
      },
      {
        title: "Written scope",
        body: `Get the work in writing: diagnose vs replace, what parts, whether the heat exchanger or coil is included, and how they protect the house. A verbal “we’ll take care of it” is not a scope.`,
      },
      {
        title: "Reviews with addresses",
        body: `Prefer reviews that mention a street or neighborhood in ${city.name}. Star averages with no job location are easy to fake. ${site.name} does not publish star ratings or review counts.`,
      },
      {
        title: "Who shows up",
        body: `Ask who is on site: employees or subcontractors, how many people, and who is the decision-maker if the plan changes mid-job.`,
      },
      {
        title: "Warranty",
        body: `Ask what is warranted (parts, labor, heat exchanger, compressor) and for how long. “We stand behind our work” is not a warranty.`,
      },
      {
        title: "Emergency vs planned",
        body: `${service.slug === "emergency-hvac" ? "If you have no heat in a freeze or no cooling in a heat wave, say that first." : "If this is not an emergency, say so."} Ice-season rescue and a planned ${service.name.toLowerCase()} visit are different queues. Do not let a salesperson treat a filter change like a rescue.`,
      },
    ],
  };
}

export function costGuideCopy(city: City): {
  heading: string;
  paragraphs: string[];
  citation: { label: string; href: string };
  extraCitations: { label: string; href: string; line: string }[];
} {
  return {
    heading: `Cost guide (national ranges, not a ${city.name} survey)`,
    paragraphs: [
      costGuide.line,
      costGuide.disclaimer,
      `${city.utility} bills, ice, older furnaces, and summer AC load change the number. A written scope from a company that will actually stand in your mechanical closet is the only local price that matters.`,
    ],
    citation: { label: costGuide.sourceName, href: costGuide.sourceUrl },
    extraCitations: [
      {
        label: costGuide.repairSourceName,
        href: costGuide.repairSourceUrl,
        line: costGuide.repairLine,
      },
      {
        label: costGuide.furnaceSourceName,
        href: costGuide.furnaceSourceUrl,
        line: costGuide.furnaceLine,
      },
    ],
  };
}

export function faqs(city: City, service: Service): Faq[] {
  const nearby = getNearbyCities(city);
  const nearbyNames = nearby.map((item) => item.name);

  return [
    {
      question: `Is ${site.name} an HVAC contractor in ${city.name}?`,
      answer: `No. ${site.name} is a directory and lead-routing site. We do not repair AC, service furnaces, or install systems. Companies can buy a listing on this URL. Featured — paid placement is labeled. ${site.disclosure}`,
    },
    {
      question: `Why are some listings marked Featured?`,
      answer: `Those are paid placements. A Featured — paid placement is a labeled upgrade so you can tell it is an ad. Standard listings, when we have them, are not marked as paid upgrades. We do not invent companies to fill empty slots.`,
    },
    {
      question: `What does ${service.name.toLowerCase()} cost in ${city.name}?`,
      answer: `${site.name} does not publish a ${city.name}-specific price. National published ranges we cite: HVAC replacement typically $5,000–$22,000, average about $7,500 (${costGuide.sourceName}); HVAC repair averages about $350 (${costGuide.repairSourceName}); furnace repair is published from about $64–$1,475 (${costGuide.furnaceSourceName}). Your job may be outside those ranges. Use the form and ask the company for a written number.`,
    },
    {
      question: `What happens after I submit the form on this ${city.name} page?`,
      answer: `The static form posts to Formsubmit and emails ${site.leadsEmail}. We store the request and route it to a company that covers your ZIP and service type when one is available. Expect a phone call from a local HVAC company — not from a ${site.name} tech. If no company is live on this URL yet, we still take the request and hold it.`,
    },
    {
      question:
        nearbyNames.length > 0
          ? `Do you cover ${nearbyNames[0]} and other towns near ${city.name}?`
          : `Which towns near ${city.name} have their own ${site.name} pages?`,
      answer:
        nearbyNames.length > 0
          ? `Yes — we keep a separate URL for nearby cities so you can open a real page instead of a comma list. From ${city.name} that includes ${joinAnd(nearbyNames)}. Each of those pages has its own quote form.`
          : `We publish one URL per city. If you do not see your town, send the form with your ZIP and we will route it.`,
    },
  ];
}

export function hubFaqs(city: City): Faq[] {
  return [
    {
      question: `What is the ${city.name} ${site.name} hub?`,
      answer: `This is the city index — not a contractor homepage. From here you can open ${city.name} pages for AC repair, furnace, HVAC installation, and emergency HVAC.`,
    },
    {
      question: `Does ${site.name} work on HVAC systems in ${city.name}?`,
      answer: `No. ${site.name} publishes directory pages and routes quote requests. We are not an HVAC contractor. A local company calls you when one is available.`,
    },
    {
      question: `Are featured listings ads?`,
      answer: `Featured — paid placement spots are labeled on the service pages. We do not invent company names to fill a page.`,
    },
    {
      question: `Where is the quote form?`,
      answer: `On this hub and on every ${city.name} service page. Same fields. We need a name, phone, email, ZIP, service type, timing, and your agreement to the privacy policy.`,
    },
    {
      question: `How do contractors get on this ${city.name} page?`,
      answer: `See the For Pros page. Companies can buy a labeled Featured — paid placement. There is no credit-card field on the homeowner form.`,
    },
  ];
}

export function metaDescription(city: City, service: Service): string {
  return `${lockedH1(service, city)}. Compare listed companies, read national cost ranges, and request a callback. ${site.name} is a directory, not an HVAC contractor.`;
}

function joinAnd(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}
