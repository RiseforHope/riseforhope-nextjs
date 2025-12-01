'use client';

import { useState, useRef } from 'react';

interface AccordionItemProps {
    question: string;
    answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div style={{
            marginBottom: '15px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid #eee' // Optional border for definition
        }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '20px',
                    // Soft background color (matches the donation form background #f9f9f9)
                    background: '#f9f9f9',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
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
                    color: '#4285f4',
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
                    opacity: isOpen ? 1 : 0,
                    background: '#fff' // White background for the answer content
                }}
            >
                <p style={{
                    padding: '20px',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: '1.6',
                    color: '#666',
                    margin: 0
                }}>
                    {answer}
                </p>
            </div>
        </div>
    );
}