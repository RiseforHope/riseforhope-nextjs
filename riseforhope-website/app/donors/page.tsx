'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';


export default function DonorsInfoPage() {
    // State to handle the accordion open/close toggle
    const [isDocsOpen, setIsDocsOpen] = useState(false);

    return (
        <main style={{ fontFamily: 'sans-serif' }}>
            <Header />

            <div className="max-w-container" style={{ padding: '150px 20px', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>

                {/* Back Link */}
                <Link href="/" className="item-date" style={{ marginBottom: '20px', display: 'inline-block' }}>
                    ← Back to Home
                </Link>

                <h1 className="mission-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    Information for Donors
                </h1>

                <p className="mission-text" style={{ fontSize: '1.2rem', color: '#666', marginBottom: '60px' }}>
                    Transparency is at the heart of our organization. Here you will find our official registration details and financial commitments.
                </p>

                {/* OFFICIAL DETAILS CARD */}
                <div style={{ background: '#f9f9f9', padding: '40px', borderRadius: '20px', marginBottom: '40px' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
                        Organization Details
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', fontFamily: 'var(--font-sans)', marginBottom: '30px' }}>
                        <div>
                            <strong style={{ display: 'block', color: '#888', fontSize: '0.9rem' }}>Official Name</strong>
                            <span style={{ fontSize: '1.1rem' }}>Rise for Hope</span>
                        </div>
                        <div>
                            <strong style={{ display: 'block', color: '#888', fontSize: '0.9rem' }}>Registered Charity No.</strong>
                            <span style={{ fontSize: '1.1rem' }}>EIN: 33-4151218</span>
                        </div>
                        <div>
                            <strong style={{ display: 'block', color: '#888', fontSize: '0.9rem' }}>Tax Status</strong>
                            <span style={{ fontSize: '1.1rem' }}>501(c)(3) Non-Profit</span>
                        </div>
                        <div>
                            <strong style={{ display: 'block', color: '#888', fontSize: '0.9rem' }}>Headquarters</strong>
                            <span style={{ fontSize: '1.1rem' }}>East Greenville, PA</span>
                        </div>
                    </div>

                    {/* NEW: Documents Accordion Section */}
                    <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '20px' }}>
                        <button
                            onClick={() => setIsDocsOpen(!isDocsOpen)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '10px 0',
                                textAlign: 'left',
                                // FIX: Removes the gray flash on tap (mobile) and focus outline
                                WebkitTapHighlightColor: 'transparent',
                                outline: 'none'
                            }}
                        >
                            <span style={{
                                fontFamily: 'var(--font-sans)',
                                color: '#1D1B1A',
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}>
                                View Official Documents
                            </span>
                            {/* Simple SVG Chevron that rotates based on state */}
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    transform: isDocsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>

                        {/* Collapsible Content with Smooth Animation */}
                        <div style={{
                            display: 'grid',
                            gridTemplateRows: isDocsOpen ? '1fr' : '0fr',
                            transition: 'grid-template-rows 0.3s ease-out'
                        }}>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{
                                    marginTop: '10px',
                                    paddingLeft: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    paddingBottom: '10px'
                                }}>
                                    <a
                                        href="https://app.box.com/s/6p5qazs820pb37b58k4wctx0u0h6p7vw"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontFamily: 'var(--font-sans)',
                                            color: '#666',
                                            textDecoration: 'underline',
                                            fontSize: '0.95rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        📄 IRS Determination Letter (PDF)
                                    </a>

                                    <a
                                        href="https://app.box.com/s/os4qpq88ect7xf7u2so6o1h17i2f3pbv"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontFamily: 'var(--font-sans)',
                                            color: '#666',
                                            textDecoration: 'underline',
                                            fontSize: '0.95rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        📄 2025 Governance & Transparency (PDF)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FINANCIAL COMMITMENT */}
                <h3 className="mission-title" style={{ fontSize: '1.8rem', marginTop: '60px' }}>Our Financial Promise</h3>
                <p className="mission-text">
                    We are committed to ensuring that your donation makes the maximum impact.
                    <strong> 100% of public donations</strong> go directly to supporting families and funding critical research.
                    Our administrative costs are covered entirely by private benefactors.
                </p>

                <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', marginBottom: '10px' }}>Need tax receipts?</h4>
                    <p className="mission-text" style={{ fontSize: '1rem' }}>
                        For questions regarding annual tax receipts or large-scale endowments, please contact our finance team at <a href="mailto:finance@riseforhope.org" style={{ color: '#4285f4', textDecoration: 'underline' }}>finance@riseforhope.org</a>.
                    </p>
                </div>

            </div>
            <Footer />
        </main>
    );
}