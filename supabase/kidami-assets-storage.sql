-- Create a public Storage bucket for KIDAMI product / media uploads (run in Supabase SQL editor once)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kidami-assets',
  'kidami-assets',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set public = true;

drop policy if exists "kidami public read" on storage.objects;
drop policy if exists "kidami public upload" on storage.objects;
drop policy if exists "kidami public update" on storage.objects;
drop policy if exists "kidami public delete" on storage.objects;

create policy "kidami public read"
on storage.objects for select
using (bucket_id = 'kidami-assets');

create policy "kidami public upload"
on storage.objects for insert
with check (bucket_id = 'kidami-assets');

create policy "kidami public update"
on storage.objects for update
using (bucket_id = 'kidami-assets');

create policy "kidami public delete"
on storage.objects for delete
using (bucket_id = 'kidami-assets');
