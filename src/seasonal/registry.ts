/**
 * Pages that show a seasonal block, one line per page: "city:service": "block".
 * The block id names a file in this folder. src/lib/lastmod.ts dates each page
 * listed here from its own line, its block file and index.tsx, so a seasonal
 * block bumps sitemap lastmod only on the pages that show it.
 * Remove a line to take the block off that page.
 */
export const seasonalRegistry: Record<string, string> = {
  "dayton-oh:emergency-hvac": "no-heat-2026-11",
  "kettering-oh:emergency-hvac": "no-heat-2026-11",
  "beavercreek-oh:emergency-hvac": "no-heat-2026-11",
  "centerville-oh:emergency-hvac": "no-heat-2026-11",
  "huber-heights-oh:emergency-hvac": "no-heat-2026-11",
  "fairborn-oh:emergency-hvac": "no-heat-2026-11",
  "miamisburg-oh:emergency-hvac": "no-heat-2026-11",
  "xenia-oh:emergency-hvac": "no-heat-2026-11",
  "vandalia-oh:emergency-hvac": "no-heat-2026-11",
  "springfield-oh:emergency-hvac": "no-heat-2026-11",
  "tipp-city-oh:emergency-hvac": "no-heat-2026-11",
  "oakwood-oh:emergency-hvac": "no-heat-2026-11",
  "west-carrollton-oh:emergency-hvac": "no-heat-2026-11",
  "trotwood-oh:emergency-hvac": "no-heat-2026-11",
  "englewood-oh:emergency-hvac": "no-heat-2026-11",
  "riverside-oh:emergency-hvac": "no-heat-2026-11",
  "moraine-oh:emergency-hvac": "no-heat-2026-11",
  "bellbrook-oh:emergency-hvac": "no-heat-2026-11",
  "springboro-oh:emergency-hvac": "no-heat-2026-11",
  "troy-oh:emergency-hvac": "no-heat-2026-11",
  "clayton-oh:emergency-hvac": "no-heat-2026-11",
  "brookville-oh:emergency-hvac": "no-heat-2026-11",
};
