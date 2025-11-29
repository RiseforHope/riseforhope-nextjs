'use client';

import Link from 'next/link';

export default function ImpactQuote() {
    return (
        <section
            className="impact-quote-section"
            style={{
                backgroundColor: '#f9f9f9', /* Soft background match */
                width: '100%'
            }}
        >
            <div className="max-w-container" style={{ textAlign: 'center', padding: '100px 20px' }}>

                {/* The Quote */}
                <blockquote style={{ maxWidth: '900px', margin: '0 auto 40px' }}>
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '2rem',
                        lineHeight: '1.4',
                        color: 'var(--col-black)',
                        marginBottom: '30px'
                    }}>
                        “Every hour volunteered and every dollar donated helps a child stay in treatment, helps a parent keep their job, helps a family stay whole. Whether you want to give your time or resources, there’s always a direct impact.”
                    </p>

                    {/* The Author */}
                    <footer style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.1rem',
                        color: '#666',
                        fontWeight: 'bold'
                    }}>
                        — Bladimir, R4H President
                    </footer>
                </blockquote>

                {/* The Button */}
                <Link href="/donate" className="btn-cyan">
                    HELP A FAMILY <span className="btn-arrow" style={{ marginLeft: '10px' }}>▶</span>
                </Link>
            </div>
        </section>
    );
}