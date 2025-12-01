"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function VolunteerPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = {
            type: 'volunteer', // This tells the API to change the subject line
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
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

    // Shared Styles
    const inputStyle = {
        width: '100%',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #e5e5e5',
        marginBottom: '20px',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        backgroundColor: '#fafafa',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.9rem',
        color: '#444'
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
                            <h2 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: 'var(--font-serif)', color: '#333' }}>
                                Thank You!
                            </h2>
                            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px', fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}>
                                We are thrilled you want to join us. <br/>
                                Our team will review your application and contact you shortly.
                            </p>
                            <button 
                                onClick={() => setIsSuccess(false)}
                                style={{ 
                                    background: 'none', border: 'none', borderBottom: '1px solid #333',
                                    padding: '0 0 4px', fontSize: '1rem', cursor: 'pointer',
                                    fontFamily: 'var(--font-sans)', color: '#333'
                                }}
                            >
                                Submit another application
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="mission-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                                Volunteer With Us
                            </h1>

                            <p className="mission-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                                Join our community of changemakers.
                            </p>

                            <form onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
                                {errorMessage && (
                                    <div style={{ padding: '15px', background: '#fff1f2', color: '#be123c', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                                        {errorMessage}
                                    </div>
                                )}

                                <div>
                                    <label style={labelStyle}>Name</label>
                                    <input type="text" name="name" required placeholder="Your Full Name" style={inputStyle} />
                                </div>

                                <div>
                                    <label style={labelStyle}>Email</label>
                                    <input type="email" name="email" required placeholder="you@example.com" style={inputStyle} />
                                </div>

                                <div>
                                    <label style={labelStyle}>Phone Number</label>
                                    <input type="tel" name="phone" placeholder="(555) 123-4567" style={inputStyle} />
                                </div>

                                <div>
                                    <label style={labelStyle}>How would you like to help?</label>
                                    <textarea 
                                        name="message" 
                                        rows={6} 
                                        required 
                                        placeholder="Tell us about your skills and interests..." 
                                        className="form-textarea" 
                                        style={{ ...inputStyle, fontFamily: 'var(--font-sans)', resize: 'vertical' }}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="btn-donate" 
                                    style={{ 
                                        width: '100%', fontSize: '1.1rem', border: 'none', 
                                        padding: '18px', marginTop: '10px', 
                                        opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'wait' : 'pointer'
                                    }}
                                >
                                    {isSubmitting ? 'Sending Application...' : 'Apply Now'}
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
