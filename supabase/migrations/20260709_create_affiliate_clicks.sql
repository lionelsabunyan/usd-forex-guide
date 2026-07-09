-- Affiliate Clicks Table
-- First-party log of every outbound affiliate click, written by the browser
-- (see src/lib/attribution.ts → logAffiliateClick). Its purpose is FTD (first-time
-- deposit) reconciliation for the offshore-broker Bing funnel: offshore IB portals
-- don't support keyword→deposit postbacks, so we store the Microsoft click id (msclkid)
-- + keyword at click time and later match it, by {broker, date}, against deposits seen
-- in each broker's IB dashboard — then upload matched FTDs to Bing as offline conversions.

CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  broker_id TEXT NOT NULL,
  click_location TEXT,
  msclkid TEXT,
  gclid TEXT,
  keyword TEXT,
  source TEXT,               -- 'bing' | 'google' | null (organic)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reconciliation queries: "clicks for broker X around date Y", and lookup by click id.
CREATE INDEX idx_affiliate_clicks_broker_date ON affiliate_clicks (broker_id, created_at);
CREATE INDEX idx_affiliate_clicks_msclkid ON affiliate_clicks (msclkid) WHERE msclkid IS NOT NULL;

-- RLS: anon may INSERT (log a click) but NOT read — click data is not public.
-- Reconciliation is done with the service role (Supabase dashboard / server job).
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_affiliate_clicks" ON affiliate_clicks
  FOR INSERT TO anon
  WITH CHECK (true);
