/**
 * Data Migration Script for KIDAMI
 * Inserts data into kidami_ prefixed tables
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "https://yklxtfilguqyfrxzfgzh.supabase.co";
const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!key) {
  console.error("❌ Need SUPABASE_SERVICE_KEY or SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

const TABLES = {
  products: "kidami_products",
  articles: "kidami_articles",
  reviews: "kidami_reviews",
  seoSettings: "kidami_seo_settings",
};

const products = [
  {
    slug: "offroad-6x6-set",
    name: "6x6 Off-Road Pull Back Die Cast Metal Toy Cars (4-Pack)",
    category: "cars",
    skills: ["hands-on", "outdoor"],
    age: "3+",
    tagline: "Four rugged 6-wheel pull back cars with opening doors — durable metal trucks built for big backyard adventures.",
    keywords: ["die cast metal toy cars", "pull back cars", "cars with opening doors", "durable metal cars", "toy cars for kids"],
    price_hint: "$24–32",
    image_url: "/images/cars-6x6-set.jpg",
    rating: 4.8,
    review_count: 326,
    features: [
      { icon: "metal", label: "Die Cast Metal Body", desc: "Real weight, real feel — zinc alloy shell that survives drops and tumbles." },
      { icon: "pullback", label: "Pull Back Action", desc: "Pull back, let go, and watch it zoom — no batteries needed, ever." },
      { icon: "doors", label: "Opening Doors", desc: "Doors that really open reward curious little hands and spark pretend play." },
      { icon: "gift", label: "Gift-Ready Set", desc: "Four bold colors in one set — the birthday gift that always lands." },
    ],
    specs: [
      { label: "Material", value: "Die cast zinc alloy + BPA-free ABS" },
      { label: "Scale", value: "1:64 (approx. 3.5 in per truck)" },
      { label: "Age", value: "3 years and up" },
      { label: "Drive", value: "Pull-back friction motor" },
      { label: "Certification", value: "ASTM F963 · CPC certified" },
      { label: "In the box", value: "4 × 6x6 off-road trucks" },
    ],
    education: "Oversized 6-wheel trucks invite pushing, pulling and steering — the exact motions that build fine motor control in preschoolers.",
    amazon_url: "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542?utm_content=offroad-6x6-set",
    walmart_url: "https://www.walmart.com/seller/10003181114",
    is_active: true,
    sort_order: 1,
  },
  {
    slug: "city-heroes-collection",
    name: "City Heroes Toy Cars for Kids — 9 Realistic Pull Back Vehicles",
    category: "cars",
    skills: ["hands-on", "outdoor"],
    age: "3+",
    tagline: "School bus, police cruiser, SWAT truck and more — nine realistic die cast metal toy cars, a whole city in one box.",
    keywords: ["toy cars for kids", "realistic toy cars", "die cast metal toy cars", "pull back cars", "safe toy cars for kids"],
    price_hint: "$29–39",
    image_url: "/images/cars-collection.jpg",
    rating: 4.9,
    review_count: 512,
    features: [
      { icon: "city", label: "9 Realistic Vehicles", desc: "School bus, police van, SWAT truck, retro bus — every vehicle a kid points at on the street." },
      { icon: "metal", label: "Die Cast Metal Body", desc: "Premium metal shell with vibrant, chip-resistant paint." },
      { icon: "pullback", label: "Pull Back Action", desc: "Every car races on its own — line them up and hold a grand prix." },
      { icon: "story", label: "Story-Starter Set", desc: "Rescue missions, school runs, parades — instant worlds for imaginative play." },
    ],
    specs: [
      { label: "Material", value: "Die cast zinc alloy + BPA-free ABS" },
      { label: "Scale", value: "1:64" },
      { label: "Age", value: "3 years and up" },
      { label: "Drive", value: "Pull-back friction motor" },
      { label: "Certification", value: "ASTM F963 · CPC certified" },
      { label: "In the box", value: "9 city vehicles" },
    ],
    education: "Role-playing a working city teaches kids how communities function — who keeps us safe, who takes us to school.",
    amazon_url: "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542?utm_content=city-heroes-collection",
    walmart_url: "https://www.walmart.com/seller/10003181114",
    is_active: true,
    sort_order: 2,
  },
  {
    slug: "classic-5-pack",
    name: "Classic 1:64 Diecast Cars Toy Car Gift Set with Display Box (5-Pack)",
    category: "cars",
    skills: ["hands-on"],
    age: "3+",
    tagline: "Five collectible 1:64 diecast cars in a display-worthy window box — the toy car gift set that needs no wrapping.",
    keywords: ["toy car gift set", "collectible toy cars", "1:64 diecast cars", "die cast metal toy cars", "toy cars with storage case"],
    price_hint: "$19–25",
    image_url: "/images/cars-5pack-box.jpg",
    rating: 4.7,
    review_count: 189,
    features: [
      { icon: "gift", label: "Display Gift Box", desc: "Window box shows all five cars and doubles as a storage case." },
      { icon: "metal", label: "Exquisite Metal", desc: "Smooth gloss paint over solid die cast metal, in vibrant collectible colors." },
      { icon: "doors", label: "Opening Doors", desc: "Every door opens on a real hinge — the detail kids never stop testing." },
      { icon: "pullback", label: "Pull Back Action", desc: "Friction motor inside every car. Battery-free, forever." },
    ],
    specs: [
      { label: "Material", value: "Die cast zinc alloy + BPA-free ABS" },
      { label: "Scale", value: "1:64" },
      { label: "Box size", value: "11.5 × 4.2 × 1.5 in" },
      { label: "Age", value: "3 years and up" },
      { label: "Certification", value: "ASTM F963 · CPC certified" },
      { label: "In the box", value: "5 collectible cars in display box" },
    ],
    education: "A first collection teaches care and pride of ownership. Kids learn to line up, compare and tell stories about each model.",
    amazon_url: "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542?utm_content=classic-5-pack",
    walmart_url: "https://www.walmart.com/seller/10003181114",
    is_active: true,
    sort_order: 3,
  },
  {
    slug: "magnetic-ludo",
    name: "Magnetic Ludo Board Game — Travel Board Game for Kids & Family",
    category: "games",
    skills: ["early-learning", "family-time"],
    age: "6+",
    tagline: "The classic ludo board game, rebuilt as a magnetic travel board game for planes, trains and restaurant tables.",
    keywords: ["ludo board game", "magnetic board games", "travel board games", "board games for kids"],
    price_hint: "$12–16",
    image_url: "/images/ludo-kids-play.jpg",
    rating: 4.8,
    review_count: 274,
    features: [
      { icon: "magnet", label: "Magnetic Pieces", desc: "Pieces click onto the board and stay put — no lost pawns under airplane seats." },
      { icon: "travel", label: "Folds to Travel Size", desc: "Folds flat into any backpack. Screen-free entertainment anywhere." },
      { icon: "family", label: "2–4 Players", desc: "Siblings, parents, grandparents — everyone plays, everyone laughs." },
      { icon: "brain", label: "Strategy Starter", desc: "Counting, probability and turn-taking disguised as a race home." },
    ],
    specs: [
      { label: "Board", value: "Folding magnetic board, 8 × 8 in open" },
      { label: "Pieces", value: "16 magnetic pawns + 1 die" },
      { label: "Players", value: "2–4" },
      { label: "Age", value: "6 years and up" },
      { label: "Certification", value: "ASTM F963 · CPC certified" },
      { label: "Game time", value: "15–30 minutes" },
    ],
    education: "Ludo is a logic gym: kids count spaces, weigh risks and practice winning and losing gracefully.",
    amazon_url: "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542?utm_content=magnetic-ludo",
    walmart_url: "https://www.walmart.com/seller/10003181114",
    is_active: true,
    sort_order: 4,
  },
  {
    slug: "snakes-and-ladders",
    name: "Snakes and Ladders — Magnetic Travel Board Game for Kids 6+",
    category: "games",
    skills: ["early-learning", "family-time"],
    age: "6+",
    tagline: "Snakes and ladders with magnetic pieces that stay put — the timeless game of lucky climbs, made travel-proof.",
    keywords: ["snakes and ladders", "magnetic board games", "travel board games", "board games for kids"],
    price_hint: "$12–16",
    image_url: "/images/snakes-ladders.jpg",
    rating: 4.7,
    review_count: 156,
    features: [
      { icon: "magnet", label: "Magnetic Board & Pieces", desc: "Pieces stay exactly where they land — play continues even on bumpy rides." },
      { icon: "numbers", label: "1–100 Number Grid", desc: "Every move is real counting practice across a full hundred board." },
      { icon: "travel", label: "Take It Anywhere", desc: "Compact fold-out board slips into carry-ons, totes and glove boxes." },
      { icon: "family", label: "All Ages Together", desc: "Simple rules mean a 6-year-old can beat grandpa — and often does." },
    ],
    specs: [
      { label: "Board", value: "8 × 8 in folding magnetic board" },
      { label: "Pieces", value: "4 magnetic pawns + 1 die" },
      { label: "Players", value: "2–4" },
      { label: "Age", value: "6 years and up" },
      { label: "Certification", value: "ASTM F963 · CPC certified" },
      { label: "Game time", value: "10–25 minutes" },
    ],
    education: "Numbered squares turn every turn into arithmetic practice. Kids read numbers to 100, count on, and experience the emotional roller-coaster of chance.",
    amazon_url: "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542?utm_content=snakes-and-ladders",
    walmart_url: "https://www.walmart.com/seller/10003181114",
    is_active: true,
    sort_order: 5,
  },
];

const articles = [
  {
    slug: "die-cast-cars-fine-motor-stem",
    title: "How Die Cast Metal Toy Cars Build Fine Motor Skills and STEM Thinking",
    category: "STEM",
    minutes: 6,
    excerpt: "Pushing, steering and parking tiny cars is more than play — it's precision training for small hands and a first course in physics.",
    image_url: "/images/cars-open-doors.jpg",
    is_published: true,
  },
  {
    slug: "family-game-night-magnetic-ludo",
    title: "Best Board Games for Family Night: Why a Magnetic Ludo Board Game Always Wins",
    category: "Buying Guide",
    minutes: 5,
    excerpt: "Fifteen minutes, four players, zero screens. Here's the research on why simple race games create the strongest family rituals.",
    image_url: "/images/ludo-kids-play.jpg",
    is_published: true,
  },
  {
    slug: "travel-games-screen-free",
    title: "Travel Board Games for Kids: Screen-Free Fun That Actually Survives the Trip",
    category: "Parenting",
    minutes: 4,
    excerpt: "Magnetic pieces, folding boards and games under 30 minutes — the checklist for travel toys that get played with, not lost.",
    image_url: "/images/boardgame-gift.jpg",
    is_published: true,
  },
];

const reviews = [
  { name: "Jessica M.", source: "Amazon Verified Purchase", stars: 5, text: "My 4-year-old has thrown these trucks down the stairs more times than I can count. Not a scratch. The doors still open perfectly.", product_name: "6x6 Off-Road Set", is_approved: true },
  { name: "David R.", source: "Amazon Verified Purchase", stars: 5, text: "Bought the 9-car set for my son's birthday. The weight of the metal feels premium — nothing like the plastic cars we had before.", product_name: "City Heroes Collection", is_approved: true },
  { name: "Priya K.", source: "Amazon Verified Purchase", stars: 5, text: "The magnetic Ludo saved our 6-hour flight. Pieces never moved, both kids played the entire trip. Buying a second one for the grandparents.", product_name: "Magnetic Travel Ludo", is_approved: true },
  { name: "Tom & Elena W.", source: "Amazon Verified Purchase", stars: 5, text: "Family game night is now a thing in our house. Snakes & Ladders is simple enough for our 6-year-old and still fun for us.", product_name: "Snakes & Ladders", is_approved: true },
];

const seoSettings = [
  {
    page_path: "/", lang_code: "en",
    title: "KIDAMI — Die Cast Metal Toy Cars & Magnetic Travel Board Games for Kids",
    description: "KIDAMI crafts die cast metal toy cars (ages 3+) — pull back cars with opening doors, 1:64 diecast cars gift sets — and magnetic travel board games (ages 6+) like ludo and snakes and ladders. ASTM F963 & CPC certified.",
    keywords: ["die cast metal toy cars", "toy cars", "magnetic board games", "KIDAMI"],
    og_title: "KIDAMI — Die Cast Metal Toy Cars & Magnetic Travel Board Games",
    og_description: "Pull back cars with opening doors (ages 3+), magnetic travel board games (ages 6+). Safe by certification, loved by kids, trusted by parents.",
    og_image_url: "https://kidami-ent.com/images/cars-collection.jpg",
    canonical_url: "https://kidami-ent.com/",
    robots_meta: "index, follow, max-image-preview:large",
    priority: 1.0, changefreq: "weekly", is_active: true,
  },
  {
    page_path: "/products", lang_code: "en",
    title: "Shop Die Cast Metal Toy Cars & Magnetic Travel Board Games",
    description: "Browse KIDAMI pull back cars with opening doors, 1:64 diecast toy car gift sets (ages 3+) and magnetic travel board games like ludo and snakes and ladders (ages 6+).",
    keywords: ["toy cars", "board games", "KIDAMI shop"],
    priority: 0.8, changefreq: "weekly", is_active: true,
  },
  {
    page_path: "/about", lang_code: "en",
    title: "Our Story — A Companion of Childhood, A Keeper of Memories",
    description: "Founded in 2016, KIDAMI crafts premium, safe, educational toys. Discover our mission, values and quality commitments.",
    keywords: ["KIDAMI story", "toy brand", "about KIDAMI"],
    priority: 0.6, changefreq: "monthly", is_active: true,
  },
];

async function migrate() {
  console.log("🚀 Starting KIDAMI data migration...\n");

  // Products
  console.log("📦 Inserting products...");
  const { data: pData, error: pErr } = await supabase.from(TABLES.products).insert(products).select();
  if (pErr) console.error("❌ Products error:", pErr.message);
  else console.log("✅ Products inserted:", pData?.length);

  // Articles
  console.log("📝 Inserting articles...");
  const { data: aData, error: aErr } = await supabase.from(TABLES.articles).insert(articles).select();
  if (aErr) console.error("❌ Articles error:", aErr.message);
  else console.log("✅ Articles inserted:", aData?.length);

  // Reviews
  console.log("⭐ Inserting reviews...");
  const { data: rData, error: rErr } = await supabase.from(TABLES.reviews).insert(reviews).select();
  if (rErr) console.error("❌ Reviews error:", rErr.message);
  else console.log("✅ Reviews inserted:", rData?.length);

  // SEO
  console.log("🔍 Inserting SEO settings...");
  const { data: sData, error: sErr } = await supabase.from(TABLES.seoSettings).insert(seoSettings).select();
  if (sErr) console.error("❌ SEO error:", sErr.message);
  else console.log("✅ SEO settings inserted:", sData?.length);

  console.log("\n🎉 Migration complete!");
}

migrate().catch(console.error);
