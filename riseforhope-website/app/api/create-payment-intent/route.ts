import { NextResponse, NextRequest } from 'next/server';
// @ts-ignore
import Stripe from 'stripe';

// Updated: We explicitly set the apiVersion to match what the installed library expects
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-11-17.clover',
});

export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        console.error('Stripe API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}