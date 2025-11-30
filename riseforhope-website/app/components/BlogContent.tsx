"use client";

import ReactMarkdown from 'react-markdown';

export default function BlogContent({ content }: { content: string }) {
  return (
    <div className="mission-text" style={{ margin: '0' }}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '40px', marginBottom: '15px' }} {...props} />,
          h2: ({ node, ...props }) => <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '30px', marginBottom: '15px' }} {...props} />,
          h3: ({ node, ...props }) => <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '25px', marginBottom: '10px', fontWeight: '600' }} {...props} />,
          p: ({ node, ...props }) => <p style={{ marginBottom: '20px', lineHeight: '1.8' }} {...props} />,
          ul: ({ node, ...props }) => <ul style={{ marginLeft: '20px', marginBottom: '20px' }} {...props} />,
          li: ({ node, ...props }) => <li style={{ marginBottom: '10px' }} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
