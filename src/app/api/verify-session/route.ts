import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy initialize Stripe to avoid build-time errors
let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
    }
    stripe = new Stripe(secretKey, {
      apiVersion: '2025-12-15.clover',
    });
  }
  return stripe;
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    // Check if the payment was successful
    if (session.payment_status === 'paid' || session.status === 'complete') {
      // Only return non-sensitive confirmation data
      // Don't expose: email, metadata (contains donor personal info)
      return NextResponse.json({
        verified: true,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency?.toUpperCase() || 'AUD',
        // Return only safe metadata fields (cause info, not personal data)
        cause: session.metadata?.cause || null,
        causeTitle: session.metadata?.causeTitle || null,
      });
    }

    return NextResponse.json({ verified: false });
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }
}
