"use client";
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
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!result.success) {
                // ALERT THE ERROR DIRECTLY TO THE USER
                alert(`❌ ERROR: ${JSON.stringify(result.error)}`);
                setStatus('Failed. Check the popup alert for details.');
            } else {
                alert('✅ SUCCESS: Email sent!');
                setStatus('Message sent successfully.');
                (e.target as HTMLFormElement).reset();
            }
        } catch (error: any) {
            alert(`❌ NETWORK ERROR: ${error.message}`);
            setStatus('Network error occurred.');
        }
        setIsSubmitting(false);
    }

    return (
        <main>
            <Header />
            <div className="max-w-container" style={{ padding: '150px 20px 80px', maxWidth: '700px', margin: '0 auto' }}>
                <Link href="/" style={{ display: 'block', marginBottom: '40px' }}>← Back to Home</Link>
                <h1 className="mission-title" style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Us</h1>
                
                <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '15px', border: '1px solid #eee' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Name</label>
                        <input name="name" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Email</label>
                        <input name="email" type="email" required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Message</label>
                        <textarea name="message" rows={5} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn-donate" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>{status}</p>
                </form>
            </div>
            <Footer />
        </main>
    );
}
