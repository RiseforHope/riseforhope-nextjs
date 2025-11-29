import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function PoliciesPage() {
    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px 80px', minHeight: '80vh' }}>

                {/* Top Bar: Back Link & Corner Label */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px' }}>
                    <Link href="/" className="item-date">
                        ← Back to Home
                    </Link>
                    <div style={{ textAlign: 'right', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#000', lineHeight: '1.4' }}>
                        Rise for Hope<br/>
                        Policy and Terms
                    </div>
                </div>

                {/* Main Content Container */}
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    {/* --- PRIVACY POLICY --- */}
                    <section style={{ marginBottom: '100px' }}>
                        <h1 className="mission-title" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                            Privacy Policy
                        </h1>
                        <p className="item-date" style={{ textAlign: 'center', marginBottom: '50px', color: '#000', fontSize: '1rem' }}>
                            Effective Date: 04/19/2025
                        </p>

                        <div className="mission-text" style={{ fontSize: '1.1rem', textAlign: 'left', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '20px' }}>
                                Rise for Hope collects information submitted through this website to provide services, respond to inquiries, and maintain security. The information you submit may include sensitive personal data. We handle this data in accordance with applicable privacy laws.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                Information is stored securely and access is restricted to authorized personnel only. We do not sell, rent, or share your personal information with third parties unless required by law or with your explicit consent.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                By submitting this form, you consent to the collection, storage, and use of your information as described in this policy.
                            </p>
                            <p>
                                For any questions about your data or to request access, correction, or deletion, contact us at <a href="mailto:info@riseforhope.org" style={{ textDecoration: 'underline', color: 'inherit' }}>info@riseforhope.org</a>.
                            </p>
                        </div>
                    </section>

                    {/* --- TERMS OF USE --- */}
                    <section>
                        <h1 className="mission-title" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                            Terms of Use
                        </h1>
                        <p className="item-date" style={{ textAlign: 'center', marginBottom: '50px', color: '#000', fontSize: '1rem' }}>
                            Effective Date: 04/19/2025
                        </p>

                        <div className="mission-text" style={{ fontSize: '1.1rem', textAlign: 'left', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '20px' }}>By using this form, you agree to the following:</p>

                            <ol style={{ paddingLeft: '25px', marginBottom: '25px', listStyleType: 'decimal' }}>
                                <li style={{ marginBottom: '10px', paddingLeft: '10px' }}>You are submitting accurate and truthful information.</li>
                                <li style={{ marginBottom: '10px', paddingLeft: '10px' }}>You understand that Rise for Hope is not responsible for delays or errors in service caused by incorrect or incomplete submissions.</li>
                                <li style={{ marginBottom: '10px', paddingLeft: '10px' }}>You authorize Rise for Hope to use the submitted information solely for purposes related to our services.</li>
                                <li style={{ marginBottom: '10px', paddingLeft: '10px' }}>You understand that submitting this form does not create a professional, medical, or legal relationship unless otherwise agreed in writing.</li>
                            </ol>

                            <p style={{ marginBottom: '20px' }}>
                                Misuse of this form or submission of fraudulent data may result in restricted access or legal action.
                            </p>
                            <p>
                                If you do not agree to these terms, do not submit the form.
                            </p>
                        </div>
                    </section>

                    {/* Footer Date */}
                    <div style={{ textAlign: 'right', marginTop: '100px', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#000' }}>
                        Revised on: 04/19/2025
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}