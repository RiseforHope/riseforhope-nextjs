'use client';

import { useEffect, useState } from 'react';

export default function DonationTracker({ currentAmount = 0, goalAmount = 12500 }) {
    const [progress, setProgress] = useState(0);

    // Calculate percentage (capped at 100%)
    const targetPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

    // Animate the bar on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(targetPercentage);
        }, 300); // Short delay to let UI render before sliding
        return () => clearTimeout(timer);
    }, [targetPercentage]);

    // Format numbers (e.g. 12500 -> 12,500)
    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(num);
    };

    return (
        <div style={{
            background: '#f9f9f9',
            padding: '40px 30px',
            borderRadius: '20px',
            textAlign: 'center',
            marginBottom: '50px',
            // Soft shadow to lift it slightly
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
        }}>

            {/* HEADLINE */}
            <h3 style={{
                fontFamily: 'var(--font-sans)',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                fontWeight: '900',
                color: '#666',
                marginBottom: '15px'
            }}>
                Our Christmas Goal
            </h3>

            {/* BIG NUMBERS */}
            <div style={{
                fontFamily: 'var(--font-serif)', // Uses your brand serif
                color: '#1D1B1A',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '10px'
            }}>
                <span style={{ fontSize: '3.5rem', lineHeight: '1' }}>
                    {formatCurrency(currentAmount)}
                </span>
                <span style={{ fontSize: '1.2rem', color: '#888', fontFamily: 'var(--font-sans)' }}>
                    raised of {formatCurrency(goalAmount)}
                </span>
            </div>

            {/* PROGRESS BAR CONTAINER */}
            <div style={{
                width: '100%',
                height: '24px',
                background: '#e6e6e6',
                borderRadius: '50px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* FILL - Uses your brand gradient */}
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #FDCCF1 0%, #F8EDFB 100%)',
                    borderRadius: '50px',
                    transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)', // Smooth "ease-out" animation
                    boxShadow: '0 0 10px rgba(253, 204, 241, 0.5)' // Soft glow
                }}></div>
            </div>

            {/* PERCENTAGE TEXT */}
            <div style={{
                textAlign: 'right',
                marginTop: '10px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#1D1B1A'
            }}>
                {Math.round(progress)}% Funded
            </div>

        </div>
    );
}