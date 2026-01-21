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
      return NextResponse.json({
        verified: true,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency?.toUpperCase() || 'AUD',
        email: session.customer_email,
        metadata: session.metadata,
      });
    }

    return NextResponse.json({ verified: false, status: session.status });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }
}
