import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <main>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px 80px', maxWidth: '800px' }}>

                {/* Consistent Back Link */}
                <div style={{ marginBottom: '40px' }}>
                    <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                        ← Back to Home
                    </Link>
                </div>

                {/* HEADLINE */}
                <h1 className="mission-title" style={{ fontSize: '3.5rem', marginBottom: '10px', lineHeight: '1.1' }}>
                    Hope Begins Here
                </h1>

                {/* SUBTITLE */}
                <p className="mission-text" style={{ fontSize: '1.3rem', color: '#666', marginBottom: '50px', fontWeight: 'bold' }}>
                    Supporting children with cancer and their families every step of the way.
                </p>

                {/* IMAGE SECTION */}
                <div
                    style={{
                        width: '100%',
                        height: '450px',
                        // You can replace this URL with a photo of Norah later
                        backgroundImage: "url('https://res.cloudinary.com/dvexnl19a/image/upload/v1764050764/IMG_0979_kddbxw.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '20px',
                        marginBottom: '60px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)' // Soft shadow for depth
                    }}
                />

                {/* THE STORY (Norah's Legacy) */}
                <div style={{ marginBottom: '60px' }}>
                    <p className="mission-text" style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '30px' }}>
                        Rise for Hope was born from Norah Celeste’s courageous spirit. Norah Celeste was a young girl whose fight with cancer was marked not by fear, but by extraordinary love and strength. Through every challenge, Norah’s compassion for others never wavered, becoming a light to those around her.
                    </p>

                    <p className="mission-text" style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
                        Inspired by her legacy, we are committed to supporting children with cancer and their families through every step of their journey. Rise for Hope stands as a testament to Norah Celeste’s enduring message: that hope always rises.
                    </p>
                </div>

                {/* CALL TO ACTION BUTTON */}
                <div style={{ textAlign: 'center', marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '50px' }}>
                    <Link href="/donate" className="btn-donate" style={{ fontSize: '1rem', padding: '15px 40px' }}>
                        Help a family today <span className="btn-arrow">▶</span>
                    </Link>
                </div>

            </div>
            <Footer />
        </main>
    );
}