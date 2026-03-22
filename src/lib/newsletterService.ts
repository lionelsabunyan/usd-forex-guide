import { supabase } from './supabase';
import { subscriberStore } from './adminStore';

export interface SubscribeResult {
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email.trim());
}

/**
 * Subscribe an email to the newsletter.
 * Saves to Supabase if configured, falls back to localStorage.
 */
export async function subscribeNewsletter(
  email: string,
  source: string
): Promise<SubscribeResult> {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed || !isValidEmail(trimmed)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  // Try Supabase first
  if (supabase) {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: trimmed, source, status: 'pending' });

    if (error) {
      // Unique constraint violation = already subscribed
      if (error.code === '23505') {
        return {
          success: true,
          message: 'You\'re already subscribed!',
          alreadySubscribed: true,
        };
      }
      // Fall through to localStorage on other errors
      console.error('Supabase newsletter error:', error.message);
    } else {
      // Also save to localStorage for admin panel visibility
      subscriberStore.add(trimmed, source);
      return {
        success: true,
        message: 'Thanks for subscribing! Check your inbox for confirmation.',
      };
    }
  }

  // Fallback: localStorage only
  const result = subscriberStore.add(trimmed, source);
  if (!result) {
    return {
      success: true,
      message: 'You\'re already subscribed!',
      alreadySubscribed: true,
    };
  }

  return {
    success: true,
    message: 'Thanks for subscribing! Check your inbox for confirmation.',
  };
}

/**
 * Confirm a subscriber via token (double opt-in).
 * Called when user clicks confirmation link.
 */
export async function confirmSubscription(token: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({
      status: 'active',
      confirmed_at: new Date().toISOString(),
      confirmation_token: null,
    })
    .eq('confirmation_token', token)
    .eq('status', 'pending');

  return !error;
}
