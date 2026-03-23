import { supabase } from './supabase';

export interface DailyAnalytics {
  date: string;
  sessions: number;
  users: number;
  pageviews: number;
  bounce_rate: number;
  avg_session_duration: number;
  gsc_clicks: number;
  gsc_impressions: number;
  gsc_ctr: number;
  gsc_avg_position: number;
}

export interface TopPage {
  page_path: string;
  pageviews: number;
  sessions: number;
  avg_time_on_page: number;
}

export interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
}

export interface AffiliateClick {
  broker: string;
  clicks: number;
}

export async function getLatestAnalytics(): Promise<DailyAnalytics | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from('daily_analytics')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .single();
  return data;
}

export async function getAnalyticsRange(days: number): Promise<DailyAnalytics[]> {
  if (!supabase) return [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const { data } = await supabase
    .from('daily_analytics')
    .select('*')
    .gte('date', cutoff.toISOString().split('T')[0])
    .order('date', { ascending: false });
  return data || [];
}

export async function getTopPages(date?: string): Promise<TopPage[]> {
  if (!supabase) return [];
  let query = supabase
    .from('daily_top_pages')
    .select('page_path, pageviews, sessions, avg_time_on_page')
    .order('pageviews', { ascending: false })
    .limit(10);

  if (date) {
    query = query.eq('date', date);
  } else {
    // Get latest date's pages
    const { data: latest } = await supabase
      .from('daily_top_pages')
      .select('date')
      .order('date', { ascending: false })
      .limit(1)
      .single();
    if (latest) query = query.eq('date', latest.date);
  }

  const { data } = await query;
  return data || [];
}

export async function getTrafficSources(date?: string): Promise<TrafficSource[]> {
  if (!supabase) return [];
  let query = supabase
    .from('daily_traffic_sources')
    .select('source, medium, sessions, users')
    .order('sessions', { ascending: false })
    .limit(10);

  if (date) {
    query = query.eq('date', date);
  } else {
    const { data: latest } = await supabase
      .from('daily_traffic_sources')
      .select('date')
      .order('date', { ascending: false })
      .limit(1)
      .single();
    if (latest) query = query.eq('date', latest.date);
  }

  const { data } = await query;
  return data || [];
}

export async function getAffiliateClicks(days: number = 30): Promise<AffiliateClick[]> {
  if (!supabase) return [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const { data } = await supabase
    .from('daily_affiliate_clicks')
    .select('broker, clicks')
    .gte('date', cutoff.toISOString().split('T')[0])
    .order('clicks', { ascending: false });

  if (!data) return [];

  // Aggregate by broker across days
  const byBroker: Record<string, number> = {};
  for (const row of data) {
    byBroker[row.broker] = (byBroker[row.broker] || 0) + row.clicks;
  }
  return Object.entries(byBroker)
    .map(([broker, clicks]) => ({ broker, clicks }))
    .sort((a, b) => b.clicks - a.clicks);
}
