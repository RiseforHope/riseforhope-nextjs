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
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Network error. Please verify your connection.');
        }
        setIsSubmitting(false);
    }

    const inputStyle = {
        width: '100%',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #e5e5e5',
        marginBottom: '20px',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        backgroundColor: '#fafafa',
        transition: 'border-color 0.2s',
        outline: 'none'
    };

    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px 80px', minHeight: '80vh' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                            ← Back to Home
                        </Link>
                    </div>

                    {isSuccess ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            animation: 'fadeIn 0.6s ease-out'
                        }}>
                            <h2 style={{
                                fontSize: '3rem',
                                marginBottom: '20px',
                                fontFamily: 'var(--font-serif)',
                                color: '#333'
                            }}>
                                Message Sent
                            </h2>
                            <p style={{
                                fontSize: '1.2rem',
                                color: '#666',
                                marginBottom: '40px',
                                fontFamily: 'var(--font-sans)',
                                lineHeight: '1.6'
                            }}>
                                Thank you for reaching out to us. <br/>
                                We will be in touch shortly.
                            </p>

                            <button
                                onClick={() => setIsSuccess(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    borderBottom: '1px solid #333',
                                    padding: '0 0 4px',
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-sans)',
                                    color: '#333',
                                    letterSpacing: '0.5px'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="mission-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                Contact Us
                            </h1>

                            <p className="mission-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                                Have a question? We would love to hear from you.
                            </p>

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

                            <form onSubmit={handleSubmit}>
                                {errorMessage && (
                                    <div style={{ padding: '15px', background: '#fff1f2', color: '#be123c', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                                        {errorMessage}
                                    </div>
                                )}

                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#444' }}>Name</label>
                                    <input type="text" name="name" required placeholder="Your Name" style={inputStyle} />
                                </div>

                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#444' }}>Email</label>
                                    <input type="email" name="email" required placeholder="you@example.com" style={inputStyle} />
                                </div>

                                <div>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#444' }}>Message</label>
                                    <textarea name="message" rows={6} required placeholder="How can we help?" className="form-textarea" style={{ ...inputStyle, fontFamily: 'var(--font-sans)', resize: 'vertical' }}></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-donate"
                                    style={{
                                        width: '100%',
                                        fontSize: '1.1rem',
                                        border: 'none',
                                        padding: '18px',
                                        marginTop: '10px',
                                        opacity: isSubmitting ? 0.7 : 1,
                                        cursor: isSubmitting ? 'wait' : 'pointer'
                                    }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </>
                    )}

                </div>
            </div>
            <Footer />
        </main>
    );
}