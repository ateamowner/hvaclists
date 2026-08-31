# HVACLists

A lead-generation directory for HVAC companies. One niche, one unique page per city. HVACLists is **not** an HVAC contractor and does **not** invent company names, phones, licenses, star ratings, or city-specific prices.

Working brand: **HVACLists**. Domain: [hvaclists.com](https://hvaclists.com).

The published site is a **static export** on GitHub Pages. There is no Node server and `next start` is not used for production.

Pattern: [ateamowner/treelist](https://github.com/ateamowner/treelist) (static Next export, city routes, FAQ JSON-LD, Formsubmit, listings). Pages workflow: [ateamowner/solarlists](https://github.com/ateamowner/solarlists) (build + upload-pages-artifact + deploy-pages).

Rename the brand in one file: `src/config/site.ts` (name, domain, inbox, theme tokens, cities, and services).

## Run locally

```bash
npm install
npm run dev
```

Dev app: [http://127.0.0.1:43127](http://127.0.0.1:43127)

Static preview (no Next server):

```bash
npm run build
npm start
```

`npm start` serves the `out/` folder with `serve`. The live site does not run `next start`.

After `npm run build`, `out/` must contain `CNAME` (`hvaclists.com`), `.nojekyll`, `dayton-oh/`, and city × service folders such as `dayton-oh/ac-repair/`.

## GitHub Pages

This repository publishes its own Pages site from `main` via `.github/workflows/pages.yml`:

1. `npm ci` and `npm run build` (`output: "export"`)
2. Confirm `out/CNAME`, `out/.nojekyll`, `out/dayton-oh/`, and `out/dayton-oh/ac-repair/`
3. `upload-pages-artifact` then `deploy-pages`

Required repo settings (once): **Settings → Pages → Source = GitHub Actions**. Custom domain: `hvaclists.com`. `CNAME` is committed as `hvaclists.com` (repo root and `public/CNAME`).

Pages source was set to GitHub Actions and the custom domain to hvaclists.com on 2026-08-28.

This workflow does **not** change [treelist.ai](https://treelist.ai) DNS or the TreeList / SolarLists repos.

## Porkbun DNS (hvaclists.com only — do not apply)

Keep Porkbun nameservers. Create these records for **hvaclists.com**. Do not apply them to treelist.ai.

**Apex `hvaclists.com` — add all four A records**

| Type | Host | Answer |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www**

| Type | Host | Answer |
| --- | --- | --- |
| CNAME | `www` | `ateamowner.github.io` |

Do not point `www` at a path such as `ateamowner.github.io/hvaclists`. The CNAME target is the GitHub Pages host only.

Remove any Porkbun default parking / URL-forward records on `@` and `www` first.

Optional IPv6 (GitHub Pages AAAA), if you want them:

| Type | Host | Answer |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

## Quote form and `LEADS_EMAIL`

Copy `.env.example`:

```
NEXT_PUBLIC_SITE_URL=https://hvaclists.com
LEADS_EMAIL=owner@ateamcontractings.com
```

Every quote posts via Formsubmit to `https://formsubmit.co/owner@ateamcontractings.com`. The on-page fallback is `mailto:owner@ateamcontractings.com`. There is no Web3Forms key and no `treelist@agentmail.to` inbox.

Until a listing is live on a URL, we still take the request and hold it.

## City pages (live)

- [/dayton-oh/ac-repair](/dayton-oh/ac-repair) — Best AC Repair in Dayton — 2026
- [/kettering-oh/ac-repair](/kettering-oh/ac-repair) — Best AC Repair in Kettering — 2026
- [/beavercreek-oh/ac-repair](/beavercreek-oh/ac-repair) — Best AC Repair in Beavercreek — 2026
- [/centerville-oh/ac-repair](/centerville-oh/ac-repair) — Best AC Repair in Centerville — 2026
- [/huber-heights-oh/ac-repair](/huber-heights-oh/ac-repair) — Best AC Repair in Huber Heights — 2026
- [/fairborn-oh/ac-repair](/fairborn-oh/ac-repair) — Best AC Repair in Fairborn — 2026
- [/miamisburg-oh/ac-repair](/miamisburg-oh/ac-repair) — Best AC Repair in Miamisburg — 2026
- [/xenia-oh/ac-repair](/xenia-oh/ac-repair) — Best AC Repair in Xenia — 2026
- [/vandalia-oh/ac-repair](/vandalia-oh/ac-repair) — Best AC Repair in Vandalia — 2026
- [/springfield-oh/ac-repair](/springfield-oh/ac-repair) — Best AC Repair in Springfield — 2026
- [/tipp-city-oh/ac-repair](/tipp-city-oh/ac-repair) — Best AC Repair in Tipp City — 2026
- [/knoxville-tn/ac-repair](/knoxville-tn/ac-repair) — Best AC Repair in Knoxville — 2026

City hubs: `/dayton-oh`, `/kettering-oh`, `/beavercreek-oh`, `/centerville-oh`, `/huber-heights-oh`, `/fairborn-oh`, `/miamisburg-oh`, `/xenia-oh`, `/vandalia-oh`, `/springfield-oh`, `/tipp-city-oh`, `/knoxville-tn`.

Services: `ac-repair`, `furnace`, `hvac-installation`, `emergency-hvac`.

Also: `/`, `/privacy`, `/for-pros`, `/request-sent`, and a 404.

## Listings

Listings load from `data/listings.json` (starts empty). Copy `data/listings.example.json` when a paid spot is approved. Do not invent companies to fill the page.

## Disclosure

HVACLists is a directory of HVAC companies. Paid spots are labeled. We are not an HVAC contractor.
