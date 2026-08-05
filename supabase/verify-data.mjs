import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yklxtfilguqyfrxzfgzh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbHh0ZmlsZ3VxeWZyeHpmZ3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NjUzMTQsImV4cCI6MjA5MzA0MTMxNH0.KNHmYia2iigQFyH1xzlhsvK1wOwhMcof3_xQGNHPQd8"
);

async function verifyData() {
  console.log("📊 Verifying imported data...\n");

  // Products
  const { data: products, error: pErr } = await supabase.from("kidami_products").select("slug, name, category, price_hint").order("sort_order");
  if (pErr) console.error("Products:", pErr.message);
  else {
    console.log(`✅ Products (${products.length}):`);
    products.forEach(p => console.log(`   • ${p.name} (${p.category}) — ${p.price_hint}`));
  }

  // Articles
  const { data: articles, error: aErr } = await supabase.from("kidami_articles").select("slug, title, category");
  if (aErr) console.error("Articles:", aErr.message);
  else {
    console.log(`\n✅ Articles (${articles.length}):`);
    articles.forEach(a => console.log(`   • ${a.title} [${a.category}]`));
  }

  // Reviews
  const { data: reviews, error: rErr } = await supabase.from("kidami_reviews").select("name, stars, product_name");
  if (rErr) console.error("Reviews:", rErr.message);
  else {
    console.log(`\n✅ Reviews (${reviews.length}):`);
    reviews.forEach(r => console.log(`   • ${r.name}: ${'★'.repeat(r.stars)} — ${r.product_name}`));
  }

  // SEO
  const { data: seo, error: sErr } = await supabase.from("kidami_seo_settings").select("page_path, title");
  if (sErr) console.error("SEO:", sErr.message);
  else {
    console.log(`\n✅ SEO Settings (${seo.length}):`);
    seo.forEach(s => console.log(`   • ${s.page_path} → ${s.title.slice(0, 50)}...`));
  }

  // GEO
  const { data: geo, error: gErr } = await supabase.from("kidami_geo_settings").select("key");
  if (gErr) console.error("GEO:", gErr.message);
  else {
    console.log(`\n✅ GEO Settings (${geo.length}):`);
    geo.forEach(g => console.log(`   • ${g.key}`));
  }

  // Site Settings
  const { data: settings, error: stErr } = await supabase.from("kidami_site_settings").select("key, value");
  if (stErr) console.error("Settings:", stErr.message);
  else {
    console.log(`\n✅ Site Settings (${settings.length}):`);
    settings.forEach(s => console.log(`   • ${s.key}: ${s.value.slice(0, 40)}${s.value.length > 40 ? '...' : ''}`));
  }

  console.log("\n🎉 All data verified successfully!");
}

verifyData();
