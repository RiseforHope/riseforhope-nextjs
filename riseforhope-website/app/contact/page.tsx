"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSuccess(true); // Switch to "Success" view
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please verify your connection.');
        }
        setIsSubmitting(false);
    }

    // Shared styles to match your original look
    const inputStyle = {
        width: '100%',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        backgroundColor: '#fdfdfd'
    };

    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px 80px', minHeight: '80vh' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                    {/* Back Link */}
                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Title & Intro */}
                    <h1 className="mission-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Contact Us
                    </h1>

                    <p className="mission-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        Have a question? We would love to hear from you.
                    </p>

                    {/* Contact Info Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '60px' }}>
                        <div style={{ textAlign: 'center', padding: '30px', background: '#f9f9f9', borderRadius: '15px' }}>
                            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', marginBottom: '10px' }}>General Inquiries</h3>
                            <p style={{ fontFamily: 'var(--font-sans)', color: '#666' }}>hello@riseforhope.org</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '30px', background: '#f9f9f9', borderRadius: '15px' }}>
                            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', marginBottom: '10px' }}>Phone</h3>
                            <p style={{ fontFamily: 'var(--font-sans)', color: '#666' }}>+1 (555) 123-4567</p>
                        </div>
                    </div>

                    {/* Conditional Rendering: Form OR Success Message */}
                    {isSuccess ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 40px',
                            background: '#f0fdf4',
                            borderRadius: '20px',
                            border: '1px solid #bbf7d0'
                        }}>
                            <h2 style={{ color: '#166534', fontSize: '2rem', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>Thank You!</h2>
                            <p style={{ fontSize: '1.1rem', color: '#15803d', marginBottom: '30px' }}>
                                Your message has been sent successfully. We will get back to you shortly.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="btn-donate"
                                style={{ background: '#166534', padding: '12px 30px' }}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {errorMessage && (
                                <div style={{ padding: '15px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                                    {errorMessage}
                                </div>
                            )}

                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your Name"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>Message</label>
                                <textarea
                                    name="message"
                                    rows={6}
                                    required
                                    placeholder="How can we help?"
                                    className="form-textarea"
                                    style={{ ...inputStyle, fontFamily: 'var(--font-sans)' }} // Override default textarea font
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-donate"
                                style={{ width: '100%', fontSize: '1.1rem', border: 'none', padding: '18px', opacity: isSubmitting ? 0.7 : 1 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}

                </div>
            </div>
            <Footer />
        </main>
    );
}