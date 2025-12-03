import { NextResponse, NextRequest } from 'next/server';
// @ts-ignore (Stripe doesn't always play nice with import syntax in some TS configs, this is safe)
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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