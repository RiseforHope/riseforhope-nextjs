import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia', // Use latest API version or leave default
});

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        // Create a PaymentIntent with the specified amount.
        // Amount is expected in CENTS (e.g., $50.00 = 5000)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}