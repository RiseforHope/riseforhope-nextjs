'use client';

import { useState, useRef } from 'react';

export default function Accordion({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{ borderBottom: '1px solid #eee' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '20px 0',
                    background: 'transparent', // Ensures no unwanted background color
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    // --- FIXES ---
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent', // Removes the blue/gray flash on tap
                    userSelect: 'none'
                }}
            >
                <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    {question}
                </span>
                <span style={{
                    fontSize: '1.5rem',
                    // Changed from blue to black as requested
                    color: '#1D1B1A',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                }}>
                    +
                </span>
            </button>
            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease-out, opacity 0.4s ease-out',
                    opacity: isOpen ? 1 : 0
                }}
            >
                <p style={{
                    paddingBottom: '20px',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: '1.6',
                    color: '#666'
                }}>
                    {answer}
                </p>
            </div>
        </div>
    );
}