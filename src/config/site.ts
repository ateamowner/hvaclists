/**
 * HVACLists site config — brand, domain, inbox, cities, and services.
 * Theme tokens live here so a rebrand is one file.
 */

export const site = {
  name: "HVACLists",
  legalName: "HVACLists",
  domain: "hvaclists.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hvaclists.com",
  email: "owner@ateamcontractings.com",
  leadsEmail: "owner@ateamcontractings.com",
  /** Native HTML POST to Formsubmit. No fetch/XHR, no API key. */
  formAction: "https://formsubmit.co/owner@ateamcontractings.com",
  formRedirect: "https://hvaclists.com/request-sent/",
  /** Live Stripe Payment Link for Featured. Do not recreate or change this product. */
  featuredCheckoutUrl: "https://buy.stripe.com/00w4gAfl34z2bSJ97Fdwc0c",
  tagline: "A directory of HVAC companies. Not a contractor.",
  year: 2026,
  description:
    "HVAC company directory with city pages, labeled paid placements, and quote routing. We are not an HVAC contractor.",
  disclosure:
    "HVACLists is a directory of HVAC companies. Paid spots are labeled. We are not an HVAC contractor.",
  /** HVAC niche palette — consumer shell v3. Keep these tokens on a shell copy. */
  theme: {
    background: "#F3F6F8",
    foreground: "#15202b",
    card: "#FBFCFE",
    primary: "#0F4C81",
    primaryForeground: "#f4f8fc",
    muted: "#dce3eb",
    mutedForeground: "#3d4a57",
    accent: "#C4A46A",
    accentForeground: "#15202b",
    border: "#C9D3DC",
    featured: "#b45309",
    ring: "#0F4C81",
  },
} as const;

export type ListingTier = "standard" | "featured" | "exclusive";

export type CityStatus = "live" | "coming_soon";

export type City = {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  status: CityStatus;
  nearbySlugs: string[];
  parentSlug?: string;
  setting: string;
  utility: string;
  housing: string;
  winter: string;
  summer: string;
  localNote: string;
};

export type Service = {
  slug: string;
  name: string;
  formValue: string;
  blurb: string;
};

export const services: Service[] = [
  {
    slug: "ac-repair",
    name: "AC Repair",
    formValue: "ac repair",
    blurb:
      "A cooling system that is not keeping up, short-cycling, or icing in Miami Valley heat — diagnosis and a written repair scope.",
  },
  {
    slug: "furnace",
    name: "Furnace",
    formValue: "furnace",
    blurb:
      "Heat that will not start, a cracked-heat-exchanger worry, or an older furnace that needs a honest repair-vs-replace talk.",
  },
  {
    slug: "hvac-installation",
    name: "HVAC Installation",
    formValue: "hvac installation",
    blurb:
      "A full system or matched furnace-and-AC changeout: load, duct, and a written scope — not a same-day upsell.",
  },
  {
    slug: "emergency-hvac",
    name: "Emergency HVAC",
    formValue: "emergency",
    blurb:
      "No heat in a freeze, no cooling in a heat wave, or a smell or leak that cannot wait for a weekday slot.",
  },
];

export const formServiceTypes = [
  { value: "ac repair", label: "AC repair" },
  { value: "furnace", label: "Furnace" },
  { value: "hvac installation", label: "HVAC installation" },
  { value: "emergency", label: "Emergency HVAC" },
  { value: "other", label: "Other" },
] as const;

export const formTimings = [
  { value: "emergency", label: "Emergency — need someone now" },
  { value: "this_week", label: "This week" },
  { value: "this_month", label: "This month" },
  { value: "planning", label: "Planning — no rush" },
] as const;

export const formPropertyTypes = [
  { value: "", label: "Prefer not to say" },
  { value: "house", label: "House" },
  { value: "duplex", label: "Duplex / townhome" },
  { value: "apartment", label: "Apartment / condo" },
  { value: "commercial", label: "Commercial" },
  { value: "hoa", label: "HOA / common area" },
  { value: "vacant", label: "Vacant lot" },
  { value: "other", label: "Other" },
] as const;

export const cities: City[] = [
  {
    slug: "dayton-oh",
    name: "Dayton",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "kettering-oh",
      "oakwood-oh",
      "west-carrollton-oh",
      "riverside-oh",
      "moraine-oh",
    ],
    setting:
      "Dayton sits in the Miami Valley with older city lots, bungalows, two-stories, and mid-century houses. AES Ohio is the usual electric utility on the bill.",
    utility: "AES Ohio",
    housing:
      "Victorian, Craftsman, and 1940s–60s bungalows on tighter lots than the suburbs — attics and closets that hide older furnaces.",
    winter:
      "Miami Valley ice and freeze–thaw cycles punish older heat exchangers, inducer motors, and condensate lines that were never meant for a long ice event.",
    summer:
      "August AC load on older brick and uninsulated attics is why many Dayton calls start as “the unit runs and the house still feels warm.”",
    localNote:
      "Oregon District and St. Anne’s Hill add tight access and older duct runs that a new subdivision does not have. AES Ohio peak summer bills are a reason people ask about repair vs replace, not a local price we invented.",
  },
  {
    slug: "kettering-oh",
    name: "Kettering",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "oakwood-oh",
      "west-carrollton-oh",
      "centerville-oh",
      "moraine-oh",
    ],
    setting:
      "Kettering is a southern Dayton suburb of post-war streets, ranches, and split-levels. AES Ohio serves most homes.",
    utility: "AES Ohio",
    housing:
      "1950s–70s ranches and split-levels with crawlspaces or low attics and furnaces that have often outlived the original homeowners.",
    winter:
      "Ice dams and cold snaps show up as no-heat calls on ranches whose original furnaces were never sized for today’s sealed windows.",
    summer:
      "Long, low ranch roofs soak heat; an aging condenser in the side yard is a common mid-summer Kettering story.",
    localNote:
      "Mature maples along the parkways shade condensers and change airflow. That is a site condition, not a Kettering-only dollar figure.",
  },
  {
    slug: "beavercreek-oh",
    name: "Beavercreek",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "kettering-oh",
      "fairborn-oh",
      "xenia-oh",
      "riverside-oh",
    ],
    setting:
      "Beavercreek sits east of Dayton near Wright-Patterson Air Force Base, with later subdivisions and wider lots than the city core. AES Ohio is the typical utility.",
    utility: "AES Ohio",
    housing:
      "1960s–2000s colonials and two-stories, plus some older farmhouse leftovers on the edges.",
    winter:
      "Open lots catch more wind-driven ice than a tree-lined Dayton street; outdoor units and intake screens ice over faster.",
    summer:
      "Larger, less-shaded roofs mean higher solar gain. Summer AC load is a capacity question, not a reason to invent a Beavercreek price.",
    localNote:
      "HOA architectural rules come up more often here than in the city. Confirm the bill is AES Ohio before anyone talks about a high-efficiency changeout.",
  },
  {
    slug: "centerville-oh",
    name: "Centerville",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "kettering-oh",
      "oakwood-oh",
      "miamisburg-oh",
      "beavercreek-oh",
    ],
    setting:
      "Centerville mixes a historic downtown with 1970s–90s colonials in and around Washington Township. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "Two-story colonials, some HOA streets, and a compact historic core with tighter lots and older mechanical closets.",
    winter:
      "North-facing valleys and complex roofs hold ice; older furnaces in two-story colonials short-cycle when returns are undersized.",
    summer:
      "Multi-level houses stack cooling load. A single aging evaporator often cannot keep upstairs bedrooms comfortable in July.",
    localNote:
      "A four-plane colonial is a different duct and load problem than a Kettering ranch, even when both sit on AES Ohio.",
  },
  {
    slug: "huber-heights-oh",
    name: "Huber Heights",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "vandalia-oh",
      "fairborn-oh",
      "riverside-oh",
      "trotwood-oh",
    ],
    setting:
      "Huber Heights is a northern Dayton suburb known for brick ranches on AES Ohio. Lots are often wider than inner-city Dayton.",
    utility: "AES Ohio",
    housing:
      "1950s–70s Huber brick ranches and later infill. Simple footprints, older furnaces, and crawl or slab mechanicals.",
    winter:
      "Low-pitch attics and original furnaces make ice-season no-heat calls common. Condensate freeze is a recurring Miami Valley winter issue.",
    summer:
      "Brick ranches hold heat after sundown. An undersized or dirty coil shows up as a long run time on AES Ohio’s summer peak.",
    localNote:
      "A long ranch plane is easy to service if the unit is accessible. Age of the furnace, not lot size, is the usual constraint.",
  },
  {
    slug: "fairborn-oh",
    name: "Fairborn",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "beavercreek-oh",
      "huber-heights-oh",
      "riverside-oh",
      "xenia-oh",
    ],
    setting:
      "Fairborn sits next to Wright-Patterson Air Force Base with an older downtown and military-adjacent housing. AES Ohio serves the city.",
    utility: "AES Ohio",
    housing:
      "1940s–80s stock near the base and an older commercial/residential core. Furnace age varies block to block.",
    winter:
      "Ice and wind off more open corridors near the base area; older heat exchangers and cracked flues are a first-visit question.",
    summer:
      "A mix of window units and aging central AC. Summer AC load on an unrestored older roof is a different job than a later subdivision.",
    localNote:
      "Some Fairborn systems need replacement before another repair makes sense. That is a written diagnosis, not a slogan.",
  },
  {
    slug: "miamisburg-oh",
    name: "Miamisburg",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "west-carrollton-oh",
      "centerville-oh",
      "kettering-oh",
      "moraine-oh",
    ],
    setting:
      "Miamisburg follows the Great Miami River south of Dayton, with hillside lots and a historic downtown. AES Ohio is the typical utility.",
    utility: "AES Ohio",
    housing:
      "Historic downtown two-stories plus later hillside and subdivision houses. Basement furnaces and steep-lot outdoor units are common.",
    winter:
      "North slopes hold ice; hillside access in a freeze changes how a crew stages, not the national cost range.",
    summer:
      "River humidity plus hillside sun makes AC work harder than a flat Huber ranch. Condensate and coil cleaning come up often.",
    localNote:
      "A river-adjacent lot is not automatically a harder job. Access, equipment age, and AES Ohio usage matter more than the zip code.",
  },
  {
    slug: "xenia-oh",
    name: "Xenia",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "beavercreek-oh",
      "fairborn-oh",
      "centerville-oh",
      "springfield-oh",
      "dayton-oh",
    ],
    setting:
      "Xenia is the Greene County seat east of Dayton, with older stock and blocks rebuilt after historic wind events. AES Ohio is the usual utility.",
    utility: "AES Ohio",
    housing:
      "Older in-town streets plus later rebuilds and subdivision edges. Replacement history after storms is part of the first questions.",
    winter:
      "Ice plus open-lot wind. Older furnaces that survived a wind event still need a heat-exchanger check before another heating season.",
    summer:
      "More open lots mean condensers sit in sun and wind. Summer AC load is a filter-and-coil conversation as often as a compressor one.",
    localNote:
      "A newer post-storm house can have a recent system. An unrestored older house may not. We do not invent a Xenia-only price for either.",
  },
  {
    slug: "vandalia-oh",
    name: "Vandalia",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "huber-heights-oh",
      "trotwood-oh",
      "englewood-oh",
      "tipp-city-oh",
    ],
    setting:
      "Vandalia sits north of Dayton near the airport corridor, with 1960s–80s housing on AES Ohio.",
    utility: "AES Ohio",
    housing:
      "1960s–80s ranches and tri-levels; fewer historic mechanical closets than Springfield or downtown Dayton.",
    winter:
      "Airport-area wind and ice on low-pitch attics. Snow load on a condenser pad is a design note, not a local price list.",
    summer:
      "Tri-levels stack heat upstairs. An aging evaporator in a ranch-to-upper return is a common Vandalia summer complaint.",
    localNote:
      "Simpler roof and duct geometry helps. Remaining furnace life and the AES Ohio bill still come first.",
  },
  {
    slug: "springfield-oh",
    name: "Springfield",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "fairborn-oh",
      "huber-heights-oh",
      "vandalia-oh",
      "xenia-oh",
    ],
    setting:
      "Springfield is a Clark County city northeast of Dayton with older industrial-era housing. Confirm AES Ohio or the utility printed on your bill.",
    utility: "AES Ohio or the utility printed on your bill",
    housing:
      "Older city stock — brick, two-stories, and houses that have seen decades of ice seasons and older furnaces.",
    winter:
      "Ice storms are a regular Miami Valley and Clark County story. Heat-exchanger condition is the gate, not a slogan.",
    summer:
      "Aging central AC and window-unit leftovers. Summer AC load on a brick two-story is not the same job as a later Fairborn ranch.",
    localNote:
      "We do not invent a Springfield-only dollar figure. National published ranges are the only numbers on this site.",
  },
  {
    slug: "tipp-city-oh",
    name: "Tipp City",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "vandalia-oh",
      "huber-heights-oh",
      "englewood-oh",
      "trotwood-oh",
    ],
    setting:
      "Tipp City sits in Miami County north of Dayton along the I-75 corridor, with a compact historic downtown and later subdivisions. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "Canal-era downtown two-stories plus 1970s–2000s ranches and colonials on wider lots than inner-city Dayton.",
    winter:
      "Ice and freeze–thaw hit older downtown furnaces and flue paths; open subdivision lots catch more wind-driven snow than a tree-lined Dayton street.",
    summer:
      "Downtown two-stories stack cooling load; later Tipp subdivision ranches are simpler but still see Miami Valley August peaks.",
    localNote:
      "A Main Street two-story is a different access and duct problem than a later Tipp subdivision ranch, even when both sit on AES Ohio.",
  },
  {
    slug: "oakwood-oh",
    name: "Oakwood",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "kettering-oh",
      "centerville-oh",
      "west-carrollton-oh",
      "miamisburg-oh",
    ],
    setting:
      "Oakwood is a small inner-ring city immediately south of Dayton, with tree-lined streets and early 20th-century two-stories. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "Tudor, colonial, and foursquare houses on shaded lots — unfinished basements or short crawlspaces, not a 1990s slab subdivision.",
    winter:
      "Mature shade and older crawlspaces freeze first after a Miami Valley ice event; older furnaces and condensate lines on early 20th-century stock take the hit.",
    summer:
      "Tree-lined streets shade condensers the way Kettering maples do, but a Tudor attic and tighter lot change airflow. August AC load on older brick is a capacity question, not an Oakwood price.",
    localNote:
      "A foursquare mechanical closet is a different access and duct problem than a later Kettering ranch, even when both sit on AES Ohio. We do not invent an Oakwood-only dollar figure.",
  },
  {
    slug: "west-carrollton-oh",
    name: "West Carrollton",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "miamisburg-oh",
      "kettering-oh",
      "oakwood-oh",
      "moraine-oh",
    ],
    setting:
      "West Carrollton sits on the Great Miami River immediately south of Dayton and north of Miamisburg, along the I-75 / Dixie Drive corridor. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "Postwar 1950s–70s ranches and split-levels plus older downtown stock on flatter river-valley lots — crawlspaces and unfinished basements, not a Tudor street or a hillside two-story.",
    winter:
      "River-valley crawlspaces and unheated garage walls freeze first after a Miami Valley ice event; furnaces and condensate lines on postwar Dixie Drive stock take the hit.",
    summer:
      "River humidity along I-75 loads coils harder than a tree-lined inner-ring street. August AC load on a West Carrollton ranch is a condensate and capacity question, not a city price.",
    localNote:
      "A Dixie Drive ranch on a river-valley lot is a different access and duct problem than a hillside downtown or an early-20th-century foursquare, even when both sit on AES Ohio. We do not invent a West Carrollton-only dollar figure.",
  },
  {
    slug: "trotwood-oh",
    name: "Trotwood",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "vandalia-oh",
      "huber-heights-oh",
      "tipp-city-oh",
      "englewood-oh",
    ],
    setting:
      "Trotwood sits on the northwest Dayton inner-ring along the Salem Avenue / SR 49 corridor, on flatter lots than a Miamisburg hillside. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "Postwar 1950s–70s ranches and modest two-stories on flatter lots — crawlspaces and garage closets, not a Tudor street or a river-bluff two-story.",
    winter:
      "Flatter-lot crawlspaces and unheated garage walls freeze first after a Miami Valley ice event; furnaces and condensate lines on postwar Salem Avenue stock take the hit.",
    summer:
      "More open northwest lots load coils harder than a tree-lined inner-ring street. August AC load on a Trotwood ranch is a condensate and capacity question, not a city price.",
    localNote:
      "A Salem Avenue ranch on a flatter northwest lot is a different access and duct problem than a hillside downtown or an early-20th-century foursquare, even when both sit on AES Ohio. We do not invent a Trotwood-only dollar figure.",
  },
  {
    slug: "englewood-oh",
    name: "Englewood",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "vandalia-oh",
      "trotwood-oh",
      "dayton-oh",
      "huber-heights-oh",
      "tipp-city-oh",
    ],
    setting:
      "Englewood sits northwest of Dayton where I-70 meets the National Road (US-40), with a small older downtown core along US-40 next to later interstate-adjacent subdivisions — not a Salem Avenue ranch town, not an airport-corridor tri-level suburb, and not a south I-75 river-valley city. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "Older National Road two-stories and modest downtown stock versus later I-70-adjacent subdivisions — basements or crawlspaces in the core, slabs and garage utility walls on later streets.",
    winter:
      "National Road crawlspaces freeze first after a Miami Valley polar-vortex; later lots fail at hose bibs and unheated garage walls — a different pattern than a Trotwood Salem-corridor ranch.",
    summer:
      "I-70-adjacent pads sit in more sun and interstate wind than the older US-40 downtown core. August AC load on a National Road two-story stacks upstairs; later subdivision slabs fail at a tired condenser on an unshaded lot. That is a coil and capacity question, not an Englewood price.",
    localNote:
      "A National Road downtown two-story is a different access and duct problem than a later I-70 subdivision slab or garage-wall closet, even when both sit on AES Ohio. We do not invent an Englewood-only dollar figure.",
  },
  {
    slug: "riverside-oh",
    name: "Riverside",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "huber-heights-oh",
      "fairborn-oh",
      "beavercreek-oh",
      "kettering-oh",
    ],
    setting:
      "Riverside sits on Dayton's east inner-ring along the Springfield Street (SR 4) / Airway Road / Harshman corridor, against the Wright-Patterson fence-line and the Mad River / Huffman Dam valley — not a National Road / I-70 northwest town, not a Salem Avenue ranch suburb, and not a south I-75 river-valley city. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "1940s–60s military-adjacent stock and Page Manor-era streets versus later east-side infill — crawlspaces and garage closets near the base, tighter lots along Springfield Street, not a later Beavercreek subdivision or a Huber brick-ranch grid.",
    winter:
      "Mad River flats and open base-adjacent lots freeze first after a Miami Valley ice event; older furnaces and condensate lines on postwar Airway / Harshman stock take the hit — a different pattern than an Englewood National Road crawlspace or a Trotwood Salem-corridor ranch.",
    summer:
      "Wright-Patt-adjacent pads sit in more sun and runway-corridor wind than a tree-lined inner-ring street. August AC load on a Springfield Street two-story stacks upstairs; later infill fails at a tired condenser on an unshaded lot. That is a coil and capacity question, not a Riverside price.",
    localNote:
      "A Page Manor-era or Springfield Street house is a different access and duct problem than a later Beavercreek subdivision or a Huber Heights brick ranch, even when both sit on AES Ohio. We do not invent a Riverside-only dollar figure.",
  },
  {
    slug: "moraine-oh",
    name: "Moraine",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [
      "dayton-oh",
      "west-carrollton-oh",
      "kettering-oh",
      "miamisburg-oh",
      "oakwood-oh",
    ],
    setting:
      "Moraine is Dayton's south inner-ring city on the Dixie Drive and I-75 corridor, on the Great Miami River industrial flats — west of Kettering and Oakwood, north of West Carrollton and Miamisburg. Sellman, Pinnacle, Moraine Road, and Dryden Road sit beside the former GM Moraine Assembly and Delphi plants, not the Wright-Patterson / Springfield Street fence-line, not the National Road / I-70 northwest edge, and not the Salem Avenue ranch corridor. AES Ohio is the usual electric utility.",
    utility: "AES Ohio",
    housing:
      "Postwar ranch and tri-level houses on Dixie and industrial-adjacent streets, plus later south-Dayton infill. Crawlspaces and garage closets are the usual mechanicals — not an Oakwood Tudor basement and not a Centerville colonial attic.",
    winter:
      "River-flat and industrial-corridor houses freeze first after Miami Valley ice. Condensate on older furnaces in crawlspaces and garage closets is the recurring no-heat note — a different failure than an east-side base-adjacent lot or a northwest National Road core.",
    summer:
      "I-75 and Dixie pads take more sun and highway wind than a shaded inner-ring street. Upstairs AC load on two-stories stacks in August; a tired condenser on an unshaded industrial-adjacent lot is a coil and capacity question, not a Moraine price.",
    localNote:
      "A house on Sellman, Pinnacle, Moraine Road, or Dryden next to the former assembly corridor is a different access and duct job than a Kettering ranch or a later south-Dayton infill pad, even when both sit on AES Ohio. We do not invent a Moraine-only dollar figure.",
  },
  {
    slug: "knoxville-tn",
    name: "Knoxville",
    state: "Tennessee",
    stateAbbr: "TN",
    status: "live",
    nearbySlugs: [],
    setting:
      "Knoxville sits in the Tennessee Valley, with older Fort Sanders and downtown housing on one side and later west Knoxville subdivisions on the other. Knoxville Utilities Board (KUB) is the usual local utility on the bill; TVA generation is what most East Tennessee electric rates are built on.",
    utility: "Knoxville Utilities Board (KUB) / TVA on the bill",
    housing:
      "Older Fort Sanders and downtown houses — tight lots, student-era duplexes, and mechanical closets that predate central air — versus west Knoxville subdivisions with later pads and simpler attics.",
    winter:
      "East Tennessee winters are milder than a long ice event, but freeze nights still stop older furnaces, freeze condensate, and show up as no-heat calls after a clear, cold night.",
    summer:
      "Humid Knoxville summers load coils and make a tired condenser run all afternoon. An older Fort Sanders house holds moisture differently than a west Knoxville subdivision ranch.",
    localNote:
      "Confirm KUB or the utility printed on your bill before anyone talks efficiency. Fort Sanders access and a west Knoxville street are different jobs. We do not invent a Knoxville-only dollar figure.",
  },
  {
    slug: "madison-wi",
    name: "Madison",
    state: "Wisconsin",
    stateAbbr: "WI",
    status: "live",
    nearbySlugs: [],
    setting:
      "Madison sits on an isthmus between lakes, with older near-east housing on one side and later west-side subdivisions on the other. Madison Gas and Electric (MG&E) is the usual local utility on the bill.",
    utility: "Madison Gas and Electric (MG&E)",
    housing:
      "Older near-east houses — tight lots, bungalows, and mechanical closets that have seen decades of ice dams — versus later west-side subdivisions with later pads and simpler attics.",
    winter:
      "Madison winters are a deep freeze: ice dams, frozen condensate, and no-heat calls after a polar snap. Older near-east furnaces take the hit first; west-side units still fail when intake screens ice over.",
    summer:
      "Humid Madison summers off the lakes load coils and make a tired condenser run all afternoon. An older near-east house holds moisture differently than a later west-side subdivision ranch.",
    localNote:
      "Confirm MG&E or the utility printed on your bill before anyone talks efficiency. Near-east access and a west-side street are different jobs. We do not invent a Madison-only dollar figure.",
  },
  {
    slug: "syracuse-ny",
    name: "Syracuse",
    state: "New York",
    stateAbbr: "NY",
    status: "live",
    nearbySlugs: [],
    setting:
      "Syracuse sits in Central New York south of Lake Ontario, with older Eastwood, Strathmore, and University Hill housing on one side and later suburban-edge streets on the other. National Grid is the usual local utility on the bill. Lake-effect snow off Ontario is the winter fact that shapes most HVAC calls.",
    utility: "National Grid",
    housing:
      "Older Eastwood, Strathmore, and University Hill houses — tight lots, two-stories, and mechanical closets that have seen decades of lake-effect ice — versus later suburban-edge pads and simpler attics.",
    winter:
      "Syracuse winters are lake-effect: heavy snow, ice dams, frozen condensate, and no-heat calls after a band sits over the city. Older Eastwood and Strathmore furnaces take the hit first; later units still fail when intake screens ice over.",
    summer:
      "Humid Central New York summers load coils and make a tired condenser run all afternoon. An older Eastwood or University Hill house holds moisture differently than a later suburban-edge ranch.",
    localNote:
      "Confirm National Grid or the utility printed on your bill before anyone talks efficiency. Eastwood access and a suburban-edge street are different jobs. We do not invent a Syracuse-only dollar figure.",
  },
  {
    slug: "toledo-oh",
    name: "Toledo",
    state: "Ohio",
    stateAbbr: "OH",
    status: "live",
    nearbySlugs: [],
    setting:
      "Toledo sits on the Maumee River in northwest Ohio, with older Old West End and downtown housing on one side and later west Toledo and South Toledo subdivisions on the other. Toledo Edison (FirstEnergy) is the usual local utility on the bill.",
    utility: "Toledo Edison (FirstEnergy)",
    housing:
      "Older Old West End and downtown houses — tight lots, Victorians, and mechanical closets that predate central air — versus later west Toledo and South Toledo subdivisions with later pads and simpler attics.",
    winter:
      "Northwest Ohio winters off the Maumee and Lake Erie bring ice, freeze–thaw, and no-heat calls after a lake-effect band. Older Old West End furnaces take the hit first; later west Toledo units still fail when condensate lines freeze.",
    summer:
      "Humid Maumee summers load coils and make a tired condenser run all afternoon. An older Old West End house holds moisture differently than a later west Toledo subdivision ranch.",
    localNote:
      "Confirm Toledo Edison or the utility printed on your bill before anyone talks efficiency. Old West End access and a west Toledo street are different jobs. We do not invent a Toledo-only dollar figure.",
  },
];

export const liveCitySlugs = cities
  .filter((city) => city.status === "live")
  .map((city) => city.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getNearbyCities(city: City): City[] {
  return city.nearbySlugs
    .map((slug) => getCity(slug))
    .filter((item): item is City => Boolean(item));
}

export function getParentCity(city: City): City | undefined {
  return city.parentSlug ? getCity(city.parentSlug) : undefined;
}

/** Site-relative path with a trailing slash. Home is `/`. Hash-only paths are unchanged. */
export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  if (path.startsWith("#") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const [withoutHash, hash] = path.split("#");
  const [withoutQuery, query] = withoutHash.split("?");
  const slashed = withoutQuery.endsWith("/") ? withoutQuery : `${withoutQuery}/`;
  return `${slashed}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

/** Absolute site URL with a trailing slash (homepage is `https://hvaclists.com/`). */
export function absoluteUrl(path = "/"): string {
  const origin = site.url.replace(/\/$/, "");
  const rel = withTrailingSlash(path);
  return `${origin}${rel}`;
}

export function cityPath(city: City | string): string {
  const slug = typeof city === "string" ? city : city.slug;
  return withTrailingSlash(`/${slug}`);
}

export function servicePath(
  city: City | string,
  service: Service | string
): string {
  const citySlug = typeof city === "string" ? city : city.slug;
  const serviceSlug = typeof service === "string" ? service : service.slug;
  return withTrailingSlash(`/${citySlug}/${serviceSlug}`);
}

export function lockedH1(service: Service, city: City): string {
  return `Best ${service.name} in ${city.name} — ${site.year}`;
}

/** Title tag matches the H1 when it fits in 60 characters. */
export function pageTitle(service: Service, city: City): string {
  const locked = lockedH1(service, city);
  if (locked.length <= 60) return locked;
  const withoutYear = `Best ${service.name} in ${city.name}`;
  if (withoutYear.length <= 60) return withoutYear;
  return `${service.name} in ${city.name} — ${site.year}`;
}

export const costGuide = {
  line: "HVAC replacement typically $5,000–$22,000, average about $7,500.",
  sourceName: "Angi 2026 HVAC replacement guide",
  sourceUrl:
    "https://www.angi.com/articles/insider-s-price-guide-new-heating-and-cooling-system.htm",
  repairLine:
    "HVAC repair averages about $350 nationally (published range about $100–$3,000).",
  repairSourceName: "Angi 2026 HVAC repair guide",
  repairSourceUrl: "https://www.angi.com/articles/how-much-hvac-repair-cost.htm",
  furnaceLine:
    "Furnace repair is published nationally from about $64–$1,475.",
  furnaceSourceName: "Angi 2026 furnace repair guide",
  furnaceSourceUrl:
    "https://www.angi.com/articles/how-much-does-common-furnace-repair-cost.htm",
  disclaimer:
    "These are national published ranges, not a Dayton-area or city-specific survey. HVACLists does not invent city-specific dollar amounts.",
} as const;
