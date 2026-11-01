/**
 * Pages that show a seasonal block, one line per page: "city:service": "block".
 * The block id names a file in this folder. src/lib/lastmod.ts dates each page
 * listed here from its own line, its block file and index.tsx, so a seasonal
 * block bumps sitemap lastmod only on the pages that show it.
 * Remove a line to take the block off that page.
 */
export const seasonalRegistry: Record<string, string> = {
  "dayton-oh:furnace": "furnace-2026-11",
  "kettering-oh:furnace": "furnace-2026-11",
  "beavercreek-oh:furnace": "furnace-2026-11",
  "centerville-oh:furnace": "furnace-2026-11",
  "huber-heights-oh:furnace": "furnace-2026-11",
  "fairborn-oh:furnace": "furnace-2026-11",
  "miamisburg-oh:furnace": "furnace-2026-11",
  "xenia-oh:furnace": "furnace-2026-11",
  "vandalia-oh:furnace": "furnace-2026-11",
  "springfield-oh:furnace": "furnace-2026-11",
  "tipp-city-oh:furnace": "furnace-2026-11",
  "oakwood-oh:furnace": "furnace-2026-11",
  "west-carrollton-oh:furnace": "furnace-2026-11",
  "trotwood-oh:furnace": "furnace-2026-11",
  "englewood-oh:furnace": "furnace-2026-11",
  "riverside-oh:furnace": "furnace-2026-11",
  "moraine-oh:furnace": "furnace-2026-11",
  "bellbrook-oh:furnace": "furnace-2026-11",
  "springboro-oh:furnace": "furnace-2026-11",
  "troy-oh:furnace": "furnace-2026-11",
  "clayton-oh:furnace": "furnace-2026-11",
  "brookville-oh:furnace": "furnace-2026-11",
};
