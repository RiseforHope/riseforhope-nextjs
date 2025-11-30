"use client";
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("🚨 BUTTON CLICKED! The code is running."); // Immediate proof
        
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
                alert(`❌ SERVER ERROR:\n${JSON.stringify(result.error, null, 2)}`);
            } else {
                alert('✅ SUCCESS! Email sent.');
            }
        } catch (error: any) {
            alert(`❌ NETWORK ERROR: ${error.message}`);
        }
    }

    return (
        <main>
            <Header />
            <div className="max-w-container" style={{ padding: '150px 20px', maxWidth: '600px', margin: '0 auto' }}>
                <h1>Contact Test</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input name="name" placeholder="Name" required style={{ padding: '10px' }} />
                    <input name="email" type="email" placeholder="Email" required style={{ padding: '10px' }} />
                    <textarea name="message" placeholder="Message" required style={{ padding: '10px' }} />
                    <button type="submit" style={{ padding: '15px', background: 'blue', color: 'white', fontWeight: 'bold' }}>
                        TEST SENDING
                    </button>
                </form>
            </div>
            <Footer />
        </main>
    );
}
