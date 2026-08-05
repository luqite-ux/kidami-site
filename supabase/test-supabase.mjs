/**
 * Supabase Connection Test & Schema Setup
 * Usage: node test-supabase.mjs
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "https://yklxtfilguqyfrxzfgzh.supabase.co";
const key = process.env.SUPABASE_ANON_KEY || process.argv[2];

if (!key) {
  console.error("Usage: SUPABASE_ANON_KEY=xxx node test-supabase.mjs");
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  console.log("🔗 Testing Supabase connection...\n");

  // Test 1: Check auth session
  const { data: { session }, error: authError } = await supabase.auth.getSession();
  if (authError) {
    console.log("⚠️  Auth check:", authError.message);
  } else {
    console.log("✅ Auth endpoint reachable");
  }

  // Test 2: Try to read from products table
  const { data: products, error: readError } = await supabase
    .from("products")
    .select("*")
    .limit(1);

  if (readError) {
    if (readError.code === "42P01") {
      console.log("⚠️  Table 'products' does not exist yet.");
      console.log("   Need to run schema.sql in Supabase Dashboard SQL Editor.");
    } else {
      console.log("⚠️  Read error:", readError.message, "(code:", readError.code + ")");
    }
  } else {
    console.log("✅ Products table exists!");
    console.log("   Records found:", products.length);
  }

  // Test 3: Try to insert (will likely fail with anon key due to RLS)
  console.log("\n📝 Testing write permissions...");
  const { error: writeError } = await supabase
    .from("products")
    .insert([{ slug: "test-connection", name: "Test", category: "cars", age: "3+", tagline: "test", price_hint: "$0" }]);

  if (writeError) {
    console.log("⚠️  Write test:", writeError.message, "(code:", writeError.code + ")");
    if (writeError.code === "42501" || writeError.message.includes("new row violates")) {
      console.log("   → Anon key cannot write (expected — need service_role key or authenticated user)");
    }
  } else {
    console.log("✅ Write permission OK!");
  }

  console.log("\n📌 Next steps:");
  console.log("   1. Open https://supabase.com/dashboard/project/yklxtfilguqyfrxzfgzh");
  console.log("   2. Go to SQL Editor → New query");
  console.log("   3. Copy & paste supabase/schema.sql");
  console.log("   4. Click Run");
  console.log("   5. Provide service_role key for data migration");
}

test();
