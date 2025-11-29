"use client";
import { getInFocusBySlug, getAllInFocus } from '../../lib/infocus';
import ReactMarkdown from 'react-markdown';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import SoftQuote from '../../components/SoftQuote';

export async function generateStaticParams() {
    const posts = getAllInFocus();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function InFocusPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getInFocusBySlug(slug);

    if (!post) return <div>Post not found</div>;

    return (
        <main>
            <Header />
            <article className="max-w-container" style={{ padding: '150px 20px 80px', maxWidth: '800px' }}>

                {/* Back Link */}
                <Link href="/#infocus" className="item-date" style={{ marginBottom: '20px', display: 'inline-block' }}>
                    ← Back to Home
                </Link>

                {/* Main Title */}
                <h1 className="mission-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>{post.title}</h1>

                {/* MAIN IMAGE WITH CAPTION */}
                <figure style={{ margin: '40px 0' }}>
                    <div
                        style={{
                            width: '100%', height: '400px',
                            backgroundImage: `url('${post.image}')`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            borderRadius: '20px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    />
                    {post.imageCaption && (
                        <figcaption style={{
                            textAlign: 'center',
                            color: '#888',
                            fontSize: '0.9rem',
                            marginTop: '10px',
                            fontStyle: 'italic',
                            fontFamily: 'var(--font-sans)'
                        }}>
                            {post.imageCaption}
                        </figcaption>
                    )}
                </figure>

                {/* ARTICLE CONTENT */}
                <div className="mission-text" style={{ margin: '0' }}>
                    <ReactMarkdown
                        components={{
                            // Headings
                            h1: ({node, ...props}) => <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '40px', marginBottom: '15px' }} {...props} />,
                            h2: ({node, ...props}) => <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '30px', marginBottom: '15px' }} {...props} />,
                            h3: ({node, ...props}) => <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '25px', marginBottom: '10px', fontWeight: '600' }} {...props} />,

                            // --- DYNAMIC QUOTE LOGIC ---
                            p: ({node, children, ...props}) => {
                                // 1. Convert content to string
                                const content = String(children).trim();

                                // 2. Regex to find text inside [[ ... ]]
                                const match = content.match(/^\[\[(.*?)\]\]$/);

                                // 3. If we found a match (e.g. [[My Quote]]), render the component
                                if (match) {
                                    const quoteText = match[1]; // Extracts the text inside brackets
                                    return (
                                        <div style={{ margin: '60px -20px' }}>
                                            <SoftQuote text={quoteText} />
                                        </div>
                                    );
                                }

                                // 4. Otherwise, regular paragraph
                                return <div style={{ marginBottom: '20px', lineHeight: '1.8' }} {...props}>{children}</div>;
                            },

                            // Lists
                            ul: ({node, ...props}) => <ul style={{ marginLeft: '20px', marginBottom: '20px' }} {...props} />,
                            li: ({node, ...props}) => <li style={{ marginBottom: '10px' }} {...props} />,

                            // Body Images with Captions
                            img: ({node, ...props}) => (
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
                                        <figcaption style={{
                                            textAlign: 'center',
                                            color: '#888',
                                            fontSize: '0.9rem',
                                            marginTop: '15px',
                                            fontStyle: 'italic',
                                            fontFamily: 'var(--font-sans)'
                                        }}>
                                            {props.alt}
                                        </figcaption>
                                    )}
                                </figure>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
            <Footer />
        </main>
    );
}