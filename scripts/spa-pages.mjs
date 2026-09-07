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
];
for (const page of pages) {
  fs.writeFileSync(path.join(dist, `${page}.html`), html);
  console.log("wrote", page + ".html");
}
