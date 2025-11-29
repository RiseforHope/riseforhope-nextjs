import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SuccessPage() {
    return (
        <main>
            <Header />

            {/* 1. Main Container (Consistent Padding) */}
            <div className="max-w-container" style={{ padding: '150px 20px', minHeight: '80vh' }}>

                {/* 2. Centered Column (Matches Donate Page) */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>

                    {/* 3. Back Link (Aligned Left) */}
                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                            ← Back to Home
                        </Link>
                    </div>

                    {/* 4. Success Message (Centered) */}
                    <div style={{ textAlign: 'center' }}>
                        <h1 className="mission-title" style={{
                            color: 'var(--col-gold)', /* Uses Brand Blue */
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