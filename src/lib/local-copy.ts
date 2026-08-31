import type { City, Service } from "@/config/site";

const copy: Record<string, string> = {
  "dayton-oh:ac-repair":
    "Dayton AC repair usually starts on an older bungalow or two-story whose condenser has seen Miami Valley summers and AES Ohio peak bills. Ice on the coil in July is a diagnosis, not a city price. Tight lots and street parking change access, not the national range.",
  "dayton-oh:furnace":
    "Older Dayton furnaces in brick and Craftsman basements take ice-season abuse: cracked heat exchangers, failed inducers, and condensate that freezes in a polar snap. AES Ohio is the bill; the furnace age is the question. We do not invent a Dayton-only dollar figure.",
  "dayton-oh:hvac-installation":
    "A Dayton changeout has to name load, duct leaks on a 1940s house, and whether the pad and flue still work after ice season. AES Ohio interconnection is not the issue — equipment match and attic gain are. National published ranges are the only numbers on this page.",
  "dayton-oh:emergency-hvac":
    "Use this Dayton page when there is no heat in a freeze or no cooling in a heat wave. Say so on the form. Emergency work is a different queue than a planned tune-up on an Oregon District bungalow.",

  "kettering-oh:ac-repair":
    "Kettering AC calls are often 1950s–70s ranches whose outdoor unit sits under maples and has run every Miami Valley August since the last owner. Short-cycling and a warm house are site conditions. AES Ohio usage does not create a Kettering-only repair price.",
  "kettering-oh:furnace":
    "Many Kettering ranches still heat with furnaces that predate sealed windows. Ice and a hard start in January are why people open this URL. Ask for a written heat-exchanger check — not a same-day upsell we invented.",
  "kettering-oh:hvac-installation":
    "A Kettering ranch changeout is often one long supply run and a low attic. That is simpler geometry than a Centerville colonial, but older ducts and a tired pad still have to be in the scope. AES Ohio is the usual bill.",
  "kettering-oh:emergency-hvac":
    "A no-heat night on a Kettering ranch is an emergency form, not a Saturday trim. Say if anyone is medically fragile. We route the request; HVACLists does not send a truck.",

  "beavercreek-oh:ac-repair":
    "Beavercreek condensers on later subdivisions sit in more sun and wind than a tree-lined Dayton street. Summer AC load is a coil and charge question. HOA setbacks can change where a tech stages — not a local price list.",
  "beavercreek-oh:furnace":
    "Beavercreek furnaces are often newer than Huber Heights brick-ranch stock, but ice on open lots still kills intake screens and condensate pumps. Confirm AES Ohio on the bill before anyone talks efficiency.",
  "beavercreek-oh:hvac-installation":
    "Wider Beavercreek lots help staging. A written install still names tonnage, duct, and whether an HOA limits the pad. We will not invent a Wright-Patterson-adjacent surcharge.",
  "beavercreek-oh:emergency-hvac":
    "Open-lot wind and ice can take a Beavercreek system down faster than a sheltered Dayton court. Mark emergency on the form if heat or cooling is out.",

  "centerville-oh:ac-repair":
    "Centerville two-stories often lose upstairs comfort first. An aging evaporator on a colonial is a different repair than a Kettering ranch coil. AES Ohio peak days make that obvious; they do not create a Centerville survey price.",
  "centerville-oh:furnace":
    "Complex Centerville returns and older furnaces short-cycle when ice season hits. Historic-core closets add access. Ask what is warranted on a heat exchanger — “we stand behind it” is not a warranty.",
  "centerville-oh:hvac-installation":
    "A four-plane colonial needs a load calc that names which floors get which airflow. Washington Township HOA rules may apply. National replacement ranges are the only dollars we cite.",
  "centerville-oh:emergency-hvac":
    "No heat on a north-facing Centerville colonial in an ice event is emergency work. Downtown access is tighter than a later township street. Say which on the form.",

  "huber-heights-oh:ac-repair":
    "Huber Heights brick ranches hold heat after sundown. A dirty coil or tired condenser shows up as a long AES Ohio summer run. Simple footprints help the tech; they do not create a Huber-only price.",
  "huber-heights-oh:furnace":
    "Original Huber furnaces in crawl or slab setups are a Miami Valley ice-season classic: no heat, frozen condensate, or a cracked exchanger worry. Age of the unit, not the brick, is the first fact.",
  "huber-heights-oh:hvac-installation":
    "A Huber ranch changeout is often one pad and a straightforward duct. Low-pitch attics still need a written load. We will not invent a northern-suburb dollar figure.",
  "huber-heights-oh:emergency-hvac":
    "Ice-season no-heat on a Huber ranch is why this emergency URL exists. Say if the house is on a slab or crawl so the company that calls you can plan access.",

  "fairborn-oh:ac-repair":
    "Fairborn mixes downtown window-unit leftovers with later central AC near the base. Summer AC load on an unrestored older roof is a leak-and-insulation conversation as often as a compressor one. AES Ohio serves the city.",
  "fairborn-oh:furnace":
    "Furnace age in Fairborn varies block to block. Older heat exchangers and cracked flues belong in the first visit after a Miami Valley ice storm. We do not invent a Fairborn license or a local price.",
  "fairborn-oh:hvac-installation":
    "Some Fairborn houses need replacement before another repair. A written install names the existing flue, pad, and whether the house is military-adjacent stock or later subdivision. National ranges only.",
  "fairborn-oh:emergency-hvac":
    "Wind off open corridors near the base can take a Fairborn system down. If heat or cooling is out, use emergency on the form. HVACLists still does not send a crew.",

  "miamisburg-oh:ac-repair":
    "Miamisburg hillside and river humidity make coils work harder than a flat Huber ranch. Condensate and access on a steep lot are the usual notes. AES Ohio is the typical bill — not a river-view premium we invented.",
  "miamisburg-oh:furnace":
    "Basement furnaces on hillside two-stories see ice-season flue and condensate problems. Staging in a freeze changes the visit, not the national furnace-repair range.",
  "miamisburg-oh:hvac-installation":
    "A Miamisburg install has to name hillside pad access and remaining duct life on a downtown two-story. Orientation and trees along the bluff matter more than the zip code.",
  "miamisburg-oh:emergency-hvac":
    "A no-heat call on a north-slope Miamisburg lot in ice is emergency work. Say how a truck can park. We route the request; we do not invent a contractor to fill the page.",

  "xenia-oh:ac-repair":
    "Xenia condensers on more open lots sit in sun and wind. Summer AC load is often a filter-and-coil job before anyone talks compressor. AES Ohio is the usual utility. Wind history is a reason to inspect, not a Xenia price.",
  "xenia-oh:furnace":
    "Older Xenia furnaces that survived a wind event still need a heat-exchanger check before another ice season. Post-storm rebuilds may already have newer equipment — ask, do not assume.",
  "xenia-oh:hvac-installation":
    "A newer post-storm Xenia house can be a clean changeout. An unrestored older house is not. Roof and duct condition are the gate. National published ranges are the only dollars here.",
  "xenia-oh:emergency-hvac":
    "Ice plus open-lot wind is why Xenia emergency calls spike. If the house has no heat or no cooling, say so. HVACLists is a directory, not the company that shows up.",

  "vandalia-oh:ac-repair":
    "Vandalia tri-levels stack heat upstairs. An aging evaporator and a ranch-to-upper return are a common AES Ohio summer complaint. Airport-area wind does not change national repair ranges.",
  "vandalia-oh:furnace":
    "1960s–80s Vandalia furnaces in ranches and tri-levels see ice on low-pitch attics. Snow on a condenser pad is a note for cooling season; heat-exchanger age is the winter question.",
  "vandalia-oh:hvac-installation":
    "Simpler Vandalia geometry helps a changeout. Remaining furnace life and the AES Ohio bill still come first. We will not invent an airport-corridor surcharge.",
  "vandalia-oh:emergency-hvac":
    "Airport-area wind and ice can take a Vandalia system down overnight. Mark emergency if you have no heat or no cooling. We still take the request if no listing is live.",

  "springfield-oh:ac-repair":
    "Springfield brick two-stories and aging central AC are a different summer job than a later Fairborn ranch. Confirm AES Ohio or the utility on the bill. We do not publish a Clark County survey price.",
  "springfield-oh:furnace":
    "Older Springfield furnaces have seen decades of ice seasons. Heat-exchanger condition is the gate. Ask for the license the company uses in Ohio — HVACLists will not invent one.",
  "springfield-oh:hvac-installation":
    "Industrial-era Springfield housing can hide duct and flue surprises. A written install names those. National replacement ranges ($5,000–$22,000 published) are the only dollars we cite.",
  "springfield-oh:emergency-hvac":
    "A Clark County ice storm is a reason to use the emergency form, not a reason to invent a Springfield price. We hold the request until a company that covers your ZIP can call.",

  "tipp-city-oh:ac-repair":
    "Tipp City AC work splits between canal-era downtown two-stories and later Miami County ranches. Downtown stacks cooling load; subdivision pads are simpler. AES Ohio peak days do not create a Tipp-only repair price.",
  "tipp-city-oh:furnace":
    "Ice and freeze–thaw hit older downtown Tipp furnaces and flue paths harder than a later subdivision unit. Open lots north of Dayton catch more wind-driven snow. Age of the heat exchanger is still the first fact.",
  "tipp-city-oh:hvac-installation":
    "A Main Street two-story is a different access and duct problem than a later Tipp ranch, even when both sit on AES Ohio. We do not publish a Miami County dollar figure.",
  "tipp-city-oh:emergency-hvac":
    "No heat in a Tipp City freeze — downtown or subdivision — is emergency routing. Say which so the company that calls you can plan the street. HVACLists does not send a truck.",

  "knoxville-tn:ac-repair":
    "Knoxville AC repair often starts on a Fort Sanders or downtown house whose evaporator has run through humid Tennessee Valley summers, or on a west Knoxville subdivision condenser that short-cycles in July. Ice on the coil is a diagnosis. KUB / TVA on the bill is not a Knoxville repair price we invented.",
  "knoxville-tn:furnace":
    "Freeze nights in Knoxville take down older Fort Sanders furnaces and condensate lines that sat idle most of a mild winter. West Knoxville units are often newer but still fail on a sudden cold snap. Heat-exchanger condition is the question — not a city-only dollar figure.",
  "knoxville-tn:hvac-installation":
    "A Knoxville changeout has to name load and duct on older downtown or Fort Sanders stock versus a later west Knoxville subdivision. KUB interconnection is not the issue — match, attic gain, and remaining flue are. National published ranges are the only numbers on this page.",
  "knoxville-tn:emergency-hvac":
    "Use this Knoxville page when there is no heat after a freeze night or no cooling in a humid heat wave. Say so on the form. Emergency work is a different queue than a planned visit on a west Knoxville street.",
};

export function uniqueLocalCopy(city: City, service: Service): string {
  const key = `${city.slug}:${service.slug}`;
  const paragraph = copy[key];
  if (!paragraph) {
    throw new Error(`Missing unique local copy for ${key}`);
  }
  return paragraph;
}
