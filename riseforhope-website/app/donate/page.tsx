'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

// --- SAFETY CHECK ---
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function DonatePage() {
    const [clientSecret, setClientSecret] = useState('');
    const [amount, setAmount] = useState(50);
    const [showForm, setShowForm] = useState(false);

    if (!stripePromise) {
        return (
            <main>
                <Header />
                <div className="max-w-container" style={{ padding: '150px 20px', textAlign: 'center', color: 'red' }}>
                    <h1>Configuration Error</h1>
                    <p>The Stripe Publishable Key is missing.</p>
                </div>
                <Footer />
            </main>
        );
    }

    const initializePayment = async () => {
        const res = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amount * 100 }),
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setShowForm(true);
    };

    const stripeOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
            variables: {
                fontFamily: 'Lato, system-ui, sans-serif',
                borderRadius: '10px',
                colorPrimary: '#4285f4', // Brand Blue
            },
        },
        fonts: [
            {
                cssSrc: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
            },
        ],
    };

    return (
        <main>
            <Header />

            {/* 1. MAIN WRAPPER */}
            <div className="max-w-container" style={{ padding: '150px 20px 80px', minHeight: '80vh' }}>

                {/* 2. CENTERED COLUMN (Holds Everything) */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>

                    {/* 3. BACK BUTTON: Now inside the centered column */}
                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                            ← Back to Home
                        </Link>
                    </div>

                    <h1 className="mission-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Support Our Cause
                    </h1>

                    <p className="mission-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        Your donation stays right here, helping us support families immediately.
                    </p>

                    {!showForm ? (
                        <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
                            <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>
                                Enter Donation Amount ($)
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                style={{
                                    fontSize: '2rem', padding: '15px', width: '100%', borderRadius: '10px',
                                    border: '1px solid #ddd', textAlign: 'center', marginBottom: '30px',
                                    fontFamily: 'var(--font-sans)'
                                }}
                            />

                            <button onClick={initializePayment} className="btn-donate" style={{ width: '100%', fontSize: '1.2rem' }}>
                                Continue to Payment
                            </button>
                        </div>
                    ) : (
                        <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #eee' }}>
                            {clientSecret && (
                                <Elements stripe={stripePromise} options={stripeOptions}>
                                    <CheckoutForm />
                                </Elements>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/donate/success`,
            },
        });

        if (error) {
            setMessage(error.message || 'An unexpected error occurred.');
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />

            {/* SECURITY BADGE */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                margin: '20px 0 10px', color: '#666', fontSize: '0.8rem', background: '#f4f4f4',
                padding: '10px', borderRadius: '8px', fontFamily: 'var(--font-sans)'
            }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Guaranteed <strong>Safe & Secure</strong> Checkout</span>
            </div>

            <button
                disabled={isLoading || !stripe || !elements}
                className="btn-donate"
                style={{ width: '100%', marginTop: '10px', fontSize: '1rem' }}
            >
                {isLoading ? 'Processing...' : 'Pay Now'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.75rem', color: '#999', fontFamily: 'var(--font-sans)' }}>
                <span style={{ opacity: 0.7 }}>Powered by</span> <strong>stripe</strong>
            </div>

            {message && (
                <div style={{
                    color: '#e53935', marginTop: '20px', textAlign: 'center',
                    fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
                    background: '#ffebee', padding: '10px', borderRadius: '5px'
                }}>
                    {message}
                </div>
            )}
        </form>
    );
}