import { createClient } from "@supabase/supabase-js";

const url = "https://yklxtfilguqyfrxzfgzh.supabase.co";
const key = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function inspect() {
  console.log("🔍 Inspecting database...\n");

  // Try to get products data to see column names
  const { data: products, error } = await supabase.from("products").select("*").limit(5);
  if (error) {
    console.error("Error:", error.message);
    return;
  }

  if (products.length > 0) {
    console.log("📊 Products table columns (from data):");
    const cols = Object.keys(products[0]);
    for (const col of cols) {
      const val = products[0][col];
      const type = Array.isArray(val) ? "array" : typeof val;
      console.log(`   • ${col} (${type})`);
    }
    console.log("\n🚗 Existing products:", products.length);
    for (const p of products) {
      console.log(`   • ${p.name || p.title || p.slug || p.id}`);
    }
  } else {
    console.log("Products table exists but is empty");
  }

  // Try other tables
  const tables = ["articles", "reviews", "translations", "seo_settings", "geo_settings", "site_settings"];
  console.log("\n📋 Checking other tables:");
  for (const table of tables) {
    const { data, error: e } = await supabase.from(table).select("*").limit(1);
    if (e && e.code === "42P01") {
      console.log(`   ❌ ${table} — does not exist`);
    } else if (e) {
      console.log(`   ⚠️  ${table} — ${e.message}`);
    } else {
      console.log(`   ✅ ${table} — exists`);
    }
  }
}

inspect();
