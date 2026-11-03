// Build public/data/plants.geojson. Run once: npm run data
// Source: WRI Global Power Plant Database v1.3.0 (CC BY 4.0).
import { mkdirSync, writeFileSync } from 'node:fs';

const CSV_URL =
  'https://raw.githubusercontent.com/wri/global-power-plant-database/master/output_database/global_power_plant_database.csv';

const MAIN_FUELS = ['Solar', 'Wind', 'Hydro', 'Gas', 'Coal', 'Oil', 'Nuclear', 'Geothermal'];

// A small CSV reader that understands quoted fields.
const parseCsv = (text) => {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
};

const csv = await (await fetch(CSV_URL)).text();
const features = parseCsv(csv).map((p) => ({
  type: 'Feature',
  properties: {
    name: p.name,
    country: p.country_long,
    fuel: MAIN_FUELS.includes(p.primary_fuel) ? p.primary_fuel : 'Other',
    mw: Math.round(Number(p.capacity_mw) * 10) / 10,
    // Left as null when the source has no year. About half the plants have none.
    year: p.commissioning_year ? Math.floor(Number(p.commissioning_year)) : null,
  },
  geometry: {
    type: 'Point',
    coordinates: [Number(Number(p.longitude).toFixed(3)), Number(Number(p.latitude).toFixed(3))],
  },
}));

mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/plants.geojson', JSON.stringify({ type: 'FeatureCollection', features }));
console.log(`plants.geojson: ${features.length} plants`);
