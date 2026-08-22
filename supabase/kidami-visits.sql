-- 在 Supabase SQL Editor 执行一次即可
CREATE TABLE IF NOT EXISTS kidami_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  path TEXT NOT NULL,
  referrer TEXT DEFAULT '',
  source TEXT NOT NULL DEFAULT '直接访问',
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT '',
  session_id TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS kidami_visits_created_at_idx ON kidami_visits (created_at DESC);
CREATE INDEX IF NOT EXISTS kidami_visits_source_idx ON kidami_visits (source);
CREATE INDEX IF NOT EXISTS kidami_visits_path_idx ON kidami_visits (path);

ALTER TABLE kidami_visits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "kidami_visits_insert" ON kidami_visits;
DROP POLICY IF EXISTS "kidami_visits_select" ON kidami_visits;
CREATE POLICY "kidami_visits_insert" ON kidami_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "kidami_visits_select" ON kidami_visits FOR SELECT USING (true);
