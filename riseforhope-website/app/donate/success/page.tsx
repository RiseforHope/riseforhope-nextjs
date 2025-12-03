'use client';

import Link from 'next/link';
// Adjust these imports based on your actual folder structure
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SuccessPage() {
    return (
        <main>
            <Header />

            {/* Main Container */}
            <div className="max-w-container" style={{ paddingTop: '150px', paddingBottom: '80px', minHeight: '80vh' }}>

                {/* Centered Column */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>

                    {/* Back Link */}
                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Success Message */}
                    <div style={{ textAlign: 'center' }}>
                        <h1 className="mission-title" style={{
                            color: '#000000',
                            fontSize: '3rem',
                            marginBottom: '20px'
                        }}>
                            Thank You!
                        </h1>

                        <p className="mission-text" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
                            Your donation has been successfully processed. You are making a difference.
                        </p>

                        <Link href="/" className="btn-donate">
                            Return Home
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}