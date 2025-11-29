import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
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

                    {/* Simple Form */}
                    <form>
                        <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>Message</label>
                        <textarea className="form-textarea" rows={5} placeholder="How can we help?"></textarea>

                        <button className="btn-donate" style={{ width: '100%', fontSize: '1rem', border: 'none' }}>
                            Send Message
                        </button>
                    </form>

                </div>
            </div>
            <Footer />
        </main>
    );
}