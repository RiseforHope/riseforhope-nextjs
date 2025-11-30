"use client";

import ReactMarkdown from 'react-markdown';
import SoftQuote from './SoftQuote';

export default function InFocusContent({ content }: { content: string }) {
    return (
        <div className="mission-text" style={{ margin: '0' }}>
            <ReactMarkdown
                components={{
                    h1: ({ node, ...props }) => <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '40px', marginBottom: '15px' }} {...props} />,
                    h2: ({ node, ...props }) => <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '30px', marginBottom: '15px' }} {...props} />,
                    h3: ({ node, ...props }) => <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '25px', marginBottom: '10px', fontWeight: '600' }} {...props} />,
                    p: ({ node, children, ...props }) => {
                        const content = String(children).trim();
                        const match = content.match(/^\[\[(.*?)\]\]$/);
                        if (match) {
                            return (
                                <div style={{ margin: '60px -20px' }}>
                                    <SoftQuote text={match[1]} />
                                </div>
                            );
                        }
                        return <div style={{ marginBottom: '20px', lineHeight: '1.8' }} {...props}>{children}</div>;
                    },
                    ul: ({ node, ...props }) => <ul style={{ marginLeft: '20px', marginBottom: '20px' }} {...props} />,
                    li: ({ node, ...props }) => <li style={{ marginBottom: '10px' }} {...props} />,
                    img: ({ node, ...props }) => (
                        <figure style={{ margin: '40px 0', display: 'block' }}>
                            <img
                                src={props.src}
                                alt={props.alt}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '20px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                                }}
                            />
                            {props.alt && (
                                <figcaption style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', marginTop: '15px', fontStyle: 'italic', fontFamily: 'var(--font-sans)' }}>
                                    {props.alt}
                                </figcaption>
                            )}
                        </figure>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}