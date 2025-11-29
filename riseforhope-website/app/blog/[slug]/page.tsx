import { getPostBySlug, getAllPosts } from '../../lib/blog';
import ReactMarkdown from 'react-markdown';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return <div>Post not found</div>;

    return (
        <main>
            <Header />

            <article className="max-w-container" style={{ padding: '150px 20px 80px', maxWidth: '800px' }}>

                {/* FIXED: Wrapper div for uniform spacing */}
                <div style={{ marginBottom: '40px' }}>
                    <Link href="/" className="item-date" style={{ display: 'inline-block' }}>
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="mission-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>{post.title}</h1>
                <span className="item-date" style={{ fontSize: '1rem', color: '#888' }}>{post.date}</span>

                {post.image && (
                    <div
                        style={{
                            width: '100%', height: '400px',
                            backgroundImage: `url('${post.image}')`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            margin: '40px 0'
                        }}
                    />
                )}

                <div className="mission-text" style={{ margin: '0' }}>
                    <ReactMarkdown
                        components={{
                            h1: ({node, ...props}) => <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '40px', marginBottom: '15px' }} {...props} />,
                            h2: ({node, ...props}) => <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '30px', marginBottom: '15px' }} {...props} />,
                            h3: ({node, ...props}) => <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '25px', marginBottom: '10px', fontWeight: '600' }} {...props} />,
                            p: ({node, ...props}) => <p style={{ marginBottom: '20px', lineHeight: '1.8' }} {...props} />,
                            ul: ({node, ...props}) => <ul style={{ marginLeft: '20px', marginBottom: '20px' }} {...props} />,
                            li: ({node, ...props}) => <li style={{ marginBottom: '10px' }} {...props} />,
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