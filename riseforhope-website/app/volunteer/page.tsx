import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function VolunteerPage() {
    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px 80px', minHeight: '80vh' }}>

                {/* Centered Column for focus */}
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                    <div style={{ marginBottom: '40px' }}>
                        <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                            ← Back to Home
                        </Link>
                    </div>

                    <h1 className="mission-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Join the Team
                    </h1>

                    <p className="mission-text" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        Our volunteers are the heartbeat of Rise for Hope. Whether you can give an hour a month or a day a week, your time makes a difference.
                    </p>

                    {/* Simple Form */}
                    <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '20px' }}>
                        <form>
                            <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>Full Name</label>
                            <input type="text" className="form-input" placeholder="Your Name" />

                            <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>Email Address</label>
                            <input type="email" className="form-input" placeholder="email@example.com" />

                            <label className="form-label" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', fontFamily: 'var(--font-sans)' }}>Area of Interest</label>
                            <div className="select-wrapper" style={{ marginBottom: '20px' }}>
                                <select className="form-input">
                                    <option>Event Staff</option>
                                    <option>Hospital Visits</option>
                                    <option>Administrative Support</option>
                                    <option>Fundraising</option>
                                </select>
                            </div>

                            <button className="btn-donate" style={{ width: '100%', fontSize: '1rem', border: 'none' }}>
                                Sign Up to Volunteer
                            </button>
                        </form>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}