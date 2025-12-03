'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Accordion from '../components/AccordionItem';
import DonationTracker from '../components/DonationTracker';
import Link from 'next/link';

// --- SAFETY CHECK ---
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// --- FAQ DATA ---
const faqs = [
    {
        question: "Is my donation tax-deductible?",
        answer: "Yes. Rise for Hope is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to the full extent allowed by law."
    },
    {
        question: "How is my donation used?",
        answer: "100% of your donation goes directly to our programs supporting families in crisis. We prioritize direct financial assistance for medical bills, housing stability, and essential supplies."
    },
    {
        question: "Can I donate in honor of someone?",
        answer: "Absolutely. After completing your donation, please reply to the receipt email with the name of the person you are honoring."
    },
    {
        question: "Is this payment secure?",
        answer: "Yes. We use Stripe, the industry standard for online payments. Your financial information is encrypted and never stored on our servers."
    },
    {
        question: "Are there other ways to support Rise for Hope besides donating money?",
        answer: "Yes. You can support our work by volunteering, hosting a fundraiser, donating supplies, or partnering with us through your business or organization. Details are available in the “Interested In Partnering With Us?” section of our website."
    }
];

export default function DonatePage() {
    const [clientSecret, setClientSecret] = useState('');
    const [amount, setAmount] = useState(50);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showForm, setShowForm] = useState(false);

    if (!stripePromise) {
        return (
            <main>
                <Header />
                <div className="max-w-container" style={{ paddingTop: '150px', textAlign: 'center', color: 'red' }}>
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
            body: JSON.stringify({ amount: amount * 100 }), // Amount in cents
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
                colorPrimary: '#4285f4',
            },
        },
    };

    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ paddingTop: '150px', paddingBottom: '80px', minHeight: '80vh' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>

                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                            ← Back to Home
                        </Link>
                    </div>

                    <h1 className="mission-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Give Hope to Families Facing Pediatric Cancer
                    </h1>

                    <p className="mission-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        Your gift doesn’t disappear into a system. It stays here, reaching families whose lives revolve around hospitals, treatments, and uncertainty.
                    </p>

                    {/* TRACKER */}
                    <DonationTracker currentAmount={630} goalAmount={10000} />

                    {/* DONATION FORM AREA */}
                    {!showForm ? (
                        <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
                            {/* Name Input */}
                            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', fontFamily: 'var(--font-sans)' }}>Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'var(--font-sans)' }}
                                />
                            </div>

                            {/* Email Input */}
                            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', fontFamily: 'var(--font-sans)' }}>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="jane@example.com"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'var(--font-sans)' }}
                                />
                            </div>

                            {/* Amount Input */}
                            <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px', fontFamily: 'var(--font-sans)' }}>
                                    Donation Amount ($)
                                </label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    style={{
                                        fontSize: '2rem', padding: '15px', width: '100%', borderRadius: '10px',
                                        border: '1px solid #ddd', textAlign: 'center', fontFamily: 'var(--font-sans)'
                                    }}
                                />
                            </div>

                            <button
                                onClick={initializePayment}
                                disabled={!name || !email || !amount}
                                className="btn-donate"
                                style={{ width: '100%', fontSize: '1.2rem', opacity: (!name || !email) ? 0.6 : 1 }}
                            >
                                Continue to Payment
                            </button>
                        </div>
                    ) : (
                        <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #eee' }}>
                            {clientSecret && (
                                <Elements stripe={stripePromise} options={stripeOptions}>
                                    {/* FIX: Passing props to CheckoutForm so it knows who to email */}
                                    <CheckoutForm donorName={name} donorEmail={email} donationAmount={amount} />
                                </Elements>
                            )}
                        </div>
                    )}

                    {/* FAQ SECTION */}
                    <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
                        <h3 className="mission-title" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '30px' }}>
                            Common Questions
                        </h3>
                        <div className="faq-container">
                            {faqs.map((faq, index) => (
                                <Accordion
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}

// --- SUB-COMPONENT: CHECKOUT FORM ---

// Define Types for Props
interface CheckoutFormProps {
    donorName: string;
    donorEmail: string;
    donationAmount: number;
}

function CheckoutForm({ donorName, donorEmail, donationAmount }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setIsLoading(true);

        // 1. Confirm Payment with Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required', // IMPORTANT: Prevents immediate redirect
        });

        if (error) {
            setMessage(error.message || 'An unexpected error occurred.');
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {

            // 2. Payment Successful -> Send Email & Save to DB
            try {
                const response = await fetch('/api/send-thank-you', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: donorEmail,
                        name: donorName,
                        amount: donationAmount
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API Error:", errorData);
                    // We alert here so you can see if the email fails while testing
                    alert("Payment succeeded, but email failed: " + JSON.stringify(errorData));
                }

                // 3. Redirect to Success Page
                window.location.href = '/donate/success';

            } catch (err: any) {
                console.error("Network Error:", err);
                alert("Network error sending email: " + err.message);
                // Redirect anyway so the user knows payment worked
                window.location.href = '/donate/success';
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
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
                {isLoading ? 'Processing...' : `Donate $${donationAmount}`}
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