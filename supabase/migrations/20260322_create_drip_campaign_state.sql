-- Drip Campaign State Table
-- Tracks each subscriber's position in the 7-day forex beginner email series.
-- n8n polls this table to determine which emails to send.

CREATE TABLE IF NOT EXISTS drip_campaign_state (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  campaign_id TEXT NOT NULL DEFAULT '7day_beginner',
  current_day INTEGER NOT NULL DEFAULT 1 CHECK (current_day >= 1 AND current_day <= 7),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'unsubscribed')),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_sent_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- One enrollment per email per campaign
  CONSTRAINT drip_campaign_unique_email UNIQUE (email, campaign_id)
);

-- Index for n8n daily send query: active subscribers due for next email
CREATE INDEX idx_drip_active_due
  ON drip_campaign_state (campaign_id, status, last_sent_at)
  WHERE status = 'active';

-- Index for admin stats queries
CREATE INDEX idx_drip_campaign_stats
  ON drip_campaign_state (campaign_id, status);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_drip_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_drip_updated_at
  BEFORE UPDATE ON drip_campaign_state
  FOR EACH ROW
  EXECUTE FUNCTION update_drip_updated_at();

-- RLS: anon can insert (enrollment) and read own row
ALTER TABLE drip_campaign_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_drip" ON drip_campaign_state
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "anon_select_own_drip" ON drip_campaign_state
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "anon_update_drip" ON drip_campaign_state
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);
