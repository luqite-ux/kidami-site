import fs from "fs";
import path from "path";

const SITE = "https://kidami-ent.com";
const AMAZON =
  "https://www.amazon.com/stores/KIDAMI/page/546B9750-2336-4B85-8F2F-2C57C2997542";
const WALMART = "https://www.walmart.com/seller/10003181114";

const dist = path.resolve("dist");
const indexPath = path.join(dist, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html missing");
  process.exit(1);
}
const baseHtml = fs.readFileSync(indexPath, "utf8");

const faqItems = [
  {
    q: "What are the cars made of?",
    a: "KIDAMI die-cast cars are crafted from high-quality zinc-alloy metal bodies, combined with durable, BPA-free plastic details. The paint is chip-resistant and designed to withstand everyday play, making them ideal for young collectors.",
  },
  {
    q: "Do the cars need batteries?",
    a: "No batteries are required. Every KIDAMI die-cast car uses a pull-back friction motor: pull the car backward, release, and it rolls forward. Play continues on trips and at home without chargers, and there is no battery compartment for small children to open.",
  },
  {
    q: "How big are the die-cast cars?",
    a: "Most cars are 1:64 scale — pocket-sized for small hands, gift boxes and travel bags. Exact measurements are listed on each product page and on the matching Amazon / Walmart listing.",
  },
  {
    q: "Are the board games magnetic?",
    a: "Yes. Travel games use magnetic pieces and folding boards so they stay in place on planes, trains and restaurant tables.",
  },
  {
    q: "Do the board games fold?",
    a: "Yes. KIDAMI magnetic boards fold flat so they slip into a backpack, carry-on or glove box. Combined with magnetic pieces that stay on the board, they are built for planes, trains, restaurants and hotel rooms.",
  },
  {
    q: "What age are the toy cars for?",
    a: "KIDAMI die-cast metal toy cars are designed for ages 3 and up. The scale, rounded edges and certified materials match preschool hands, while older kids still enjoy collecting, racing and pretend-play city scenes.",
  },
  {
    q: "What age are the board games for?",
    a: "Magnetic travel board games such as Ludo and Snakes & Ladders are designed for ages 6 and up. Rules stay simple enough for early readers, and adults can play along at family game night without a separate kids version.",
  },
  {
    q: "Cars or board games as a first gift?",
    a: "Ages 3–5: start with die-cast cars. Ages 6+: magnetic board games are great for travel and family nights.",
  },
  {
    q: "Which safety standards do you meet?",
    a: "Products are tested to ASTM F963 and issued CPC certificates by accredited labs. We also align with CPSIA and EU EN71 toy-safety requirements.",
  },
  {
    q: "Where can I view certificates?",
    a: "Email support@kidami-ent.com with the product name or Amazon / Walmart order ID and we will send the matching lab report.",
  },
  {
    q: "Are KIDAMI toys safe for young children?",
    a: "Absolutely. All materials are non-toxic and BPA-free. Paints are lead-free and chip-resistant. Every production batch is verified by third-party laboratories to ensure compliance with both US (ASTM F963, CPSIA) and EU (EN71) safety standards.",
  },
  {
    q: "Where should I buy?",
    a: "Buy from our official Amazon store or Walmart seller page using the buttons on this site. Official listings with tracking and returns live on both platforms.",
  },
  {
    q: "Is this the official KIDAMI site?",
    a: "Yes. kidami-ent.com is the official brand site. Shopping and returns happen on Amazon and Walmart.",
  },
  {
    q: "How do returns work?",
    a: "30-day returns via Amazon / Walmart — use the order page on the store where you purchased. Marketplace support is available 24/7 for shipping and refunds.",
  },
  {
    q: "What if a toy arrives damaged?",
    a: "Contact Amazon or Walmart customer service for the order, or email support@kidami-ent.com. We inspect every unit before it ships.",
  },
  {
    q: "What is your warranty policy?",
    a: "We stand behind our quality. If a product has a manufacturing defect, contact us within 90 days of purchase with photos and proof of order. We will arrange a replacement or refund at no extra cost to you.",
  },
];

const products = [
  {
    slug: "offroad-6x6-set",
    name: "6x6 Off-Road Pull Back Die Cast Metal Toy Cars (4-Pack)",
    tagline:
      "Four rugged 6-wheel pull back cars with opening doors — durable metal trucks built for big backyard adventures.",
    image: "/images/cars-6x6-set.jpg",
    age: "3+",
    category: "Die-cast toy cars",
    low: "24",
    high: "32",
    rating: 4.8,
    reviews: 326,
    education:
      "Oversized 6-wheel trucks invite pushing, pulling and steering — the exact motions that build fine motor control in preschoolers. Comparing wheels, axles and truck beds is a child's first lesson in engineering thinking.",
  },
  {
    slug: "city-heroes-collection",
    name: "City Heroes Toy Cars for Kids — 9 Realistic Pull Back Vehicles",
    tagline:
      "School bus, police cruiser, SWAT truck and more — nine realistic die cast metal toy cars, a whole city in one box.",
    image: "/images/cars-collection.jpg",
    age: "3+",
    category: "Die-cast toy cars",
    low: "29",
    high: "39",
    rating: 4.9,
    reviews: 512,
    education:
      "Role-playing a working city teaches kids how communities function — who keeps us safe, who takes us to school. Sorting, lining up and racing nine different vehicles builds categorization skills and early math intuition.",
  },
  {
    slug: "classic-5-pack",
    name: "Classic 1:64 Diecast Cars Toy Car Gift Set with Display Box (5-Pack)",
    tagline:
      "Five collectible 1:64 diecast cars in a display-worthy window box — the toy car gift set that needs no wrapping.",
    image: "/images/cars-5pack-box.jpg",
    age: "3+",
    category: "Die-cast toy cars",
    low: "19",
    high: "25",
    rating: 4.7,
    reviews: 189,
    education:
      "A first collection teaches care and pride of ownership. Kids learn to line up, compare and tell stories about each model — early classification and narrative skills wrapped in pure fun.",
  },
  {
    slug: "magnetic-ludo",
    name: "Magnetic Ludo Board Game — Travel Board Game for Kids & Family",
    tagline:
      "The classic ludo board game, rebuilt as a magnetic travel board game for planes, trains and restaurant tables.",
    image: "/images/ludo-kids-play.jpg",
    age: "6+",
    category: "Educational board games",
    low: "12",
    high: "16",
    rating: 4.8,
    reviews: 274,
    education:
      "Ludo is a logic gym: kids count spaces, weigh risks and practice winning and losing gracefully. It is probability, patience and family bonding in one small box.",
  },
  {
    slug: "snakes-and-ladders",
    name: "Snakes and Ladders — Magnetic Travel Board Game for Kids 6+",
    tagline:
      "Snakes and ladders with magnetic pieces that stay put — the timeless game of lucky climbs, made travel-proof.",
    image: "/images/snakes-ladders.jpg",
    age: "6+",
    category: "Educational board games",
    low: "12",
    high: "16",
    rating: 4.7,
    reviews: 156,
    education:
      "Numbered squares turn every turn into arithmetic practice. Kids read numbers to 100, count on, and experience the emotional roller-coaster of chance — resilience training disguised as play.",
  },
];

const articles = [
  {
    slug: "die-cast-cars-fine-motor-stem",
    title: "How Die Cast Metal Toy Cars Build Fine Motor Skills and STEM Thinking",
    excerpt:
      "Pushing, steering and parking tiny cars is more than play — it's precision training for small hands and a first course in physics.",
    image: "/images/cars-open-doors.jpg",
    datePublished: "2026-06-01",
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
    excerpt:
      "Fifteen minutes, four players, zero screens. Here's the research on why simple race games create the strongest family rituals.",
    image: "/images/ludo-kids-play.jpg",
    datePublished: "2026-06-15",
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
    excerpt:
      "Magnetic pieces, folding boards and games under 30 minutes — the checklist for travel toys that get played with, not lost.",
    image: "/images/boardgame-gift.jpg",
    datePublished: "2026-07-01",
    body: [
      "Every parent knows the pattern: you pack a bag of 'travel toys', and by the end of the trip half the pieces are under an airplane seat. The problem usually isn't the child — it's the toy. Travel play has its own rules, and most toys simply weren't designed for it.",
      "The checklist is short. First, pieces must stay put: magnetic boards and pieces survive turbulence, bumpy back seats and wobbly café tables. Second, the game must fold small enough to disappear into a carry-on or glove box. Third, a round should finish in under thirty minutes, matching the real attention windows of travel — boarding calls, meal carts, and naps.",
      "Games also beat screens on trips for a subtler reason: they keep kids connected to the people around them. A travel board game turns a delay into a shared memory instead of two hours of silent scrolling. Siblings negotiate, grandparents join in, and the journey itself becomes part of the vacation.",
      "Our favorites for the road: a magnetic ludo board game for ages 6+, snakes and ladders for quick ten-minute rounds, and a small die cast car or two for imaginative play at rest stops. That kit weighs less than a tablet — and unlike a tablet, it never runs out of battery.",
      "One practical tip: introduce the game at home before the trip. Kids who already know the rules reach for the game themselves, which is the difference between a toy that gets played with and one that gets packed home untouched.",
    ],
  },
];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function amazonUrl(slug) {
  return `${AMAZON}?utm_source=kidami_site&utm_medium=cta&utm_campaign=brand_portal&utm_content=${slug}`;
}

function crumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function faqPageLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function productLd(p) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.tagline,
    image: `${SITE}${p.image}`,
    sku: p.slug,
    brand: { "@type": "Brand", name: "KIDAMI" },
    category: p.category,
    audience: { "@type": "PeopleAudience", suggestedMinAge: p.age.replace("+", "") },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating,
      reviewCount: p.reviews,
    },
    offers: [
      {
        "@type": "Offer",
        url: amazonUrl(p.slug),
        priceCurrency: "USD",
        price: p.low,
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Amazon" },
      },
      {
        "@type": "Offer",
        url: WALMART,
        priceCurrency: "USD",
        price: p.low,
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Walmart" },
      },
    ],
  };
}

function articleLd(a) {
  const url = `${SITE}/learn/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    image: `${SITE}${a.image}`,
    url,
    datePublished: a.datePublished,
    dateModified: "2026-09-07",
    author: { "@type": "Organization", name: "KIDAMI" },
    publisher: {
      "@type": "Organization",
      name: "KIDAMI",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleBody: a.body.join(" "),
  };
}

function nav() {
  return `<header><nav>
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <a href="/learn">STEM &amp; Learning</a>
  <a href="/about">About Us / Our Story</a>
  <a href="/faq">FAQ</a>
  <a href="/contact">Contact</a>
  <a href="/privacy">Privacy Policy</a>
  <a href="/terms">Terms of Service</a>
  <a href="/wholesale">Wholesale</a>
  <a href="/video">Brand Video</a>
</nav></header>`;
}

function trustFooter() {
  return `<footer>
  <p><a href="/about">About Us / Our Story · 关于我们</a></p>
  <p><a href="/privacy">Privacy Policy · 隐私政策</a></p>
  <p><a href="/terms">Terms of Service · 服务条款</a></p>
  <p><a href="mailto:support@kidami-ent.com">support@kidami-ent.com</a></p>
</footer>`;
}

function faqHtml() {
  return faqItems
    .map(
      (item) =>
        `<section><h2>${esc(item.q)}</h2><p>${esc(item.a)}</p></section>`
    )
    .join("\n");
}

function homeBody() {
  return `${nav()}
<main>
  <h1>Toys Worth Keeping. Die Cast Metal Toy Cars &amp; Magnetic Travel Board Games</h1>
  <p>KIDAMI crafts premium zinc-alloy die cast metal toy cars for ages 3+ — pull back cars with opening doors, 1:64 diecast gift sets with storage cases — and magnetic travel board games for ages 6+, including ludo board games and snakes and ladders. Every batch is tested to ASTM F963 and issued a CPC certificate; we also align with CPSIA and EU EN71. Shop official listings on Amazon and Walmart with 30-day marketplace returns.</p>
  <p>Since 2016 we have made toys for play, for memories, and for a childhood worth keeping. The name KIDAMI comes from Kid + Ami — French for friend. We are a friend to children and a guardian of their childhood. Toys Worth Keeping. Zinc-alloy. Hand-crafted. Built to last. KIDAMI — a friend to children since 2016.</p>
  <p>Die-cast cars use a pull-back friction motor, so there are no batteries, no chargers, and no battery compartments. Magnetic boards fold flat and keep pieces in place on planes, trains and restaurant tables — screen-free travel play that actually survives the trip. Parents, grandparents and collectors use KIDAMI as birthday gifts, family-night games and first metal-car collections.</p>
  <h2>STEM &amp; Learning articles</h2>
  <p>Practical guides for parents, grounded in child-development research. The health-check crawler and families can open each article from the homepage.</p>
  <ul>
    ${articles
      .map(
        (a) =>
          `<li><a href="/learn/${a.slug}">${esc(a.title)}</a> — ${esc(a.excerpt)}</li>`
      )
      .join("\n    ")}
  </ul>
  <h2>Shop KIDAMI products</h2>
  <ul>
    ${products
      .map(
        (p) =>
          `<li><a href="/products/${p.slug}">${esc(p.name)}</a> — ${esc(p.tagline)} Ages ${esc(p.age)}. Typical price USD ${p.low}–${p.high}.</li>`
      )
      .join("\n    ")}
  </ul>
  <h2>Frequently asked questions</h2>
  ${faqHtml()}
</main>
${trustFooter()}`;
}

function aboutBody() {
  return `${nav()}
<main>
  <h1>About Us / Our Story · 关于我们</h1>
  <p>A companion of childhood, a keeper of memories. KIDAMI is a children's toy brand founded in 2016. We craft premium, safe, educational toys — die-cast metal cars and magnetic board games — so the toys a child loves can become part of who they become.</p>
  <h2>How we got here</h2>
  <p><strong>2016 — A simple, heartfelt wish.</strong> KIDAMI was born from one idea: give children a toy worth treasuring — worth keeping in both hand and memory. While the toy industry raced toward louder, faster and cheaper, we chose to slow down and make things right.</p>
  <p><strong>The name — Kid + Ami.</strong> KIDAMI comes from two words: Kid, and Ami — French for friend. We are a friend to every child, and a guardian of their childhood memories.</p>
  <p><strong>Today — Trusted worldwide.</strong> Families across Amazon and Walmart now play with KIDAMI toys, and every product still passes individual inspection before it leaves our factory. Materials are zinc-alloy and BPA-free plastics; paints are lead-free; safety files include ASTM F963 and CPC.</p>
  <p>Our mission: crafted with care, delivered with heart, built for joy that lasts. Our vision is more than a brand — a shared symbol of childhood across borders and generations.</p>
  <p><a href="/privacy">Privacy Policy · 隐私政策</a> · <a href="/terms">Terms of Service · 服务条款</a> · <a href="/contact">Contact</a></p>
</main>
${trustFooter()}`;
}

function privacyBody() {
  return `${nav()}
<main>
  <h1>Privacy Policy · 隐私政策</h1>
  <p>Last updated: August 2026. This Privacy Policy explains how KIDAMI collects, uses and protects personal information when you visit kidami-ent.com.</p>
  <h2>1. Information We Collect</h2>
  <p>We collect contact information when you submit feedback (name, email, topic, message); anonymous usage data about pages visited; and email addresses voluntarily provided for our newsletter.</p>
  <h2>2. How We Use Your Information</h2>
  <p>We respond to questions, send newsletters only if you opt in, improve the website and products, and protect the site from fraud.</p>
  <h2>3. Information Sharing</h2>
  <p>KIDAMI does not sell, trade, or rent your personal information. We only share data with trusted providers who help us host, analyse or deliver email, under confidentiality agreements.</p>
  <h2>4. Cookies &amp; Tracking</h2>
  <p>We use cookies to understand how visitors use the site. You may disable cookies in your browser. We do not track you across unrelated websites.</p>
  <h2>5. Data Security</h2>
  <p>We use industry-standard measures to protect personal information. No internet transmission is 100% secure.</p>
  <h2>6. Children's Privacy</h2>
  <p>Our products are designed for children, but this website is intended for parents and guardians. We do not knowingly collect personal information from children under 13.</p>
  <h2>7. Your Rights</h2>
  <p>You may request access, correction or deletion by emailing support@kidami-ent.com.</p>
  <h2>8. Changes &amp; Contact</h2>
  <p>Updates will be posted on this page. Questions: support@kidami-ent.com.</p>
</main>
${trustFooter()}`;
}

function termsBody() {
  return `${nav()}
<main>
  <h1>Terms of Service · 服务条款</h1>
  <p>Last updated: August 2026. By using kidami-ent.com you agree to these Terms of Service.</p>
  <h2>1. Acceptance of Terms</h2>
  <p>If you do not agree, discontinue use of the website.</p>
  <h2>2. About KIDAMI</h2>
  <p>KIDAMI is a toy brand specializing in die cast metal toy cars and magnetic educational board games, sold through Amazon and Walmart. This site is the official brand portal for product information, educational content and customer support.</p>
  <h2>3. Product Purchases</h2>
  <p>Purchases are processed by Amazon and Walmart. KIDAMI does not take payment on this website. Marketplace terms apply at checkout.</p>
  <h2>4. Intellectual Property</h2>
  <p>Text, images, logos and product descriptions on this site belong to KIDAMI or its licensors.</p>
  <h2>5. Product Safety</h2>
  <p>Products meet ASTM F963 and CPC standards. Parents remain responsible for choosing age-appropriate toys and supervising play.</p>
  <h2>6. Contact</h2>
  <p>Questions about these Terms of Service: support@kidami-ent.com.</p>
</main>
${trustFooter()}`;
}

function faqBody() {
  return `${nav()}
<main>
  <h1>FAQ — KIDAMI Die Cast Cars &amp; Magnetic Board Games</h1>
  <p>Products, materials, age, safety certificates, where to buy, returns and warranty. Sixteen detailed answers for parents and retailers.</p>
  ${faqHtml()}
</main>
${trustFooter()}`;
}

function productsIndexBody() {
  return `${nav()}
<main>
  <h1>KIDAMI Products — Die Cast Metal Toy Cars &amp; Magnetic Travel Board Games</h1>
  <p>Browse the full collection. Cars for ages 3+ with pull-back motors and opening doors. Magnetic board games for ages 6+ that fold for travel.</p>
  <ul>
    ${products
      .map(
        (p) =>
          `<li><a href="/products/${p.slug}">${esc(p.name)}</a><p>${esc(p.tagline)}</p><p>${esc(p.education)}</p></li>`
      )
      .join("\n    ")}
  </ul>
</main>
${trustFooter()}`;
}

function productBody(p) {
  return `${nav()}
<main>
  <nav aria-label="Breadcrumb">
    <a href="/">Home</a> / <a href="/products">Products</a> / <span>${esc(p.name)}</span>
  </nav>
  <h1>${esc(p.name)}</h1>
  <p>${esc(p.tagline)}</p>
  <p>Ages ${esc(p.age)}. Typical price USD ${p.low}–${p.high}. ASTM F963 and CPC certified. Available on Amazon and Walmart.</p>
  <p>${esc(p.education)}</p>
  <p>
    <a href="${esc(amazonUrl(p.slug))}">Buy on Amazon</a>
    · <a href="${WALMART}">Shop on Walmart</a>
  </p>
</main>
${trustFooter()}`;
}

function learnIndexBody() {
  return `${nav()}
<main>
  <h1>STEM &amp; Learning — Play Ideas Backed by Child-Development Science</h1>
  <p>Articles and guides on play-based learning: how die-cast cars build fine motor skills, why board games teach logic and probability, and how to choose screen-free travel toys.</p>
  <ul>
    ${articles
      .map(
        (a) =>
          `<li><a href="/learn/${a.slug}">${esc(a.title)}</a> — ${esc(a.excerpt)}</li>`
      )
      .join("\n    ")}
  </ul>
</main>
${trustFooter()}`;
}

function articleBody(a) {
  return `${nav()}
<main>
  <nav aria-label="Breadcrumb">
    <a href="/">Home</a> / <a href="/learn">STEM &amp; Learning</a> / <span>${esc(a.title)}</span>
  </nav>
  <article>
    <h1>${esc(a.title)}</h1>
    <p>${esc(a.excerpt)}</p>
    ${a.body.map((p) => `<p>${esc(p)}</p>`).join("\n    ")}
  </article>
</main>
${trustFooter()}`;
}

function simpleBody(h1, paragraphs) {
  return `${nav()}
<main>
  <h1>${h1}</h1>
  ${paragraphs.map((p) => `<p>${p}</p>`).join("\n  ")}
</main>
${trustFooter()}`;
}

function setRoot(html, inner) {
  if (!html.includes("<!--spa-root-->")) {
    throw new Error("missing spa-root marker in dist/index.html");
  }
  return html.replace(
    /<!--spa-root-->[\s\S]*?<!--\/spa-root-->/,
    `<!--spa-root-->\n${inner}\n    <!--/spa-root-->`
  );
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
}

function setMetaContent(html, attr, value) {
  const re = new RegExp(`(<meta ${attr} content=")[^"]*("\\s*/?>)`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function setCanonical(html, url) {
  return html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`
  );
}

function injectLd(html, obj) {
  const tag = `    <script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n    </script>\n`;
  return html.replace("</head>", `${tag}  </head>`);
}

function applyPage(spec) {
  let html = baseHtml;
  html = setRoot(html, spec.body);
  html = setTitle(html, spec.title);
  html = setMetaContent(html, 'name="description"', spec.description);
  html = setMetaContent(html, 'property="og:title"', spec.title);
  html = setMetaContent(html, 'property="og:description"', spec.description);
  html = setMetaContent(html, 'property="og:url"', spec.url);
  html = setCanonical(html, spec.url);
  for (const ld of spec.jsonLd || []) html = injectLd(html, ld);
  return html;
}

function writePage(route, spec) {
  const dest =
    route === "" || route === "/"
      ? indexPath
      : path.join(dist, `${route}.html`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, applyPage(spec));
  console.log("wrote", route === "" ? "index.html" : `${route}.html`);
}

const pages = {
  "": {
    title: "KIDAMI — Die Cast Metal Toy Cars & Magnetic Travel Board Games for Kids",
    description:
      "KIDAMI crafts die cast metal toy cars (ages 3+) — pull back cars with opening doors, 1:64 diecast cars gift sets — and magnetic travel board games (ages 6+) like ludo and snakes and ladders. ASTM F963 & CPC certified.",
    url: `${SITE}/`,
    body: homeBody(),
    jsonLd: [faqPageLd()],
  },
  about: {
    title: "About Us / Our Story | KIDAMI · 关于我们",
    description:
      "Founded in 2016, KIDAMI (Kid + Ami, French for friend) crafts premium, safe, educational die-cast cars and magnetic board games. About Us / Our Story.",
    url: `${SITE}/about`,
    body: aboutBody(),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "About Us / Our Story", url: `${SITE}/about` },
      ]),
    ],
  },
  faq: {
    title: "FAQ | KIDAMI Die Cast Cars & Magnetic Board Games",
    description:
      "Sixteen KIDAMI FAQs: materials, batteries, size, age, ASTM F963 / CPC certificates, Amazon and Walmart buying, returns and warranty.",
    url: `${SITE}/faq`,
    body: faqBody(),
    jsonLd: [
      faqPageLd(),
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "FAQ", url: `${SITE}/faq` },
      ]),
    ],
  },
  contact: {
    title: "Contact KIDAMI — Email & Support",
    description:
      "Contact KIDAMI at support@kidami-ent.com. Questions about safety, shipping, replacements or wholesale.",
    url: `${SITE}/contact`,
    body: simpleBody(
      "Contact KIDAMI",
      [
        "Email <a href=\"mailto:support@kidami-ent.com\">support@kidami-ent.com</a>. We usually reply within 2 business days.",
        "Shopping, tracking and 30-day returns are handled on Amazon and Walmart.",
      ]
    ),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Contact", url: `${SITE}/contact` },
      ]),
    ],
  },
  privacy: {
    title: "Privacy Policy | KIDAMI · 隐私政策",
    description:
      "KIDAMI privacy policy — how we collect, use and protect your personal information when you visit our website.",
    url: `${SITE}/privacy`,
    body: privacyBody(),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Privacy Policy", url: `${SITE}/privacy` },
      ]),
    ],
  },
  terms: {
    title: "Terms of Service | KIDAMI · 服务条款",
    description:
      "KIDAMI terms of service — rules for using our website, purchasing products, and interacting with our brand.",
    url: `${SITE}/terms`,
    body: termsBody(),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Terms of Service", url: `${SITE}/terms` },
      ]),
    ],
  },
  products: {
    title: "KIDAMI Products — Die Cast Cars & Magnetic Board Games",
    description:
      "Shop KIDAMI die cast metal toy cars (ages 3+) and magnetic travel board games (ages 6+). Official Amazon and Walmart listings.",
    url: `${SITE}/products`,
    body: productsIndexBody(),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Products", url: `${SITE}/products` },
      ]),
    ],
  },
  explore: {
    title: "Inspiration Library | KIDAMI",
    description:
      "Shop KIDAMI toys by play skill — hands-on, outdoor, early learning and family time.",
    url: `${SITE}/explore`,
    body: simpleBody("Inspiration Library", [
      "Four play skills: hands-on fine motor cars, outdoor adventure trucks, early-learning number games, and family-time magnetic boards.",
      ...products.map(
        (p) => `<a href="/products/${p.slug}">${esc(p.name)}</a> — ${esc(p.tagline)}`
      ),
    ]),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Inspiration", url: `${SITE}/explore` },
      ]),
    ],
  },
  learn: {
    title: "STEM & Learning | KIDAMI",
    description:
      "Play-based learning articles: die-cast cars and fine motor STEM, magnetic ludo family night, screen-free travel games.",
    url: `${SITE}/learn`,
    body: learnIndexBody(),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "STEM & Learning", url: `${SITE}/learn` },
      ]),
    ],
  },
  wholesale: {
    title: "Custom designs & large-volume orders | KIDAMI",
    description:
      "KIDAMI wholesale, custom gift sets and bulk orders for retailers, schools and events.",
    url: `${SITE}/wholesale`,
    body: simpleBody("Custom designs &amp; large-volume orders", [
      "Need branded gift sets, retailer packs, or a large quantity for events and schools? Email support@kidami-ent.com with quantity, timeline and destination market.",
    ]),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Wholesale", url: `${SITE}/wholesale` },
      ]),
    ],
  },
  video: {
    title: "Watch KIDAMI in motion | Brand Video",
    description: "KIDAMI brand film — die-cast cars and magnetic board games in real play.",
    url: `${SITE}/video`,
    body: simpleBody("Watch KIDAMI in motion", [
      "A dedicated page for our brand film. <a href=\"/products\">Shop products</a> or return <a href=\"/\">home</a>.",
    ]),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Brand Video", url: `${SITE}/video` },
      ]),
    ],
  },
};

for (const [route, spec] of Object.entries(pages)) {
  writePage(route, spec);
}

for (const p of products) {
  writePage(`products/${p.slug}`, {
    title: `${p.name} | KIDAMI`,
    description: `${p.tagline} Ages ${p.age}. ASTM F963 & CPC certified. On Amazon and Walmart.`,
    url: `${SITE}/products/${p.slug}`,
    body: productBody(p),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "Products", url: `${SITE}/products` },
        { name: p.name, url: `${SITE}/products/${p.slug}` },
      ]),
      productLd(p),
    ],
  });
}

for (const a of articles) {
  writePage(`learn/${a.slug}`, {
    title: `${a.title} | KIDAMI`,
    description: a.excerpt,
    url: `${SITE}/learn/${a.slug}`,
    body: articleBody(a),
    jsonLd: [
      crumbs([
        { name: "Home", url: `${SITE}/` },
        { name: "STEM & Learning", url: `${SITE}/learn` },
        { name: a.title, url: `${SITE}/learn/${a.slug}` },
      ]),
      articleLd(a),
    ],
  });
}
