/**
 * POST this site's sitemap locs to IndexNow.
 * Key is public by design — no secret env var.
 *
 * Usage:
 *   node scripts/ping-indexnow.mjs
 *
 * Optional env:
 *   SITEMAP_PATH  local sitemap.xml (e.g. out/sitemap.xml)
 *   SITEMAP_URL   remote sitemap (default https://hvaclists.com/sitemap.xml)
 *   INDEXNOW_HOST host field (default hvaclists.com)
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const host = process.env.INDEXNOW_HOST ?? "hvaclists.com";
const sitemapUrl =
  process.env.SITEMAP_URL ?? `https://${host}/sitemap.xml`;

const keyFiles = readdirSync(publicDir).filter((name) =>
  /^[A-Fa-f0-9]{8,128}\.txt$/.test(name)
);

if (keyFiles.length !== 1) {
  console.error(
    `Expected exactly one IndexNow key file in public/, found: ${keyFiles.join(", ") || "(none)"}`
  );
  process.exit(1);
}

const keyFile = keyFiles[0];
const key = readFileSync(join(publicDir, keyFile), "utf8").replace(/\s+/g, "");

if (key !== keyFile.replace(/\.txt$/, "")) {
  console.error(`IndexNow key file content must equal the filename (minus .txt).`);
  process.exit(1);
}

function locsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) =>
    match[1].trim()
  );
}

async function loadSitemapXml() {
  const localPath = process.env.SITEMAP_PATH;
  if (localPath) {
    return readFileSync(localPath, "utf8");
  }
  const fallback = join(root, "out", "sitemap.xml");
  try {
    return readFileSync(fallback, "utf8");
  } catch {
    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${sitemapUrl}: HTTP ${response.status}`);
    }
    return response.text();
  }
}

const xml = await loadSitemapXml();
const urlList = locsFromSitemap(xml);

if (urlList.length === 0) {
  console.error("No <loc> entries found in sitemap.");
  process.exit(1);
}

const keyLocation = `https://${host}/${keyFile}`;
const payload = {
  host,
  key,
  keyLocation,
  urlList,
};

if (process.env.INDEXNOW_DRY_RUN === "1") {
  console.log(
    `IndexNow dry run — ${urlList.length} sitemap locs, keyLocation ${keyLocation}`
  );
  console.log(JSON.stringify({ host, key, keyLocation, urlCount: urlList.length, sample: urlList.slice(0, 3) }, null, 2));
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

const body = await response.text();
console.log(
  `IndexNow ${response.status} ${response.statusText} — ${urlList.length} sitemap locs, keyLocation ${keyLocation}`
);
if (body) console.log(body);

// 200 = submitted; 202 = received, key validation pending (first deploy).
if (response.status !== 200 && response.status !== 202) {
  process.exit(1);
}
