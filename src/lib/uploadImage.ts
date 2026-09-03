/** Upload a product/article image to Supabase Storage and return its public URL. */
export async function uploadPublicImage(
  file: File,
  folder = "products"
): Promise<{ url: string | null; error: string | null }> {
  const { supabase } = await import("./supabase");
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const { error } = await supabase.storage.from("kidami-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || `image/${safeExt}`,
  });

  if (error) {
    return { url: null, error: error.message };
  }

  const { data } = supabase.storage.from("kidami-assets").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
