/**
 * @file Generates `src/data/listings.json` from the source dump.
 *
 * The dump (`src/data/project_data.json`) ships 293 kB of JSON, and roughly 60%
 * of it is never rendered: `house_rules` and `room_type` appear nowhere in the
 * UI, `picture_url` carries ten keys of image metadata where only `url` is read,
 * and `description` is only ever shown as a fallback for the handful of listings
 * that have no `space`.
 *
 * This script strips all of that, leaving the dump untouched as the source of
 * record. **The application imports the generated file, never the dump.**
 *
 * Run it with `npm run data:build`. It also runs automatically via `prebuild`,
 * so a production build can never ship a stale catalogue. The output is
 * committed so that a fresh clone can `npm run dev` straight away.
 *
 * Node-only: this runs in the build, never in the browser.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const source = new URL("src/data/project_data.json", root);
const target = new URL("src/data/listings.json", root);

/**
 * Every field the UI actually reads. **Anything not listed here is dropped.**
 *
 * If a field is missing at runtime, add it here and re-run `npm run data:build`.
 *
 * @type {string[]}
 */
const KEEP = [
  "id",
  "country",
  "city",
  "neighbourhood",
  "name",
  "space",
  "host_name",
  "host_since",
  "host_response_time",
  "property_type",
  "accommodates",
  "bathrooms",
  "bedrooms",
  "beds",
  "price",
  "cleaning_fee",
  "review_scores_rating",
  "cancellation_policy",
];

/**
 * Reduces one source record to the fields the UI renders.
 *
 * Null and undefined fields are omitted entirely rather than serialised, which
 * is why consumers must treat every optional field as possibly absent.
 *
 * @param {object} listing A record from the source dump.
 * @returns {object} The slimmed record.
 */
const slim = (listing) => {
  const out = {};
  for (const key of KEEP) {
    if (listing[key] !== null && listing[key] !== undefined) {
      out[key] = listing[key];
    }
  }
  // Details falls back to `description` only when `space` is missing, so carry
  // it for exactly those listings rather than for all 100.
  if (!out.space && listing.description) out.space = listing.description;
  out.picture_url = { url: listing.picture_url.url };
  return out;
};

const raw = JSON.parse(await readFile(source, "utf8"));
const listings = raw.results.map(slim);
await writeFile(target, `${JSON.stringify(listings)}\n`);

const before = Buffer.byteLength(JSON.stringify(raw));
const after = Buffer.byteLength(JSON.stringify(listings));
const pct = (((before - after) / before) * 100).toFixed(0);
console.log(
  `${fileURLToPath(target).split("/").slice(-2).join("/")}: ` +
    `${(before / 1024).toFixed(1)} kB -> ${(after / 1024).toFixed(1)} kB (-${pct}%), ` +
    `${listings.length} listings`,
);
