import fs from "fs";
import path from "path";

const dist = path.resolve("dist");
const index = path.join(dist, "index.html");
if (!fs.existsSync(index)) {
  console.error("dist/index.html missing");
  process.exit(1);
}
const html = fs.readFileSync(index);

const pages = [
  "about",
  "faq",
  "contact",
  "privacy",
  "terms",
  "products",
  "explore",
  "learn",
  "wholesale",
  "video",
  "products/offroad-6x6-set",
  "products/city-heroes-collection",
  "products/classic-5-pack",
  "products/magnetic-ludo",
  "products/snakes-and-ladders",
  "learn/die-cast-cars-fine-motor-stem",
  "learn/family-game-night-magnetic-ludo",
  "learn/travel-games-screen-free",
];

for (const page of pages) {
  const dest = path.join(dist, `${page}.html`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log("wrote", page + ".html");
}
