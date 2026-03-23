-- Content freshness tracking for SEO
-- Tracks review schedule for broker reviews (monthly) and guide pages (quarterly)
-- Used by freshness-check script to identify overdue content

CREATE TABLE IF NOT EXISTS content_freshness (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  page_type TEXT NOT NULL CHECK (page_type IN ('broker_review', 'guide', 'comparison', 'tool', 'legal', 'blog', 'other')),
  page_title TEXT NOT NULL,
  last_reviewed DATE,
  next_review DATE NOT NULL,
  review_interval_days INTEGER NOT NULL DEFAULT 30,
  reviewer_agent TEXT DEFAULT NULL,
  notes TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for cron queries
CREATE INDEX idx_content_freshness_next_review ON content_freshness(next_review ASC);
CREATE INDEX idx_content_freshness_page_type ON content_freshness(page_type);

-- RLS policies
ALTER TABLE content_freshness ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read" ON content_freshness FOR SELECT USING (true);
CREATE POLICY "Allow service write" ON content_freshness FOR ALL USING (auth.role() = 'service_role');

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_content_freshness_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER content_freshness_updated_at
  BEFORE UPDATE ON content_freshness
  FOR EACH ROW
  EXECUTE FUNCTION update_content_freshness_updated_at();
