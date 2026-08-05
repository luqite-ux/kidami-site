import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yklxtfilguqyfrxzfgzh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbHh0ZmlsZ3VxeWZyeHpmZ3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NjUzMTQsImV4cCI6MjA5MzA0MTMxNH0.KNHmYia2iigQFyH1xzlhsvK1wOwhMcof3_xQGNHPQd8"
);

async function verify() {
  console.log("✅ Verifying KIDAMI tables...\n");

  const tables = [
    "kidami_products",
    "kidami_product_images",
    "kidami_articles",
    "kidami_reviews",
    "kidami_translations",
    "kidami_seo_settings",
    "kidami_geo_settings",
    "kidami_site_settings",
  ];

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("count").single();
    if (error) {
      console.log(`❌ ${table}: ${error.message}`);
    } else {
      console.log(`✅ ${table}: OK`);
    }
  }

  console.log("\n📌 To insert data, please provide the service_role key from:");
  console.log("   https://supabase.com/dashboard/project/yklxtfilguqyfrxzfgzh/settings/api");
  console.log("   (Project Settings → API → service_role secret)");
}

verify();
