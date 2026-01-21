import { loadStripe } from '@stripe/stripe-js';

// Make sure to add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local file
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key is not set. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local file');
}

export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Donation cause mapping for Stripe metadata
export const causeLabels: Record<string, string> = {
  general: 'General Fund',
  education: 'Education Programs',
  community: 'Community Support',
  charity: 'Charity & Zakat',
  maintenance: 'Building Maintenance',
  youth: 'Youth Programs',
};

// Frequency mapping for Stripe recurring intervals
export const frequencyToInterval: Record<string, { interval: 'day' | 'week' | 'month' | 'year'; interval_count: number } | null> = {
  once: null, // One-time payment
  daily: { interval: 'day', interval_count: 1 },
  weekly: { interval: 'week', interval_count: 1 },
  fortnightly: { interval: 'week', interval_count: 2 },
  monthly: { interval: 'month', interval_count: 1 },
  quarterly: { interval: 'month', interval_count: 3 },
  yearly: { interval: 'year', interval_count: 1 },
};
