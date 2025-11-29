'use client';
import Link from 'next/link';

export default function Mission() {
    return (
        <section id="mission" className="mission-section">
            <div className="mission-content">
                <h2 className="mission-title">Supporting kids with cancer and their families</h2>
                <p className="mission-text">Our mission is to ease the financial and emotional strain on children with cancer and their families.</p>

                <Link href="/about" className="btn-cyan">
                    Learn More <span className="btn-arrow">▶</span>
                </Link>
            </div>
        </section>
    );
}