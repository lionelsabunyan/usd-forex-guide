/**
 * Drip Campaign Service — Supabase state management
 *
 * Manages subscriber enrollment, day progression, and campaign stats.
 * Actual email sending is handled externally by n8n workflows
 * triggered via Supabase webhooks on row insert/update.
 */

import { supabase } from './supabase';
import { DRIP_CAMPAIGN_ID, DRIP_TOTAL_DAYS } from './dripCampaign';

export type DripStatus = 'active' | 'completed' | 'paused' | 'unsubscribed';

export interface DripCampaignState {
  id: string;
  email: string;
  campaign_id: string;
  current_day: number;
  status: DripStatus;
  enrolled_at: string;
  last_sent_at: string | null;
  completed_at: string | null;
  unsubscribed_at: string | null;
}

export interface DripCampaignStats {
  total_enrolled: number;
  active: number;
  completed: number;
  unsubscribed: number;
  by_day: Record<number, number>;
}

/**
 * Enroll a subscriber in the 7-day drip campaign.
 * Called automatically on newsletter signup.
 * Returns false if already enrolled.
 */
export async function enrollInDripCampaign(email: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('drip_campaign_state')
    .insert({
      email: email.trim().toLowerCase(),
      campaign_id: DRIP_CAMPAIGN_ID,
      current_day: 1,
      status: 'active' as DripStatus,
      enrolled_at: new Date().toISOString(),
    });

  if (error) {
    // 23505 = unique constraint violation (already enrolled)
    if (error.code === '23505') return false;
    return false;
  }

  return true;
}

/**
 * Get current drip state for a subscriber.
 */
export async function getDripState(email: string): Promise<DripCampaignState | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('drip_campaign_state')
    .select('*')
    .eq('email', email.trim().toLowerCase())
    .eq('campaign_id', DRIP_CAMPAIGN_ID)
    .single();

  if (error || !data) return null;
  return data as DripCampaignState;
}

/**
 * Advance subscriber to the next day.
 * Called by n8n after successfully sending an email.
 */
export async function advanceDripDay(email: string): Promise<boolean> {
  if (!supabase) return false;

  const state = await getDripState(email);
  if (!state || state.status !== 'active') return false;

  const nextDay = state.current_day + 1;
  const now = new Date().toISOString();

  if (nextDay > DRIP_TOTAL_DAYS) {
    // Campaign completed
    const { error } = await supabase
      .from('drip_campaign_state')
      .update({
        status: 'completed' as DripStatus,
        last_sent_at: now,
        completed_at: now,
      })
      .eq('id', state.id);

    return !error;
  }

  const { error } = await supabase
    .from('drip_campaign_state')
    .update({
      current_day: nextDay,
      last_sent_at: now,
    })
    .eq('id', state.id);

  return !error;
}

/**
 * Pause a subscriber's drip campaign.
 */
export async function pauseDripCampaign(email: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('drip_campaign_state')
    .update({ status: 'paused' as DripStatus })
    .eq('email', email.trim().toLowerCase())
    .eq('campaign_id', DRIP_CAMPAIGN_ID)
    .eq('status', 'active');

  return !error;
}

/**
 * Unsubscribe from drip campaign.
 */
export async function unsubscribeFromDrip(email: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('drip_campaign_state')
    .update({
      status: 'unsubscribed' as DripStatus,
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('email', email.trim().toLowerCase())
    .eq('campaign_id', DRIP_CAMPAIGN_ID);

  return !error;
}

/**
 * Get campaign statistics for admin dashboard.
 */
export async function getDripCampaignStats(): Promise<DripCampaignStats | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('drip_campaign_state')
    .select('status, current_day')
    .eq('campaign_id', DRIP_CAMPAIGN_ID);

  if (error || !data) return null;

  const stats: DripCampaignStats = {
    total_enrolled: data.length,
    active: 0,
    completed: 0,
    unsubscribed: 0,
    by_day: {},
  };

  for (const row of data) {
    if (row.status === 'active') {
      stats.active++;
      stats.by_day[row.current_day] = (stats.by_day[row.current_day] || 0) + 1;
    } else if (row.status === 'completed') {
      stats.completed++;
    } else if (row.status === 'unsubscribed') {
      stats.unsubscribed++;
    }
  }

  return stats;
}

/**
 * Get all active subscribers due for their next email.
 * Used by n8n to batch-send daily emails.
 * Returns subscribers whose last_sent_at is > 24h ago (or null for day 1).
 */
export async function getSubscribersDueForEmail(): Promise<DripCampaignState[]> {
  if (!supabase) return [];

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('drip_campaign_state')
    .select('*')
    .eq('campaign_id', DRIP_CAMPAIGN_ID)
    .eq('status', 'active')
    .or(`last_sent_at.is.null,last_sent_at.lt.${twentyFourHoursAgo}`);

  if (error || !data) return [];
  return data as DripCampaignState[];
}
