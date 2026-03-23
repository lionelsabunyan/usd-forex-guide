-- Daily analytics snapshots from GA4 Data API
-- Used by AdminAnalytics dashboard and trend analysis

CREATE TABLE IF NOT EXISTS daily_analytics (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  sessions INTEGER NOT NULL DEFAULT 0,
  users INTEGER NOT NULL DEFAULT 0,
  pageviews INTEGER NOT NULL DEFAULT 0,
  bounce_rate NUMERIC(5,2) DEFAULT 0,
  avg_session_duration NUMERIC(8,2) DEFAULT 0,
  -- Search Console metrics
  gsc_clicks INTEGER DEFAULT 0,
  gsc_impressions INTEGER DEFAULT 0,
  gsc_ctr NUMERIC(5,2) DEFAULT 0,
  gsc_avg_position NUMERIC(5,1) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_top_pages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE NOT NULL,
  page_path TEXT NOT NULL,
  pageviews INTEGER NOT NULL DEFAULT 0,
  sessions INTEGER NOT NULL DEFAULT 0,
  avg_time_on_page NUMERIC(8,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(date, page_path)
);

CREATE TABLE IF NOT EXISTS daily_traffic_sources (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE NOT NULL,
  source TEXT NOT NULL,
  medium TEXT NOT NULL,
  sessions INTEGER NOT NULL DEFAULT 0,
  users INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(date, source, medium)
);

CREATE TABLE IF NOT EXISTS daily_affiliate_clicks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE NOT NULL,
  broker TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  location TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(date, broker)
);

-- Indexes for dashboard queries
CREATE INDEX idx_daily_analytics_date ON daily_analytics(date DESC);
CREATE INDEX idx_daily_top_pages_date ON daily_top_pages(date DESC);
CREATE INDEX idx_daily_traffic_sources_date ON daily_traffic_sources(date DESC);
CREATE INDEX idx_daily_affiliate_clicks_date ON daily_affiliate_clicks(date DESC);

-- RLS policies (anon key read-only for admin dashboard)
ALTER TABLE daily_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_top_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_traffic_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon read" ON daily_analytics FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON daily_top_pages FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON daily_traffic_sources FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON daily_affiliate_clicks FOR SELECT USING (true);

CREATE POLICY "Allow service write" ON daily_analytics FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write" ON daily_top_pages FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write" ON daily_traffic_sources FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write" ON daily_affiliate_clicks FOR ALL USING (auth.role() = 'service_role');
