"use client"; // Required for handling form submission

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('Sending...');

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

            if (response.ok) {
                setStatus('Thank you! Your message has been sent.');
                (e.target as HTMLFormElement).reset(); // Clear the form
            } else {
                setStatus('Error sending message. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Error sending message. Please try again.');
        }
        setIsSubmitting(false);
    }

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        fontFamily: 'var(--font-sans)'
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

                    {/* Functional Form */}
                    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '15px' }}>

                        <div>
                            <label htmlFor="name" style={labelStyle}>Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="Your Name"
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" style={labelStyle}>Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="you@example.com"
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" style={labelStyle}>Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows={5}
                                required
                                placeholder="How can we help?"
                                className="form-textarea" // Keeping your class if it has styles
                                style={{ ...inputStyle, minHeight: '120px' }}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-donate"
                            style={{
                                width: '100%',
                                fontSize: '1rem',
                                border: 'none',
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {/* Status Message */}
                        {status && (
                            <p style={{
                                marginTop: '20px',
                                textAlign: 'center',
                                color: status.includes('Error') ? 'red' : 'green',
                                fontWeight: 'bold'
                            }}>
                                {status}
                            </p>
                        )}
                    </form>

                </div>
            </div>
            <Footer />
        </main>
    );
}