export type Category = "cars" | "games";
export type Skill = "hands-on" | "outdoor" | "early-learning" | "family-time";

/** Shop-by-audience entrances — images are stable assets, copy lives in i18n */
export type Audience = "parents" | "grandparents" | "family" | "luxury";
export const audiences: { key: Audience; img: string }[] = [
  { key: "parents", img: "/images/scene-play-indoor.jpg" },
  { key: "grandparents", img: "/images/scene-grandparents-gift.jpg" },
  { key: "family", img: "/images/scene-picnic.jpg" },
  { key: "luxury", img: "/images/scene-collector-display.jpg" },
];

/** Real storefronts */
export const AMAZON_STORE =
  "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542";
export const WALMART_STORE = "https://www.walmart.com/seller/10003181114";

export function amazonCta(content: string): string {
  return `${AMAZON_STORE}?utm_source=kidami_site&utm_medium=cta&utm_campaign=brand_portal&utm_content=${content}`;
}

export function walmartCta(content: string): string {
  return `${WALMART_STORE}?utm_source=kidami_site&utm_medium=cta&utm_campaign=brand_portal&utm_content=${content}`;
}

export interface SkillInfo {
  key: Skill;
  name: string;
  zh: string;
  icon: string;
  color: string;
  tagline: string;
  status: "live" | "soon";
}

/** 童年灵感库 — shop by play skill, with room to grow */
export const skills: SkillInfo[] = [
  {
    key: "hands-on",
    name: "Hands-On Skills",
    zh: "动手力培养",
    icon: "metal",
    color: "#2E6BF0",
    tagline: "Gripping, steering, opening, building — little hands learn by doing.",
    status: "live",
  },
  {
    key: "outdoor",
    name: "Outdoor Adventure",
    zh: "户外探索",
    icon: "travel",
    color: "#F4581C",
    tagline: "Toys tough enough for the backyard, the park and everywhere in between.",
    status: "live",
  },
  {
    key: "early-learning",
    name: "Early Learning",
    zh: "益智启蒙",
    icon: "brain",
    color: "#12B76A",
    tagline: "Numbers, logic and first strategy — the foundations of curious minds.",
    status: "live",
  },
  {
    key: "family-time",
    name: "Family Time",
    zh: "亲子互动",
    icon: "family",
    color: "#FFC92E",
    tagline: "Games that gather everyone around the same table, laughing.",
    status: "live",
  },
];

/** 未来品类预告 */
export const comingSoon = [
  { name: "Building & Construction", zh: "建构积木", icon: "city", note: "Bigger builds for growing engineers" },
  { name: "Pretend & Role Play", zh: "角色扮演", icon: "story", note: "Kitchens, workshops and little worlds" },
  { name: "Arts & Creativity", zh: "艺术创意", icon: "spark", note: "Messy hands, proud masterpieces" },
];

export interface Product {
  slug: string;
  name: string;
  category: Category;
  skills: Skill[];
  age: string;
  tagline: string;
  keywords: string[];
  priceHint: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  badges: string[];
  features: { icon: string; label: string; desc: string }[];
  specs: { label: string; value: string }[];
  education: string;
  amazonUrl: string;
  walmartUrl: string;
}

export const products: Product[] = [
  {
    slug: "offroad-6x6-set",
    name: "6x6 Off-Road Pull Back Die Cast Metal Toy Cars (4-Pack)",
    category: "cars",
    skills: ["hands-on", "outdoor"],
    age: "3+",
    tagline: "Four rugged 6-wheel pull back cars with opening doors — durable metal trucks built for big backyard adventures.",
    keywords: ["die cast metal toy cars", "pull back cars", "cars with opening doors", "durable metal cars", "toy cars for kids"],
    priceHint: "$24–32",
    image: "/images/cars-6x6-set.jpg",
    gallery: ["/images/cars-6x6-set.jpg", "/images/cars-open-doors.jpg"],
    rating: 4.8,
    reviewCount: 326,
    badges: ["Die Cast Metal", "Pull Back", "Opening Doors"],
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
    education:
      "Oversized 6-wheel trucks invite pushing, pulling and steering — the exact motions that build fine motor control in preschoolers. Comparing wheels, axles and truck beds is a child's first lesson in engineering thinking.",
    amazonUrl: amazonCta("offroad-6x6-set"),
    walmartUrl: WALMART_STORE,
  },
  {
    slug: "city-heroes-collection",
    name: "City Heroes Toy Cars for Kids — 9 Realistic Pull Back Vehicles",
    category: "cars",
    skills: ["hands-on", "outdoor"],
    age: "3+",
    tagline: "School bus, police cruiser, SWAT truck and more — nine realistic die cast metal toy cars, a whole city in one box.",
    keywords: ["toy cars for kids", "realistic toy cars", "die cast metal toy cars", "pull back cars", "safe toy cars for kids"],
    priceHint: "$29–39",
    image: "/images/cars-collection.jpg",
    gallery: ["/images/cars-collection.jpg", "/images/cars-open-doors.jpg"],
    rating: 4.9,
    reviewCount: 512,
    badges: ["9 Vehicles", "Pull Back", "Opening Doors"],
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
    education:
      "Role-playing a working city teaches kids how communities function — who keeps us safe, who takes us to school. Sorting, lining up and racing nine different vehicles builds categorization skills and early math intuition.",
    amazonUrl: amazonCta("city-heroes-collection"),
    walmartUrl: WALMART_STORE,
  },
  {
    slug: "classic-5-pack",
    name: "Classic 1:64 Diecast Cars Toy Car Gift Set with Display Box (5-Pack)",
    category: "cars",
    skills: ["hands-on"],
    age: "3+",
    tagline: "Five collectible 1:64 diecast cars in a display-worthy window box — the toy car gift set that needs no wrapping.",
    keywords: ["toy car gift set", "collectible toy cars", "1:64 diecast cars", "die cast metal toy cars", "toy cars with storage case"],
    priceHint: "$19–25",
    image: "/images/cars-5pack-box.jpg",
    gallery: ["/images/cars-5pack-box.jpg", "/images/cars-premium-dark.jpg"],
    rating: 4.7,
    reviewCount: 189,
    badges: ["Gift Box", "1:64 Scale", "Collectible"],
    features: [
      { icon: "gift", label: "Display Gift Box", desc: "Window box shows all five cars and doubles as a storage case — straight to the party, no wrapping needed." },
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
    education:
      "A first collection teaches care and pride of ownership. Kids learn to line up, compare and tell stories about each model — early classification and narrative skills wrapped in pure fun.",
    amazonUrl: amazonCta("classic-5-pack"),
    walmartUrl: WALMART_STORE,
  },
  {
    slug: "magnetic-ludo",
    name: "Magnetic Ludo Board Game — Travel Board Game for Kids & Family",
    category: "games",
    skills: ["early-learning", "family-time"],
    age: "6+",
    tagline: "The classic ludo board game, rebuilt as a magnetic travel board game for planes, trains and restaurant tables.",
    keywords: ["ludo board game", "magnetic board games", "travel board games", "board games for kids"],
    priceHint: "$12–16",
    image: "/images/ludo-kids-play.jpg",
    gallery: ["/images/ludo-kids-play.jpg", "/images/boardgame-gift.jpg"],
    rating: 4.8,
    reviewCount: 274,
    badges: ["Magnetic", "Travel Size", "Family Night"],
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
    education:
      "Ludo is a logic gym: kids count spaces, weigh risks ('safe square or push ahead?') and practice winning and losing gracefully. It's probability, patience and family bonding in one small box.",
    amazonUrl: amazonCta("magnetic-ludo"),
    walmartUrl: WALMART_STORE,
  },
  {
    slug: "snakes-and-ladders",
    name: "Snakes and Ladders — Magnetic Travel Board Game for Kids 6+",
    category: "games",
    skills: ["early-learning", "family-time"],
    age: "6+",
    tagline: "Snakes and ladders with magnetic pieces that stay put — the timeless game of lucky climbs, made travel-proof.",
    keywords: ["snakes and ladders", "magnetic board games", "travel board games", "board games for kids"],
    priceHint: "$12–16",
    image: "/images/snakes-ladders.jpg",
    gallery: ["/images/snakes-ladders.jpg", "/images/boardgame-gift.jpg"],
    rating: 4.7,
    reviewCount: 156,
    badges: ["Magnetic", "Number Skills", "Travel Size"],
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
    education:
      "Numbered squares turn every turn into arithmetic practice. Kids read numbers to 100, count on, and experience the emotional roller-coaster of chance — resilience training disguised as play.",
    amazonUrl: amazonCta("snakes-and-ladders"),
    walmartUrl: WALMART_STORE,
  },
];

export const articles = [
  {
    slug: "die-cast-cars-fine-motor-stem",
    title: "How Die Cast Metal Toy Cars Build Fine Motor Skills and STEM Thinking",
    category: "STEM",
    minutes: 6,
    excerpt:
      "Pushing, steering and parking tiny cars is more than play — it's precision training for small hands and a first course in physics.",
    image: "/images/cars-open-doors.jpg",
    body: [
      "Watch a toddler with a die cast car and you'll see a tiny engineer at work. Gripping the body, aiming it at a ramp, steering around obstacles — every motion is a repetition that strengthens the small muscles of the hand and wrist. Occupational therapists call this fine motor practice, and it is the same foundation children later need for holding a pencil, using scissors and buttoning a coat.",
      "Die cast metal cars add something plastic cars can't: real weight. The heft of a zinc-alloy body gives a child's hand richer sensory feedback, so the brain learns to calibrate grip pressure — squeeze too little and the car slips, too much and steering suffers. That constant, playful calibration is exactly how precise motor control develops.",
      "Pull-back friction motors turn play into a first physics lesson. Children quickly discover cause and effect: pull further, go faster. They begin predicting distances, comparing which car travels furthest, and adjusting their technique — hypothesis, test, result. Without hearing the words, they are practicing the scientific method.",
      "Opening doors, hoods and trunks invite a different kind of exploration: understanding how parts relate to wholes. Kids learn that mechanisms have order — a door opens outward, not upward — and they rehearse real-world schemas they see in the family car every day.",
      "The simplest way to support this learning is to play alongside: build parking lots from blocks, draw roads with tape, sort cars by color or size, and narrate what your child is doing. The toy does the teaching; your attention makes it stick.",
    ],
  },
  {
    slug: "family-game-night-magnetic-ludo",
    title: "Best Board Games for Family Night: Why a Magnetic Ludo Board Game Always Wins",
    category: "Buying Guide",
    minutes: 5,
    excerpt:
      "Fifteen minutes, four players, zero screens. Here's the research on why simple race games create the strongest family rituals.",
    image: "/images/ludo-kids-play.jpg",
    body: [
      "Family therapists often point to shared rituals as the glue of strong families — and few rituals are easier to keep than a weekly game night. The best games for it share three traits: rules a six-year-old can explain, a play time under thirty minutes, and enough luck that kids regularly beat the adults.",
      "Ludo checks every box. The rules fit on an index card, a round lasts fifteen to twenty minutes, and the dice keep every game winnable until the final stretch. That balance of luck and choice matters more than it seems: children stay engaged because victory is always possible, while adults stay engaged because the decisions — which pawn to move, when to play it safe — are genuinely interesting.",
      "Underneath the laughter, a ludo board game is quiet training. Kids count spaces, weigh risks, practice waiting for their turn, and learn to lose without melting down. Psychologists call this emotional regulation, and research on play-based learning consistently finds that games teach it better than lectures ever could.",
      "Why magnetic? Because family night doesn't always happen at home. A magnetic travel board game keeps its pieces exactly where they land — on a train tray, a restaurant table, or a blanket at the park. No lost pawns, no interrupted games, no 'we'll finish it later' that never happens.",
      "Start simple: pick one evening, keep snacks easy, let the kids choose the game, and put every phone in another room. After a few weeks you won't be scheduling family night — your kids will be reminding you.",
    ],
  },
  {
    slug: "travel-games-screen-free",
    title: "Travel Board Games for Kids: Screen-Free Fun That Actually Survives the Trip",
    category: "Parenting",
    minutes: 4,
    excerpt:
      "Magnetic pieces, folding boards and games under 30 minutes — the checklist for travel toys that get played with, not lost.",
    image: "/images/boardgame-gift.jpg",
    body: [
      "Every parent knows the pattern: you pack a bag of 'travel toys', and by the end of the trip half the pieces are under an airplane seat. The problem usually isn't the child — it's the toy. Travel play has its own rules, and most toys simply weren't designed for it.",
      "The checklist is short. First, pieces must stay put: magnetic boards and pieces survive turbulence, bumpy back seats and wobbly café tables. Second, the game must fold small enough to disappear into a carry-on or glove box. Third, a round should finish in under thirty minutes, matching the real attention windows of travel — boarding calls, meal carts, and naps.",
      "Games also beat screens on trips for a subtler reason: they keep kids connected to the people around them. A travel board game turns a delay into a shared memory instead of two hours of silent scrolling. Siblings negotiate, grandparents join in, and the journey itself becomes part of the vacation.",
      "Our favorites for the road: a magnetic ludo board game for ages 6+, snakes and ladders for quick ten-minute rounds, and a small die cast car or two for imaginative play at rest stops. That kit weighs less than a tablet — and unlike a tablet, it never runs out of battery.",
      "One practical tip: introduce the game at home before the trip. Kids who already know the rules reach for the game themselves, which is the difference between a toy that gets played with and one that gets packed home untouched.",
    ],
  },
];

export const reviews = [
  {
    name: "Jessica M.",
    source: "Amazon Verified Purchase",
    stars: 5,
    text: "My 4-year-old has thrown these trucks down the stairs more times than I can count. Not a scratch. The doors still open perfectly.",
    product: "6x6 Off-Road Set",
  },
  {
    name: "David R.",
    source: "Amazon Verified Purchase",
    stars: 5,
    text: "Bought the 9-car set for my son's birthday. The weight of the metal feels premium — nothing like the plastic cars we had before.",
    product: "City Heroes Collection",
  },
  {
    name: "Priya K.",
    source: "Amazon Verified Purchase",
    stars: 5,
    text: "The magnetic Ludo saved our 6-hour flight. Pieces never moved, both kids played the entire trip. Buying a second one for the grandparents.",
    product: "Magnetic Travel Ludo",
  },
  {
    name: "Tom & Elena W.",
    source: "Amazon Verified Purchase",
    stars: 5,
    text: "Family game night is now a thing in our house. Snakes & Ladders is simple enough for our 6-year-old and still fun for us.",
    product: "Snakes & Ladders",
  },
];

/** The 10 site languages (English default) */
export const languages = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "pt", name: "Português", dir: "ltr" },
  { code: "fr", name: "Français", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "de", name: "Deutsch", dir: "ltr" },
  { code: "ja", name: "日本語", dir: "ltr" },
  { code: "ru", name: "Русский", dir: "ltr" },
  { code: "it", name: "Italiano", dir: "ltr" },
  { code: "ko", name: "한국어", dir: "ltr" },
] as const;
